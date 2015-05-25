/* jshint ignore:start */
/* jshint strict: true */

'use strict';

var peer = new Peer({ key: 'n0ei2j1souk57b9' }),
    joinHostButton = document.getElementById('join-host'),
    sendMessageButton = document.getElementById('send-message'),
    setNameButton = document.getElementById('set-name'),
    chatOutputEl = document.getElementById('chat-history'),
    showHostButton = document.getElementById('show-host'),
    showJoinButton = document.getElementById('show-join'),
    landline = undefined,
    name = undefined;

peer.on('open', function (id) {
  document.getElementById('your-id').innerHTML = '<span>Your id is: ' + id + '</span>';
});

setNameButton.addEventListener('click', function () {
  var nameInput = document.getElementById('name-input');
  name = nameInput.value;
  nameInput.classList.add('hide');
  setNameButton.classList.add('hide');
  showHostButton.classList.remove('hide');
  showJoinButton.classList.remove('hide');
  // document.getElementById('my-name').innerHTML = name;
});

showHostButton.addEventListener('click', function () {
  document.getElementById('host').classList.remove('hide');
});

showJoinButton.addEventListener('click', function () {
  document.getElementById('join').classList.remove('hide');
});

joinHostButton.addEventListener('click', function () {
  landline = peer.connect(document.getElementById('friends-peer-id').value);
});

sendMessageButton.addEventListener('click', function (evt) {
  console.log('you clicked');
  console.log(name, landline);
  evt.preventDefault();
  var data = {
    'message': document.getElementById('message').value,
    'name': name
  };
  landline.send(data);
  renderMessage(data, 'me');
});

peer.on('connection', function (landline, name) {
  console.log(landline, 'yo');
  connectBack(landline.peer);
  landline.on('open', function () {

    landline.on('data', function (data) {
      console.log(data);
      renderMessage(data, 'them');
    });
  });
});

function renderMessage(data, who) {
  chatOutputEl.innerHTML += '\n    <div class="chat message-wrapper ' + who + '">\n      <div class="name circle-wrapper animated bounceIn">' + data.name.charAt(0) + '</div>\n      <div class="message text-wrapper animated fadeIn"> ' + data.message + '</div>\n    </div>';
}

function connectBack(id) {
  if (typeof landline === 'undefined') {
    // we need to connect back;
    landline = peer.connect(id);
    console.log('connecting again');
  }
}
//# sourceMappingURL=scripts.js.map