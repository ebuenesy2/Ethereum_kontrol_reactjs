//! apps/web/src/app/router/index.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthLayout from '../layouts/auth-layout';
import AppLayout from '../layouts/app-layout';
import ProtectedRoute from './protected';

//! Error Page
import Error404 from '../features/auth/pages/Error404';

//! Auth Pages
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Otp from '../features/auth/pages/OTP';

//! Dashboard
import Dashboard from '../features/auth/pages/Dashboard';

//! Transactions
import Transaction from '../features/transaction/pages/Transaction';

//! Sabit
import Sabit from '../features/auth/pages/Sabit';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
        </Route>

        {/* App (Protected) */}
        <Route
          element={
            <ProtectedRoute>
              {' '}
              <AppLayout />{' '}
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />

          {/* Transactions */}
          <Route path="/transactions" element={<Transaction />} />

          <Route path="/sabit" element={<Sabit />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
