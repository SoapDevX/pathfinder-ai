import OpenAI from 'openai';
import unifiedJobService from './unifiedJobService';
import Job from '../models/Job';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface UserSkills {
  topLanguages: { [key: string]: number };
  topSkills: Array<{ skill: string; level: string; percentage: number }>;
  totalRepos: number;
  totalCommits: number;
  activityScore: number;
}

interface JobMatch {
  job: any;
  matchScore: number;
  matchReason: string;
  missingSkills: string[];
  matchedSkills: string[];
  recommendation: string;
}

export class JobMatchingService {
  async findMatchingJobs(
    userSkills: UserSkills,
    targetRole: string,
    location?: string,
    remote?: boolean
  ): Promise<JobMatch[]> {
    try {
      console.log(`🔍 Searching for: ${targetRole} in ${location || 'anywhere'}`);

      // Use unified service to get jobs from all sources
      const jobs = await unifiedJobService.searchJobs({
        query: targetRole,
        location,
        remote,
        limit: 100,
      });

      console.log(`🎯 Total jobs found: ${jobs.length}`);

      if (jobs.length === 0) {
        console.log('⚠️ No jobs found');
        return [];
      }

      // Match jobs with AI
      const matches = await Promise.all(
        jobs.slice(0, 30).map((job) => this.matchJobWithAI(job, userSkills, targetRole))
      );

      const sortedMatches = matches
        .filter((match) => match.matchScore >= 50)
        .sort((a, b) => b.matchScore - a.matchScore);

      console.log(`✅ Found ${sortedMatches.length} good matches`);

      // Save top matches
      await this.saveJobsToDatabase(sortedMatches.slice(0, 10));

      return sortedMatches;
    } catch (error: any) {
      console.error('Job matching error:', error);
      throw new Error('Failed to match jobs');
    }
  }

  private async matchJobWithAI(
    job: any,
    userSkills: UserSkills,
    targetRole: string
  ): Promise<JobMatch> {
    const prompt = `Analyze this job posting and user profile:

JOB:
Title: ${job.title}
Company: ${job.company}
Description: ${job.description?.substring(0, 500)}
Requirements: ${job.requirements?.substring(0, 300) || 'Not specified'}

USER:
Languages: ${Object.keys(userSkills.topLanguages).join(', ')}
Skills: ${userSkills.topSkills.map(s => s.skill).join(', ')}
Activity: ${userSkills.activityScore}/100
Target: ${targetRole}

Return ONLY JSON:
{
  "matchScore": 85,
  "matchReason": "Strong backend skills align",
  "missingSkills": ["Kubernetes", "AWS"],
  "matchedSkills": ["Node.js", "PostgreSQL"],
  "recommendation": "Great fit - apply now"
}`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Job matcher. Return ONLY JSON.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error('No response');

      const parsed = JSON.parse(content);

      return {
        job,
        matchScore: parsed.matchScore || 50,
        matchReason: parsed.matchReason || '',
        missingSkills: parsed.missingSkills || [],
        matchedSkills: parsed.matchedSkills || [],
        recommendation: parsed.recommendation || '',
      };
    } catch (error) {
      return {
        job,
        matchScore: 50,
        matchReason: 'Basic match',
        missingSkills: [],
        matchedSkills: [],
        recommendation: 'Review manually',
      };
    }
  }

  private async saveJobsToDatabase(matches: JobMatch[]): Promise<void> {
    try {
      for (const match of matches) {
        const job = match.job;
        await Job.upsert({
          title: job.title,
          company: job.company,
          location: job.location || 'Remote',
          description: job.description || '',
          requirements: job.requirements || '',
          salary: job.salary,
          jobType: job.jobType || 'full-time',
          remote: job.remote || false,
          source: job.source || 'unknown',
          sourceUrl: job.url || '',
          postedDate: new Date(job.posted_date || Date.now()),
          skills: match.matchedSkills,
        });
      }
    } catch (error) {
      console.error('Database save error:', error);
    }
  }

  async getSavedJobs(limit: number = 50): Promise<any[]> {
    try {
      const jobs = await Job.findAll({
        order: [['postedDate', 'DESC']],
        limit,
      });
      return jobs;
    } catch (error) {
      console.error('Database fetch error:', error);
      return [];
    }
  }
}

export default new JobMatchingService();