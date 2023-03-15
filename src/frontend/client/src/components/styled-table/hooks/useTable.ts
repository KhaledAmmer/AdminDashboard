import { GridSortModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { SubmittedSearchHeader } from 'src/components/DataGridCustomToolbar ';

export type FilterType<T> = { [key in keyof T]: any };
export type UseTableReturnType<T> = {
  handelSearch: (searchValues: Array<SubmittedSearchHeader>) => void;
  onActivePageChange: (page: number) => void;
  handleSorting: (modal: GridSortModel) => void;
  onRowsPerPageChange: (pageRows: number) => void;
  activePage: number;
  rowsPerPage: number;
  sortFailed?: keyof T;
  filter?: FilterType<T>;
  sortDirection: 'asc' | 'desc';
};
export const useTable: <T>() => UseTableReturnType<T> = <T>() => {
  const [activePage, setActivePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortFailed, setSortFailed] = useState<keyof T>();
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<FilterType<T>>();

  const onRowsPerPageChange = (pageRows: number) => {
    setRowsPerPage(pageRows);
  };

  const handleSorting = (modal: GridSortModel) => {
    if (modal[0]?.field) {
      setSortFailed(modal[0].field as keyof T);
      setDirection(modal[0].sort as 'asc' | 'desc');
    }
  };

  const onActivePageChange = (page: number) => {
    setActivePage(page);
  };

  const handelSearch = (searchValues: Array<SubmittedSearchHeader>) => {
    const newFilter = searchValues.reduce<FilterType<T>>((acc, item) => {
      return { ...acc, [`${item.header}`]: item.value };
    }, {} as FilterType<T>);

    setFilter(newFilter);
    setActivePage(0);
  };

  return {
    handelSearch,
    onActivePageChange,
    handleSorting,
    onRowsPerPageChange,
    filter,
    activePage,
    rowsPerPage,
    sortFailed,
    sortDirection: direction,
  };
};
