
$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });

})

// chatbot
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
        "how are you": "I'm just a bot, but thanks for asking!",
        "what is your name": "I'm a simple chatbot created for demonstration purposes.",
        "bye": "Goodbye! Have a great day!",
    };

    return responses[userMessage.toLowerCase()] || "I'm sorry, I don't understand that.";
}

function addMessage(message, isUser ) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isUser  ? 'user-message' : 'bot-message');

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;

    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
}

function addOptions(options) {
    optionsContainer.innerHTML = ''; // Clear previous options
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
    optionsContainer.innerHTML = ''; // Clear options after selection
}

function handleUserInput() { // Corrected function name
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, true);
    userInput.value = '';

    const botMessage = generateResponse(userMessage);
    addMessage(botMessage, false);
    addOptions(["hello", "how are you?", "what is your name?", "bye"]); // Display options
}

sendButton.addEventListener('click', handleUserInput); // Updated reference
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserInput(); // Updated reference
    }
});

// Initial options display
addOptions(["hello", "how are you?", "what is your name?", "bye"]);