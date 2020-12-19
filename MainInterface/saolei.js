document.body.onselectstart = document.body.ondrag = document.body.oncontextmenu = function () {
    return false;
}
var li = document.getElementsByTagName('li');
var boomValue = randomNumber(10, 0, 100);
for (let i = 0; i < 10; i++) {
    li[boomValue[i]].setAttribute("boomType", '');
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
    li[i].oncontextmenu=function(){
        liOncontextListener(i);
    }
}

function liOnclickListener(key) {
    if (li[key].hasAttribute("boomType")) {
        for (let i = 0; i < 10; i++) {
            li[boomValue[i]].style.backgroundImage = "url(assets/boom.png)"
        }
    } else if(li[key].hasAttribute('flagType')){
        li[key].removeAttribute("style");
        li[key].removeAttribute('flagType');
    }else {
        checkNull(key);

    }
}
function liOncontextListener(key){
    li[key].setAttribute('flagType','');
li[key].style.backgroundImage="url(assets/flag.png)";
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
    /* 如果这个值等于0，先返回周围的几个位置，如果这几个位置的值也有0，那么再次执行这个函数，不会找已经被点击过的位置 */
    if (li[key].getAttribute('count') == '0') {
        var arr = checkBoomNumber(key);
        var newarr = new Array();
        for (let i = 0; i < arr.length; i++) {
            if (!li[arr[i]].hasAttribute('isshow')) {
                newarr.push(arr[i]);
            }

        }
        for(let i=0;i<newarr.length;i++){
            changebg(newarr[i]);
            if(li[newarr[i]].getAttribute('count')=='0'){
                checkNull(newarr[i]);
            }
        }
    }else{
        changebg(key);
    }
}
    function changebg(key) {
        li[key].style.backgroundColor = "rgb(250, 226, 195)";
        li[key].innerText = li[key].getAttribute('count');
        li[key].setAttribute("isshow", '');
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
