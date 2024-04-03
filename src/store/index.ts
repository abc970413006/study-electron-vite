import { createPinia } from 'pinia';
import { useLoginStore } from './modules/login';
import { useRegisterStore } from './modules/register';
import { useForgetPasswordStore } from './modules/forgetPassword';
import { useChangePasswordStore } from './modules/changePassword';

const pinia = createPinia();

export { useLoginStore, useRegisterStore, useForgetPasswordStore, useChangePasswordStore };
export default pinia;