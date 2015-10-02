   
    var deviceReady = false;
     /**
     * Select picture from library
     */
    function selectPicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('profilePic');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                uploadPicture();
            },
            function(e) {
                console.log("Error getting picture: " + e);
                //document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
    };
    
    /**
     * Upload current picture
     */
    function uploadPicture() {
    	
    	// Get URI of picture to upload
		var id = $("#Id").val();
		var img = document.getElementById('profilePic');
		var imageURI = img.src;
        if (!imageURI || (img.style.display == "none")) {
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
            options.mimeType="image/jpeg";
            options.chunkedMode = false;
            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                document.getElementById('camera_status').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded.";            	
            }, function(error) {
               document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;  
				/*navigator.notification.alert(
							"Upload failed: Code = "+error.code,  // message
							null,         // callback
							'Error', // title
							'Ok'                  // buttonName
						); */
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
              //  alert("Error: PhoneGap did not initialize.  Demo will not run correctly.");
            }
        },2000);
    }