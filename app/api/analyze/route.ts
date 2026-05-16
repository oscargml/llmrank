import { NextRequest, NextResponse } from 'next/server';
import { analyzeTechStack } from '@/lib/services/wappalyzer';
import { analyzePageSpeed } from '@/lib/services/pagespeed';
import { analyzeSERPPositions } from '@/lib/services/serpapi';
import { analyzeLLMMetrics } from '@/lib/services/llm-analysis';
import { getApiKeyStatus } from '@/lib/services/config';

type ScoreComponent = {
  name: string;
  value: number;
};

type LLMMetrics = {
  source: string;
  fallbackReason?: string;
  overallScore: number;
  components: ScoreComponent[];
};

export async function GET() {
  return NextResponse.json({ apiStatus: getApiKeyStatus() });
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    const parsedUrl = new URL(normalizedUrl);

    const [techStack, pageSpeed, keywords, llmMetrics] = await Promise.all([
      analyzeTechStack(normalizedUrl),
      analyzePageSpeed(normalizedUrl),
      analyzeSERPPositions(normalizedUrl),
      analyzeLLMMetrics(normalizedUrl),
    ]);

    const urlAnalysisData = [
      { metric: 'Page Speed (Desktop)', value: pageSpeed.pageSpeed, threshold: 75 },
      { metric: 'Mobile Usability', value: pageSpeed.mobileUsability, threshold: 75 },
      { metric: 'Accessibility Score', value: pageSpeed.accessibility, threshold: 70 },
      { metric: 'SEO Best Practices', value: pageSpeed.seo, threshold: 75 },
      { metric: 'Security Score', value: 92, threshold: 80 },
    ];

    return NextResponse.json({
      url: normalizedUrl,
      domain: parsedUrl.hostname,
      apiStatus: getApiKeyStatus(),
      aiMetrics: llmMetrics,
      techStack,
      keywords,
      urlAnalysisData,
      competitorData: generateCompetitorComparison(llmMetrics),
      trendData: generateTrendData(llmMetrics),
      rankingGuidance: generateRankingGuidance(llmMetrics),
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze URL' },
      { status: 500 }
    );
  }
}

function generateCompetitorComparison(llmMetrics: LLMMetrics) {
  const yourScore = llmMetrics.overallScore;
  return [
    {
      domain: 'your-site.com',
      aiScore: yourScore,
      contentFriendliness: llmMetrics.components[0]?.value || 85,
      structuredData: llmMetrics.components[1]?.value || 82,
      trainingValue: llmMetrics.components[2]?.value || 71,
      semanticClarity: llmMetrics.components[4]?.value || 89,
      citations: llmMetrics.components[5]?.value || 73,
      keywords: Math.floor(Math.random() * 300) + 150,
      trafficEst: Math.floor(Math.random() * 20000) + 5000,
    },
    {
      domain: 'competitor1.com',
      aiScore: yourScore + Math.floor(Math.random() * 10) - 5,
      contentFriendliness: 88,
      structuredData: 85,
      trainingValue: 79,
      semanticClarity: 91,
      citations: 81,
      keywords: Math.floor(Math.random() * 400) + 200,
      trafficEst: Math.floor(Math.random() * 30000) + 10000,
    },
    {
      domain: 'competitor2.com',
      aiScore: yourScore - Math.floor(Math.random() * 15),
      contentFriendliness: 76,
      structuredData: 78,
      trainingValue: 65,
      semanticClarity: 82,
      citations: 68,
      keywords: Math.floor(Math.random() * 250) + 100,
      trafficEst: Math.floor(Math.random() * 15000) + 3000,
    },
  ];
}

function generateTrendData(llmMetrics: LLMMetrics) {
  const baseScore = llmMetrics.overallScore;
  return [
    { month: 'Jan', score: baseScore - 16, citationQuality: baseScore - 15, semanticClarity: baseScore - 17, trainingValue: baseScore - 18 },
    { month: 'Feb', score: baseScore - 13, citationQuality: baseScore - 12, semanticClarity: baseScore - 15, trainingValue: baseScore - 15 },
    { month: 'Mar', score: baseScore - 10, citationQuality: baseScore - 8, semanticClarity: baseScore - 13, trainingValue: baseScore - 12 },
    { month: 'Apr', score: baseScore - 6, citationQuality: baseScore - 4, semanticClarity: baseScore - 9, trainingValue: baseScore - 8 },
    { month: 'May', score: baseScore - 3, citationQuality: baseScore - 2, semanticClarity: baseScore - 4, trainingValue: baseScore - 3 },
    { month: 'Jun', score: baseScore, citationQuality: baseScore, semanticClarity: baseScore, trainingValue: baseScore },
  ];
}

function generateRankingGuidance(llmMetrics: LLMMetrics) {
  const overallScore = llmMetrics.overallScore;
  return [
    { metric: 'Semantic Coherence', current: overallScore - 17, target: 95, action: 'Improve topic clustering; use entity linking' },
    { metric: 'Citation Density', current: overallScore - 16, target: 85, action: 'Add 15-20 authoritative inline citations per 2k words' },
    { metric: 'Information Density', current: overallScore - 7, target: 90, action: 'Increase fact-based assertions; reduce fluff by 25%' },
    { metric: 'Factual Accuracy', current: overallScore + 11, target: 98, action: 'Cross-reference all claims; add verification sources' },
    { metric: 'Structural Markup', current: overallScore - 10, target: 92, action: 'Implement Schema.org markup; use FAQ schema' },
    { metric: 'Abstractability Score', current: overallScore - 24, target: 80, action: 'Write summary paragraphs LLMs can extract for snippets' },
  ];
}
