/* jshint ignore:start */
/* jshint strict: true */

'use strict';

var peer = new Peer({ key: 'n0ei2j1souk57b9' }),
    joinHostButton = document.getElementById('join-host'),
    sendMessageButton = document.getElementById('send-message'),
    setNameButton = document.getElementById('set-name'),
    nameEl = document.getElementById('name-input'),
    chatOutputEl = document.getElementById('chat-history'),
    showHostButton = document.getElementById('show-host'),
    showJoinButton = document.getElementById('show-join'),
    connectedEl = document.getElementById('connected'),
    messageEl = document.getElementById('message'),
    messageWrapEl = document.getElementsByClassName('message-wrapper'),
    peerId = document.getElementById('friends-peer-id'),
    landline = undefined,
    name = undefined;

// set name events / functions
setNameButton.addEventListener('click', function () {
  setName();
});

nameEl.addEventListener('keydown', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
    // enter key
    e.preventDefault();
    setName();
  }
});

function setName() {
  var nameInput = document.getElementById('name-input');
  name = nameInput.value;
  nameInput.classList.add('hide');
  setNameButton.classList.add('hide');
  showHostButton.classList.remove('hide');
  showJoinButton.classList.remove('hide');
}

// host / join
showHostButton.addEventListener('click', function () {
  document.getElementById('host').classList.toggle('hide');
});

showJoinButton.addEventListener('click', function () {
  document.getElementById('join').classList.toggle('hide');
});

peerId.addEventListener('keydown', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
    // enter key
    e.preventDefault();
    landline = peer.connect(peerId.value);
    document.getElementById('join').classList.toggle('hide');
  }
});

joinHostButton.addEventListener('click', function () {
  landline = peer.connect(peerId.value);
  document.getElementById('join').classList.toggle('hide');
});

// messages
sendMessageButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  sendMessage();
});

messageEl.addEventListener('keydown', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
    // enter key
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  var data = {
    'message': messageEl.value,
    'name': name
  };
  messageEl.value = '';
  landline.send(data);
  renderMessage(data, 'me');
}

function renderMessage(data, who) {
  // building out all the elements and rendering to page
  var messageWrapper = document.createElement('div');
  messageWrapper.classList.add('chat', 'message-wrapper', who);

  var messagePerson = document.createElement('div');
  messagePerson.classList.add('name', 'circle-wrapper', 'animated', 'bounceIn');

  var personName = document.createTextNode(data.name.charAt(0));
  messagePerson.appendChild(personName);

  var messageDiv = document.createElement('div');
  messageDiv.classList.add('message', 'text-wrapper');

  var messageContent = document.createTextNode(data.message);
  messageDiv.appendChild(messageContent);

  messageWrapper.appendChild(messagePerson);
  messageWrapper.appendChild(messageDiv);

  chatOutputEl.appendChild(messageWrapper);

  if (who === 'them' && document.getElementById('friendID').innerHTML !== data.name) {
    renderConnectedTo(data.name);
  }
  animateText();
}

function animateText() {
  setTimeout(function () {
    var lastMessage = messageWrapEl[messageWrapEl.length - 1];
    lastMessage.getElementsByClassName('text-wrapper')[0].classList.add('animated', 'fadeIn');
  }, 350);
}

// peer stuff
peer.on('open', function (id) {
  document.getElementById('your-id').innerHTML = '<span>Your id is: <kbd>' + id + '</kbd></span>';
});

peer.on('connection', function (landline, name) {
  connectBack(landline.peer);
  landline.on('open', function () {
    renderConnectedTo(landline.peer);

    landline.on('data', function (data) {
      console.log(data);
      renderMessage(data, 'them');
    });
  });
});

function renderConnectedTo(peer) {
  connectedEl.innerHTML = 'You\'re connected to <span id="friendID">' + peer + '</span>';
  connectedEl.classList.remove('hide');
  document.getElementById('init-wrapper').classList.add('hide');
}

function connectBack(id) {
  // recieve a connection and connect back
  console.log(landline);
  if (typeof landline === 'undefined') {
    // we need to connect back;
    landline = peer.connect(id);
    console.log('connecting again');
  }
}
//# sourceMappingURL=scripts.js.map