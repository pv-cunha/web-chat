const btnChatOpen = document.querySelector('#btn_support');
const xChatClose = document.querySelector('#x_cancel');
const btnChatClose = document.querySelector('#btn_cancel');
const xInSupport = document.querySelector('#x_in_support');
const chat = document.querySelector('#chat_help');
const chatInSupport = document.querySelector('#chat_in_support');

let emailUser = null;

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
  emailUser = email;
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

  socket.on('client_list_all_messages', (messages) => {
    var template_client = document.getElementById('message-user-template')
      .innerHTML;
    var template_admin = document.getElementById('admin-template').innerHTML;

    messages.forEach((message) => {
      if (message.admin_id === null) {
        const rendered = Mustache.render(template_client, {
          message: message.text,
          email: `${email}`,
        });

        document.getElementById('messages').innerHTML += rendered;
      } else {
        const rendered = Mustache.render(template_admin, {
          message_admin: message.text,
        });

        document.getElementById('messages').innerHTML += rendered;
      }
    });
  });

  socket.on('admin_send_to_client', (message) => {
    socket_admin_id = message.socket_id;

    const template_admin = document.getElementById('admin-template').innerHTML;

    const rendered = Mustache.render(template_admin, {
      message_admin: message.text,
    });

    document.getElementById('messages').innerHTML += rendered;
  });

  document
    .querySelector('#send_message_button')
    .addEventListener('click', (event) => {
      const text = document.getElementById('message_user');

      const params = {
        text: text.value,
        socket_admin_id,
      };

      socket.emit('client_send_to_admin', params);

      const template_client = document.getElementById('message-user-template')
        .innerHTML;

      const rendered = Mustache.render(template_client, {
        message: text.value,
        email: emailUser,
      });

      document.getElementById('messages').innerHTML += rendered;

      text.value = '';
    });
});
