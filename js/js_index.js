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
				}*/
				}
			else if(data.status== '0'){
				alert("Login Fail:Invalid Username or Password");
				/*navigator.notification.alert(
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
					);*/
				
				}
	
         }
      function onError(msg)
         {  
		 
		 
			alert("Connection Error");
			/*navigator.notification.alert(
			'Error',  // message
			null,         // callback
			'Something went wrong:',            // title
			'Ok'                  // buttonName
			);*/
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
		 
var pushNotification = window.plugins.pushNotification;

pushNotification.register(
    successHandler, 
    errorHandler, 
    {
        'senderID':'820792837736',
        'ecb':'onNotificationGCM' // callback function
    }
);
function successHandler(result) {
   alert('Success: '+ result);
}
function errorHandler(error) {
    alert('Error: '+ error);
}

function onNotificationGCM(e) {
    switch(e.event){
        case 'registered':
            if (e.regid.length > 0){
                deviceRegistered(e.regid);
				$("#gcmReg_id").val(e.regid);
				alert(e.regid);
            }
        break;

        case 'message':
            if (e.foreground){
            	// When the app is running foreground. 
                alert('The room temperature is set too high')
            }
        break;

        case 'error':
           alert('Error: ' + e.msg);
        break;

        default:
          console.log('An unknown event was received');
          break;
    }
}
