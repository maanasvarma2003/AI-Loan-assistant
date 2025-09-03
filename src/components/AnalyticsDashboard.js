import React, { useState } from 'react';
import { 
  FiTrendingUp as TrendingUp,
  FiUsers as Users,
  FiDollarSign as DollarSign,
  FiClock as Clock,
  FiTarget as Target,
  FiCheckCircle as CheckCircle,
  FiAlertCircle as AlertCircle,
  FiArrowUp as ArrowUp,
  FiArrowDown as ArrowDown,
  FiCalendar as Calendar,
  FiDownload as Download,
  FiFilter as Filter
} from 'react-icons/fi';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  // KPIs and Success Metrics Data
  const kpis = [
    { title: 'Loan Approval Rate', value: '78%', change: '+12%', trend: 'up', target: '75%', description: 'Percentage of loan applications approved using AI underwriting', icon: CheckCircle, color: 'text-green-600' },
    { title: 'Average Processing Time', value: '3.2 min', change: '-45%', trend: 'down', target: '5 min', description: 'Time from application submission to decision', icon: Clock, color: 'text-blue-600' },
    { title: 'User Acquisition', value: '2,847', change: '+34%', trend: 'up', target: '2,500', description: 'New users acquired this month', icon: Users, color: 'text-purple-600' },
    { title: 'Loan Disbursement', value: '₹1.2Cr', change: '+28%', trend: 'up', target: '₹1Cr', description: 'Total loan amount disbursed this month', icon: DollarSign, color: 'text-orange-600' },
    { title: 'Digital Literacy Score', value: '7.8/10', change: '+0.5', trend: 'up', target: '8.0', description: 'Average user comfort with digital processes', icon: Target, color: 'text-indigo-600' },
    { title: 'App Performance Score', value: '92/100', change: '+3', trend: 'up', target: '90', description: 'Performance on low-spec devices', icon: TrendingUp, color: 'text-green-600' }
  ];

  // Chart-like data
  const loanVolumeData = [
    { month: 'Aug', loans: 245 }, { month: 'Sep', loans: 312 }, { month: 'Oct', loans: 428 }, { month: 'Nov', loans: 567 }, { month: 'Dec', loans: 634 }, { month: 'Jan', loans: 789 }
  ];

  const approvalRateData = [
    { day: 'Mon', rate: 76 }, { day: 'Tue', rate: 78 }, { day: 'Wed', rate: 82 }, { day: 'Thu', rate: 79 }, { day: 'Fri', rate: 81 }, { day: 'Sat', rate: 77 }, { day: 'Sun', rate: 75 }
  ];

  const userDemographicsData = [
    { name: 'Farmers', value: 45, count: 1203 },
    { name: 'Small Business', value: 28, count: 748 },
    { name: 'Daily Wage Workers', value: 15, count: 401 },
    { name: 'Artisans', value: 8, count: 214 },
    { name: 'Others', value: 4, count: 107 }
  ];

  const languageUsageData = [
    { language: 'Hindi', percentage: 35 }, { language: 'Bengali', percentage: 18 }, { language: 'Tamil', percentage: 12 }, { language: 'Telugu', percentage: 10 }, { language: 'Marathi', percentage: 8 }, { language: 'Others', percentage: 17 }
  ];

  const aiPerformanceMetrics = [
    { metric: 'Credit Scoring Accuracy', value: '94.2%', benchmark: '92%', status: 'above' },
    { metric: 'False Positive Rate', value: '3.1%', benchmark: '5%', status: 'below' },
    { metric: 'Model Inference Time', value: '0.8s', benchmark: '1.5s', status: 'below' },
    { metric: 'Alternative Data Coverage', value: '87%', benchmark: '80%', status: 'above' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'loans', name: 'Loan Analytics' },
    { id: 'users', name: 'User Insights' },
    { id: 'ai-performance', name: 'AI Performance' },
    { id: 'regional', name: 'Regional Data' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track KPIs, success metrics, and performance indicators</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="btn-large btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpis.map((kpi, index) => (
                <div key={index} className="card-elevated p-6 hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                    <span className={`flex items-center text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                      {kpi.change}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{kpi.value}</div>
                  <p className="text-xs text-gray-500 mb-3">{kpi.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Target: {kpi.target}</span>
                    <span className={`font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.trend === 'up' ? 'Above target' : 'Below target'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row (custom visuals) */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Loan Volume Chart (bars) */}
              <div className="card-elevated p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Loan Volume Trend</h3>
                <div className="space-y-3">
                  {loanVolumeData.map((d) => (
                    <div key={d.month} className="flex items-center space-x-3">
                      <div className="w-12 text-sm text-gray-600">{d.month}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(d.loans / 800) * 100}%` }}></div>
                      </div>
                      <div className="w-12 text-right text-sm text-gray-600">{d.loans}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Approval Rate (line-like via bars) */}
              <div className="card-elevated p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Daily Approval Rate</h3>
                <div className="grid grid-cols-7 gap-2 items-end h-40">
                  {approvalRateData.map((d) => (
                    <div key={d.day} className="flex flex-col items-center justify-end">
                      <div className="w-6 bg-green-500 rounded-t" style={{ height: `${d.rate * 1.5}px` }}></div>
                      <div className="text-xs text-gray-600 mt-2">{d.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'loans' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Loan Purpose Breakdown (legend list) */}
              <div className="card-elevated p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Loan Purpose Distribution</h3>
                <div className="space-y-3">
                  {userDemographicsData.map((entry) => (
                    <div key={entry.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{entry.name}</span>
                      <span className="text-sm text-gray-600">{entry.value}% ({entry.count})</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Loan Amount Distribution */}
              <div className="card-elevated p-6 lg:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Loan Amount Distribution</h3>
                <div className="space-y-4">
                  {[
                    { range: '₹1,000 - ₹25,000', percentage: 45, count: 1204 },
                    { range: '₹25,001 - ₹50,000', percentage: 28, count: 748 },
                    { range: '₹50,001 - ₹1,00,000', percentage: 18, count: 481 },
                    { range: '₹1,00,001 - ₹2,00,000', percentage: 7, count: 187 },
                    { range: '₹2,00,001+', percentage: 2, count: 53 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{item.range}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{item.percentage}%</span>
                        <span className="text-sm text-gray-500 w-16">({item.count})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Language Usage */}
              <div className="card-elevated p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Language Preferences</h3>
                <div className="space-y-4">
                  {languageUsageData.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{lang.language}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${lang.percentage}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{lang.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Engagement */}
              <div className="card-elevated p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">User Engagement</h3>
                <div className="space-y-4">
                  <div className="flex justify-between"><span className="text-gray-600">Daily Active Users</span><span className="font-semibold">1,847</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Average Session Duration</span><span className="font-semibold">8.5 min</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Voice Feature Usage</span><span className="font-semibold">67%</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Offline App Usage</span><span className="font-semibold">23%</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Help Center Visits</span><span className="font-semibold">12%</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-performance' && (
          <div className="space-y-8">
            <div className="card-elevated p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">AI Model Performance</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {aiPerformanceMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold mb-2 ${metric.status === 'above' ? 'text-green-600' : 'text-blue-600'}`}>{metric.value}</div>
                    <div className="text-sm text-gray-600 mb-1">{metric.metric}</div>
                    <div className="text-xs text-gray-500">Benchmark: {metric.benchmark}</div>
                    <div className={`text-xs font-medium mt-1 ${metric.status === 'above' ? 'text-green-600' : 'text-blue-600'}`}>
                      {metric.status === 'above' ? '↑ Above' : '↓ Below'} Benchmark
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-elevated p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">AI Decision Analysis</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
                  <div className="text-sm text-green-800">Approved</div>
                  <div className="text-xs text-green-600 mt-1">2,086 applications</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">18%</div>
                  <div className="text-sm text-red-800">Rejected</div>
                  <div className="text-xs text-red-600 mt-1">481 applications</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">4%</div>
                  <div className="text-sm text-yellow-800">Manual Review</div>
                  <div className="text-xs text-yellow-600 mt-1">107 applications</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'regional' && (
          <div className="space-y-8">
            <div className="card-elevated p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">State-wise Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">State</th>
                      <th className="text-left py-3 px-4">Applications</th>
                      <th className="text-left py-3 px-4">Approval Rate</th>
                      <th className="text-left py-3 px-4">Avg Loan Amount</th>
                      <th className="text-left py-3 px-4">Top Language</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { state: 'Uttar Pradesh', applications: 456, approval: '76%', amount: '₹34,500', language: 'Hindi' },
                      { state: 'West Bengal', applications: 298, approval: '82%', amount: '₹28,900', language: 'Bengali' },
                      { state: 'Tamil Nadu', applications: 267, approval: '79%', amount: '₹41,200', language: 'Tamil' },
                      { state: 'Andhra Pradesh', applications: 234, approval: '75%', amount: '₹36,800', language: 'Telugu' },
                      { state: 'Maharashtra', applications: 189, approval: '81%', amount: '₹45,600', language: 'Marathi' }
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">{row.state}</td>
                        <td className="py-3 px-4">{row.applications}</td>
                        <td className="py-3 px-4">{row.approval}</td>
                        <td className="py-3 px-4">{row.amount}</td>
                        <td className="py-3 px-4">{row.language}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
