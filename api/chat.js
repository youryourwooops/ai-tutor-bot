export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://xiaoai.plus/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-AqZOJUtAWtn6Uu52iecZoFecTcK3nDkPqSHpHVYhZjvzV5Fg' // Try hardcoded first
      },
      body: JSON.stringify({
        prompt: message,
        model: "gemini-2.0-pro-exp",  // Specify the Gemini version you're using
        temperature: 0.7,
        redirect_url: "https://ai-tutor-bot.vercel.app/"  // Optional redirect URL
      }),
    });

    const data = await response.json();

    if (data && data.result) {
      res.status(200).json({ reply: data.result });
    } else {
      res.status(500).json({ error: "Failed to receive a valid response from Gemini" });
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Something went wrong while contacting Gemini' });
  }
}
