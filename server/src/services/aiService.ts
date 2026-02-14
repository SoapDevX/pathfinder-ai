import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface RoadmapRequest {
  currentSkills: string[];
  targetRole: string;
  experienceLevel: string;
}

interface LearningResource {
  title: string;
  description: string;
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
}

interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  skills: string[];
  resources: LearningResource[];
}

export class AIService {
  // Generate personalized learning roadmap
  async generateRoadmap(request: RoadmapRequest): Promise<RoadmapPhase[]> {
    const prompt = `You are a career advisor AI. Generate a detailed learning roadmap for someone with these details:

Current Skills: ${request.currentSkills.join(', ')}
Target Role: ${request.targetRole}
Experience Level: ${request.experienceLevel}

Create a 3-phase learning roadmap. For each phase, include:
1. Phase number and title
2. Duration (in weeks)
3. Skills to learn
4. 3-5 specific learning resources (courses, books, projects)

Return ONLY a valid JSON object with this exact structure:
{
  "roadmap": [
    {
      "phase": 1,
      "title": "Foundation",
      "duration": "4 weeks",
      "skills": ["skill1", "skill2"],
      "resources": [
        {
          "title": "Resource Title",
          "description": "What you'll learn",
          "estimatedTime": "2 weeks",
          "priority": "high"
        }
      ]
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career advisor. Always respond with valid JSON only, no markdown.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from OpenAI');

    const parsed = JSON.parse(content);
    return parsed.roadmap || parsed.phases || [];
  }

  // Analyze resume and provide feedback
  async analyzeResume(resumeText: string, targetRole: string): Promise<any> {
    const prompt = `Analyze this resume for a ${targetRole} position:

${resumeText}

Return ONLY a valid JSON object with this exact structure:
{
  "overallScore": 85,
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2"],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "missingSkills": ["skill1", "skill2"],
  "atsScore": 90
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume reviewer. Always respond with valid JSON only, no markdown.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from OpenAI');

    return JSON.parse(content);
  }

  // Generate career recommendations
  async generateCareerRecommendations(skills: any, githubStats: any): Promise<any> {
    const prompt = `Based on this developer's profile, recommend career paths:

Top Languages: ${JSON.stringify(skills.topLanguages)}
Top Skills: ${JSON.stringify(skills.topSkills)}
Activity Score: ${skills.activityScore}/100

Return ONLY a valid JSON object with this exact structure:
{
  "recommendedRoles": ["Senior Full Stack Developer", "Backend Engineer", "DevOps Engineer", "Technical Lead", "Solutions Architect"],
  "careerTrack": "mid-level",
  "strengthAreas": ["Backend Development", "System Design", "API Development"],
  "growthAreas": ["Cloud Architecture", "Mobile Development"],
  "salaryRange": "$90k - $130k",
  "nextSteps": ["Build a microservices project", "Get AWS certification", "Contribute to open source", "Learn Kubernetes"]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a technical career advisor. Always respond with valid JSON only, no markdown.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from OpenAI');

    return JSON.parse(content);
  }

  // Generate interview questions
  async generateInterviewQuestions(role: string, skills: string[]): Promise<any> {
    const prompt = `Generate interview prep for a ${role} with skills: ${skills.join(', ')}

Return ONLY a valid JSON object with this exact structure:
{
  "technicalQuestions": [
    {
      "question": "Explain the difference between SQL and NoSQL databases",
      "difficulty": "medium",
      "topics": ["databases"],
      "hints": ["Consider scalability and structure"]
    }
  ],
  "behavioralQuestions": [
    "Tell me about a time you solved a difficult technical problem",
    "How do you handle disagreements with team members?"
  ],
  "codingChallenges": [
    {
      "title": "Build a REST API",
      "description": "Create a RESTful API with authentication",
      "difficulty": "medium"
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a technical interviewer. Always respond with valid JSON only, no markdown.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from OpenAI');

    return JSON.parse(content);
  }
}

export default new AIService();