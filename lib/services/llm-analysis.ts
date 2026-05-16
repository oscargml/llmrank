import axios from 'axios';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function analyzeLLMMetrics(url: string, contentSample?: string) {
  if (!ANTHROPIC_API_KEY) {
    return getDefaultLLMMetrics();
  }

  try {
    let content = contentSample;

    if (!content) {
      try {
        content = await fetchPageContent(url);
      } catch {
        content = `Website: ${url}`;
      }
    }

    const prompt = `Analyze this web content for LLM training value and citation quality. Return ONLY JSON with these exact keys:

${content}

Respond with ONLY this JSON format (no markdown, no other text):
{"content_friendliness": 0-100, "structured_data_quality": 0-100, "training_viability": 0-100, "token_efficiency": 0-100, "semantic_clarity": 0-100, "citation_worthiness": 0-100}`;

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-opus-4-7',
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      }
    );

    const text = response.data.content[0]?.text || '';
    console.log('Claude response:', text);
    return parseMetricsFromResponse(text);
  } catch (error) {
    console.error('Anthropic error:', error instanceof Error ? error.message : error);
    return getDefaultLLMMetrics();
  }
}

async function fetchPageContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      timeout: 8000,
      maxContentLength: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const text = response.data;
    return text.substring(0, 3000);
  } catch (error) {
    throw error;
  }
}

function parseMetricsFromResponse(text: string) {
  const defaultMetrics = getDefaultLLMMetrics();

  try {
    const scores = extractScores(text);
    const values = Object.values(scores);
    const overallScore = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

    return {
      overallScore: Math.min(100, Math.max(0, overallScore)),
      components: [
        { name: 'LLM Content Friendliness', value: scores.content_friendliness },
        { name: 'Structured Data Quality', value: scores.structured_data_quality },
        { name: 'Model Training Viability', value: scores.training_viability },
        { name: 'Token Efficiency', value: scores.token_efficiency },
        { name: 'Semantic Clarity', value: scores.semantic_clarity },
        { name: 'Citation Worthiness', value: scores.citation_worthiness },
      ],
    };
  } catch (error) {
    console.error('Parse error:', error);
    return defaultMetrics;
  }
}

function extractScores(text: string): { [key: string]: number } {
  const defaults = {
    content_friendliness: 78,
    structured_data_quality: 72,
    training_viability: 65,
    token_efficiency: 71,
    semantic_clarity: 84,
    citation_worthiness: 68,
  };

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        content_friendliness: Math.min(100, Math.max(0, parsed.content_friendliness || defaults.content_friendliness)),
        structured_data_quality: Math.min(100, Math.max(0, parsed.structured_data_quality || defaults.structured_data_quality)),
        training_viability: Math.min(100, Math.max(0, parsed.training_viability || defaults.training_viability)),
        token_efficiency: Math.min(100, Math.max(0, parsed.token_efficiency || defaults.token_efficiency)),
        semantic_clarity: Math.min(100, Math.max(0, parsed.semantic_clarity || defaults.semantic_clarity)),
        citation_worthiness: Math.min(100, Math.max(0, parsed.citation_worthiness || defaults.citation_worthiness)),
      };
    }
  } catch {
    console.error('JSON parse failed');
  }

  return defaults;
}

function getDefaultLLMMetrics() {
  return {
    overallScore: 78,
    components: [
      { name: 'LLM Content Friendliness', value: 85 },
      { name: 'Structured Data Quality', value: 82 },
      { name: 'Model Training Viability', value: 71 },
      { name: 'Token Efficiency', value: 76 },
      { name: 'Semantic Clarity', value: 89 },
      { name: 'Citation Worthiness', value: 73 },
    ],
  };
}
