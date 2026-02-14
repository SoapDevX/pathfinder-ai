import express from 'express';
import {
  generateRoadmap,
  analyzeResume,
  getCareerRecommendations,
  getInterviewQuestions,
} from '../controllers/aiController';

const router = express.Router();

router.post('/roadmap', generateRoadmap);
router.post('/resume-analysis', analyzeResume);
router.post('/career-recommendations', getCareerRecommendations);
router.post('/interview-questions', getInterviewQuestions);

export default router;