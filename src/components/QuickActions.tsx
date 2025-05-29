
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickActions = () => {
  const actions = [
    {
      icon: Globe,
      title: 'Country Explorer',
      description: 'Browse countries and their climate commitments',
      color: 'from-emerald-500 to-emerald-600',
      action: 'Explore Countries',
      link: '/countries'
    },
    {
      icon: FileText,
      title: 'Research Questions',
      description: 'Analyze answers to key research questions across all countries',
      color: 'from-blue-500 to-blue-600',
      action: 'View Questions',
      link: '/questions'
    },
    {
      icon: Search,
      title: 'Document Search',
      description: 'Search through NDC documents and country responses',
      color: 'from-purple-500 to-purple-600',
      action: 'Start Searching',
      link: '/search'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Climate Data</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights from national climate commitments using our comprehensive analysis tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {actions.map((action, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">{action.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">{action.description}</p>
                <Link to={action.link}>
                  <Button className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 text-white`}>
                    {action.action}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
