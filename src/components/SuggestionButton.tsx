import React from 'react';
import { useResume } from '../context/ResumeContext';

const SuggestionButton: React.FC = () => {
  const { updatePersonalInfo } = useResume();

  const handleSuggest = () => {
    updatePersonalInfo({
      fullName: 'Naveen Kumar S R',
      email: 'naveenshet357@gmail.com',
      phone: '9538913288',
      linkedin: 'https://www.linkedin.com/in/naveen-kumar-s-r-9754121b2',
      github: 'https://github.com/Naveenshet7',
      summary: '' // You can add a default summary here if needed
    });
  };

  return (
    <button
      onClick={handleSuggest}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      Auto-fill Example Data
    </button>
  );
};

export default SuggestionButton; 