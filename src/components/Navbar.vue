<template>
    <nav class="navbar">
      <div class="navbar-brand">My App</div>
      <ul class="navbar-nav">
        <li class="nav-item" v-if="isLoggedIn">
          <a href="#" @click.prevent="handleLogout">Logout</a>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '@/store/modules/auth';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const isLoggedIn = authStore.isLoggedIn;
  
  const handleLogout = () => {
    authStore.logout();
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f2f2;
    padding: 1rem;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .navbar-nav {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-item {
    margin-left: 1rem;
  }
  
  .nav-item a {
    text-decoration: none;
    color: #333;
  }
  </style>