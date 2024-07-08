export interface Item {
  title: string;
  description: string;
  image: string;
  index: number;
}

export interface ApiResponse {
  [key: string]: Item;
}

export interface ErrorResponse {
  error: string;
}
