
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Questions = () => {
  const { data: questions, isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: answerCounts } = useQuery({
    queryKey: ['answer-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions_answers')
        .select('question, country')
        .order('question');
      
      if (error) throw error;
      
      // Count answers per question
      const counts = data.reduce((acc, item) => {
        acc[item.question] = (acc[item.question] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
      
      return counts;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
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
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Questions</h1>
          <p className="text-lg text-gray-600">
            Explore {questions?.length} key questions about climate commitments answered across all countries
          </p>
        </div>

        <div className="space-y-4">
          {questions?.map((question) => (
            <Card key={question.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <HelpCircle className="w-5 h-5 text-emerald-600 mr-2" />
                      <span className="text-sm font-medium text-emerald-600">
                        Question {question.id}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-relaxed">
                      {question.question}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {answerCounts?.[question.id] || 0} countries have responses
                    </p>
                  </div>
                  <Link to={`/questions/${question.id}`}>
                    <Button variant="outline" className="ml-4">
                      View Answers
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
