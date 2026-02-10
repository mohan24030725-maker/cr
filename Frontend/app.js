const app = {
    // Basic Auth Simulation
    login: () => {
        const email = document.getElementById('email').value;
        if(email.includes('@')) {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('main-dashboard').classList.remove('hidden');
        } else {
            alert("Please enter a valid email");
        }
    },

    logout: () => {
        document.getElementById('main-dashboard').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
    },

    // AI Communication Logic
    askAI: async () => {
        const input = document.getElementById('chat-input');
        const output = document.getElementById('chat-output');
        const userText = input.value.trim();

        if (!userText) return;

        // Display User Message
        output.innerHTML += `<div class="bg-gray-100 p-3 rounded-lg ml-8 text-right font-medium"> ${userText}</div>`;
        input.value = '';

        try {
            const res = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText, userRole: 'Employee' })
            });
            const data = await res.json();
            
            // Display AI Response
            output.innerHTML += `<div class="bg-blue-50 p-3 rounded-lg mr-8 text-blue-800"> ${data.reply}</div>`;
        } catch (err) {
            output.innerHTML += `<div class="text-red-500 text-xs italic text-center">Connection error. Check backend.</div>`;
        }
        output.scrollTop = output.scrollHeight;
    }
};

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js');
    });
}