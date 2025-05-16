import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import InputField from './InputField';
import Button from './Button';
import { validateEmail, validatePhone, validateUrl } from '../utils/helpers';
import { suggestProfessionalSummary } from '../utils/aiSuggestions';
import { Sparkles } from 'lucide-react';

const PersonalInfoSection: React.FC = () => {
  const { state, updatePersonalInfo } = useResume();
  const { personalInfo } = state.resumeData;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const validateField = (field: string, value: string): string => {
    if (!value && field !== 'summary' && field !== 'linkedin' && field !== 'github') {
      return 'This field is required';
    }
    
    switch (field) {
      case 'email':
        return validateEmail(value) ? '' : 'Please enter a valid email address';
      case 'phone':
        return validatePhone(value) ? '' : 'Please enter a valid phone number';
      case 'linkedin':
      case 'github':
        return value ? (validateUrl(value) ? '' : 'Please enter a valid URL') : '';
      case 'summary':
        return value.length > 250 ? 'Summary must be 250 characters or less' : '';
      default:
        return '';
    }
  };

  const handleChange = (field: string, value: string) => {
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
    updatePersonalInfo({ [field]: value });
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const skillNames = state.resumeData.skills.map(skill => skill.name).filter(Boolean);
      const summary = await suggestProfessionalSummary(personalInfo.fullName, skillNames);
      updatePersonalInfo({ summary });
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleSuggestInfo = () => {
    updatePersonalInfo({
      fullName: 'Naveen Kumar S R',
      email: 'naveenshet357@gmail.com',
      phone: '9538913288',
      linkedin: 'https://www.linkedin.com/in/naveen-kumar-s-r-9754121b2',
      github: 'https://github.com/Naveenshet7',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Personal Information</h3>
        <button
          onClick={handleSuggestInfo}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Auto-fill Example Data
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="fullName"
          label="Full Name"
          value={personalInfo.fullName}
          onChange={(value) => handleChange('fullName', value)}
          placeholder="John Doe"
          error={errors.fullName}
          required
        />
        <InputField
          id="email"
          label="Email Address"
          value={personalInfo.email}
          onChange={(value) => handleChange('email', value)}
          placeholder="john.doe@example.com"
          type="email"
          error={errors.email}
          required
        />
        <InputField
          id="phone"
          label="Phone Number"
          value={personalInfo.phone}
          onChange={(value) => handleChange('phone', value)}
          placeholder="+1 234 567 8900"
          error={errors.phone}
          required
        />
        <InputField
          id="linkedin"
          label="LinkedIn"
          value={personalInfo.linkedin}
          onChange={(value) => handleChange('linkedin', value)}
          placeholder="linkedin.com/in/johndoe"
          error={errors.linkedin}
        />
        <InputField
          id="github"
          label="GitHub"
          value={personalInfo.github}
          onChange={(value) => handleChange('github', value)}
          placeholder="github.com/johndoe"
          error={errors.github}
        />
      </div>
      
      <div className="mt-4 relative">
        <div className="flex justify-between items-center">
          <label htmlFor="summary" className="block text-sm font-medium mb-1 dark:text-gray-200">
            Professional Summary <span className="text-sm font-normal text-gray-500">(250 char max)</span>
          </label>
          <Button
            onClick={handleGenerateSummary}
            type="ai"
            size="small"
            className="mb-1"
            isLoading={isGeneratingSummary}
            icon={<Sparkles size={16} />}
          >
            Suggest (S)
          </Button>
        </div>
        <textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="A brief summary of your professional background and goals..."
          maxLength={250}
          rows={4}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all ${
            errors.summary ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <div className="text-xs text-gray-500 mt-1 dark:text-gray-400">
          {personalInfo.summary.length}/250 characters
        </div>
        {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
      </div>
    </div>
  );
};

export default PersonalInfoSection;