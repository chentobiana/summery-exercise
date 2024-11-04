import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ItemTable from './components/ItemTable';
import "monday-ui-react-core/dist/main.css";
import styles from './App.module.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.appContainer}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.mainTitle}>Monday Board Items</h1>
          <ItemTable />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;