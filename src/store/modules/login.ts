import { defineStore } from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('login', {
  state: () => ({
    isLoggedIn: false,
    loginLoading: false,
    loginError: '',
  }),
  actions: {
    async login(username: string, password: string) {
      this.loginLoading = true;
      try {
        const response = await axios.post('/api/user/login', { username, password });
        this.isLoggedIn = true;
        // 保存登录信息到本地存储或 Pinia 中
      } catch (error) {
        this.loginError = error.message;
        throw error;
      } finally {
        this.loginLoading = false;
      }
    },
    loginFailed(errorMessage: string) {
      this.loginError = errorMessage;
    },
  },
});