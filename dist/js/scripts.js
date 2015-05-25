/* jshint ignore:start */
/* jshint strict: true */

'use strict';

var peer = new Peer({ key: 'n0ei2j1souk57b9' }),
    joinHostButton = document.getElementById('join-host');

peer.on('open', function (id) {
  console.log('My peer ID is: ' + id);
});

joinHostButton.addEventListener('click', function () {
  peer.connect(document.getElementById('friends-peer-id').value);
});
//# sourceMappingURL=scripts.js.map