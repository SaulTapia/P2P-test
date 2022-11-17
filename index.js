var peer = new Peer();


peer.on('open', function(id) {
    var peerId = id;
    let hostText = document.getElementById("id-text");
    hostText.innerHTML = peerId;
});

let textarea = document.getElementById("id-textarea");
let submit_id = document.getElementById("submit-button");
let title = document.getElementById("title");
let button = document.getElementById("submit-button");
let connected = false;

var conn;
peer.on('connection', function(conn_) {
    console.log("Connectedd!!!");
    conn = conn_;
    make_connection();
});
const callAudio = document.createElement('audio')
var beingCalled = false;

var callBtn = document.getElementById('call-button');
var incomingCall = new Audio();
incomingCall.autoplay = true;

peer.on("call", (call) => {
    beingCalled = true;
    incomingCall = call;
    callBtn.textContent = "Answer Call"
    console.log("yup, got a call")
    console.log("got a call")
    console.log("aha, a call")
});

function makeCall() {
    if(beingCalled) {
        navigator.mediaDevices.getUserMedia(
            { audio: true }).then(stream => {
                incomingCall.answer(stream);
                incomingCall.on("stream", (remoteStream) => {                
                callAudio.srcObject = remoteStream;
                callAudio.play()
            });
            })
            
        ;
        return;
    }
    console.log("calling peer with id " + conn.peer)
    navigator.mediaDevices.getUserMedia(
        { audio: true }).then(stream => {
            console.log(stream)
            const call = peer.call(conn.peer, stream);
            call.on("stream", (remoteStream) => {
                callAudio.srcObject = remoteStream;
                callAudio.play()
            });
        })
        
    ;
}



var userMessage = document.getElementById('user-message');
function submitButton()
{
    if(connected)
    {
        conn.send(textarea.value);
        userMessage.textContent = textarea.value
    }
    else
    {
        let peer_id = textarea.value;
        console.log(peer_id);
        
        console.log("Starting connection...");
        conn = peer.connect(peer_id);
        console.log("Finished connection...");
        make_connection();
    }
    textarea.value = ""
}

var peersMessage = document.getElementById("peer-message");
function make_connection()
{
    conn.on('data', function(data) {
        peersMessage.textContent = data;
    });
    let peersDiv = document.getElementById('peer-div');
    let userDiv = document.getElementById('user-div');
    peersDiv.style.display = "flex";
    userDiv.style.display = "flex";
    callBtn.style.display = "block";
    title.textContent = "Send a message!";
    button.textContent = "Send!"
    connected = true;
}