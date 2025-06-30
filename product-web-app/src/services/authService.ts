import axios from "axios";
import type { Login } from "../models/security/Login";
import type { Register } from "../models/security/Register";
import type { AuthResponse } from "../models/security/AuthResponse";

const API = 'https://localhost:5001/api/auth';

export const authService = {
    login: (data: Login) => axios.post<AuthResponse>(`${API}/login`, data),
    register: (data: Register) => axios.post(`${API}/register`, data),
};