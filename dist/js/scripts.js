/* jshint ignore:start */
/* jshint strict: true */

'use strict';

var peer = new Peer({ key: 'n0ei2j1souk57b9' }),
    joinHostButton = document.getElementById('join-host'),
    landline = undefined;

peer.on('open', function (id) {
  console.log('My peer ID is: ' + id);
});

joinHostButton.addEventListener('click', function () {
  landline = peer.connect(document.getElementById('friends-peer-id').value);
  console.log(landline.id);
});

peer.on('connection', function (landline) {
  landline.on('open', function () {

    landline.on('data', function (data) {
      console.log(data);
    });

    landline.send('We\'re friends, right? Facebook BFF\'s!');
  });
});
//# sourceMappingURL=scripts.js.map