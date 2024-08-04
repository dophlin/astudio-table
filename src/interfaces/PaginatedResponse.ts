import { User } from '../interfaces/UserInterface';
import { Product } from '../interfaces/ProductInterface';

export interface PaginatedUserResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export interface PaginatedProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}