import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import InputField from './InputField';
import Button from './Button';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  const { state, addItem, updateItem, removeItem } = useResume();
  const { projects } = state.resumeData;
  
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);

  const handleAddProject = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    addItem('projects', {
      title: '',
      description: '',
      technologies: '',
      link: '',
    });
    setExpandedId(newId);
  };

  const handleUpdateProject = (id: string, field: string, value: string) => {
    updateItem('projects', id, { [field]: value });
  };

  const handleRemoveProject = (id: string) => {
    removeItem('projects', id);
    if (expandedId === id) {
      setExpandedId(projects.length > 1 ? projects[0].id : null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Projects</h3>
        <Button onClick={handleAddProject} type="secondary" size="small" icon={<Plus size={16} />}>
          Add Project
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          Add your projects here
        </p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div 
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                onClick={() => toggleExpand(project.id)}
              >
                <div className="font-medium dark:text-white">
                  {project.title || 'New Project'}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveProject(project.id);
                    }}
                    className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                  {expandedId === project.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedId === project.id && (
                <div className="p-3 bg-white dark:bg-gray-800">
                  <div className="space-y-4">
                    <InputField
                      id={`title-${project.id}`}
                      label="Project Title"
                      value={project.title}
                      onChange={(value) => handleUpdateProject(project.id, 'title', value)}
                      placeholder="Project Name"
                      required
                    />
                    <InputField
                      id={`description-${project.id}`}
                      label="Description"
                      value={project.description}
                      onChange={(value) => handleUpdateProject(project.id, 'description', value)}
                      placeholder="A brief description of the project and your role"
                      type="textarea"
                      required
                    />
                    <InputField
                      id={`technologies-${project.id}`}
                      label="Technologies Used"
                      value={project.technologies}
                      onChange={(value) => handleUpdateProject(project.id, 'technologies', value)}
                      placeholder="React, Node.js, MongoDB, etc."
                      required
                    />
                    <InputField
                      id={`link-${project.id}`}
                      label="Project Link (Optional)"
                      value={project.link || ''}
                      onChange={(value) => handleUpdateProject(project.id, 'link', value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;