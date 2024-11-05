import React from 'react';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Flex,
  Chips,
  Loader,
  IconButton,
} from "monday-ui-react-core";
import { Delete } from "monday-ui-react-core/icons";
import { useItems } from '../hooks/useItems';
import { useMutation, useQueryClient } from 'react-query';
import { deleteItem } from '../api/mondayApi';

const ItemTable = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useItems();

  const deleteMutation = useMutation(deleteItem, {
    onSuccess: () => {
      // Invalidate and refetch the items query
      queryClient.invalidateQueries('items');
    },
  });

  const handleDelete = async (itemId) => {
    try {
      await deleteMutation.mutateAsync(itemId);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const columns = [
    { id: "name", title: "Name", loadingStateType: "medium-text" },
    { id: "description", title: "Description", loadingStateType: "long-text" },
    { id: "dueDate", title: "Due Date", loadingStateType: "medium-text" },
    { id: "status", title: "Status", loadingStateType: "medium-text" },
    { id: "actions", title: "", loadingStateType: "medium-text" }
  ];

  const getChipColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'working on it':
        return Chips.colors.WARNING;
      case 'stuck':
        return Chips.colors.NEGATIVE;
      case 'done':
        return Chips.colors.POSITIVE;
      default:
        return Chips.colors.PRIMARY;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) return dateString;
    return `${day}-${month}-${year}`;
  };

  if (isLoading) {
    return (
      <Flex align={Flex.align.CENTER} justify={Flex.justify.CENTER} style={{ height: '200px' }}>
        <Loader size={Loader.sizes.MEDIUM} />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex align={Flex.align.CENTER} justify={Flex.justify.CENTER} style={{ height: '200px' }}>
        <div>Error loading board items</div>
      </Flex>
    );
  }

  return (
    <Flex
      align={Flex.align.START}
      justify={Flex.justify.SPACE_BETWEEN}
      gap={Flex.gaps.MEDIUM}
      style={{ flex: 1 }}
    >
      <Table
        style={{ width: "auto" }}
        size={Table.sizes.MEDIUM}
        columns={columns}
      >
        <TableHeader>
          {columns.map((headerCell, index) => (
            <TableHeaderCell
              key={index}
              title={headerCell.title}
              icon={headerCell.icon}
              infoContent={headerCell.infoContent}
            />
          ))}
        </TableHeader>
        <TableBody>
          {!data?.orderedItems?.length ? (
            <TableRow>
              <TableCell colSpan={5}>No items to display</TableCell>
            </TableRow>
          ) : (
            data.orderedItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name || '-'}</TableCell>
                <TableCell>{item.text || '-'}</TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell>
                  {item.status ? (
                    <Chips 
                      label={item.status}
                      color={getChipColor(item.status)}
                      readOnly
                    />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    icon={Delete}
                    kind={IconButton.kinds.TERTIARY}
                    size={IconButton.sizes.SMALL}
                    ariaLabel="Delete item"
                    onClick={() => handleDelete(item.id)}
                    disabled={deleteMutation.isLoading}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Flex>
  );
};

export default ItemTable;