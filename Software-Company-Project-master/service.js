$(document).ready(function () {
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      const hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function () {
        window.history.pushState(null, null, hash);
      });
    }
  });

  // Slide animation on scroll
  $(window).scroll(function () {
    $(".slideanim").each(function () {
      const pos = $(this).offset().top;
      const winTop = $(window).scrollTop();
      if (pos < winTop + 600) {
        $(this).addClass("slide");
      }
    });
  });
});

//chatbot js


const API_KEY = 'AIzaSyCdzg3kqbknzwy5eqUmg8fw5nR1cBNpV6U'; 
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const chatbotWindow = document.getElementById('chatbot-window');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');

chatbotToggle.addEventListener('click', () => {
    chatbotWindow.style.display = chatbotWindow.style.display === 'block' ? 'none' : 'block';
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});

async function generateResponse(prompt) {
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        if (!response.ok) throw new Error('Failed to generate response');
        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I don't understand.";
    } catch (error) {
        console.error('Error:', error);
        return "Sorry, an error occurred.";
    }
}

function addMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');

    // const profileImage = document.createElement('img');
    // profileImage.classList.add('profile-image');
    // profileImage.src = isUser ? 'user.jpg' : 'bot.jpg';
    // profileImage.alt = isUser ? 'User' : 'Bot';

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;

    // messageElement.appendChild(profileImage);
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, true);
    userInput.value = '';
    sendButton.disabled = true;
    userInput.disabled = true;

    try {
        const botMessage = await generateResponse(userMessage);
        addMessage(botMessage, false);
    } catch (error) {
        console.error('Error:', error);
        addMessage("Sorry, an error occurred.", false);
    } finally {
        sendButton.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }
}

sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserInput();
    }
});

