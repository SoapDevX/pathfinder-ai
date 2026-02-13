import express from "express";
import {
  connectGitHub,
  githubCallback,
  analyzeGitHub,
  getUserRepos,
} from "../controllers/githubController";

const router = express.Router();

// OAuth flow
router.get("/connect", connectGitHub);
router.get("/callback", githubCallback);

// Analysis endpoints
router.post("/analyze", analyzeGitHub);
router.get("/repos/:username", getUserRepos);

export default router;