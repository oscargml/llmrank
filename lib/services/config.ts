export type ApiKeyStatus = {
  anthropic: boolean;
  pageSpeed: boolean;
  serpApi: boolean;
  wappalyzer: boolean;
  semrush: boolean;
  anthropicModel: string;
};

export const DEFAULT_ANTHROPIC_MODEL = 'claude-sonnet-4-20250514';

export function getApiKeyStatus(): ApiKeyStatus {
  return {
    anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
    pageSpeed: Boolean(process.env.PAGE_SPEED_API_KEY),
    serpApi: Boolean(process.env.SERP_API_KEY),
    wappalyzer: Boolean(process.env.WAPPALYZER_API_KEY),
    semrush: Boolean(process.env.SEMRUSH_API_KEY),
    anthropicModel: process.env.ANTHROPIC_MODEL || DEFAULT_ANTHROPIC_MODEL,
  };
}
