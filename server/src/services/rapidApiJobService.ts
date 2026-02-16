import axios from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'jsearch.p.rapidapi.com';

export class RapidApiJobService {
  private apiKey: string;

  constructor() {
    if (!RAPIDAPI_KEY) {
      console.warn('⚠️ RAPIDAPI_KEY not configured');
      this.apiKey = '';
    } else {
      this.apiKey = RAPIDAPI_KEY;
    }
  }

  async searchJobs(params: {
    query: string;
    location?: string;
    remote?: boolean;
    employmentType?: string;
    limit?: number;
  }): Promise<any[]> {
    if (!this.apiKey) return [];

    try {
      const queryParams: any = {
        query: params.query,
        num_pages: 1,
        page: 1,
      };

      if (params.location) queryParams.location = params.location;
      if (params.remote) queryParams.remote_jobs_only = true;
      if (params.employmentType) queryParams.employment_types = params.employmentType;

      const response = await axios.get<{ data: any[] }>(`https://${RAPIDAPI_HOST}/search`, {
        params: queryParams,
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
      });

      const jobs = response.data.data || [];
      console.log('✅ RapidAPI: Got', jobs.length, 'jobs');
      
      return jobs.map((job: any) => this.transformJob(job));
    } catch (error: any) {
      console.error('❌ RapidAPI error:', error.message);
      return [];
    }
  }

  private transformJob(job: any): any {
    return {
      id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || job.job_state || job.job_country || 'Remote',
      description: job.job_description,
      requirements: job.job_required_skills?.join(', ') || '',
      salary: job.job_salary || '',
      jobType: job.job_employment_type || 'full-time',
      remote: job.job_is_remote || false,
      source: 'LinkedIn/Indeed',
      url: job.job_apply_link || job.job_google_link,
      posted_date: job.job_posted_at_datetime_utc || new Date().toISOString(),
    };
  }
}

export default new RapidApiJobService();