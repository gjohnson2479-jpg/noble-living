import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Download, Check, Star, Heart, Compass, Target, Users, BookOpen, Sparkles, ArrowRight, Mail, MessageCircle, Send, Zap, Shield, FileText, Clock, CheckSquare, Phone, Award, Play } from 'lucide-react';

const NobleLiving = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [isFreeTier, setIsFreeTier] = useState(true); // Toggle this based on user auth

  const MESSAGE_LIMIT = 5;

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

  // Noble Living Branded Worksheets
  const worksheets = [
    {
      id: 1,
      title: "The Purpose Discovery Workbook",
      description: "A comprehensive 15-page guide to uncovering your core values, strengths, and life calling through powerful reflection exercises.",
      pages: 15,
      time: "30-45 min",
      icon: Compass,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 2,
      title: "90-Day Purpose Action Plan",
      description: "Transform your purpose into reality with this step-by-step quarterly planning guide. Includes goal-setting templates and accountability trackers.",
      pages: 12,
      time: "20-30 min",
      icon: Target,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      title: "Daily Noble Living Journal",
      description: "Start and end each day with intention. Morning gratitude prompts, evening reflection questions, and weekly purpose check-ins.",
      pages: 8,
      time: "5-10 min daily",
      icon: BookOpen,
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      title: "The Clarity Blueprint",
      description: "Overcome confusion and decision paralysis with this visual mapping tool. Identify obstacles, clarify priorities, and chart your path forward.",
      pages: 10,
      time: "25-35 min",
      icon: Sparkles,
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 5,
      title: "Values & Vision Alignment Guide",
      description: "Ensure your daily actions align with your deepest values. Includes the Noble Living Values Assessment and vision board framework.",
      pages: 14,
      time: "40-50 min",
      icon: Heart,
      color: "from-orange-500 to-orange-600"
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

  // Smart Chat Responses with Friendly Personality
  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    const responses = {
      greeting: [
        "Hey! 👋 Good to see you again. What are we tackling today?",
        "Welcome back! What's on your mind? Let's figure it out together.",
        "Hiii! So what's going on in your world? I'm all ears! 💜"
      ],
      purpose: [
        "Ooh, the big question! Here's what I've learned: your purpose isn't hiding on a mountaintop. It's usually in the things that make you forget to check your phone. What makes YOU feel that way?",
        "Purpose sounds so heavy, right? Let's make it simpler: when do you feel most ALIVE? Not happy, not comfortable... but ALIVE. Tell me about that.",
        "Plot twist: your purpose might be something you're already doing but not giving yourself credit for. What do people always come to YOU for help with?"
      ],
      stuck: [
        "Ugh, being stuck is the WORST, right? But here's the thing - you're not actually stuck, you're just standing at a crossroads overthinking which way to go. Let's pick ONE tiny thing you can do today. What's one 15-minute action?",
        "Okay, real talk: being stuck usually means you're ready for something new but scared to try it. What's the thing you WANT to do but keep talking yourself out of? Let's figure this out together.",
        "I hear you. Being stuck feels terrible. But you know what? Close your eyes for a sec and imagine your life 6 months from now if everything went RIGHT. What do you see? Start there."
      ],
      action: [
        "Yesss! I love this energy! 🚀 Okay, let's break this down together. What's the first tiny step? Even if it feels too small to matter - let's start there.",
        "Action mode activated! 💪 Here's what we're gonna do: pick ONE specific thing for this week. Not 'research' or 'think about' - an actual DO-able action. What is it?",
        "YES! Taking action is how you'll figure this out. What's the smallest step you can take TODAY? Seriously, even 15 minutes counts. Progress over perfection, friend!"
      ],
      business: [
        "Okay let's DO this! 🚀 Starting a business is exciting! First things first: what problem are you solving? Like, what makes people go 'OMG I NEED this!' when they hear about your idea?",
        "Love it! Real talk - have you: 1) Figured out who your customer is? 2) Validated your idea with actual people? 3) Looked into LLC setup? Let's tackle these one at a time. Where are you?",
        "Yesss business mode! Here's your roadmap: Week 1 - validate the idea. Week 2 - set up your LLC. Week 3 - create your minimum offer. Week 4 - get your first customer. Sound doable? Let's figure it out together!"
      ],
      llc: [
        "LLC time! Okay so this is actually way easier than you think. It takes like 15 minutes to file online through your state's website. Have you picked your state yet? Usually you file where you live. Want me to walk you through it?",
        "Setting up an LLC is actually pretty straightforward! You'll need: 1) Business name, 2) Registered agent (can be you!), 3) Articles of Organization filed with your state. Most states let you do it online. Takes about 15-20 mins. Need help with the steps?",
        "Good news: LLC formation isn't scary! Most people can do it themselves in under an hour. You basically: pick a name, file paperwork with your state (online), pay the fee ($50-300 depending on state), and boom - you're an LLC! Where are you stuck?"
      ],
      encouragement: [
        "Listen... everyone who's ever done anything great felt exactly like this at some point. You're right on track, I promise. What do you need help with next?",
        "Okay I'm proud of you. No really. The fact that you're HERE, asking questions, trying to figure it out? That already puts you ahead of most people. Don't give up on yourself. 💜",
        "Real talk? You're doing better than you think. Everyone feels messy in the middle. Keep going. What's your next small step? Let's figure it out together."
      ],
      progress: [
        "Wait wait wait... did you actually DO that?! That's huge! You see that, right? You're literally taking steps! Keep going! How does it feel? 🔥",
        "YESSS! Okay that's actually amazing! You should be proud of yourself. Seriously. What's next? Let's keep this momentum going!",
        "Dude! That's progress! Even if it feels small, it counts. Every step forward is a win. What are you tackling next?"
      ]
    };
    
    if (message.length < 10 || message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }
    if (message.includes('llc') || message.includes('register') || message.includes('legal') || message.includes('incorporate')) {
      return responses.llc[Math.floor(Math.random() * responses.llc.length)];
    }
    if (message.includes('business') || message.includes('start') || message.includes('entrepreneur') || message.includes('company')) {
      return responses.business[Math.floor(Math.random() * responses.business.length)];
    }
    if (message.includes('purpose') || message.includes('calling') || message.includes('meaning') || message.includes('why')) {
      return responses.purpose[Math.floor(Math.random() * responses.purpose.length)];
    }
    if (message.includes('stuck') || message.includes('lost') || message.includes('confused') || message.includes('don\'t know') || message.includes('help')) {
      return responses.stuck[Math.floor(Math.random() * responses.stuck.length)];
    }
    if (message.includes('what should i') || message.includes('what do i') || message.includes('action') || message.includes('how do i') || message.includes('next step')) {
      return responses.action[Math.floor(Math.random() * responses.action.length)];
    }
    if (message.includes('did it') || message.includes('finished') || message.includes('completed') || message.includes('done')) {
      return responses.progress[Math.floor(Math.random() * responses.progress.length)];
    }
    
    return responses.encouragement[Math.floor(Math.random() * responses.encouragement.length)];
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Check message limit for free users
    if (isFreeTier && messageCount >= MESSAGE_LIMIT) {
      setShowUpgradePrompt(true);
      return;
    }

    const userMessage = { text: chatInput, sender: 'user', timestamp: new Date() };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput('');

    // Increment message count for free users
    if (isFreeTier) {
      setMessageCount(messageCount + 1);
    }

    setIsTyping(true);
    setTimeout(() => {
      const response = { 
        text: getResponse(chatInput), 
        sender: 'assistant', 
        timestamp: new Date() 
      };
      setChatMessages(prev => [...prev, response]);
      setIsTyping(false);

      // Show upgrade prompt after 5th message
      if (isFreeTier && messageCount + 1 >= MESSAGE_LIMIT) {
        setTimeout(() => setShowUpgradePrompt(true), 2000);
      }
    }, 1500);
  };

  const startChat = () => {
    if (chatMessages.length === 0) {
      setChatMessages([{
        text: "Hey! 💜 Thanks for being here. I'm your personal assistant at Noble Living - think of me as that friend who actually remembers your goals and helps you figure things out. No judgment, just real talk. So what's on your mind? Let's figure it out together.",
        sender: 'assistant',
        timestamp: new Date()
      }]);
    }
    setShowChat(true);
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

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Upgrade Prompt Modal
  const UpgradePromptModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <button 
          onClick={() => setShowUpgradePrompt(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">😅</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Wait, don't go!</h3>
        </div>

        <p className="text-gray-700 mb-4">
          You've hit your 5 free messages for today, but honestly? We were just getting somewhere good!
        </p>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Here's the deal with Premium ($14.99/month):</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Message me literally ANYTIME (unlimited!)</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Daily texts checking in on your goals</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Personalized action plans</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Real accountability that actually works</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-600 text-center mb-6">
          Think of it like having a friend who won't let you quit on yourself. Worth it? 💜
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              setShowUpgradePrompt(false);
              navigateTo('packages');
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Yeah, Let's Do This!
          </button>
          <button
            onClick={() => setShowUpgradePrompt(false)}
            className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Nah, Ask Me Later
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          (Your free messages reset in 18 hours btw!)
        </p>
      </div>
    </div>
  );

  // Page Components
  const AboutPage = () => (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">About Noble Living</h1>
        
        {/* HeyGen Video Placeholder */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 text-center">
            <Play className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <p className="text-gray-700 font-medium mb-4">Watch My Story (HeyGen Video)</p>
            <p className="text-sm text-gray-600">
              Add your HeyGen embed code here
            </p>
            {/* Replace with: <iframe src="YOUR_HEYGEN_EMBED_URL" /> */}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-16 h-16 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">My Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Noble Living was born from personal experience—the kind of frustration that comes from feeling undervalued, underpaid, and unfulfilled in a corporate job that drains your spirit.
            </p>
            <p>
              My journey to purpose wasn't a straight path. It started in a cubicle, feeling empty despite "doing everything right." The turning point came when I discovered joy in something unexpected: baking. What began as a creative outlet became a thriving second income, and more importantly, it ignited a fire within me.
            </p>
            <p>
              As I taught others to do the same—to find their passion and build something meaningful—I realized my emptiness wasn't just about the draining job. It was about not living my life with purpose.
            </p>
            <p>
              I began doing more of what brought me alive. I baked. I taught. I helped others discover their own paths to fulfillment. And slowly, everything changed.
            </p>
            <p>
              Now, Noble Living is my way of expanding that passion. It's for everyone who feels lost, stuck, or unfulfilled. Everyone seeking to live a meaningful, purposeful, impactful, and successful life.
            </p>
            <p className="text-xl font-semibold text-purple-600">
              I built these tools and resources to make it easy for anyone to get help, find answers, access support, and discover a starting point to be self-sufficient and live their life with purpose—on purpose.
            </p>
            <p>
              This is my story. And I'm here to help you write yours.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To help people discover and live their purpose through practical tools, personal support, and genuine accountability.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Community</h3>
            <p className="text-gray-600">
              A growing family of purpose-seekers supporting each other on the journey to meaningful, fulfilling lives.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Approach</h3>
            <p className="text-gray-600">
              Combining science-backed assessments with smart technology and real human wisdom for lasting transformation.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigateTo('home')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-shadow inline-flex items-center"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );

  const PackagesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Path</h1>
          <p className="text-2xl text-gray-600">Start free, upgrade when you're ready</p>
        </div>

        {/* HeyGen Video Placeholder */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <Play className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <p className="text-gray-700 font-medium mb-2">How to Choose Your Package (HeyGen Video)</p>
            <p className="text-sm text-gray-600">
              Add your HeyGen embed code here
            </p>
            {/* Replace with: <iframe src="YOUR_HEYGEN_EMBED_URL" /> */}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Free Package */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Free</h3>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                Purpose Seeker
              </span>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg text-gray-600">/forever</span></div>
            <p className="text-gray-600 mb-6">Perfect for getting started on your purpose journey</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>Purpose discovery assessment</span>
              </li>
              <li className="flex items-start">
                <Check className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>Your personal assistant</strong> (5 messages/day)</span>
              </li>
              <li className="flex items-start">
                <Check className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>5 downloadable worksheets</span>
              </li>
              <li className="flex items-start">
                <Check className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>Weekly email check-ins</span>
              </li>
            </ul>
            <button
              onClick={() => navigateTo('home')}
              className="w-full border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Premium Package */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-white relative transform scale-105">
            <div className="absolute -top-4 right-8 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Premium</h3>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Purpose Builder
              </span>
            </div>
            <div className="text-4xl font-bold mb-6">$14.99<span className="text-lg text-purple-200">/month</span></div>
            <p className="text-purple-100 mb-6">For those ready to take real action and stay accountable</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="font-medium">Everything in Free, PLUS:</span>
              </li>
              <li className="flex items-start">
                <MessageCircle className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>Unlimited access to your personal assistant</strong></span>
              </li>
              <li className="flex items-start">
                <Phone className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>Daily SMS accountability texts</strong> - "Did you finish that LLC paperwork?"</span>
              </li>
              <li className="flex items-start">
                <Sparkles className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>Morning inspiration quotes</strong> (3x/week)</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>Personalized progress tracker</strong> with timeline</span>
              </li>
              <li className="flex items-start">
                <Clock className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong>Custom reminders</strong> - Daily or weekly, your choice</span>
              </li>
            </ul>
            <button
              className="w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors mb-4"
              onClick={() => alert('Stripe payment integration coming soon! Email premium@nobleliving.com to join the waitlist.')}
            >
              Upgrade to Premium
            </button>
            <p className="text-center text-purple-200 text-sm">Cancel anytime • 7-day money-back guarantee</p>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Compare Features</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Free</th>
                  <th className="text-center py-4 px-4 bg-purple-50 rounded-t-lg">Premium</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Purpose Assessment</td>
                  <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-purple-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Chat Messages</td>
                  <td className="text-center py-4 px-4">5/day</td>
                  <td className="text-center py-4 px-4 bg-purple-50 font-bold">Unlimited ♾️</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Worksheets</td>
                  <td className="text-center py-4 px-4">5 free</td>
                  <td className="text-center py-4 px-4 bg-purple-50">All + future releases</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">SMS Accountability</td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-purple-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Progress Tracking</td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-purple-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Custom Reminders</td>
                  <td className="text-center py-4 px-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-purple-50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Support</td>
                  <td className="text-center py-4 px-4">Email</td>
                  <td className="text-center py-4 px-4 bg-purple-50 rounded-b-lg">Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Example SMS */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">See Premium in Action</h3>
          <p className="text-center text-gray-600 mb-8">Real examples of the accountability texts you'll receive</p>
          <div className="max-w-md mx-auto space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
              <p className="text-sm text-gray-600 mb-1">Monday 9:00 AM</p>
              <p className="text-gray-900">"Good morning! Today's the day to tackle your LLC paperwork. It only takes 15 minutes. You've got this! 💪"</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="text-sm text-gray-600 mb-1">Wednesday 8:00 AM</p>
              <p className="text-gray-900">"Hey! Did you finish the LLC forms? Don't forget - once that's done, you're officially an LLC and on to the next step! 🎉"</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-sm text-gray-600 mb-1">Friday 7:00 AM</p>
              <p className="text-gray-900">"Based on your plan, your business will be up and running by 2/27/26 if you keep taking these steps. You're on track! Keep going! 🚀"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PrivacyPage = () => (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Last Updated: December 30, 2024</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Information We Collect</h2>
          <p>Noble Living collects information you provide directly to us, including:</p>
          <ul>
            <li>Email address when you sign up for our services</li>
            <li>Assessment responses and purpose profile results</li>
            <li>Chat conversations with your personal assistant</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Phone number (only if you opt-in to Premium SMS services)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Send you purpose discovery resources and worksheets</li>
            <li>Provide personalized assistant responses</li>
            <li>Send accountability reminders (with your consent)</li>
            <li>Process payments for Premium services</li>
            <li>Respond to your questions and support requests</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information. We may share information with:</p>
          <ul>
            <li>Service providers (Stripe for payments, SendGrid for emails, Twilio for SMS)</li>
            <li>When required by law or to protect our rights</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Your Choices</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of marketing communications at any time</li>
            <li>Cancel Premium SMS services anytime</li>
            <li>Request a copy of your data</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">5. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">6. Contact Us</h2>
          <p>For privacy questions, contact us at: privacy@nobleliving.com</p>
        </div>
      </div>
    </div>
  );

  const TermsPage = () => (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">Last Updated: December 30, 2024</p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Acceptance of Terms</h2>
          <p>By accessing and using Noble Living, you accept and agree to be bound by these Terms of Service.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Description of Service</h2>
          <p>Noble Living provides:</p>
          <ul>
            <li>Purpose discovery assessments and resources</li>
            <li>Automated personal assistant conversations</li>
            <li>Downloadable worksheets and guides</li>
            <li>Premium accountability services (SMS reminders)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Important Disclaimer</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
            <p className="font-semibold text-gray-900 mb-2">IMPORTANT: Noble Living is NOT a substitute for professional therapy, medical advice, or licensed counseling.</p>
            <p className="text-gray-700 mb-2">Our personal assistant provides:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>General guidance and motivation</li>
              <li>Self-reflection prompts and exercises</li>
              <li>Accountability and action steps</li>
            </ul>
            <p className="text-gray-700 mt-2 mb-2">Our assistant does NOT provide:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Professional mental health treatment</li>
              <li>Medical or psychological diagnosis</li>
              <li>Crisis intervention or emergency services</li>
            </ul>
            <p className="font-semibold text-gray-900 mt-3">If you are experiencing a mental health crisis, please contact a licensed professional or call 988 (Suicide & Crisis Lifeline).</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">4. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate information</li>
            <li>Use the service for lawful purposes only</li>
            <li>Not misuse or attempt to hack our systems</li>
            <li>Respect intellectual property rights</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">5. Premium Services</h2>
          <p>Premium SMS Accountability services are billed monthly at $14.99/month. You may cancel anytime. Refunds are provided within 7 days of initial purchase only.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">6. Intellectual Property</h2>
          <p>All content, including worksheets, assessments, and assistant responses, are owned by Noble Living and protected by copyright law.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">7. Limitation of Liability</h2>
          <p>Noble Living is provided "as is" without warranties. We are not liable for any damages arising from your use of the service.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">8. Contact</h2>
          <p>For questions about these terms, contact: legal@nobleliving.com</p>
        </div>
      </div>
    </div>
  );

  // Assessment and Results (keeping existing code with updated language)
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

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center mb-8">
              <h4 className="text-2xl font-bold mb-3">
                Ready to Take Action?
              </h4>
              <p className="text-purple-100 mb-6">
                Chat with your personal assistant for guidance and accountability!
              </p>
              <button
                onClick={startChat}
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Let's Chat!
              </button>
            </div>

            <div className="mt-8 text-center space-y-4">
              <button
                onClick={resetAssessment}
                className="text-purple-600 hover:text-purple-700 font-medium mr-6"
              >
                Retake Assessment
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setShowAssessment(false);
                  navigateTo('home');
                }}
                className="text-gray-600 hover:text-gray-700 font-medium"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render different pages
  if (currentPage === 'about') return <AboutPage />;
  if (currentPage === 'privacy') return <PrivacyPage />;
  if (currentPage === 'terms') return <TermsPage />;
  if (currentPage === 'packages') return <PackagesPage />;

  // Main Home Page
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
              <Heart className="w-8 h-8 text-purple-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Noble Living</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigateTo('home')} className="text-gray-700 hover:text-purple-600 font-medium">Home</button>
              <button onClick={() => navigateTo('about')} className="text-gray-700 hover:text-purple-600 font-medium">About</button>
              <a href="#resources" className="text-gray-700 hover:text-purple-600 font-medium">Resources</a>
              <button onClick={() => navigateTo('packages')} className="text-gray-700 hover:text-purple-600 font-medium">Packages</button>
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
              <button onClick={() => navigateTo('home')} className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium">Home</button>
              <button onClick={() => navigateTo('about')} className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium">About</button>
              <a href="#resources" className="block text-gray-700 hover:text-purple-600 font-medium">Resources</a>
              <button onClick={() => navigateTo('packages')} className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium">Packages</button>
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
              {/* HeyGen Video Placeholder */}
              <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium">Welcome Video (HeyGen)</p>
                    <p className="text-sm text-gray-600 mt-2">Add your HeyGen embed code here</p>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">True Purpose</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands who have found clarity, direction, and meaning through our proven purpose discovery system - with personal support every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowAssessment(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  Take Free Assessment
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={startChat}
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat Now
                </button>
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
                  Our smart assessment and personal assistant help you uncover your unique strengths, values, and calling in just 5 minutes.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Personalized purpose profile</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>24/7 personal assistant support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Actionable next steps</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Free resources & worksheets</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
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
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Chat & Plan</h3>
              <p className="text-gray-600">
                Get personalized guidance from your personal assistant with practical action steps tailored to your journey.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Live It</h3>
              <p className="text-gray-600">
                Take action with our proven frameworks, worksheets, and optional SMS accountability that actually works.
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {worksheets.map((worksheet) => {
              const IconComponent = worksheet.icon;
              return (
                <div key={worksheet.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${worksheet.color} rounded-lg mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {worksheet.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {worksheet.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {worksheet.pages} pages
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {worksheet.time}
                    </span>
                  </div>
                  <button 
                    onClick={() => alert('Worksheet download coming soon! Enter your email above to get notified.')}
                    className="w-full flex items-center justify-center text-purple-600 font-semibold hover:text-purple-700 border-2 border-purple-600 rounded-lg py-2 hover:bg-purple-50 transition-colors"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Free PDF
                  </button>
                </div>
              );
            })}
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
            Join thousands who have found clarity and direction in their lives. Start your journey today - completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowAssessment(true)}
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center justify-center"
            >
              Take Free Assessment
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={startChat}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with Your Assistant
            </button>
          </div>
          <p className="text-purple-100 text-sm mt-6">
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
                <li><button onClick={() => navigateTo('about')} className="hover:text-white">About Us</button></li>
                <li>
                  <span className="inline-flex items-center">
                    Careers
                    <span className="ml-2 text-xs bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full">Coming Soon</span>
                  </span>
                </li>
                <li><a href="mailto:support@nobleliving.com" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#resources" className="hover:text-white">Worksheets</a></li>
                <li>
                  <span className="inline-flex items-center">
                    Community
                    <span className="ml-2 text-xs bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full">Coming Soon</span>
                  </span>
                </li>
                <li><button onClick={() => navigateTo('packages')} className="hover:text-white">Premium</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigateTo('privacy')} className="hover:text-white">Privacy Policy</button></li>
                <li><button onClick={() => navigateTo('terms')} className="hover:text-white">Terms of Service</button></li>
                <li><a href="mailto:support@nobleliving.com" className="hover:text-white">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Noble Living. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={startChat}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 z-50"
          title="Chat with your assistant"
        >
          <MessageCircle className="w-6 h-6" />
          {isFreeTier && messageCount < MESSAGE_LIMIT && messageCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {MESSAGE_LIMIT - messageCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold">Your Assistant</h3>
                <p className="text-xs text-purple-100">
                  {isFreeTier ? `${messageCount}/${MESSAGE_LIMIT} messages today` : 'Unlimited ♾️'}
                </p>
              </div>
            </div>
            <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                disabled={isFreeTier && messageCount >= MESSAGE_LIMIT}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full hover:shadow-lg transition-shadow disabled:opacity-50"
                disabled={isFreeTier && messageCount >= MESSAGE_LIMIT}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Not a substitute for professional therapy
            </p>
          </form>
        </div>
      )}

      {/* Upgrade Prompt Modal */}
      {showUpgradePrompt && <UpgradePromptModal />}
    </div>
  );
};

export default NobleLiving;
