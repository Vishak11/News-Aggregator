export interface SearchResults {
    status: string;
    totalResults: number;
    articles: Array<{
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
    }>;
  }