import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import Button from './Button';
import { X, Plus, Sparkles } from 'lucide-react';
import { suggestSkills } from '../utils/aiSuggestions';

const SkillsSection: React.FC = () => {
  const { state, addItem, updateItem, removeItem } = useResume();
  const { skills } = state.resumeData;
  const [isSuggestingSkills, setIsSuggestingSkills] = useState(false);

  const handleAddSkill = () => {
    addItem('skills', { name: '' });
  };

  const handleUpdateSkill = (id: string, name: string) => {
    updateItem('skills', id, { name });
  };

  const handleRemoveSkill = (id: string) => {
    if (skills.length > 1) {
      removeItem('skills', id);
    }
  };

  const handleSuggestSkills = async () => {
    setIsSuggestingSkills(true);
    try {
      const currentSkills = skills.map(skill => skill.name).filter(Boolean);
      const suggestedSkills = await suggestSkills(currentSkills);
      
      // Add suggested skills
      suggestedSkills.forEach(skill => {
        addItem('skills', { name: skill });
      });
    } catch (error) {
      console.error('Failed to suggest skills:', error);
    } finally {
      setIsSuggestingSkills(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Skills</h3>
        <div className="flex space-x-2">
          <Button
            onClick={handleSuggestSkills}
            type="ai"
            size="small"
            isLoading={isSuggestingSkills}
            icon={<Sparkles size={16} />}
          >
            Suggest (D)
          </Button>
          <Button onClick={handleAddSkill} type="secondary" size="small" icon={<Plus size={16} />}>
            Add Skill
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
          >
            <input
              type="text"
              value={skill.name}
              onChange={(e) => handleUpdateSkill(skill.id, e.target.value)}
              placeholder="Skill name"
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm dark:text-white w-auto"
            />
            <button
              onClick={() => handleRemoveSkill(skill.id)}
              className="ml-2 p-1 rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 focus:outline-none"
              disabled={skills.length <= 1}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
        {skills.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            Add your professional skills here
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;