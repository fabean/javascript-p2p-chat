/* jshint ignore:start */
let peer = new Peer({key: 'n0ei2j1souk57b9'});

peer.on('open', function(id) {
  console.log(`My peer ID is: ${id}`);
});

let landline = peer.connect('dest-peer-id');

peer.on('connection', function(landline){
  landline.on('open', function(){

    landline.on('data', function(data){
      console.log(data);
    });

    landline.send("We're friends, right? Facebook BFF's!");

  });
});
