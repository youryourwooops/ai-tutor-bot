document.getElementById("send-btn").addEventListener("click", async () => {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendToChat("You", message);
  input.value = "";

  appendToChat("AI", "Thinking...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    updateLastMessage("AI", data.reply);
  } catch (err) {
    updateLastMessage("AI", "Sorry, something went wrong.");
  }
});

function appendToChat(sender, message) {
  const chatLog = document.getElementById("chat-log");
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function updateLastMessage(sender, message) {
  const chatLog = document.getElementById("chat-log");
  const messages = chatLog.querySelectorAll("div");
  messages[messages.length - 1].innerHTML = `<strong>${sender}:</strong> ${message}`;
}
