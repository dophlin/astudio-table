import { useContext, useEffect, useState } from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import Heading from "../components/Heading";
import Table from "../components/Table";
import ApiService from "../services/ApiService";
import { User } from "../interfaces/UserInterface";
import { PaginatedUserResponse } from "../interfaces/PaginatedResponse";
import { AppContext } from '../AppContext';
import DataService from '../services/DataService';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [filterKeys, setFilterKeys] = useState<string[]>([]);
  const [keys, setKeys] = useState<string[]>([]);

  const context = useContext(AppContext);

  useEffect(() => {
    const fetch = async () => {
      try {
        const pageSize = context?.pagination.pageSize ? context?.pagination.pageSize : 5;
        const currentPage = context?.pagination.currentPage ? context?.pagination.currentPage - 1 : 0;
        const offset = pageSize * currentPage;
        const response: PaginatedUserResponse = await ApiService.fetchUsers(
          pageSize,
          offset,
          context?.filters.filterKey,
          context?.filters.filterValue
        );
        setUsers(response.users);
        if(response.users.length > 0) {
          const keys = Object.keys(response.users[0]).filter(key => key !== 'image' && key !== 'password');
          setKeys(keys);
          setFilterKeys(keys.slice(0, 12));
        }
        context?.setTotalActiveRecordsNumber(response.total);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetch();
  }, [context?.pagination.currentPage, context?.pagination.pageSize, context?.filters.filterKey, context?.filters.filterValue]);

  useEffect(() => {
    if(context?.filters.searchQuery && context?.filters.searchQuery !== "") {
      setSearchedUsers(DataService.filterData(users, context?.filters.searchQuery));
    } else {
      setSearchedUsers(users);
    }
  }, [context?.filters.searchQuery, users]);

  return (
    <div>
      <Heading text="Users" />
      <Breadcrumbs />
      <Table data={searchedUsers} keys={keys} filterKeys={filterKeys} type="User" />
    </div>
  );
}
