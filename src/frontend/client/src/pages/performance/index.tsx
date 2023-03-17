import React, { useMemo } from 'react';
import { useAppSelector } from 'src/hooks/redux';
import Header from 'src/components/Header';
import { PageContainer } from 'src/components/PageContainer';
import StyledTable from 'src/components/styled-table';
import { useTable } from 'src/components/styled-table/hooks/useTable';
import { GridColDef } from '@mui/x-data-grid';
import { useUserPerformanceQuery } from 'src/api/management';
import { TransactionGetOneResponseDto } from 'src/api/transaction/transaction.types';

export default function Performance() {
  const tableStates = useTable();
  const userId = useAppSelector((state) => state.global.userId);
  const { data, isLoading } = useUserPerformanceQuery({ userId });

  const columns: GridColDef<TransactionGetOneResponseDto>[] = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'customerName',
      flex: 1,
      renderCell: (params) => {
        return params.value ? params.value.name : 'unknown';
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
    },
    {
      field: 'createdAt',
      headerName: 'createdAt',
      flex: 0.5,
      sortable: false,
    },
  ];

  return (
    <PageContainer>
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance Here"
      />
      <StyledTable
        loading={isLoading}
        columns={columns}
        rows={data?.data ?? []}
        useTableResults={tableStates}
      />
    </PageContainer>
  );
}
