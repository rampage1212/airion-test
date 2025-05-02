"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false;
};

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};

export const useAuth = (redirectTo?: string) => {
  const router = useRouter();

  useEffect(() => {
    // if (!isAuthenticated() && redirectTo) {
    //   router.push(redirectTo);
    // }
  }, [router, redirectTo]);

  return { isAuthenticated: isAuthenticated() };
};
