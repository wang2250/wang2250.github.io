
    (function (window) {

      var $ = function (select) {


        return new $.prototype.Int(select);
      }

      $.fn = $.prototype = {
        //是个构造函数
        Int: function (select) {
        
          //  NaN undefined null ''
          if (!select) {
            return this;

          }
          //处理方法
          else if ($.isReady(select)) {


            this[0] = select;
            this.length = 1;

          }
          //处理字符串
          else if ($.isString(select)) {
            //去除空格 ie8以下不支持 可以用replace替换  replace(/^\s+|\s+$/g,"")
            select = select.trim();
            //创建标签
            if ($.isHtml(select)) {


              var temp = document.createElement('div');

              temp.innerHTML = select;

              //转化为类数组  
              [].push.apply(this, temp.children)



            } else {

              var res = document.querySelectorAll(select);

              [].push.apply(this, res);




            }


          }
          //处理数组,类数组,对象  window也是对象也有length属性
          else if ($.isArry(select) || $.isObject) { 
            var arr1 = [].slice.call(select);
            [].push.apply(this, arr1);
          }
          //其他
          else {
            this[0] = select;
            this.length = 1;

          }
          //返回this
          return this;

        },
        toArry: function () {
          return [].slice.call(this);
        },
        eq: function (num) {

          return $(this[num]);

        },
        first: function () {
          return $(this[0]);
        },
        last: function () {
          return $(this[this.length - 1]);
        },
        //循环属性值调用回调函数把循环的值传给回调函数  与$上的each不太一样
        each: function (fn) {
       
            
            for (var p in [].slice.call(this)) {
              if (fn(this[p],p) == false) {

                break;

              }
            }

           return  this;
        }

      }
      
      $.extent = $.prototype.extent = function (obj) {

        for (var p in obj) {
          this[p] = obj[p];
          
        }

      }
      //这个往$上添加方法 工具方法
      $.extent({




        isString: function (select) {

          if (typeof select === 'string') {
            return true;
          } else {
            return false;
          }

        },
        isHtml: function (select) {

          if (select[0] === '<' && select[select.length - 1] === '>'
            && select.length >= 3) {
            return true;
          } else {
            return false;
          }

        },
        isArry: function (select) {

          if (Object.prototype.toString.call(select) == '[object Arry]') {
            return true;
          } else {
            return false;
          }
        },
        isObject: function (select) {
          if (Object.prototype.toString.call(select) == '[object Object]') {
            return true;
          } else {
            return false;
          }
        },
        isReady: function (select) {
          if (typeof select === 'function') {
            if (document.addEventListener) {
              document.addEventListener('DOMContentLoaded', function () {
                select();
              })
            } else {
              document.attachEvent('onreadystatechange', function () {
                if (document.readyState == 'comlete') {
                  select();
                }
              })
            }

            return true;
          } else {
            return false;
          }


        },
        each: function (obj, fn) {
          if ($.isArry(obj)) {
            for (var i = 0; i < obj.length; i++){

              if (fn.call(obj[i],i, obj[i]) == false) {

                break;

              }
            }
          } else if ($.isObject(obj)) {

            for (var p in obj) {
              if (fn.call(obj[p],i, obj[i]) == false) {
                break;
              }
            }

          }
        },
        map:function(obj,fn){
            
          if ($.isArry(obj)){
            var arr = [];
            for (var i = 0; i < obj.length; i++){

                var ar = fn(obj[i],i)
                if(ar){
                  arr.push(ar);
                }
              
              
            }
             
             return arr;
          }else if($.isObject(obj)){

           var arr = {};
           for( var p in obj ){
              
            var ar = fn(obj[p],p)
            //ar是否有返回值
            if(ar){
              arr.push(ar);
            }
            
              

           }
           return arr;

          }

        },
      })
      //这个往$.prototype = {} 里添加方法 因为此时的this为$.prototype
      //操作dom的方法
      $.prototype.extent({
       //将元素里的所以后内容设为空
       empty:function(){

         
         
          
         this.each(function(value,key){
         
          
            value.innerHTML = '';
          
          
          return this;
            
       })
          

       },
       //删除元素
       remove:function(num){
          
         if(!num){
          
            this.each(function(value,key){
             var par = value.parentNode;
                par.removeChild(value);
              
                
                
           })

        }else{
           var par = this[num].parentNode;
           par.remove(this[num]);

        }
       
          return this;
       },
       //网元素里添加内容 
       html:function(str){
         if(arguments.length == 0){

          this.each(function(value,key){

            value.innerHTML = str;
        
         })
         return this[0].innerHTML;
         }
      
      },
       //text 若果不穿内容返回找的所有的内容返回
       text:function(str){
            var stri = '';
           if(arguments .length == 0){
                
            this.each(function(x,index){

               stri+=x.innerText;

            })
             
            return stri;
           }else{

            this.each(function(x,index){

            x.innerText = str;
            return this;

           })

           }

           




       },
       //
       append:function(dom){

          this.each(function(value,index){
            
              $(dom).each(function(x,inde){
                if(index == 0){
                  value.appendChild(x);
                }else{
                  var xx = x.cloneNode(true);
                 
                  value.appendChild(xx) ;

                }
               
              
              
            })
            
             return this;
             
          })
        

       },
       //
       appendto:function(dom){
        var oThis = this;
        $(dom).each(function(value,index){
            
         oThis.each(function(x,inde){
           if(index == 0){
            value.appendChild(x);
           }else{


            var xx = x.cloneNode(true);

            value.appendChild(xx);
           }
          
         })
          

         })
     
       },
       prependTo:function(dom){

        var oThis = this;
        $(dom).each(function(value,index){
            
         oThis.each(function(x,inde){
           if(index == 0){
            value.insertBefore(x,value.firstChild);
           }else{


            var xx = x.cloneNode(true);

            value.insertBefore(xx,value.firstChild);
           }
          
         })
          

         })

       },
       prepend:function(dom){
        this.each(function(value,index){
            
          $(dom).each(function(x,inde){
            if(index == 0){
              value.insertBefore(x,value.firstChild);
            }else{
              var xx = x.cloneNode(true);
             
              value.insertBefore(xx,value.firstChild) ;

            }
           
          
          
        })
        
         return this;
         
      })
       },
       insertBefore:function(dom){
           
           var oThis =  this;
           $(dom).each(function(x,inde){
            
            oThis.each(function(value,index){
         
             x.parentNode.insertBefore(value,x) 

             
           
          
        })
        
         return this;
         
      })

     


       },
       //把dom换掉
       replaceAll:function(dom){
       var oThis  =  this;
       
       $(dom).each(function(value,index){
         var parent  =value.parentNode;
        oThis.each(function(oValue,oIndex){


          if(index === 1){
            parent.insertBefore(oValue,value);
            
           }else{
    
            var oDon = oValue.cloneNode(true);
            parent.insertBefore(oDon,value);
               
  
           } 


        })
        value.remove();
      
             


       })
        


        // $(dom)[0].parentNode.insertBefore(this[0],$(dom)[0]);
        // $(dom)[0].remove();

       },

       
      })

      //属性操作的一些方法
      $.prototype.extent({
        attr:function(attr,value){

            if($.isString(attr)){
               if(arguments == 1){

                return this[0].getAttrbute(attr)

               }else{

                this.each(function(ele){

                 ele.setAttribute(attr,value)


                })


               }


            }else if($.isObject(attr)){

              

            }


            return this;

        }




      })


      //便于链式调用 通过Int构造出来的对象会到Int上找属性和方法
      $.prototype.Int.prototype = $.prototype;
      //在全局中拿到
      window.$ = $;
    }(window))


  