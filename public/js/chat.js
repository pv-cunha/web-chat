const btnChatOpen = document.querySelector('#btn_support');
const xChatClose = document.querySelector('#x_cancel');
const btnChatClose = document.querySelector('#btn_cancel');
const xInSupport = document.querySelector('#x_in_support');
const chat = document.querySelector('#chat_help');
const chatInSupport = document.querySelector('#chat_in_support');

function openChat() {
  chat.style.display = 'block';
}

function closeChat() {
  chat.style.display = 'none';
}

function closeSupportChat() {
  chatInSupport.style.display = 'none';
}

btnChatOpen.addEventListener('click', openChat);
btnChatClose.addEventListener('click', closeChat);
xChatClose.addEventListener('click', closeChat);
xInSupport.addEventListener('click', closeSupportChat);

const textHelpRemaining = document.querySelector('#txt_help');

function keyUpTextHelp(event) {
  const charac_remaining = document.getElementById('charac_remaining');
  const length_text = event.target.value.length;
  charac_remaining.innerHTML = Number(250) - Number(length_text);
}

textHelpRemaining.addEventListener('keydown', keyUpTextHelp);

const startChatButton = document.querySelector('#start_chat');

startChatButton.addEventListener('click', (event) => {
  const chatHelp = document.querySelector('#chat_help');
  chatHelp.style.display = 'none';

  const chatInSupport = document.querySelector('#chat_in_support');
  chatInSupport.style.display = 'block';
  const socket = io();

  const email = document.querySelector('#email').value;
  const text = document.querySelector('#txt_help').value;

  socket.on('connect', () => {
    const params = {
      email,
      text,
    };
    socket.emit('client_first_access', params, (call, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(call);
      }
    });
  });
});
