var sw = 20, //方块宽
   sh = 20, //方块高
   tr = 30, //行数
   td = 30,
   snake = null,
   timer = null,
   newEeat,
   speed = 200
   ;
//小方块的构造函数 
function Square(x, y, classname) {
   this.x = x * sw;
   this.y = y * sh;
   this.class = classname;
   this.viewContent = document.createElement('div');
   this.viewContent.className = this.class;
   this.parent = document.getElementById('snakeWrap');
}
//创建小方块
Square.prototype.create = function () {

   this.viewContent.style.position = 'absolute';
   this.viewContent.style.width = sw + 'px';
   this.viewContent.style.height = sh + 'px';
   this.viewContent.style.left = this.x + 'px';
   this.viewContent.style.top = this.y + 'px';
   this.parent.appendChild(this.viewContent);

}
//移除小方块
Square.prototype.remove = function () {
   this.parent.removeChild(this.viewContent);
}

//蛇的构造函数
function Snake() {
   this.head = null;
   this.tail = null;
   this.pos = []; //存蛇身上每个方块的位置 
   this.directionNum = {//存方向
      left: {
         x: -1,
         y: 0
      },
      right: {
         x: 1,
         y: 0
      },
      up: {
         x: 0,
         y: -1
      },
      down: {
         x: 0,
         y: 1
      }
   };
   this.direction = null;//蛇要走的方向

}
//蛇开始初始化
Snake.prototype.init = function () {//用来初始化
   //创建舌头
   var snakeHend = new Square(2, 0, 'snakeHead');
   snakeHend.create();
   this.head = snakeHend;//把蛇头存起来
   this.pos.push([2, 0]);  //存蛇位置
   //创建蛇身体1
   var snakeBody1 = new Square(1, 0, 'snakeBody');
   snakeBody1.create();
   this.pos.push([1, 0]);

   //创建蛇身体2
   var snakeBody2 = new Square(0, 0, 'snakeBody');
   snakeBody2.create();
   this.tail = snakeBody2; //把蛇尾信息存起来
   this.pos.push([0, 0]);   //存蛇位置

   //形成链表关系
   snakeHend.last = null;
   snakeHend.next = snakeBody1;

   snakeBody1.last = snakeHend;
   snakeBody1.next = snakeBody2;

   snakeBody2.last = snakeBody1;
   snakeBody1.next = null;

   //蛇要走的位置 默认向右

   this.direction = this.directionNum.right;

}
//用来获取蛇头下一位置对应的元素，根据元素做不同的变化
Snake.prototype.getNextPos = function () {
   //蛇要走的下一个位置
   var nextPos = [
      this.head.x / sw + this.direction.x,
      this.head.y / sh + this.direction.y

   ]

   //下个点是自己 结束
   var onDie = true;
   this.pos.forEach(function (value) {

      if (value[0] == nextPos[0] && value[1] == nextPos[1]) {

         onDie = false;
      }


   })

   if (!onDie) {
      this.strateggies.die.call(this);
      return;
   }

   //下个点是实物  
   if (newEeat.x / sw == nextPos[0] && newEeat.y / sh == nextPos[1]) {
      this.strateggies.move.call(this, nextPos, 2);
      game.score++;
      creatEeat();


      return;

   }

   //下个点是墙 
   if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > 29 || nextPos[1] > 29) {
      this.strateggies.die.call(this);

      return;
   }


   this.strateggies.move.call(this, nextPos);


}
//处理到下个点要做的事
Snake.prototype.strateggies = {
   die: function () {
      game.over();
   },
   //障眼法蛇头往前移动一位new一个方块插到新蛇头后边蛇尾干掉 
   move: function (nextPos, format) { //format决定要不要删除蛇尾巴

      var newBody = new Square(this.head.x / sw, this.head.y / sh, 'snakeBody');

      newBody.next = this.head.next;
      newBody.last = null;
      newBody.next.last = newBody;

      newBody.create();

      this.head.remove();
      var newHead = new Square(nextPos[0], nextPos[1], 'snakeHead');
      newHead.last = null;
      newHead.next = newBody;
      newBody.last = newHead;
      this.pos.splice(0, 0, [nextPos[0], nextPos[1]])
      this.head = newHead;
      newHead.create();


      if (!format) {

         this.pos.pop()

         this.tail.remove();
         this.tail = this.tail.last;
      }

   }



}
snake = new Snake();

function creatEeat() {




   var include = true,
      x,
      y;

   while (include) {
      include = false;
      x = Math.ceil(Math.random() * 29);
      y = Math.ceil(Math.random() * 29);

      snake.pos.forEach(function (value) {


         if (x == value[0] && y == value[1]) {
            include = true;
         }

      })

   }


   newEeat = new Square(x, y, 'food');

   var foodDom = document.querySelector('.food');
   if (foodDom) {
      foodDom.style.left = x * sw + 'px';
      foodDom.style.top = y * sh + 'px';

   } else {
      newEeat.create();
   }


}



//创建游戏逻辑
function Game() {


   this.timer = null;

   this.score = 0;
}

Game.prototype.init = function () {

   speed = 200;

   snake.init();

   creatEeat();

   document.onkeydown = function (e) {
      console.log(e.keyCode)
      if (e.keyCode == 37 && snake.direction != snake.directionNum.right) {

         snake.direction = snake.directionNum.left;

      } else if (e.keyCode == 38 && snake.direction != snake.directionNum.down) {

         snake.direction = snake.directionNum.up;
      } else if (e.keyCode == 39 && snake.direction != snake.directionNum.left) {
         snake.direction = snake.directionNum.right;
      } else if (e.keyCode == 40 && snake.direction != snake.directionNum.up) {
         snake.direction = snake.directionNum.down;
      } else if (e.keyCode == 32) {
         if (speed > 20) {
            speed -= 20;
         }

         clearInterval(game.timer);

         game.timer = setInterval(function () {

            snake.getNextPos();

         }, speed)
      }
      e.preventDefault();
   }

   this.start();

}

Game.prototype.start = function () {
   this.timer = setInterval(function () {

      snake.getNextPos();

   }, 200)


}
var snakeWrap = document.querySelector('#snakeWrap');
Game.prototype.over = function () {
   clearInterval(game.timer);


   alert(game.score)


   snakeWrap.innerHTML = '';

   snake = new Snake();
   game = new Game();

   var startBtn = document.querySelector('.startBtn');
   startBtn.style.display = 'block';
}



var game = new Game();

var startBtn = document.querySelector('.startBtn button');

startBtn.onclick = function () {

   startBtn.parentNode.style.display = 'none';
   game.init();


}

var stopBtn = document.querySelector('.stopBtn button');


snakeWrap.onclick = function () {

   clearInterval(game.timer);

   stopBtn.parentNode.style.display = 'block'

}

stopBtn.onclick = function () {

   game.start();
   stopBtn.parentNode.style.display = 'none'
}











