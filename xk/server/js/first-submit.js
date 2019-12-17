function submitconsume() {
  var form = new FormData(document.getElementById("firstconsume"));
  $.ajax({
      url: 'http://47.100.76.82:9001/filesuccess',
      type: "post",
      data: form,
      cache: false,
      processData: false,
      contentType: false,
      beforeSend: function () {
          $("#submit").attr("disabled", "disabled"); // 禁用按钮防止重复提交
      },
      success: function (result) {
          setTimeout(() => {
              alert(result)
              location.reload();
          }, 500)
      },
      error: function () {
          setTimeout(() => {
              alert("提交失败！");
              location.reload();
          }, 500)

      },
      complete: function () {
          $("#submit").removeAttr("disabled");
      },
  })
}