import React, { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* Sidebar for mobile (overlay) */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
      />

      <div
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-md transition-transform transform md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Page content */}
        <main className="flex-1 p-4 mt-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
