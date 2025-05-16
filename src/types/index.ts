export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  grade: string;
}

export interface Language {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrentRole?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  education: Education[];
  languages: Language[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
}

export interface ThemeOptions {
  colorTheme: string;
  customColor?: string;
  fontFamily: string;
  fontSize: string;
  customFontSize?: number;
  sectionSpacing?: number;
  lineHeight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  entrySpacing?: number;
  layoutStyle: 'Modern' | 'Classic' | 'Compact';
  borderStyle: string;
}

export interface ResumeState {
  resumeData: ResumeData;
  themeOptions: ThemeOptions;
  isDarkMode: boolean;
}