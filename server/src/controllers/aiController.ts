import { Request, Response } from 'express';
import aiService from '../services/aiService';

export const generateRoadmap = async (req: Request, res: Response) => {
  try {
    const { currentSkills, targetRole, experienceLevel } = req.body;

    if (!currentSkills || !targetRole || !experienceLevel) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const roadmap = await aiService.generateRoadmap({
      currentSkills,
      targetRole,
      experienceLevel,
    });

    res.json({ roadmap });
  } catch (error: any) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({ error: error.message });
  }
};

export const analyzeResume = async (req: Request, res: Response) => {
  try {
    const { resumeText, targetRole } = req.body;

    if (!resumeText || !targetRole) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const analysis = await aiService.analyzeResume(resumeText, targetRole);

    res.json({ analysis });
  } catch (error: any) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getCareerRecommendations = async (req: Request, res: Response) => {
  try {
    const { skills, githubStats } = req.body;

    if (!skills || !githubStats) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const recommendations = await aiService.generateCareerRecommendations(
      skills,
      githubStats
    );

    res.json({ recommendations });
  } catch (error: any) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getInterviewQuestions = async (req: Request, res: Response) => {
  try {
    const { role, skills } = req.body;

    if (!role || !skills) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const questions = await aiService.generateInterviewQuestions(role, skills);

    res.json({ questions });
  } catch (error: any) {
    console.error('Error generating interview questions:', error);
    res.status(500).json({ error: error.message });
  }
};