export const searchNews = async (query: string) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&language=en&domains=bbc.co.uk&apiKey=4ceaf15631b048c0a9e266af94ad878f`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('API Response:', data); // Console log the results
      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  };