export const getNewsOrgData = async (section: string) => {
  const API_KEY = "1lSywsc298AqmrefkgZkF5UVztFAOkaO";
  const BASE_URL = "https://api.nytimes.com/svc/topstories/v2";

  try {
    const response = await fetch(
       `${BASE_URL}/${section}.json?api-key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('API Response:', data); 
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
