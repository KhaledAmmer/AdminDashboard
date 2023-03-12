import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutlineOutlined,
  PointOfSale,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  Shop2Outlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserGetOneResponseDto } from 'src/api/user/user.types';
import { FlexBetween } from './flexbox';
import profileImage from '../assets/profile.jpeg';

type SidebarProps = {
  user?: UserGetOneResponseDto;
  drawerWidth: string;
  isNonMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const navItems: Array<{ title: string; icon: null | ReactElement }> = [
  { title: 'Dashboard', icon: <HomeOutlined /> },
  { title: 'Client Facing', icon: null },
  { title: 'Products', icon: <ShoppingCartOutlined /> },
  { title: 'Customers', icon: <Groups2Outlined /> },
  { title: 'Transaction', icon: <ReceiptLongOutlined /> },
  { title: 'Geography', icon: <PublicOutlined /> },
  { title: 'Sales', icon: null },
  { title: 'Overview', icon: <PointOfSale /> },
  { title: 'Daily', icon: <TodayOutlined /> },
  { title: 'Monthly', icon: <CalendarMonthOutlined /> },
  { title: 'Breakdown', icon: <PieChartOutlineOutlined /> },
  { title: 'Management', icon: null },
  { title: 'Admin', icon: <AdminPanelSettingsOutlined /> },
  { title: 'Performance', icon: <TrendingUpOutlined /> },
];

export default function Sidebar(props: SidebarProps) {
  const { user, drawerWidth, isNonMobile, isSidebarOpen, setIsSidebarOpen } =
    props;
  const { pathname } = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [active, setActive] = useState('');

  useEffect(() => {
    const [, path] = pathname.split('/');
    setActive(path);
  }, [pathname]);

  return (
    <Box component="nav">
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          height: '100%',
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary[200],
            boxSizing: 'border-box',
            borderWidth: isNonMobile ? 0 : '2px',
            width: drawerWidth,
            overflowY: 'hidden !important',
          },
        }}
      >
        <Box m="1.5rem 2rem 2rem 3rem">
          <FlexBetween color={theme.palette.secondary.main}>
            <Box display="flex" alignItems="center" gap="0.5rem">
              <Typography variant="h4" fontWeight="bold">
                ECOMVISION
              </Typography>
            </Box>
            {!isNonMobile && (
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ChevronLeft />
              </IconButton>
            )}
          </FlexBetween>
        </Box>
        <Box
          width="100%"
          sx={{
            overflowY: 'scroll',
            flex:1 
          }}
        >
          <List>
            {navItems.map(({ title, icon }, index) => {
              if (!icon) {
                return (
                  <Typography key={title} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                    {title}
                  </Typography>
                );
              }

              const lcTitle = title.toLowerCase();
              return (
                <ListItem key={index} disablePadding={true}>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcTitle}`);
                      setActive(lcTitle);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcTitle
                          ? theme.palette.secondary[300]
                          : 'transparent',

                      color:
                        active === lcTitle
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: '2rem',
                        color:
                          active === lcTitle
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={title} />
                    {active === lcTitle && (
                      <ChevronRightOutlined
                        sx={{
                          ml: 'auto',
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        {/* User Section */}
        {user && (
          <Box>
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" padding={2}>
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user?.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: '25px ',
                }}
              />
            </FlexBetween>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
