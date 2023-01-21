// Remote Example1 - controller

var channel;
onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" );
	channel = await relay.subscribe("gyuusuzi");
	messageDiv.innerText=" web socketリレーサービスに接続しました";
	channel.onmessage = getMessage;
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
	messageDiv.innerText = msg.data;
}

function OnSwitch(){ // SWITCH ON
	channel.send("SWITCH ON");
}
function OffSwitch(){ // SWITCH OFF
	channel.send("SWITCH OFF");
}