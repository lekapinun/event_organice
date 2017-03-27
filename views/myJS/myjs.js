// modal
$(document).ready(function(){
    $('#signin').on('shown.bs.modal', function () {
      $('#myInput').focus()
    })
  });
// login
$(document).ready(function(){
    var email,pass;
    $("#login").click(function(){
        email=$("#email").val();
        pass=$("#password").val();
        $.post("http://localhost:5555/login",{email:email,pass:pass},function(data){  
          console.log(data);
          $("#box").html(data);   
            if(data==='done')           
            {
                window.location.href='hello.html';
            }
            else
            {
              window.location.href='login.html';
            }
        });
    });
    // new Vue({
    //   el: '#app',
    //   data: {
    //     message: 'Hello Vue.js!'
    //   },
    //   computed: {
    //     now: function () {
    //       return Date.now()
    //     }
    //   },
    // })
});
function changepage(page){
  $.ajax({
    url:page,
    method:'GET',
    success: function(data){
      $("#center").html(data);
    }
  });
}
