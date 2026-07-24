"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import AddTaskForm from "@/components/forms/AddTaskForm";
import { useEffect } from "react";
import { getTasks, toggleTaskAsync, deleteTaskAsync, editTaskAsync, addTaskAsync } from "@/redux/slices/task-slice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import TaskList from "@/components/dashboard/TaskList";

export default function DashboardPage() {

  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const { tasks, loading, error, } = useAppSelector((state) => state.tasks);

  const totalTasks = tasks.length;
  //Derived State = Means value calculate from existing data
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;


  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);



  // useEffect runs AFTER the first render.
  useEffect(() => {
    if (user) {
      dispatch(getTasks(user.uid));
    }
  }, [dispatch, user]);

  // While loading show this UI 
  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          Loading tasks...
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  //If there is error the This ui
  if (error) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          {error}
        </DashboardLayout>
      </ProtectedRoute>
    );
  }


  //default ui 
  return (
    <ProtectedRoute>
      <DashboardLayout>

        {/* All calculated value  */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-sm text-gray-400">
              Total Projects
            </h3>

            <p className="mt-4 text-3xl font-bold text-white">
              {totalTasks}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-sm text-gray-400">
              Completed Tasks
            </h3>

            <p className="mt-4 text-3xl font-bold text-white">
              {completedTasks}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-sm text-gray-400">
              Pending Tasks
            </h3>

            <p className="mt-4 text-3xl font-bold text-white">
              {pendingTasks}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-sm text-gray-400">
              Team Members
            </h3>

            <p className="mt-4 text-3xl font-bold text-white">
              {completionRate}%
            </p>
          </div>
          {/* <p className="mb-4 text-white">
            Tasks Count: {tasks.length}
          </p> */}
        </div>


        {/* All Task from Data */}

        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
          {/* Add Task */}
          <AddTaskForm />

          <h2 className="mb-4 text-xl font-semibold text-white">
            Recent Tasks
          </h2>
          {user && (
            <TaskList
              tasks={tasks}
              userId={user.uid}
              onToggle={(id, completed) => {
                if (!user) return;

                dispatch(
                  toggleTaskAsync({
                    id,
                    completed,
                    userId: user.uid,
                  })
                );
              }}
              onEdit={(id, title) => {
                if (!user) return;

                dispatch(
                  editTaskAsync({
                    id,
                    title,
                    userId: user.uid,
                  })
                );
              }}
              onDelete={(id) => {
                if (!user) return;

                dispatch(
                  deleteTaskAsync({
                    id,
                    userId: user.uid,
                  })
                );
              }}
              onAddSubTask={(title, parentId) => {
                if (!user) return;

                dispatch(
                  addTaskAsync({
                    title,
                    userId: user.uid,
                    parentId,
                  })
                );
              }}
            />
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}



{/* 
  Dashboard Opens
      ↓
useEffect runs
      ↓
dispatch(getTasks())
      ↓
pending
      ↓
loading = true
      ↓
API call
      ↓
fulfilled
      ↓
tasks = response
      ↓
loading = false
      ↓
UI updates automatically
*/}