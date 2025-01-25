export interface ApiResponse<T> {
    status: string;
    data: T;
  }
  
  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }
  