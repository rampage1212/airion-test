"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { UserCreate, LoginCredentials } from '../types/user';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: UserCreate | LoginCredentials) => Promise<void>;
  isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSubmit, isLoading }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!isLogin && !email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!isLogin && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (!isLogin && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isLogin) {
        await onSubmit({ username, password });
      } else {
        await onSubmit({ username, email, password });
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <Box
      p={8}
      maxWidth="400px"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      bg="white"
    >
      <VStack spacing={4} align="flex-start">
        <Heading>{isLogin ? 'Login' : 'Register'}</Heading>
        <Box as="form" onSubmit={handleSubmit} width="100%">
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.username} isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>

            {!isLogin && (
              <FormControl isInvalid={!!errors.email} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
            )}

            <FormControl isInvalid={!!errors.password} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button
              width="full"
              mt={4}
              colorScheme="blue"
              isLoading={isLoading}
              type="submit"
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </VStack>
        </Box>
        <Text align="center" width="100%">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <NextLink href={isLogin ? '/register' : '/login'} passHref>
            <Link color="blue.500">{isLogin ? 'Register' : 'Login'}</Link>
          </NextLink>
        </Text>
      </VStack>
    </Box>
  );
};

export default AuthForm;
