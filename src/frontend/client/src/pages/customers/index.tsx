import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';
import { TransactionGetOneResponseDto } from 'src/api/transaction/transaction.types';
import { useAllCustomersQuery } from 'src/api/user';
import { UserGetAllCustomersResponseDto } from 'src/api/user/user.types';
import Header from 'src/components/Header';
import { PageContainer } from 'src/components/PageContainer';
import StyledTable from 'src/components/styled-table';
import { useTable } from 'src/components/styled-table/hooks/useTable';

export const Customers = () => {
  const tableStates = useTable();
  const { data, isFetching } = useAllCustomersQuery({
    ...tableStates.filter,
    page: tableStates.activePage,
    limit: tableStates.rowsPerPage,
    sortField: tableStates.sortFailed,
    sortDirection: tableStates.sortDirection,
  });
  const columns: GridColDef<UserGetAllCustomersResponseDto>[] = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5,
      metaData: {
        isSearchable: true,
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      metaData: {
        isSearchable: true,
      },
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
      },
      metaData: {
        isSearchable: true,
      },
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 0.4,
      metaData: {
        isSearchable: true,
      },
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 1,
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
