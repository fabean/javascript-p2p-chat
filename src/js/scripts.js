/* jshint ignore:start */
/* jshint strict: true */

let peer = new Peer({key: 'n0ei2j1souk57b9'}),
    joinHostButton = document.getElementById('join-host'),
    sendMessageButton = document.getElementById('send-message'),
    setNameButton = document.getElementById('set-name'),
    chatOutputEl = document.getElementById('chat-history'),
    landline,
    name;

peer.on('open', function(id) {
  document.getElementById('your-id').innerHTML = `<h4>Your id is: ${id}</h4>`;
});

setNameButton.addEventListener('click', function (evt) {
  let nameSource = document.getElementById('name-input');
  name = nameSource.value;
  nameSource.classList.add("hidden");
  evt.target.classList.add("hidden");
  document.getElementById('my-name').innerHTML = name;
});

joinHostButton.addEventListener('click', function(){
  landline = peer.connect(document.getElementById('friends-peer-id').value);
});

sendMessageButton.addEventListener('click', function(evt){
  console.log('you clicked');
  console.log(name, landline);
  evt.preventDefault();
  let data = {
    "message": document.getElementById('message').value,
    "name": name
  };
  landline.send(data);
  renderMessage(data);
});

peer.on('connection', function(landline, name){
  console.log(landline, 'yo');
  connectBack(landline.peer);
  landline.on('open', function(){

    landline.on('data', function(data){
      console.log(data);
      renderMessage(data);
    });

  });

});

function renderMessage(data){
  chatOutputEl.innerHTML += `
    <p class="chat">
      <span class="name">${data.name}:</span>
      <span class="message"> ${data.message}</span>
    </p>`;
}

function connectBack(id) {
  if (typeof landline === 'undefined') {
    // we need to connect back;
    landline = peer.connect(id);
    console.log('connecting again');
  }
}
