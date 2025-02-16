export interface NewsArticle {
    title: string;
    abstract: string;
    published_date: string;
    section: string;
    multimedia: {
      url: string;
      caption: string;
    }[];
    url: string;
  }