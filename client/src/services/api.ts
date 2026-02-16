import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

export const githubAPI = {
  analyze: (username: string) =>
    api.post('/github/analyze', { username }),
  getRepos: (username: string) =>
    api.get(`/github/repos/${username}`),
};

export const aiAPI = {
  generateRoadmap: (data: {
    currentSkills: string[];
    targetRole: string;
    experienceLevel: string;
  }) => api.post('/ai/roadmap', data),
  
  analyzeResume: (data: { resumeText: string; targetRole: string }) =>
    api.post('/ai/resume-analysis', data),
  
  getCareerRecommendations: (data: { skills: any; githubStats: any }) =>
    api.post('/ai/career-recommendations', data),
  
  getInterviewQuestions: (data: { role: string; skills: string[] }) =>
    api.post('/ai/interview-questions', data),
};

export const jobAPI = {
  matchJobs: (data: {
    userSkills: any;
    targetRole: string;
    location?: string;
    remote?: boolean;
  }) => api.post('/jobs/match', data),
  
  searchJobs: (params: {
    query?: string;
    location?: string;
    remote?: boolean;
    jobType?: string;
    limit?: number;
  }) => api.get('/jobs/search', { params }),
  
  getSavedJobs: (limit?: number) =>
    api.get('/jobs/saved', { params: { limit } }),
};

export default api;