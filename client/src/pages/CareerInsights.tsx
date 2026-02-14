import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { aiAPI, githubAPI } from '../services/api';
import { CareerRecommendations } from '../types';

const CareerInsights: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [githubUsername, setGithubUsername] = useState('');
  const [recommendations, setRecommendations] = useState<CareerRecommendations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First get GitHub analysis
      const githubResponse = await githubAPI.analyze(githubUsername);
      const { skills, profile } = githubResponse.data;

      // Then get AI career recommendations
      const aiResponse = await aiAPI.getCareerRecommendations({
        skills,
        githubStats: profile,
      });

      setRecommendations(aiResponse.data.recommendations);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate insights');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            💼 AI Career Insights
          </h2>
          <p className="text-gray-600 mb-6">
            Get personalized career recommendations based on your GitHub profile
          </p>

          <form onSubmit={handleAnalyze} className="flex gap-4">
            <input
              type="text"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? '🤖 Analyzing...' : '✨ Get Insights'}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Recommendations */}
        {recommendations && (
          <div className="space-y-6">
            {/* Career Track */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Your Career Level</h3>
              <p className="text-3xl font-bold capitalize">{recommendations.careerTrack}</p>
            </div>

            {/* Recommended Roles */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Recommended Roles</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {recommendations.recommendedRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 hover:bg-indigo-100 transition"
                  >
                    <p className="font-semibold text-indigo-900">{role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Estimated Salary Range</h3>
              <p className="text-3xl font-bold text-green-600">{recommendations.salaryRange}</p>
            </div>

            {/* Strength & Growth Areas */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💪 Strength Areas</h3>
                <ul className="space-y-2">
                  {recommendations.strengthAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Growth Areas</h3>
                <ul className="space-y-2">
                  {recommendations.growthAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-yellow-500 mr-2">→</span>
                      <span className="text-gray-700">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Next Steps</h3>
              <ol className="space-y-3">
                {recommendations.nextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerInsights;