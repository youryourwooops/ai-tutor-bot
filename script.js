const API_KEY = 'IHR_API_SCHLÜSSEL'; // 请替换为您的XiaoAI+平台API密钥
const API_URL = 'https://api.xiaoai.plus/v1/chat/completions';

async function sendMessage() {
    const inputElem = document.getElementById('userInput');
    const input = inputElem.value.trim();
    if (!input) return;

    const chatBox = document.getElementById('chatBox');

    // 显示用户消息
    chatBox.innerHTML += `<div class="userMsg">👤 ${input}</div>`;

    // 显示加载状态
    const loadingMsg = document.createElement('div');
    loadingMsg.textContent = 'Denke nach...';
    loadingMsg.className = 'botMsg';
    chatBox.appendChild(loadingMsg);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { 
                        role: "system", 
                        content: "Sie sind ein pädagogischer Assistent für deutsche Schüler im Alter von 15-18 Jahren. Bieten Sie klare Erklärungen, stellen Sie Verständnisfragen und geben Sie konstruktives Feedback. Antworten Sie auf Deutsch."
                    },
                    { role: "user", content: input }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        chatBox.removeChild(loadingMsg);

        if(data.choices && data.choices[0].message) {
            const botResponse = data.choices[0].message.content;
            chatBox.innerHTML += `<div class="botMsg">🤖 ${botResponse}</div>`;
        } else {
            chatBox.innerHTML += `<div class="botMsg">⚠️ Entschuldigung, ich konnte keine Antwort generieren.</div>`;
        }
    } catch (error) {
        chatBox.removeChild(loadingMsg);
        chatBox.innerHTML += `<div class="botMsg">⚠️ Netzwerkfehler: ${error.message}</div>`;
    }

    inputElem.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}
