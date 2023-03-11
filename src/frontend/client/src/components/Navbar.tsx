import React, { Dispatch, SetStateAction } from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material';
import { makeStyles, createStyles } from '@mui/styles';
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  ThemeOptions,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useAppDispatch } from '../hooks/redux';
import { FlexBetween } from './flexbox';
import { setMode } from '../redux/reducers/global';
import { UserGetOneResponseDto } from 'src/api/user/user.types';
import profileImage from '../assets/profile.jpeg';
import FlexBox from './flexbox/FlexBox';


type NavbarProps = {
  user?: UserGetOneResponseDto;
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
  const { user, setIsSidebarOpen } = props;
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
        <FlexBetween gap="1rem">
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
          <FlexBox gap='0.5rem'>
          <Box
              component="img"
              alt="profile"
              src={profileImage}
              height="30px"
              width="30px"
              borderRadius="50%"
              sx={{ objectFit: 'cover' }}
            />
          <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.7rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user?.name}
              </Typography>
              <Typography
                fontSize="0.6rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user?.occupation}
              </Typography>
            </Box>
            <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "15px" }}
              />
          </FlexBox>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
