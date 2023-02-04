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
      backgroundColor: theme?.palette?.background?.paper,
      color: theme?.palette?.text?.primary,
    },
  })
);

export const Navbar = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <AppBar className={classes.root}>
      <Toolbar></Toolbar>
    </AppBar>
  );
};
