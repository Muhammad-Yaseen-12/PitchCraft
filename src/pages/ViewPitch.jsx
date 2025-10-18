import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, db } from '../config/firebase';
import { message } from 'antd';

const ViewPitch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pitch, setPitch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPitch = async () => {
      try {
        const docRef = doc(db, 'pitches', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPitch({ id: docSnap.id, ...docSnap.data() });
        } else {
          message.error('Pitch not found');
          navigate('/dashboard');
        }
      } catch (error) {
        message.error('Error loading pitch');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchPitch();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-xl">Loading pitch...</div>
      </div>
    );
  }

  if (!pitch) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-xl text-red-500">Pitch not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-2">{pitch.pitch.startup_name}</h1>
                <p className="text-xl opacity-90 italic">"{pitch.pitch.tagline}"</p>
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <span className="bg-amber-400 bg-opacity-20 px-3 py-1 rounded-full">
                    {pitch.idea.industry}
                  </span>
                  <span className="bg-amber-400 bg-opacity-20 px-3 py-1 rounded-full">
                    {pitch.idea.tone}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Pitch Content */}
          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Elevator Pitch</h2>
              <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-4 rounded-lg">
                {pitch.pitch.elevator_pitch}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Problem Statement</h2>
                <p className="text-gray-700 leading-relaxed">
                  {pitch.pitch.problem_statement}
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Solution</h2>
                <p className="text-gray-700 leading-relaxed">
                  {pitch.pitch.solution}
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Target Audience</h2>
              <p className="text-gray-700 leading-relaxed">
                {pitch.pitch.target_audience}
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Value Proposition</h2>
              <p className="text-gray-700 leading-relaxed">
                {pitch.pitch.value_proposition}
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Landing Page Copy</h2>
              <p className="text-gray-700 leading-relaxed italic text-center text-xl">
                "{pitch.pitch.landing_copy}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPitch;