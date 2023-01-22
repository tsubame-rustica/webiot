<!doctype html>
<html>
<head>
<meta charset="utf-8" />
</head>
<script type="module" src="https://chirimen.org/remote-connection/js/beta/RelayServerGlobal.js"></script>
<script src="pc.js"></script>
<link rel="stylesheet" href="pc.css">
<body>

<input type="button" onclick="getData()" value="測定を開始する"></input>

<div id="messageDiv">---</div>

<h1>牛すじ　煮込み具合のお好みは？</h1>
    <h2>お肉のかたさはいかが？</h2>
    <input
        class="kata_in"
        id="katasaInput"
        type="range"
        value="0"
        min="1"
        max="5"
        step="1"
        onchange="setkatasa(event)"
        oninput="showkatasa(event)"
        /><span id="katasaGuide">0</span>
        <div id="katasadiv"></div>

    <h2>お肉のかたさはいかが？その２</h2>
    <input type="button" onclick="katasapwm(0.1)" value="超やわらか～い"></input> 
    <input type="button" onclick="katasapwm(0.2)" value="やわらかい"></input>
    <input type="button" onclick="katasapwm(0.3)" value="鳥取名物！"></input>
    <input type="button" onclick="katasapwm(0.4)" value="ちょっとかたい"></input>
    <input type="button" onclick="katasapwm(0.5)" value="超かたい"></input>
    <br>
    <div id="katasaDiv"></div>
    <br>
    <h1>牛すじ煮込み装置設定</h1>
    <h2>牛すじ煮込み位置</h2>
        <input type="button" onclick="nikomipwm(0.1)" value="低い"></input> 
        <input type="button" onclick="nikomipwm(0.2)" value="真ん中"></input>
        <input type="button" onclick="nikomipwm(0.3)" value="高い"></input>
    <h2>牛すじ上昇高さ</h2>
        <input type="button" onclick="nikomipwm(0.1)" value="低い"></input> 
        <input type="button" onclick="nikomipwm(0.2)" value="真ん中"></input>
        <input type="button" onclick="nikomipwm(0.3)" value="高い"></input>
    <h2>牛すじ上昇速度</h2>
        <input type="button" onclick="nikomipwm(0.1)" value="遅い"></input> 
        <input type="button" onclick="nikomipwm(0.2)" value="ちょうどよい"></input>
        <input type="button" onclick="nikomipwm(0.3)" value="早い"></input>
</body>
</html>
