import axios from "axios";
import type { Product } from "../models/Product";

const API_URL = 'https://localhost:5001/api/products';

export const getProducts = () => axios.get<Product[]>(API_URL);

export const getProduct = (id: number) => axios.get<Product>(`${API_URL}/${id}`);

export const createProduct = (product: Omit<Product, 'id' | 'createdAt'>) =>
    axios.post<Product>(API_URL, product);

export const updateProduct = (id: number, product: Omit<Product, 'id' | 'createdAt'>) =>
    axios.put<Product>(`${API_URL}/${id}`, product);

export const deleteProduct = (id: number) => axios.delete(`${API_URL}/${id}`);