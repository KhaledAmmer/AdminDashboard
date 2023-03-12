export type PaginatingRequestDto<TPayload> = {
  [key in keyof TPayload]: any;
} & {
  limit: number;
  page: number;
  sortField?: keyof TPayload;
  sortDirection: 'asc' | 'desc';
} 