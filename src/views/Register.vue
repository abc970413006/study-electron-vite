<template>
    <div class="register-container">
      <a-form
        :model="registerForm"
        name="register"
        :rules="registerRules"
        @finish="onRegister"
        @finishFailed="onRegisterFailed"
      >
        <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="registerForm.username" placeholder="Username" />
        </a-form-item>
  
        <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="registerForm.password" placeholder="Password" />
        </a-form-item>
  
        <a-form-item name="confirmPassword" :rules="[{ required: true, message: 'Please confirm your password!' }]">
          <a-input-password v-model:value="registerForm.confirmPassword" placeholder="Confirm Password" />
        </a-form-item>
  
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="registerLoading">
            Register
          </a-button>
        </a-form-item>
  
        <a-form-item>
          <a-button type="link" @click="navigateToLogin">
            Login
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRegisterStore } from '@/store/modules/register';
  const router = useRouter();

const registerStore = useRegisterStore();

// async function handleRegister(username: string, password: string, email: string) {
//   try {
//     await registerStore.register(username, password, email);
//     // 注册成功后的操作
//   } catch (error) {
//     registerStore.registerFailed(error.message);
//     // 注册失败后的错误处理
//   }
// }
  
  const registerForm = reactive({
    username: '',
    password: '',
    confirmPassword: '',
  });
  
  const registerRules = {
    username: [{ required: true, message: 'Please input your username!' }],
    password: [{ required: true, message: 'Please input your password!' }],
    confirmPassword: [{ required: true, message: 'Please confirm your password!' }],
  };
  
  const registerLoading = ref(false);
  
  const onRegister = async () => {
    registerLoading.value = true;
    try {
      await registerStore.register(registerForm.username, registerForm.password);
      registerStore.registerSuccessful();
      router.push('/login');
    } catch (error) {
      registerStore.registerFailed(error.message);
    } finally {
      registerLoading.value = false;
    }
  };
  
  const onRegisterFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const navigateToLogin = () => {
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>