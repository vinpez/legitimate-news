export interface ArticleMetadata {
  title: string;
  author: string;
  date: string;
  category: string;
  featured: boolean;
  image: string;
  excerpt: string;
}

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  content: string;
}

export const categories = [
  "Politics",
  "Business",
  "Technology",
  "Science",
  "Entertainment",
  "Lifestyle",
  "Sports"
] as const;

export type Category = typeof categories[number];
