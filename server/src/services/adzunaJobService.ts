import axios from 'axios';

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;

export class AdzunaJobService {
  private appId: string;
  private apiKey: string;

  constructor() {
    if (!ADZUNA_APP_ID || !ADZUNA_API_KEY) {
      console.warn('⚠️ Adzuna credentials not configured');
      this.appId = '';
      this.apiKey = '';
    } else {
      this.appId = ADZUNA_APP_ID;
      this.apiKey = ADZUNA_API_KEY;
    }
  }

  async searchJobs(params: {
    query: string;
    location?: string;
    country?: string;
    limit?: number;
  }): Promise<any[]> {
    if (!this.appId || !this.apiKey) return [];

    try {
      // Map common country names to Adzuna codes
      const countryMap: any = {
        'sri lanka': 'gb', // Adzuna doesn't have Sri Lanka, use nearby
        'srilanka': 'gb',
        'india': 'in',
        'united states': 'us',
        'usa': 'us',
        'uk': 'gb',
        'united kingdom': 'gb',
      };

      let country = params.country || 'us';
      country = countryMap[country.toLowerCase()] || country;

      const what = encodeURIComponent(params.query);
      const where = params.location ? encodeURIComponent(params.location) : '';
      const results_per_page = params.limit || 50;

      const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1`;

      console.log('🔍 Adzuna request:', { country, what, where });

      const response = await axios.get<{ results: any[] }>(url, {
        params: {
          app_id: this.appId,
          app_key: this.apiKey,
          what,
          where,
          results_per_page,
        },
      });

      const jobs = response.data.results || [];
      console.log('✅ Adzuna: Got', jobs.length, 'jobs');

      return jobs.map((job: any) => this.transformJob(job));
    } catch (error: any) {
      console.error('❌ Adzuna error:', error.response?.data || error.message);
      return [];
    }
  }

  private transformJob(job: any): any {
    return {
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      description: job.description,
      requirements: job.category?.label || '',
      salary: job.salary_max ? `$${job.salary_min} - $${job.salary_max}` : '',
      jobType: job.contract_type || 'full_time',
      remote: job.location.display_name.toLowerCase().includes('remote'),
      source: 'Adzuna',
      url: job.redirect_url,
      posted_date: job.created,
    };
  }
}

export default new AdzunaJobService();