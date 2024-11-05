import { useQuery } from 'react-query';
import { fetchItems } from '../api/mondayApi';

export const useItems = () => {
  return useQuery('items', async () => {
    const result = await fetchItems();
    console.log('Fetched items:', result);
    return result;
  }, {
    refetchInterval: 30000,
    staleTime: 10000,
  });
};