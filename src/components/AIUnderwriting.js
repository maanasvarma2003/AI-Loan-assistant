import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiCpu as Brain,
  FiZap as Zap,
  FiShield as Shield,
  FiTrendingUp as TrendingUp,
  FiClock as Clock,
  FiCheckCircle as CheckCircle,
  FiAlertTriangle as AlertTriangle,
  FiDatabase as Database,
  FiActivity as Activity,
  FiTarget as Target,
  FiSmartphone as Smartphone,
  FiWifiOff as WifiOff,
  FiWifi as Wifi
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const AIUnderwriting = () => {
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  const analysisSteps = [
    {
      title: 'Document Verification',
      description: 'AI-powered OCR extracting and validating document information',
      duration: 15,
      icon: Shield,
      status: 'completed'
    },
    {
      title: 'Alternative Credit Scoring',
      description: 'Analyzing mobile usage patterns, transaction history, and behavioral data',
      duration: 30,
      icon: TrendingUp,
      status: 'processing'
    },
    {
      title: 'Risk Assessment',
      description: 'Machine learning models evaluating creditworthiness',
      duration: 20,
      icon: Target,
      status: 'pending'
    },
    {
      title: 'Final Decision',
      description: 'LLM integration for decision explanation and recommendations',
      duration: 15,
      icon: Brain,
      status: 'pending'
    }
  ];

  const [steps, setSteps] = useState(analysisSteps);

  const architectureComponents = [
    {
      layer: 'Frontend Layer',
      components: [
        'React Native App (Offline-first)',
        'Progressive Web App',
        'Voice Interface (Speech-to-Text)',
        'Camera/OCR Integration'
      ],
      color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    {
      layer: 'API Gateway',
      components: [
        'Request Routing & Rate Limiting',
        'Authentication & Authorization',
        'Request/Response Caching',
        'Offline Sync Queue'
      ],
      color: 'bg-green-100 border-green-300 text-green-800'
    },
    {
      layer: 'AI/ML Services',
      components: [
        'Large Language Model (LLM)',
        'Alternative Credit Scoring Engine',
        'Document OCR & Validation',
        'Fraud Detection System'
      ],
      color: 'bg-purple-100 border-purple-300 text-purple-800'
    },
    {
      layer: 'Data Layer',
      components: [
        'User Profile Database',
        'Alternative Data Sources',
        'Model Training Pipeline',
        'Audit & Compliance Logs'
      ],
      color: 'bg-orange-100 border-orange-300 text-orange-800'
    }
  ];

  useEffect(() => {
    const processAnalysis = async () => {
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, steps[i].duration * 100));
        
        setSteps(prevSteps => 
          prevSteps.map((step, index) => ({
            ...step,
            status: index <= i ? 'completed' : index === i + 1 ? 'processing' : 'pending'
          }))
        );
        setAnalysisStep(i);
      }

      const results = {
        decision: 'APPROVED',
        confidence: 92,
        loanAmount: state.loanApplication.loanDetails?.amount || 50000,
        interestRate: 11.5,
        tenure: state.loanApplication.loanDetails?.tenure || 12,
        factors: [
          { name: 'Mobile Usage Pattern', score: 95, impact: 'positive' },
          { name: 'Transaction Regularity', score: 88, impact: 'positive' },
          { name: 'Income Stability', score: 85, impact: 'positive' },
          { name: 'Location Risk', score: 78, impact: 'neutral' },
          { name: 'Age Factor', score: 90, impact: 'positive' }
        ],
        alternativeDataSources: [
          'Mobile Recharge Patterns',
          'Digital Payment History',
          'Social Network Analysis',
          'Geographic Risk Assessment',
          'Behavioral Biometrics'
        ]
      };

      setAnalysisResults(results);
      setIsProcessing(false);
      
      actions.updateLoanApplication({
        aiAnalysis: results,
        status: 'approved'
      });
    };

    processAnalysis();
  }, []);

  const retryLogicFeatures = [
    {
      title: 'Smart Queue Management',
      description: 'Failed requests are queued and automatically retried when connection is restored',
      icon: Database
    },
    {
      title: 'Progressive Data Sync',
      description: 'Application data is synced in chunks to handle intermittent connectivity',
      icon: Activity
    },
    {
      title: 'Offline OCR Processing',
      description: 'Document scanning works offline with cloud sync when available',
      icon: Smartphone
    },
    {
      title: 'Connection Health Monitoring',
      description: 'Real-time monitoring of network quality with adaptive behavior',
      icon: Wifi
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Loan Underwriting</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced AI system analyzes your application using alternative data sources 
            to provide instant, fair loan decisions for rural and semi-urban customers.
          </p>
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Processing Your Application</h2>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === 'completed' 
                      ? 'bg-green-500 text-white' 
                      : step.status === 'processing'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : step.status === 'processing' ? (
                      <div className="loading-spinner w-6 h-6 border-2"></div>
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {step.status === 'processing' && (
                      <span className="animate-pulse">Processing...</span>
                    )}
                    {step.status === 'completed' && (
                      <span className="text-green-600">✓ Complete</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResults && (
          <div className="space-y-8">
            {/* Decision Card */}
            <div className={`rounded-lg shadow-lg p-6 ${
              analysisResults.decision === 'APPROVED' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  analysisResults.decision === 'APPROVED' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {analysisResults.decision === 'APPROVED' ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <AlertTriangle className="w-8 h-8" />
                  )}
                </div>
                
                <h2 className={`text-3xl font-bold mb-2 ${
                  analysisResults.decision === 'APPROVED' ? 'text-green-800' : 'text-red-800'
                }`}>
                  Loan {analysisResults.decision}
                </h2>
                
                <p className={`text-lg mb-4 ${
                  analysisResults.decision === 'APPROVED' ? 'text-green-700' : 'text-red-700'
                }`}>
                  Confidence Score: {analysisResults.confidence}%
                </p>

                {analysisResults.decision === 'APPROVED' && (
                  <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
                    <h3 className="font-semibold text-gray-900 mb-3">Loan Terms</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-medium">₹{parseInt(analysisResults.loanAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span className="font-medium">{analysisResults.interestRate}% per annum</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tenure:</span>
                        <span className="font-medium">{analysisResults.tenure} months</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Monthly EMI:</span>
                        <span className="font-bold text-green-600">
                          ₹{Math.round((analysisResults.loanAmount * (1 + analysisResults.interestRate / 100)) / analysisResults.tenure).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Alternative Credit Factors */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Alternative Credit Analysis</h3>
              
              <div className="space-y-4">
                {analysisResults.factors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{factor.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            factor.impact === 'positive' 
                              ? 'bg-green-500' 
                              : factor.impact === 'negative'
                              ? 'bg-red-500'
                              : 'bg-yellow-500'
                          }`}
                          style={{ width: `${factor.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{factor.score}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Data Sources Used</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResults.alternativeDataSources.map((source, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Technical Architecture Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI System Architecture</h2>
          
          <div className="space-y-6">
            {architectureComponents.map((component, index) => (
              <div key={index} className={`border-2 rounded-lg p-4 ${component.color}`}>
                <h3 className="font-bold text-lg mb-3">{component.layer}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {component.components.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Bandwidth Features */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Low Bandwidth Optimization</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {retryLogicFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <WifiOff className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">Offline Mode Active</span>
            </div>
            <p className="text-sm text-yellow-700">
              Your application is saved locally and will sync automatically when internet connection is restored.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {analysisResults && (
          <div className="text-center">
            {analysisResults.decision === 'APPROVED' ? (
              <button
                onClick={() => navigate('/success')}
                className="btn-large btn-primary"
              >
                Accept Loan Offer
              </button>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/apply')}
                  className="btn-large btn-secondary"
                >
                  Modify Application
                </button>
                <button
                  onClick={() => navigate('/help')}
                  className="btn-large btn-primary"
                >
                  Get Help
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIUnderwriting;
