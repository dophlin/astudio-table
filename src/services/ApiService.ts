import axios, { AxiosResponse } from 'axios';
import { PaginatedUserResponse, PaginatedProductResponse } from '../interfaces/PaginatedResponse';
const BASE_URL = 'https://dummyjson.com';

class ApiService {
    // Method to fetch users with pagination and filtering
    static async fetchUsers(
        limit: number = 5,
        skip: number = 0,
        filterKey?: string,
        filterValue?: string | number
    ): Promise<PaginatedUserResponse> {
        let url = `${BASE_URL}/users`;
        if (filterKey && filterValue) {
            url += `/filter?key=${encodeURIComponent(filterKey)}&value=${encodeURIComponent((filterValue + "").trim())}&limit=${limit}&skip=${skip}`;
        } else {
            url += `?limit=${limit}&skip=${skip}`;
        }
        const response: AxiosResponse<PaginatedUserResponse> = await axios.get(url);
        return response.data;
    }

    // Method to fetch products with pagination and filtering
    static async fetchProducts(
        limit: number = 5,
        skip: number = 0,
        filterKey?: string,
        filterValue?: string | number
    ): Promise<PaginatedProductResponse> {
        let url = `${BASE_URL}/products`;
        if (filterKey && filterKey == 'Category' && filterValue && filterValue != 'All') {
            url += `/category/${filterValue}?&limit=${limit}&skip=${skip}`;
        } else {
            url += `?limit=${limit}&skip=${skip}`;
        }
        const response: AxiosResponse<PaginatedProductResponse> = await axios.get(url);
        return response.data;
    }

}

export default ApiService;
