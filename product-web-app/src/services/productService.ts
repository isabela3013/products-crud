import type { Product } from "../models/Product";
import axiosInstance from "./axios";

// const API_URL = 'https://localhost:7179/api/product';

const endpoint = '/product';

export const getProducts = () => axiosInstance.get<Product[]>(endpoint);

export const getProduct = (id: number) => axiosInstance.get<Product>(`${endpoint}/${id}`);

export const createProduct = (product: Omit<Product, 'id'>) =>
    axiosInstance.post<Product>(endpoint, product);

export const updateProduct = (id: number, product: Omit<Product, 'id' | 'createdAt'>) =>
    axiosInstance.put<Product>(`${endpoint}/${id}`, product);

export const deleteProduct = (id: number) => axiosInstance.delete(`${endpoint}/${id}`);