const clientId = Math.floor(Math.random() * 10000);
let ws;
const messagesDiv = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const connectionStatus = document.getElementById('connectionStatus');

function connectWebSocket() {
    // Use window.location to make it work on different hosts/ports
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    ws = new WebSocket(`${protocol}//${host}/ws/${clientId}`);

    ws.onopen = () => {
        console.log('WebSocket connected');
        connectionStatus.textContent = 'Connected';
        connectionStatus.classList.remove('disconnected');
        connectionStatus.classList.add('connected');
        messageInput.disabled = false;
        messageInput.placeholder = 'Type a message...';
    };

    ws.onmessage = (event) => {
        console.log('Message received:', event.data);
        addMessage(event.data, 'received');
    };

    ws.onclose = () => {
        console.log('WebSocket disconnected');
        connectionStatus.textContent = 'Disconnected';
        connectionStatus.classList.remove('connected');
        connectionStatus.classList.add('disconnected');
        messageInput.disabled = true;
        messageInput.placeholder = 'Disconnected...';
        
        // Try to reconnect after 3 seconds
        setTimeout(connectWebSocket, 3000);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}

function addMessage(text, type = 'received') {
    const message = document.createElement('div');
    
    // Check if it's a system message (joined/left messages)
    if (text.includes('joined') || text.includes('left')) {
        message.className = 'message system';
    } else {
        message.className = `message ${type}`;
    }
    
    const content = document.createElement('p');
    content.textContent = text;
    message.appendChild(content);
    messagesDiv.appendChild(message);
    
    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

messageForm.onsubmit = (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    
    if (message && ws && ws.readyState === WebSocket.OPEN) {
        ws.send(message);
        addMessage(message, 'sent');
        messageInput.value = '';
        messageInput.focus();
    }
};

// Allow sending message with Enter key
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        messageForm.requestSubmit();
    }
});

// Initialize WebSocket connection when page loads
connectWebSocket();