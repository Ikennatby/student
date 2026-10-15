"use client";

import { useEffect, useState } from "react";
import {
  getTasks,
  updateTask,
  deleteTask,
  Task,
} from "@/lib/api";

import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleTaskCreated(task: Task) {
    setTasks((currentTasks) => [task, ...currentTasks]);
  }

  async function handleToggle(task: Task) {
    try {
      const updatedTask = await updateTask(task.id, {
        status:
          task.status === "pending"
            ? "completed"
            : "pending",
      });

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === updatedTask.id ? updatedTask : item
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Student Task Tracker
          </h1>

          <p className="mt-2 text-gray-600">
            Organize your school tasks and keep track of your
            deadlines.
          </p>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              Tatal Tasks
            </p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {totalTasks}
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              Pending Tasks
            </p>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {pendingTasks}
            </p>
          </div>
          <div className="rounded-xl bg-white
           p-6 shadow">
            <p className="text-sm font-medium text-black-500">
              Completed Tasks
            </p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>
        </section>

        <TaskForm onTaskCreated={handleTaskCreated} />

        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            My Tasks
          </h2>

          {loading ? (
            <p className="text-gray-500">
              Loading tasks...
            </p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500">
              No tasks yet. Add your first task above.
            </p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}