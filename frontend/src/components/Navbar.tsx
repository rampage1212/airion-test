"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated, removeToken } from '../utils/auth';
import { getUserProfileAPI } from '../services/authService';
import { User } from '../types/user';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated()) {
        try {
          const userData = await getUserProfileAPI();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    router.push('/login');
  };

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          <NextLink href="/" passHref>
            <Link _hover={{ textDecoration: 'none' }}>Task Manager</Link>
          </NextLink>
        </Text>

        <Flex alignItems="center">
          <Stack direction="row" spacing={4}>
            {!loading && (
              <>
                {isAuthenticated() ? (
                  <>
                    <NextLink href="/tasks" passHref>
                      <Button as={Link} variant="ghost">
                        Tasks
                      </Button>
                    </NextLink>
                    <NextLink href="/profile" passHref>
                      <Button as={Link} variant="ghost">
                        Profile
                      </Button>
                    </NextLink>
                    <Button variant="ghost" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <NextLink href="/login" passHref>
                      <Button as={Link} variant="ghost">
                        Login
                      </Button>
                    </NextLink>
                    <NextLink href="/register" passHref>
                      <Button as={Link} colorScheme="blue">
                        Register
                      </Button>
                    </NextLink>
                  </>
                )}
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
