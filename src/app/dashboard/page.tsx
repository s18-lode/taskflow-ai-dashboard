"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import AddTaskForm from "@/components/tasks/AddTaskForm";
import { useEffect } from "react";
import { getTasks, toggleTask, deleteTask, editTask } from "@/redux/slices/task-slice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";
import { Button } from "@/components/ui/button";


export default function DashboardPage() {

  const dispatch = useAppDispatch();

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
    dispatch(getTasks());
  }, [dispatch]);

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

          <div className="space-y-3">

            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg border border-gray-800 p-4"
              >
                <div>
                  <p className="text-white">
                    {task.title}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${task.completed
                      ? "bg-green-600"
                      : "bg-yellow-600"
                      }`}
                  >
                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </span>

                  {/* Toggle tasl completed/pending */}
                  <Button
                    onClick={() =>
                      dispatch(toggleTask(task.id))
                    }
                    className="rounded-full px-3 py-1 text-sm"
                  >
                    Toggle
                  </Button>

                  {/* Edit the task */}
                  <Button
                    onClick={() => {
                      const newTitle = prompt(
                        "Edit Task",
                        task.title
                      );

                      if (
                        newTitle &&
                        newTitle.trim()
                      ) {
                        dispatch(
                          editTask({
                            id: task.id,
                            title: newTitle,
                          })
                        );
                      }
                    }}
                    className="rounded-full px-3 py-1 text-sm"
                  >
                    Edit
                  </Button>

                  {/* Delete the task */}
                  <Button
                    onClick={() => {
                      dispatch(deleteTask(task.id));
                    }}
                    className="rounded-full px-3 py-1 text-sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>

            ))}

          </div>

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