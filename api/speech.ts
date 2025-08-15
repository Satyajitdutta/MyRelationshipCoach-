
// This file represents a serverless API endpoint, e.g., at `/api/speech`.
// It should be deployed in an environment that supports this, like Vercel or Cloudflare Workers.
// It uses the standard Fetch API Request and Response objects, which are available in many modern serverless runtimes.

interface SpeechRequestBody {
  text: string;
  voice: {
    languageCode: string;
    name: string;
  };
}

export const config = {
  runtime: 'edge', // Example config for Vercel Edge Functions
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    console.error('API_KEY is not set in the serverless environment.');
    return new Response(JSON.stringify({ error: 'Server configuration error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { text, voice } = (await request.json()) as SpeechRequestBody;

    if (!text || !voice || !voice.languageCode || !voice.name) {
      return new Response(JSON.stringify({ error: 'Missing text or voice configuration.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const GOOGLE_TTS_API_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

    const apiRequestBody = {
      input: { text },
      voice: {
        languageCode: voice.languageCode,
        name: voice.name,
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
    };

    const apiResponse = await fetch(GOOGLE_TTS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    });

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.text();
      console.error('Google TTS API Error:', errorBody);
      return new Response(JSON.stringify({ error: 'Failed to synthesize speech from provider.' }), {
        status: apiResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const responseData = await apiResponse.json();
    // The responseData is expected to have an `audioContent` field with a base64 string.

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate' // Cache successful responses
      },
    });

  } catch (error) {
    console.error('Error in speech handler:', error);
    return new Response(JSON.stringify({ error: 'An internal server error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
