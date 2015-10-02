   
    var deviceReady = false;
    
    function uploadResume(file){
    	alert(file);
    	// Get URI of picture to upload
		var id = $("#Id").val();
		//var file = document.getElementById('new_resume');
		//var imageURI = img.src;
        if (!file) {
           // document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
            return;
        }
        
        // Verify server has been entered
        server = document.getElementById('serverUrl').value;
		if (server) {
        	
            // Specify transfer options
		    var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName= id; //imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="application/msword";
            options.chunkedMode = false;
            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(file, server, function(r) {
                document.getElementById('status').innerHTML = "Upload successful";            	
            }, 
			function(error) {
               // document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;  
				navigator.notification.alert(
							"Upload failed: Code = "+error.code,  // message
							null,         // callback
							'Error', // title
							'Ok'                  // buttonName
						);
            }, options);
        }
    }
   
    /**
     * Function called when page has finished loading.
     */
    function init() {
        document.addEventListener("deviceready", function() {deviceReady = true;}, false);
        window.setTimeout(function() {
            if (!deviceReady) {
                alert("Error: PhoneGap did not initialize.  Demo will not run correctly.");
            }
        },2000);
    }