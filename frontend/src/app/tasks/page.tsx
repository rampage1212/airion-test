"use client";

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  useToast,
  Flex,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import TaskList from '../../components/TaskList';
import TaskFilter from '../../components/TaskFilter';
import { getTasksAPI, deleteTaskAPI } from '../../services/taskService';
import { Task, TaskFilter as TaskFilterType } from '../../types/task';
import { useAuth } from '../../utils/auth';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filters, setFilters] = useState<TaskFilterType>({
    sort_by: 'created_at',
    sort_order: 'desc',
  });
  const router = useRouter();
  const toast = useToast();
  
  // Redirect to login if not authenticated
  const { isAuthenticated } = useAuth('/login');

  const fetchTasks = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const tasksData = await getTasksAPI(filters);
      setTasks(tasksData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load tasks',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters, isAuthenticated, toast]);

  const handleFilterChange = (newFilters: TaskFilterType) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      sort_by: 'created_at',
      sort_order: 'desc',
    });
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteTaskAPI(id);
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: 'Task deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>My Tasks</Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={() => router.push('/tasks/create')}
        >
          Create Task
        </Button>
      </Flex>

      <TaskFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        onDelete={handleDelete}
      />
    </Box>
  );
}
