import { useEffect, useState } from "react";
import { getNewsOrgData } from "../CommonService/NewsOrgApi";
import { NewsArticle } from "../../features/article/breakingNews/types/NewsArticle";

const useFetchNews = (section: string) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getNewsOrgData(section);
        
        setArticles(data.results || []); 
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching news");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [section]);

  return { articles, isLoading, error };
};

export default useFetchNews;
