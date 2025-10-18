import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AiFillRocket,
  AiFillBulb,
  AiFillStar,
  AiFillTrophy,
  AiFillHeart,
  AiFillCheckCircle
} from "react-icons/ai";
import { 
  FaUsers,
  FaLightbulb,
  FaChartLine,
  FaGlobeAmericas,
  FaAward,
  FaHandshake,
  FaUserFriends
} from "react-icons/fa";

function About() {
  const stats = [
    {
      number: "500+",
      label: "Startups Helped",
      icon: <AiFillRocket className="text-2xl text-blue-500" />
    },
    {
      number: "98%",
      label: "Success Rate",
      icon: <AiFillTrophy className="text-2xl text-green-500" />
    },
    {
      number: "10K+",
      label: "Pitches Generated",
      icon: <AiFillStar className="text-2xl text-purple-500" />
    },
    {
      number: "24/7",
      label: "AI Support",
      icon: <FaLightbulb className="text-2xl text-orange-500" />
    }
  ];

  const values = [
    {
      icon: <AiFillBulb className="text-3xl text-blue-500" />,
      title: "Innovation",
      description: "We constantly push the boundaries of AI technology to deliver cutting-edge pitch generation tools."
    },
    {
      icon: <FaUsers className="text-3xl text-green-500" />,
      title: "Accessibility",
      description: "Making professional pitch creation available to every founder, regardless of their background."
    },
    {
      icon: <FaHandshake className="text-3xl text-purple-500" />,
      title: "Trust",
      description: "Building long-term relationships with our users through reliable and secure services."
    },
    {
      icon: <FaChartLine className="text-3xl text-orange-500" />,
      title: "Growth",
      description: "Committed to helping startups grow from idea stage to successful funding rounds."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      bio: "Former startup founder with 10+ years in tech entrepreneurship and AI innovation.",
      expertise: ["AI Technology", "Startup Strategy", "Product Development"]
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      bio: "AI research scientist specializing in natural language processing and generative models.",
      expertise: ["Machine Learning", "Software Architecture", "Research"]
    },
    {
      name: "Emily Watson",
      role: "Head of Product",
      bio: "Product leader with experience at top tech companies and startup accelerators.",
      expertise: ["UX Design", "Product Strategy", "User Research"]
    },
    {
      name: "David Kim",
      role: "Growth Lead",
      bio: "Marketing expert focused on helping startups reach their target audience effectively.",
      expertise: ["Digital Marketing", "Growth Hacking", "Community Building"]
    }
  ];

  const timeline = [
    {
      year: "2022",
      title: "PitchCraft Founded",
      description: "Started with a vision to democratize startup pitch creation using AI technology."
    },
    {
      year: "2023",
      title: "AI Platform Launch",
      description: "Launched our first AI-powered pitch generator with basic features and templates."
    },
    {
      year: "2024",
      title: "Growth & Expansion",
      description: "Expanded to serve 500+ startups and introduced advanced pitch deck features."
    },
    {
      year: "Future",
      title: "Global Reach",
      description: "Working towards becoming the go-to platform for startup founders worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-blue-200">PitchCraft</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Empowering founders worldwide to transform ideas into compelling investor pitches with AI
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-blue-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At PitchCraft, we believe that every great idea deserves a great pitch. 
                Our mission is to democratize access to professional pitch creation tools, 
                making it possible for any founder—regardless of their background or resources—to 
                create compelling, investor-ready pitches.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We combine cutting-edge AI technology with startup expertise to help you 
                articulate your vision, validate your ideas, and secure the funding you need 
                to bring your dreams to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-center"
                >
                  Start Your Journey
                </Link>
                <Link 
                  to="/contact" 
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transform hover:scale-105 transition-all duration-200 text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <AiFillHeart className="text-5xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Why We Do It</h3>
                  <p className="text-blue-100 leading-relaxed">
                    We've seen too many brilliant ideas fail to get funding simply because 
                    the pitch wasn't compelling enough. We're changing that by putting 
                    AI-powered pitch creation tools in the hands of every innovator.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-purple-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at PitchCraft
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-50 rounded-xl">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate experts dedicated to helping startups succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="space-y-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <AiFillCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-purple-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From startup idea to helping hundreds of founders succeed
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div 
                key={index}
                className="flex items-start space-x-6"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {item.year}
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaGlobeAmericas className="text-4xl text-white mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of the movement that's changing how startups pitch and get funded
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Creating Free
            </Link>
            <Link 
              to="/services" 
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;