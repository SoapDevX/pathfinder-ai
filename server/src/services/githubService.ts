import axios from "axios";
import { Octokit } from "octokit";

interface Repository {
  name: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
}

interface SkillAnalysis {
  topLanguages: { [key: string]: number };
  topSkills: Array<{ skill: string; level: string; percentage: number }>;
  totalRepos: number;
  totalCommits: number;
  activityScore: number;
}

export class GitHubService {
  private octokit: Octokit;

  constructor(accessToken?: string) {
    this.octokit = new Octokit({ 
      auth: accessToken || undefined 
    });
  }

  // Fetch user's repositories
  async getUserRepos(username: string): Promise<Repository[]> {
    try {
      const { data } = await this.octokit.rest.repos.listForUser({
        username,
        per_page: 100,
        sort: "updated",
      });

      return data.map((repo: any) => ({
        name: repo.name,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        updated_at: repo.updated_at,
      }));
    } catch (error) {
      console.error("Error fetching repos:", error);
      throw new Error("Failed to fetch repositories");
    }
  }

  // Analyze languages from repositories
  analyzeLanguages(repos: Repository[]): { [key: string]: number } {
    const languageCount: { [key: string]: number } = {};

    repos.forEach((repo) => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    return languageCount;
  }

  // Get commit activity for a user
  async getCommitActivity(username: string): Promise<number> {
    try {
      const { data } = await this.octokit.rest.search.commits({
        q: `author:${username}`,
        per_page: 1,
      });

      return data.total_count;
    } catch (error) {
      console.error("Error fetching commits:", error);
      return 0;
    }
  }

  // Calculate skill level based on repo count and activity
  calculateSkillLevel(repoCount: number): string {
    if (repoCount >= 10) return "Advanced";
    if (repoCount >= 5) return "Intermediate";
    if (repoCount >= 2) return "Beginner";
    return "Novice";
  }

  // Full skill analysis
  async analyzeSkills(username: string): Promise<SkillAnalysis> {
    const repos = await this.getUserRepos(username);
    const languageCount = this.analyzeLanguages(repos);
    const totalCommits = await this.getCommitActivity(username);

    // Calculate total repos with languages
    const totalRepos = repos.filter((r) => r.language).length;

    // Build skill breakdown
    const topSkills = Object.entries(languageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([language, count]) => ({
        skill: language,
        level: this.calculateSkillLevel(count),
        percentage: Math.round((count / totalRepos) * 100),
      }));

    // Activity score (0-100)
    const activityScore = Math.min(100, Math.round((totalCommits / 100) * 10));

    return {
      topLanguages: languageCount,
      topSkills,
      totalRepos: repos.length,
      totalCommits,
      activityScore,
    };
  }

  // Get user profile info
  async getUserProfile(username: string) {
    try {
      const { data } = await this.octokit.rest.users.getByUsername({
        username,
      });

      return {
        name: data.name,
        bio: data.bio,
        avatar_url: data.avatar_url,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
      };
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw new Error("Failed to fetch GitHub profile");
    }
  }
}

// OAuth helper functions
export const getGitHubAccessToken = async (code: string): Promise<string> => {
  try {
    const response = await axios.post<{ access_token: string }>(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to get GitHub access token");
  }
};

interface GitHubUserResponse {
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
}

export const getGitHubUser = async (accessToken: string): Promise<GitHubUserResponse> => {
  try {
    const response = await axios.get<GitHubUserResponse>("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    throw new Error("Failed to fetch GitHub user");
  }
};