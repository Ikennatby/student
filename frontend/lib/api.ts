const API_BASE_URL = "http://127.0.0.1:8000/api";

export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string | null;
  status: "pending" | "completed";
  created_at: string;
}

export type CreateTaskData = {
  title: string;
  description: string;
  deadline: string | null;
  status?: "pending" | "completed";
};

// Checks whether Django returned a successful response
async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    cache: "no-store",
  });

  await handleResponse(response);

  return response.json();
}

export async function createTask(
  data: CreateTaskData
): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await handleResponse(response);

  return response.json();
}

export async function updateTask(
  id: number,
  data: Partial<CreateTaskData>
): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await handleResponse(response);

  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
    method: "DELETE",
  });

  await handleResponse(response);
}