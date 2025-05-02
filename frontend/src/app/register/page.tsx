"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Center, useToast } from '@chakra-ui/react';
import AuthForm from '../../components/AuthForm';
import { registerAPI, loginAPI } from '../../services/authService';
import { UserCreate } from '../../types/user';
import { setToken, isAuthenticated } from '../../utils/auth';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/tasks');
    }
  }, [router]);

  const handleRegister = async (data: UserCreate) => {
    setIsLoading(true);
    try {
      // Register the user
      await registerAPI(data);
      
      // Auto login after successful registration
      const loginResponse = await loginAPI({
        username: data.username,
        password: data.password,
      });
      
      setToken(loginResponse.access_token);
      
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      router.push('/tasks');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Username or email may already be in use',
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
      <AuthForm isLogin={false} onSubmit={handleRegister} isLoading={isLoading} />
    </Center>
  );
}
