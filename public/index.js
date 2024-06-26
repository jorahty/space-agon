const sendBtn = document.querySelector('#send');
const messages = document.querySelector('#messages');
const messageBox = document.querySelector('#messageBox');

let ws;

function showMessage(message) {
  messages.textContent += `\n\n${message}`;
  messages.scrollTop = messages.scrollHeight;
  messageBox.value = '';
}

function init() {
  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  ws = new WebSocket(`ws://${window.location.hostname}:${window.location.port}`);
  ws.onopen = () => {
    console.log('Connection opened!');
  };
  ws.onmessage = async (event) => {
    console.log(event);
    const message = await event.data.text();
    return showMessage(message);
  };
  ws.onclose = function () {
    ws = null;
  };
}

sendBtn.onclick = function () {
  if (!ws) {
    showMessage('No WebSocket connection :(');
    return;
  }

  ws.send(messageBox.value);
  showMessage(messageBox.value);
};

init();
