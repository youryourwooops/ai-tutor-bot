export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://xiaoai.plus/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.sk-AqZOJUtAWtn6Uu52iecZoFecTcK3nDkPqSHpHVYhZjvzV5Fg}` // Or hardcode for testing
        // Example: Authorization: 'Bearer YOUR_REAL_API_KEY',
      },
      body: JSON.stringify({
        prompt: message,
        model: "gemini-2.0-pro-exp",
        temperature: 0.7
      }),
    });

    const data = await response.json();
    console.log("Gemini API Raw Response:", data); // 👈 DEBUG OUTPUT

    // Try to use different keys based on actual response structure
    const reply = data?.response || data?.result || data?.message || "⚠️ No valid response field";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Something went wrong talking to Gemini' });
  }
}
