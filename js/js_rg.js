	$(document).ready(function(){
			$( "#js_email" ).blur(function() 
			{
				var js_email=$("#js_email").val();
				if (js_email==""){
					$('#user_msg').html('Email Id Please'); 
				}
				else{
					$.ajax({
						type : "POST",
						url  :base_url+"checkusername/"+js_email,
						cache: false,
						dataType:'json',
						success:function(data){
						if(data=="1")
							{
								$('#user_msg').html('Email Id already exists'); 
								$("#js_email").val("");
							}
						},
						error:onError
					});
					
					
				}
			});
			
			$( "#js_email" ).focus(function() {
				$('#user_msg').html(''); 
			});
	});
	
	$(document).on("click","#register",function(){
	   $("#js_reg").validate({
			rules: {
				js_email:{
					required:true,
					email:true
				},
				usr_password:{
					required:true
				},
				c_password:{
					required:true,
					equalTo:usr_password
				},
				/*js_city:{
					required:true
				},*/
				js_mobile:{
					required:true,
					number:true,
					maxlength:15
				}
			},
			messages: {
				js_email: {
					required: "Please enter valid Email Id."
				},
				usr_password: {
					required: "Please enter password."
				},
				/*js_city:{
					required:"Please select City."
				},*/
				js_mobile:{
					required:"Please enter Mobile Number."
				}
			},
			errorPlacement: function( error, element ) {
							error.insertAfter( element.parent() );
			},
					submitHandler: function (form) {
						var formdata = $("#js_reg").serialize();
					$.ajax({
						type : "GET",
						url  : base_url+"jobseeker/create",
						cache: false,
						data : formdata,
						dataType:'json',
						success:function(data){
					      jAlert("You are Registered Successfully", 'Alert Dialog',function(r){
										if(r==true){
											window.location.href="index.html";
										}
							});
							/*navigator.notification.confirm("You are Registered Successfully",registrationCallBack, "Confirmation", "Ok");
							$.mobile.loading('show');
							function registrationCallBack(button){
							$.mobile.loading('hide');
							if(button == 1) {
								window.location.href = 'index.html';
							}
						}*/				
									
						},
						error:onError
					});
				
					}
			});
	});
	
	 function onError(data, status)
         {  alert("Error");
			/*navigator.notification.alert(
			'Error',  // message
			null,         // callback
			'Something went wrong:',            // title
			'Ok'                  // buttonName
			);*/
         }  