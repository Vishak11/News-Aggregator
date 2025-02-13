import { NewsArticle } from './NewsArticle'
export interface BreakingNewsProps {
  articles: NewsArticle[];
  isLoading: boolean;
  isError?: boolean;
  onRetry?: () => void;
}