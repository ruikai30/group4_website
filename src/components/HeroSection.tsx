
import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Explore Global
          <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            {" "}Climate Commitments
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover and analyze National Determined Contributions (NDCs) from 150+ countries. 
          Search through climate policies, compare commitments, and track progress toward Paris Agreement goals.
        </p>

        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search countries, policies, or climate commitments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 pr-4 py-4 text-lg border-2 border-emerald-200 focus:border-emerald-500 rounded-l-xl"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-r-xl"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/countries">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Explore Countries
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/questions">
            <Button size="lg" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              View Research Questions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
