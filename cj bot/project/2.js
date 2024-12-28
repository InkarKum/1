// chat.js
class GeminiChat {
    constructor() {
        // API ключ нужно будет заменить на ваш от Gemini API
        this.apiKey = 'AIzaSyDWOcHDSHCgPbHB6QRXfnWLWCoRP1B0few';
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        
        this.messageContainer = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        
        this.initialize();
    }

    initialize() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        this.userInput.value = '';
        this.addMessageToChat('user', message);
        this.showLoading();

        try {
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: message
                        }]
                    }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(errorData.error?.message || 'Ошибка API');
            }

            const data = await response.json();
            const botResponse = data.candidates[0].content.parts[0].text;
            
            this.hideLoading();
            this.addMessageToChat('bot', botResponse);

        } catch (error) {
            console.error('Error details:', error);
            this.hideLoading();
            this.addMessageToChat('bot', `Произошла ошибка: ${error.message}`);
        }
    }

    addMessageToChat(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;
        this.messageContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot-message loading';
        loadingDiv.id = 'loading-message';
        loadingDiv.textContent = 'Печатает';
        this.messageContainer.appendChild(loadingDiv);
        this.scrollToBottom();
    }

    hideLoading() {
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }

    scrollToBottom() {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chat = new GeminiChat();
});