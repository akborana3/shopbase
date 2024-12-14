import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { login, clearError } from '../store/slices/authSlice';
import AuthLayout from '../components/auth/AuthLayout';
import FormInput from '../components/auth/FormInput';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      navigate('/');
    } catch (err) {
      // Error is handled by Redux
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) dispatch(clearError());
  };

  return (
    <AuthLayout title="Sign in to your account">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email address"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            error={error}
          />

          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Sign in'
          )}
        </button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}