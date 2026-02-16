interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary?: string;
  jobType: string;
  remote: boolean;
  source: string;
  url: string;
  posted_date: string;
}

export class MockJobService {
  async searchJobsBySkills(skills: string[], location?: string): Promise<Job[]> {
    const allMockJobs: Job[] = [
      {
        id: '1',
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Sri Lanka',
        location: 'Colombo, Sri Lanka',
        description: 'We are looking for an experienced Full Stack Developer to join our Colombo office. Work on cutting-edge web applications using modern technologies.',
        requirements: 'Required: 5+ years JavaScript, React, Node.js, TypeScript, PostgreSQL. AWS/Docker preferred.',
        salary: 'LKR 200k - 300k',
        jobType: 'full-time',
        remote: false,
        source: 'Mock',
        url: 'https://example.com/job/1',
        posted_date: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Web Developer',
        company: 'Digital Solutions Lanka',
        location: 'Kandy, Sri Lanka',
        description: 'Join our team to build modern web applications for international clients.',
        requirements: 'Required: HTML, CSS, JavaScript, React. 2+ years experience.',
        salary: 'LKR 120k - 180k',
        jobType: 'full-time',
        remote: true,
        source: 'Mock',
        url: 'https://example.com/job/2',
        posted_date: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Frontend Developer',
        company: 'StartupLK',
        location: 'Colombo, Sri Lanka',
        description: 'Create beautiful, responsive web interfaces using React and modern CSS.',
        requirements: 'Required: React, TypeScript, Tailwind CSS. 3+ years experience.',
        salary: 'LKR 150k - 220k',
        jobType: 'full-time',
        remote: false,
        source: 'Mock',
        url: 'https://example.com/job/3',
        posted_date: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Backend Engineer',
        company: 'CloudTech Lanka',
        location: 'Remote, Sri Lanka',
        description: 'Build scalable microservices and APIs for global clients.',
        requirements: 'Required: Node.js, Express, MongoDB, Redis. GraphQL, Kubernetes preferred.',
        salary: 'LKR 180k - 250k',
        jobType: 'full-time',
        remote: true,
        source: 'Mock',
        url: 'https://example.com/job/4',
        posted_date: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Full Stack Engineer',
        company: 'FinTech Lanka',
        location: 'Colombo, Sri Lanka',
        description: 'Build financial applications using React, Node.js, and PostgreSQL.',
        requirements: 'Required: JavaScript, React, Node.js, SQL. Financial systems experience a plus.',
        salary: 'LKR 200k - 280k',
        jobType: 'full-time',
        remote: false,
        source: 'Mock',
        url: 'https://example.com/job/5',
        posted_date: new Date().toISOString(),
      },
    ];

    // Filter by location if specified
    let filtered = allMockJobs;
    if (location) {
      const locationLower = location.toLowerCase();
      filtered = allMockJobs.filter(job =>
        job.location.toLowerCase().includes(locationLower)
      );
    }

    // Filter by skills
    if (skills.length > 0) {
      const skillsLower = skills.map(s => s.toLowerCase());
      filtered = filtered.filter(job => {
        const searchText = `${job.title} ${job.description} ${job.requirements}`.toLowerCase();
        return skillsLower.some(skill => searchText.includes(skill));
      });
    }

    return filtered;
  }

  async searchJobs(params: any): Promise<Job[]> {
    return this.searchJobsBySkills([params.query || ''], params.location);
  }
}

export default new MockJobService();