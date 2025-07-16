import { create } from 'zustand';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useUserStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
  checkAuth: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/check`, { withCredentials: true });
      set({ user: res.data, isLoggedIn: true });
      return true;
    } catch {
      set({ user: null, isLoggedIn: false });
      return false;
    }
  }
}));

export default useUserStore;
