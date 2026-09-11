export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { provider, payload, apiKey: customApiKey } = req.body;

  let url = '';
  let apiKey = '';

  if (provider === 'groq') {
    url = 'https://api.groq.com/openai/v1/chat/completions';
    apiKey = customApiKey || process.env.GROQ_API_KEY;
  } else if (provider === 'openrouter') {
    url = 'https://openrouter.ai/api/v1/chat/completions';
    apiKey = customApiKey || process.env.OPENROUTER_API_KEY || process.env.GROQ_API_KEY; 
  } else if (provider === 'gemini') {
    const keyToUse = customApiKey || process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY;
    url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToUse}`;
  } else {
    return res.status(400).json({ error: 'Unknown provider' });
  }

  if (!apiKey && provider !== 'gemini') {
    return res.status(500).json({ error: `${provider} API key is not configured on the server.` });
  }

  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (provider !== 'gemini') {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
    
    if (provider === 'openrouter') {
      headers['HTTP-Referer'] = 'https://fitora.app';
      headers['X-Title'] = 'Fitora Performance';
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('AI Proxy Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
