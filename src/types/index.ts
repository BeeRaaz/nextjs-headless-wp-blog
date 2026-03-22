export interface Post {
  id: number;
  date: string;
  modified: string;
  slug: string;
  author: number;
  categories?: number[];
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  sticky: boolean;
  _embedded?: {
    author?: Author[];
    replies?: Reply[];
    "wp:featuredmedia"?: FeaturedMedia[];
  };
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
}

export interface Reply {
  id: number;
  author_name: string;
  date: string;
  content: string;
  author_avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
}

export interface FeaturedMedia {
  id: number;
  date: string;
  alt_text: string;
  source_url: string;
  media_details: {
    sizes: {
      full: {
        width: number;
        height: number;
        source_url: string;
      };
    };
  };
}
