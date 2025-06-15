import { User } from "../../models/user.model";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}