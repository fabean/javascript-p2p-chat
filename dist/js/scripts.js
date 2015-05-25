/* jshint ignore:start */
/* jshint strict: true */

'use strict';

var peer = new Peer({ key: 'n0ei2j1souk57b9' }),
    joinHostButton = document.getElementById('join-host'),
    landline = undefined,
    chatOutputEl = document.getElementById('chat-history');

peer.on('open', function (id) {
  console.log('My peer ID is: ' + id);
});

joinHostButton.addEventListener('click', function () {
  landline = peer.connect(document.getElementById('friends-peer-id').value);
  console.log(landline.id);
});

peer.on('connection', function (landline) {
  console.log(landline, 'yo');
  connectBack(landline.peer);
  landline.on('open', function () {

    landline.on('data', function (data) {
      console.log(data);
      renderMessage(data);
    });

    landline.send('We\'re friends, right? Facebook BFF\'s!');
  });
});

function renderMessage(data) {
  chatOutputEl.innerHTML += '\n    <p class="chat">\n      <span class="name">' + data.name + ':</span>\n      <span class="message"> ' + data.message + '</span>\n    </p>';
}

function connectBack(id) {
  if (typeof landline === 'undefined') {
    // we need to connect back;
    landline = peer.connect(id);
    console.log('connecting again');
  }
}
//# sourceMappingURL=scripts.js.map