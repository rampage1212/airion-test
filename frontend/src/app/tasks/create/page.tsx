"use client";

import { useState } from 'react';
import {
  Box,
  Heading,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import TaskForm from '../../../components/TaskForm';
import { createTaskAPI } from '../../../services/taskService';
import { TaskCreate } from '../../../types/task';
import { useAuth } from '../../../utils/auth';

export default function CreateTask() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  
  // Redirect to login if not authenticated
  useAuth('/login');

  const handleCreateTask = async (data: TaskCreate) => {
    setIsLoading(true);
    try {
      await createTaskAPI(data);
      toast({
        title: 'Task created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/tasks');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="800px" mx="auto">
      <VStack spacing={8} align="stretch">
        <Heading>Create New Task</Heading>
        <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />
      </VStack>
    </Box>
  );
}
