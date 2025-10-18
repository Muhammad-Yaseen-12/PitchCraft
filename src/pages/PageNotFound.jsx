import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineDashboard,
  AiOutlineArrowRight
} from "react-icons/ai";
import { 
  FaCompass,
  FaRegSadTear
} from "react-icons/fa";

function PageNotFound() {
  const suggestions = [
    {
      title: "Check the URL",
      description: "Make sure you've entered the correct web address"
    },
    {
      title: "Navigate from Home",
      description: "Start from the homepage and find your way"
    },
    {
      title: "Search Our Site",
      description: "Use the search feature to find what you need"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration & Message */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-6 shadow-2xl">
                <FaRegSadTear className="text-4xl text-white" />
              </div>
              
              <div className="mb-6">
                <span className="text-8xl font-bold text-gray-900">404</span>
                <div className="text-2xl font-semibold text-gray-700 mt-2">
                  Page Not Found
                </div>
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Looks like this page decided to pivot without telling us! 
                While it's off building the next unicorn, let us help you find your way back.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <AiOutlineHome className="mr-3" />
                Go Home
                <AiOutlineArrowRight className="ml-2" />
              </Link>
              
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
              >
                Get Help
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FaCompass className="text-blue-500 mr-3" />
                Quick Navigation
              </h3>
              
              <div className="space-y-4">
                <Link 
                  to="/dashboard"
                  className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 group"
                >
                  <AiOutlineDashboard className="text-2xl text-blue-600 mr-4" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600">Dashboard</div>
                    <div className="text-sm text-gray-600">Access your pitches and projects</div>
                  </div>
                </Link>
                
                <Link 
                  to="/services"
                  className="flex items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-200 group"
                >
                  <AiOutlineSearch className="text-2xl text-purple-600 mr-4" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 group-hover:text-purple-600">Our Services</div>
                    <div className="text-sm text-gray-600">Explore what PitchCraft offers</div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Need Assistance?</h3>
              <p className="text-blue-100 mb-4">
                Our support team is here to help you get back on track with your pitch creation journey.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 opacity-40">
          <div className="text-6xl mb-4">🚀 💡 📈</div>
          <p className="text-gray-500 text-sm">
            Every great startup begins with a great pitch. Let's create yours!
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;