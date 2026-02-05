
export enum ToolId {
  YOUTUBE = 'youtube',
  LINKEDIN = 'linkedin',
  RESUME = 'resume',
  PRESENTATION = 'presentation'
}

export interface ToolConfig {
  id: ToolId;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface YouTubeInputs {
  topic: string;
  type: 'Short' | 'Long';
  tone: 'Educational' | 'Motivational' | 'Casual';
}

export interface LinkedInInputs {
  idea: string;
  audience: 'Students' | 'Professionals' | 'Founders';
  tone: 'Formal' | 'Friendly' | 'Authoritative';
}

export interface ResumeInputs {
  content: string;
}

export interface PresentationInputs {
  topic: string;
  slides: number;
  audience: string;
}

export type AnyInput = YouTubeInputs | LinkedInInputs | ResumeInputs | PresentationInputs;
