import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AiFillPhone, 
  AiFillMail, 
  AiFillEnvironment, 
  AiFillClockCircle,
  AiOutlineMessage
} from "react-icons/ai";
import { 
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaComment,
  FaMapMarkerAlt
} from "react-icons/fa";
import { message } from 'antd';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: <AiFillPhone className="text-2xl text-blue-500" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon to Fri 9am to 6pm"
    },
    {
      icon: <AiFillMail className="text-2xl text-green-500" />,
      title: "Email",
      details: "support@pitchcraft.com",
      description: "Send us your query anytime"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-purple-500" />,
      title: "Address",
      details: "San Francisco, CA",
      description: "United States"
    },
    {
      icon: <AiFillClockCircle className="text-2xl text-orange-500" />,
      title: "Support Hours",
      details: "24/7 AI Support",
      description: "Live chat available"
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    message.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="text-blue-200">Touch</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions about PitchCraft? We're here to help you succeed with your startup journey.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Let's Talk About Your <span className="text-blue-600">Startup</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Whether you're a student with a brilliant idea or an experienced founder, 
                  we're excited to help you craft the perfect pitch.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-800 font-medium">{item.details}</p>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: <FaTwitter className="text-2xl" />, color: "hover:text-blue-400", name: "Twitter" },
                    { icon: <FaLinkedin className="text-2xl" />, color: "hover:text-blue-600", name: "LinkedIn" },
                    { icon: <FaInstagram className="text-2xl" />, color: "hover:text-pink-500", name: "Instagram" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`p-3 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-600 ${social.color} transition-all duration-300 hover:shadow-xl transform hover:scale-110`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <AiOutlineMessage className="text-3xl text-blue-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FaComment className="text-gray-400" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your project or question..."
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
                >
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about PitchCraft
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How does the AI pitch generation work?",
                answer: "Our AI analyzes your startup idea and generates professional pitch content including names, taglines, problem statements, and solutions."
              },
              {
                question: "Is PitchCraft free to use?",
                answer: "Yes! We offer a free tier with generous limits. Premium features are available for power users."
              },
              {
                question: "Can I export my pitches?",
                answer: "Absolutely! You can export your pitches as PDF documents or share them via direct links."
              },
              {
                question: "Do you offer team accounts?",
                answer: "Yes, we have team plans perfect for startup teams, incubators, and educational institutions."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Amazing Pitches?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful founders who trust PitchCraft for their startup journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Free Today
            </Link>
            <Link 
              to="/dashboard" 
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;