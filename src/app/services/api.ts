const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/tasks";
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:8080/api/auth";

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// Auth
export async function register(name: string, email: string, password: string) {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar");
  }

  return response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error("Credenciais inválidas");
  }
  
  return response.json();
}

// Tasks
export async function getTasks() {
  const response = await fetch(API_URL, { headers: authHeaders() });
  return response.json();
}

export async function createTask(task: { title: string; description: string; completed: boolean }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function updateTask(id: number, task: { title: string; description: string; completed: boolean }) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function deleteTask(id: number) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: authHeaders() });
}

export async function createSubTask(taskId: number, subTask: { title: string; completed: boolean }) {
  const response = await fetch(`${API_URL}/${taskId}/subtasks`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(subTask),
  });
  return response.json();
}

export async function updateSubTask(taskId: number, subTaskId: number, subTask: { title: string; completed: boolean }) {
  const response = await fetch(`${API_URL}/${taskId}/subtasks/${subTaskId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(subTask),
  });
  return response.json();
}

export async function deleteSubTask(taskId: number, subTaskId: number) {
  await fetch(`${API_URL}/${taskId}/subtasks/${subTaskId}`, { method: "DELETE", headers: authHeaders() });
}