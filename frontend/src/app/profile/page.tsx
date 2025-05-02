"use client";

import { useState, useEffect } from 'react';
import { Center, Spinner, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import ProfileForm from '../../components/ProfileForm';
import { getUserProfileAPI, updateUserProfileAPI } from '../../services/authService';
import { User, UserUpdate } from '../../types/user';
import { useAuth } from '../../utils/auth';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const toast = useToast();
  
  // Redirect to login if not authenticated
  const { isAuthenticated } = useAuth('/login');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated) return;
      
      try {
        const userData = await getUserProfileAPI();
        setUser(userData);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load user profile',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, toast]);

  const handleUpdateProfile = async (data: UserUpdate) => {
    setIsUpdating(true);
    try {
      const updatedUser = await updateUserProfileAPI(data);
      setUser(updatedUser);
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Could not update profile',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center minH="80vh">
      {user && (
        <ProfileForm
          user={user}
          onSubmit={handleUpdateProfile}
          isLoading={isUpdating}
        />
      )}
    </Center>
  );
}
