import React, { useState } from 'react';
import { Menu, X, ChevronRight, Check, MapPin, BookOpen, Briefcase, Shield, AlertCircle } from 'lucide-react';

// Florida Resources Database
const floridaResources = {
  name: "Florida",
  sba: {
    office: "Florida SBDC Network",
    description: "Free business consulting and low-cost training",
    website: "https://www.sbdcflorida.org",
    phone: "1-866-737-7232",
    services: [
      "One-on-one business consulting",
      "Business plan development",
      "Financial analysis and projections",
      "Marketing assistance",
      "Access to capital guidance"
    ]
  },
  cottageFoodLaw: {
    officialSource: "Florida Department of Agriculture - Division of Food Safety",
    sourceUrl: "https://www.fdacs.gov/Food-Nutrition/Food-Safety/Cottage-Food-Operations",
    enabled: true,
    revenue_limit: "$250,000",
    lastUpdated: "2024",
    allowed_foods: [
      "Breads, pastries, and baked goods (no cream, custard, or meat fillings)",
      "Candy and confections",
      "Dry baking mixes and herbs",
      "Jams, jellies, and preserves",
      "Dried fruits and vegetables",
      "Popcorn, cereals, and trail mixes"
    ],
    prohibited_foods: [
      "Foods requiring refrigeration",
      "Canned goods (low-acid foods)",
      "Pickled products",
      "Meat, poultry, or seafood products",
      "Dairy products (except some baked goods)",
      "Pet food or treats"
    ],
    requirements: [
      "Register with Florida Department of Agriculture ($50-$125 annually based on sales)",
      "Complete food safety training (recommended)",
      "Label must include: name/address, ingredients, allergens, and statement 'Made in a cottage food operation that is not subject to Florida's food safety regulations'",
      "Sales must be direct to consumer (no wholesale to stores)",
      "Food must be produced in your primary residence kitchen"
    ],
    registration_link: "https://www.fdacs.gov/Food-Nutrition/Food-Safety/Cottage-Food-Operations"
  },
  businessRegistration: {
    step1: {
      title: "Choose Business Structure",
      description: "Most home businesses start as sole proprietorships or LLCs",
      resource: "Florida Division of Corporations",
      url: "https://dos.myflorida.com/sunbiz/"
    },
    step2: {
      title: "Register Your Business Name",
      description: "File with Florida Department of State (Sunbiz.org)",
      cost: "LLC: $125 filing fee | DBA/Fictitious Name: $50",
      url: "https://dos.myflorida.com/sunbiz/"
    },
    step3: {
      title: "Get Your EIN (Federal Tax ID)",
      description: "Free from IRS - needed for business banking and taxes",
      url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"
    },
    step4: {
      title: "Get Local Business Tax Receipt",
      description: "Previously called 'occupational license' - required by your county",
      note: "Contact your County Tax Collector's office",
      cost: "Varies by county ($30-$150 typically)"
    },
    step5: {
      title: "Check Zoning Requirements",
      description: "Verify your home business is allowed in your zoning area",
      action: "Contact your city/county planning or zoning department"
    }
  },
  usefulLinks: [
    {
      title: "Florida Small Business Development Center",
      url: "https://www.sbdcflorida.org",
      description: "Free consulting and training for FL businesses"
    },
    {
      title: "Florida Department of State - Business Registration",
      url: "https://dos.myflorida.com/sunbiz/",
      description: "Register LLC, check business names"
    },
    {
      title: "SCORE Tampa Bay",
      url: "https://tampabay.score.org",
      description: "Free mentoring from experienced business owners"
    },
    {
      title: "IRS Small Business Resources",
      url: "https://www.irs.gov/businesses/small-businesses-self-employed",
      description: "Tax information and EIN application"
    }
  ]
};

const assessmentQuestions = [
  {
    id: 1,
    question: "What activities make you lose track of time?",
    options: [
      { id: 'a', text: "Creating or making things with my hands", skills: ['craft', 'food', 'art'] },
      { id: 'b', text: "Helping or teaching others", skills: ['service', 'education', 'consulting'] },
      { id: 'c', text: "Organizing and planning", skills: ['admin', 'event', 'consulting'] },
      { id: 'd', text: "Working with technology or data", skills: ['digital', 'tech', 'consulting'] }
    ]
  },
  {
    id: 2,
    question: "What resources do you already have?",
    options: [
      { id: 'a', text: "Kitchen and cooking skills", skills: ['food', 'catering'] },
      { id: 'b', text: "Craft supplies or artistic abilities", skills: ['craft', 'art', 'design'] },
      { id: 'c', text: "Professional expertise in a field", skills: ['consulting', 'education', 'service'] },
      { id: 'd', text: "Digital skills or equipment", skills: ['digital', 'tech', 'design'] }
    ]
  },
  {
    id: 3,
    question: "How much startup capital can you invest?",
    options: [
      { id: 'a', text: "Under $100", investment: 'minimal' },
      { id: 'b', text: "$100-$500", investment: 'low' },
      { id: 'c', text: "$500-$2000", investment: 'moderate' },
      { id: 'd', text: "Over $2000", investment: 'substantial' }
    ]
  },
  {
    id: 4,
    question: "How much time can you dedicate weekly?",
    options: [
      { id: 'a', text: "5-10 hours (side hustle)", commitment: 'part-time' },
      { id: 'b', text: "10-20 hours", commitment: 'substantial' },
      { id: 'c', text: "20-40 hours", commitment: 'full-time' },
      { id: 'd', text: "40+ hours (full commitment)", commitment: 'dedicated' }
    ]
  },
  {
    id: 5,
    question: "What's your primary motivation?",
    options: [
      { id: 'a', text: "Extra income while keeping my day job", goal: 'supplemental' },
      { id: 'b', text: "Replace my current income eventually", goal: 'transition' },
      { id: 'c', text: "Build wealth and scale a business", goal: 'growth' },
      { id: 'd', text: "Make a difference while earning", goal: 'impact' }
    ]
  }
];

const floridaOpportunities = [
  {
    id: 1,
    title: "Cottage Food Bakery",
    category: "Food",
    startup_cost: "$200-$500",
    earning_potential: "$500-$3,000/month to start",
    skills_match: ['food', 'craft'],
    investment: 'low',
    description: "Start a home-based baking business under Florida's Cottage Food Law. Sell baked goods at farmers markets, online, and direct to consumers.",
    requirements: [
      "Register with FL Dept of Agriculture ($50-125/year)",
      "Basic baking equipment and ingredients",
      "Food safety knowledge",
      "Business Tax Receipt from county"
    ],
    steps: [
      "Take food safety training course",
      "Register as Cottage Food Operation with FDACS",
      "Get Business Tax Receipt from County Tax Collector",
      "Create 3-5 signature products to start",
      "Design proper labels with required info",
      "Set up direct sales channels (farmers markets, social media, word of mouth)"
    ],
    legal_notes: "Florida allows up to $250,000 in annual cottage food sales. Must sell directly to consumers - no wholesale to stores. Check zoning for home-based food business.",
    resources: [
      { name: "FL Cottage Food Registration", url: "https://www.fdacs.gov/Food-Nutrition/Food-Safety/Cottage-Food-Operations" },
      { name: "Food Safety Training Options", url: "https://www.fdacs.gov/Food-Nutrition/Food-Safety/Training" }
    ]
  },
  {
    id: 2,
    title: "Virtual Assistant Services",
    category: "Digital",
    startup_cost: "$0-$100",
    earning_potential: "$1,500-$4,000/month part-time",
    skills_match: ['admin', 'digital', 'service'],
    investment: 'minimal',
    description: "Provide remote administrative, scheduling, email management, or social media support to busy entrepreneurs and small businesses.",
    requirements: [
      "Computer and reliable internet",
      "Professional email communication skills",
      "Time management abilities",
      "Business Tax Receipt"
    ],
    steps: [
      "Define your services (admin, social media, customer service, etc.)",
      "Register your business name (if using DBA)",
      "Get Business Tax Receipt from your county",
      "Create professional profiles (LinkedIn, Upwork, Fiverr)",
      "Set your rates ($20-50/hour to start)",
      "Network in Facebook groups and local business communities"
    ],
    legal_notes: "No special licenses required beyond standard business registration. Consider general liability insurance. Track all income for tax purposes.",
    resources: [
      { name: "SCORE Free Business Mentoring", url: "https://tampabay.score.org" },
      { name: "FL Business Registration", url: "https://dos.myflorida.com/sunbiz/" }
    ]
  },
  {
    id: 3,
    title: "Handmade Crafts & Products",
    category: "Craft",
    startup_cost: "$150-$800",
    earning_potential: "$500-$2,500/month",
    skills_match: ['craft', 'art', 'design'],
    investment: 'low',
    description: "Create and sell handmade items like jewelry, candles, soaps, artwork, or home decor through online platforms and local markets.",
    requirements: [
      "Craft materials and tools",
      "Business Tax Receipt",
      "Online store or market booth",
      "Photography setup for product photos"
    ],
    steps: [
      "Develop 10-20 products in your niche",
      "Register business and get Tax Receipt",
      "Set up Etsy shop or similar platform",
      "Research local craft fairs and markets",
      "Create social media presence (Instagram/Facebook)",
      "Price products: materials + time + overhead + profit"
    ],
    legal_notes: "Business Tax Receipt required. Some products (soaps, cosmetics) may have FDA labeling requirements. Research safety standards for children's products if applicable.",
    resources: [
      { name: "Etsy Seller Handbook", url: "https://www.etsy.com/seller-handbook" },
      { name: "FL Small Business Resources", url: "https://www.sbdcflorida.org" }
    ]
  },
  {
    id: 4,
    title: "Freelance Consulting",
    category: "Service",
    startup_cost: "$0-$300",
    earning_potential: "$2,000-$8,000/month",
    skills_match: ['consulting', 'education', 'service'],
    investment: 'minimal',
    description: "Leverage your professional expertise in marketing, HR, finance, operations, or your field to consult with businesses needing your skills.",
    requirements: [
      "Professional experience in your field",
      "Video meeting software (Zoom, Google Meet)",
      "Professional online presence",
      "Business registration"
    ],
    steps: [
      "Identify your consulting niche and ideal client",
      "Register business and get required licenses",
      "Create service packages (hourly vs project-based)",
      "Build LinkedIn profile showcasing expertise",
      "Reach out to your network",
      "Consider professional liability insurance"
    ],
    legal_notes: "Some consulting fields require professional licenses (accounting, legal, financial advice). Most general business consulting doesn't. Check if your specialty requires licensing.",
    resources: [
      { name: "Professional Licensing Search", url: "https://www.myfloridalicense.com/dbpr/" },
      { name: "SBDC Consulting Help", url: "https://www.sbdcflorida.org" }
    ]
  },
  {
    id: 5,
    title: "Pet Care Services",
    category: "Service",
    startup_cost: "$100-$500",
    earning_potential: "$1,000-$3,500/month part-time",
    skills_match: ['service', 'care'],
    investment: 'low',
    description: "Offer dog walking, pet sitting, or basic grooming services in your local area. Great for animal lovers looking for flexible income.",
    requirements: [
      "Reliable transportation",
      "Pet care knowledge and experience",
      "Liability insurance (highly recommended)",
      "Business Tax Receipt"
    ],
    steps: [
      "Get business registration and Tax Receipt",
      "Purchase liability insurance ($300-500/year)",
      "Create profiles on Rover, Wag, or local pet care platforms",
      "Set service area and rates",
      "Build reviews through friends/family first",
      "Consider pet first aid certification"
    ],
    legal_notes: "Business Tax Receipt required. Liability insurance is essential - covers injuries to pets or property damage. Check HOA rules if working from home.",
    resources: [
      { name: "Pet Sitters Associates (Insurance)", url: "https://www.petsitllc.com" },
      { name: "Red Cross Pet First Aid", url: "https://www.redcross.org/take-a-class/cpr" }
    ]
  },
  {
    id: 6,
    title: "Home Cleaning Services",
    category: "Service",
    startup_cost: "$150-$400",
    earning_potential: "$1,500-$4,000/month",
    skills_match: ['service'],
    investment: 'low',
    description: "Provide residential or small office cleaning services. Recurring revenue model with clients booking weekly or bi-weekly cleanings.",
    requirements: [
      "Basic cleaning supplies and equipment",
      "Transportation",
      "Liability insurance",
      "Business Tax Receipt"
    ],
    steps: [
      "Register business and get Tax Receipt",
      "Purchase liability insurance",
      "Invest in quality cleaning supplies",
      "Set pricing (by hour or by square foot)",
      "Market through Nextdoor, Facebook groups, flyers",
      "Offer first-time discounts to build client base"
    ],
    legal_notes: "Business Tax Receipt required. Must have liability insurance. Consider bonding (protection against theft claims) to build trust with clients.",
    resources: [
      { name: "Small Business Insurance Guide", url: "https://www.sba.gov/business-guide/launch-your-business/get-business-insurance" },
      { name: "FL Business Registration", url: "https://dos.myflorida.com/sunbiz/" }
    ]
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const handleAssessmentAnswer = (questionId, answer) => {
    const newAnswers = { ...assessmentAnswers, [questionId]: answer };
    setAssessmentAnswers(newAnswers);
    
    if (assessmentStep < assessmentQuestions.length - 1) {
      setAssessmentStep(assessmentStep + 1);
    } else {
      const skills = [];
      const profile = {
        investment: 'minimal',
        commitment: 'part-time',
        goal: 'supplemental'
      };

      Object.values(newAnswers).forEach(answer => {
        if (answer.skills) skills.push(...answer.skills);
        if (answer.investment) profile.investment = answer.investment;
        if (answer.commitment) profile.commitment = answer.commitment;
        if (answer.goal) profile.goal = answer.goal;
      });

      profile.topSkills = [...new Set(skills)].slice(0, 3);
      setUserProfile(profile);
      setAssessmentComplete(true);
    }
  };

  const getMatchedOpportunities = () => {
    if (!userProfile) return floridaOpportunities;
    
    return floridaOpportunities
      .filter(opp => {
        if (filterCategory !== 'all' && opp.category.toLowerCase() !== filterCategory) return false;
        return opp.skills_match.some(skill => userProfile.topSkills.includes(skill));
      })
      .sort((a, b) => {
        const aMatch = a.skills_match.filter(s => userProfile.topSkills.includes(s)).length;
        const bMatch = b.skills_match.filter(s => userProfile.topSkills.includes(s)).length;
        return bMatch - aMatch;
      });
  };

  const renderNavbar = () => (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">NL</span>
            </div>
            <span className="text-white font-bold text-xl">Noble Living</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className="text-slate-300 hover:text-emerald-400 transition-colors">Home</button>
            <button onClick={() => setCurrentPage('assessment')} className="text-slate-300 hover:text-emerald-400 transition-colors">Assessment</button>
            <button onClick={() => setCurrentPage('opportunities')} className="text-slate-300 hover:text-emerald-400 transition-colors">Opportunities</button>
            <button onClick={() => setCurrentPage('resources')} className="text-slate-300 hover:text-emerald-400 transition-colors">FL Resources</button>
            <button onClick={() => setCurrentPage('legal')} className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1">
              <Shield size={16} />
              Legal
            </button>
          </div>
          
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-3 space-y-3">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left text-slate-300 hover:text-emerald-400 py-2">Home</button>
            <button onClick={() => { setCurrentPage('assessment'); setMobileMenuOpen(false); }} className="block w-full text-left text-slate-300 hover:text-emerald-400 py-2">Assessment</button>
            <button onClick={() => { setCurrentPage('opportunities'); setMobileMenuOpen(false); }} className="block w-full text-left text-slate-300 hover:text-emerald-400 py-2">Opportunities</button>
            <button onClick={() => { setCurrentPage('resources'); setMobileMenuOpen(false); }} className="block w-full text-left text-slate-300 hover:text-emerald-400 py-2">FL Resources</button>
            <button onClick={() => { setCurrentPage('legal'); setMobileMenuOpen(false); }} className="block w-full text-left text-slate-300 hover:text-emerald-400 py-2">Legal</button>
          </div>
        </div>
      )}
    </nav>
  );

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <div className="bg-coral-500/10 border-b border-coral-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-orange-100 text-sm">
          <AlertCircle size={18} className="flex-shrink-0" />
          <p>
            <strong>Educational Resource:</strong> This platform provides general information about starting a home business in Florida. 
            Always verify current laws and consult with professionals for legal, tax, or financial advice.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Start Your Florida
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                Home Business Journey
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover legitimate home-based business opportunities with resources tailored specifically to Florida entrepreneurs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setCurrentPage('assessment')}
                className="px-8 py-4 bg-gradient-to-r from-coral-500 to-coral-400 text-white rounded-lg font-semibold text-lg hover:from-coral-400 hover:to-coral-300 transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
                style={{ background: 'linear-gradient(to right, #FF6B6B, #FF8787)' }}
              >
                Take Free Skills Assessment <ChevronRight size={20} />
              </button>
              <button
                onClick={() => setCurrentPage('opportunities')}
                className="px-8 py-4 bg-white/10 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
              >
                Browse Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Skills Assessment</h3>
            <p className="text-emerald-100 leading-relaxed">
              Discover your strengths and get matched with business ideas that align with your skills and resources
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Florida Resources</h3>
            <p className="text-emerald-100 leading-relaxed">
              Access verified information on cottage food laws, business registration, and local support services
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Step-by-Step Guides</h3>
            <p className="text-emerald-100 leading-relaxed">
              Get clear, actionable steps to launch your home business legally and confidently
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl p-12 text-center shadow-2xl" style={{ background: 'linear-gradient(to right, #FF6B6B, #FF8787)' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Begin with our free skills assessment to discover opportunities matched to your strengths
          </p>
          <button
            onClick={() => setCurrentPage('assessment')}
            className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-xl"
          >
            Start Free Assessment
          </button>
        </div>
      </div>

      <footer className="bg-slate-950 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-400 text-sm space-y-2">
            <p>© 2024 Noble Living LLC. All rights reserved.</p>
            <div className="flex justify-center gap-6">
              <button onClick={() => setCurrentPage('terms')} className="hover:text-emerald-400 transition-colors">Terms of Service</button>
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-emerald-400 transition-colors">Privacy Policy</button>
              <button onClick={() => setCurrentPage('disclaimer')} className="hover:text-emerald-400 transition-colors">Disclaimer</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  const renderAssessment = () => {
    if (assessmentComplete && userProfile) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(to right, #10B981, #34D399)' }}>
                  <Check size={40} className="text-white" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-3">Your Results Are Ready!</h2>
                <p className="text-lg text-slate-600">Based on your answers, here is your personalized profile</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-emerald-50 rounded-lg p-6 text-center">
                  <p className="text-sm text-slate-600 mb-2">Top Skills</p>
                  <p className="font-bold text-emerald-700 capitalize">{userProfile.topSkills.join(', ')}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-6 text-center">
                  <p className="text-sm text-slate-600 mb-2">Investment Level</p>
                  <p className="font-bold text-emerald-700 capitalize">{userProfile.investment}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-6 text-center">
                  <p className="text-sm text-slate-600 mb-2">Time Commitment</p>
                  <p className="font-bold text-emerald-700 capitalize">{userProfile.commitment}</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('opportunities')}
                className="w-full px-6 py-4 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 mb-4"
                style={{ background: 'linear-gradient(to right, #FF6B6B, #FF8787)' }}
              >
                View Matched Opportunities <ChevronRight size={20} />
              </button>

              <button
                onClick={() => {
                  setAssessmentComplete(false);
                  setAssessmentStep(0);
                  setAssessmentAnswers({});
                  setUserProfile(null);
                }}
                className="w-full px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentQuestion = assessmentQuestions[assessmentStep];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-emerald-600">
                  Question {assessmentStep + 1} of {assessmentQuestions.length}
                </span>
                <span className="text-sm text-slate-500">
                  {Math.round(((assessmentStep + 1) / assessmentQuestions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-emerald-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all"
                  style={{ width: `${((assessmentStep + 1) / assessmentQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-8">{currentQuestion.question}</h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAssessmentAnswer(currentQuestion.id, option)}
                  className="w-full p-6 text-left border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-slate-700 group-hover:text-emerald-700 font-medium">
                      {option.text}
                    </span>
                    <ChevronRight className="text-slate-400 group-hover:text-emerald-500" size={24} />
                  </div>
                </button>
              ))}
            </div>

            {assessmentStep > 0 && (
              <button
                onClick={() => setAssessmentStep(assessmentStep - 1)}
                className="mt-6 text-slate-600 hover:text-emerald-600 font-medium"
              >
                ← Previous Question
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderOpportunities = () => {
    const opportunities = userProfile ? getMatchedOpportunities() : floridaOpportunities;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {userProfile ? 'Your Matched Opportunities' : 'Business Opportunities'}
            </h1>
            <p className="text-xl text-emerald-100">
              {userProfile ? 'Based on your skills assessment' : 'Explore legitimate home-based business ideas for Florida'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filterCategory === 'all'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              All
            </button>
            {['Food', 'Digital', 'Craft', 'Service'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat.toLowerCase())}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filterCategory === cat.toLowerCase()
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <div key={opp.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{opp.title}</h3>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {opp.category}
                  </span>
                </div>
                
                <p className="text-slate-600 mb-4">{opp.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">Startup Cost:</span>
                    <span className="text-sm text-emerald-600 font-medium">{opp.startup_cost}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">Earning Potential:</span>
                    <span className="text-sm text-emerald-600 font-medium">{opp.earning_potential}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCurrentPage('opportunity-detail');
                    window.scrollTo(0, 0);
                  }}
                  className="w-full px-4 py-3 text-white rounded-lg font-medium transition-all"
                  style={{ background: 'linear-gradient(to right, #FF6B6B, #FF8787)' }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {opportunities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-white">No opportunities match your criteria. Try adjusting filters.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResources = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Florida Resources</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="text-emerald-600" />
              Small Business Support
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-emerald-700">{floridaResources.sba.office}</h3>
                <p className="text-slate-600">{floridaResources.sba.description}</p>
                <a href={floridaResources.sba.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 mt-2">
                  Visit Website →
                </a>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-semibold text-slate-900 mb-2">Services:</h4>
                <ul className="space-y-1">
                  {floridaResources.sba.services.map((service, idx) => (
                    <li key={idx} className="text-slate-600 flex items-start gap-2">
                      <Check size={16} className="text-emerald-600 mt-1 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cottage Food Law</h2>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-slate-700">Annual Revenue Limit:</span>
                <span className="ml-2 text-emerald-600 font-bold">{floridaResources.cottageFoodLaw.revenue_limit}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-700">Registration Fee:</span>
                <span className="ml-2 text-slate-600">$50-$125/year</span>
              </div>
              <a 
                href={floridaResources.cottageFoodLaw.registration_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-500 transition-all mt-4"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Helpful Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {floridaResources.usefulLinks.map((link, idx) => (
              
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-2 border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">{link.title}</h3>
                <p className="text-sm text-slate-600">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {renderNavbar()}
      {currentPage === 'home' && renderHome()}
      {currentPage === 'assessment' && renderAssessment()}
      {currentPage === 'opportunities' && renderOpportunities()}
      {currentPage === 'resources' && renderResources()}
    </div>
  );
};

export default App;
