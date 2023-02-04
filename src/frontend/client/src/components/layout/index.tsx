import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../navbar';

const Layout = () => {
  return (
    <Box>
      <Box>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
};
export default Layout;
