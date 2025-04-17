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
        'Authorization': `Bearer ${process.env.XIAOAI_API_KEY}` // Replace or hardcode for testing
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful tutor bot." },
          { role: "user", content: message }
        ],
        temperature: 0.7
      }),
    });

    const data = await response.json();
    console.log("📦 GPT-4 Response:", data);

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "⚠️ GPT-4 did not return a reply", raw: data });
    }

    res.status(200).json({ reply });

  } catch (error) {
    console.error("❌ GPT-4 API Error:", error);
    res.status(500).json({ error: "❌ Server error while contacting GPT-4" });
  }
}
