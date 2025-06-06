import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area'; // For content that might overflow

interface SidebarProps {
  children: React.ReactNode; // To pass NavigationMenu and other sidebar items
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, className = '' }) => {
  console.log("Rendering Sidebar");

  // Doraemon theme: bright colors, rounded corners.
  // Using placeholder Tailwind colors, replace with actual theme colors.
  // e.g., bg-doraemon-blue-light, border-doraemon-blue-dark
  // text-doraemon-text-primary
  return (
    <aside
      className={`h-screen w-64 bg-blue-100 /* Doraemon light blue */ border-r border-blue-300 /* Doraemon border */ p-4 flex flex-col fixed top-0 left-0 z-40 ${className}`}
    >
      <div className="mb-4">
        {/* Placeholder for Logo or App Name, potentially styled with Doraemon theme */}
        <h1 className="text-2xl font-bold text-blue-700 /* Doraemon primary text */">
          MusicApp
        </h1>
      </div>
      <ScrollArea className="flex-grow">
        {children}
      </ScrollArea>
      <div className="mt-auto pt-4 border-t border-blue-300 /* Doraemon border */">
        {/* Placeholder for user profile link or settings */}
        <p className="text-xs text-blue-600 /* Doraemon secondary text */">© Doraemon Music</p>
      </div>
    </aside>
  );
};

export default Sidebar;