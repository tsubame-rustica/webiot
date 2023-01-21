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
  msgDiv_tmp.innerText = " web socketリレーサービスに接続しました";
  channel.onmessage = transmitSensorData;
}

async function transmitSensorData(messge) {
  // msgDiv_tmp.innerText = messge.data;
  if (messge.data == "GET SENSOR DATA") {
    hello.innerText = "GET!";
    var sensorTemp = await readData();
    channel.send(sensorTemp);
    //msgDiv.innerText = JSON.stringify(sensorData);
    msgDiv_tmp.innerText = "C";
    msgDiv_tmp.innerText = sensorTemp;
    if (sensorTemp >= 40) {
      channel.send("OK");
    }
  }
}

async function readData() {
  msgDiv_tmp.innerText = "Hello!";
  var mlxData = await mlx.get_obj_temp();
  msgDiv_tmp.innerText = "A";
  console.log("mlxData:", mlxData.toFixed(2));
  msgDiv_tmp.innerText = "B";
  //msgDiv.innerHTML = "temperature:" + shtData.temperature + "degree  <br>humidity:" +shtData.humidity +"%";
  msgDiv_tmp.innerHTML = "HELLO!";
  return mlxData.toFixed(2);
}
