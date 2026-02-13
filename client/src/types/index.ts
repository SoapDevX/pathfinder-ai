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