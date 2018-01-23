export interface Page<T> {
  totalPages?: number;
  totalElements?: number;
  number?: number;
  size?: number;
  sort?: string;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  content?: T[];
}
