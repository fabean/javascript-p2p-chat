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
  window.landline = peer.connect(landline.peer);
  landline.on('open', function () {
    console.log(landline);

    landline.on('data', function (data) {
      console.log(data);
      renderMessage(data);
    });

    landline.send('We\'re friends, right? Facebook BFF\'s!');
  });
});

function renderMessage(data) {
  chatOutputEl.innerHTML += '<p class="chat">data</p>';
}
//# sourceMappingURL=scripts.js.map