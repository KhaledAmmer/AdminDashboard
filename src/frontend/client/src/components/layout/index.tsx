import React, { useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { ThemeOptions } from '@mui/material/styles';
import Navbar from '../Navbar';
import { useMediaQuery } from '@mui/material';
import Sidebar from '../Sidebar';

const useStyles = makeStyles((theme: ThemeOptions) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
    },
  })
);
export default function Layout() {
  const classes = useStyles();
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(isNonMobile);

  return (
    <Box className={classes.root}>
      <Sidebar
        drawerWidth="250px"
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box width='100%' height='100%'>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}
