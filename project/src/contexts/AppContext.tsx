import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppData, User, PastYearData, FutureYearData } from '../types';

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'UPDATE_PAST_YEAR'; payload: Partial<PastYearData> }
  | { type: 'UPDATE_FUTURE_YEAR'; payload: Partial<FutureYearData> }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  | { type: 'LOAD_DATA'; payload: AppData };

const initialPastYear: PastYearData = {
  yearReview: '',
  lifeAspects: {
    personalLife: '',
    career: '',
    friends: '',
    rest: '',
    physicalHealth: '',
    mentalHealth: '',
    habits: '',
    betterTomorrow: '',
  },
  sixSentences: {
    wisestDecision: '',
    greatestLesson: '',
    biggestRisk: '',
    biggestSurprise: '',
    importantThingForOthers: '',
    greatestCompletion: '',
  },
  sixQuestions: {
    mostProud: '',
    threeInfluencers: '',
    threeInfluenced: '',
    unachieved: '',
    bestDiscovery: '',
    mostGrateful: '',
  },
  bestMoments: '',
  achievements: ['', '', ''],
  achievementHelp: '',
  achievementSupporters: '',
  challenges: ['', '', ''],
  challengeHelp: '',
  challengeLearnings: '',
  bookTitle: '',
  threeWords: ['', '', ''],
  forgiveness: '',
  lettingGo: '',
  goodbye: '',
};

const initialFutureYear: FutureYearData = {
  dreamBig: '',
  lifeAspects: {
    personalLife: '',
    career: '',
    friends: '',
    rest: '',
    physicalHealth: '',
    mentalHealth: '',
    habits: '',
    betterTomorrow: '',
  },
  magicTrios: {
    selfLove: ['', '', ''],
    readyToDiscard: ['', '', ''],
    wantToAchieve: ['', '', ''],
    supportPillars: ['', '', ''],
    dareToExplore: ['', '', ''],
    powerToRefuse: ['', '', ''],
    betterEnvironments: ['', '', ''],
    morningRoutine: ['', '', ''],
    selfCare: ['', '', ''],
    placesToVisit: ['', '', ''],
    connectionWays: ['', '', ''],
    successRewards: ['', '', ''],
  },
  sixSentences: {
    sentence1: '',
    sentence2: '',
    sentence3: '',
    sentence4: '',
    sentence5: '',
    sentence6: '',
  },
  yearWord: '',
  secretWish: '',
  signature: '',
  date: '',
};

const initialState: AppData = {
  user: null,
  pastYear: initialPastYear,
  futureYear: initialFutureYear,
  currentPage: 'login',
};

function appReducer(state: AppData, action: AppAction): AppData {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_PAST_YEAR':
      return { 
        ...state, 
        pastYear: { ...state.pastYear, ...action.payload }
      };
    case 'UPDATE_FUTURE_YEAR':
      return { 
        ...state, 
        futureYear: { ...state.futureYear, ...action.payload }
      };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'LOAD_DATA':
      return action.payload;
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppData;
  dispatch: React.Dispatch<AppAction>;
  saveProgress: () => void;
}>({
  state: initialState,
  dispatch: () => {},
  saveProgress: () => {},
});

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedData = localStorage.getItem('yearcompass-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  const saveProgress = () => {
    localStorage.setItem('yearcompass-data', JSON.stringify(state));
  };

  useEffect(() => {
    if (state.user) {
      saveProgress();
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch, saveProgress }}>
      {children}
    </AppContext.Provider>
  );
};