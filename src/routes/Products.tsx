import { useContext, useEffect, useState } from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import Heading from "../components/Heading";
import Table from "../components/Table";
import ApiService from "../services/ApiService";
import { Product } from "../interfaces/ProductInterface";
import { PaginatedProductResponse } from "../interfaces/PaginatedResponse";
import { AppContext } from '../AppContext';
import DataService from '../services/DataService';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [filterKeys, setFilterKeys] = useState<string[]>([]);

  const context = useContext(AppContext);

  useEffect(() => {
    const fetch = async () => {
      try {
        const pageSize = context?.pagination.pageSize ? context?.pagination.pageSize : 5;
        const currentPage = context?.pagination.currentPage ? context?.pagination.currentPage - 1 : 0;
        const offset = pageSize * currentPage;
        const response: PaginatedProductResponse = await ApiService.fetchProducts(
          pageSize,
          offset,
          context?.filters.filterKey,
          context?.filters.filterValue
        );
        setProducts(response.products);
        if(response.products.length > 0) {
          const keys = Object.keys(
            response.products[0])
              .filter(key => 
                key !== 'images' && 
                key !== 'thumbnail' && 
                key !== 'reviews' && 
                key !== 'meta'
              );
              
          setKeys(keys);
          setFilterKeys(keys.slice(0, 12));
        }
        context?.setTotalActiveRecordsNumber(response.total);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetch();
  }, [context?.pagination.currentPage, context?.pagination.pageSize, context?.filters.filterKey, context?.filters.filterValue]);

  useEffect(() => {
    if(context?.filters.searchQuery && context?.filters.searchQuery !== "") {
      setSearchedProducts(DataService.filterData(products, context?.filters.searchQuery));
    } else {
      setSearchedProducts(products);
    }
  }, [context?.filters.searchQuery, products]);

  return (
    <div>
      <Heading text="Products" />
      <Breadcrumbs />
      <Table data={searchedProducts} keys={keys} filterKeys={filterKeys} type='Product' />
    </div>
  );
}
