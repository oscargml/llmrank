'use client';

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import { Zap, Code, Lightbulb, TrendingUp, Shield, Cpu, Globe, GitBranch, Settings, Download, Plus, X, ArrowRight, Loader } from 'lucide-react';

const LLMRank = () => {
  const [url, setUrl] = useState('');
  const [competitors, setCompetitors] = useState(['']);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('ai-metrics');
  const [showAPIPanel, setShowAPIPanel] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    wappalyzer: '',
    semrush: '',
    serpapi: '',
    pageSpeed: '',
    anthropic: '',
  });

  const [analysisData, setAnalysisData] = useState({
    url: '',
    domain: '',
    aiMetrics: { overallScore: 0, components: [] },
    techStack: {},
    keywords: [],
    urlAnalysisData: [],
    competitorData: [],
    trendData: [],
    rankingGuidance: [],
  });

  const analyzeURL = async (urlInput) => {
    if (!urlInput.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze URL');
      }

      const data = await response.json();
      setAnalysisData(data);
      setAnalyzed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addCompetitor = () => {
    setCompetitors([...competitors, '']);
  };

  const removeCompetitor = (idx) => {
    setCompetitors(competitors.filter((_, i) => i !== idx));
  };

  const updateCompetitor = (idx, value) => {
    const updated = [...competitors];
    updated[idx] = value;
    setCompetitors(updated);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const ScoreCard = ({ title, score, icon: Icon, subtitle }) => (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <Icon className="w-5 h-5 text-cyan-400" />
      </div>
      <div className="text-4xl font-bold tracking-tight">
        <span className={getScoreColor(score)}>{score}</span>
        <span className="text-2xl text-slate-500 ml-2">/100</span>
      </div>
      <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10">
        <header className="border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg">
                <Cpu className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">LLMRank</h1>
                <p className="text-xs text-slate-500 tracking-wider uppercase">Rank for the AI era</p>
              </div>
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full ml-auto">AI-Metrics First</span>
              <button
                onClick={() => setShowAPIPanel(!showAPIPanel)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-all"
              >
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter URL to analyze (e.g., example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && analyzeURL(url)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              <button
                onClick={() => analyzeURL(url)}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : null}
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            {analyzed && (
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-slate-300">Add Competitors to Compare</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {competitors.map((comp, idx) => (
                    <div key={idx} className="flex gap-1">
                      <input
                        type="text"
                        placeholder="competitor.com"
                        value={comp}
                        onChange={(e) => updateCompetitor(idx, e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-40"
                      />
                      <button
                        onClick={() => removeCompetitor(idx)}
                        className="p-2 hover:bg-slate-700 rounded transition-all"
                      >
                        <X className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  ))}
                  {competitors.length < 3 && (
                    <button
                      onClick={addCompetitor}
                      className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {showAPIPanel && (
            <div className="border-t border-slate-800 bg-slate-900/50">
              <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(apiKeys).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-xs text-slate-400 block mb-1 uppercase">{key.replace(/([A-Z])/g, ' $1')}</label>
                      <input
                        type="password"
                        placeholder="Enter API Key"
                        value={value}
                        onChange={(e) => setApiKeys({...apiKeys, [key]: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        {key === 'wappalyzer' && 'For tech stack detection'}
                        {key === 'semrush' && 'For SEO metrics & keywords'}
                        {key === 'serpapi' && 'For SERP position tracking'}
                        {key === 'pageSpeed' && 'For Core Web Vitals'}
                        {key === 'anthropic' && 'For LLM-powered analysis'}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded transition-all">
                  Test Connections
                </button>
              </div>
            </div>
          )}
        </header>

        {analyzed ? (
          <>
            <div className="border-b border-slate-800 bg-slate-900/40 sticky top-[120px] z-20">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex gap-8 overflow-x-auto">
                  {[
                    { id: 'ai-metrics', label: 'LLM Metrics', icon: Zap },
                    { id: 'trends', label: 'Trends', icon: TrendingUp },
                    { id: 'competitors', label: 'Competitors', icon: GitBranch },
                    { id: 'tech-stack', label: 'Tech Stack', icon: Code },
                    { id: 'keywords', label: 'Keywords', icon: TrendingUp },
                    { id: 'url-analysis', label: 'URL Analysis', icon: Globe },
                    { id: 'ai-ranking', label: 'Ranking Guide', icon: Lightbulb },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-2 px-4 py-4 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${
                        activeTab === id
                          ? 'border-cyan-500 text-cyan-400'
                          : 'border-transparent text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
              {activeTab === 'ai-metrics' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">LLM Content Metrics</h2>
                    <p className="text-slate-400 text-sm">How LLMs perceive your content quality, training value, and retrievability</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ScoreCard
                      title="Overall LLM Score"
                      score={analysisData.aiMetrics.overallScore}
                      icon={Cpu}
                      subtitle="How well LLMs can learn from & cite this content"
                    />
                    <ScoreCard
                      title="Model Training Value"
                      score={analysisData.aiMetrics.components[2]?.value || 71}
                      icon={Shield}
                      subtitle="Suitability for LLM fine-tuning datasets"
                    />
                  </div>

                  <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
                    <h3 className="text-xl font-bold mb-6">Metric Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={analysisData.aiMetrics.components}>
                        <PolarGrid stroke="#475569" />
                        <PolarAngleAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#64748b" />
                        <Radar name="Score" dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                      </RadarChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      {analysisData.aiMetrics.components.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-slate-800/50 rounded border border-slate-700">
                          <span className="text-sm text-slate-300">{item.name}</span>
                          <span className={`font-bold ${getScoreColor(item.value)}`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-6 border border-cyan-500/30">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-cyan-400" /> Key Insights</h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>✓ Content is highly semantic & extractable for LLM summarization</li>
                      <li>⚠ Missing ~15 additional structured citations for training datasets</li>
                      <li>✓ Excellent for RAG (Retrieval-Augmented Generation) systems</li>
                      <li>⚠ Topic clustering could be improved for embedding models</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'trends' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Historical Trend Analysis</h2>
                    <p className="text-slate-400 text-sm">6-month progression of LLM metrics and SEO performance</p>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
                    <h3 className="text-xl font-bold mb-6">Overall LLM Score Trend</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={analysisData.trendData}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#64748b" domain={[50, 100]} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                        <Area type="monotone" dataKey="score" stroke="#06b6d4" fillOpacity={1} fill="url(#colorScore)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { metric: 'Citation Quality', jan: analysisData.trendData[0]?.citationQuality, jun: analysisData.trendData[5]?.citationQuality },
                      { metric: 'Semantic Clarity', jan: analysisData.trendData[0]?.semanticClarity, jun: analysisData.trendData[5]?.semanticClarity },
                      { metric: 'Training Value', jan: analysisData.trendData[0]?.trainingValue, jun: analysisData.trendData[5]?.trainingValue },
                      { metric: 'Overall Score', jan: analysisData.trendData[0]?.score, jun: analysisData.trendData[5]?.score },
                    ].map((item, idx) => {
                      const change = item.jun && item.jan ? (((item.jun - item.jan) / item.jan) * 100).toFixed(1) : 0;
                      return (
                        <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                          <p className="text-slate-400 text-sm mb-2">{item.metric}</p>
                          <div className="flex items-end justify-between mb-3">
                            <div>
                              <p className="text-2xl font-bold">{item.jun || '-'}</p>
                              <p className="text-xs text-slate-500">from {item.jan || '-'}</p>
                            </div>
                            <p className="text-green-400 text-lg font-bold">+{change}%</p>
                          </div>
                          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: `${Math.min(100, Math.max(0, change))}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
                    <h3 className="text-xl font-bold mb-6">Multi-Metric Comparison</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={analysisData.trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#64748b" domain={[40, 100]} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="citationQuality" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="semanticClarity" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="trainingValue" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === 'competitors' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Competitor Intelligence</h2>
                    <p className="text-slate-400 text-sm">Head-to-head LLM metrics comparison with top performers</p>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 overflow-x-auto">
                    <h3 className="text-xl font-bold mb-6">Side-by-Side Analysis</h3>
                    <table className="w-full min-w-[800px]">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Domain</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">LLM Score</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">Content</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">Data</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">Training</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">Semantic</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">Citations</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">Keywords</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-slate-300">Traffic</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysisData.competitorData.map((comp, idx) => (
                          <tr key={idx} className={`border-b border-slate-800 ${idx === 0 ? 'bg-cyan-500/10 border-cyan-500/30' : ''}`}>
                            <td className="px-4 py-4 text-sm font-medium">{comp.domain}</td>
                            <td className="px-4 py-4 text-center"><span className={`font-bold text-lg ${getScoreColor(comp.aiScore)}`}>{comp.aiScore}</span></td>
                            <td className="px-4 py-4 text-center text-sm">{comp.contentFriendliness}</td>
                            <td className="px-4 py-4 text-center text-sm">{comp.structuredData}</td>
                            <td className="px-4 py-4 text-center text-sm">{comp.trainingValue}</td>
                            <td className="px-4 py-4 text-center text-sm">{comp.semanticClarity}</td>
                            <td className="px-4 py-4 text-center text-sm">{comp.citations}</td>
                            <td className="px-4 py-4 text-center text-sm font-bold text-cyan-400">{comp.keywords}</td>
                            <td className="px-4 py-4 text-center text-sm text-slate-300">{comp.trafficEst.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
                    <h3 className="text-xl font-bold mb-6">LLM Score Comparison</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={analysisData.competitorData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="domain" stroke="#94a3b8" />
                        <YAxis stroke="#64748b" domain={[0, 100]} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                        <Legend />
                        <Bar dataKey="aiScore" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="trainingValue" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="semanticClarity" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/30">
                      <h3 className="font-bold mb-4">📊 Your Strengths vs Competitors</h3>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>✓ Better semantic clarity (+4 pts vs avg)</li>
                        <li>✓ Strong structured data markup</li>
                        <li>✓ Good content friendliness for LLMs</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-6 border border-orange-500/30">
                      <h3 className="font-bold mb-4">🎯 Gap Areas to Close</h3>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>⚠ Citation quality (-8 pts vs leader)</li>
                        <li>⚠ Training dataset viability</li>
                        <li>⚠ Keyword coverage (-67 keywords)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tech-stack' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Technology Stack Analysis</h2>
                    <p className="text-slate-400 text-sm">Detected technologies powering this website</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(analysisData.techStack).map(([category, techs]) => (
                      <div key={category} className="bg-slate-900 rounded-lg p-6 border border-slate-800 hover:border-cyan-500/50 transition-all">
                        <h3 className="font-bold text-cyan-400 mb-4 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h3>
                        <div className="space-y-2">
                          {(Array.isArray(techs) ? techs : [techs]).map((tech, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                              <span className="text-slate-300">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'keywords' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Keyword Intelligence</h2>
                    <p className="text-slate-400 text-sm">LLM-relevance scoring identifies keywords most valuable for the AI era of search</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                      <thead>
                        <tr className="border-b border-slate-800">
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Keyword</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Volume</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Difficulty</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">LLM Relevance</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Trend</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Position</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysisData.keywords.map((kw, idx) => (
                          <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/30 transition-all">
                            <td className="px-6 py-4 text-sm font-medium">{kw.keyword}</td>
                            <td className="px-6 py-4 text-sm text-slate-300">{kw.volume.toLocaleString()}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={kw.difficulty > 60 ? 'text-red-400' : 'text-yellow-400'}>
                                {kw.difficulty}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className="text-green-400 font-bold">{kw.aiRelevance}%</span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className="text-cyan-400">↑ {kw.trend}</span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className="bg-slate-800 px-2 py-1 rounded text-cyan-400 font-bold">#{kw.position}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'url-analysis' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">URL & Page Analysis</h2>
                    <p className="text-slate-400 text-sm">Technical SEO metrics and page quality indicators</p>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-8 border border-slate-800">
                    <h3 className="text-xl font-bold mb-6">Core Web Vitals & SEO Scores</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={analysisData.urlAnalysisData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="metric" stroke="#94a3b8" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                        <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="threshold" fill="#475569" opacity={0.5} radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === 'ai-ranking' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">How to Rank for LLMs</h2>
                    <p className="text-slate-400 text-sm">Specific actionable recommendations to improve content for LLM retrieval & citation</p>
                  </div>

                  <div className="space-y-4">
                    {analysisData.rankingGuidance.map((item, idx) => (
                      <div key={idx} className="bg-slate-900 rounded-lg p-6 border border-slate-800 hover:border-cyan-500/50 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-lg">{item.metric}</h3>
                          <div className="flex gap-2">
                            <div className="text-right">
                              <p className="text-xs text-slate-400">Current</p>
                              <p className="text-2xl font-bold text-amber-400">{item.current}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-cyan-400 mt-2" />
                            <div className="text-right">
                              <p className="text-xs text-slate-400">Target</p>
                              <p className="text-2xl font-bold text-green-400">{item.target}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 flex gap-2">
                          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400" style={{ width: `${Math.max(0, Math.min(100, item.current))}%` }} />
                          </div>
                        </div>

                        <p className="text-sm text-slate-300 bg-slate-800/50 p-4 rounded border border-slate-700">
                          <strong className="text-cyan-400">Action:</strong> {item.action}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 bg-slate-900/40 sticky bottom-0">
              <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3">
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-all">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-all">
                  <GitBranch className="w-4 h-4" />
                  Share Report
                </button>
                <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-all ml-auto">
                  Schedule Monthly Audit
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <Cpu className="w-20 h-20 text-cyan-400 mx-auto mb-6 opacity-50" />
            <h2 className="text-3xl font-bold mb-4">Rank for the AI Era</h2>
            <p className="text-slate-400 mb-8 text-lg">
              LLMRank analyzes how AI models perceive your content. Compare with competitors. Optimize for LLM ranking, RAG systems, and semantic search.
            </p>
            <p className="text-slate-500">Enter a URL above to get started →</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LLMRank;
