import React from 'react';
import '../style/style.css'
import { NewsGridProps } from '../type/NewsGridProps';

const PreferedNews: React.FC<NewsGridProps> = ({ articles }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  return (
    <div className="news-container">
         <h3>My News</h3>
      <div className="news-grid">
        {articles.map((article, index) => (
          <article key={index} className="news-card">
            <div className="news-image-wrapper">
              <div className="news-image-container">
                <img
                  src={article.multimedia?.[0]?.url || "/api/placeholder/800/400"}
                  alt={article.multimedia?.[0]?.caption || article.title}
                  className="news-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/api/placeholder/800/400";
                  }}
                />
              </div>
              <span className="news-tag">{article.section}</span>
            </div>
            
            <div className="news-content">
              <div className="news-text">
                <h2 className="news-title">{article.title}</h2>
                <p className="news-abstract">{article.abstract}</p>
              </div>
              
              <div className="news-footer">
                <span className="news-date">
                  {formatDate(article.published_date)}
                </span>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PreferedNews;