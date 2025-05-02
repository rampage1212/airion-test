"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Center, useToast } from '@chakra-ui/react';
import AuthForm from '../../components/AuthForm';
import { loginAPI } from '../../services/authService';
import { LoginCredentials } from '../../types/user';
import { setToken, isAuthenticated } from '../../utils/auth';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/tasks');
    }
  }, [router]);

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await loginAPI(data);
      setToken(response.access_token);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/tasks');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid username or password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center minH="80vh">
      <AuthForm isLogin={true} onSubmit={handleLogin} isLoading={isLoading} />
    </Center>
  );
}
