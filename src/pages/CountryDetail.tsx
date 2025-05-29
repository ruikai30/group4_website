
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, MessageSquare, Search, Calendar, ExternalLink, AlertCircle } from 'lucide-react';

const CountryDetail = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch country documents
  const { data: documents, isLoading: documentsLoading, error: documentsError } = useQuery({
    queryKey: ['country-documents', countryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('country', countryId)
        .order('submission_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!countryId
  });

  // Fetch country answers
  const { data: answers, isLoading: answersLoading, error: answersError } = useQuery({
    queryKey: ['country-answers', countryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions_answers')
        .select(`
          *,
          questions:question (
            id,
            question
          )
        `)
        .eq('country', countryId)
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!countryId
  });

  const filteredAnswers = answers?.filter(answer =>
    answer.questions?.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    answer.summary?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (documentsError || answersError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Error loading country data</h2>
              <p className="text-gray-600">Please try refreshing the page</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link to="/countries" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Countries
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{countryId}</h1>
          <p className="text-lg text-gray-600">
            Climate commitments, policy documents, and research insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{documents?.length || 0}</p>
                  <p className="text-sm text-gray-600">Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <MessageSquare className="w-8 h-8 text-emerald-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{answers?.length || 0}</p>
                  <p className="text-sm text-gray-600">Research Responses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents?.filter(d => d.submission_date).length || 0}
                  </p>
                  <p className="text-sm text-gray-600">Dated Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="documents">Policy Documents</TabsTrigger>
            <TabsTrigger value="answers">Research Q&A</TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="mt-6">
            {documentsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : documents && documents.length > 0 ? (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <Card key={doc.doc_id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {doc.title || `Document ${doc.doc_id.slice(0, 8)}`}
                          </h3>
                          {doc.submission_date && (
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(doc.submission_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        {doc.url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View
                            </a>
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {doc.language && (
                          <Badge variant="secondary">{doc.language}</Badge>
                        )}
                        {doc.file_size && (
                          <Badge variant="outline">
                            {(doc.file_size / 1024 / 1024).toFixed(1)} MB
                          </Badge>
                        )}
                        {doc.processed_at && (
                          <Badge variant="outline">Processed</Badge>
                        )}
                      </div>
                      
                      {doc.extracted_text && (
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {doc.extracted_text.slice(0, 200)}...
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-500">No policy documents available for {countryId}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="answers" className="mt-6">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search research questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {answersLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredAnswers && filteredAnswers.length > 0 ? (
              <div className="space-y-4">
                {filteredAnswers.map((answer) => (
                  <Card key={answer.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Link 
                          to={`/questions/${answer.question}`}
                          className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
                        >
                          {answer.questions?.question}
                        </Link>
                        {answer.timestamp && (
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(answer.timestamp).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      
                      {answer.summary && (
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                          <p className="text-gray-700 text-sm">{answer.summary}</p>
                        </div>
                      )}
                      
                      {answer.detailed_response && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Detailed Response</h4>
                          <p className="text-gray-600 text-sm line-clamp-4">
                            {answer.detailed_response}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No research responses found</h3>
                <p className="text-gray-500">
                  {searchTerm ? `No responses match "${searchTerm}"` : `No research responses available for ${countryId}`}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CountryDetail;
