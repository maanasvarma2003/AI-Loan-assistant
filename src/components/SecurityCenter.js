import React, { useState } from 'react';
import { 
  FiShield as Shield,
  FiLock as Lock,
  FiEye as Eye,
  FiEyeOff as EyeOff,
  FiKey as Key,
  FiSmartphone as Smartphone,
  FiCheckCircle as CheckCircle,
  FiAlertTriangle as AlertTriangle,
  FiInfo as Info,
  FiFileText as FileText,
  FiDatabase as Database,
  FiUserCheck as UserCheck,
  FiGlobe as Globe,
  FiWifi as Wifi
} from 'react-icons/fi';

const SecurityCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showApiKey, setShowApiKey] = useState(false);

  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      description: 'All data transmission uses AES-256 encryption',
      icon: Lock,
      status: 'active',
      details: 'Your personal and financial data is encrypted using military-grade AES-256 encryption during transmission and storage.'
    },
    {
      title: 'Biometric Authentication',
      description: 'Fingerprint and face recognition for secure access',
      icon: UserCheck,
      status: 'active',
      details: 'Use your fingerprint or face ID to securely access your account without remembering passwords.'
    },
    {
      title: 'Two-Factor Authentication',
      description: 'SMS and app-based 2FA protection',
      icon: Smartphone,
      status: 'active',
      details: 'Additional security layer with OTP verification for sensitive operations like loan applications and payments.'
    },
    {
      title: 'Fraud Detection AI',
      description: 'Real-time fraud prevention using machine learning',
      icon: Shield,
      status: 'active',
      details: 'Our AI monitors transactions and behavior patterns to detect and prevent fraudulent activities in real-time.'
    },
    {
      title: 'Data Anonymization',
      description: 'Personal data is anonymized for analytics',
      icon: Database,
      status: 'active',
      details: 'Your personal information is anonymized before being used for analytics and model training to protect your privacy.'
    },
    {
      title: 'Secure API Gateway',
      description: 'Rate limiting and DDoS protection',
      icon: Globe,
      status: 'active',
      details: 'Our API infrastructure includes rate limiting, DDoS protection, and secure communication protocols.'
    }
  ];

  const complianceStandards = [
    {
      name: 'RBI Guidelines',
      description: 'Compliant with Reserve Bank of India lending norms',
      status: 'certified',
      icon: CheckCircle
    },
    {
      name: 'ISO 27001',
      description: 'Information security management certification',
      status: 'certified',
      icon: CheckCircle
    },
    {
      name: 'PCI DSS',
      description: 'Payment card industry data security standard',
      status: 'certified',
      icon: CheckCircle
    },
    {
      name: 'GDPR Ready',
      description: 'General Data Protection Regulation compliance',
      status: 'certified',
      icon: CheckCircle
    }
  ];

  const securityThreats = [
    {
      threat: 'Phishing Attacks',
      mitigation: 'Employee training, email filtering, and user education',
      riskLevel: 'medium',
      lastUpdated: '2024-01-15'
    },
    {
      threat: 'Data Breaches',
      mitigation: 'Encryption, access controls, and regular security audits',
      riskLevel: 'low',
      lastUpdated: '2024-01-10'
    },
    {
      threat: 'Social Engineering',
      mitigation: 'User awareness programs and verification protocols',
      riskLevel: 'medium',
      lastUpdated: '2024-01-20'
    },
    {
      threat: 'Mobile App Vulnerabilities',
      mitigation: 'Regular security testing and secure coding practices',
      riskLevel: 'low',
      lastUpdated: '2024-01-18'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Security Overview', icon: Shield },
    { id: 'features', name: 'Security Features', icon: Lock },
    { id: 'compliance', name: 'Compliance', icon: FileText },
    { id: 'threats', name: 'Threat Assessment', icon: AlertTriangle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Security Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your security and privacy are our top priorities. Learn about our comprehensive 
            security measures and compliance standards.
          </p>
        </div>

        {/* Security Status Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-900">All Systems Secure</h3>
              <p className="text-green-700">
                Last security audit: January 2024 | Next scheduled audit: March 2024
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Security Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Security Score</h3>
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">98/100</div>
                  <p className="text-sm text-gray-600">Excellent security posture</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Incidents</h3>
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
                  <p className="text-sm text-gray-600">Security incidents this month</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Uptime</h3>
                    <Wifi className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                  <p className="text-sm text-gray-600">System availability</p>
                </div>
              </div>

              {/* Quick Security Tips */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Security Best Practices</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">Use Strong Authentication</h4>
                        <p className="text-sm text-gray-600">Enable biometric login and 2FA for enhanced security</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">Keep App Updated</h4>
                        <p className="text-sm text-gray-600">Regular updates include important security patches</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">Verify Communications</h4>
                        <p className="text-sm text-gray-600">We never ask for passwords or OTPs via calls or SMS</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">Monitor Account Activity</h4>
                        <p className="text-sm text-gray-600">Check your account regularly for any unauthorized access</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          feature.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {feature.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      <p className="text-sm text-gray-500">{feature.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Compliance Tab */}
          {activeTab === 'compliance' && (
            <div className="space-y-8">
              
              {/* Compliance Standards */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Compliance Standards</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {complianceStandards.map((standard, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                      <standard.icon className="w-6 h-6 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{standard.name}</h4>
                        <p className="text-sm text-gray-600">{standard.description}</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Certified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Policy */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Data Privacy & Protection</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Data Collection</h4>
                      <p className="text-sm text-gray-600">We collect only necessary data for loan processing and improving our services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Data Usage</h4>
                      <p className="text-sm text-gray-600">Your data is used solely for loan underwriting, never sold to third parties</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Data Rights</h4>
                      <p className="text-sm text-gray-600">You have the right to access, modify, or delete your personal data at any time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Threats Tab */}
          {activeTab === 'threats' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Threat Assessment & Mitigation</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Threat Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Risk Level</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Mitigation Strategy</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {securityThreats.map((threat, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-900">{threat.threat}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              threat.riskLevel === 'low' 
                                ? 'bg-green-100 text-green-800'
                                : threat.riskLevel === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {threat.riskLevel.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{threat.mitigation}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">{threat.lastUpdated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Security Incident Reporting */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-900 mb-4">Report Security Incident</h3>
                <p className="text-red-800 mb-4">
                  If you notice any suspicious activity or security concerns, report them immediately.
                </p>
                <button className="btn-large btn-primary bg-red-600 hover:bg-red-700">
                  Report Incident
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
