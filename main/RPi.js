var channel;
var port;

main();

async function main() {
  var i2cAccess = await navigator.requestI2CAccess();
  var portTemp = i2cAccess.ports.get(1);
  var portDis = i2cAccess.port.get(/*ポート番号*/);
  var portM = i2cAccess.ports.get(/*ポート番号*/);
  tmp = new MLX90614(portTemp);
  dis = new VL53L0X(portDis);
  var pca9685 = new PCA9685(portM, 0x40);
  await tmp.init();
  await dis.init();
  
  var angle = 0;
  var duty1 = 0;
  var posiData = 0;

  var relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("chirimenSHT");
  msgDiv_tmp.innerText = "web socketリレーサーバーに接続しました";
  channel.onmessage = transmitSensorData;
}

async function transmitSensorData(messge) {
  if (messge.data == "GET SENSOR DATA") {
    hello.innerText = "GET!";
    var sensorTemp = await readTemp();
    var sensorDis = await readDis();
    var flagDeg = await deg();  // flagDeg = flag1
    channel.send(sensorTemp);
    msgDiv_tmp.innerText = sensorTemp+"℃";
    msgDiv_dis.innerText = sensorDis+"mm";
    if (sensorDis >= 100 & flagDeg == 1) {   //温度とズレの条件式
      channel.send("OK");
      discordSend("Discord!");
    }
  }
}

async function readTemp() {
  var tmpData = await tmp.get_obj_temp();
  console.log("tmpData:", tmpData.toFixed(2));
  return tmpData.toFixed(2);
}

async function readDis() {
  var disData = await dis.getRange();
  console.log("disData:", disData.toFixed(2));
  return disData;
}

async function deg() {
  // console.log("angle"+angle);
  // servo setting for sg90
  // Servo PWM pulse: min=0.0011[sec], max=0.0019[sec] angle=+-60[deg]
  await pca9685.init(0.001, 0.002, 5); // 3つ目の引数が、角度！
  for (;;) {
    if (angle < 180) {
      {
        angle = angle <= 180 ? 1 : -1;
        await sleep(5000000000000);
      }
    }
    /// console.log("angle"+angle);
    await pca9685.setServo(0, angle);
    // console.log('value:', angle);
    head.innerHTML = angle;
    await sleep(80000000000000);
    
    //posiDataを更新！モーター5°回転
    //psiDataを更新（sinを使う）
    
    //if (DstData - posiData > 30 ) {
        flag1 = 1;
    //} else {
        //flag1 = 0;
    //}
        
        //押しつけ、持ち上げを上昇！

      return flag1;
    }
}

//discord にメッセージを送信
function discordSend(message) {
  const encoded = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTA2NjI0NTYxMTY0NjYxOTY3OC9oYWt6bEVDMEk0enJsVGZWa01TUXl0cFdSM0wzTUVabWlrZHBjSjhhRm5Fbng1aFR3UWk4LTMwMDlMWEF6dWVmSmFsUw==";
  const url = atob(encoded);
  const data = {
    content: message
  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  console.log("send.");
}