
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe, FileText, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Countries = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: countries, isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: documentsCount } = useQuery({
    queryKey: ['documents-count-by-country'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('country')
        .not('country', 'is', null);
      
      if (error) throw error;
      
      // Count documents per country
      const countsByCountry = data.reduce((acc: Record<string, number>, doc) => {
        if (doc.country) {
          acc[doc.country] = (acc[doc.country] || 0) + 1;
        }
        return acc;
      }, {});
      
      return countsByCountry;
    }
  });

  const { data: answersCount } = useQuery({
    queryKey: ['answers-count-by-country'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions_answers')
        .select('country');
      
      if (error) throw error;
      
      // Count answers per country
      const countsByCountry = data.reduce((acc: Record<string, number>, answer) => {
        acc[answer.country] = (acc[answer.country] || 0) + 1;
        return acc;
      }, {});
      
      return countsByCountry;
    }
  });

  const filteredCountries = countries?.filter(country =>
    country.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Error loading countries</h2>
              <p className="text-gray-600">Please try refreshing the page</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-6 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-80 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Countries</h1>
          <p className="text-lg text-gray-600 mb-6">
            Browse {countries?.length || 0} countries with climate commitments and policy documents
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredCountries && filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCountries.map((country) => {
              const docCount = documentsCount?.[country.id] || 0;
              const answerCount = answersCount?.[country.id] || 0;
              
              return (
                <Card key={country.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{country.id}</h3>
                      <Globe className="w-4 h-4 text-emerald-600" />
                    </div>
                    
                    <div className="space-y-1 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        <span>{docCount} document{docCount !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center">
                        <Search className="w-3 h-3 mr-1" />
                        <span>{answerCount} response{answerCount !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    
                    <Link to={`/countries/${country.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No countries found</h3>
            <p className="text-gray-500">
              {searchTerm ? `No countries match "${searchTerm}"` : 'No countries available'}
            </p>
            {searchTerm && (
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="mt-4"
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Countries;
