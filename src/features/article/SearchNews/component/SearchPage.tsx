import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import '../styles/style.css';

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface SearchResults {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface SearchPageProps {
  results: SearchResults;
}

const SearchPage: React.FC<SearchPageProps> = ({ results }) => {
  if (!results?.articles) {
    return <div className="no-results">No results found</div>;
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Results</h1>
        <p>Found {results.totalResults} articles</p>
      </div>

      <div className="articles-grid">
        {results.articles.map((article, index) => (
          <article key={index} className="article-card">
            {article.urlToImage && (
              <div className="article-image-container">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="article-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/api/placeholder/400/320";
                  }}
                />
                <div className="source-tag">{article.source.name}</div>
              </div>
            )}

            <div className="article-content">
              <div className="article-text">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-description">{article.description}</p>
              </div>

              <div className="article-footer">
                <span className="article-date">
                  {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read More
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;