import { defineStore } from 'pinia';
import axios from 'axios';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    isRegistered: false,
    registerLoading: false,
    registerError: '',
  }),
  actions: {
    async register(username: string, password: string, email: string) {
      this.registerLoading = true;
      try {
        const response = await axios.post('/api/auth/register', { username, password, email });
        this.isRegistered = true;
        // 注册成功后的逻辑
      } catch (error) {
        this.registerError = error.message;
        throw error;
      } finally {
        this.registerLoading = false;
      }
    },
    registerFailed(errorMessage: string) {
      this.registerError = errorMessage;
    },
  },
});