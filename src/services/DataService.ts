import { User } from '../interfaces/UserInterface';
import { Product } from '../interfaces/ProductInterface';

class DataService {

    static filterData<T extends User | Product>(data: T[], query: string): T[] {
        if (!query) return data;
        return data.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );
    }
}

export default DataService;
