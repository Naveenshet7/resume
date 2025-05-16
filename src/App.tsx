import React, { useRef } from 'react';
import { ResumeProvider } from './context/ResumeContext';
import Layout from './components/Layout';
import PersonalInfoSection from './components/PersonalInfoSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import LanguagesSection from './components/LanguagesSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationsSection from './components/CertificationsSection';
import ThemeCustomizer from './components/ThemeCustomizer';
import ResumePreview from './components/ResumePreview';
import ActionButtons from './components/ActionButtons';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  const resumeRef = useRef<HTMLDivElement>(null);
  
  // Content for the sidebar (form)
  const renderSidebarContent = () => (
    <>
      <PersonalInfoSection />
      <SkillsSection />
      <EducationSection />
      <LanguagesSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ThemeCustomizer />
    </>
  );
  
  // Content for the main area (preview)
  const renderMainContent = () => (
    <div className="sticky top-4">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Resume Preview</h2>
      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-inner overflow-auto max-h-[calc(100vh-150px)]">
        <ResumePreview ref={resumeRef} className="max-w-[800px] mx-auto" />
      </div>
      <ActionButtons resumeContainerRef={resumeRef} />
    </div>
  );
  
  return (
    <ResumeProvider>
      <AppContent 
        sidebarContent={renderSidebarContent()}
        mainContent={renderMainContent()}
      />
    </ResumeProvider>
  );
}

// Separate component to use hooks within the ResumeProvider context
const AppContent: React.FC<{
  sidebarContent: React.ReactNode;
  mainContent: React.ReactNode;
}> = ({ sidebarContent, mainContent }) => {
  useKeyboardShortcuts();
  
  return (
    <Layout 
      sidebarContent={sidebarContent}
      mainContent={mainContent}
    />
  );
};

export default App;