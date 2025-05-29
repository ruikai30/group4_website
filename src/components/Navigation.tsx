
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, HelpCircle, Search, BarChart3, Home } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="hidden md:flex items-center space-x-4">
      <Link to="/">
        <Button 
          variant={isActive('/') && location.pathname === '/' ? "default" : "ghost"} 
          className="text-gray-700 hover:text-emerald-600"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
      </Link>
      <Link to="/countries">
        <Button 
          variant={isActive('/countries') ? "default" : "ghost"} 
          className="text-gray-700 hover:text-emerald-600"
        >
          <Globe className="w-4 h-4 mr-2" />
          Countries
        </Button>
      </Link>
      <Link to="/questions">
        <Button 
          variant={isActive('/questions') ? "default" : "ghost"} 
          className="text-gray-700 hover:text-emerald-600"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Questions
        </Button>
      </Link>
      <Link to="/search">
        <Button 
          variant={isActive('/search') ? "default" : "ghost"} 
          className="text-gray-700 hover:text-emerald-600"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </Link>
    </nav>
  );
};
