import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import InputField from './InputField';
import Button from './Button';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

const LanguagesSection: React.FC = () => {
  const { state, addItem, updateItem, removeItem } = useResume();
  const { languages } = state.resumeData;

  const [expandedId, setExpandedId] = useState<string | null>(languages[0]?.id || null);

  const handleAddLanguage = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    addItem('languages', {
      name: '',
    });
    setExpandedId(newId);
  };

  const handleUpdateLanguage = (id: string, field: string, value: string) => {
    updateItem('languages', id, { [field]: value });
  };

  const handleRemoveLanguage = (id: string) => {
      removeItem('languages', id);
    if (expandedId === id) {
      setExpandedId(languages.length > 1 ? languages[0].id : null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Languages</h3>
        <Button onClick={handleAddLanguage} type="secondary" size="small" icon={<Plus size={16} />}>
          Add Language
        </Button>
      </div>
      
      {languages.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          Add languages you know
        </p>
      ) : (
      <div className="space-y-3">
          {languages.map((lang) => (
          <div 
              key={lang.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
              <div 
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                onClick={() => toggleExpand(lang.id)}
              >
                <div className="font-medium dark:text-white">
                  {lang.name || 'New Language'}
            </div>
                <div className="flex items-center space-x-2">
            <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveLanguage(lang.id);
                    }}
                    className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              disabled={languages.length <= 1}
            >
                    <Trash2 size={16} />
            </button>
                  {expandedId === lang.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedId === lang.id && (
                <div className="p-3 bg-white dark:bg-gray-800">
                  <InputField
                    id={`language-${lang.id}`}
                    label="Language"
                    value={lang.name}
                    onChange={(value) => handleUpdateLanguage(lang.id, 'name', value)}
                    placeholder="e.g., English, Spanish, etc."
                    required
                  />
                </div>
              )}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default LanguagesSection;