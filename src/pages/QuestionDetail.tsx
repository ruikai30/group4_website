
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuestionDetail = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: question } = useQuery({
    queryKey: ['question', questionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('id', Number(questionId))
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!questionId
  });

  const { data: answers, isLoading } = useQuery({
    queryKey: ['question-answers', questionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions_answers')
        .select('*')
        .eq('question', Number(questionId))
        .order('country');
      
      if (error) throw error;
      return data;
    },
    enabled: !!questionId
  });

  const filteredAnswers = answers?.filter(answer =>
    answer.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    answer.summary?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <Link to="/questions">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Questions
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Question {question?.id}
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {question?.question}
          </p>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {answers?.length} countries have responded to this question
            </p>
            
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search countries or responses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnswers?.map((answer) => (
            <Card key={answer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-emerald-600" />
                    {answer.country}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {answer.summary && (
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                    {answer.summary}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <Link to={`/countries/${answer.country}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  
                  {answer.timestamp && (
                    <span className="text-xs text-gray-500">
                      {new Date(answer.timestamp).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAnswers?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? `No responses found matching "${searchTerm}"` : 'No responses available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetail;
