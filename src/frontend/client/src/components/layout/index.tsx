import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { ThemeOptions } from '@mui/material/styles';
import Navbar from '../Navbar';

const useStyles = makeStyles((theme: ThemeOptions) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
  })
);

export default function Layout () {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
};
