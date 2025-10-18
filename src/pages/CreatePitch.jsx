// src/pages/CreatePitch.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, auth, db } from '../config/firebase';
import { message } from 'antd';
import { generatePitchContent } from '../services/geminiService';

const CreatePitch = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: '',
    tone: 'professional'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const industries = [
    'Technology', 'Healthcare', 'Education', 'Finance', 
    'E-commerce', 'Real Estate', 'Food & Beverage', 'Other'
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'innovative', label: 'Innovative' },
    { value: 'fun', label: 'Fun & Creative' }
  ];

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.title || !formData.description || !formData.industry) {
    message.error('Please fill all required fields');
    return;
  }

  setLoading(true);

  try {
    console.log('Starting pitch generation with:', formData);
    const pitchContent = await generatePitchContent(formData);
    console.log('Received pitch content:', pitchContent);
    
    const docRef = await addDoc(collection(db, 'pitches'), {
      userId: auth.currentUser.uid,
      idea: formData,
      pitch: pitchContent,
      createdAt: new Date(),
      status: 'generated'
    });

    message.success('Pitch generated successfully!');
    navigate(`/pitch/${docRef.id}`);
  } catch (error) {
    console.error('Error in handleSubmit:', error);
    message.error('Error generating pitch. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Create AI Pitch</h1>
            <p className="opacity-90">Generate professional startup pitches with AI</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Startup Idea Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., AI-powered mentor platform"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Describe your startup idea in detail..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {tones.map(tone => (
                    <label key={tone.value} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="tone"
                        value={tone.value}
                        checked={formData.tone === tone.value}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      {tone.label}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Pitch with AI...
                  </span>
                ) : (
                  'Generate Pitch with AI'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePitch;