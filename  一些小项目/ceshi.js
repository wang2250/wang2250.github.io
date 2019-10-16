let data = {
 
    obj:{

        a:1

    }


}

function defineReactive(data,key,value){
 Object.defineProperty(data,key,{
   //读取数据时执行
   get:function(){

    console.log('读取')

    return value;

   }
   ,
   //写入时调用
   set:function(){

    console.log('写入')
     
    return value;


   },

  key:value,

 })
     

}







    defineReactive(data,'obj',2);




