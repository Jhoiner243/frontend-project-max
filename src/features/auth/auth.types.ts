export interface RegisterDTO {
  user_name: string;
  user_username: string;
  user_lastname: string;
  user_email: string;
  user_password: string;
}

export interface LoginDTO {
  user_email: string;
  user_password: string;
}

export interface LogingResponse {
  accessToken: string;
  message: string;
}
