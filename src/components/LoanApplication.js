import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUser as User,
  FiPhone as Phone,
  FiMapPin as MapPin,
  FiDollarSign as DollarSign,
  FiUpload as Upload,
  FiMic as Mic,
  FiMicOff as MicOff,
  FiCamera as Camera,
  FiFileText as FileText,
  FiCheckCircle as CheckCircle,
  FiAlertCircle as AlertCircle,
  FiArrowRight as ArrowRight,
  FiArrowLeft as ArrowLeft,
  FiHome as Home,
  FiBriefcase as Briefcase,
  FiCalendar as Calendar,
  FiCreditCard as CreditCard,
  FiBuilding as Building,
  FiTarget as Target,
  FiClock as Clock
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';

// Helper to upload files
async function uploadFiles(files) {
  const formData = new FormData();
  Array.from(files).forEach(f => formData.append('files', f));
  const res = await fetch('http://localhost:4000/api/upload', {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Upload failed');
  return await res.json();
}

// Submit application helper
async function submitApplication(app) {
  const res = await fetch('http://localhost:4000/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(app)
  });
  if (!res.ok) throw new Error('Submit failed');
  return await res.json();
}

// Input field with icon component
const InputWithIcon = ({ icon: Icon, label, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        {...props}
        className={`input-large w-full pl-10 ${error ? 'border-red-500' : ''}`}
      />
    </div>
    {error && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// Select field with icon component
const SelectWithIcon = ({ icon: Icon, label, error, children, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <select
        {...props}
        className={`input-large w-full pl-10 ${error ? 'border-red-500' : ''}`}
      >
        {children}
      </select>
    </div>
    {error && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

// Textarea field with icon component
const TextareaWithIcon = ({ icon: Icon, label, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <textarea
        {...props}
        className={`input-large w-full pl-10 ${error ? 'border-red-500' : ''}`}
      />
    </div>
    {error && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

const LoanApplication = () => {
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: { name: '', phone: '', age: '', address: '', occupation: '', monthlyIncome: '' },
    loanDetails: { amount: '', purpose: '', tenure: '12' },
    documents: []
  });
  const [errors, setErrors] = useState({});
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [uploading, setUploading] = useState(false);

  const steps = [
    { number: 1, title: 'Personal Information', icon: User },
    { number: 2, title: 'Loan Details', icon: DollarSign },
    { number: 3, title: 'Documents', icon: FileText },
    { number: 4, title: 'AI Verification', icon: CheckCircle }
  ];

  const loanPurposes = [
    { id: 'agriculture', label: 'Agriculture & Farming', icon: '🌾' },
    { id: 'business', label: 'Small Business', icon: '🏪' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'medical', label: 'Medical Emergency', icon: '🏥' },
    { id: 'home', label: 'Home Improvement', icon: '🏠' },
    { id: 'livestock', label: 'Livestock Purchase', icon: '🐄' }
  ];

  const occupations = [
    { id: 'farmer', label: 'Farmer' },
    { id: 'shopkeeper', label: 'Shop Keeper' },
    { id: 'laborer', label: 'Daily Wage Laborer' },
    { id: 'artisan', label: 'Artisan/Craftsperson' },
    { id: 'driver', label: 'Driver' },
    { id: 'other', label: 'Other' }
  ];

  // Voice recording simulation
  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice input
      setTimeout(() => {
        setIsRecording(false);
        actions.addNotification({
          type: 'success',
          message: 'Voice input processed successfully!'
        });
      }, 3000);
    }
  };

  // File input ref handler
  const handleChooseFiles = async (evt) => {
    const files = evt.target.files;
    if (!files || files.length === 0) return;
    try {
      setUploading(true);
      const result = await uploadFiles(files);
      const uploaded = result.files || [];
      setFormData(prev => ({ ...prev, documents: [...prev.documents, ...uploaded] }));
    } catch (e) {
      console.error(e);
      alert('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
      evt.target.value = '';
    }
  };

  // Submit final application
  const handleSubmitApplication = async () => {
    try {
      const payload = { ...formData };
      await submitApplication(payload);
      actions.updateLoanApplication(payload);
      navigate('/ai-underwriting');
    } catch (e) {
      console.error(e);
      alert('Failed to submit application.');
    }
  };

  // Form validation
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.personalInfo.name) newErrors.name = 'Name is required';
      if (!formData.personalInfo.phone) newErrors.phone = 'Phone number is required';
      if (!formData.personalInfo.age) newErrors.age = 'Age is required';
      if (!formData.personalInfo.occupation) newErrors.occupation = 'Occupation is required';
    }
    
    if (step === 2) {
      if (!formData.loanDetails.amount) newErrors.amount = 'Loan amount is required';
      if (!formData.loanDetails.purpose) newErrors.purpose = 'Loan purpose is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        // Save application and proceed to AI underwriting
        actions.updateLoanApplication(formData);
        navigate('/ai-underwriting');
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Auto-save progress
  useEffect(() => {
    actions.updateLoanApplication({ ...formData, currentStep });
  }, [formData, currentStep]);

  const fileInputId = 'hidden-file-input';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-primary-600 border-primary-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-24 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div key={step.number} className="text-xs text-center" style={{width: '80px'}}>
                <span className={currentStep >= step.number ? 'text-primary-600 font-medium' : 'text-gray-500'}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Mode Toggle */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Voice Assistant</h3>
              <p className="text-sm text-gray-600">Fill the form using voice commands</p>
            </div>
            <button
              onClick={() => setIsVoiceMode(!isVoiceMode)}
              className={`btn-large ${isVoiceMode ? 'btn-primary' : 'btn-secondary'} flex items-center space-x-2`}
            >
              {isVoiceMode ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              <span>{isVoiceMode ? 'Voice On' : 'Voice Off'}</span>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              {isVoiceMode && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleVoiceRecording}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isRecording ? 'bg-red-500 text-white voice-recording' : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      <Mic className="w-6 h-6" />
                    </button>
                    <div>
                      <p className="font-medium text-blue-900">
                        {isRecording ? 'Listening...' : 'Tap to speak'}
                      </p>
                      <p className="text-sm text-blue-700">
                        Say: "My name is [your name], I am [age] years old"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.name}
                    onChange={(e) => updateFormData('personalInfo', 'name', e.target.value)}
                    className={`input-large w-full ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => updateFormData('personalInfo', 'phone', e.target.value)}
                    className={`input-large w-full ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="Enter 10-digit mobile number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={formData.personalInfo.age}
                    onChange={(e) => updateFormData('personalInfo', 'age', e.target.value)}
                    className={`input-large w-full ${errors.age ? 'border-red-500' : ''}`}
                    placeholder="Enter your age"
                    min="18"
                    max="75"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.age}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation *
                  </label>
                  <select
                    value={formData.personalInfo.occupation}
                    onChange={(e) => updateFormData('personalInfo', 'occupation', e.target.value)}
                    className={`input-large w-full ${errors.occupation ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select your occupation</option>
                    {occupations.map(occ => (
                      <option key={occ.id} value={occ.id}>{occ.label}</option>
                    ))}
                  </select>
                  {errors.occupation && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.occupation}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.personalInfo.address}
                    onChange={(e) => updateFormData('personalInfo', 'address', e.target.value)}
                    className="input-large w-full"
                    placeholder="Enter your complete address"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Income (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.personalInfo.monthlyIncome}
                    onChange={(e) => updateFormData('personalInfo', 'monthlyIncome', e.target.value)}
                    className="input-large w-full"
                    placeholder="Enter monthly income"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Loan Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.loanDetails.amount}
                    onChange={(e) => updateFormData('loanDetails', 'amount', e.target.value)}
                    className={`input-large w-full ${errors.amount ? 'border-red-500' : ''}`}
                    placeholder="Enter loan amount"
                    min="1000"
                    max="500000"
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.amount}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">Minimum: ₹1,000 | Maximum: ₹5,00,000</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure (Months)
                  </label>
                  <select
                    value={formData.loanDetails.tenure}
                    onChange={(e) => updateFormData('loanDetails', 'tenure', e.target.value)}
                    className="input-large w-full"
                  >
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                    <option value="18">18 Months</option>
                    <option value="24">24 Months</option>
                    <option value="36">36 Months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Purpose of Loan *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {loanPurposes.map(purpose => (
                    <button
                      key={purpose.id}
                      onClick={() => updateFormData('loanDetails', 'purpose', purpose.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.loanDetails.purpose === purpose.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{purpose.icon}</div>
                      <div className="font-medium text-gray-900">{purpose.label}</div>
                    </button>
                  ))}
                </div>
                {errors.purpose && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.purpose}
                  </p>
                )}
              </div>

              {/* Loan Preview */}
              {formData.loanDetails.amount && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Loan Preview</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Loan Amount:</span>
                      <span className="font-medium">₹{parseInt(formData.loanDetails.amount || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tenure:</span>
                      <span className="font-medium">{formData.loanDetails.tenure} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated EMI:</span>
                      <span className="font-medium text-primary-600">
                        ₹{Math.round((parseInt(formData.loanDetails.amount || 0) * 1.12) / parseInt(formData.loanDetails.tenure || 12)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Upload</h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
                  <p className="text-gray-600 mb-4">Upload photos of your Aadhaar Card, PAN Card, and Income Proof</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button type="button" className="btn-large btn-primary flex items-center space-x-2" onClick={() => document.getElementById(fileInputId)?.click()} disabled={uploading}>
                      <Upload className="w-5 h-5" />
                      <span>{uploading ? 'Uploading...' : 'Choose Files'}</span>
                    </button>
                    <input id={fileInputId} type="file" className="hidden" multiple onChange={handleChooseFiles} />
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="mt-6 grid md:grid-cols-3 gap-4 text-left">
                      {formData.documents.map((doc, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900 truncate max-w-[140px]" title={doc.originalName || doc.filename}>{doc.originalName || doc.filename}</span>
                            <a className="text-blue-600 text-xs hover:underline" href={`http://localhost:4000${doc.url}`} target="_blank" rel="noreferrer">View</a>
                          </div>
                          <p className="text-xs text-gray-500">{Math.round((doc.size || 0)/1024)} KB</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: AI Verification Preview */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Ready for AI Verification</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our AI will now analyze your application and provide an instant decision. 
                This process typically takes less than 2 minutes.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-medium text-gray-900 mb-4">Application Summary</h3>
                <div className="space-y-2 text-sm text-left">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium">{formData.personalInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-medium">₹{parseInt(formData.loanDetails.amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Purpose:</span>
                    <span className="font-medium">{
                      loanPurposes.find(p => p.id === formData.loanDetails.purpose)?.label || formData.loanDetails.purpose
                    }</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenure:</span>
                    <span className="font-medium">{formData.loanDetails.tenure} months</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn-large btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep === 4 ? (
            <button
              onClick={handleSubmitApplication}
              className="btn-large btn-primary flex items-center space-x-2"
            >
              <span>Submit Application</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-large btn-primary flex items-center space-x-2"
            >
              <span>{currentStep === 4 ? 'Submit Application' : 'Next'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
