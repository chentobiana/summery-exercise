import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { 
  Box,
  Flex,
} from "monday-ui-react-core";
import ItemTable from './components/ItemTable';
import "monday-ui-react-core/dist/main.css";
import styles from './App.module.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box className={styles.appContainer}>
        <Box className={styles.contentWrapper}>
          <Flex 
            className={styles.header}
            justify={Flex.justify.START} 
            align={Flex.align.CENTER}
          >
            <h1>Monday Board Items</h1>
          </Flex>
          <ItemTable />
        </Box>
      </Box>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;