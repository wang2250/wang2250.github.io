var sw = 20,
    sh  = 20,
    hr = 30,
    hd = 30,
    squer = null,
    snake = null,
   food = null;
    ;

//小球的构造函数

function Squer(x,y,classname){

  this.x = x*sw;
  this.y = y*sh;
 
  this.dom = document.createElement('div');
  this.dom.className = classname;
  this.parent = document.getElementById('snakeWaper');


}

Squer.prototype.init = function(){
     this.dom.style.width = sw +'px';
     this.dom.style.height = sh + 'px';
     this.dom.style.position = 'absolute';
     this.dom.style.left = this.x + 'px';
     this.dom.style.top  = this.y + 'px';

    this.parent.appendChild(this.dom);
}

Squer.prototype.romove = function(){

  this.parent.removeChild(this.dom);

}
// squer = new Squer(2,0,'snakeHead');
// squer.init();
// squer.creat();

//蛇构造函数
function Snake(){
    
    this.head = null;
    this.tail = null;
    this.pos = [];
    this.position = {
       
        left:{
            x:-1,
            y:0

        },
        right:{
            x:1,
            y:0
        },
        up:{
            x:0,
            y:-1
        },
        down:{
            x:0,
            y:1
        }


    };
    this.direct =null;


}

Snake.prototype.init  = function(){
   
    var snakeHead = new Squer(2,0,'snakeHead');
    snakeHead.init();
    this.head = snakeHead;
    this.pos.push([2,0]);

    var snakeBody1 = new Squer(1,0,'snakeBody');
    snakeBody1.init();
    this.pos.push([1,0]);

    var snakeBody2 = new Squer(0,0,'snakeBody');
    snakeBody2.init();
    this.tail = snakeBody2;
    this.pos.push([0,0]);

   //形成链表关系
   snakeHead.last = null;
   snakeHead.next = snakeBody1;

   snakeBody1.last = snakeHead;
   snakeBody1.next = snakeBody2;

   snakeBody2.last = snakeBody1;
   snakeBody2.next = null;


   this.direct =  this.position.right;


   document.onkeydown = function(e){
   
    if (e.keyCode == 37 ) {
        
        snake.direct = snake.position.left;
      

     } else if (e.keyCode == 38 ) {

        snake.direct = snake.position.up;
     } else if (e.keyCode == 39) {
        snake.direct = snake.position.right;
        
     } else if (e.keyCode == 40) {
        snake.direct = snake.position.down;
        
     }

   e.preventDefault();
   }

   creatFood();
}

Snake.prototype.getNextPos = function(){


  this.nextPos =  [
      this.head.x/sw + this.direct.x,
      this.head.y/sh + this.direct.y
  ]

  //下个点是墙
  if(this.nextPos[0]<0 ||this.nextPos[0]>29 || this.nextPos[1]>29 || this.nextPos[1]<0){
      clearInterval(timer)
      console.log('die')
      return;
  }
  //下个点是实物
  
if(this.nextPos[0]== food.x/sw &&  this.nextPos[1]== food.y/sh){
    food.romove()
    this.handle.move.call(this,2);
    
    creatFood();
}



  this.handle.move.call(this);

}

Snake.prototype.handle = {

    move:function(key){

        var newBody = new Squer(this.head.x/sw,this.head.y/sh,'snakeBody');

        newBody.last = null;
        newBody.next = this.head.next;
        newBody.next.last = newBody;
        
        newBody.init();

        this.head.romove();

        var newHead = new Squer(this.nextPos[0],this.nextPos[1],'snakeHead');
        newHead.last = null;
        newHead.next = newBody;
        newBody.last = newHead;

        this.head = newHead;

        newHead.init();

        this.pos.splice(0,0,[newHead.x/sw,newHead.y/sh]);
       if(!key){
        this.tail.romove();
        this.tail = this.tail.last;
        this.pos.pop();
       }
        

    }
}

function creatFood(){
   
    var x,
        y,
        exist = true;

    while(exist){
        exist = false;

        x = Math.ceil(Math.random() * 29);
        y = Math.ceil(Math.random() * 29);
        snake.pos.forEach( function(value){

            if(value[0]==x && value[1]==y){
                exist = true;
            }


        } );


    }

    food = new Squer(x,y,'food');

   


        food.init();

    

    

 
  
  



}








var start = document.querySelector('.startBtn button');
start.onclick = function(){

  var zhehzao  = document.querySelector('.startBtn');

  zhehzao.style.display  = 'none';



  snake  = new  Snake();
  snake.init();


  timer = setInterval(function(){
    snake.getNextPos()
},200)

}