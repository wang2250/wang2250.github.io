//圣杯模式

    var F = (function () {
       //创建中间函数的作用修改自己的原型属性不会硬性父级
        var   F = function () {

        }
        return function (target,origin) {

            F.prototype = origin.prototype;
            target.prototype = new F();
            target.prototype.constructor = target;
        }

    }())
    function Son() {

    }
    function Father() {

    }
    F(Son,Father);
    var son = new Son();
    var father  = new Father();

//深度克隆
    function colen(target,origin) {

        target = target || {};
        var a = Object.prototype.toString;
        for (var p in origin) {
            if(origin.hasOwnProperty(p)) {
                if (typeof (origin[p]) == 'object') {
                    target[p] = a.call(target[p]) == '[object Array]'? [] :{};
                    colen(target[p],origin[p]);
                } else{
                    target[p] = origin[p];
                }

            }
        }

    }
    var obj = {
        a:123,
        b:234
    };
    var obj1 = {};

    colen(obj1,obj);

//数组去重   还可以用数组的indexOf方法  和includes 和 es6的set

    Array.prototype.qc = function () {

        var arr1 =[];
        var obj = {};
        for(var i = 0;i<this.length;i++){
            if(!obj[this[i]]){
                obj[this[i]] = 'abc';
                arr1.push(this[i]);
            }
        }
        return  arr1;
    };


    //es6 set

    var arr = [...new set([1,2,3,4,3,2,1])]

//在原型链上实现push方法

Array.prototype.push = function () {

    for(var i= 0; i<arguments.length;i++)
        this[this.length++] = arguments[i];

    return this.length;
}

var arr = [1,2,3];

//在原型链上编程不用chilren方法便可实现其功能

 Element.prototype.mychild = function () {

    var child = this.childNodes;
     var arr1 = [];
     for(var i =0;i<child.length;i++){

         if(child[i].nodeType === 1)
             arr1.push(chuild[i]);
     }
    return arr1;
 }





//获取属性
function getStyle(elem,prop){
    //ie
     if(window.getComputedStyle){
      
         return window.getComputedStyle(elem,null)[prop];
     }else{
         return elem.currentStyle[prop];
     }



      }
//封装函数绑定
function add(elem,type,handle){
        if(elem.addEventListener){
            elem.addEventListener(type,handle,false);
        }else if(elem.attachEvent){
            elem.attachEvent('on' + type,function(){
                handle.call(elem);
            })
        }else{
            elem['on' + type] = handle;
        }
    }
//封装阻止冒泡函数
function stopBubble(e){

if(e.stopPropagation){
   e.stopPropagation();
}else{
   window.e.cancelBubble = true;
}
}
//封装阻止右击出事件

function cancelHandler(e){
   
  if(e.preventDefault){
      e.preventDefault();
  }else{
      window.e.returnValue = false;
  }
}

//鼠标拖动小方块
function moveBlack(elem){

elem.onmousedown = function(e){

e = e || window.event;

var cha_x  = e.pageX - elem.offsetLeft;//鼠标点击的地方与方块left之间的差值

document.onmousemove = function(e){

e = e || window.event;

var on_x = e.pageX -cha_x;

elem.style.left =on_x +'px';



}

elem.onmouseup = function(){
   
    document.onmousemove = null;
}

}

}


//封装异步加载 按需求加载

function loadScript(url,callback){
    var script = document.createElement('script');
    script.type = ""
    //ie方法
    if(script.readyState){
        script.onreadyStatechange = function (){
            if(script.readyState == 'complete' || script.readyState == 'laded'){
               callback();
            }
        }
    }else{
        script.onload = function (){
            callback();
        }
    }
   script.src = url;
   document.head.appendChild (script);

}
//把script标签写在上边而且要等dom树解析完在执行
docuemnt.addEventListener('DOMContentloaded',function(){

//dom树解析完才会触发此事件  




},false)

//监听键盘获取密码
//<input type="text" value="请输入" onfocus="if(this.value == '请输入'){this.value =''} " onblur="if(this.value == ''){this.value ='请输入'}">
var ss = '';
    var inp = document.getElementsByTagName('input')[0];
    document.onkeydown = function (e){
       ss = ss + String.fromCharCode(e.keyCode);//转化为数字
    }

// 四舍五入法
function round(num,d){
   
   num = num * Math.pow(10,d);
   num = Math.round(num);
   

   return  num = num / Math.pow(10,d);
}
//随机数
function getRandom(max,min){

    var dec = max- min;

    return Math.floor(Math.random()*dec+min);
}
//运动框架（缓冲运动）
function startMove(obj,json,callBack) {

        clearInterval(obj.timer);
        var isp , icur;
        obj.timer = setInterval(function(){
            var beStop = true;
            for(var attr in json){
          
          if(attr == 'opacity'){
              icur = parseFloat(getStyle(obj,'opacity'))*100;
          }else{
              icur = parseInt(getStyle(obj,attr))
          }
          //值越来越小
           isp =(json[attr] - icur)/7;
           isp = isp>0?Math.ceil(isp):Math.floor(isp);
           if(attr == 'opacity'){
               obj.style.opacity = (icur + isp )/100;
           }else{
               obj.style[attr] = (icur + isp ) + 'px';
           }
      //检测是否运动完  只要有一个属性没到达目标值 beStop = false
      if(json[attr] != icur){
          beStop = false;
      }

    }
       //运动完后
     if(beStop){
        clearInterval(obj.timer);
        typeof callBack == 'function' ? callBack():'';

     }
 },30)
           
}

//加速运动
function move(elem){
elem.onclick = function(){

    clearInterval(div.timer);
     elem.timer = setInterval(function(){
     //offsetLeft越来越大 /8 也原来越大
      var isp = (parseInt(getStyle(div,'left'))+4)/8;

      elem.style.left = elem.offsetLeft + isp + 'px';

      if(elem.offsetLeft >= 600){
        clearTimeout(elem.timer);
        elem.style.left = '600px';
      }
     },30)
   }
}
//回弹运动
elem.onclick = function(){
   
    clearInterval(div.timer);
    var isp = 0;
     elem.timer = setInterval(function(){
     
      isp += (600-elem.offsetLeft)/8;
      isp *= 0.8;
      elem.style.left = elem.offsetLeft + isp + 'px';

     
     },30)
   }



//类数组转换为数组
//[].slice.call(类数组) 从0位开始截取全部截取
//数组转化为类数组
//[].push.apply({},[要转化的数组])

//封装foreach方法
Array.prototype.myForEach = function(func){
       for(var i= 0; i<this.length;i++){
         func(this[i],i);
       }
  }
  arr.myForEach(function(elem,index){
      console.log(index);
  })


//用数组的reduce方法实现map
var arr = [1,2,3,4];


Array.prototype.map = function(fn){



 return this.reduce(function(value1,value2){

    value1.push(fn(value2));

},[])
  



}

    

var arr2 = arr.map(function(value,index){

   return value*value;

},callBackThis)


//数组扁平化

var arr = [1,[2,3,4],5,[6,7]];

//递归方法

function flat(arr){
 
  var res = [];

  arr.forEach(function(value){

     if(value.isArray()){

       res =  res.concat(flat(value));

     }else{

      res.push(value);

     }

  })
  return res;
}

flat(arr);


//用reduce方法

var  arr = [1,[2,3,4],5,[6,7]];


function  flatten(arr){

 
 return   arr.reduce(function(prev,cur){

        
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
    
    },[])


}


//tostring方法

function  flatten(arr) {
   
      return arr.toString().split(',').map(function(item){
             return +item;
    })




}





//ES6中的展开运算符



function flatten(arr){
 //只要传入的函数返回依次结果为ture some()番薯结果为true
 
  while(arr.some(function(item){return Array.isArray(item);})){
         //没执行一次arr就被展开一次知道不在有数组
         arr = [].concat(...arr)

  }
  
  return arr;

}



//bind方法

Function.prototype.bind = function(content){
    var self = this;
    var arg = [].slice.call(arguments,1);

    var F = function(){}

    var f = function(){

        var args = [].slice.call(arguments);
        self.apply(content,args.concat(arg));



    }

    F.prototype = self.prototype;
    f.prototype = new F();

    return f;



 


 }




    var obj  ={
            a:2
        }
     var obj1 = {

       a:1,
       fn:function(){

        console.log(this.a);
       }



     }

    console.log(obj1.fn.bind(obj,'b')('c')) ;


//原型链继承

function F(){
   this.name = 'wyk'
}
F.prototype.con1 = function(){

    console.log('f');

}
function S(){

}

S.prototype = new F();

var son = new S();


//构造函数继承

function F(){
   this.name = 'wyk'
}
F.prototype.con1 = function(){

    console.log('f');

}
function S(){
      F.call(this)
}

var son = new S();

//组合继承
function F(){
    this.name = 'wyk'
 }
 F.prototype.con1 = function(){
 
     console.log('f');
 
 }
 function S(){
    F.call(this)
 }
 
 S.prototype = new F();
 
 var son = new S();

 //原型式继承
 function F(){
    this.name = 'wyk'
 }
 F.prototype.con1 = function(){
 
     console.log('f');
 
 }

 var son = Object.create(new F())

 //寄生式继承

 function F(){
    this.name = 'wyk'
 }
 F.prototype.con1 = function(){
 
     console.log('f');
 
 }
 function subobject(obj){
      var o = Object.create(obj)
       o.color  = 'yellow';

        

 }
 var son = subobject(new F());

 //寄生组合 (圣杯模式)
 function F(){
    this.name = 'wyk'
 }
 F.prototype.con1 = function(){
 
     console.log('f');
 
 }
 function S(){
    F.call(this)
 }
 

  
var f = (function(){

     function F(){};

     return function(father, son){
        F.prototype = father.prototype;
        son.prototype = new F();
        son.constructor = son;
          

     }


}())
  f(F,S)
 var son = new S();

//vue三大模板
 


//cookie localstorage
var setLocal = {
    save(key, value){
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key){
         return  JSON.parse(localStorage.getItem(key));
    }
}


var manageCookie = {
    set(name, value, time){

        document.cookie = `${name}=${value};max-age=${time}`
        return this;

    },
    remove(name){
         return this.set(name,'',-1);
    },
    get(name, callback){
        var arr = document.cookie.split('; ');
        for(var i = 0;i<arr.length;i++){
            var arr1  = arr[i].split('=');
            if(arr1[0] == name){
                callback(arr1[1])
                return this;
            }
        }
        callback(undefined)
     return this;
    }
}


//哈希值
//监听哈希值发生变化更改状态
window.addEventListener("hashchange", function(){
    var hash = window.location.hash
  

  })


//ajax


function ajax (method, url, params, fun) {
    method = method.toUpperCase()            //在传入method的时候可以忽略大小写
    var xhr = new XMLHttpRequest()

    if (typeof params === 'object') {        //如果在地址传入的东西是一个对象，我们将它的格式转化为urlencoded
      var tempArr = []
      for (var key in params) {
        var value = params[key]
        tempArr.push(key + '=' + value)
      }
      params = tempArr.join('&') //===>这里的格式就为parsms=[key1=value&key2=value2]
    }

    if (method === 'GET') {
      url += '?' + params
    }

    xhr.open(method, url, false)

    var data = null
    if (method === 'POST') {    //如果请求的方式为POST，需要手动设置请求头的Content-Type
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      data = params
    }

    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return
      
      // console.log(this.responseText)  //这里可以得到响应体，但是后面要处理的内容应该根据使用者的需要来处理
    
      fun(this.responseText)
    }

    xhr.send(data)
  }

  //生成密码 num个数 b类型 
let createPassword = function (num, b) {
    let n = 0 //循环次数
    let arr = new Array // 随机数保存
    let Capitalization = () => Math.floor(Math.random() * b)// 随机取数0-2/0-1
    let randomNumber = [() => Math.floor(Math.random() * (57 - 48 + 1) + 48), () => Math.floor(Math.random() * (122 - 97 + 1) + 97), () => Math.floor(Math.random() * (90 - 65 + 1) + 65)] // 去随机值
    for (let i = 0; i < num; i++) {
        arr.push(randomNumber[Capitalization()]())
    }
    return arr.map(e => String.fromCharCode(e)).join('')
}
//密码 密码长度
let passwordStrength = function (num, len) {
    if(num.length<len) return '密码长度不够'
    let passwordLevel = ['弱', '普通', '较强', '强']
    let arr = new Array(4) // 记录密码等级
    num.split('').map(e => e.charCodeAt()).forEach(e => {
        if (e >= 48 && e <= 57) { arr[0] = 1 }
        else if (e >= 65 && e <= 90) { arr[1] = 1 }
        else if (e >= 91 && e <= 122) { arr[2] = 1 }
        else { arr[3] = 1 }
    })
    return passwordLevel[arr.reduce((a, b) => a + b) - 1]
}


