import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { UseTableReturnType } from './hooks/useTable';
import { FlexBetween } from '../flexbox';
import DataGridCustomToolbar from '../DataGridCustomToolbar ';

declare module '@mui/x-data-grid' {
  interface GridColDef {
    metaData?: { isSearchable?: boolean};
    isSearchable?: boolean;
  }
}
type StyledTableProps = {
  total?: number;
  loading: boolean;
  columns?: GridColDef[];
  rows?: Array<Record<string, any>>;
  useTableResults: UseTableReturnType<unknown>;
};
export default function StyledTable({
  rows,
  total,
  columns,
  loading,
  useTableResults,
}: StyledTableProps) {
  const {
    activePage,
    rowsPerPage,
    handelSearch,
    onActivePageChange,
    onRowsPerPageChange,
    handleSorting,
  } = useTableResults;

  const searchableHeaders = useMemo(() => {
    return columns
      ?.filter((item) => item.metaData?.isSearchable)
      .map((item, index) => {
        return { value: index, label: item.field };
      });
  }, [columns]);

  return (
    <Box
      sx={(theme) => ({
        paddingTop: '2rem ',
        height: '70vh',
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.secondary[100],
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: theme.palette.primary.light,
        },
        '& .MuiDataGrid-footerContainer': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.secondary[100],
          borderTop: 'none',
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `${theme.palette.secondary[400]} !important`,
        },
      })}
    >
      <DataGrid
        getRowId={(row) => row._id}
        loading={loading}
        rowHeight={40}
        rows={rows ?? []}
        columns={columns ?? []}
        initialState={{
          pagination: {
            page: activePage + 1,
            pageSize: rowsPerPage,
          },
        }}
        rowsPerPageOptions={[10, 50, 100]}
        rowCount={total}
        onPageChange={onActivePageChange}
        onPageSizeChange={onRowsPerPageChange}
        onSortModelChange={handleSorting}
        paginationMode="server"
        sortingMode="server"
        components={{ Toolbar: DataGridCustomToolbar }}
        componentsProps={{
          toolbar: { handelSearch, headers: searchableHeaders },
        }}
      />
    </Box>
  );
}
