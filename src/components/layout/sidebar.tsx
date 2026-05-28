import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    BarChart3,
  } from "lucide-react";

import { useSelector } from "react-redux";
  
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      icon: FolderKanban,
    },
    {
      label: "Tasks",
      icon: CheckSquare,
    },
    {
      label: "Analytics",
      icon: BarChart3,
    },
  ];
  
  export function Sidebar() {
    const isSidebarOpen = useSelector(
      (state: any) => state.ui.isSidebarOpen
    );

    if (!isSidebarOpen) {
      return null;
    }

    
    return (
      <aside className="hidden w-64 border-r border-gray-800 bg-black p-6 lg:block">
        <h2 className="mb-10 text-2xl font-bold text-white">
          TaskFlow
        </h2>
  
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
  
            return (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-gray-900 hover:text-white"
              >
                <Icon size={20} />
  
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    );
  }