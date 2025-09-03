import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSmartphone as Smartphone,
  FiZap as Zap,
  FiShield as Shield,
  FiUsers as Users,
  FiTrendingUp as TrendingUp,
  FiMessageCircle as MessageCircle,
  FiMapPin as MapPin,
  FiClock as Clock,
  FiCheckCircle as CheckCircle,
  FiArrowRight as ArrowRight,
  FiCpu as Brain,
  FiMic as Mic,
  FiDollarSign as DollarSign,
  FiFileText as FileText,
  FiWifi as Wifi,
  FiCreditCard as CreditCard,
  FiTarget as Target,
  FiStar as Star,
  FiAward as Award,
  FiDollarSign as Banknote,
  FiCalculator as Calculator,
  FiHeart as Heart,
  FiSun as Lightbulb,
  FiDatabase as Database,
  FiSmartphone as PhoneIcon,
  FiGlobe as Globe,
  FiLayers as Layers
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const HomePage = () => {
  const { state, actions } = useApp();
  const [currentFeature, setCurrentFeature] = useState(0);

  const problemsAddressed = [
    {
      problem: 'Limited access to formal credit in rural areas',
      impact: 'High',
      frequency: 'Daily',
      solution: 'AI-powered instant loan decisions without traditional paperwork',
      icon: Banknote,
      color: 'text-green-600'
    },
    {
      problem: 'Complex loan application processes',
      impact: 'High', 
      frequency: 'Weekly',
      solution: 'Voice-guided application with local language support',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      problem: 'Lack of digital literacy',
      impact: 'High',
      frequency: 'Daily',
      solution: 'Visual guides, voice assistance, and simplified UI',
      icon: Lightbulb,
      color: 'text-yellow-600'
    },
    {
      problem: 'Poor internet connectivity',
      impact: 'Medium',
      frequency: 'Daily',
      solution: 'Offline-first app with smart sync capabilities',
      icon: Wifi,
      color: 'text-purple-600'
    },
    {
      problem: 'Lack of traditional credit history',
      impact: 'High',
      frequency: 'Always',
      solution: 'Alternative data analysis using AI/ML models',
      icon: Database,
      color: 'text-indigo-600'
    }
  ];

  const innovativeFeatures = [
    {
      title: 'Voice-Enabled LLM Assistant',
      description: 'Natural language processing for loan applications in local languages',
      icon: MessageCircle,
      benefits: ['Eliminates literacy barriers', 'Supports 10+ Indian languages', 'Real-time guidance'],
      priority: 'P0'
    },
    {
      title: 'AI Alternative Credit Scoring',
      description: 'Machine learning models using mobile data, social patterns, and behavioral analysis',
      icon: Brain,
      benefits: ['No traditional credit history needed', 'Instant decisions', '40% higher approval rates'],
      priority: 'P0'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Instant Approval',
      description: 'Get loan approval in under 5 minutes using AI-powered underwriting',
      color: 'text-yellow-600'
    },
    {
      icon: Smartphone,
      title: 'Works on Basic Phones',
      description: 'Optimized for low-spec smartphones with minimal data usage',
      color: 'text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Voice Assistant',
      description: 'Complete applications using voice commands in your local language',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Advanced encryption and fraud detection protect your data',
      color: 'text-red-600'
    },
    {
      icon: MapPin,
      title: 'Local Language Support',
      description: 'Available in Hindi, Bengali, Tamil, Telugu, and 6 more languages',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      title: 'Community Verified',
      description: 'Trusted by over 100,000 farmers and small business owners',
      color: 'text-indigo-600'
    }
  ];

  const prioritizationMatrix = [
    { feature: 'Voice-guided loan application', impact: 10, effort: 6, priority: 'P0', timeframe: '2 weeks' },
    { feature: 'Offline-first with smart sync', impact: 9, effort: 7, priority: 'P1', timeframe: '3 weeks' },
    { feature: 'Alternative credit scoring (AI)', impact: 10, effort: 8, priority: 'P0', timeframe: '4 weeks' },
    { feature: 'Fraud detection (AI)', impact: 9, effort: 7, priority: 'P1', timeframe: '3 weeks' }
  ];

  useEffect(() => {
    if (!features || features.length === 0) return;

    let intervalId;
    const start = () => {
      intervalId = setInterval(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
      }, 6000);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (intervalId) clearInterval(intervalId);
      } else {
        start();
      }
    };

    start();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [features.length]);

  return (
    <div className="min-h-screen">
      <section className="section-soft pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="badge mb-4">Made for Rural India</span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 heading-underline">
            AI-Powered Loans for
            <span className="block text-blue-600">Rural India</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Fast, fair, and secure credit with offline support and voice guidance in your language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply" className="btn-cta inline-flex items-center space-x-2">
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/help" className="btn-large btn-secondary inline-flex items-center space-x-2">
              <Mic className="w-5 h-5" />
              <span>Try Voice Demo</span>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-green-500" />
              <span>RBI Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>1 Lakh+ Happy Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.8/5 Rating</span>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2 card-elevated p-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">₹500Cr+</div>
              <div className="text-sm text-gray-500">Loans Disbursed</div>
            </div>
            <div className="flex flex-col items-center space-y-2 card-elevated p-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1L+</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
            <div className="flex flex-col items-center space-y-2 card-elevated p-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">3 Min</div>
              <div className="text-sm text-gray-500">Avg Approval Time</div>
            </div>
            <div className="flex flex-col items-center space-y-2 card-elevated p-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-500">Approval Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 heading-underline">Problems We Solve for Rural India</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problemsAddressed.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="card-elevated p-6 card-hover">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gray-50 ${item.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.problem}</h3>
                      <p className="text-sm text-gray-600 mb-3">{item.solution}</p>
                      <div className="flex space-x-2 text-xs">
                        <span className={`px-2 py-1 rounded flex items-center space-x-1 ${
                          item.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          <Target className="w-3 h-3" />
                          <span>{item.impact} Impact</span>
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.frequency}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 heading-underline">AI-Powered Innovation</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {innovativeFeatures.map((feature, index) => (
              <div key={index} className="card-elevated p-6 bg-gradient-to-br from-white to-blue-50">
                <div className="flex items-start space-x-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.benefits.map((b, i) => (
                        <span key={i} className="badge">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 heading-underline">Development Roadmap & Prioritization</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impact (1-10)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Effort (1-10)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timeline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {prioritizationMatrix.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{item.impact}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${item.impact * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{item.effort}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${item.effort * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        item.priority === 'P0' 
                          ? 'bg-red-100 text-red-700' 
                          : item.priority === 'P1'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.timeframe}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 heading-underline">Built for Rural India</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-elevated p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;