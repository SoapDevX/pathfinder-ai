export interface User {
  id: number;
  name: string;
  email: string;
  roleTarget?: string;
  githubUsername?: string;
  githubConnected?: boolean;
}

export interface GitHubProfile {
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface SkillAnalysis {
  topLanguages: { [key: string]: number };
  topSkills: Array<{
    skill: string;
    level: string;
    percentage: number;
  }>;
  totalRepos: number;
  totalCommits: number;
  activityScore: number;
}

export interface GitHubData {
  profile: GitHubProfile;
  skills: SkillAnalysis;
}

// AI Types
export interface LearningResource {
  title: string;
  description: string;
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  skills: string[];
  resources: LearningResource[];
}

export interface ResumeAnalysis {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingSkills: string[];
  atsScore: number;
}

export interface CareerRecommendations {
  recommendedRoles: string[];
  careerTrack: string;
  strengthAreas: string[];
  growthAreas: string[];
  salaryRange: string;
  nextSteps: string[];
}

export interface InterviewQuestion {
  question: string;
  difficulty: string;
  topics: string[];
  hints: string[];
}

export interface InterviewQuestions {
  technicalQuestions: InterviewQuestion[];
  behavioralQuestions: string[];
  codingChallenges: Array<{
    title: string;
    description: string;
    difficulty: string;
  }>;
}