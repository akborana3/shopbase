import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../services/api';
import AuthLayout from '../components/auth/AuthLayout';
import FormInput from '../components/auth/FormInput';
import { Loader2, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await authApi.requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout title="Check your email">
        <div className="text-center space-y-4">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <p className="text-sm text-gray-600">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <Link
            to="/login"
            className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset your password">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email address"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Send reset link'
          )}
        </button>

        <p className="text-center text-sm">
          Remember your password?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}