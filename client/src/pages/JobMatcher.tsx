import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobAPI, githubAPI } from '../services/api';
import { JobMatch } from '../types';

const JobMatcher: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [githubUsername, setGithubUsername] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First get GitHub skills
      const githubResponse = await githubAPI.analyze(githubUsername);
      const { skills } = githubResponse.data;

      // Then match jobs
      const jobResponse = await jobAPI.matchJobs({
        userSkills: skills,
        targetRole,
        location: location || undefined,
        remote,
      });

      setMatches(jobResponse.data.matches);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to match jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-blue-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-indigo-600">PathFinder AI</h1>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Dashboard
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 AI Job Matcher
          </h2>
          <p className="text-gray-600 mb-6">
            Find jobs that match your skills from LinkedIn, Indeed, and 16k+ ATS platforms
          </p>

          <form onSubmit={handleMatch} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Username
                </label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="your-username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Role
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Full Stack Developer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (optional)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="San Francisco, CA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center pt-8">
                <input
                  type="checkbox"
                  id="remote"
                  checked={remote}
                  onChange={(e) => setRemote(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="remote" className="ml-2 text-sm font-medium text-gray-700">
                  Remote positions only
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? '🤖 Finding Perfect Jobs...' : '✨ Find Matching Jobs'}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Job Matches */}
        {matches.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              Found {matches.length} Matching Jobs
            </h3>

            {matches.map((match, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {match.job.title}
                    </h4>
                    <p className="text-gray-600">
                      {match.job.company} • {match.job.location}
                      {match.job.remote && <span className="ml-2 text-green-600">🌍 Remote</span>}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      via {match.job.source} • {match.job.jobType}
                      {match.job.salary && ` • ${match.job.salary}`}
                    </p>
                  </div>

                  <div className={`${getScoreBg(match.matchScore)} px-4 py-2 rounded-lg`}>
                    <div className={`text-3xl font-bold ${getScoreColor(match.matchScore)}`}>
                      {match.matchScore}%
                    </div>
                    <div className="text-xs text-gray-600 text-center">Match</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{match.matchReason}</p>

                {/* Matched Skills */}
                <div className="mb-3">
                  <h5 className="font-semibold text-gray-900 mb-2">✅ Your Matching Skills:</h5>
                  <div className="flex flex-wrap gap-2">
                    {match.matchedSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                {match.missingSkills.length > 0 && (
                  <div className="mb-3">
                    <h5 className="font-semibold text-gray-900 mb-2">📚 Skills to Learn:</h5>
                    <div className="flex flex-wrap gap-2">
                      {match.missingSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendation */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                  <p className="text-indigo-900">
                    <strong>💡 Recommendation:</strong> {match.recommendation}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  
                    href={match.job.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-indigo-600 text-white text-center py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                  
                    View Job →
                    
                  <button
                    onClick={() => navigate('/roadmap', {
                      state: { missingSkills: match.missingSkills }
                    })}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                  >
                    Learn Missing Skills
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {matches.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Enter your GitHub username and target role to find matching jobs! 🎯
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatcher;