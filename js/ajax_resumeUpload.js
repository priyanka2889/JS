$(document).ready(function (e) {
	
	$("#resumeupload").on('submit',(function(e) {
		e.preventDefault();
		var formData = new FormData(this);
		$(".upload-msg").text('Loading...');	
		$.ajax({
			url: "upload.php",        // Url to which the request is send
			type: "POST",             // Type of request to be send, called as method
			data: formData, 		  // Data sent to server, a set of key/value pairs (i.e. form fields and values)
			contentType: false,       // The content type used when sending data to the server.
			cache: false,             // To unable request pages to be cached
			processData:false,        // To send DOMDocument or non processed data file it is set to false
			success: function(data)   // A function to be called if request succeeds
			{
				$(".upload-msg").html(data);
			}
		});
	}
));

// Function to preview image after validation

$("#userImage").change(function() {
	$(".upload-msg").empty(); 
	$(".frmUpload").submit();
	var file = this.files[0];
	var imagefile = file.type;
	var imageTypes= ["image/jpeg","image/png","image/jpg"];
	var formData = new FormData(this.files[0]);
	var username = $("#usr_name").val();
	//alert(username);
	if(imageTypes.indexOf(imagefile) == -1)
		{
			$(".upload-msg").html("<span class='msg-error'>Please Select A valid Image File</span><br /><span>Only jpeg, jpg and png Images type allowed</span>");
			return false;
		}
		else
		{
			var reader = new FileReader();
			reader.onload = function(e){
				$(".img-preview").html('<img src="' + e.target.result + '" style="height:100px;width:100px;"/>');				
			};
			reader.readAsDataURL(this.files[0]);
		}
		
	});	
});