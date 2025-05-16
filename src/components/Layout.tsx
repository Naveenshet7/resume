import React, { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  sidebarContent: React.ReactNode;
  mainContent: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebarContent, mainContent }) => {
  const { state } = useResume();
  const { isDarkMode } = state;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900">
        <ThemeToggle />
        <div className="container mx-auto p-4">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-center dark:text-white">AI Resume Builder</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
              Create a professional resume in minutes
            </p>
          </header>
          
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mb-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md"
            >
              {sidebarOpen ? 'Hide Editor' : 'Show Editor'}
            </button>
          )}
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sidebar */}
            <div 
              className={`transition-all duration-300 ${
                sidebarOpen 
                  ? 'max-h-[2000px] opacity-100' 
                  : 'max-h-0 opacity-0 overflow-hidden md:max-h-[2000px] md:opacity-100'
              } md:w-1/2 lg:w-2/5 space-y-4`}
            >
              {sidebarContent}
            </div>
            
            {/* Main Content */}
            <div className="md:w-1/2 lg:w-3/5">
              {mainContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;