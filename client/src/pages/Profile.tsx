import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [roleTarget, setRoleTarget] = useState(user?.roleTarget || '');
  const [editing, setEditing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = () => {
    // TODO: Implement update profile API call
    setEditing(false);
    alert('Profile update functionality coming soon!');
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
                aria-label="Back to Dashboard"
              >
                ← Back to Dashboard
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                aria-label="Full Name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                aria-label="Email Address"
              />
            </div>

            {/* Target Role */}
            <div>
              <label htmlFor="targetRole" className="block text-sm font-medium text-gray-700 mb-2">
                Target Role
              </label>
              <input
                id="targetRole"
                type="text"
                value={roleTarget}
                onChange={(e) => setRoleTarget(e.target.value)}
                disabled={!editing}
                placeholder="e.g., Backend Engineer, Full Stack Developer"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                aria-label="Target Role"
              />
            </div>

            {/* GitHub Username */}
            <div>
              <label htmlFor="githubUsername" className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Username
              </label>
              <input
                id="githubUsername"
                type="text"
                value={user?.githubUsername || 'Not connected'}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                aria-label="GitHub Username"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                  aria-label="Edit Profile"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                    aria-label="Save Changes"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                    aria-label="Cancel Editing"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">Active</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">GitHub Connected</h3>
            <p className="text-2xl font-bold text-indigo-600 mt-2">
              {user?.githubUsername ? 'Yes' : 'No'}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;