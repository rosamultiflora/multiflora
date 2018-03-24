var chess = document.getElementById('chessbord');
var hui = document.getElementById("huiqi");//悔棋键
var flag = true;  //实现黑白棋交叉落子，默认true为黑棋
var win = [];  //列举出所有赢法的数组
var chessflag = [];  //记录棋子颜色，黑棋为1，白棋为2
var blackwin = [];   //黑棋赢法
var whitewin = [];   //白起赢法
var over = false;  //游戏结束标志
var regartflag = 0;//悔棋标志，每次只可以悔一步棋
var nowX;
var nowY;
for(var i=0;i<15;i++){
    chessflag[i] = [];
    for(var j=0;j<15;j++){
        chessflag[i][j] = 0;
    }
}
for(var i=0;i<15;i++){
    win[i] = [];
    for(var j=0;j<15;j++){
        win[i][j] = [];
    }
}
var winflag = 0;
for(var i=0;i<15;i++){  //列出所有横行的赢法
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            win[i][j+k][winflag] = true;
        }
        winflag++;
    }
}
for(var i=0;i<15;i++){    //列出所有竖线赢法
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            win[j+k][i][winflag] = true;
        }
        winflag++;
    }
}
for(var i=0;i<11;i++){    //列出所有正斜线
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            win[i+k][j+k][winflag] = true;
        }
        winflag++;
    }
}
for(var i=0;i<11;i++){    //列出所有反斜线
    for(var j=14;j>3;j--){
        for(var k=0;k<5;k++){
            win[i+k][j-k][winflag] = true;
        }
        winflag++;
    }
}
for(var i=0;i<winflag;i++){
    blackwin[i] = 0;
    whitewin[i] = 0;
}



var qizi = chess.getContext('2d');
/*var pic = new Image();
pic.src = "image/pic3.png";*/
//pic.onload = function () {
    //qizi.drawImage(pic, 0, 0, 900, 900);    //添加水印图片

    for (var i = 0; i < 15; i++) {                  //画棋盘
        qizi.moveTo(30 + i * 60, 30);
        qizi.lineTo(30 + i * 60, 870);
        qizi.stroke();
        qizi.moveTo(30, 30 + i * 60);
        qizi.lineTo(870, 30 + i * 60);
        qizi.stroke();
    }
//}
    var putDown = function (i, j, now) {
        qizi.beginPath();
        qizi.arc(30 + i * 60, 30 + j * 60, 20, 0, 2 * Math.PI);
        qizi.closePath();
        qizi.stroke();
        var pawn = qizi.createRadialGradient(30 + i * 60 - 3, 30 + j * 60 + 3, 20, 30 + i * 60, 30 + j * 60, 0);
        if (now) {
            pawn.addColorStop(0, "#0A0A0A");
            pawn.addColorStop(1, "#636766");
        } else {
            pawn.addColorStop(0, "#D1D1D1");
            pawn.addColorStop(1, "#F9F9F9");
        }
        qizi.fillStyle = pawn;
        qizi.fill();

    }
    var judgementcolor = function (i,j,color) {

        for(var k=0;k<winflag;k++) {
            if (win[i][j][k]) {
                if (color == 1) {
                    blackwin[k]++;
                    if (blackwin[k] == 5) {
                        setTimeout(function () {
                            window.alert("blackwin!")
                            over = true;
                        }, 50)
                    }
                }
                if (color == 2) {
                    whitewin[k]++;
                    if (whitewin[k] == 5) {
                        setTimeout(function () {
                            window.alert("whitewin!")
                            over = true;
                        }, 50)
                    }
                }

            }
        }

    }
    chess.onclick = function (m) {
    if(over){
        return;
    }
        var x = m.offsetX;
        var y = m.offsetY;
        var i = Math.floor(x/60);
        var j = Math.floor(y/60);
        nowX = i;
        nowY = j;
        if(chessflag[i][j] !=0){
            return;
        }
        if(chessflag[i][j] == 0){
        putDown(i,j,flag);
            if(flag){
            chessflag[i][j] = 1;
        }else{
                chessflag[i][j] = 2;
             }
        }
        flag = !flag;
        judgementcolor(i,j,chessflag[i][j]);
    }
    var regartjudgement = function (i,j,regartcolor) {
        for(var k=0;k<winflag;k++) {
            if (win[i][j][k]) {
                if (regartcolor == 1) {
                    blackwin[k]--;
                }
                if (regartcolor == 2) {
                    whitewin[k]--;
                }

            }
        }
    }
    var regart = function (i,j) {
        if(regartflag == 0) {
            regartjudgement(i, j, chessflag[i][j]);
            qizi.clearRect(i * 60 + 9, j * 60 + 9, 42, 42);
            qizi.beginPath();
            qizi.moveTo(9 + i * 60, j * 60 + 30);
            qizi.lineTo(56 + i * 60, j * 60 + 30);
            qizi.closePath();
            qizi.stroke();
            qizi.beginPath();
            qizi.moveTo(30 + i * 60, j * 60 + 9);
            qizi.lineTo(30 + i * 60, j * 60 + 56);
            qizi.closePath();
            qizi.stroke();
            chessflag[i][j] = 0;
            flag = !flag;
            regartflag++;
            return;
        }
        if(regartflag !=0){
            alert("只可以悔一步棋！");
            regartflag = 0;
        }
    }



