import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import InputField from './InputField';
import Button from './Button';
import { ChevronDown, ChevronUp, Plus, Trash2, Sparkles } from 'lucide-react';
import { suggestCertifications } from '../utils/aiSuggestions';

const CertificationsSection: React.FC = () => {
  const { state, addItem, updateItem, removeItem } = useResume();
  const { certifications } = state.resumeData;
  const { skills } = state.resumeData;
  
  const [expandedId, setExpandedId] = useState<string | null>(certifications[0]?.id || null);
  const [isSuggestingCertifications, setIsSuggestingCertifications] = useState(false);

  const handleAddCertification = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    addItem('certifications', {
      name: '',
      issuer: '',
      date: '',
      link: '',
    });
    setExpandedId(newId);
  };

  const handleUpdateCertification = (id: string, field: string, value: string) => {
    updateItem('certifications', id, { [field]: value });
  };

  const handleRemoveCertification = (id: string) => {
    removeItem('certifications', id);
    if (expandedId === id) {
      setExpandedId(certifications.length > 1 ? certifications[0].id : null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSuggestCertifications = async () => {
    setIsSuggestingCertifications(true);
    try {
      const skillNames = skills.map(skill => skill.name).filter(Boolean);
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
    } finally {
      setIsSuggestingCertifications(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Certifications</h3>
        <div className="flex space-x-2">
          <Button
            onClick={handleSuggestCertifications}
            type="ai"
            size="small"
            isLoading={isSuggestingCertifications}
            icon={<Sparkles size={16} />}
          >
            Suggest (C)
          </Button>
          <Button onClick={handleAddCertification} type="secondary" size="small" icon={<Plus size={16} />}>
            Add Certification
          </Button>
        </div>
      </div>
      
      {certifications.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          Add your certifications here
        </p>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div 
              key={cert.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div 
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                onClick={() => toggleExpand(cert.id)}
              >
                <div className="font-medium dark:text-white">
                  {cert.name || 'New Certification'} 
                  {cert.issuer && <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">by {cert.issuer}</span>}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCertification(cert.id);
                    }}
                    className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                  {expandedId === cert.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedId === cert.id && (
                <div className="p-3 bg-white dark:bg-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      id={`name-${cert.id}`}
                      label="Certification Name"
                      value={cert.name}
                      onChange={(value) => handleUpdateCertification(cert.id, 'name', value)}
                      placeholder="AWS Certified Solutions Architect"
                      required
                    />
                    <InputField
                      id={`issuer-${cert.id}`}
                      label="Issuing Organization"
                      value={cert.issuer}
                      onChange={(value) => handleUpdateCertification(cert.id, 'issuer', value)}
                      placeholder="Amazon Web Services"
                      required
                    />
                    <InputField
                      id={`date-${cert.id}`}
                      label="Date"
                      value={cert.date}
                      onChange={(value) => handleUpdateCertification(cert.id, 'date', value)}
                      placeholder="May 2023"
                      required
                    />
                    <InputField
                      id={`link-${cert.id}`}
                      label="Credential URL (Optional)"
                      value={cert.link || ''}
                      onChange={(value) => handleUpdateCertification(cert.id, 'link', value)}
                      placeholder="https://www.example.com/verify/123456"
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

export default CertificationsSection;