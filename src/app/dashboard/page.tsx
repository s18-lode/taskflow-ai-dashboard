"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-sm text-gray-400">
              Total Projects
            </h3>

            <p className="mt-4 text-3xl font-bold text-white">
              12
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-sm text-gray-400">
              Completed Tasks
            </h3>

            <p className="mt-4 text-3xl font-bold text-white">
              86
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-sm text-gray-400">
              Pending Tasks
            </h3>

            <p className="mt-4 text-3xl font-bold text-white">
              24
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-sm text-gray-400">
              Team Members
            </h3>

            <p className="mt-4 text-3xl font-bold text-white">
              8
            </p>
          </div>

        </div>

      </DashboardLayout>
    </ProtectedRoute>
  );
}