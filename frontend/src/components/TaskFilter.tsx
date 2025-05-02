"use client";

import React from 'react';
import {
  Box,
  Flex,
  Select,
  Input,
  FormControl,
  FormLabel,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { TaskFilter as TaskFilterType } from '../types/task';

interface TaskFilterProps {
  filters: TaskFilterType;
  onFilterChange: (filters: TaskFilterType) => void;
  onReset: () => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" mb={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={4}>
        <FormControl>
          <FormLabel>Search</FormLabel>
          <Input
            name="search"
            placeholder="Search tasks..."
            value={filters.search || ''}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            name="status"
            value={filters.status || ''}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Priority</FormLabel>
          <Select
            name="priority"
            value={filters.priority || ''}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Sort By</FormLabel>
          <Select
            name="sort_by"
            value={filters.sort_by || 'created_at'}
            onChange={handleChange}
          >
            <option value="created_at">Creation Date</option>
            <option value="due_date">Due Date</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Sort Order</FormLabel>
          <Select
            name="sort_order"
            value={filters.sort_order || 'desc'}
            onChange={handleChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </FormControl>
      </SimpleGrid>

      <Flex justify="flex-end" mt={4}>
        <Button onClick={onReset} variant="outline">
          Reset Filters
        </Button>
      </Flex>
    </Box>
  );
};

export default TaskFilter;
