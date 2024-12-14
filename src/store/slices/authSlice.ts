import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/api';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  userName: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  isAdmin: false,
  userName: localStorage.getItem('userName'),
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await authApi.login(email, password);
    localStorage.setItem('token', response.token);
    localStorage.setItem('userName', response.name);
    return response;
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const response = await authApi.signup(email, password, name);
    localStorage.setItem('token', response.token);
    localStorage.setItem('userName', response.name);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAdmin = false;
      state.userName = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
    },
    clearError: (state) => {
      state.error = null;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userName = action.payload.name;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userName = action.payload.name;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Signup failed';
      });
  },
});

export const { logout, clearError, setAdmin } = authSlice.actions;
export default authSlice.reducer;