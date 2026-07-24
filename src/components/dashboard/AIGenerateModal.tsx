"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AIGenerateModalProps {
  open: boolean;
  taskTitle: string;
  onClose: () => void;
}

export default function AIGenerateModal({
  open,
  taskTitle,
  onClose,
}: AIGenerateModalProps) {
  if (!open) return null;

  const [loading, setLoading] = useState(false);
  const [generatedSubtasks, setGeneratedSubtasks] = useState<string[]>([]);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/ai/generate-subtasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: taskTitle,
        }),
      });

      const data = await response.json();

      setGeneratedSubtasks(data.subtasks || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-xl bg-gray-900 p-6">

        <h2 className="text-2xl font-semibold text-white">
          Generate AI Subtasks
        </h2>

        <p className="mt-2 text-gray-400">
          AI will break this task into smaller actionable subtasks.
        </p>

        <div className="mt-6 rounded-lg border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            Parent Task
          </p>

          <p className="mt-2 text-lg text-white">
            {taskTitle}
          </p>
        </div>

        {generatedSubtasks.length > 0 && (
          <div className="mt-6 rounded-lg border border-gray-700 p-4">
            <h3 className="mb-3 font-medium text-white">
              Generated Subtasks
            </h3>

            <ul className="space-y-2">
              {generatedSubtasks.map((task, index) => (
                <li
                  key={index}
                  className="text-gray-300"
                >
                  • {task}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "🤖 Generate"}
          </Button>

        </div>

      </div>
    </div>
  );
}