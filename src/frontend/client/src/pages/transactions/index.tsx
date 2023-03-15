import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';
import { useGetAllTransactionsQuery } from 'src/api/transaction/inedex';
import { TransactionGetOneResponseDto } from 'src/api/transaction/transaction.types';
import Header from 'src/components/Header';
import { PageContainer } from 'src/components/PageContainer';
import StyledTable from 'src/components/styled-table';
import { useTable } from 'src/components/styled-table/hooks/useTable';

export const Transactions = () => {
  const tableStates = useTable();
  const { data, isFetching } = useGetAllTransactionsQuery({
    ...tableStates.filter,
    page: tableStates.activePage,
    limit: tableStates.rowsPerPage,
    sortField: tableStates.sortFailed,
    sortDirection: tableStates.sortDirection,
  });
  const columns: GridColDef<TransactionGetOneResponseDto>[] = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User',
      flex: 1,
      renderCell: (params) => {
        return params?.value?.name ?? '';
      },
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      flex: 1,
      metaData: {
        isSearchable: true,
      },
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      metaData: {
        isSearchable: true,
      },
    },
  ];

  return (
    <PageContainer>
      <Header title="TRANSACTION" subtitle="See your list of transaction." />
      <StyledTable
        loading={isFetching}
        columns={columns}
        rows={data?.data.data}
        total={data?.data.total}
        useTableResults={tableStates}
      />
    </PageContainer>
  );
};
