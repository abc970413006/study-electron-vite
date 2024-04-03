import { defineStore } from 'pinia';
import axios from 'axios';

export const useForgetPasswordStore = defineStore('forgetPassword', {
  state: () => ({
    forgetPasswordLoading: false,
    forgetPasswordError: '',
    forgetPasswordSuccessful: false,
  }),
  actions: {
    async forgetPassword(username: string) {
      this.forgetPasswordLoading = true;
      try {
        const response = await axios.post('/api/user/forget-password', { username });
        this.forgetPasswordSuccessful = true;
        // 处理忘记密码操作成功的逻辑
      } catch (error) {
        this.forgetPasswordError = error.message;
        throw error;
      } finally {
        this.forgetPasswordLoading = false;
      }
    },
    forgetPasswordFailed(errorMessage: string) {
      this.forgetPasswordError = errorMessage;
    },
    forgetPasswordSuccessful() {
      this.forgetPasswordSuccessful = true;
    },
  },
});