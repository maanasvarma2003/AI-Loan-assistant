import React, { useState } from 'react';
import { 
  FiMessageCircle as MessageCircle,
  FiPhone as Phone,
  FiMail as Mail,
  FiHelpCircle as HelpCircle,
  FiBook as Book,
  FiVideo as Video,
  FiMic as Mic,
  FiSearch as Search,
  FiChevronRight as ChevronRight,
  FiChevronDown as ChevronDown,
  FiPlay as Play,
  FiDownload as Download
} from 'react-icons/fi';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: Book },
    { id: 'loan-process', name: 'Loan Process', icon: HelpCircle },
    { id: 'payments', name: 'Payments & EMI', icon: MessageCircle },
    { id: 'technical', name: 'Technical Support', icon: Phone },
    { id: 'tutorials', name: 'Video Tutorials', icon: Video }
  ];

  const faqs = {
    'getting-started': [
      {
        question: 'How do I apply for a loan using RuralLend?',
        answer: 'You can apply for a loan by clicking on "Apply for Loan" on the homepage. Our AI-powered system will guide you through the process with voice assistance in your preferred language.'
      },
      {
        question: 'What documents do I need?',
        answer: 'You need Aadhaar Card, PAN Card, and income proof. You can upload photos of these documents directly through the app.'
      },
      {
        question: 'Is the app available in my local language?',
        answer: 'Yes! RuralLend supports 10+ Indian languages including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Odia, Punjabi, and more.'
      }
    ],
    'loan-process': [
      {
        question: 'How long does loan approval take?',
        answer: 'Our AI system provides instant decisions within 2-5 minutes. Once approved, loan amount is disbursed within 24 hours.'
      },
      {
        question: 'What is the maximum loan amount I can get?',
        answer: 'You can get loans ranging from ₹1,000 to ₹5,00,000 based on your profile and creditworthiness.'
      },
      {
        question: 'How does AI underwriting work?',
        answer: 'Our AI analyzes alternative data sources like mobile usage patterns, transaction history, and behavioral data to assess creditworthiness without requiring traditional credit history.'
      }
    ],
    'payments': [
      {
        question: 'How do I pay my EMI?',
        answer: 'You can pay EMI through the app, auto-debit, UPI, or by visiting our partner locations. We also offer WhatsApp payment options.'
      },
      {
        question: 'What happens if I miss an EMI payment?',
        answer: 'We understand rural challenges. Contact our support team immediately. We offer flexible payment options and grace periods.'
      },
      {
        question: 'Can I prepay my loan?',
        answer: 'Yes, you can prepay your loan anytime without any penalty charges. Use the app to calculate savings and make prepayments.'
      }
    ],
    'technical': [
      {
        question: 'The app is not working offline. What should I do?',
        answer: 'RuralLend works offline! Your data is saved locally and syncs when internet is available. If you face issues, restart the app or contact support.'
      },
      {
        question: 'How do I use voice features?',
        answer: 'Tap the microphone icon and speak in your preferred language. Our AI understands natural speech and will guide you through the process.'
      },
      {
        question: 'The app is slow on my phone. How can I improve performance?',
        answer: 'RuralLend is optimized for low-spec phones. Clear app cache, ensure 100MB free space, and use the lite mode for better performance.'
      }
    ],
    'tutorials': [
      {
        question: 'Video: How to apply for your first loan',
        answer: 'Watch our step-by-step video guide on applying for a loan using voice assistance.',
        isVideo: true,
        duration: '3:45'
      },
      {
        question: 'Video: Understanding AI credit scoring',
        answer: 'Learn how our AI evaluates your creditworthiness using alternative data.',
        isVideo: true,
        duration: '2:30'
      },
      {
        question: 'Video: Managing your loan and EMI payments',
        answer: 'Complete guide to tracking your loan and making payments through the app.',
        isVideo: true,
        duration: '4:20'
      }
    ]
  };

  const contactOptions = [
    {
      title: 'Call Support',
      description: '24/7 support in local languages',
      icon: Phone,
      action: 'Call 1800-XXX-XXXX',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'WhatsApp Chat',
      description: 'Quick help via WhatsApp',
      icon: MessageCircle,
      action: 'Chat Now',
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Voice Support',
      description: 'Speak to our AI assistant',
      icon: Mic,
      action: 'Start Voice Chat',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Email Support',
      description: 'Send us your queries',
      icon: Mail,
      action: 'help@rurallend.com',
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  const filteredFaqs = searchQuery 
    ? faqs[activeCategory]?.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs[activeCategory];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant help with loans, payments, and app features. 
            Our support is available in your local language.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Help Topics</h3>
              
              <nav className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Contact Options */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {contactOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${option.color}`}>
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                      <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        {option.action}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  {categories.find(cat => cat.id === activeCategory)?.name}
                </h2>
              </div>

              <div className="p-6">
                {filteredFaqs && filteredFaqs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            {faq.isVideo && <Play className="w-4 h-4 text-red-600" />}
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            {faq.duration && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {faq.duration}
                              </span>
                            )}
                          </div>
                          {expandedFaq === index ? (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        
                        {expandedFaq === index && (
                          <div className="px-4 pb-4">
                            <div className="border-t border-gray-200 pt-4">
                              {faq.isVideo ? (
                                <div className="bg-gray-100 rounded-lg p-8 text-center">
                                  <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                  <p className="text-gray-600 mb-4">{faq.answer}</p>
                                  <button className="btn-large btn-primary">
                                    Watch Video
                                  </button>
                                </div>
                              ) : (
                                <p className="text-gray-600">{faq.answer}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No help topics found for your search.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Additional Resources</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">User Guide</h4>
                    <p className="text-sm text-blue-700">Complete app user manual</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Video className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">Video Tutorials</h4>
                    <p className="text-sm text-blue-700">Step-by-step video guides</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
