import axiosInstance from "./axios";
import type { CreateUserProductDto, UserProduct } from "../models/UserProduct";

const endpoint = '/userproducts';

export const getUserProducts = () => axiosInstance.get<UserProduct[]>(endpoint);

export const createUserProduct = (userProduct: CreateUserProductDto) =>
    axiosInstance.post<CreateUserProductDto>(endpoint, userProduct );

export const updateUserProduct = (userProduct: UserProduct) =>
    axiosInstance.put(`${endpoint}/${userProduct.id}`, userProduct);

export const deleteUserProduct = (id: number) =>
    axiosInstance.delete(`${endpoint}/${id}`);