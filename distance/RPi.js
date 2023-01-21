var channel;
var port;

main();

async function main() {
  // I2C\u30dd\u30fc\u30c8\u3068\u3001I2C\u30c7\u30d0\u30a4\u30b9SHT30\u306e\u521d\u671f\u5316
  var i2cAccess = await navigator.requestI2CAccess();
  var i2cPort = i2cAccess.ports.get(1);
  mlx = new VL53L0X(i2cPort);
  await mlx.init();

  // webSocket\u30ea\u30ec\u30fc\u306e\u521d\u671f\u5316
  var relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("chirimenSHT");
  msgDiv_tmp.innerText =
    " web socket\u30ea\u30ec\u30fc\u30b5\u30fc\u30d3\u30b9\u306b\u63a5\u7d9a\u3057\u307e\u3057\u305f";
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
  var mlxData = await mlx.getRange();
  msgDiv_tmp.innerText = "A";
  console.log("mlxData:", mlxData.toFixed(2));
  msgDiv_tmp.innerText = "B";
  //msgDiv.innerHTML = "temperature:" + shtData.temperature + "degree  <br>humidity:" +shtData.humidity +"%";
  msgDiv_tmp.innerHTML = "HELLO!";
  return mlxData.toFixed(2);
}
