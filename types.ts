
export interface Airdrop {
  id: string;
  name: string;
  ticker: string;
  type: string;
  chain: string;
  status: 'Live' | 'Upcoming' | 'Rumored' | 'Ended';
  difficulty: 'Low' | 'Medium' | 'High' | 'Hard' | 'Very Hard';
  potential: '$$' | '$$$' | '$$$$';
  description: string;
  about?: string;
  potentialAnalysis?: string;
  strategyGuide?: string;
  tasks: string[];
  imageUrl: string;
  websiteUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export enum FilterType {
  ALL = 'ALL',
  LIVE = 'LIVE',
  UPCOMING = 'UPCOMING',
  HIGH_POTENTIAL = 'HIGH_POTENTIAL'
}

export type Language = 'en' | 'id';
