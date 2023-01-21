var channel;
var port;

main();

async function main() {
  // I2Cポートと、I2CデバイスSHT30の初期化
  var i2cAccess = await navigator.requestI2CAccess();
  var tmp_port = i2cAccess.ports.get(1);
  var dst_port = i2cAccess.port.get(/*ポート番号*/);
  tmp = new tmp90614(tmp_port);
  /*dst = new 品番(dst_port);*/ 
  await tmp.init();
  await dst.init();

  // webSocketリレーの初期化
  var relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("chirimenSHT");
  msgDiv.innerText = " web socketリレーサービスに接続しました";
  channel.onmessage = transmitSensorData;
}

async function transmitSensorData(messge) {
  msgDiv.innerText = messge.data;
  if (messge.data == "GET SENSOR DATA") {
    var sensorTemp = await readTemp();
    var sensorDistance = await readDistance();
    channel.send(sensorTemp);
    msgDiv.innerText = JSON.stringify(sensorData);
    if (sensorTemp >= 40 & sensorDistance >= 10) {
      channel.send("OK");
      hello.innerText = "OK!";
    }
  }
}

async function readTemp() {
  var tmpData = await tmp.get_obj_temp();
  console.log("tmpData:", tmpData.toFixed(2));
  msgDiv_tmp.innerHTML = "temperature:" + shtData.temperature + "degree  <br>humidity:" +shtData.humidity +"%";
  return tmpData.toFixed(2); //round
}

async function readDistance() {
  var dstData = await dst.getRange();
  msgDiv_dst.innerHTML = "Distance" + dstData+"";
  return dstData;
}
