import { defineStore } from 'pinia';
import axios from 'axios';

export const useChangePasswordStore = defineStore('changePassword', {
  state: () => ({
    changePasswordLoading: false,
    changePasswordError: '',
    changePasswordSuccessful: false,
  }),
  actions: {
    async changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
      this.changePasswordLoading = true;
      try {
        const response = await axios.post('/api/user/change-password', {
          currentPassword,
          newPassword,
          confirmPassword,
        });
        this.changePasswordSuccessful = true;
        // 处理密码更改成功的逻辑
      } catch (error) {
        this.changePasswordError = error.message;
        throw error;
      } finally {
        this.changePasswordLoading = false;
      }
    },
    changePasswordFailed(errorMessage: string) {
      this.changePasswordError = errorMessage;
    },
    changePasswordSuccessful() {
      this.changePasswordSuccessful = true;
    },
  },
});