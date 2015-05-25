/* jshint ignore:start */
'use strict';

var peer = new Peer({ key: 'n0ei2j1souk57b9' });

peer.on('open', function (id) {
  console.log('My peer ID is: ' + id);
});
//# sourceMappingURL=scripts.js.map