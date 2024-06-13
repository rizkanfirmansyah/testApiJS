export interface BookType {
  id?: number;
  name: string;
  author?: string;
  genre_id: number;
  description?: string;
  price?: number;
  pages?: number;
  user_id?: number;
  published_at: string;
}

export interface CategoryType {
  id?: number;
  name: string;
  user_id?: number;
  description?: string;
}
