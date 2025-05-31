import axios from "axios";
import type { LoginData, RegisterData, AuthResponse, UserResponse } from '../types/auth.ts';

const BASE_URL = "http://localhost:8000/auth/";

export const login = async (data: LoginData) : Promise<AuthResponse> => {
  const response = await axios.post(`${BASE_URL}login/`, data);
  return response.data;
}

export const register = async (data: RegisterData): Promise<UserResponse> => {
  const response = await axios.post(`${BASE_URL}register/`, data);
  return response.data;
}
