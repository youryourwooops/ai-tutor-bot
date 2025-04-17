export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://xiaoai.plus/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.sk-AqZOJUtAWtn6Uu52iecZoFecTcK3nDkPqSHpHVYhZjvzV5Fg}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "No reply received.";
  res.status(200).json({ reply });
}
