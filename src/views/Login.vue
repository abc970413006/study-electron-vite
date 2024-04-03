<template>
    <div class="login-container">
      <a-form
        :model="loginForm"
        name="login"
        :rules="loginRules"
        @finish="onLogin"
        @finishFailed="onLoginFailed"
      >
        <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="loginForm.username" placeholder="Username" />
        </a-form-item>
  
        <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="loginForm.password" placeholder="Password" />
        </a-form-item>
  
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loginLoading">
            Login
          </a-button>
        </a-form-item>
  
        <a-form-item>
          <a-button type="link" @click="navigateToRegister">
            Register
          </a-button>
          <a-button type="link" @click="navigateToForgetPassword">
            Forgot Password
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useLoginStore } from '@/store/modules/login';
  
  const router = useRouter();
  const loginStore = useLoginStore();
  
  const loginForm = reactive({
    username: '',
    password: '',
  });
  
  const loginRules = {
    username: [{ required: true, message: 'Please input your username!' }],
    password: [{ required: true, message: 'Please input your password!' }],
  };
  
  const loginLoading = ref(false);
  
  const onLogin = async () => {
    loginLoading.value = true;
    try {
      await loginStore.login(loginForm.username, loginForm.password);
      router.push('/');
    } catch (error) {
      loginStore.loginFailed(error.message);
    } finally {
      loginLoading.value = false;
    }
  };
  
  const onLoginFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const navigateToRegister = () => {
    router.push('/register');
  };
  
  const navigateToForgetPassword = () => {
    router.push('/forget-password');
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>