export interface GeneralResponse<T> {
  data: T | null;
  message: string;
  error: object | string | null;
  statusCode: number;
}
