
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import Countries from "./pages/Countries";
import CountryDetail from "./pages/CountryDetail";
import Questions from "./pages/Questions";
import QuestionDetail from "./pages/QuestionDetail";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50">
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:countryId" element={<CountryDetail />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/questions/:questionId" element={<QuestionDetail />} />
            <Route path="/search" element={<Search />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
