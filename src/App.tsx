import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Header from './components/layout/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductEdit from './pages/admin/AdminProductEdit';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

function App() {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={isDarkMode ? 'dark' : ''}>
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products/:id"
                element={
                  <AdminRoute>
                    <AdminProductEdit />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;