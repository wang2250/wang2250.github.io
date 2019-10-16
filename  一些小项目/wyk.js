(function(window){


function ku(){

}
//匹配邮箱格式
ku.eMail = function(email){
      
  // var reg = / [/d]+ @ /g; [0-9]+ @ [a-z]+ (\.[a-z]+)
  var reg = /^[\w-]+@[\w]+(\.[\w]+)+$/g;
  
  return reg.test(email);
  
}
//斐波那切数列
ku.fibonacci = function (n){

    var num1 = 1;
    var num2 = 2;

    for(var i  =2 ; i<n ; i++){
      num2 += num1;
      num1 =  num2-num1;
    }

      return num2;

//递归

/*

   return n<=2 ? 1 : fibonacci(n-1) + fibonacci(n-2);


*/



}
//找两个dom共同的父节点
ku.commonParentNode = function(dom1,dom2){

  for(;dom1;dom1 = dom1.parentNode){

     if(dom1.contains(dom2)){
       return dom1;
     }

  }

}
window.ku = ku;

}(window))