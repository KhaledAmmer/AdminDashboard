import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import {
  IconButton,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import { FlexBetween } from './flexbox';
import FlexBox from './flexbox/FlexBox';
import { Stack } from '@mui/system';

type SearchHeader = {
  value: number;
  label: string;
};

export type SubmittedSearchHeader = {
  header: string;
  value: string;
};

type Props = {
  headers: Array<SearchHeader>;
  handelSearch: (submittedSearchHeaders: Array<SubmittedSearchHeader>) => void;
};

const DataGridCustomToolbar = ({ handelSearch, headers }: Props) => {
  if (headers.length === 0) return <></>;
  const [searchInput, setSearchInput] = useState('');
  const [selectedHeaderValue, setSelectedHeaderValue] = useState(0);
  const [submittedSearchHeaders, setSubmittedSearchHeaders] = useState<
    Array<SubmittedSearchHeader>
  >([]);
  const onSubmitSearch = () => {
    const header = headers.find((h) => h.value === selectedHeaderValue);
    const submittedHeaders = submittedSearchHeaders.filter((sh) => {
      return sh.header !== header!.label;
    });
    submittedHeaders.push({ header: header!.label, value: searchInput });
    setSubmittedSearchHeaders([...submittedHeaders]);
    setSearchInput('');
  };

  useEffect(() => {
    handelSearch(submittedSearchHeaders);
  }, [submittedSearchHeaders]);

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <Stack alignItems="flex-end">
          <FlexBox marginBottom="5px">
            <TextField
              label="Search..."
              sx={{ width: '15rem' }}
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onSubmitSearch}>
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
                value={selectedHeaderValue}
                variant="standard"
                label="Age"
                onChange={(e) =>
                  setSelectedHeaderValue(Number(e.target.value) ?? 0)
                }
              >
                {headers?.map((header) => {
                  return (
                    <MenuItem key={header.value} value={header.value}>
                      <em>{header.label}</em>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </FlexBox>
          <FlexBox gap={1}>
            {submittedSearchHeaders.map((h) => {
              return (
                <FlexBox
                  my={0.5}
                  pl={0.5}
                  gap={1}
                  justifyContent="flex-end !important"
                  bgcolor="black"
                  maxWidth={150}
                >
                  <Box
                    style={{
                      width: '15px !important',
                      minWidth: 0,
                      fontSize: '8px',
                      color: 'white',
                      padding: 0,
                    }}
                    key={h.value}
                  >
                    {`${h.header} : ${h.value}`}
                  </Box>
                  <IconButton
                    onClick={() => {
                      setSubmittedSearchHeaders((prev) => {
                        return prev.filter((item) => {
                          return item.header !== h.header;
                        });
                      });
                    }}
                    sx={{ width: '10px', height: '100%' }}
                  >
                    <CloseIcon sx={{ width: '10px', height: '100%' }} />
                  </IconButton>
                </FlexBox>
              );
            })}
          </FlexBox>
        </Stack>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
