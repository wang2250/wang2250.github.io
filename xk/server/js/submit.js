
function submitconsume() {
  var flag = $("#feidianconsume").valid();
  if (!flag) {
    //没有通过验证
    return;
  }
 
  var form = new FormData(document.getElementById("feidianconsume"));
 
  $.ajax({
    url: 'http://47.100.76.82:9001/success',
    type: "post",
    data: form,
    cache: false,
    processData: false,
    contentType: false,
   
    beforeSend: function () {
      var load = document.getElementById('loading')

      $("#loading").html("<img src='images/loadding.gif'/>") //在请求后台数据之前显示loading图标
      $("#submit").attr("disabled", "disabled"); // 禁用按钮防止重复提交
    },
    success: function (result) {
      if (result) {
        $("#loading").empty(); //ajax返回成功，清除loading图标
       
        setTimeout(() => {
          alert("提交成功")
          location.reload();
        }, 500)

      }
    },
    error: function () {
      $("#loading").empty(); //ajax返回失败，清除loading图标
      // console.log(e1, e2, e3)
      setTimeout(() => {
        alert("提交失败！");
        location.reload();
      }, 500)

    },
    complete: function () {
      $("#submit").removeAttr("disabled");
    },
  })
  // return false;;
}