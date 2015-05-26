/* jshint ignore:start */
/* jshint strict: true */

let peer = new Peer({key: 'n0ei2j1souk57b9'}),
    joinHostButton = document.getElementById('join-host'),
    sendMessageButton = document.getElementById('send-message'),
    setNameButton = document.getElementById('set-name'),
    chatOutputEl = document.getElementById('chat-history'),
    showHostButton = document.getElementById('show-host'),
    showJoinButton = document.getElementById('show-join'),
    connectedEl = document.getElementById('connected'),
    landline,
    name;

peer.on('open', function(id) {
  document.getElementById('your-id').innerHTML = `<span>Your id is: <kbd>${id}</kbd></span>`;
});

setNameButton.addEventListener('click', function () {
  let nameInput = document.getElementById('name-input');
  name = nameInput.value;
  nameInput.classList.add('hide');
  setNameButton.classList.add('hide');
  showHostButton.classList.remove('hide');
  showJoinButton.classList.remove('hide');
  // document.getElementById('my-name').innerHTML = name;

});

showHostButton.addEventListener('click', function(){
  document.getElementById('host').classList.toggle('hide');
});

showJoinButton.addEventListener('click', function(){
  document.getElementById('join').classList.toggle('hide');
});

joinHostButton.addEventListener('click', function(){
  landline = peer.connect(document.getElementById('friends-peer-id').value);
  document.getElementById('join').classList.toggle('hide');
});

sendMessageButton.addEventListener('click', function(evt){
  evt.preventDefault();
  let messageEl = document.getElementById('message');
  let data = {
    "message": messageEl.value,
    "name": name
  };
  messageEl.value = '';
  landline.send(data);
  renderMessage(data, 'me');

});

peer.on('connection', function(landline, name){
  connectBack(landline.peer);
  landline.on('open', function(){
    renderConnectedTo(landline.peer);

    landline.on('data', function(data){
      console.log(data);
      renderMessage(data, 'them');
    });

  });

});

function renderMessage(data, who){
  chatOutputEl.innerHTML += `
    <div class="chat message-wrapper ${who}">
      <div class="name circle-wrapper animated bounceIn">${(data.name).charAt(0)}</div>
      <div class="message text-wrapper animated fadeIn"> ${data.message}</div>
    </div>`;

  if (who === 'them' && document.getElementById('friendID').innerHTML !== data.name) {
    renderConnectedTo(data.name);
  }
}

function renderConnectedTo(peer) {
  connectedEl.innerHTML = `You're connected to <span id="friendID">${peer}</span>`;
  connectedEl.classList.remove('hide');
  document.getElementById('init-wrapper').classList.add('hide');
}

function connectBack(id) {
  if (typeof landline === 'undefined') {
    // we need to connect back;
    landline = peer.connect(id);
    console.log('connecting again');
    // let connectedEl = document.getElementById('connected');
    // connectedEl.innetHTML = `You're connected to ${id}`;
    // connectedEl.classList.remove('hide');
  }
}
