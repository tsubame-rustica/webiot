//リモートでON・OFF
// 温度を検知する
// 食品を刺したり、押したりして柔らかさを測定する
// 上記2つの条件を達成したらイベントを起こす

main()

async function main() {
    const tempDis = document.getElementById("tempDis"); //温度表示用
    const temp_i2cAccess = await navigator.requestI2CAccess();
    const temp_port = temp_i2cAccess.ports.get(1);
    const sht30 = new SHT30(temp_port, 0x44);
    await sht30.init();

    const result = document.getElementById("result")

    // 食材の硬さを検知するプログラム
    const preDis = document.getElementById("preDis"); //圧力表示用
    //以下のような処理をしたい
      /*const temp_i2cAccess = await navigator.requestI2CAccess();
        const temp_port = temp_i2cAccess.ports.get(1);
        const sht30 = new SHT30(temp_port, 0x44);
        await sht30.init(); */

    while (true) {
        const {temperature } = await sht30.readData();
        tempDis.innerHTML = `${temperature.toFixed(2)} ℃`;

        //こんな感じの処理をしたい
          /*const {pressure } = await hoge.readData();
            preDis.innerHTML =`${pressure.toFixed(2)} N`; */

        await sleep(500); // 0.5s待機
        // 温度が(100℃)になったら
        if (tempDis.innerHTML >= 100 && tempDis.innerHTML >= "ここに指定の値を入れる" ) {
            //ここに条件達成時の処理を書く
            result.innerHTML = "True";
        } else {
            result.innerHTML = "False";
        }
      }
}

