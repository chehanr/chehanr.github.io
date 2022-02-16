export const THEMES = ["light", "dark"] as const;

export type Theme = typeof THEMES[number];

export type PostData = {
  title: string;
  metaTitle: string;
  description: string;
  publishedDate: string;
  tags: string[];
  image?: string;
  updatedDate?: string;
};
