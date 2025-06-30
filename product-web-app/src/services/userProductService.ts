import axios from "axios";
import { store } from "../redux/store";
import type { Product } from "../models/Product";

const API = 'https://localhost:5001/api/userproducts';

const authHeaders = () => {
    const token = store.getState().auth.token;
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const userProductService = {
    getAll: () => axios.get<Product[]>(API, authHeaders()),
    create: (data: Product) => axios.post<Product>(API, data, authHeaders()),
};