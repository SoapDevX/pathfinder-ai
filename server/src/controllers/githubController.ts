import { Request, Response } from "express";
import {
  GitHubService,
  getGitHubAccessToken,
  getGitHubUser,
} from "../services/githubService";
import User from "../models/User";

// Initiate GitHub OAuth
export const connectGitHub = (req: Request, res: Response) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_CALLBACK_URL;
  const scope = "read:user,repo";

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  res.redirect(githubAuthUrl);
};

// GitHub OAuth Callback
export const githubCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Invalid code provided" });
  }

  try {
    // Exchange code for access token
    const accessToken = await getGitHubAccessToken(code);

    // Get GitHub user info
    const githubUser = await getGitHubUser(accessToken);

    // Store or update user in database
    // For now, we'll return the data
    // You can link this to logged-in user later

    res.redirect(
      `${process.env.CLIENT_URL}/dashboard?github_connected=true&username=${githubUser.login}`
    );
  } catch (error) {
    console.error("GitHub callback error:", error);
    res.redirect(`${process.env.CLIENT_URL}/dashboard?github_error=true`);
  }
};

// Analyze GitHub profile
export const analyzeGitHub = async (req: Request, res: Response) => {
  try {
    const { username, accessToken } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username required" });
    }

    const githubService = new GitHubService(
      accessToken || process.env.GITHUB_PERSONAL_TOKEN || ""
    );

    // Get full analysis
    const profile = await githubService.getUserProfile(username);
    const skillAnalysis = await githubService.analyzeSkills(username);

    res.json({
      profile,
      skills: skillAnalysis,
    });
  } catch (error) {
    console.error("GitHub analysis error:", error);
    res.status(500).json({ error: "Failed to analyze GitHub profile" });
  }
};

// Get user repositories
export const getUserRepos = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;

    // Type guard to ensure username is a string
    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Invalid username provided" });
    }

    const githubService = new GitHubService(); // No token needed for public repos
    const repos = await githubService.getUserRepos(username);

    res.json({ repos });
  } catch (error) {
    console.error("Error fetching repos:", error);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
};