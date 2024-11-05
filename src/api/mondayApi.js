import { API_URL } from '../utils/constants';

export const fetchItems = async () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BOARD_ID = import.meta.env.VITE_BOARD_ID;
  
  const query = `{
    boards(ids: ${BOARD_ID}) {
      name
      id
      description
      items_page {
        items {
          id
          name
          column_values {
            id
            type
            text
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'API-Version': '2023-04',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const items = data.data.boards[0].items_page.items;
    
    const orderedItems = items.map(item => {
      const text = item.column_values.find(col => col.id === 'text__1')?.text || '';
      const date = item.column_values.find(col => col.id === 'date4')?.text || '';
      const status = item.column_values.find(col => col.id === 'status')?.text || '';
    
      return {
        name: item.name,
        id: item.id,
        text: text,
        date: date,
        status: status,
      };
    });
    
    return { orderedItems };

  } catch (error) {
    console.error('Error fetching board items:', error);
    throw error;
  }
};

export const deleteItem = async (itemId) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    
    const mutation = `
      mutation {
        delete_item(item_id: ${itemId}) {
          id
        }
      }
    `;
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'API-Version': '2023-04',
        },
        body: JSON.stringify({ query: mutation }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  };