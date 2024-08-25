import { BASE_URL } from "../constants/httpConstants";

export const post = async (url, data) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error during POST request:', error);
      throw error;
    }
  };
  