import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { AppContext as AppContextInterface } from './interfaces/AppContextInterface';
import { User } from './interfaces/UserInterface';
import { Product } from './interfaces/ProductInterface';
import { useLocation } from 'react-router-dom';

export const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    searchQuery: '' as string | undefined,
    filterKey: '',
    filterValue: '' as string | number | undefined,
  });
  const [pagination, setPagination] = useState({
    pageSize: 5,
    currentPage: 1,
  });
  const [totalActiveRecordsNumber, setTotalActiveRecordsNumber] = useState<number>(0);

  const resetContext = useCallback(() => {
    setUsers([]);
    setProducts([]);
    setFilters({
      searchQuery: undefined,
      filterKey: '',
      filterValue: undefined
    });
    setPagination({
      pageSize: 5,
      currentPage: 1
    });
    setTotalActiveRecordsNumber(0);
  }, []);

  return (
    <AppContext.Provider
      value={{ users, products, filters, pagination, totalActiveRecordsNumber, setUsers, setProducts, setFilters, setPagination, setTotalActiveRecordsNumber, resetContext }}
    >
      {children}
    </AppContext.Provider>
  );
};
