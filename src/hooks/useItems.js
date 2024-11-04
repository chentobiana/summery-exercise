import { useQuery } from 'react-query';
import { fetchItems } from '../api/mondayApi';

export const useItems = () => {
  return useQuery('items', fetchItems, {
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};