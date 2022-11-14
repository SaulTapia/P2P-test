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

function submitButton()
{
    if(connected)
    {
        conn.send(textarea.value);
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
}

var peersMessage = document.getElementById("peer-message");
function make_connection()
{
    conn.on('data', function(data) {
        peersMessage.textContent = data;
    });
    let peersDiv = document.getElementById('peer-div');
    peersDiv.style.display = "block";
    title.textContent = "Send a message!";
    button.textContent = "Send!"
    connected = true;
}