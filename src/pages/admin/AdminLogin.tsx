import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../store/slices/authSlice';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';
import { Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (password === '+919549125661') {
        dispatch(setAdmin(true));
        navigate('/admin');
      } else {
        setError('Invalid admin credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Admin Login">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Admin Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Login as Admin'
          )}
        </button>
      </form>
    </AuthLayout>
  );
}