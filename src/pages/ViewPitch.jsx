import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, db, auth } from '../config/firebase';
import { message } from 'antd';

const ViewPitch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pitch, setPitch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('preview');

  useEffect(() => {
    const fetchPitch = async () => {
      try {
        if (!auth.currentUser) {
          navigate('/login');
          return;
        }

        // ✅ FIX: Correct document path for subcollection
        const docRef = doc(db, 'pitches', auth.currentUser.uid, 'user_pitches', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPitch({ id: docSnap.id, ...docSnap.data() });
        } else {
          message.error('Pitch not found');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching pitch:', error);
        message.error('Error loading pitch');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchPitch();
  }, [id, navigate]);

  // ✅ FIX: Helper function to extract display data
  const getPitchDisplayData = (pitchData) => {
    if (!pitchData) return null;

    const namesText = pitchData.names || '';
    const namesLines = namesText.split('\n').filter(line => line.trim());
    
    return {
      title: namesLines[0]?.replace(/^\d+\.\s*/, '') || 'Untitled Pitch',
      tagline: namesLines[1] || 'No tagline available',
      names: pitchData.names || '',
      pitch: pitchData.pitch || '',
      audience: pitchData.audience || '',
      htmlCode: pitchData.htmlCode || '',
      date: pitchData.createdAt?.toDate?.() || new Date(),
      originalIdea: pitchData.idea || '' // This stores the original input idea
    };
  };

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

  const displayData = getPitchDisplayData(pitch);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{displayData.title}</h1>
                <p className="text-xl opacity-90 italic">"{displayData.tagline}"</p>
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <span className="bg-purple-600 bg-opacity-20 px-3 py-1 rounded-full">
                    AI Generated
                  </span>
                  <span className="text-white text-opacity-80">
                    Created on {displayData.date.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors ml-4"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Original Idea */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="bg-yellow-100 p-2 rounded-lg mr-3">💡</span>
            Original Business Idea
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed bg-yellow-50 p-4 rounded-lg">
            {pitch.idea || displayData.originalIdea || 'No original idea stored'}
          </p>
        </div>

        {/* Pitch Content */}
        <div className="space-y-6">
          {/* Startup Names Section */}
          {displayData.names && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-2">🚀</span>
                  Startup Name Ideas & Taglines
                </h2>
              </div>
              <div className="p-6">
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {displayData.names}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Elevator Pitch Section */}
          {displayData.pitch && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-2">🎯</span>
                  Elevator Pitch & Strategy
                </h2>
              </div>
              <div className="p-6">
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {displayData.pitch}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Target Audience Section */}
          {displayData.audience && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-2">👥</span>
                  Target Audience & Value Proposition
                </h2>
              </div>
              <div className="p-6">
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {displayData.audience}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Website Code & Preview Section */}
          {displayData.htmlCode && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-2">🌐</span>
                  Website Code & Preview
                </h2>
              </div>
              <div className="p-6">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
                      activeTab === "preview"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span className="mr-2">👁️</span>
                    Live Preview
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
                      activeTab === "code"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span className="mr-2">💻</span>
                    HTML Code
                  </button>
                </div>

                {/* Preview Tab */}
                {activeTab === "preview" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Website Preview</h3>
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <iframe
                        srcDoc={displayData.htmlCode}
                        title="AI Website Preview"
                        className="w-full h-96"
                        sandbox="allow-same-origin allow-forms allow-popups allow-scripts"
                      />
                    </div>
                  </div>
                )}

                {/* Code Tab */}
                {activeTab === "code" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated HTML/CSS Code</h3>
                    <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm whitespace-pre-wrap">
                        {displayData.htmlCode}
                      </pre>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <span>✨ AI-generated responsive website code</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(displayData.htmlCode);
                          message.success('Code copied to clipboard!');
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Copy Code
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => navigate('/create-pitch')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            Create New Pitch
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPitch;