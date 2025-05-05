"use client";

import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../utils/auth';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return (
    <Container maxW="container.md" centerContent py={10}>
      <VStack spacing={8} textAlign="center">
        <Heading as="h1" size="2xl">
          Task Management Application
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Organize your tasks efficiently and boost your productivity
        </Text>
        
        <Box>
          {authenticated ? (
            <Button 
              colorScheme="blue" 
              size="lg"
              onClick={() => router.push('/tasks')}
            >
              Go to Tasks
            </Button>
          ) : (
            <VStack spacing={4}>
              <Button 
                colorScheme="blue" 
                size="lg"
                onClick={() => router.push('/login')}
                width={120}
              >
                Login
              </Button>
              <Button 
                variant="outline" 
                colorScheme="blue"
                size="lg"
                onClick={() => router.push('/register')}
                width={120}
              >
                Register
              </Button>
            </VStack>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
