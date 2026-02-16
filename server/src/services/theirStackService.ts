import axios from 'axios';

const THEIRSTACK_API_URL = 'https://api.theirstack.com/v1';
const THEIRSTACK_API_KEY = process.env.THEIRSTACK_API_KEY;

export class TheirStackService {
  private apiKey: string;

  constructor() {
    if (!THEIRSTACK_API_KEY) {
      console.warn('⚠️ THEIRSTACK_API_KEY not configured');
      this.apiKey = '';
    } else {
      this.apiKey = THEIRSTACK_API_KEY;
    }
  }

  // Get jobs - ONLY use limit (no location/remote)
  async getAllJobs(limit: number = 100): Promise<any[]> {
    if (!this.apiKey) return [];

    try {
      const response = await axios.post<{ data: any[] }>(
        `${THEIRSTACK_API_URL}/jobs/search`,
        { limit }, // ONLY limit, nothing else
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const jobs = response.data.data || [];
      console.log('✅ TheirStack: Got', jobs.length, 'jobs');
      return jobs;
    } catch (error: any) {
      console.error('❌ TheirStack error:', error.response?.data || error.message);
      return [];
    }
  }

  // Filter jobs client-side by location
  filterByLocation(jobs: any[], location: string): any[] {
    const locationLower = location.toLowerCase();
    return jobs.filter(job => 
      job.location?.toLowerCase().includes(locationLower) ||
      job.country?.toLowerCase().includes(locationLower)
    );
  }

  // Filter jobs by title
  filterByTitle(jobs: any[], title: string): any[] {
    const titleLower = title.toLowerCase();
    return jobs.filter(job => 
      job.title?.toLowerCase().includes(titleLower)
    );
  }

  // Search by title with location filter
  async searchByTitle(title: string, location?: string, remote?: boolean): Promise<any[]> {
    let jobs = await this.getAllJobs(200);
    
    if (jobs.length === 0) return [];

    // Filter by title
    jobs = this.filterByTitle(jobs, title);

    // Filter by location if provided
    if (location) {
      jobs = this.filterByLocation(jobs, location);
    }

    // Filter by remote if specified
    if (remote !== undefined) {
      jobs = jobs.filter(job => job.remote === remote);
    }

    return jobs;
  }

  async searchJobsBySkills(skills: string[], location?: string): Promise<any[]> {
    const jobs = await this.getAllJobs(200);
    
    if (jobs.length === 0) return [];

    // Filter by skills
    const skillsLower = skills.map(s => s.toLowerCase());
    let filtered = jobs.filter(job => {
      const searchText = `${job.title} ${job.description} ${job.requirements || ''}`.toLowerCase();
      return skillsLower.some(skill => searchText.includes(skill));
    });

    // Filter by location if provided
    if (location) {
      filtered = this.filterByLocation(filtered, location);
    }

    return filtered;
  }
}

export default new TheirStackService();