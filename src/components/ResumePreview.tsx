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

interface ResumePreviewProps {
  className?: string;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ className = '' }, ref) => {
    const { state } = useResume();
    const { resumeData, themeOptions, isDarkMode } = state;
    const { personalInfo, skills, education, languages, projects, experience, certifications } = resumeData;
    
    const colorClass = themeOptions.colorTheme === 'custom' && themeOptions.customColor
      ? '' 
      : getColorClass(themeOptions.colorTheme, isDarkMode);
    
    const fontClass = getFontClass(themeOptions.fontFamily);
    const fontSizeClass = getFontSizeClass(themeOptions.fontSize);
    const borderClass = getBorderClass(themeOptions.borderStyle);
    
    const customStyle = themeOptions.colorTheme === 'custom' && themeOptions.customColor
      ? { '--custom-color': themeOptions.customColor } as React.CSSProperties
      : {};

    // A4 size in pixels (assuming 96 DPI)
    const a4Width = '210mm';
    const a4Height = '297mm';

    return (
      <div 
        ref={ref}
        className={`bg-white dark:bg-white ${borderClass} ${className} mx-auto overflow-hidden`}
        style={{
          ...customStyle,
          width: a4Width,
          height: a4Height,
          maxWidth: '100%',
          maxHeight: '100%',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          transform: 'scale(var(--scale, 1))',
          transformOrigin: 'top center',
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className={`text-2xl font-bold ${fontClass} text-gray-900`}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          
          {/* Contact Information */}
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-700">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin size={14} />
                <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github size={14} />
                <a href={formatUrl(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className={`p-6 ${fontClass} ${fontSizeClass} text-gray-800`}>
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <p className="leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Skills */}
          {skills.some(skill => skill.name) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
                <Wrench size={16} />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter(skill => skill.name)
                  .map((skill, index, array) => (
                    <span key={skill.id}>
                      {skill.name}{index !== array.length - 1 ? ', ' : ''}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experience.some(exp => exp.company && exp.role) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
                <Briefcase size={16} />
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience
                  .filter(exp => exp.company && exp.role)
                  .map((exp) => (
                    <div key={exp.id} className="border-l-2 pl-4 py-2 border-gray-300">
                      <div className="font-medium text-gray-900">{exp.role}</div>
                      <div className="flex justify-between text-gray-700">
                        <span>{exp.company}</span>
                        <span className="text-sm">
                          {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.some(edu => edu.institution && edu.degree) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
                <GraduationCap size={16} />
                Education
              </h2>
              <div className="space-y-4">
                {education
                  .filter(edu => edu.institution && edu.degree)
                  .map((edu) => (
                    <div key={edu.id} className="border-l-2 pl-4 py-2 border-gray-300">
                      <div className="font-medium text-gray-900">{edu.degree}</div>
                      <div className="flex justify-between text-gray-700">
                        <span>{edu.institution}</span>
                        <span className="text-sm">{edu.year}</span>
                      </div>
                      {edu.grade && (
                        <p className="mt-1 text-sm text-gray-600">Grade: {edu.grade}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.some(proj => proj.title) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
                <FolderGit2 size={16} />
                Projects
              </h2>
              <div className="space-y-4">
                {projects
                  .filter(proj => proj.title)
                  .map((proj) => (
                    <div key={proj.id} className="border-l-2 pl-4 py-2 border-gray-300">
                      <div className="font-medium text-gray-900">
                        {proj.title}
                        {proj.link && (
                          <a 
                            href={formatUrl(proj.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-sm text-blue-600 hover:underline"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{proj.technologies}</div>
                      <p className="mt-2 text-sm text-gray-700">{proj.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.some(lang => lang.name) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
                <Globe size={16} />
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {languages
                  .filter(lang => lang.name)
                  .map((lang, index, array) => (
                    <span key={lang.id} className="text-gray-700">
                      {lang.name}{index !== array.length - 1 ? ', ' : ''}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.some(cert => cert.name) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
                <Award size={16} />
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications
                  .filter(cert => cert.name)
                  .map((cert) => (
                    <div key={cert.id} className="border-l-2 pl-4 py-2 border-gray-300">
                      <div className="font-medium text-gray-900">
                        {cert.name}
                        {cert.link && (
                          <a
                            href={formatUrl(cert.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-sm text-blue-600 hover:underline"
                          >
                            Verify
                          </a>
                        )}
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>{cert.issuer}</span>
                        <span className="text-sm">{cert.date}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;