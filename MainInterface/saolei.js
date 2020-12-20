document.body.onselectstart = document.body.ondrag = document.body.oncontextmenu = function () {
    return false;
}
/* 初始属性值 */
var li = document.getElementsByTagName('li');
var input = document.getElementsByTagName('input');
var boomNum = parseInt(input[0].getAttribute('value'));//地雷的数量
var bt = document.getElementsByTagName('button');
var state = document.getElementsByClassName('state')[0];
start();//开始

bt[0].onclick = function () {
    format();
    start();
}
function format() {
    //对游戏进行格式化
    state.removeAttribute('style');
    for (let i = 0; i < li.length; i++) {
        li[i].removeAttribute('count');
        li[i].removeAttribute('boomType');
        li[i].removeAttribute('flagType');
        li[i].removeAttribute('isshow');
        li[i].removeAttribute('style');
        li[i].innerHTML = "";

    }
}
function start() {
    var flagNum = document.getElementsByClassName('flagNum')[0];
    boomNum = parseInt(input[0].value);
    state.innerHTML = 'gaming';
    flagNum.setAttribute('value', boomNum);
    flagNum.innerHTML = flagNum.getAttribute('value');
    var boomValue = randomNumber(boomNum, 0, 100);
    for (let i = 0; i < boomNum; i++) {
        li[boomValue[i]].setAttribute("boomType", '');
    }
    for (let i = 0; i < li.length; i++) {
        li[i].setAttribute("count", '0');
    }
    for (let i = 0; i < li.length; i++) {

        if (!li[i].hasAttribute('boomType')) {
            let arr = checkBoomNumber(i);
            for (let j = 0; j < arr.length; j++) {
                if (li[arr[j]].hasAttribute('boomType')) {
                    li[i].setAttribute('count', parseInt(li[i].getAttribute("count")) + 1)
                }

            }
        }
        li[i].onclick = function () {
            liOnclickListener(i);
        }
        li[i].oncontextmenu = function () {
            liOncontextListener(i);
        }
    }

    function liOnclickListener(key) {
        /* 左键点击事件 */
        if (li[key].hasAttribute('flagType')) {
            //如果是旗
            flagListener(key);

        }
        else if (li[key].hasAttribute("boomType")) {
            //如果是雷
            failed();

        } else {
            //如果是数字
            checkNull(key);
            if (flagNum.getAttribute('value') == '0') {
                success();
            }

        }
    }
    function liOncontextListener(key) {
        /* 右键点击事件 */
        if (!li[key].hasAttribute('isshow') && !li[key].hasAttribute('flagType')) {
            li[key].setAttribute('flagType', '');
            li[key].style.backgroundImage = "url(assets/flag.png)";
            flagNum.setAttribute('value', parseInt(flagNum.getAttribute('value')) - 1);
            flagNum.innerHTML = flagNum.getAttribute('value');
        }
        if (flagNum.getAttribute('value') == '0') {

            success();
        }

    }
    function flagListener(key) {
        li[key].removeAttribute("style");
        li[key].removeAttribute('flagType');
        flagNum.setAttribute('value', parseInt(flagNum.getAttribute('value')) + 1);
        flagNum.innerHTML = flagNum.getAttribute('value');
    }
    function changebg(key) {
        //单元格被点击后的状态
        li[key].style.backgroundColor = "rgb(250, 226, 195)";
        li[key].innerText = li[key].getAttribute('count');
        li[key].setAttribute("isshow", '');
    }
    function checkBoomNumber(key) {
        /* 传入自身位置，返回周边值数组 */
        const x = parseInt(key / 10);
        const y = key % 10;
        var arr = new Array();
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((x + i) >= 0 && (x + i) <= 9 && (y + j) >= 0 && (y + j) <= 9 && !(i == 0 && j == 0)) {
                    arr.push((x + i) * 10 + y + j);
                }
            }
        }
        return arr;

    }
    function checkNull(key) {
        /* 传入自身位置，如果周围有雷那么实现点击状态，如果没有雷即count=0，那么继续检测周围一圈位置是否还有count=0*/
        changebg(key);
        if (li[key].getAttribute('count') == '0') {
            var arr = checkBoomNumber(key);
            var newarr = new Array();
            for (let i = 0; i < arr.length; i++) {
                if (!li[arr[i]].hasAttribute('isshow')) {
                    newarr.push(arr[i]);
                }

            }
            for (let i = 0; i < newarr.length; i++) {
                changebg(newarr[i]);
                if (li[newarr[i]].hasAttribute('flagType')) {
                    flagListener();
                }
                if (li[newarr[i]].getAttribute('count') == '0') {
                    checkNull(newarr[i]);
                }
            }
        }
    }
    function end() {
        /* 结束鼠标左右键点击事件为空 */
        for (let i = 0; i < li.length; i++) {
            li[i].onclick = function () { };
            li[i].oncontextmenu = function () { };
        }
    }
    function success() {
        //游戏事件成功的状态
        var count = 0;
        for (var i = 0; i < li.length; i++) {
            if (!(li[i].hasAttribute('isshow') || li[i].hasAttribute('boomType'))) {
                count++;
            }

        }
        if (count == 0) {
            end();
            state.style.backgroundColor = "yellow";
            state.innerHTML = 'success';
        }
    }
    function failed() {
        //游戏失败的状态
        end();
        state.style.backgroundColor = 'red';
        state.innerHTML = 'failed';
        for (let i = 0; i < boomNum; i++) {
            if (!li[boomValue[i]].hasAttribute('flagType')) {
                li[boomValue[i]].style.backgroundImage = "url(assets/boom.png)"
            } else {
                li[boomValue[i]].style.backgroundImage = 'url(assets/boom0.png)'
            }
        }
    }

}


function randomNumber(n, a, b) {
    /* 生成n个a到b不重复的随机数 ，返回一个数组*/
    let newRandom = () => parseInt(Math.random() * (b - a) + a);
    let arr = new Array();
    function uniqRandomNumber(key) {
        /* 不出现重复 */
        if (key == 0) {
            return newRandom();
        }
        let num = newRandom();
        for (let i = 0; i < arr.length; i++) {
            if (num == arr[i]) {
                i = 0;
                num = newRandom();
            }
        }
        return num;

    }
    for (let i = 0; i < n; i++) {
        arr[i] = uniqRandomNumber(i);
    }
    return arr;
}
