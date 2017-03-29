// modal
// $(document).ready(function(){
//     $('#signin').on('shown.bs.modal', function () {
//       $('#myInput').focus()
//     })
//   });
// login
$(document).ready(function(){
    var email,pass;
    $("#signin").click(function(){
        email=$("#email").val();
        pass=$("#password").val();
        $.post("http://localhost:5555/login",{email:email,pass:pass},function(data){  
          console.log(data);
          $("#box").html(data);   
            if(data==='done')           
            {
                window.location.href='signin.html';
            }
            else
            {
              window.location.href='eventList.html';
            }
        });
    });
});
