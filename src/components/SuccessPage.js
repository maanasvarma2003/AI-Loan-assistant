import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiCheckCircle as CheckCircle,
  FiDownload as Download,
  FiShare2 as Share2,
  FiCalendar as Calendar,
  FiCreditCard as CreditCard,
  FiHome as Home,
  FiMessageCircle as MessageCircle,
  FiSun as Sparkles
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const SuccessPage = () => {
  const { state } = useApp();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const loanDetails = {
    amount: state.loanApplication?.loanDetails?.amount || 50000,
    interestRate: 11.5,
    tenure: state.loanApplication?.loanDetails?.tenure || 12,
    applicationId: 'RL' + Date.now().toString().slice(-8),
    disbursementDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    firstEmiDate: new Date(Date.now() + 54 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  const monthlyEmi = Math.round((loanDetails.amount * (1 + loanDetails.interestRate / 100)) / loanDetails.tenure);

  const nextSteps = [
    {
      title: 'Loan Disbursement',
      description: 'Loan amount will be credited to your account within 24 hours',
      icon: CreditCard,
      status: 'pending',
      date: loanDetails.disbursementDate
    },
    {
      title: 'First EMI',
      description: `First EMI of ₹${monthlyEmi.toLocaleString()} due date`,
      icon: Calendar,
      status: 'upcoming',
      date: loanDetails.firstEmiDate
    },
    {
      title: 'Set Up Auto-Pay',
      description: 'Enable automatic EMI payments for convenience',
      icon: CreditCard,
      status: 'action',
      date: 'Recommended'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 relative overflow-hidden">
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Congratulations! 🎉
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            Your loan has been approved!
          </p>
          
          <p className="text-lg text-gray-500">
            Application ID: <span className="font-mono font-semibold">{loanDetails.applicationId}</span>
          </p>
        </div>

        {/* Loan Summary Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Loan Summary</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Loan Amount</span>
                <span className="text-2xl font-bold text-green-600">₹{parseInt(loanDetails.amount).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Interest Rate</span>
                <span className="font-semibold">{loanDetails.interestRate}% per annum</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Loan Tenure</span>
                <span className="font-semibold">{loanDetails.tenure} months</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Monthly EMI</span>
                <span className="text-xl font-bold text-blue-600">₹{monthlyEmi.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Disbursement Details</h3>
                <p className="text-sm text-green-800">
                  <strong>Amount:</strong> ₹{parseInt(loanDetails.amount).toLocaleString()}
                </p>
                <p className="text-sm text-green-800">
                  <strong>Expected Date:</strong> {new Date(loanDetails.disbursementDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-green-800">
                  <strong>Method:</strong> Direct Bank Transfer
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">First EMI</h3>
                <p className="text-sm text-blue-800">
                  <strong>Amount:</strong> ₹{monthlyEmi.toLocaleString()}
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Due Date:</strong> {new Date(loanDetails.firstEmiDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Payment:</strong> Auto-debit available
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
          
          <div className="space-y-6">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-600' 
                    : step.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-green-100 text-green-600'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  <p className="text-sm text-gray-500">{step.date}</p>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  step.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : step.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {step.status === 'action' ? 'Recommended' : step.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button className="btn-large btn-primary flex items-center justify-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Sanction Letter</span>
          </button>
          
          <button className="btn-large btn-secondary flex items-center justify-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share Good News</span>
          </button>
          
          <Link to="/dashboard" className="btn-large btn-secondary flex items-center justify-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </Link>
          
          <button className="btn-large btn-secondary flex items-center justify-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Contact Support</span>
          </button>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-yellow-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• Loan disbursement will be completed within 24 hours after document verification</li>
            <li>• Your first EMI will be auto-debited from your registered bank account</li>
            <li>• You can prepay your loan anytime without any penalty charges</li>
            <li>• Keep your contact details updated for timely communication</li>
            <li>• Download the RuralLend app to track your loan and make payments</li>
          </ul>
        </div>

        {/* Customer Testimonial */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">RK</span>
            </div>
            <blockquote className="text-lg text-gray-700 mb-4 italic">
              "RuralLend made it so easy to get a loan for my farm. The AI process was fast and the support team was very helpful. Highly recommended!"
            </blockquote>
            <cite className="text-sm text-gray-600">
              - Rajesh Kumar, Farmer from Haryana
            </cite>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Thank you for choosing RuralLend. We're here to support your financial journey!
          </p>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <span className="text-2xl">🙏</span>
            <span className="text-lg font-semibold text-primary-600">Dhanyawad!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
