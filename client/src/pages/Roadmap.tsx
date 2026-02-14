import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { aiAPI } from "../services/api";
import { RoadmapPhase } from "../types";

const Roadmap: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [currentSkills, setCurrentSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const skillsArray = currentSkills.split(",").map((s) => s.trim());
      const response = await aiAPI.generateRoadmap({
        currentSkills: skillsArray,
        targetRole,
        experienceLevel,
      });

      setRoadmap(response.data.roadmap);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to generate roadmap");
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
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-indigo-600">
                PathFinder AI
              </h1>
              <button
                onClick={() => navigate("/dashboard")}
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
            🗺️ AI Learning Roadmap Generator
          </h2>
          <p className="text-gray-600 mb-6">
            Get a personalized learning path based on your current skills and
            career goals
          </p>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Skills (comma-separated)
              </label>
              <input
                type="text"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                placeholder="JavaScript, React, Node.js, Python"
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
                placeholder="Senior Full Stack Developer"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Experience Level
              </label>
              <select
                id="experienceLevel"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="advanced">Advanced (5+ years)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "🤖 Generating Roadmap..." : "✨ Generate AI Roadmap"}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Roadmap Results */}
        {roadmap.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Your Learning Roadmap
            </h3>

            {roadmap.map((phase) => (
              <div key={phase.phase} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-indigo-600">
                      Phase {phase.phase}: {phase.title}
                    </h4>
                    <p className="text-gray-500">
                      ⏱️ Duration: {phase.duration}
                    </p>
                  </div>
                </div>

                {/* Skills to Learn */}
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    🎯 Skills to Learn:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {phase.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learning Resources */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">
                    📚 Learning Resources:
                  </h5>
                  <div className="space-y-3">
                    {phase.resources.map((resource, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h6 className="font-semibold text-gray-900">
                            {resource.title}
                          </h6>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              resource.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : resource.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {resource.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {resource.description}
                        </p>
                        <p className="text-gray-500 text-sm">
                          ⏱️ {resource.estimatedTime}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
