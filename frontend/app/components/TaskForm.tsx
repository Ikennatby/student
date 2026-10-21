"use client";

import { useState } from "react";
import { createTask, Task } from "@/lib/api"

type TaskFormProps = {
    onTaskCreated: (task: Task) => void;
};

export default function TaskForm({ onTaskCreated }: TaskFormProps)
{
    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    
async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setError("");
  setSuccess("");

  if (!title.trim()) {
    setError("Please enter a task title.");
    return;
  }

  try {
    setLoading(true);

    const newTask = await createTask({
      title: title.trim(),
      description: description.trim(),
      deadline: deadline || null,
    });

    onTaskCreated(newTask);

    setTitle("");
    setDescription("");
    setDeadline("");

    setSuccess("Task created successfully!");
  } catch (error) {
    console.error("Failed to create task:", error);
    setError("Could not create the task. Please check your connection and try again.");
  } finally {
    setLoading(false);
  }
}


    return (
        <section className="mb-8 rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Add Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error &&(
                    <p role="alert" className="text-sm text-red-600">
                        {error}
                    </p>  
                )}

                {success && (
                    <p role="status" className="text-green-600">
                        {success}
                    </p>
                )}
                <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="placeholder-gray-400 text-black w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                placeholder="Task description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                className="placeholder-gray-400 text-black w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Deadline
                    </label>

                    <input
                    type="date"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                    className="placeholder-gray-400 text-black rounded-lg border px-4 py-3 outline-none focus:ring-2 focus ring-blue-500"
                    />
                </div>
                <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "Adding..." : "Add Task"}
                </button>
            </form> 
        </section>
    );
}
