"use client";

import api from './api';
import { UserCreate, LoginCredentials, User, UserUpdate, Token } from '../types/user';

export const registerAPI = async (userData: UserCreate) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginAPI = async (credentials: LoginCredentials) => {
  const response = await api.post('/users/login', null, {
    params: {
      username: credentials.username,
      password: credentials.password,
    },
  });
  return response.data as Token;
};

export const getUserProfileAPI = async () => {
  const response = await api.get('/users/me');
  return response.data as User;
};

export const updateUserProfileAPI = async (userData: UserUpdate) => {
  const response = await api.put('/users/me', userData);
  return response.data as User;
};
