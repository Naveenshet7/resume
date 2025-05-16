import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import InputField from './InputField';
import Button from './Button';
import { ChevronDown, ChevronUp, Plus, Trash2, Sparkles } from 'lucide-react';
import { suggestEducation } from '../utils/aiSuggestions';

const EducationSection: React.FC = () => {
  const { state, addItem, updateItem, removeItem } = useResume();
  const { education } = state.resumeData;
  
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);
  const [isSuggestingEducation, setIsSuggestingEducation] = useState(false);

  const handleAddEducation = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    addItem('education', {
      institution: '',
      degree: '',
      year: '',
      grade: '',
    });
    setExpandedId(newId);
  };

  const handleUpdateEducation = (id: string, field: string, value: string) => {
    updateItem('education', id, { [field]: value });
  };

  const handleRemoveEducation = (id: string) => {
    removeItem('education', id);
    if (expandedId === id) {
      setExpandedId(education.length > 1 ? education[0].id : null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSuggestEducation = async () => {
    setIsSuggestingEducation(true);
    try {
      const suggestedEducation = await suggestEducation();
      
      // Replace current education with suggested education
      education.forEach(edu => {
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
      
      if (suggestedEducation.length > 0) {
        setExpandedId(null); // Collapse all after suggestion
      }
    } catch (error) {
      console.error('Failed to suggest education:', error);
    } finally {
      setIsSuggestingEducation(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Education</h3>
        <div className="flex space-x-2">
          <Button
            onClick={handleSuggestEducation}
            type="ai"
            size="small"
            isLoading={isSuggestingEducation}
            icon={<Sparkles size={16} />}
          >
            Suggest (E)
          </Button>
          <Button onClick={handleAddEducation} type="secondary" size="small" icon={<Plus size={16} />}>
            Add Education
          </Button>
        </div>
      </div>
      
      {education.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          Add your education history here
        </p>
      ) : (
        <div className="space-y-3">
          {education.map((edu) => (
            <div 
              key={edu.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div 
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                onClick={() => toggleExpand(edu.id)}
              >
                <div className="font-medium dark:text-white">
                  {edu.institution || 'New Education Entry'}
                  {edu.degree && <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({edu.degree})</span>}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveEducation(edu.id);
                    }}
                    className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                    disabled={education.length <= 1}
                  >
                    <Trash2 size={16} />
                  </button>
                  {expandedId === edu.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedId === edu.id && (
                <div className="p-3 bg-white dark:bg-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      id={`institution-${edu.id}`}
                      label="Institution"
                      value={edu.institution}
                      onChange={(value) => handleUpdateEducation(edu.id, 'institution', value)}
                      placeholder="University/School Name"
                      required
                    />
                    <InputField
                      id={`degree-${edu.id}`}
                      label="Degree/Certificate"
                      value={edu.degree}
                      onChange={(value) => handleUpdateEducation(edu.id, 'degree', value)}
                      placeholder="Bachelor's, Master's, etc."
                      required
                    />
                    <InputField
                      id={`year-${edu.id}`}
                      label="Year"
                      value={edu.year}
                      onChange={(value) => handleUpdateEducation(edu.id, 'year', value)}
                      placeholder="2020 - 2024"
                      required
                    />
                    <InputField
                      id={`grade-${edu.id}`}
                      label="Grade/GPA"
                      value={edu.grade}
                      onChange={(value) => handleUpdateEducation(edu.id, 'grade', value)}
                      placeholder="3.8/4.0, First Class, etc."
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

export default EducationSection;