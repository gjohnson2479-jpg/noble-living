import React, { useState } from 'react';
import { Menu, X, ChevronRight, Download, Check, Star, Heart, Compass, Target, Users, BookOpen, Sparkles, ArrowRight, Mail } from 'lucide-react';

const NobleLiving = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  const assessmentQuestions = [
    {
      id: 1,
      question: "What energizes you most in life?",
      options: [
        { text: "Helping others succeed", category: "service" },
        { text: "Creating and building things", category: "creation" },
        { text: "Learning and discovering", category: "knowledge" },
        { text: "Leading and inspiring", category: "leadership" }
      ]
    },
    {
      id: 2,
      question: "When do you feel most fulfilled?",
      options: [
        { text: "Making a positive impact", category: "service" },
        { text: "Solving complex problems", category: "creation" },
        { text: "Sharing knowledge with others", category: "knowledge" },
        { text: "Bringing people together", category: "leadership" }
      ]
    },
    {
      id: 3,
      question: "What would you do if money wasn't a concern?",
      options: [
        { text: "Volunteer and support causes", category: "service" },
        { text: "Start a creative business", category: "creation" },
        { text: "Teach and mentor", category: "knowledge" },
        { text: "Build and lead a community", category: "leadership" }
      ]
    },
    {
      id: 4,
      question: "How do you prefer to contribute?",
      options: [
        { text: "One-on-one support", category: "service" },
        { text: "Through products or art", category: "creation" },
        { text: "Through education", category: "knowledge" },
        { text: "Through organizing people", category: "leadership" }
      ]
    },
    {
      id: 5,
      question: "What legacy do you want to leave?",
      options: [
        { text: "Lives I've touched", category: "service" },
        { text: "Things I've created", category: "creation" },
        { text: "Knowledge I've shared", category: "knowledge" },
        { text: "Movements I've started", category: "leadership" }
      ]
    }
  ];

  const purposeProfiles = {
    service: {
      title: "The Servant Leader",
      description: "Your purpose is rooted in helping others thrive. You find deep fulfillment in service, support, and making a tangible difference in people's lives.",
      strengths: ["Empathy", "Compassion", "Dedication", "Patience"],
      nextSteps: ["Join volunteer organizations", "Explore coaching or counseling", "Start a service-based business"]
    },
    creation: {
      title: "The Creator",
      description: "You're driven to build, design, and bring new things into the world. Your purpose lies in creative expression and innovation.",
      strengths: ["Innovation", "Vision", "Problem-solving", "Artistic expression"],
      nextSteps: ["Start a creative project", "Launch a business around your craft", "Join maker communities"]
    },
    knowledge: {
      title: "The Teacher",
      description: "You're passionate about learning and sharing wisdom. Your purpose is to educate, inspire learning, and spread knowledge.",
      strengths: ["Curiosity", "Communication", "Patience", "Insight"],
      nextSteps: ["Create educational content", "Mentor others", "Start teaching or training"]
    },
    leadership: {
      title: "The Visionary",
      description: "You're meant to lead, organize, and bring people together around a common cause. Your purpose is to inspire and guide others.",
      strengths: ["Vision", "Charisma", "Organization", "Motivation"],
      nextSteps: ["Start a community group", "Launch a movement", "Develop leadership skills"]
    }
  };

  const handleAnswer = (option) => {
    const newAnswers = { ...answers, [currentQuestion]: option };
    setAnswers(newAnswers);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers) => {
    const categories = {};
    Object.values(finalAnswers).forEach(answer => {
      categories[answer.category] = (categories[answer.category] || 0) + 1;
    });

    const topCategory = Object.keys(categories).reduce((a, b) => 
      categories[a] > categories[b] ? a : b
    );

    setShowResults(topCategory);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setShowAssessment(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for joining! We'll send your free Purpose Discovery Worksheet to ${email}`);
    setEmail('');
  };

  if (showAssessment && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-purple-600">
                  Question {currentQuestion + 1} of {assessmentQuestions.length}
                </span>
                <button 
                  onClick={() => setShowAssessment(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {assessmentQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {assessmentQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900 group-hover:text-purple-600">
                      {option.text}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const result = purposeProfiles[showResults];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your Purpose Profile
              </h2>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
                {result.title}
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {result.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="w-5 h-5 text-purple-600 mr-2" />
                  Your Core Strengths
                </h4>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 text-blue-600 mr-2" />
                  Next Steps
                </h4>
                <ul className="space-y-2">
                  {result.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <ArrowRight className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
              <h4 className="text-2xl font-bold mb-3">
                Ready to Live Your Purpose?
              </h4>
              <p className="text-purple-100 mb-6">
                Get your FREE Purpose Discovery Worksheet and start taking action today!
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  Get Worksheet
                </button>
              </form>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={resetAssessment}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-purple-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Noble Living</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-purple-600 font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 font-medium">About</a>
              <a href="#resources" className="text-gray-700 hover:text-purple-600 font-medium">Resources</a>
              <button
                onClick={() => setShowAssessment(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Start Assessment
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block text-gray-700 hover:text-purple-600 font-medium">Home</a>
              <a href="#about" className="block text-gray-700 hover:text-purple-600 font-medium">About</a>
              <a href="#resources" className="block text-gray-700 hover:text-purple-600 font-medium">Resources</a>
              <button
                onClick={() => {
                  setShowAssessment(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Start Assessment
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">True Purpose</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands who have found clarity, direction, and meaning in their lives through our proven purpose discovery system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowAssessment(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  Take Free Assessment
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <a
                  href="#resources"
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors text-center"
                >
                  Explore Resources
                </a>
              </div>
              <div className="mt-8 flex items-center space-x-8">
                <div>
                  <p className="text-3xl font-bold text-gray-900">10,000+</p>
                  <p className="text-gray-600">Lives Transformed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">4.9★</p>
                  <p className="text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
                <Compass className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Find Your Path</h3>
                <p className="text-purple-100 mb-6">
                  Our scientifically-backed assessment helps you uncover your unique strengths, values, and calling in just 5 minutes.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Personalized purpose profile</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Actionable next steps</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Free resources & support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Noble Living Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven three-step system helps you move from confusion to clarity, from drifting to directed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Discover</h3>
              <p className="text-gray-600">
                Take our free 5-minute assessment to uncover your unique purpose profile and core strengths.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Define</h3>
              <p className="text-gray-600">
                Get personalized guidance, worksheets, and resources tailored to your specific purpose journey.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Live It</h3>
              <p className="text-gray-600">
                Take action with our proven frameworks, community support, and ongoing coaching programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Free Resources to Get Started
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to begin your purpose discovery journey, completely free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Purpose Discovery Worksheet
              </h3>
              <p className="text-gray-600 mb-6">
                A comprehensive guide with exercises to help you identify your values, strengths, and calling.
              </p>
              <button className="flex items-center text-purple-600 font-semibold hover:text-purple-700">
                <Download className="w-5 h-5 mr-2" />
                Download Free PDF
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Community Support
              </h3>
              <p className="text-gray-600 mb-6">
                Join our free community of purpose-seekers for encouragement, accountability, and shared wisdom.
              </p>
              <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Discover Your Purpose?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands who have found clarity and direction in their lives. Start your journey today.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center"
            >
              Get Started Free
              <Mail className="w-5 h-5 ml-2" />
            </button>
          </form>
          <p className="text-purple-100 text-sm">
            ✓ Free forever · ✓ No credit card required · ✓ Instant access
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-purple-400" />
                <span className="ml-2 text-xl font-bold">Noble Living</span>
              </div>
              <p className="text-gray-400">
                Helping people discover and live their purpose.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Worksheets</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Noble Living. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NobleLiving;