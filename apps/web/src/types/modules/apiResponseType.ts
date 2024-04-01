export type ApiResponse<T> = {
  data: T;
  message?: string;
  error?: any;
  statusCode?: number;
};
