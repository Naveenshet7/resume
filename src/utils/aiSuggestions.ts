// Mock AI suggestion functions
// In a real implementation, these would call external APIs or use local NLP libraries

import { generateUniqueId } from './helpers';

export const suggestProfessionalSummary = async (fullName: string, skills: string[]): Promise<string> => {
  // This would typically call an AI service API
  // For now, we'll generate a simple templated summary
  
  const profession = skills.length > 0 ? skills[0] : 'professional';
  
  const summaries = [
    `Experienced ${profession} with a proven track record of delivering high-quality solutions. Skilled in ${skills.slice(0, 3).join(', ')} with a passion for learning new technologies and solving complex problems.`,
    `Results-driven ${profession} with expertise in ${skills.slice(0, 3).join(', ')}. Committed to continuous improvement and delivering value through innovative approaches and attention to detail.`,
    `Dedicated ${profession} with strong analytical skills and experience in ${skills.slice(0, 3).join(', ')}. Excels in collaborative environments and adapts quickly to new technologies and methodologies.`,
  ];
  
  // Return a random summary from the list
  return summaries[Math.floor(Math.random() * summaries.length)];
};

export const suggestSkills = async (currentSkills: string[]): Promise<string[]> => {
  // This would typically call an AI service API
  // For now, we'll return a predefined list based on some common skills
  
  const techSkills = [
    'JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'CSS', 'HTML',
    'SQL', 'Git', 'Docker', 'AWS', 'Azure', 'REST APIs', 'GraphQL',
    'MongoDB', 'PostgreSQL', 'Redux', 'Express', 'Testing', 'CI/CD',
    'Agile Methodologies', 'Problem Solving', 'Communication', 'Team Leadership'
  ];
  
  // Filter out skills that are already in the current skills list
  const newSkills = techSkills.filter(skill => 
    !currentSkills.some(current => current.toLowerCase() === skill.toLowerCase())
  );
  
  // Return a random selection of 5 new skills
  return newSkills
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
};

export const suggestEducation = async (): Promise<any[]> => {
  // Based on the reference provided
  return [
    {
      id: generateUniqueId(),
      institution: 'Bengaluru University',
      degree: 'MCA',
      year: '2021 - 2023',
      grade: 'CGPA: 7.5',
    },
    {
      id: generateUniqueId(),
      institution: 'Kuvempu University',
      degree: 'BCA',
      year: '2018 - 2021',
      grade: 'CGPA: 6.7',
    },
    {
      id: generateUniqueId(),
      institution: 'Pre University Karnataka',
      degree: '12th',
      year: '2016 - 2018',
      grade: '60 Percent',
    },
    {
      id: generateUniqueId(),
      institution: 'Karnataka Board',
      degree: '10th',
      year: '2013 - 2016',
      grade: '75 Percent',
    },
  ];
};

export const suggestCertifications = async (skills: string[]): Promise<any[]> => {
  // This would typically call an AI service API
  // For now, we'll return certifications based on the skills
  
  const certificationMap: Record<string, any> = {
    'JavaScript': {
      name: 'JavaScript Developer Certification',
      issuer: 'Udemy',
      date: '2023',
    },
    'React': {
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023',
    },
    'Python': {
      name: 'Python Professional Certification',
      issuer: 'Python Institute',
      date: '2022',
    },
    'AWS': {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
    },
    'Docker': {
      name: 'Docker Certified Associate',
      issuer: 'Docker, Inc.',
      date: '2023',
    },
  };
  
  // Find certifications that match the skills
  const matchedCertifications = skills
    .filter(skill => certificationMap[skill])
    .map(skill => ({
      id: generateUniqueId(),
      ...certificationMap[skill],
    }));
  
  // Add some generic certifications if we don't have enough
  const genericCertifications = [
    {
      id: generateUniqueId(),
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2022',
    },
    {
      id: generateUniqueId(),
      name: 'Certified Web Developer',
      issuer: 'FreeCodeCamp',
      date: '2021',
    },
    {
      id: generateUniqueId(),
      name: 'Google IT Support Professional',
      issuer: 'Google',
      date: '2022',
    },
  ];
  
  // Combine and return up to 3 certifications
  return [...matchedCertifications, ...genericCertifications]
    .slice(0, 3);
};