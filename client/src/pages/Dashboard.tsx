import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { githubAPI } from "../services/api";
import { GitHubData } from "../types";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [githubUsername, setGithubUsername] = useState("");
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyzeGitHub = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await githubAPI.analyze(githubUsername);
      setGithubData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to analyze GitHub profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">
                PathFinder AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/roadmap")}
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                🗺️ Roadmap
              </button>
              <button
                onClick={() => navigate("/resume-analyzer")}
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                📄 Resume
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                👤 Profile
              </button>
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

      {/* AI Features Cards - NEW SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🤖 AI-Powered Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate("/roadmap")}
            className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-left"
          >
            <div className="text-4xl mb-3">🗺️</div>
            <h3 className="text-xl font-bold mb-2">Learning Roadmap</h3>
            <p className="text-purple-100">
              Generate personalized learning paths based on your goals
            </p>
          </button>

          <button
            onClick={() => navigate("/resume-analyzer")}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-left"
          >
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-xl font-bold mb-2">Resume Analyzer</h3>
            <p className="text-blue-100">
              Get AI-powered feedback on your resume
            </p>
          </button>

          <button
            onClick={() => navigate("/career-insights")}
            className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-left"
          >
            <div className="text-4xl mb-3">💼</div>
            <h3 className="text-xl font-bold mb-2">Career Insights</h3>
            <p className="text-green-100">
              Get career recommendations based on your skills
            </p>
          </button>
        </div>

        {/* GitHub Analysis Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Analyze GitHub Profile
          </h2>

          <form onSubmit={handleAnalyzeGitHub} className="flex gap-4">
            <input
              type="text"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="Enter GitHub username (e.g., torvalds)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>

        {/* GitHub Profile Results */}
        {githubData && (
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-6">
                <img
                  src={githubData.profile.avatar_url}
                  alt={githubData.profile.name}
                  className="w-24 h-24 rounded-full"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {githubData.profile.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{githubData.profile.bio}</p>
                  <div className="flex space-x-6 mt-3 text-sm text-gray-500">
                    <span>📦 {githubData.profile.public_repos} repos</span>
                    <span>👥 {githubData.profile.followers} followers</span>
                    <span>👤 {githubData.profile.following} following</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Activity Score */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Activity Score
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="text-6xl font-bold text-indigo-600">
                      {githubData.skills.activityScore}
                    </div>
                    <div className="text-sm text-gray-500 text-center mt-2">
                      out of 100
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>📊 Total Repos: {githubData.skills.totalRepos}</p>
                  <p>
                    💻 Total Commits:{" "}
                    {githubData.skills.totalCommits.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Top Languages */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Top Languages
                </h3>
                <div className="space-y-3">
                  {Object.entries(githubData.skills.topLanguages)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([language, count]) => (
                      <div
                        key={language}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-700">{language}</span>
                        <span className="text-indigo-600 font-semibold">
                          {count} repos
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Top Skills */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Skill Breakdown
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {githubData.skills.topSkills.map((skill) => (
                  <div
                    key={skill.skill}
                    className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {skill.skill}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          skill.level === "Advanced"
                            ? "bg-green-100 text-green-700"
                            : skill.level === "Intermediate"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {skill.percentage}% of repos
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate("/job-matcher")}
              className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-left"
            >
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">Job Matcher</h3>
              <p className="text-orange-100">
                Find jobs from LinkedIn, Indeed & 16k+ platforms
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
