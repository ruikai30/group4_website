
import React from 'react';
import { Globe } from 'lucide-react';
import { Navigation } from './Navigation';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Climate NDC Explorer</h1>
              <p className="text-sm text-gray-600">National Climate Commitments</p>
            </div>
          </Link>
          
          <Navigation />
        </div>
      </div>
    </header>
  );
};
