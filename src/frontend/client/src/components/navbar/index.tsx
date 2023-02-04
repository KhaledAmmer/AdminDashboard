import React from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
} from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/redux';
import { makeStyles, createStyles } from '@mui/styles';
import { AppBar, ThemeOptions, Toolbar, TooltipProps } from '@mui/material';

const useStyles = makeStyles((theme: ThemeOptions) =>
    createStyles({
        root: {
            backgroundColor: theme ? theme!.palette!.background.paper : 'white',
            color: theme.palette.text.primary,
        },
    })
);



export const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <AppBar className="">
      <Toolbar></Toolbar>
    </AppBar>
  );
};
