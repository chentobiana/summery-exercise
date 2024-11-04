// src/components/ItemTable.jsx
import React from 'react';
import { useItems } from '../hooks/useItems';
import { 
  Box,
  Loader
} from "monday-ui-react-core";
import styles from './ItemTable.module.css';

const StatusIndicator = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'working on it':
        return styles.statusWorking;
      case 'done':
        return styles.statusDone;
      case 'not started':
        return styles.statusNotStarted;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <div className={`${styles.status} ${getStatusStyles(status)}`}>
      {status}
    </div>
  );
};

const ItemTable = () => {
  const { data, isLoading, error } = useItems();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader size={Loader.sizes.LARGE} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorMessage}>
        Error loading items: {error.message}
      </div>
    );
  }

  const items = data?.orderedItems || [];

  return (
    <Box className={styles.boardContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.mondayTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className={styles.nameCell}>{item.name}</td>
                <td>{item.text}</td>
                <td className={styles.dateCell}>{item.date}</td>
                <td>
                  <StatusIndicator status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default ItemTable;