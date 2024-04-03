import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
    authError: '',
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('/api/auth/login', { username, password });
        this.isLoggedIn = true;
        this.user = response.data.user;
      } catch (error) {
        this.authError = error.message;
        throw error;
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
    },
  },
});