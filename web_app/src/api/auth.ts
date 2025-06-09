import axios from "axios";
import type { LoginData, RegisterData, UserResponse } from '../types/auth.ts';

const BASE_URL = "http://localhost:8000/auth/";

export const login = async (data: LoginData): Promise<{ access_token: string }> => {
  const res = await axios.post(`${BASE_URL}login/`, data);
  return res.data;
};

export const register = async (data: RegisterData): Promise<void> => {
  const response = await axios.post(`${BASE_URL}register/`, data);
  return response.data;
};

export const getMe = async (): Promise<UserResponse> => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.user;
};
