import React, { Dispatch, SetStateAction, useState } from 'react';
import { Search } from '@mui/icons-material';
import {
  IconButton,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import { FlexBetween } from './flexbox';
import FlexBox from './flexbox/FlexBox';

type SearchHeader = {
  value:number,
  label:string,
}

type Props = {
  searchInput:string,
  headers : Array<SearchHeader>
  setSearch: Dispatch<SetStateAction<string>>,
  setSearchInput:Dispatch<SetStateAction<string>>,
}


const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
  headers
}: any) => {
  const [selectedHeader , setSelectedHeader] = useState();
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <FlexBox>
          <TextField
            label="Search..."
            sx={{ width: '15rem' }}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setSearch(searchInput);
                      setSearchInput('');
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Search by
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={1}
              variant="standard"
              label="Age"
            >
              <MenuItem value="1">
                <em>None</em>
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBox>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
