import React from 'react';
import { 
  FiCreditCard as CreditCard,
  FiTrendingUp as TrendingUp,
  FiCalendar as Calendar,
  FiClock as Clock,
  FiCheckCircle as CheckCircle,
  FiAlertCircle as AlertCircle,
  FiDownload as Download,
  FiPhone as Phone,
  FiMessageCircle as MessageCircle,
  FiAward as Award,
  FiBarChart2 as BarChart3,
  FiDollarSign as DollarSign,
  FiUser as User,
  FiClock as History
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { state } = useApp();

  // Mock user data
  const userData = {
    name: state.user?.name || 'Maanas Varma',
    loanStatus: 'Active',
    loanAmount: 50000,
    emiAmount: 4583,
    nextEmiDate: '2024-02-15',
    remainingAmount: 32000,
    creditScore: 720,
    loanHistory: [
      { id: 1, amount: 25000, status: 'Completed', date: '2023-01-15', purpose: 'Agriculture' },
      { id: 2, amount: 50000, status: 'Active', date: '2023-08-10', purpose: 'Business' }
    ],
    transactions: [
      { id: 1, type: 'EMI Payment', amount: -4583, date: '2024-01-15', status: 'Success' },
      { id: 2, type: 'Loan Disbursement', amount: 50000, date: '2023-08-10', status: 'Success' },
      { id: 3, type: 'EMI Payment', amount: -4583, date: '2023-12-15', status: 'Success' }
    ]
  };

  const nextEmiDays = Math.ceil((new Date(userData.nextEmiDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <h1 className="text-3xl font-bold text-gray-900 heading-underline">Welcome back, {userData.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your loans and track your financial progress</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="card-elevated p-6 hover-lift animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Loan</p>
                <p className="text-2xl font-bold text-gray-900">₹{userData.loanAmount.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-green-600 text-sm font-medium">● Active</span>
            </div>
          </div>

          <div className="card-elevated p-6 hover-lift animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next EMI</p>
                <p className="text-2xl font-bold text-gray-900">₹{userData.emiAmount.toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className={`text-sm font-medium ${nextEmiDays <= 5 ? 'text-red-600' : 'text-gray-600'}`}>
                Due in {nextEmiDays} days
              </span>
            </div>
          </div>

          <div className="card-elevated p-6 hover-lift animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-gray-900">₹{userData.remainingAmount.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${((userData.loanAmount - userData.remainingAmount) / userData.loanAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6 hover-lift animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credit Score</p>
                <p className="text-2xl font-bold text-gray-900">{userData.creditScore}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-green-600 text-sm font-medium">Excellent</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Loan Overview */}
            <div className="card-elevated p-6 hover-lift animate-fade-up">
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Current Loan Overview</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-semibold">₹{userData.loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-semibold">11.5% per annum</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Monthly EMI</span>
                  <span className="font-semibold">₹{userData.emiAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Remaining Amount</span>
                  <span className="font-semibold">₹{userData.remainingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Loan Closure Date</span>
                  <span className="font-semibold">August 2024</span>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="btn-large btn-primary flex items-center space-x-2 hover-lift">
                  <CreditCard className="w-5 h-5" />
                  <span>Pay EMI</span>
                </button>
                <button className="btn-large btn-secondary flex items-center space-x-2 hover-lift">
                  <Download className="w-5 h-5" />
                  <span>Download Statement</span>
                </button>
              </div>
            </div>

            {/* Transaction History */}
            <div className="card-elevated p-6 hover-lift animate-fade-up">
              <div className="flex items-center space-x-2 mb-6">
                <History className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
              </div>
              <div className="space-y-4">
                {userData.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {transaction.amount > 0 ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">{transaction.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loan History */}
            <div className="card-elevated p-6 hover-lift animate-fade-up">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Loan History</h2>
              <div className="space-y-4">
                {userData.loanHistory.map((loan) => (
                  <div key={loan.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">₹{loan.amount.toLocaleString()}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        loan.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {loan.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Purpose: {loan.purpose}</span>
                      <span>Date: {new Date(loan.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card-elevated p-6 hover-lift animate-fade-up">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-large btn-primary flex items-center justify-center space-x-2 hover-lift">
                  <CreditCard className="w-5 h-5" />
                  <span>Apply for New Loan</span>
                </button>
                <button className="w-full btn-large btn-secondary flex items-center justify-center space-x-2 hover-lift">
                  <Phone className="w-5 h-5" />
                  <span>Contact Support</span>
                </button>
                <button className="w-full btn-large btn-secondary flex items-center justify-center space-x-2 hover-lift">
                  <Download className="w-5 h-5" />
                  <span>Download Reports</span>
                </button>
              </div>
            </div>

            {/* EMI Reminder */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6 animate-fade-up">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-bold text-orange-900">EMI Reminder</h3>
              </div>
              <p className="text-orange-800 mb-4">
                Your next EMI of ₹{userData.emiAmount.toLocaleString()} is due on {new Date(userData.nextEmiDate).toLocaleDateString()}
              </p>
              <button className="btn-large btn-primary w-full hover-lift">
                Set Up Auto-Pay
              </button>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 animate-fade-up">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Financial Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Pay EMIs on time to improve credit score</li>
                <li>• Consider prepayment to reduce interest</li>
                <li>• Keep documents updated for faster approvals</li>
                <li>• Monitor your credit score regularly</li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="card-elevated p-6 hover-lift animate-fade-up">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>Call: +91 6362847181</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                  <span>WhatsApp: +91 6362847181</span>
                </div>
                <button className="w-full btn-large btn-secondary mt-4 hover-lift">
                  Chat with AI Assistant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
