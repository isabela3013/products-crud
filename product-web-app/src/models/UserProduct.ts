import type { Product } from "./Product";

export interface UserProduct {
    id: number;
    userId: string;
    productId: number;
    product?: Product;
    purchasePrice: number;
    status: "pendiente" | "comprado" | "utilizado";
    createdAt: Date;
}

export interface CreateUserProductDto {
    productId: number;
    purchasePrice: number;
    status: "pendiente" | "comprado" | "utilizado";
}
