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
        Authorization: `Bearer ${process.env.sk-AqZOJUtAWtn6Uu52iecZoFecTcK3nDkPqSHpHVYhZjvzV5Fg}`, // You need to set this in Vercel
      },
      body: JSON.stringify({
        prompt: message,
        model: "gemini-pro",
        redirect: "https://ai-tutor-bot.vercel.app/", // optional redirect URL
      }),
    });

    const data = await response.json();

    const reply = data.result || data.response || "No reply received.";
    res.status(200).json({ reply });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Something went wrong talking to Gemini' });
  }
}
