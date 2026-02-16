import theirStackService from './theirStackService';
import rapidApiJobService from './rapidApiJobService';
import adzunaJobService from './adzunaJobService';
import mockJobService from './mockJobService';

export class UnifiedJobService {
  async searchJobs(params: {
    query: string;
    location?: string;
    remote?: boolean;
    limit?: number;
  }): Promise<any[]> {
    let allJobs: any[] = [];

    // Try TheirStack first
    try {
      const theirStackJobs = await theirStackService.searchByTitle(
        params.query,
        params.location,
        params.remote
      );
      allJobs = [...allJobs, ...theirStackJobs];
      console.log(`📊 TheirStack: ${theirStackJobs.length} jobs`);
    } catch (error) {
      console.error('TheirStack failed:', error);
    }

    // Try RapidAPI
    try {
      const rapidJobs = await rapidApiJobService.searchJobs(params);
      allJobs = [...allJobs, ...rapidJobs];
      console.log(`📊 RapidAPI: ${rapidJobs.length} jobs`);
    } catch (error) {
      console.error('RapidAPI failed:', error);
    }

    // Try Adzuna
    try {
      const adzunaJobs = await adzunaJobService.searchJobs({
        query: params.query,
        location: params.location,
        limit: params.limit,
      });
      allJobs = [...allJobs, ...adzunaJobs];
      console.log(`📊 Adzuna: ${adzunaJobs.length} jobs`);
    } catch (error) {
      console.error('Adzuna failed:', error);
    }

    // Fallback to mock data if no real jobs found
    if (allJobs.length === 0) {
      console.log('⚠️ No real jobs found, using mock data');
      allJobs = await mockJobService.searchJobsBySkills([params.query], params.location);
    }

    // Remove duplicates
    return this.deduplicateJobs(allJobs);
  }

  private deduplicateJobs(jobs: any[]): any[] {
    const seen = new Set();
    return jobs.filter(job => {
      const key = `${job.title.toLowerCase()}-${job.company.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

export default new UnifiedJobService();