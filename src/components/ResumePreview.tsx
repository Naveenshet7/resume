import React, { forwardRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { 
  getColorClass, 
  getFontClass, 
  getFontSizeClass, 
  getBorderClass,
  formatUrl
} from '../utils/helpers';
import { Phone, Mail, Linkedin, Github, Globe, Award, Briefcase, GraduationCap, Wrench, FolderGit2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResumePreviewProps {
  className?: string;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ className = '' }, ref) => {
    const { state } = useResume();
    const { resumeData, themeOptions, isDarkMode } = state;
    const { personalInfo, skills, education, languages, projects, experience, certifications } = resumeData;
    
    const colorClass = themeOptions.colorTheme === 'custom' && themeOptions.customColor
      ? '' // We'll use inline style for custom colors
      : getColorClass(themeOptions.colorTheme, isDarkMode);
    
    const fontClass = getFontClass(themeOptions.fontFamily);
    const fontSizeClass = getFontSizeClass(themeOptions.fontSize);
    const borderClass = getBorderClass(themeOptions.borderStyle);
    
    const customStyle = themeOptions.colorTheme === 'custom' && themeOptions.customColor
      ? { '--custom-color': themeOptions.customColor } as React.CSSProperties
      : {};
    
    const headerColor = themeOptions.colorTheme === 'custom' && themeOptions.customColor
      ? { backgroundColor: themeOptions.customColor, color: 'white' }
      : {};
    
    const sectionHeaderColor = themeOptions.colorTheme === 'custom' && themeOptions.customColor
      ? { color: themeOptions.customColor }
      : {};

    // Apply section spacing
    const sectionSpacing = themeOptions.sectionSpacing || 16;
    console.log('Applying sectionSpacing:', sectionSpacing);

    // Apply new theme options
    const lineHeight = themeOptions.lineHeight || 1.5;
    const marginHorizontal = themeOptions.marginHorizontal || 20;
    const marginVertical = themeOptions.marginVertical || 20;
    const entrySpacing = themeOptions.entrySpacing || 10;

    return (
      <div 
        ref={ref}
        className={`bg-white shadow-lg ${borderClass} ${className}`}
        style={{
          ...customStyle,
          width: '210mm', // Set width to A4 size
          height: '297mm', // Set height to A4 size
          marginLeft: `${marginHorizontal}px`,
          marginRight: `${marginHorizontal}px`,
          marginTop: `${marginVertical}px`,
          marginBottom: `${marginVertical}px`,
        }}
      >
        {/* Header */}
        <div 
          className={`p-6 ${
            themeOptions.layoutStyle === 'Modern' ? borderClass : ''
          }`}
        >
          <h1 className={`text-2xl font-bold ${fontClass}`} style={{ color: 'black' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          
          {/* Contact Information */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm" style={{ color: 'black' }}>
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail size={12} className="mr-1 text-gray-600" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone size={12} className="mr-1 text-gray-600" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin size={12} className="mr-1 text-gray-600" />
                <a 
                  href={formatUrl(personalInfo.linkedin)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center">
                <Github size={12} className="mr-1 text-gray-600" />
                <a 
                  href={formatUrl(personalInfo.github)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
          </div>
        </div>
        {(personalInfo.email || personalInfo.phone || personalInfo.linkedin || personalInfo.github) && (
          <hr className="my-4 mx-auto" style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '93%' }} />
        )}
        
        {/* Body */}
        <div className={`p-6 ${fontClass} ${fontSizeClass}`} style={{ marginBottom: `${sectionSpacing}px`, lineHeight }}>
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6" style={{ marginBottom: `${entrySpacing}px` }}>
              <p>{personalInfo.summary}</p>
            </div>
          )}
          {personalInfo.summary && (
            <hr className="my-4 mx-auto" style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '98%' }} />
          )}
          
          {/* Skills */}
          {skills.some(skill => skill.name) && (
            <div className="mb-6" style={{ marginBottom: `${entrySpacing}px` }}>
              <h2 
                className={`text-lg font-semibold mb-2 flex items-center ${
                  colorClass.replace('bg-', 'text-')
                }`}
                style={sectionHeaderColor}
              >
                <Wrench size={14} className="mr-1 text-gray-600" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter(skill => skill.name)
                  .map((skill, index, array) => (
                    <span key={skill.id} className="text-black">
                      {skill.name}{index !== array.length - 1 ? ', ' : ''}
                    </span>
                  ))}
              </div>
            </div>
          )}
          {skills.some(skill => skill.name) && (
            <hr className="my-4 mx-auto" style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '98%' }} />
          )}
          
          {/* Experience */}
          {experience.some(exp => exp.company && exp.role) && (
            <div className="mb-6" style={{ marginBottom: `${sectionSpacing}px` }}>
              <h2 
                className={`text-lg font-semibold mb-2 flex items-center ${
                  colorClass.replace('bg-', 'text-')
                }`}
                style={sectionHeaderColor}
              >
                <Briefcase size={14} className="mr-1 text-gray-600" />
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience
                  .filter(exp => exp.company && exp.role)
                  .map((exp) => (
                    <div key={exp.id} className="border-l-2 pl-4 py-1 border-gray-300">
                      <div className="font-medium">{exp.role}</div>
                      <div className="flex justify-between">
                        <span>{exp.company}</span>
                        <span className="text-sm text-gray-600">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm">{exp.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {experience.some(exp => exp.company && exp.role) && (
            <hr className="my-4 mx-auto" style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '98%' }} />
          )}
          
          {/* Education */}
          {education.some(edu => edu.institution && edu.degree) && (
            <div className="mb-6" style={{ marginBottom: `${sectionSpacing}px` }}>
              <h2 
                className={`text-lg font-semibold mb-2 flex items-center ${
                  colorClass.replace('bg-', 'text-')
                }`}
                style={sectionHeaderColor}
              >
                <GraduationCap size={14} className="mr-1 text-gray-600" />
                Education
              </h2>
              <div className="space-y-4">
                {education
                  .filter(edu => edu.institution && edu.degree)
                  .map((edu) => (
                    <div key={edu.id} className="border-l-2 pl-4 py-1 border-gray-300">
                      <div className="font-medium">{edu.degree}</div>
                      <div className="flex justify-between">
                        <span>{edu.institution}</span>
                        <span className="text-sm text-gray-600">{edu.year}</span>
                      </div>
                      {edu.grade && (
                        <p className="mt-1 text-sm text-gray-600">Grade: {edu.grade}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
          {education.some(edu => edu.institution && edu.degree) && (
            <hr className="my-4 mx-auto" style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '98%' }} />
          )}
          
          {/* Languages */}
          {languages.some(lang => lang.name) && (
            <div className="mb-6" style={{ marginBottom: `${sectionSpacing}px` }}>
              <h2 
                className={`text-lg font-semibold mb-2 flex items-center ${
                  colorClass.replace('bg-', 'text-')
                }`}
                style={sectionHeaderColor}
              >
                <Globe size={14} className="mr-1 text-gray-600" />
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {languages
                  .filter(lang => lang.name)
                  .map((lang, index, array) => (
                    <span key={lang.id} className="text-black">
                      {lang.name}{index !== array.length - 1 ? ', ' : ''}
                    </span>
                  ))}
              </div>
            </div>
          )}
          {languages.some(lang => lang.name) && (
            <hr className="my-4 mx-auto" style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '98%' }} />
          )}
          
          {/* Projects */}
          {projects.some(proj => proj.title) && (
            <div className="mb-6" style={{ marginBottom: `${sectionSpacing}px` }}>
              <h2 
                className={`text-lg font-semibold mb-2 flex items-center ${
                  colorClass.replace('bg-', 'text-')
                }`}
                style={sectionHeaderColor}
              >
                <FolderGit2 size={14} className="mr-1 text-gray-600" />
                Projects
              </h2>
              <div className="space-y-4">
                {projects
                  .filter(proj => proj.title)
                  .map((proj) => (
                    <div key={proj.id} className="border-l-2 pl-4 py-1 border-gray-300">
                      <div className="font-medium">
                        {proj.title}
                        {proj.link && (
                          <a 
                            href={formatUrl(proj.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-sm text-blue-500 hover:underline"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{proj.technologies}</div>
                      <p className="mt-1 text-sm">{proj.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {projects.some(proj => proj.title) && (
            <hr className="my-4 mx-auto" style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '98%' }} />
          )}
          
          {/* Certifications */}
          {certifications.some(cert => cert.name) && (
            <div className="mb-6" style={{ marginBottom: `${sectionSpacing}px` }}>
              <h2 
                className={`text-lg font-semibold mb-2 flex items-center ${
                  colorClass.replace('bg-', 'text-')
                }`}
                style={sectionHeaderColor}
              >
                <Award size={14} className="mr-1 text-gray-600" />
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications
                  .filter(cert => cert.name)
                  .map((cert) => (
                    <div key={cert.id} className="border-l-2 pl-4 py-1 border-gray-300">
                      <div className="font-medium">
                        {cert.name}
                        {cert.link && (
                          <a
                            href={formatUrl(cert.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-sm text-blue-500 hover:underline"
                          >
                            Verify
                          </a>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span>{cert.issuer}</span>
                        <span className="text-sm text-gray-600">{cert.date}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {certifications.some(cert => cert.name) && (
            <hr className="my-4 mx-auto" style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '98%' }} />
          )}
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';  

export default ResumePreview;  

export const generatePdf = async (
  resumeContainerRef: React.RefObject<HTMLDivElement>,
  fileName: string = 'resume.pdf'
): Promise<void> => {
  try {
    if (resumeContainerRef.current) {
      const canvas = await html2canvas(resumeContainerRef.current);
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(fileName);
    }
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  }
};  