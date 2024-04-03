<template>
    <div class="change-password-container">
      <a-form
        :model="changePasswordForm"
        name="change-password"
        :rules="changePasswordRules"
        @finish="onChangePassword"
        @finishFailed="onChangePasswordFailed"
      >
        <a-form-item name="currentPassword" :rules="[{ required: true, message: 'Please input your current password!' }]">
          <a-input-password v-model:value="changePasswordForm.currentPassword" placeholder="Current Password" />
        </a-form-item>
  
        <a-form-item name="newPassword" :rules="[{ required: true, message: 'Please input your new password!' }]">
          <a-input-password v-model:value="changePasswordForm.newPassword" placeholder="New Password" />
        </a-form-item>
  
        <a-form-item name="confirmPassword" :rules="[{ required: true, message: 'Please confirm your new password!' }]">
          <a-input-password v-model:value="changePasswordForm.confirmPassword" placeholder="Confirm Password" />
        </a-form-item>
  
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="changePasswordLoading">
            Change Password
          </a-button>
        </a-form-item>
  
        <a-form-item>
          <a-button type="link" @click="navigateBack">
            Back
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useChangePasswordStore } from '@/store/modules/changePassword';
  
  const router = useRouter();
  const changePasswordStore = useChangePasswordStore();
  
  const changePasswordForm = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const changePasswordRules = {
    currentPassword: [{ required: true, message: 'Please input your current password!' }],
    newPassword: [{ required: true, message: 'Please input your new password!' }],
    confirmPassword: [{ required: true, message: 'Please confirm your new password!' }],
  };
  
  const changePasswordLoading = ref(false);
  
  const onChangePassword = async () => {
    changePasswordLoading.value = true;
    try {
      await changePasswordStore.changePassword(
        changePasswordForm.currentPassword,
        changePasswordForm.newPassword,
        changePasswordForm.confirmPassword
      );
      changePasswordStore.changePasswordSuccessful();
      router.push('/');
    } catch (error) {
      changePasswordStore.changePasswordFailed(error.message);
    } finally {
      changePasswordLoading.value = false;
    }
  };
  
  const onChangePasswordFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const navigateBack = () => {
    router.go(-1);
  };
  </script>
  
  <style scoped>
  .change-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>