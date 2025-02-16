export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields?: {
    thumbnail?: string;
    bodyText?: string;
  };
}

export interface GuardianResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    results: GuardianArticle[];
  };
}

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

export const preferedNewsApi = async (): Promise<NewsArticle[]> => {
  const userKeywords: string[] = JSON.parse(
    localStorage.getItem("userCategories") || "[]"
  );

  if (userKeywords.length === 0) {
    throw new Error("No filter selected.Please select your filter from the home page to view your prefered news.");
  }

  const searchQuery: string = userKeywords
    .map((keyword: string) => `"${keyword}"`)
    .join(" AND ");

  const apiUrl: string = `https://content.guardianapis.com/search?q=${encodeURIComponent(
    searchQuery
  )}&show-fields=thumbnail,bodyText&api-key=b267db65-0383-47d6-90bc-d373152ea731`;

  try {
    const response = await fetch(apiUrl);
    const data: GuardianResponse = await response.json();
    
    return data.response.results.map(article => ({
      title: article.webTitle,
      abstract: article.fields?.bodyText?.substring(0, 150) + "..." || "",
      published_date: article.webPublicationDate,
      section: article.sectionName,
      multimedia: [{
        url: article.fields?.thumbnail || "/api/placeholder/800/400",
        caption: article.webTitle
      }],
      url: article.webUrl
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};