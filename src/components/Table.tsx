import Pagination from './Pagination';
import { renderCellValue } from '../helper/ObjectHelper';
import SearchFilters from './SearchFilters';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

interface TableProps<T> {
  data: T[];
  keys: string[];
  filterKeys: string[];
  type: string;
}

const Table = <T,>({ data, keys, filterKeys, type }: TableProps<T>) => {
  const context = useContext(AppContext);
  const [pagesCount, setPagesCount] = useState<number>(1);

  useEffect(() => {
    if (!!context?.totalActiveRecordsNumber && !!context?.pagination.pageSize) {
      setPagesCount(Math.ceil(context?.totalActiveRecordsNumber / context?.pagination.pageSize));
    } else {
      setPagesCount(1);
    }
  }, [context?.totalActiveRecordsNumber, context?.pagination.pageSize]);

  const pageChangeHandler = useCallback((pageNo: number) => {
  }, [context?.pagination.pageSize]);

  return (
    <>
      <SearchFilters type={type} keys={filterKeys} />
      <div className="-mx-4 -my-2 overflow-x-auto sm:mx-0 overflow-visible">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y border border-as-gray divide-gray-200">
              <thead className="bg-blue-100 uppercase">
                <tr className="divide-x divide-gray-200">
                  {keys.map((key) => (
                    <th
                      key={key}
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((record, rowIndex) => (
                  <tr key={rowIndex} className="divide-x divide-gray-200 hover:bg-as-gray">
                    {keys.map((key) => (
                      <td key={key} className="px-3 py-4 text-sm truncate text-gray-900">
                        {renderCellValue(record[key as keyof T])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination pagesCount={pagesCount} activePage={pageChangeHandler} />
    </>
  );
};

export default Table;
