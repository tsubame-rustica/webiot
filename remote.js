var channel;
var port;

main();

async function main() {
  // I2Cポートと、I2CデバイスSHT30の初期化
  var i2cAccess = await navigator.requestI2CAccess();
  var i2cPort = i2cAccess.ports.get(1);
  mlx = new MLX90614(i2cPort);
  await mlx.init();

  // webSocketリレーの初期化
  var relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("chirimenSHT");
  msgDiv.innerText = " web socketリレーサービスに接続しました";
  channel.onmessage = transmitSensorData;
}

async function transmitSensorData(messge) {
  msgDiv.innerText = messge.data;
  if (messge.data == "GET SENSOR DATA") {
    var sensorTemp = await readData();
    hello.innerText = "GET!";
    channel.send(sensorTemp);
    //msgDiv.innerText = JSON.stringify(sensorData);
    msgDiv.innerText = "Hello!";
    if (sensorTemp >= 40) {
      channel.send("OK");
    }
  }
}

async function readData() {
  var mlxData = await mlx.get_obj_temp();
  console.log("mlxData:", mlxData.toFixed(2));
  //msgDiv.innerHTML = "temperature:" + shtData.temperature + "degree  <br>humidity:" +shtData.humidity +"%";
  msgDiv.innerHTML = "HELLO!";
  return mlxData.toFixed(2);
}

