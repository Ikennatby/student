"use client";

import { Task } from "@/lib/api";

type TaskCardProps = {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskCard({
  task,
  onToggle,
  onDelete,
}: TaskCardProps) {
  const completed = task.status === "completed";

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3
          className={`text-lg font-semibold ${
            completed
              ? "text-black line-through"
              : "text-black"
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="mt-1 text-black">
            {task.description}
          </p>
        )}

        {task.deadline && (
          <p className="mt-2 text-sm text-gray-500">
            Deadline: {task.deadline}
          </p>
        )}

        <span
          className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
            completed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task)}
          className="rounded-lg border text-black px-3 py-2 text-sm hover:bg-gray-100"
        >
          {completed ? "Mark Pending" : "Complete"}
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
