"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAppDispatch } from "@/redux/hooks";
import { addTaskAsync } from "@/redux/slices/task-slice";

import {
  taskSchema,
  TaskFormData,
} from "@/validations/task-schema";

export default function AddTaskForm() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (
    data: TaskFormData
  ) => {
    if(!user) return;
    
    dispatch(
      addTaskAsync({
        title: data.title,
        userId: user.uid
      })
    );

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6"
    >
      <div className="flex gap-3">
        <Input
          placeholder="Enter task..."
          {...register("title")}
        />

        <Button type="submit"
          variant="secondary">
          Add Task
        </Button>
      </div>

      {errors.title && (
        <p className="mt-2 text-sm text-red-500">
          {errors.title.message}
        </p>
      )}
    </form>
  );
}