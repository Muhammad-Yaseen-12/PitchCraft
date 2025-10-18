import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AiFillThunderbolt,
  AiFillRocket,
  AiFillStar,
  AiFillSafetyCertificate,
  AiFillClockCircle,
  AiFillCheckCircle
} from "react-icons/ai";
import { 
  FaLightbulb,
  FaChartLine,
  FaUsers,
  FaCrown,
  FaRegClock,
  FaShieldAlt,
  FaSync,
  FaHeadset
} from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <AiFillThunderbolt className="text-4xl text-blue-500" />,
      title: "AI Pitch Generation",
      description: "Generate complete startup pitches with names, taglines, and value propositions using advanced AI.",
      features: ["Startup Name Generation", "Tagline Creation", "Elevator Pitches", "Problem/Solution Statements"],
      price: "Free",
      popular: false
    },
    {
      icon: <FaLightbulb className="text-4xl text-green-500" />,
      title: "Idea Validation",
      description: "Get AI-powered insights on your startup idea's potential and market fit.",
      features: ["Market Analysis", "Competitor Research", "Target Audience", "Feasibility Score"],
      price: "Premium",
      popular: true
    },
    {
      icon: <FaChartLine className="text-4xl text-purple-500" />,
      title: "Pitch Deck Creation",
      description: "Create professional investor pitch decks with AI-generated content and templates.",
      features: ["Slide Templates", "Content Writing", "Design Suggestions", "Export Options"],
      price: "Premium",
      popular: false
    },
    {
      icon: <FaUsers className="text-4xl text-orange-500" />,
      title: "Team Collaboration",
      description: "Collaborate with your team members on pitch creation and refinement.",
      features: ["Team Workspace", "Real-time Editing", "Comment System", "Version History"],
      price: "Team",
      popular: false
    }
  ];

  const features = [
    {
      icon: <AiFillClockCircle className="text-2xl text-blue-500" />,
      title: "Save 10+ Hours",
      description: "Generate professional pitches in minutes instead of spending days"
    },
    {
      icon: <AiFillSafetyCertificate className="text-2xl text-green-500" />,
      title: "Investor Ready",
      description: "Get pitches that meet investor expectations and standards"
    },
    {
      icon: <FaSync className="text-2xl text-purple-500" />,
      title: "Unlimited Revisions",
      description: "Regenerate and refine your pitches until they're perfect"
    },
    {
      icon: <FaShieldAlt className="text-2xl text-orange-500" />,
      title: "Data Security",
      description: "Your ideas are safe with enterprise-grade security"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for students and individual founders",
      features: [
        "5 AI Pitches per month",
        "Basic Pitch Templates",
        "Email Support",
        "Standard Export"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Ideal for serious entrepreneurs and startups",
      features: [
        "Unlimited AI Pitches",
        "Advanced Templates",
        "Priority Support",
        "PDF & PPT Export",
        "Team Collaboration",
        "Analytics Dashboard"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Team",
      price: "$49",
      period: "/month",
      description: "For startup teams and incubators",
      features: [
        "Everything in Pro",
        "5 Team Members",
        "Admin Dashboard",
        "Custom Branding",
        "API Access",
        "Dedicated Support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-blue-200">Services</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Everything you need to transform your startup idea into an investor-ready pitch
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We <span className="text-blue-600">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive AI-powered tools to help you succeed in your startup journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 ${
                  service.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                    service.price === "Free" 
                      ? "bg-green-100 text-green-600" 
                      : service.price === "Premium" 
                      ? "bg-purple-100 text-purple-600"
                      : "bg-orange-100 text-orange-600"
                  }`}>
                    {service.price}
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <AiFillCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  to={service.price === "Free" ? "/signup" : "/signup"}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-purple-600">PitchCraft</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge AI with startup expertise to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple <span className="text-blue-600">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your startup journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 ${
                  plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 ml-1">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <AiFillCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  to={plan.name === "Team" ? "/contact" : "/signup"}
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <FaHeadset className="text-4xl text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Pitches?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful founders who trust PitchCraft for their startup journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Free Today
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;