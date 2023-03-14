import { GridSortModel } from '@mui/x-data-grid';
import { useState } from 'react';
export type UseTableReturnType<T> = {
  onSearch: (searchValues: Array<{ [key: string]: unknown }>)=> void;
  onActivePageChange: (page: number) => void;
  handleSorting: (modal: GridSortModel) => void;
  onRowsPerPageChange: (pageRows: number) => void;
  filter?: string;
  activePage: number;
  rowsPerPage: number;
  sortFailed?: keyof T;
  direction: 'asc' | 'desc';
};
export const useTable: <T>() => UseTableReturnType<T> = <T>() => {
  const [activePage, setActivePage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortFailed, setSortFailed] = useState<keyof T>();
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState();

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

  const onSearch = (searchValues: Array<{ [key: string]: unknown }>) => {
    //
  };

  return {
    onSearch,
    onActivePageChange,
    handleSorting,
    onRowsPerPageChange,
    filter,
    activePage,
    rowsPerPage,
    sortFailed,
    direction,
  };
};
