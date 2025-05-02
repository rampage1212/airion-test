"use client";

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  HStack,
  IconButton,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Task } from '../types/task';
import { useRouter } from 'next/navigation';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'in-progress':
        return 'blue';
      case 'completed':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  const handleEdit = () => {
    router.push(`/tasks/${task.id}`);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={bgColor}
      borderColor={borderColor}
      width="100%"
    >
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Heading fontSize="xl">{task.title}</Heading>
          <Text mt={2} color="gray.600">
            {task.description || 'No description'}
          </Text>
          
          <HStack mt={4} spacing={2}>
            <Badge colorScheme={getStatusColor(task.status)}>
              {task.status}
            </Badge>
            <Badge colorScheme={getPriorityColor(task.priority)}>
              {task.priority} priority
            </Badge>
            <Text fontSize="sm" color="gray.500">
              Due: {formatDate(task.due_date)}
            </Text>
          </HStack>
        </Box>

        <HStack>
          <IconButton
            aria-label="Edit task"
            icon={<EditIcon />}
            size="sm"
            onClick={handleEdit}
          />
          <IconButton
            aria-label="Delete task"
            icon={<DeleteIcon />}
            size="sm"
            colorScheme="red"
            onClick={handleDelete}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default TaskItem;
