import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    wishlist: []
  },
  isAuthenticated: true // Set to true for demo purposes
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      if (!state.currentUser) return;
      
      const index = state.currentUser.wishlist.indexOf(action.payload);
      if (index === -1) {
        state.currentUser.wishlist.push(action.payload);
      } else {
        state.currentUser.wishlist.splice(index, 1);
      }
    },
  },
});

export const { setUser, logout, toggleWishlist } = userSlice.actions;
export default userSlice.reducer;