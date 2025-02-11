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

// Chatbot code
const chatbotWindow = document.getElementById('chatbot-window');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const optionsContainer = document.getElementById('options-container');

chatbotToggle.addEventListener('click', () => {
  chatbotWindow.style.display = chatbotWindow.style.display === 'block' ? 'none' : 'block';
});

chatbotClose.addEventListener('click', () => {
  chatbotWindow.style.display = 'none';
});

function generateResponse(userMessage) {
  const responses = {
    "hello": "Hi there! How can I help you?",
    "how are you?": "I'm just a bot, but thanks for asking!",
    "what is your name?": "I'm a simple chatbot created for demonstration purposes.",
    "bye": "Goodbye! Have a great day!",
  };

  return responses[userMessage.toLowerCase()] || "I'm sorry, I don't understand that.";
}

function addMessage(message, isUser) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');

  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');
  messageContent.textContent = message;

  messageElement.appendChild(messageContent);
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addOptions(options) {
  optionsContainer.innerHTML = '';
  options.forEach(option => {
    const button = document.createElement('button');
    button.classList.add('option-button');
    button.textContent = option;
    button.onclick = () => handleOptionSelect(option);
    optionsContainer.appendChild(button);
  });
}

function handleOptionSelect(option) {
  addMessage(option, true);
  const botMessage = generateResponse(option);
  addMessage(botMessage, false);
  optionsContainer.innerHTML = '';
}

function handleUserInput() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, true);
  userInput.value = '';

  const botMessage = generateResponse(userMessage);
  addMessage(botMessage, false);
  addOptions(["hello", "how are you?", "what is your name?", "bye"]);
}

sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleUserInput();
  }
});

// Initial options display
addOptions(["hello", "how are you?", "what is your name?", "bye"]);
