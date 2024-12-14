import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { signup, clearError } from '../store/slices/authSlice';
import AuthLayout from '../components/auth/AuthLayout';
import FormInput from '../components/auth/FormInput';
import { Loader2 } from 'lucide-react';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    try {
      await dispatch(signup(formData)).unwrap();
      navigate('/');
    } catch (err) {
      // Error is handled by Redux
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) dispatch(clearError());
    if (passwordError) setPasswordError('');
  };

  return (
    <AuthLayout title="Create your account">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Full name"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

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
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            error={passwordError}
          />

          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Sign up'
          )}
        </button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}