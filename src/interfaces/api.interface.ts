export interface ApiResponse<T = "any"> {
  success: boolean;
  message: string;
  timestamp: Date;
  path: string;
  data: T;
}
