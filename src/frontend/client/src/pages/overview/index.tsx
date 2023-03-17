import React, { useState } from 'react';
import { FormControl, MenuItem, InputLabel, Box, Select } from '@mui/material';
import Header from 'src/components/Header';
import OverviewChart from 'src/components/OverviewChart';
import { PageContainer } from 'src/components/PageContainer';

const Overview = () => {
  const [view, setView] = useState('units');

  return (
    <PageContainer m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />
      <Box height="70vh">
        <FormControl sx={{ mt: '1rem', }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </PageContainer>
  );
};

export default Overview;
