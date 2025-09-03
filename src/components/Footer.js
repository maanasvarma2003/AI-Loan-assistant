import React from 'react';
import { FiMail as Mail, FiPhone as Phone, FiMapPin as MapPin, FiGithub as Github, FiTwitter as Twitter, FiLinkedin as Linkedin, FiShield as Shield } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">RuralLend</span>
            </div>
            <p className="text-sm text-gray-600">AI-powered loans for rural and semi-urban India with offline support and voice guidance.</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-blue-600" to="/">Home</Link></li>
              <li><Link className="hover:text-blue-600" to="/apply">Apply for Loan</Link></li>
              <li><Link className="hover:text-blue-600" to="/dashboard">Dashboard</Link></li>
              <li><Link className="hover:text-blue-600" to="/help">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2"><Mail className="w-4 h-4" /><span>support@rurallend.example</span></li>
              <li className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>+91 80 1234 5678</span></li>
              <li className="flex items-center space-x-2"><MapPin className="w-4 h-4" /><span>Bengaluru, India</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Follow</h4>
            <div className="flex items-center space-x-3 text-gray-600">
              <a className="hover:text-blue-600" href="#" aria-label="GitHub"><Github className="w-5 h-5" /></a>
              <a className="hover:text-blue-600" href="#" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
              <a className="hover:text-blue-600" href="#" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} RuralLend. All rights reserved.</p>
          <div className="space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
