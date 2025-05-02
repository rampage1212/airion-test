"use client";

import React from 'react';
import { VStack, Text, Spinner, Center } from '@chakra-ui/react';
import TaskItem from './TaskItem';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading, onDelete }) => {
  if (isLoading) {
    return (
      <Center py={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (tasks.length === 0) {
    return (
      <Center py={10}>
        <Text fontSize="lg" color="gray.500">
          No tasks found. Create a new task to get started!
        </Text>
      </Center>
    );
  }

  return (
    <VStack spacing={4} align="stretch" width="100%">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </VStack>
  );
};

export default TaskList;
