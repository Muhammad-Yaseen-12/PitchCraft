import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc, db, auth } from '../config/firebase';
import { message } from 'antd';
import {
  AiFillRocket,
  AiOutlinePlus,
  AiOutlineLogout,
  AiOutlineCalendar,
  AiOutlineFileText,
  AiOutlineBulb,
  AiOutlineTeam,
  AiOutlineCode,
  AiOutlineThunderbolt
} from 'react-icons/ai';
import {
  FaLightbulb,
  FaUsers,
  FaCode,
  FaRegClock
} from 'react-icons/fa';

const Dashboard = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    const userPitchesRef = collection(
      db, 
      'pitches', 
      auth.currentUser.uid, 
      'user_pitches'
    );

    const unsubscribe = onSnapshot(userPitchesRef, (querySnapshot) => {
      const pitchesData = [];
      querySnapshot.forEach((doc) => {
        pitchesData.push({ id: doc.id, ...doc.data() });
      });
      
      pitchesData.sort((a, b) => {
        const timeA = a.createdAt?.toDate?.() || new Date(0);
        const timeB = b.createdAt?.toDate?.() || new Date(0);
        return timeB - timeA;
      });
      
      setPitches(pitchesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching pitches:', error);
      message.error('Failed to load pitches');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      message.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      message.error('Failed to log out');
    }
  };

  const getPitchDisplayData = (pitch) => {
    const namesText = pitch.names || '';
    const firstLine = namesText.split('\n')[0] || 'Untitled Pitch';
    
    const lines = namesText.split('\n').filter(line => line.trim());
    const tagline = lines[1] || 'No tagline available';
    
    const pitchText = pitch.pitch || '';
    const shortPitch = pitchText.split('.')[0] + '.';

    // Count sections available
    const sectionsAvailable = [
      pitch.names && 'Names',
      pitch.pitch && 'Strategy', 
      pitch.audience && 'Audience',
      pitch.htmlCode && 'Website'
    ].filter(Boolean).length;

    return {
      title: firstLine.replace(/^\d+\.\s*/, ''),
      tagline: tagline,
      description: shortPitch,
      date: pitch.createdAt?.toDate?.() || new Date(),
      sectionsCount: sectionsAvailable
    };
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg transform rotate-3">
              <AiFillRocket className="text-4xl" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              AI
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <AiOutlineThunderbolt className="text-blue-500 text-xl animate-pulse" />
            <p className="text-xl font-semibold text-gray-700">Loading your creative pitches...</p>
            <AiOutlineThunderbolt className="text-purple-500 text-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg transform rotate-3">
                <AiFillRocket className="text-4xl" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                AI
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pitch Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage and review all your AI-generated startup pitches in one place
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200/50 p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">My Pitches</h2>
                <p className="text-gray-600 flex items-center">
                  <AiOutlineFileText className="mr-2 text-blue-500" />
                  {pitches.length} {pitches.length === 1 ? 'pitch' : 'pitches'} generated
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/create-pitch')}
                  className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <AiOutlinePlus className="mr-2 text-lg group-hover:scale-110 transition-transform" />
                  New Pitch
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 border border-gray-200 hover:border-gray-300"
                >
                  <AiOutlineLogout className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Pitches Grid */}
          <div className="p-8">
            {pitches.length === 0 ? (
              <div className="text-center py-16">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-2xl shadow-lg">
                    <FaLightbulb className="text-5xl text-yellow-500 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Pitches Yet</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
                  Start your entrepreneurial journey by creating your first AI-powered startup pitch
                </p>
                <button
                  onClick={() => navigate('/create-pitch')}
                  className="flex items-center justify-center mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <AiFillRocket className="mr-3 text-xl group-hover:scale-110 transition-transform" />
                  Create Your First Pitch
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pitches.map((pitch, index) => {
                  const displayData = getPitchDisplayData(pitch);
                  const colors = [
                    'from-blue-500/10 to-cyan-500/10',
                    'from-green-500/10 to-emerald-500/10', 
                    'from-orange-500/10 to-pink-500/10',
                    'from-purple-500/10 to-indigo-500/10',
                    'from-cyan-500/10 to-blue-500/10',
                    'from-pink-500/10 to-rose-500/10'
                  ];
                  const colorClass = colors[index % colors.length];
                  
                  return (
                    <div
                      key={pitch.id}
                      className={`bg-gradient-to-br ${colorClass} backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/20 hover:scale-[1.02] group relative overflow-hidden`}
                      onClick={() => navigate(`/pitch/${pitch.id}`)}
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-gray-800 transition-colors">
                            {displayData.title}
                          </h3>
                          <p className="text-gray-600 text-sm italic mt-1 line-clamp-2">
                            "{displayData.tagline}"
                          </p>
                        </div>
                        <div className="bg-white/50 rounded-lg p-2 shadow-sm ml-3">
                          <AiOutlineBulb className="text-blue-500 text-lg" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-4 text-sm line-clamp-3 leading-relaxed">
                        {displayData.description}
                      </p>

                      {/* Sections Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                          <AiOutlineBulb className="mr-1" />
                          Names
                        </span>
                        <span className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium">
                          <AiFillRocket className="mr-1" />
                          Strategy
                        </span>
                        <span className="flex items-center bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs font-medium">
                          <AiOutlineTeam className="mr-1" />
                          Audience
                        </span>
                        <span className="flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium">
                          <AiOutlineCode className="mr-1" />
                          Website
                        </span>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
                        <div className="flex items-center text-xs text-gray-500">
                          <AiOutlineCalendar className="mr-1" />
                          {formatDate(displayData.date)}
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            AI
                          </span>
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            {displayData.sectionsCount}/4
                          </span>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stats Footer */}
          {pitches.length > 0 && (
            <div className="bg-gray-50/50 border-t border-gray-200/50 p-6">
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div className="flex items-center space-x-2 text-gray-600">
                  <AiOutlineFileText className="text-blue-500 text-xl" />
                  <span className="font-semibold">{pitches.length} Total Pitches</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaRegClock className="text-green-500 text-xl" />
                  <span className="font-semibold">
                    Latest: {pitches[0] ? formatDate(getPitchDisplayData(pitches[0]).date) : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <AiOutlineThunderbolt className="text-purple-500 text-xl" />
                  <span className="font-semibold">Powered by AI</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;