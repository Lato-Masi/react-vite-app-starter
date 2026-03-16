export interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  email_verified_at: string | null;
  createdAt: string;
  updatedAt: string;
  photo_url: string;
}

export interface LoginResponse {
  token: string;
  token_type: string;
  expires_in: number;
}
