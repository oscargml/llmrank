'use client';

import { useState } from 'react';
import LLMRank from './components/LLMRank';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function Home() {
  const [showTool, setShowTool] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const articles = [
    {
      title: 'How AI Models Choose Content: The Citation Game',
      excerpt: 'ChatGPT, Claude, and Gemini pick sources based on semantic clarity and trustworthiness, not keyword density. Learn what actually matters.',
      category: 'SEO Strategy',
      readTime: '5 min',
    },
    {
      title: 'Semantic Clarity: The New SEO Metric That Matters',
      excerpt: 'Traditional keyword rankings are dying. How to structure content so LLMs understand (and cite) your work automatically.',
      category: 'LLM Optimization',
      readTime: '7 min',
    },
    {
      title: 'Training Data Quality Score: Will Your Content Be Used for AI Training?',
      excerpt: 'Not all content is created equal for LLM training. The metrics that determine if your work becomes part of future AI models.',
      category: 'AI Training',
      readTime: '6 min',
    },
    {
      title: 'Semrush vs LLMRank: The Future of Content Strategy',
      excerpt: 'How to use traditional SEO tools and LLM-optimized tools together for maximum visibility in AI and search.',
      category: 'Tools',
      readTime: '8 min',
    },
  ];

  const faqs = [
    {
      q: 'Do I need API keys to use LLMRank?',
      a: 'Yes. LLMRank uses real APIs (Claude, PageSpeed, SerpAPI) to analyze your content. You can get free tier keys from each service. Instructions are shown in the app when you click "Analyze Your Website".',
    },
    {
      q: 'How is LLMRank different from Semrush AI SEO?',
      a: 'Semrush AI SEO helps write content optimized for Google. LLMRank analyzes how well your content ranks for ChatGPT, Claude, and other LLMs. Use both: Semrush for Google rankings + LLMRank for AI rankings.',
    },
    {
      q: 'What APIs do I need?',
      a: 'Anthropic Claude (required - for LLM analysis), Google PageSpeed (optional - for performance), SerpAPI (optional - for keyword tracking), Wappalyzer (optional - for tech detection). All have free tiers.',
    },
    {
      q: 'Can I use this without entering API keys?',
      a: 'The app will work but show estimated/default metrics instead of real analysis. To get accurate LLM scores, you need at least the Anthropic API key.',
    },
    {
      q: 'Is this a replacement for Semrush?',
      a: 'No. Use Semrush for Google SEO (keywords, rankings, backlinks). Use LLMRank for AI SEO (LLM citations, semantic clarity, training value). They complement each other.',
    },
    {
      q: 'Who should use LLMRank?',
      a: 'Content creators, SEO professionals, and businesses that want their content cited by AI models. As AI becomes the primary interface for search, this becomes essential.',
    },
  ];

  if (showTool) {
    return <LLMRank />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section - Compact */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full">
            <p className="text-cyan-300 text-sm font-semibold">The Future of SEO is Here</p>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Rank for AI,<br />Not Just Google
          </h1>

          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            ChatGPT, Claude, and Gemini are becoming the primary interface for information discovery. LLMRank shows how well your content ranks for AI models—and how to improve it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowTool(true)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
            >
              Analyze Your Website Free <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'})}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* The Problem - Why This Matters */}
      <section className="max-w-5xl mx-auto px-6 py-20" id="how-it-works">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-cyan-400 mb-2">60%</div>
            <p className="text-slate-300 text-sm">
              Of knowledge workers use AI daily for research and decision-making
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-cyan-400 mb-2">85%</div>
            <p className="text-slate-300 text-sm">
              Of AI responses cite the top 3 sources. Being cited = authority
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-cyan-400 mb-2">3x</div>
            <p className="text-slate-300 text-sm">
              Revenue increase for content cited by ChatGPT vs non-cited content
            </p>
          </div>
        </div>
      </section>

      {/* LLMRank vs Semrush - Key Differentiator */}
      <section className="max-w-5xl mx-auto px-6 py-20 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border border-slate-700 my-12">
        <h2 className="text-3xl font-bold mb-8 text-center">LLMRank + Semrush = Complete Content Strategy</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-300 mb-4">Semrush Optimizes For:</h3>
            <ul className="space-y-2 text-slate-400">
              <li>✓ Google keyword rankings</li>
              <li>✓ Backlink profiles</li>
              <li>✓ Keyword difficulty/volume</li>
              <li>✓ Competitor SERP positions</li>
              <li>✓ On-page SEO basics</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-cyan-400 mb-4">LLMRank Optimizes For:</h3>
            <ul className="space-y-2 text-cyan-300">
              <li>✓ LLM citation probability</li>
              <li>✓ Semantic clarity & structure</li>
              <li>✓ Training data quality</li>
              <li>✓ AI model understanding</li>
              <li>✓ RAG system compatibility</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-900/70 rounded-lg p-6 border border-slate-700 text-center">
          <p className="text-slate-300 font-semibold">
            <span className="text-cyan-400">Use Semrush</span> to rank on Google. <span className="text-cyan-400">Use LLMRank</span> to rank in AI. <br/>
            Do both and your content gets discovered everywhere.
          </p>
        </div>
      </section>

      {/* Articles/Blog Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Resources & Insights</h2>
          <p className="text-slate-400">Understand how AI ranking works and how to optimize your content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, idx) => (
            <article key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-slate-500">{article.readTime}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{article.title}</h3>
              <p className="text-slate-400 text-sm">{article.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Getting Started */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">How to Use LLMRank</h2>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex gap-4">
            <div className="text-2xl font-bold text-cyan-400 w-12 h-12 flex items-center justify-center bg-cyan-500/20 rounded">1</div>
            <div>
              <h3 className="font-bold mb-2">Enter Your Website URL</h3>
              <p className="text-slate-400 text-sm">Paste any URL to analyze. LLMRank will fetch the page content and analyze it.</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex gap-4">
            <div className="text-2xl font-bold text-cyan-400 w-12 h-12 flex items-center justify-center bg-cyan-500/20 rounded">2</div>
            <div>
              <h3 className="font-bold mb-2">Add Your API Keys (Optional)</h3>
              <p className="text-slate-400 text-sm">Get free API keys from Anthropic, Google, SerpAPI. Configure them in .env.local locally or in Vercel Environment Variables. Without keys, you will see estimated metrics.</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex gap-4">
            <div className="text-2xl font-bold text-cyan-400 w-12 h-12 flex items-center justify-center bg-cyan-500/20 rounded">3</div>
            <div>
              <h3 className="font-bold mb-2">Get Real LLM Scores</h3>
              <p className="text-slate-400 text-sm">See how AI models rate your content. Semantic clarity, citation worthiness, training value, and actionable recommendations.</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex gap-4">
            <div className="text-2xl font-bold text-cyan-400 w-12 h-12 flex items-center justify-center bg-cyan-500/20 rounded">4</div>
            <div>
              <h3 className="font-bold mb-2">Optimize & Republish</h3>
              <p className="text-slate-400 text-sm">Follow the ranking guide to improve scores. Better semantic clarity, more citations, stronger structure = higher AI rankings.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setShowTool(true)}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold rounded-lg text-lg transition-all hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Start Analyzing →
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">FAQ</h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {faq.q}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${expandedFAQ === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedFAQ === idx && (
                <div className="px-6 py-4 text-slate-300 border-t border-slate-800">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">LLMRank</h3>
              <p className="text-slate-400 text-sm">Optimize content for AI models and LLM ranking</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>LLMRank © 2026 | Optimizing for the AI era of search</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
