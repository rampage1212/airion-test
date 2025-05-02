"use client";

import api from './api';
import { Task, TaskCreate, TaskUpdate, TaskFilter } from '../types/task';

export const createTaskAPI = async (taskData: TaskCreate) => {
  const response = await api.post('/tasks', taskData);
  return response.data as Task;
};

export const getTasksAPI = async (filters?: TaskFilter) => {
  const response = await api.get('/tasks', {
    params: filters,
  });
  return response.data as Task[];
};

export const getTaskByIdAPI = async (taskId: number) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data as Task;
};

export const updateTaskAPI = async (taskId: number, taskData: TaskUpdate) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data as Task;
};

export const deleteTaskAPI = async (taskId: number) => {
  await api.delete(`/tasks/${taskId}`);
};
