"use client";

import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  useToast,
  VStack,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import TaskForm from '../../../components/TaskForm';
import { getTaskByIdAPI, updateTaskAPI } from '../../../services/taskService';
import { Task, TaskUpdate } from '../../../types/task';
import { useAuth } from '../../../utils/auth';

export default function EditTask() {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const toast = useToast();
  
  // Redirect to login if not authenticated
  const { isAuthenticated } = useAuth('/login');

  useEffect(() => {
    const fetchTask = async () => {
      if (!isAuthenticated || !id) return;
      
      setIsLoading(true);
      try {
        const taskData = await getTaskByIdAPI(parseInt(id));
        setTask(taskData);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load task',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        router.push('/tasks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id, isAuthenticated, router, toast]);

  const handleUpdateTask = async (data: TaskUpdate) => {
    if (!id) return;
    
    setIsUpdating(true);
    try {
      await updateTaskAPI(parseInt(id), data);
      toast({
        title: 'Task updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/tasks');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task',
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
    <Box maxW="800px" mx="auto">
      <VStack spacing={8} align="stretch">
        <Heading>Edit Task</Heading>
        {task && (
          <TaskForm
            initialData={task}
            onSubmit={handleUpdateTask}
            isLoading={isUpdating}
          />
        )}
      </VStack>
    </Box>
  );
}
