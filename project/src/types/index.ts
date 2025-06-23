export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface PastYearData {
  yearReview: string;
  lifeAspects: {
    personalLife: string;
    career: string;
    friends: string;
    rest: string;
    physicalHealth: string;
    mentalHealth: string;
    habits: string;
    betterTomorrow: string;
  };
  sixSentences: {
    wisestDecision: string;
    greatestLesson: string;
    biggestRisk: string;
    biggestSurprise: string;
    importantThingForOthers: string;
    greatestCompletion: string;
  };
  sixQuestions: {
    mostProud: string;
    threeInfluencers: string;
    threeInfluenced: string;
    unachieved: string;
    bestDiscovery: string;
    mostGrateful: string;
  };
  bestMoments: string;
  achievements: string[];
  achievementHelp: string;
  achievementSupporters: string;
  challenges: string[];
  challengeHelp: string;
  challengeLearnings: string;
  bookTitle: string;
  threeWords: string[];
  forgiveness: string;
  lettingGo: string;
  goodbye: string;
}

export interface FutureYearData {
  dreamBig: string;
  lifeAspects: {
    personalLife: string;
    career: string;
    friends: string;
    rest: string;
    physicalHealth: string;
    mentalHealth: string;
    habits: string;
    betterTomorrow: string;
  };
  magicTrios: {
    selfLove: string[];
    readyToDiscard: string[];
    wantToAchieve: string[];
    supportPillars: string[];
    dareToExplore: string[];
    powerToRefuse: string[];
    betterEnvironments: string[];
    morningRoutine: string[];
    selfCare: string[];
    placesToVisit: string[];
    connectionWays: string[];
    successRewards: string[];
  };
  sixSentences: {
    sentence1: string;
    sentence2: string;
    sentence3: string;
    sentence4: string;
    sentence5: string;
    sentence6: string;
  };
  yearWord: string;
  secretWish: string;
  signature: string;
  date: string;
}

export interface AppData {
  user: User | null;
  pastYear: PastYearData;
  futureYear: FutureYearData;
  currentPage: string;
}