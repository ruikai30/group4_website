
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, FileText, MessageSquare, Globe, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  // Search documents
  const { data: documents, isLoading: documentsLoading, error: documentsError } = useQuery({
    queryKey: ['search-documents', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .or(`title.ilike.%${searchQuery}%,extracted_text.ilike.%${searchQuery}%`)
        .limit(20);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!searchQuery.trim()
  });

  // Search answers
  const { data: answers, isLoading: answersLoading, error: answersError } = useQuery({
    queryKey: ['search-answers', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      const { data, error } = await supabase
        .from('questions_answers')
        .select(`
          *,
          questions:question (
            id,
            question
          )
        `)
        .or(`summary.ilike.%${searchQuery}%,detailed_response.ilike.%${searchQuery}%`)
        .limit(20);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!searchQuery.trim()
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  const totalResults = (documents?.length || 0) + (answers?.length || 0);
  const isLoading = documentsLoading || answersLoading;
  const hasError = documentsError || answersError;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search</h1>
          <p className="text-lg text-gray-600 mb-6">
            Search through climate documents and research responses
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="flex">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search documents, policies, or research responses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 border-emerald-200 focus:border-emerald-500"
                />
              </div>
              <Button 
                type="submit"
                className="ml-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Error State */}
        {hasError && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Search Error</h2>
              <p className="text-gray-600">There was an error performing your search. Please try again.</p>
            </div>
          </div>
        )}

        {/* Results */}
        {searchQuery.trim() && !hasError && (
          <>
            {/* Results Summary */}
            <div className="mb-6">
              {isLoading ? (
                <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              ) : (
                <p className="text-gray-600">
                  {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              )}
            </div>

            {/* Results Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All Results {!isLoading && `(${totalResults})`}
                </TabsTrigger>
                <TabsTrigger value="documents">
                  Documents {!isLoading && `(${documents?.length || 0})`}
                </TabsTrigger>
                <TabsTrigger value="answers">
                  Research {!isLoading && `(${answers?.length || 0})`}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : totalResults > 0 ? (
                  <div className="space-y-4">
                    {/* Documents */}
                    {documents?.map((doc) => (
                      <Card key={`doc-${doc.doc_id}`} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <FileText className="w-4 h-4 text-blue-600 mr-2" />
                                <Badge variant="secondary">Document</Badge>
                                {doc.country && (
                                  <Link to={`/countries/${doc.country}`}>
                                    <Badge variant="outline" className="ml-2 hover:bg-emerald-50">
                                      <Globe className="w-3 h-3 mr-1" />
                                      {doc.country}
                                    </Badge>
                                  </Link>
                                )}
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {doc.title || `Document ${doc.doc_id.slice(0, 8)}`}
                              </h3>
                              {doc.extracted_text && (
                                <p className="text-gray-600 text-sm line-clamp-3">
                                  {doc.extracted_text.slice(0, 300)}...
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Answers */}
                    {answers?.map((answer) => (
                      <Card key={`answer-${answer.id}`} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <MessageSquare className="w-4 h-4 text-emerald-600 mr-2" />
                                <Badge variant="secondary">Research</Badge>
                                <Link to={`/countries/${answer.country}`}>
                                  <Badge variant="outline" className="ml-2 hover:bg-emerald-50">
                                    <Globe className="w-3 h-3 mr-1" />
                                    {answer.country}
                                  </Badge>
                                </Link>
                              </div>
                              <Link 
                                to={`/questions/${answer.question}`}
                                className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors block mb-2"
                              >
                                {answer.questions?.question}
                              </Link>
                              {answer.summary && (
                                <p className="text-gray-600 text-sm line-clamp-3">
                                  {answer.summary}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-500">
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                {/* Same pattern as above but only documents */}
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
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
                              <div className="flex items-center mb-2">
                                {doc.country && (
                                  <Link to={`/countries/${doc.country}`}>
                                    <Badge variant="outline" className="hover:bg-emerald-50">
                                      <Globe className="w-3 h-3 mr-1" />
                                      {doc.country}
                                    </Badge>
                                  </Link>
                                )}
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {doc.title || `Document ${doc.doc_id.slice(0, 8)}`}
                              </h3>
                              {doc.extracted_text && (
                                <p className="text-gray-600 text-sm line-clamp-4">
                                  {doc.extracted_text.slice(0, 400)}...
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
                    <p className="text-gray-500">No documents match your search terms</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="answers" className="mt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : answers && answers.length > 0 ? (
                  <div className="space-y-4">
                    {answers.map((answer) => (
                      <Card key={answer.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <Link to={`/countries/${answer.country}`}>
                                  <Badge variant="outline" className="hover:bg-emerald-50">
                                    <Globe className="w-3 h-3 mr-1" />
                                    {answer.country}
                                  </Badge>
                                </Link>
                              </div>
                              <Link 
                                to={`/questions/${answer.question}`}
                                className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors block mb-2"
                              >
                                {answer.questions?.question}
                              </Link>
                              {answer.summary && (
                                <p className="text-gray-600 text-sm line-clamp-4">
                                  {answer.summary}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No research responses found</h3>
                    <p className="text-gray-500">No research responses match your search terms</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Empty State - No Search */}
        {!searchQuery.trim() && !hasError && (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-500">
              Enter keywords to search through climate documents and research responses
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
