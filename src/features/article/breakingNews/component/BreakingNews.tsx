import React, { useState, useCallback } from "react";
import "../styles/BreakingNews.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react";
import { NewsArticle } from "../types/NewsArticle";
import { BreakingNewsProps } from "../types/BreakingNewsPropType";

const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={`carousel-arrow next ${className}`} onClick={onClick}>
      <ChevronRight size={20} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={`carousel-arrow prev ${className}`} onClick={onClick}>
      <ChevronLeft size={20} />
    </div>
  );
};

const BreakingNews: React.FC<BreakingNewsProps> = ({
  articles,
  isLoading,
  isError = false,
  onRetry
}) => {
  const [hoveredStoryId, setHoveredStoryId] = useState<string | null>(null);

  const getImageUrl = useCallback((article: NewsArticle) => {
    const image = article.multimedia?.find(
      (m) => m.format === "threeByTwoSmallAt2X"
    );
    return image?.url || "/placeholder-image.jpg";
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / 1000 / 60
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    }
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }, []);

  const truncateText = useCallback((text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  }, []);

  if (isLoading) {
    return (
      <div className="breaking-news-container loading">
        <div className="loading-spinner">
          Loading latest news...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="breaking-news-container">
        <div className="error-message">
          <p>Unable to load breaking news at this time.</p>
          {onRetry && (
            <button onClick={onRetry}>
              <RefreshCcw size={16} className="mr-2" />
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!articles?.length) {
    return (
      <div className="breaking-news-container">
        <div className="empty-message">
          No breaking news available at the moment.
        </div>
      </div>
    );
  }

  const mainStories = articles.slice(0, 5);
  const subStories = articles.slice(6, 30);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    fade: true,
    lazyLoad: 'progressive' as const
  };

  return (
    <div className="breaking-news-container">
      <div className="breaking-news-header">
        <h2>Latest News</h2>
        <span className="arrow">›</span>
      </div>

      <div className="main-stories-carousel">
        <Slider {...settings}>
          {mainStories.map((story) => (
            <div key={story.uri} className="main-story">
              <a 
                href={story.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="story-link"
              >
                <div className="image-container">
                  <img 
                    src={getImageUrl(story)} 
                    alt={story.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
                <div className="story-content">
                  <span className="category">{story.section}</span>
                  {story.kicker && (
                    <span className="kicker">{story.kicker}</span>
                  )}
                  <h3>{truncateText(story.title, 100)}</h3>
                  <p className="abstract">{truncateText(story.abstract, 150)}</p>
                  <div className="metadata">
                    <span className="byline">{story.byline}</span>
                    <span className="timestamp">
                      {formatDate(story.published_date)}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>

      <div className="sub-stories">
        {subStories.map((story) => (
          <div 
            key={story.uri} 
            className="sub-story"
            onMouseEnter={() => setHoveredStoryId(story.uri)}
            onMouseLeave={() => setHoveredStoryId(null)}
          >
            <a 
              href={story.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="story-link"
            >
              <div className="image-container">
                <img 
                  src={getImageUrl(story)} 
                  alt={story.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
              <div className="story-content">
                <span className="category">{story.section}</span>
                {story.kicker && (
                  <span className="kicker">{story.kicker}</span>
                )}
                <h4>{truncateText(story.title, 80)}</h4>
                <div className="metadata">
                  <span className="timestamp">
                    {formatDate(story.published_date)}
                  </span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakingNews;