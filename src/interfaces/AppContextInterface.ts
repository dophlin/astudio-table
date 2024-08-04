import { User } from '../interfaces/UserInterface';
import { Product } from '../interfaces/ProductInterface';

export interface AppContext {
    users: User[];
    products: Product[];
    filters: {
        searchQuery: string | undefined;
        filterKey: string;
        filterValue: string | number | undefined;
    };
    pagination: {
        pageSize: number;
        currentPage: number;
    };
    totalActiveRecordsNumber: number;
    setUsers: (users: User[]) => void;
    setProducts: (products: Product[]) => void;
    setFilters: (filters: AppContext['filters']) => void;
    setPagination: (pagination: AppContext['pagination']) => void;
    setTotalActiveRecordsNumber: (total: number) => void;
    resetContext: () => void;
}