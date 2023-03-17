import React from 'react';
import { Box } from '@mui/material';
import BreakdownChart from 'src/components/BreakdownChart';
import { PageContainer } from 'src/components/PageContainer';
import Header from 'src/components/Header';

const Breakdown = () => {
  return (
    <PageContainer>
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="70svh">
        <BreakdownChart />
      </Box>
    </PageContainer>
  );
};

export default Breakdown;
