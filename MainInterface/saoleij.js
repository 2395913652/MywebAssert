var ul = document.getElementsByTagName('ul')[0];
var li = ul.getElementsByTagName('li');
var bt=document.getElementsByTagName('button')[0];
for (var i = 0; i < li.length; i++) {
    li[i].setAttribute("istouch", "flase");
    li[i].setAttribute("position", (i < 10 ? i : i % 10) + " " + parseInt(i / 10));
    li[i].setAttribute("count", 0);
    //x,y坐标值
    /* parseInt(li[i].getAttribute("position").match(/[0-9][ ]/));
    parseInt(li[i].getAttribute("position").match(/[ ][0-9]/));; */
}
bt.onclick=function(){
    create();
}
ul.onmouseover = function (e) {
    
    e.target.style.borderColor = "yellow";
}
ul.onmouseout = function (e) {

    e.target.style.borderColor = "rgb(229,184,177)";
}
ul.oncontextmenu=function(e){
    e.target.style.background="url(flag.png)"
}

ul.onclick=function(e){
    clear(e);
}
create();
function create() {
    var boomArr = newRandomNumber(10, 0, 99);
    for (var i = 0; i < boomArr.length; i++) {
        li[boomArr[i]].setAttribute("value", "boom");
    }
    count(range(boomArr));
}
function clear(e) {
    var target = e.target;
    if (target.getAttribute("value") == "boom") {
        target.style.background = "url(boom.png)";

    } else if (target.getAttribute("count") == "0") {
        target.style.background="url(num"+target.getAttribute("count")+".png)";
        target.setAttribute("istouch", "true");
        var zeroarr = range([parseInt(target.getAttribute("position").match(/[0-9][ ]/)) + parseInt(target.getAttribute("position").match(/[ ][0-9]/)) * 10]);
        function zero(zeroarr) {
            var newarr = new Array;
            for (var i = 0; i < zeroarr.length; i++) {

                li[zeroarr[i]].setAttribute("istouch", "true");
                li[zeroarr[i]].style.background="url(num"+li[zeroarr[i]].getAttribute("count")+".png)";
                if (parseInt(li[zeroarr[i]].getAttribute("count")) == 0) {
                    newarr.push(zeroarr[i]);
                }
            }
            if (newarr.length == 0) {
                return 0;
            }
            zero(range(newarr));
        }
        zero(zeroarr);
    } else {
        target.style.background="url(num"+target.getAttribute("count")+".png)";
        target.setAttribute("istouch", "true");
    }
}
function show() {
    // 将单元格周围的个数和雷展示出来
    for (var i = 0; i < li.length; i++) {

        if (li[i].getAttribute("value") == "boom") {
        } else {
            li[i].innerHTML = li[i].getAttribute("count");

        }
    }
}
function count(arr) {
    // 计算单位元周围雷的个数
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != -1)
            li[arr[i]].setAttribute("count", parseInt(li[arr[i]].getAttribute("count")) + 1);

    }
}

function range(arr, istouch) {
    // 传入值数组，返回每个值的周边八个位置和自己的值，如果不存在返回-1
    arr = coordinate(arr);
    var brr = new Array();
    for (var i = 0; i < arr.length; i++) {
        brr[i] = new Array();
        var count = 0;
        for (var j = -1; j < 2; j++) {
            for (var k = -1; k < 2; k++) {

                brr[i][count] = [arr[i][0] + j, arr[i][1] + k];
                count++;
            }
        }
        coordinatevalue(brr[i]);

    }
    var crr = new Array;
    for (var i = 0; i < brr.length; i++) {
        for (var j = 0; j < brr[i].length; j++) {
            if (brr[i][j] != -1 && li[brr[i][j]].getAttribute("istouch") != "true") {
                crr.push(brr[i][j]);
            }

        }
    }

    return crr;
}
function coordinate(arr) {
    //传入一串值数组转换为[x,y]形式
    for (var i = 0; i < arr.length; i++) {
        arr[i] = [parseInt(arr[i] / 10), arr[i] % 10]
    }
    return arr;
}
function coordinatevalue(arr) {
    // 传入[x,y]数组输出对应值
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i][0] < 0 || arr[i][0] > 9 || arr[i][1] < 0 || arr[i][1] > 9)) {
            arr[i] = arr[i][0] * 10 + arr[i][1];
        } else {
            arr[i] = -1;
        }


    }
}
function newRandomNumber(n, a, b) {
    //生成一个数组，其中包括n个不重复从a-b的随机数字
    var arr = new Array();
    for (var i = 0; i < n; i++) {
        arr[i] = equal(randomnum(), arr);
    }

    function randomnum() {
        //生成一个随机数
        return parseInt(Math.random() * (b - a) + a);
    }

    function equal(num, arr) {
        //生成一个不会与传入数组相同的随机数
        if (arr.length == 0) {
            return num;
        }
        for (var i = 0; i < arr.length; i++) {
            if (num == arr[i]) {
                return equal(randomnum(), arr);
            }
        }
        return num;
    }

    return arr;
}
