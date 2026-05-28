"use client";

import { LogOut, Menu, } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/slices/ui-slice";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/auth-context";

export function Navbar() {
  const { user } = useAuth();

  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.push("/login");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-black px-6">
      <button onClick={() =>
        dispatch(toggleSidebar())
      }
        className="rounded-lg p-2 text-white hover:bg-gray-900"
      >
        <Menu size={22} />
      </button>
      <h1 className="text-xl font-semibold text-white">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">

        <p className="text-sm text-gray-400">
          {user?.email}
        </p>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          <LogOut size={16} />

          Logout
        </button>
      </div>
    </header>
  );
}



{/*
Redux flow for toggle: 
  
dispatch(toggleSidebar())
           ↓
Redux action dispatched
           ↓
ui reducer runs
           ↓
isSidebarOpen changes
           ↓
Redux store updates
           ↓
UI re-renders
  
  */}