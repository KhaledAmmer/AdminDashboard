import React, { Dispatch, SetStateAction } from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from '@mui/icons-material';
import { makeStyles, createStyles } from '@mui/styles';
import {
  AppBar,
  IconButton,
  InputBase,
  ThemeOptions,
  Toolbar,
  useTheme,
} from '@mui/material';
import { useAppDispatch } from '../hooks/redux';
import { FlexBetween } from './flexbox';
import { setMode } from '../redux/reducers/global';

type NavbarProps = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const useStyles = makeStyles((theme: ThemeOptions) =>
  createStyles({
    toolbar: {
      justifyContent: 'space-between',
    },
    flexBox: {
      backgroundColor: theme?.palette?.background?.paper,
      borderRadius: '9px',
      gap: '3rem',
      padding: '0.1rem 1.5rem',
    },
  })
);

export default function Navbar(props: NavbarProps) {
  const { setIsSidebarOpen } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        position: 'static',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar className={classes.toolbar}>
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen((state) => !state)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween className={classes.flexBox}>
            <InputBase placeholder="Search..." />
            <IconButton onClick={() => console.log('Ts')}>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/*Right Section */}
        <FlexBetween>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
          <IconButton onClick={() => console.log('Ts')}>
            <SettingsOutlined />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
