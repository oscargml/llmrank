'use client';

import { useState } from 'react';
import LLMRank from './components/LLMRank';
import { ChevronDown, Search, BarChart3, Zap, Brain, Globe } from 'lucide-react';

export default function Home() {
  const [showTool, setShowTool] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      q: "What's the difference between LLMRank and Semrush?",
      a: "Semrush focuses on traditional SEO metrics (keywords, backlinks, SERP positions). LLMRank is specialized for LLM-era SEO—measuring how well your content ranks for AI models, ChatGPT, Claude, and RAG systems. While Semrush optimizes for Google search, LLMRank optimizes for the future of search where AI reads and cites your content.",
    },
    {
      q: "How does LLMRank differ from AnswerThePublic?",
      a: "AnswerThePublic shows questions people search for. LLMRank analyzes whether your content would be selected by LLMs when answering those questions. We measure semantic clarity, citation worthiness, and training value—metrics that matter for AI model ranking.",
    },
    {
      q: "Can I use LLMRank with Semrush and AnswerThePublic together?",
      a: "Yes! Use AnswerThePublic to find high-intent keywords, Semrush to track Google rankings, and LLMRank to optimize your content for AI. This three-part approach ensures your content ranks for both traditional search and AI-powered systems.",
    },
    {
      q: "What's 'semantic clarity' and why does it matter?",
      a: "Semantic clarity measures how well an LLM can understand your content's meaning without relying on keywords. Well-structured topics, clear entity relationships, and logical flow all boost semantic clarity. This is more important for LLM ranking than keyword density.",
    },
    {
      q: "How does LLMRank calculate the training value score?",
      a: "Training value assesses whether your content is suitable for fine-tuning LLMs. We evaluate citation quality, factual accuracy, structured data, and information density. High-quality, well-sourced content scores higher.",
    },
    {
      q: "Will LLMRank replace traditional SEO tools?",
      a: "No—LLMRank complements traditional SEO. As AI becomes the primary interface for information discovery, you'll need both Google rankings AND LLM rankings. Forward-thinking SEO strategies now include both tools.",
    },
  ];

  const features = [
    {
      icon: Brain,
      title: 'LLM-Specific Metrics',
      description: 'Measures how AI models perceive your content—semantic clarity, citation worthiness, and training value.',
    },
    {
      icon: BarChart3,
      title: 'Competitor Analysis',
      description: 'Compare your LLM rankings against competitors and discover the gaps you need to close.',
    },
    {
      icon: Zap,
      title: 'Real-Time Scoring',
      description: 'Instant analysis powered by Claude API. Get actionable insights for immediate improvements.',
    },
    {
      icon: Globe,
      title: 'Multi-API Integration',
      description: 'Combines Wappalyzer, PageSpeed, SerpAPI, and Claude for comprehensive analysis.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Rank for the AI Era
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            LLMRank analyzes how ChatGPT, Claude, and other AI models perceive your content. Optimize for LLM ranking, RAG systems, and semantic search—not just Google.
          </p>
          <button
            onClick={() => setShowTool(true)}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold rounded-lg text-lg transition-all hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Analyze Your Website Free
          </button>
        </div>
      </section>

      {/* Features Grid */}
      {!showTool && (
        <>
          <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold mb-12 text-center">Why LLMRank?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-8 hover:border-cyan-500/50 transition-all">
                    <Icon className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-slate-300">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* The AI Search Trend */}
          <section className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30 my-12">
            <h2 className="text-3xl font-bold mb-6">The Shift to AI-Powered Search</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">85%</div>
                <p className="text-slate-300">Of companies now use AI for customer-facing decisions</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">60%</div>
                <p className="text-slate-300">Of users expect AI to be integrated into search by 2025</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">2X</div>
                <p className="text-slate-300">Revenue increase for content cited by LLMs</p>
              </div>
            </div>
          </section>

          {/* LLMRank vs Semrush vs AnswerThePublic */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold mb-12 text-center">LLMRank vs Traditional SEO Tools</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-6 py-4 text-left font-semibold text-cyan-400">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">LLMRank</th>
                    <th className="px-6 py-4 text-center font-semibold">Semrush</th>
                    <th className="px-6 py-4 text-center font-semibold">AnswerThePublic</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700">
                    <td className="px-6 py-4 font-medium">LLM Citation Score</td>
                    <td className="px-6 py-4 text-center text-green-400">✓</td>
                    <td className="px-6 py-4 text-center text-slate-400">✗</td>
                    <td className="px-6 py-4 text-center text-slate-400">✗</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-6 py-4 font-medium">Google Rankings</td>
                    <td className="px-6 py-4 text-center text-green-400">✓</td>
                    <td className="px-6 py-4 text-center text-green-400">✓</td>
                    <td className="px-6 py-4 text-center text-slate-400">✗</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-6 py-4 font-medium">Semantic Clarity Analysis</td>
                    <td className="px-6 py-4 text-center text-green-400">✓</td>
                    <td className="px-6 py-4 text-center text-slate-400">✗</td>
                    <td className="px-6 py-4 text-center text-slate-400">✗</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-6 py-4 font-medium">Question Discovery</td>
                    <td className="px-6 py-4 text-center text-slate-400">✗</td>
                    <td className="px-6 py-4 text-center text-green-400">✓</td>
                    <td className="px-6 py-4 text-center text-green-400">✓</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="px-6 py-4 font-medium">Training Data Quality</td>
                    <td className="px-6 py-4 text-center text-green-400">✓</td>
                    <td className="px-6 py-4 text-center text-slate-400">✗</td>
                    <td className="px-6 py-4 text-center text-slate-400">✗</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Backlink Analysis</td>
                    <td className="px-6 py-4 text-center text-slate-400">✗</td>
                    <td className="px-6 py-4 text-center text-green-400">✓</td>
                    <td className="px-6 py-4 text-center text-slate-400">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How to Use LLMRank with Other Tools */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold mb-12">The Winning SEO Strategy: Combining All Tools</h2>
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">Step 1: Find High-Intent Questions (AnswerThePublic)</h3>
                <p className="text-slate-300 mb-4">
                  Use AnswerThePublic to discover what people actually ask about your topic. Questions like "What is LLMRank?" or "How do I optimize for AI search?" reveal true user intent.
                </p>
                <p className="text-sm text-slate-400">Why: Real questions = real search volume + real traffic</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">Step 2: Create Answer-Focused Content</h3>
                <p className="text-slate-300 mb-4">
                  Write articles that thoroughly answer those questions. Include semantic markers: clear structure, entity linking, citations, and logical flow. This is where LLMRank comes in.
                </p>
                <p className="text-sm text-slate-400">Why: LLMs select content that comprehensively answers questions</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">Step 3: Verify LLM Compatibility (LLMRank)</h3>
                <p className="text-slate-300 mb-4">
                  Analyze your content with LLMRank to ensure it scores well on semantic clarity, citation worthiness, and training value. Make adjustments before publishing.
                </p>
                <p className="text-sm text-slate-400">Why: Pre-validation prevents publishing content that LLMs won't cite</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">Step 4: Track Google Rankings & Distribution (Semrush)</h3>
                <p className="text-slate-300 mb-4">
                  Monitor SERP positions, backlinks, and competitive visibility. Semrush tracks the "old SEO" signals that still matter for Google.
                </p>
                <p className="text-sm text-slate-400">Why: Google + AI signals together = maximum reach</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
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

          {/* CTA */}
          <section className="max-w-3xl mx-auto px-6 py-20 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Optimize for the AI Era?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Analyze your website for LLM ranking today. It takes less than a minute.
            </p>
            <button
              onClick={() => setShowTool(true)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold rounded-lg text-lg transition-all hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Start Free Analysis
            </button>
          </section>
        </>
      )}

      {/* Tool Section */}
      {showTool && <LLMRank />}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>LLMRank © 2026 | Optimizing content for the future of search</p>
        </div>
      </footer>
    </div>
  );
}
