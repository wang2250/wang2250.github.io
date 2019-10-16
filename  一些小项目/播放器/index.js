var bofang = document.getElementsByClassName("iconyixianshi-")[0];
var zanting = document.getElementsByClassName("iconzanting")[0];
var model = document.getElementsByClassName('model')[0];
var tool_bar = document.getElementsByClassName('tool_bar')[0];
var oVideo = document.getElementsByTagName('video')[0];
var b2 = document.getElementsByClassName('b2')[0];
var b1_5 = document.getElementsByClassName('b1_5')[0];
var b1 = document.getElementsByClassName('b1')[0];
var b0_5 = document.getElementsByClassName('b0_5')[0];
var time_now = document.getElementsByClassName('time_now')[0];
time_now.innerHTML = "<span class = 'fenz1'>0</span><span class = 'fenz'>0</span><span>:</span><span class = 'miao1'>0</span><span class = 'miao'>0</span>";
var miao = document.getElementsByClassName('miao')[0];
var miao1 = document.getElementsByClassName('miao1')[0];
var fenz = document.getElementsByClassName('fenz')[0];
var fenz1 = document.getElementsByClassName('fenz1')[0];
var anniu = document.getElementsByClassName('anniu')[0];




var fen = 0;
var shi = 0;
var timer = null;
var jj = 0;
var isp = 9;

//时间变化函数
function fn1(){
    fen++;
   console.log(Math.ceil(oVideo.currentTime));
   anniu.style.left = anniu.offsetLeft+isp+'px';

    if (fen == 60) {
        fen = 0;
        shi++;
        if(shi>=10){
            fenz1.innerHTML ='';
        }
        fenz.innerHTML = shi;

    }
    if (fen >= 10) {
        miao1.innerHTML = '';
    } else {
        miao1.innerHTML = 0;
    }
    miao.innerHTML = fen;

    if(time_now.innerText.toString() == '00:53'){
        clearInterval(timer);
        setTimeout(function(){
            zanting.className = 'iconfont iconzanting1';
            jj = 1;  
    },900)
    }
}
//拖动运动
function moveBlack(elem){

    elem.onmousedown = function(e){
    
    e = e || window.event;
    
    var cha_x  = e.pageX - elem.offsetLeft;
    
    document.onmousemove = function(e){
    
    e = e || window.event;
    var on_x = e.pageX -cha_x;
    
    elem.style.left =on_x +'px';
    console.log(elem.offsetLeft);
    }
    
    document.onmouseup = function(){
       
        document.onmousemove = null;
    }
    
    }
    
    }
     moveBlack(anniu);
//点击时播放
bofang.addEventListener('click', function () {

    bofang.style.transform = 'rotateX(180deg) scale(2)';
    bofang.style.opacity = 0;
    model.style.opacity = 0;
    //控制条隐藏
    setTimeout(function () {
        tool_bar.style.marginBottom = '-40px';
    }, 3000)
    //开始播放
    setTimeout(function () {
        oVideo.play();
        //时间变化
        timer =   setInterval(fn1 , 1000);


    }, 30)

}, false)
var num = 0;
zanting.addEventListener('click', function () {

    oVideo.pause();
    clearInterval(timer);
    zanting.className = 'iconfont iconzanting1';

    num++;
    if (num >= 2 || jj==1) {

        oVideo.play();
        if(time_now.innerText.toString() == '00:53'){
          fen = 0;
          shi = 0;
          anniu.style.left = 0+'px';
        }
       timer = setInterval(fn1 , 1000);
        num = 0;
        zanting.className = 'iconfont iconzanting';
        jj = 0;
    }

}, false)

b2.addEventListener('click', function () {

    oVideo.play(); oVideo.playbackRate = 2;

}, false)
b1_5.addEventListener('click', function () {

    oVideo.play(); oVideo.playbackRate = 1.5;

}, false)
b1.addEventListener('click', function () {

    oVideo.play(); oVideo.playbackRate = 1;

}, false)
b0_5.addEventListener('click', function () {

    oVideo.play(); oVideo.playbackRate = 0.5;
}, false)
