const API_URL = "http://localhost:8080/api/tasks";

export async function getTasks() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createTask(task: { title: string; description: string; completed: boolean }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function updateTask(id: number, task: { title: string; description: string; completed: boolean }) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function deleteTask(id: number) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export async function createSubTask(taskId: number, subTask: { title: string; completed: boolean }) {
  const response = await fetch(`${API_URL}/${taskId}/subtasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subTask),
  });
  return response.json();
}

export async function updateSubTask(taskId: number, subTaskId: number, subTask: { title: string; completed: boolean }) {
  const response = await fetch(`${API_URL}/${taskId}/subtasks/${subTaskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subTask),
  });
  return response.json();
}

export async function deleteSubTask(taskId: number, subTaskId: number) {
  await fetch(`${API_URL}/${taskId}/subtasks/${subTaskId}`, { method: "DELETE" });
}