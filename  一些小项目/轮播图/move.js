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
     isp =(json[attr] - icur)/7;
     isp = isp>0?Math.ceil(isp):Math.floor(isp);
     if(attr == 'opacity'){
         obj.style.opacity = (icur + isp )/100;
     }else{
         obj.style[attr] = (icur + isp ) + 'px';
     }

if(json[attr] != icur){
    beStop = false;
}

 }
if(beStop){
  clearInterval(obj.timer);
  typeof callBack == 'function' ? callBack():'';

}

  },30)
   

  }
  function getStyle(elem,prop){
    if(window.getComputedStyle){
     
        return window.getComputedStyle(elem,null)[prop];
    }else{
        return elem.currentStyle[prop];
    }



     }