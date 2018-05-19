
  export interface INewsOrgSource {
    id: string;
    name: string;
  }

  export interface INewsOrgArticle {
    source: INewsOrgSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
  }

  export interface INewsOrgApiResponse {
    status: string;
    totalResults: number;
    articles: INewsOrgArticle[];
  }


