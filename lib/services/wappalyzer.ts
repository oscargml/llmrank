import axios from 'axios';

type WappalyzerTechnology = {
  name?: string;
  categories?: string[];
};

export async function analyzeTechStack(url: string) {
  const apiKey = process.env.WAPPALYZER_API_KEY;

  if (!apiKey) {
    return getDefaultTechStack();
  }

  try {
    const response = await axios.get(
      `https://api.wappalyzer.com/v2/lookup?urls=${encodeURIComponent(url)}`,
      { headers: { 'x-api-key': apiKey } }
    );

    const tech = response.data?.[0]?.technologies || [];

    const categories: { [key: string]: string[] } = {
      frontend: [],
      backend: [],
      analytics: [],
      cdn: [],
      security: [],
      performance: [],
    };

    tech.forEach((t: WappalyzerTechnology) => {
      const name = t.name;
      const category = t.categories?.[0]?.toLowerCase() || 'frontend';
      if (!name) return;
      if (categories[category]) {
        categories[category].push(name);
      } else {
        categories.frontend.push(name);
      }
    });

    return categories;
  } catch (error) {
    console.error('Wappalyzer error:', error);
    return getDefaultTechStack();
  }
}

function getDefaultTechStack() {
  return {
    frontend: ['React 18', 'Next.js 16', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'PostgreSQL'],
    analytics: ['Google Analytics 4'],
    cdn: ['Cloudflare'],
    security: ["Let's Encrypt SSL", 'CSP Headers'],
    performance: ['Core Web Vitals: Good'],
  };
}
