export interface SubTask {
  id?: number;
  title: string;
  completed: boolean;
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  subTasks?: SubTask[];
}

