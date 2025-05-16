import React, { useState, useRef } from 'react';
import Button from './Button';
import { Download, FileDown } from 'lucide-react';
import { generatePdf, generateDoc } from '../utils/fileGenerator';

interface ActionButtonsProps {
  resumeContainerRef: React.RefObject<HTMLDivElement>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ resumeContainerRef }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);
  const fileName = useRef<string>('my-resume');

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      await generatePdf(resumeContainerRef, `${fileName.current}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadDoc = async () => {
    setIsGeneratingDoc(true);
    try {
      await generateDoc(resumeContainerRef, `${fileName.current}.docx`);
    } catch (error) {
      console.error('Failed to generate DOC:', error);
      alert('Failed to generate DOC. Please try again.');
    } finally {
      setIsGeneratingDoc(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          <span>File name:</span>
        </div>
        <input
          type="text"
          value={fileName.current}
          onChange={(e) => (fileName.current = e.target.value)}
          className="block w-full pl-24 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="my-resume"
        />
      </div>
      
      <Button
        onClick={handleDownloadPdf}
        type="primary"
        icon={<Download size={16} />}
        isLoading={isGeneratingPdf}
        className="flex-shrink-0"
      >
        Download PDF
      </Button>
      
      <Button
        onClick={handleDownloadDoc}
        type="secondary"
        icon={<FileDown size={16} />}
        isLoading={isGeneratingDoc}
        className="flex-shrink-0"
      >
        Download DOC
      </Button>
    </div>
  );
};

export default ActionButtons;