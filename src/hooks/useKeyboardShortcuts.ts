import { useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { suggestProfessionalSummary, suggestSkills, suggestEducation, suggestCertifications } from '../utils/aiSuggestions';

export const useKeyboardShortcuts = () => {
  const { state, updatePersonalInfo, addItem, removeItem } = useResume();
  
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      // Only process if Alt key is not pressed (to avoid conflicts with browser shortcuts)
      if (e.altKey) return;
      
      // Check for specific keys
      switch (e.key.toLowerCase()) {
        case 's':
          // Alt+S: Suggest professional summary
          if (document.activeElement?.tagName !== 'INPUT' && 
              document.activeElement?.tagName !== 'TEXTAREA') {
            e.preventDefault();
            
            try {
              const skillNames = state.resumeData.skills.map(skill => skill.name).filter(Boolean);
              const summary = await suggestProfessionalSummary(
                state.resumeData.personalInfo.fullName, 
                skillNames
              );
              updatePersonalInfo({ summary });
            } catch (error) {
              console.error('Failed to generate summary:', error);
            }
          }
          break;
          
        case 'd':
          // Alt+D: Suggest skills
          if (document.activeElement?.tagName !== 'INPUT' && 
              document.activeElement?.tagName !== 'TEXTAREA') {
            e.preventDefault();
            
            try {
              const currentSkills = state.resumeData.skills.map(skill => skill.name).filter(Boolean);
              const suggestedSkills = await suggestSkills(currentSkills);
              
              // Add suggested skills
              suggestedSkills.forEach(skill => {
                addItem('skills', { name: skill });
              });
            } catch (error) {
              console.error('Failed to suggest skills:', error);
            }
          }
          break;
          
        case 'e':
          // Alt+E: Suggest education
          if (document.activeElement?.tagName !== 'INPUT' && 
              document.activeElement?.tagName !== 'TEXTAREA') {
            e.preventDefault();
            
            try {
              const suggestedEducation = await suggestEducation();
              
              // Replace current education with suggested education
              state.resumeData.education.forEach(edu => {
                removeItem('education', edu.id);
              });
              
              suggestedEducation.forEach(edu => {
                addItem('education', {
                  institution: edu.institution,
                  degree: edu.degree,
                  year: edu.year,
                  grade: edu.grade,
                });
              });
            } catch (error) {
              console.error('Failed to suggest education:', error);
            }
          }
          break;
          
        case 'c':
          // Alt+C: Suggest certifications
          if (document.activeElement?.tagName !== 'INPUT' && 
              document.activeElement?.tagName !== 'TEXTAREA') {
            e.preventDefault();
            
            try {
              const skillNames = state.resumeData.skills.map(skill => skill.name).filter(Boolean);
              const suggestedCertifications = await suggestCertifications(skillNames);
              
              // Add suggested certifications
              suggestedCertifications.forEach(cert => {
                addItem('certifications', {
                  name: cert.name,
                  issuer: cert.issuer,
                  date: cert.date,
                  link: cert.link || '',
                });
              });
            } catch (error) {
              console.error('Failed to suggest certifications:', error);
            }
          }
          break;
          
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state, updatePersonalInfo, addItem, removeItem]);
};