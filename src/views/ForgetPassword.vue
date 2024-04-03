<template>
    <div class="forget-password-container">
      <a-form
        :model="forgetPasswordForm"
        name="forget-password"
        :rules="forgetPasswordRules"
        @finish="onForgetPassword"
        @finishFailed="onForgetPasswordFailed"
      >
        <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="forgetPasswordForm.username" placeholder="Username" />
        </a-form-item>
  
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="forgetPasswordLoading">
            Forget Password
          </a-button>
        </a-form-item>
  
        <a-form-item>
          <a-button type="link" @click="navigateToLogin">
            Login
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
  import { useForgetPasswordStore } from '@/store/modules/forgetPassword';
  
  const router = useRouter();
  const forgetPasswordStore = useForgetPasswordStore();
//   async function handleForgetPassword(username: string) {
//   try {
//     await forgetPasswordStore.forgetPassword(username);
//     // 忘记密码操作成功后的逻辑
//   } catch (error) {
//     forgetPasswordStore.forgetPasswordFailed(error.message);
//     // 忘记密码操作失败后的错误处理
//   }
// }
  
  const forgetPasswordForm = reactive({
    username: '',
  });
  
  const forgetPasswordRules = {
    username: [{ required: true, message: 'Please input your username!' }],
  };
  
  const forgetPasswordLoading = ref(false);
  
  const onForgetPassword = async () => {
    forgetPasswordLoading.value = true;
    try {
      await forgetPasswordStore.forgetPassword(forgetPasswordForm.username);
      forgetPasswordStore.forgetPasswordSuccessful();
      router.push('/login');
    } catch (error) {
      forgetPasswordStore.forgetPasswordFailed(error.message);
    } finally {
      forgetPasswordLoading.value = false;
    }
  };
  
  const onForgetPasswordFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const navigateToLogin = () => {
    router.push('/login');
  };
  
  const navigateBack = () => {
    router.go(-1);
  };
  </script>
  
  <style scoped>
  .forget-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>