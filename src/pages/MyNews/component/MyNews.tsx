import React, { useEffect, useState } from "react";
import { preferedNewsApi } from "../../../common/CommonService/PreferedNewsApi";
import PreferedNews from "../../../features/PreferedNews/component/PreferedNews";
import { NewsArticle } from "../../../features/PreferedNews/type/NewsArticle";

const MyNews: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await preferedNewsApi();
        setArticles(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div style={{marginTop:"70px"}} className="loading">Loading news...</div>;
  }

  if (error) {
    return <div style={{marginTop:"70px"}}  className="error"> {error}</div>;
  }

  return (
    <div className="home-container">
      <PreferedNews articles={articles} />
    </div>
  );
};

export default MyNews;