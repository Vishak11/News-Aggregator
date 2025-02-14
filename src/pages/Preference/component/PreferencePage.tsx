import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchPage from "../../../features/article/SearchNews/component/SearchPage";
import { searchNews } from '../services/SearchApi';
import { SearchResults } from '../types/SearchResult';

const PreferencePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);        
        const query = searchParams.get('q');
        if (!query) {
          throw new Error('No search query provided');
        }      
        const data = await searchNews(query);
        setSearchResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching news');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [searchParams]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      {searchResults ? (
        <SearchPage results={searchResults} />
      ) : (
        <div className="no-results">No results available</div>
      )}
    </div>
  );
};

export default PreferencePage;