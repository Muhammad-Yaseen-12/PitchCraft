import React, { useContext, useState, useRef, useEffect } from "react";
import { model } from "../services/geminiService";
import { db, doc, collection, addDoc, serverTimestamp } from "../config/firebase";
import authContext from "../context/AuthContext";
import {
  AiFillRocket,
  AiFillBulb,
  AiFillStar,
  AiFillThunderbolt,
  AiFillCode,
  AiFillEye,
  AiFillSave,
  AiOutlineCopy,
  AiOutlineCheck
} from "react-icons/ai";
import {
  FaUsers,
  FaLightbulb,
  FaCode,
  FaEye,
  FaSpinner,
  FaRegCopy,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { message } from 'antd';

function CreatePitch() {
  const currentUser = useContext(authContext);
  const textareaRef = useRef(null);

  // States
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState("");
  const [pitch, setPitch] = useState("");
  const [audience, setAudience] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("preview");
  const [copiedSections, setCopiedSections] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    names: true,
    pitch: true,
    audience: true,
    website: true
  });

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [idea]);

  // Helper function for parsing XML tags
  const parseSection = (text, tagName) => {
    try {
      const regex = new RegExp(`<${tagName}>(.*?)</${tagName}>`, "s");
      const match = text.match(regex);
      return match ? match[1].trim() : "";
    } catch (e) {
      console.error(`Error parsing ${tagName}:`, e);
      return `Error parsing section: ${tagName}`;
    }
  };

  // Copy to clipboard function
  const copyToClipboard = async (text, section) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSections(prev => ({ ...prev, [section]: true }));
      message.success(`Copied to clipboard!`);
      setTimeout(() => {
        setCopiedSections(prev => ({ ...prev, [section]: false }));
      }, 2000);
    } catch (err) {
      message.error('Failed to copy text');
    }
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Generate pitch data from Gemini
  const generatePitchData = async (idea) => {
    const prompt = `
You are an expert startup strategist.
Given a business idea, perform these 4 tasks.
Return EACH task's content inside its own unique XML tag.

<NAMES_SECTION>
1. Generate 3 creative startup name ideas with taglines.
Format each as:
• Name: [Startup Name]
  Tagline: [Catchy tagline]
  Why it works: [Brief explanation]
</NAMES_SECTION>

<PITCH_SECTION>
2. Write a compelling elevator pitch and clear problem/solution statement.
Structure it as:
🎯 The Problem: [Describe the problem]
💡 Our Solution: [Describe your solution]
🚀 The Vision: [Long-term vision]
</PITCH_SECTION>

<AUDIENCE_SECTION>
3. Define the target audience and unique value proposition.
Structure it as:
🎯 Target Audience: [Primary, Secondary, etc.]
💰 Value Proposition: [Clear value statement]
🎖️ Competitive Edge: [What makes it unique]
</AUDIENCE_SECTION>

<HTML_SECTION>
4. Create a complete landing page using plain HTML and internal CSS.
Make it modern, responsive, and visually appealing.
Do NOT wrap the HTML code inside markdown or triple backticks. 
Return ONLY raw HTML content inside this tag.
And use # in the href tag.
</HTML_SECTION>

Business Idea: "${idea}"
`;

    const response = await model.generateContent(prompt);
    const text = await response.response.text();

    console.log("Raw Gemini Response:", text);

    return {
      names: parseSection(text, "NAMES_SECTION"),
      pitch: parseSection(text, "PITCH_SECTION"),
      audience: parseSection(text, "AUDIENCE_SECTION"),
      htmlCode: parseSection(text, "HTML_SECTION"),
    };
  };

  // Save pitch to Firestore
  const saveToFirestore = async (uid, data) => {
    const userRef = doc(db, "pitches", uid);
    await addDoc(collection(userRef, "user_pitches"), {
      ...data,
      idea,
      createdAt: serverTimestamp(),
      uid,
    });
  };

  // Main handler
  const handleGenerate = async () => {
    if (!idea.trim()) {
      message.warning("Please enter your business idea first!");
      return;
    }

    if (!currentUser || !currentUser.uid) {
      message.warning("Please log in to generate pitches!");
      return;
    }

    setLoading(true);
    setError("");
    setNames("");
    setPitch("");
    setAudience("");
    setHtmlCode("");

    try {
      const result = await generatePitchData(idea);

      // Update UI
      setNames(result.names);
      setPitch(result.pitch);
      setAudience(result.audience);
      setHtmlCode(result.htmlCode);

      // Save to Firestore
      await saveToFirestore(currentUser.uid, result);
      message.success("Pitch generated and saved successfully! 🎉");
    } catch (err) {
      console.error("Gemini or Firestore Error:", err);
      setError(`Error: ${err.message}`);
      message.error("Error generating pitch. Please try again.");
    }

    setLoading(false);
  };

  // Guard for null context
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <FaSpinner className="text-4xl text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading user...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
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
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pitch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your startup idea into a complete business package with AI-powered names, strategy, audience insights, and ready-to-use website code.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Input Section - Sticky */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sticky top-8 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                  <AiFillBulb className="text-2xl text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Idea</h2>
                  <p className="text-gray-500 text-sm">What's your vision?</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span>Business Idea</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    ref={textareaRef}
                    rows={4}
                    placeholder="Describe your startup idea in detail... 
Example: 'AI-powered personal finance app for students that helps with budgeting, saving, and learning investment basics through gamified experiences.'"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    className="w-full p-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 bg-gray-50/50 backdrop-blur-sm"
                    style={{ minHeight: '120px' }}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>💡 Be specific for better results</span>
                    <span>{idea.length}/500</span>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || !idea.trim()}
                  className={`w-full py-5 px-6 text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${
                    loading || !idea.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl'
                  }`}
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-3 text-xl" />
                      <span className="relative">Generating Magic...</span>
                    </>
                  ) : (
                    <>
                      <AiFillThunderbolt className="mr-3 text-xl group-hover:scale-110 transition-transform" />
                      <span className="relative">Generate Complete Pitch</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">
                    ✨ Powered by Gemini AI • Secure & Private
                  </div>
                  <div className="flex justify-center space-x-4 text-xs text-gray-400">
                    <span>🚀 Names & Taglines</span>
                    <span>🎯 Strategy</span>
                    <span>💻 Website Code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="xl:col-span-3 space-y-8">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 animate-pulse">
                <div className="flex items-center text-red-700">
                  <div className="bg-red-100 p-2 rounded-lg mr-4">
                    <AiFillStar className="text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Oops! Something went wrong</p>
                    <p className="text-sm opacity-90">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Startup Names Section */}
            {names && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 cursor-pointer"
                  onClick={() => toggleSection('names')}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <AiFillStar className="text-xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Startup Name Ideas</h2>
                        <p className="text-blue-100 text-sm">Creative names with taglines</p>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white transition-colors">
                      {expandedSections.names ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>
                
                {expandedSections.names && (
                  <div className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
                        {names}
                      </div>
                    </div>
                    <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                      <button
                        onClick={() => copyToClipboard(names, 'names')}
                        className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200"
                      >
                        {copiedSections.names ? (
                          <>
                            <AiOutlineCheck className="mr-2 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <AiOutlineCopy className="mr-2" />
                            Copy Names
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Elevator Pitch Section */}
            {pitch && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 cursor-pointer"
                  onClick={() => toggleSection('pitch')}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <AiFillRocket className="text-xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Elevator Pitch & Strategy</h2>
                        <p className="text-green-100 text-sm">Problem, Solution & Vision</p>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white transition-colors">
                      {expandedSections.pitch ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>
                
                {expandedSections.pitch && (
                  <div className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
                        {pitch}
                      </div>
                    </div>
                    <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                      <button
                        onClick={() => copyToClipboard(pitch, 'pitch')}
                        className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200"
                      >
                        {copiedSections.pitch ? (
                          <>
                            <AiOutlineCheck className="mr-2 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <AiOutlineCopy className="mr-2" />
                            Copy Pitch
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Target Audience Section */}
            {audience && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 cursor-pointer"
                  onClick={() => toggleSection('audience')}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <FaUsers className="text-xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Target Audience & Value</h2>
                        <p className="text-orange-100 text-sm">Who needs your solution</p>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white transition-colors">
                      {expandedSections.audience ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>
                
                {expandedSections.audience && (
                  <div className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
                        {audience}
                      </div>
                    </div>
                    <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                      <button
                        onClick={() => copyToClipboard(audience, 'audience')}
                        className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200"
                      >
                        {copiedSections.audience ? (
                          <>
                            <AiOutlineCheck className="mr-2 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <AiOutlineCopy className="mr-2" />
                            Copy Analysis
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Website Code & Preview Section */}
            {htmlCode && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 cursor-pointer"
                  onClick={() => toggleSection('website')}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 rounded-lg mr-4">
                        <AiFillCode className="text-xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Website & Code</h2>
                        <p className="text-purple-100 text-sm">Ready-to-use landing page</p>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white transition-colors">
                      {expandedSections.website ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>
                
                {expandedSections.website && (
                  <div className="p-8">
                    {/* Enhanced Tabs */}
                    <div className="flex space-x-1 bg-gray-100 rounded-2xl p-2 mb-8">
                      <button
                        onClick={() => setActiveTab("preview")}
                        className={`flex-1 flex items-center justify-center py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                          activeTab === "preview"
                            ? "bg-white text-purple-600 shadow-lg"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <AiFillEye className="mr-3 text-lg" />
                        Live Preview
                      </button>
                      <button
                        onClick={() => setActiveTab("code")}
                        className={`flex-1 flex items-center justify-center py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                          activeTab === "code"
                            ? "bg-white text-purple-600 shadow-lg"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <FaCode className="mr-3" />
                        HTML Code
                      </button>
                    </div>

                    {/* Preview Tab */}
                    {activeTab === "preview" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold text-gray-900">Live Website Preview</h3>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            Responsive Design
                          </span>
                        </div>
                        <div className="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center space-x-2">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            </div>
                            <span className="text-sm text-gray-600">Your AI-Generated Website</span>
                          </div>
                          <iframe
                            srcDoc={htmlCode}
                            title="AI Website Preview"
                            className="w-full h-96 md:h-[500px]"
                            sandbox="allow-same-origin allow-forms allow-popups allow-scripts"
                          />
                        </div>
                      </div>
                    )}

                    {/* Code Tab */}
                    {activeTab === "code" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold text-gray-900">Generated HTML/CSS Code</h3>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            Copy & Use Instantly
                          </span>
                        </div>
                        <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto shadow-lg">
                          <pre className="text-green-400 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                            {htmlCode}
                          </pre>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <span className="text-gray-600">✨ AI-generated responsive website code</span>
                          <button
                            onClick={() => copyToClipboard(htmlCode, 'html')}
                            className="flex items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            {copiedSections.html ? (
                              <>
                                <AiOutlineCheck className="mr-2" />
                                Code Copied!
                              </>
                            ) : (
                              <>
                                <FaRegCopy className="mr-2" />
                                Copy Full Code
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!names && !pitch && !audience && !htmlCode && !loading && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-16 text-center transition-all duration-300 hover:shadow-2xl">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-2xl shadow-lg">
                      <FaLightbulb className="text-5xl text-yellow-500 animate-pulse" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                      NEW
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Create Magic? ✨</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                  Enter your startup idea above and watch as AI generates a complete business package with creative names, compelling strategy, audience insights, and ready-to-use website code.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-600">
                  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl">
                    <AiFillStar className="text-2xl text-blue-500 mb-2" />
                    <span className="font-semibold">Creative Names</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl">
                    <AiFillRocket className="text-2xl text-green-500 mb-2" />
                    <span className="font-semibold">Pitch Strategy</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-orange-50 rounded-xl">
                    <FaUsers className="text-2xl text-orange-500 mb-2" />
                    <span className="font-semibold">Audience Insights</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl">
                    <AiFillCode className="text-2xl text-purple-500 mb-2" />
                    <span className="font-semibold">Website Code</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePitch;