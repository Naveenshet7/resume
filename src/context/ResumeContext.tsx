import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ResumeState, ResumeData, ThemeOptions } from '../types';
import { generateUniqueId } from '../utils/helpers';



// Initial state
const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Naveen Kumar S R',
    email: 'naveenshet357@gmail.com',
    phone: '9538913288',
    linkedin: 'https://www.linkedin.com/in/naveen-kumar-s-r-9754121b2',
    github: 'https://github.com/Naveenshet7',
    summary: '',
  },
  skills: [{ id: generateUniqueId(), name: '' }],
  education: [{
    id: generateUniqueId(),
    institution: '',
    degree: '',
    year: '',
    grade: '',
  }],
  languages: [{ id: generateUniqueId(), name: '' }],
  projects: [{
    id: generateUniqueId(),
    title: '',
    description: '',
    technologies: '',
    link: '',
  }],
  experience: [{
    id: generateUniqueId(),
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    isCurrentRole: false,
  }],
  certifications: [{
    id: generateUniqueId(),
    name: '',
    issuer: '',
    date: '',
    link: '',
  }],
};

const initialThemeOptions: ThemeOptions = {
  colorTheme: 'blue',
  fontFamily: 'sans',
  fontSize: 'medium',
  layoutStyle: 'Modern',
  borderStyle: 'rounded',
};

const initialState: ResumeState = {
  resumeData: initialResumeData,
  themeOptions: initialThemeOptions,
  isDarkMode: true,
};

// Types for actions
type ActionType =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<ResumeData['personalInfo']> }
  | { type: 'ADD_ITEM'; itemType: keyof Omit<ResumeData, 'personalInfo'>; payload: any }
  | { type: 'UPDATE_ITEM'; itemType: keyof Omit<ResumeData, 'personalInfo'>; id: string; payload: any }
  | { type: 'REMOVE_ITEM'; itemType: keyof Omit<ResumeData, 'personalInfo'>; id: string }
  | { type: 'UPDATE_THEME'; payload: Partial<ThemeOptions> }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'LOAD_STATE'; payload: ResumeState };

// Reducer function
const resumeReducer = (state: ResumeState, action: ActionType): ResumeState => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          personalInfo: {
            ...state.resumeData.personalInfo,
            ...action.payload,
          },
        },
      };

    case 'ADD_ITEM': {
      const { itemType, payload } = action;
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          [itemType]: [...state.resumeData[itemType], { ...payload, id: generateUniqueId() }],
        },
      };
    }

    case 'UPDATE_ITEM': {
      const { itemType, id, payload } = action;
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          [itemType]: state.resumeData[itemType].map((item) =>
            item.id === id ? { ...item, ...payload } : item
          ),
        },
      };
    }

    case 'REMOVE_ITEM': {
      const { itemType, id } = action;
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          [itemType]: state.resumeData[itemType].filter((item) => item.id !== id),
        },
      };
    }

    case 'UPDATE_THEME':
      return {
        ...state,
        themeOptions: {
          ...state.themeOptions,
          ...action.payload,
        },
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
};




// Create context
interface ResumeContextType {
  state: ResumeState;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addItem: <K extends keyof Omit<ResumeData, 'personalInfo'>>(
    itemType: K,
    item: Omit<ResumeData[K][number], 'id'>
  ) => void;
  updateItem: <K extends keyof Omit<ResumeData, 'personalInfo'>>(
    itemType: K,
    id: string,
    updates: Partial<Omit<ResumeData[K][number], 'id'>>
  ) => void;
  removeItem: (itemType: keyof Omit<ResumeData, 'personalInfo'>, id: string) => void;
  updateTheme: (options: Partial<ThemeOptions>) => void;
  toggleDarkMode: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Provider component
export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('resumeBuilderState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to parse saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage on state change
  useEffect(() => {
    localStorage.setItem('resumeBuilderState', JSON.stringify(state));
  }, [state]);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info });
  };

  const addItem = <K extends keyof Omit<ResumeData, 'personalInfo'>>(
    itemType: K,
    item: Omit<ResumeData[K][number], 'id'>
  ) => {
    dispatch({ type: 'ADD_ITEM', itemType, payload: item });
  };

  const updateItem = <K extends keyof Omit<ResumeData, 'personalInfo'>>(
    itemType: K,
    id: string,
    updates: Partial<Omit<ResumeData[K][number], 'id'>>
  ) => {
    dispatch({ type: 'UPDATE_ITEM', itemType, id, payload: updates });
  };

  const removeItem = (itemType: keyof Omit<ResumeData, 'personalInfo'>, id: string) => {
    dispatch({ type: 'REMOVE_ITEM', itemType, id });
  };

  const updateTheme = (options: Partial<ThemeOptions>) => {
    dispatch({ type: 'UPDATE_THEME', payload: options });
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <ResumeContext.Provider
      value={{
        state,
        updatePersonalInfo,
        addItem,
        updateItem,
        removeItem,
        updateTheme,
        toggleDarkMode,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook to use the resume context
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

