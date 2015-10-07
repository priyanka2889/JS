	  // var type = $("#usr_usertype").val();
	 //  alert(type);
		$(document).on("click","#btn_submit",function(){
				$( "#login" ).validate({
					rules: {
						username: {
						required: true
						},
						password: {
						required: true
						}
					},
					errorPlacement: function( error, element ) {
					error.insertAfter( element.parent() );
					},
					submitHandler: function (form) {
						var pass=$("#password").val();
						var username=$("#username").val();
						var usr_usertype=$("#usr_usertype").val();
						//var key=Math.floor((Math.random() * 100000) + 1);
						//key="This is a private key"+pass;
						//encrypt= rc4(key, pass);
						//$("#password").val(encrypt);

					     
						//var formData="username="+username+"&usr_usertype="+usr_usertype+"&key="+key+"&encrypt="+encrypt;
						var formData="username="+username+"&usr_usertype="+usr_usertype+"&password="+pass;
                            $.ajax({
								type: "GET",
								url:base_url+"checklogin",
								beforeSend: function() { $.mobile.loading( 'show' ) }, //Show spinner
								complete: function() { $.mobile.loading( 'hide' ) }, //Hide spinner
								async: 'true',
								cache: false,
								dataType: 'json',
								data: formData,
								success: onSuccess,
								error:onError
							});
					}
				});
			});
		function onSuccess(data)
        { 
		   
			if(data.status== '1')
			{
				localStorage.userId= data.userId;
				localStorage.username= data.username;
			 $("#ok").attr("href", 'js_dashboard.html');
				$("#pop_msg_reset").popup('open');
				$('#pop_msg_reset p').text('Login Successfully ');
				
				/*navigator.notification.confirm("Login"+data.username+" Successfully",registrationCallBack, "Confirmation", "Ok");
					$.mobile.loading('show');
					function registrationCallBack(button){
				    $.mobile.loading('hide');
					if(button == 1) {
						window.location.href = 'js_dashboard.html';
					}
				} */
				}
			else if(data.status== '0'){
				alert("Login Fail:Invalid Username or Password");
				/* navigator.notification.alert(
						'Invalid Username or Password',  // message
						 null,         // callback
						'Login Fail:',            // title
						'Ok'                  // buttonName
				);*/
				} 
			else if(data.status== '2'){
				alert("You are not registered");
				/*navigator.notification.alert(
					'You are not registered',  // message
					null,         // callback
					'Login Fail:',            // title
					'Ok'                  // buttonName
					);*/
			}
			else if(data.status== '3'){
				alertpopup("Please Check your UserType");
				/*navigator.notification.alert(
					'Please Check your UserType',  // message
					null,         // callback
					'Login Fail:',            // title
					'Ok'                  // buttonName
					); */
				
				}
	
         }
      function onError(msg)
         {  
		 
		 
			//alert("Connection Error");
	     	navigator.notification.alert(
			'Error',  // message
			null,         // callback
			'Connection Error',            // title
			'OK'                  // buttonName
			);
         }  
		 /* function OnError(xhr, errorType, exception) 
		 {
                var responseText;
              $("#dialog").html("");
                try {
                    responseText = jQuery.parseJSON(xhr.responseText);
                    $("#dialog").append("<div><b>" + errorType + " " + exception + "</b></div>");
                    $("#dialog").append("<div><u>Exception</u>:<br /><br />" + responseText.ExceptionType + "</div>");
                    $("#dialog").append("<div><u>StackTrace</u>:<br /><br />" + responseText.StackTrace + "</div>");
                    $("#dialog").append("<div><u>Message</u>:<br /><br />" + responseText.Message + "</div>");
                } catch (e) {
                    responseText = xhr.responseText;
                    $("#dialog").html(responseText);
                }
		 } */
	
	

//* js for pushnotification *//
/*var pushNotification;

document.addEventListener("deviceready", function(){
    pushNotification = window.plugins.pushNotification;
});

$('#gcmReg_id').val(device.platform);
if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
    pushNotification.register(
    successHandler,
    errorHandler,
    {
        "senderID":"775328868599 ",
        "ecb":"onNotification"
    });
} else {
    pushNotification.register(
    tokenHandler,
    errorHandler,
    {
        "badge":"true",
        "sound":"true",
        "alert":"true",
        "ecb":"onNotificationAPN"
    });
}
function successHandler (result) {
    alert('result = ' + result);
}

function errorHandler (error) {
    alert('error = ' + error);
}*/

