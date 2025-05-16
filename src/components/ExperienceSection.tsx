import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import InputField from './InputField';
import Button from './Button';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  const { state, addItem, updateItem, removeItem } = useResume();
  const { experience } = state.resumeData;
  
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

  const handleAddExperience = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    addItem('experience', {
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentRole: false,
    });
    setExpandedId(newId);
  };

  const handleUpdateExperience = (id: string, field: string, value: any) => {
    updateItem('experience', id, { [field]: value });
  };

  const handleRemoveExperience = (id: string) => {
    removeItem('experience', id);
    if (expandedId === id) {
      setExpandedId(experience.length > 1 ? experience[0].id : null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleCurrentRole = (id: string, currentValue: boolean) => {
    handleUpdateExperience(id, 'isCurrentRole', !currentValue);
    if (!currentValue) {
      handleUpdateExperience(id, 'endDate', 'Present');
    } else {
      handleUpdateExperience(id, 'endDate', '');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Work Experience</h3>
        <Button onClick={handleAddExperience} type="secondary" size="small" icon={<Plus size={16} />}>
          Add Experience
        </Button>
      </div>
      
      {experience.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          Add your work experience here
        </p>
      ) : (
        <div className="space-y-3">
          {experience.map((exp) => (
            <div 
              key={exp.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div 
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                onClick={() => toggleExpand(exp.id)}
              >
                <div className="font-medium dark:text-white">
                  {exp.role || 'New Position'} 
                  {exp.company && <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">at {exp.company}</span>}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveExperience(exp.id);
                    }}
                    className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                  {expandedId === exp.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedId === exp.id && (
                <div className="p-3 bg-white dark:bg-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      id={`company-${exp.id}`}
                      label="Company"
                      value={exp.company}
                      onChange={(value) => handleUpdateExperience(exp.id, 'company', value)}
                      placeholder="Company Name"
                      required
                    />
                    <InputField
                      id={`role-${exp.id}`}
                      label="Job Title"
                      value={exp.role}
                      onChange={(value) => handleUpdateExperience(exp.id, 'role', value)}
                      placeholder="Software Engineer, Project Manager, etc."
                      required
                    />
                    <InputField
                      id={`startDate-${exp.id}`}
                      label="Start Date"
                      value={exp.startDate}
                      onChange={(value) => handleUpdateExperience(exp.id, 'startDate', value)}
                      placeholder="Jan 2020"
                      required
                    />
                    <div className="space-y-2">
                      <InputField
                        id={`endDate-${exp.id}`}
                        label="End Date"
                        value={exp.endDate}
                        onChange={(value) => handleUpdateExperience(exp.id, 'endDate', value)}
                        placeholder="Dec 2022"
                        disabled={exp.isCurrentRole}
                        required={!exp.isCurrentRole}
                      />
                      <div className="flex items-center">
                        <input
                          id={`currentRole-${exp.id}`}
                          type="checkbox"
                          checked={exp.isCurrentRole}
                          onChange={() => toggleCurrentRole(exp.id, exp.isCurrentRole)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`currentRole-${exp.id}`}
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-400"
                        >
                          Current Position
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <InputField
                      id={`description-${exp.id}`}
                      label="Description"
                      value={exp.description}
                      onChange={(value) => handleUpdateExperience(exp.id, 'description', value)}
                      placeholder="Describe your responsibilities and achievements..."
                      type="textarea"
                      required
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

export default ExperienceSection;