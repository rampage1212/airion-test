export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: string;
  updated_at: string | null;
  user_id: number;
}

export interface TaskCreate {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string | null;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string | null;
}

export interface TaskFilter {
  status?: string;
  priority?: string;
  search?: string;
  sort_by?: 'created_at' | 'due_date';
  sort_order?: 'asc' | 'desc';
}
