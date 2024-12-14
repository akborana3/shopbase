import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export function useAuth() {
  const { token, loading, error } = useSelector((state: RootState) => state.auth);
  const { currentUser } = useSelector((state: RootState) => state.user);

  return {
    isAuthenticated: !!token,
    user: currentUser,
    loading,
    error
  };
}