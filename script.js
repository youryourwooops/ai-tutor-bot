document.getElementById("send").addEventListener("click", async () => {
  const input = document.getElementById("input").value;
  const chatBox = document.getElementById("chat");

  if (!input) return;

  chatBox.innerHTML += `<div class="user">🧍‍♂️ ${input}</div>`;
  document.getElementById("input").value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    if (data.reply) {
      chatBox.innerHTML += `<div class="bot">🤖 ${data.reply}</div>`;
    } else {
      chatBox.innerHTML += `<div class="bot">⚠️ No reply received</div>`;
      console.warn("No reply:", data);
    }
  } catch (err) {
    chatBox.innerHTML += `<div class="bot">❌ Sorry, something went wrong.</div>`;
    console.error("Fetch error:", err);
  }
});
