export type PaginatingResponseDto<TPayload> = {
  data: Array<TPayload>;
  total: number;
};
