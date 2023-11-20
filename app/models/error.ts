export interface Error {
  errors?: {
    field: string;
    message: string;
  }[];
  description?: string;
  httpCode?: number;
  isOperational?: boolean;
  message?: string;
}
