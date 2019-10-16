let oDom = document.querySelector('#dom');
let cou = 0;
var arr;
oDom.onclick = function(e){
    if(e.target.value == 0){


      e.target.style.backgroundImage = "url("+(cou%2+1)+".jpg)";
      e.target.value = cou%2+1;
      cou++;
 
   
      let x= e.target.offsetLeft/40;
      let y= e.target.offsetTop/40;
      
      decide(x,y);
    }
   



}
function init(){
   
    arr = new Array(15);
    for(let i = 0; i<15; i++){
       arr[i] = new Array(15);
       for(let j = 0; j<15; j++){

           arr[i][j] = createDom(i,j);

       }


    }
    



}


function createDom(x,y){

 var dom = document.createElement('div');
 dom.className = 'qizi';

 dom.style.left =  x*40 + 'px';
 dom.style.top = y*40 + 'px';
 dom.value = 0;
 oDom.appendChild(dom)
    
 return dom;

}

init();
function decide(x,y){
     
    var res1 = 3,res2 = 3,res3 = 3,res4= 3,res5= 3,res6= 3,res7= 3,res8 = 3;
    for(var i = 0;i<5;i++){
     
        res1 &= y+i>14 ? 0 : arr[x][y+i].value;
        res2 &= x+i>14 ? 0 : arr[x+i][y].value;
        res3 &= x+i>14 || y-i<0? 0 : arr[x+i][y-i].value;
        res4 &= x-i<0 || y+i>14? 0 : arr[x-i][y+i].value;
        res5 &= x-i<0 || y-i<0? 0 : arr[x-i][y-i].value;
        res6 &= x+i>14 || y+i>14? 0 : arr[x+i][y+i].value;
        res7 &= y-i<0 ? 0 : arr[x][y-i].value;
        res8 &= x-i<0 ? 0 : arr[x-i][y].value;
       


       


    }
    if(res = res1 || res2 ||res3||res4||res5||res6||res7||res8){
        setTimeout(function(){
            alert(res==1?'黑色胜利':'白色胜利')
        },200)
        
    }



}