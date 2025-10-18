import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, db, auth } from '../config/firebase';
import { message } from 'antd';

const Dashboard = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    const q = query(
      collection(db, 'pitches'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const pitchesData = [];
      querySnapshot.forEach((doc) => {
        pitchesData.push({ id: doc.id, ...doc.data() });
      });
      
      pitchesData.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
      
      setPitches(pitchesData);
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-xl">Loading your pitches...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Pitches</h1>
              <p className="text-gray-600 mt-2">Your AI-generated startup pitches</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/create-pitch')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                + New Pitch
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transform hover:scale-105 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>

          {pitches.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl text-gray-600 mb-4">No pitches yet</h2>
              <p className="text-gray-500 mb-6">Create your first AI-generated startup pitch!</p>
              <button
                onClick={() => navigate('/create-pitch')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Create Your First Pitch
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pitches.map((pitch) => (
                <div
                  key={pitch.id}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-blue-100"
                  onClick={() => navigate(`/pitch/${pitch.id}`)}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {pitch.idea.title}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2 text-lg">
                    {pitch.pitch.startup_name}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 italic">
                    "{pitch.pitch.tagline}"
                  </p>
                  <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                    {pitch.pitch.elevator_pitch}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="bg-blue-100 px-2 py-1 rounded">
                      {pitch.idea.industry}
                    </span>
                    <span>{pitch.createdAt?.toDate().toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;