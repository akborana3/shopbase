import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ShoppingCart, Heart, User2, Sun, Moon, LogOut } from 'lucide-react';
import { RootState } from '../../store/store';
import { toggleTheme } from '../../store/slices/themeSlice';
import { logout } from '../../store/slices/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const { items } = useSelector((state: RootState) => state.cart);
  const { token, userName } = useSelector((state: RootState) => state.auth);

  const handleProfileClick = () => {
    if (!token) {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">ShopEase</Link>
          
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {token && (
              <Link to="/wishlist" className="relative">
                <Heart className="h-6 w-6" />
              </Link>
            )}

            {token && (
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
            )}

            <div className="relative group">
              <button onClick={handleProfileClick} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <User2 className="h-6 w-6" />
              </button>
              
              {token && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b">
                    {userName || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}