function attack() {
    // window.scrollTo(0, 0);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 400;
    var string1 = "abcdefghijklmnopqrstuvwxyz";
    string1.split("");
    var fontsize = 20;
    columns = canvas.width / fontsize;
    var drop = [];
    for (var x = 0; x < columns; x++) {
        drop[x] = 0;
    }

    function drap() {
        ctx.fillStyle = "rgba(0,0,0,0.03)";
        ctx.fillRect(0, 0, canvas.width, canvas.height); //fillRect(x,y,width,height),x坐标、y坐标、width宽、height高
        ctx.fillStyle = "#0F0";
        ctx.font = fontsize + "px arial";
        for (var i = 0; i < drop.length; i++) {
            var text1 = string1[Math.floor(Math.random() * string1.length)];
            ctx.fillText(text1, i * fontsize, drop[i] * fontsize); //fillText(text,x,y,maxWidth),text画布文本、开始绘制文本的 x 坐标位置、开始绘制文本的 y 坐标位置、可选。允许的最大文本宽度，以像素计
            drop[i]++;
            if (drop[i] * fontsize > canvas.height && Math.random() > 0.9) { //90%的几率掉落
                drop[i] = 0;
            }
        }
        if (!window.attackRain) {
            requestAnimationFrame(drap);
        }
    }
    drap();
}

function chooseLabel() {
    document.getElementById('attack').style.transform = 'scale(0)';
    setTimeout(function () {
        document.getElementById('attack').className = 'hide';
        document.getElementById('attack_wrap').className = '';
        setTimeout(function () {
            document.getElementById('attack_wrap').style.transform = 'scale(1)';
        }, 100);
    }, 1000);
}

var labelItem = document.getElementsByClassName('label_item');
var stopChange = false;
var num = 0;
var startStatus = false;

for (var i = 0; i < labelItem.length; i++) {
    labelItem[i].onclick = function () {
        if (num > 0) {
            startStatus = true;
            startAttack();
            return;
        }
        setTimeout(function () {
            if (!startStatus) {
                startAttack();
            }
        }, 1500)
        window.speac = this.innerText;
        this.style.backgroundColor = '#ee7c1a';
        this.style.color = '#fff';
        num++;
    }
}

var limitButton = false;
function startAttack() {
    if (limitButton) {
        return;
    }
    limitButton = true;
    function changeColor() {
        if (stopChange) {
            document.getElementById('attack_color').style.display = 'none';
        } else {
            document.getElementById('attack_color').style.display = Math.random() > 0.7 ? 'block' : 'none';
            requestAnimationFrame(changeColor);
        }
    }
    changeColor();
    document.body.style.animation = 'attack_shake 1s ease infinite';
    setTimeout(function () {
        attack();
    }, 2000);
    setTimeout(function () {
        document.body.style.animation = '';
        stopChange = true;
    }, 2500);

    setTimeout(function () {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    }, 6500)
    setTimeout(function () {
        window.attackRain = true;
        anmt5();
        setPerc();
    }, 7000)
}