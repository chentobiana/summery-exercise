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
  Loader
} from "monday-ui-react-core";
import { useItems } from '../hooks/useItems';

const ItemTable = () => {
  const { data, isLoading, isError } = useItems();

  const columns = [
    { id: "name", title: "Name", loadingStateType: "medium-text" },
    { id: "description", title: "Description", loadingStateType: "long-text" },
    { id: "dueDate", title: "Due Date", loadingStateType: "medium-text" },
    { id: "status", title: "Status", loadingStateType: "medium-text" }
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
              <TableCell colSpan={4}>No items to display</TableCell>
            </TableRow>
          ) : (
            data.orderedItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name || '-'}</TableCell>
                <TableCell>{item.text || '-'}</TableCell>
                <TableCell>{item.date || '-'}</TableCell>
                <TableCell>
                  {item.status ? (
                    <Chips 
                      label={item.status}
                      color={getChipColor(item.status)}
                    />
                  ) : (
                    '-'
                  )}
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
