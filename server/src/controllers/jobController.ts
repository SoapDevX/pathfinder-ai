import { Request, Response } from 'express';
import jobMatchingService from '../services/jobMatchingService';
import unifiedJobService from '../services/unifiedJobService';

export const matchJobs = async (req: Request, res: Response) => {
  try {
    const { userSkills, targetRole, location, remote } = req.body;

    if (!userSkills || !targetRole) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const matches = await jobMatchingService.findMatchingJobs(
      userSkills,
      targetRole,
      location,
      remote
    );

    res.json({ matches });
  } catch (error: any) {
    console.error('Job matching error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const searchJobs = async (req: Request, res: Response) => {
  try {
    const { query, location, remote, limit } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const jobs = await unifiedJobService.searchJobs({
      query: query as string,
      location: location as string,
      remote: remote === 'true',
      limit: limit ? parseInt(limit as string) : 50,
    });

    res.json({ jobs, count: jobs.length });
  } catch (error: any) {
    console.error('Job search error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getSavedJobs = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const jobs = await jobMatchingService.getSavedJobs(limit);

    res.json({ jobs });
  } catch (error: any) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({ error: error.message });
  }
};