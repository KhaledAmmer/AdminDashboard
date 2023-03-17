import React from 'react';
import { useMemo } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { themeSettings } from './styles/theme';
import { useAppSelector } from './hooks/redux';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Dashboard } from './pages';
import Layout from './components/layout';
import './styles/global.css';
import Products from './pages/products';
import { Transactions } from './pages/transactions';
import { Customers } from './pages/customers';
import Geography from './pages/geography';
import Overview from './pages/overview';
import Daily from './pages/daily';
import Monthly from './pages/monthly';
import Breakdown from './pages/breakdown';
import Admins from './pages/admin';
import Performance from './pages/performance';

function App() {
  const mode = useAppSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/transaction" element={<Transactions />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admins />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
