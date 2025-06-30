import type { Login } from "../models/security/Login";
import type { Register } from "../models/security/Register";
import type { AuthResponse } from "../models/security/AuthResponse";
import axiosInstance from "./axios";

export const authService = {
    login: (data: Login) => axiosInstance.post<AuthResponse>(`/auth/login`, data),
    register: (data: Register) => axiosInstance.post(`/auth/register`, data),
};