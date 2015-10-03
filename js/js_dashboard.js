	//$.mobile.defaultPageTransition="slide";
	var searchlist;
	var page=1;
	var UG,PG,DG;
	$(document).ready(function(){
		/*Get User Id & Fetch Details From Database*/
		if(!localStorage.userId)
			{
			  window.location="index.html";
			}
		else
			{
			var id=localStorage.userId;//user Id
			 getcount(id);	
			
			var username=localStorage.username;
			$("#username").text(username);
			$("#panel_username").text(username);
			$("#panel2_username").text(username);
			$("#panel3_username").text(username);
			$("#profile_username").text(username);
			$("#usericonpic").attr('src',base_url+"images/"+id+".jpg");
			$("#profilePic").attr('src',base_url+"images/"+id+".jpg");
			$("#serverUrl").val(base_url+'imgupload');
			$("#Id").val(id);//user_id
			$("#userid").val(id);
			$.extend($.mobile.pagination.prototype.options, {perPage: 10});
            
			//Matching Jobs
			$("#content_list").on("scrollstart",function(){
	        $.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			});

			//Search Jobs /Advanced Search
			$("#search_list").on("scrollstart",function(){
	       	$.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			});

		
			//Applied Jobs
			$("#applied_list").on("scrollstart",function(){
	       	$.mobile.pagination.prototype.setoffset(page);
			$.mobile.pagination.prototype.onclick_next(page,window[searchlist]);
			page++;
			}); 


		 window.location.hash="#dashboard_page";
			}

		 $('#resumeupload').submit(function () {
            formData = new FormData($(this)[0]);
            $.ajax({
                type:'POST',
                url: base_url+"resumeupload",
                data:formData,
                contentType: false,
                processData: false,
                error:function (jqXHR, textStatus, errorThrown) {
                    alert('Failed to upload file')
                },
                success:function () {
                    alert('File uploaded')
                }
				})
            return false
			});
		});

			//-------Logout -----------//
		$(document).on('click','#logout',function(){
			localStorage.removeItem("userId");
			localStorage.removeItem("username");
			
		});
		
		/////------GETTING COUNT OF JOBS AND INBOX-----/////		
		function getcount(id){
			$.ajax({
				type:"GET",
				url:base_url+"matchinjobscount/"+id,
				beforeSend: function() { $.mobile.loading( 'show' ) }, //Show spinner
				complete: function() { $.mobile.loading( 'hide' ) }, //Hide spinner
				dataType:"json",
				success:function(data){
					$("#matched_jobs_count").html(data.length);
					$("#jobs_panel").html(data.length);
				},
				error:function(){alert("error");}
			});
			
			$.ajax({
				type:"GET",
				url:base_url+"appliedjobscount/"+id,
				beforeSend: function() { $.mobile.loading( 'show' ) }, //Show spinner
				complete: function() { $.mobile.loading( 'hide' ) }, //Hide spinner
				async: "true",
				cache: false,
				dataType:"json",
				success:function(data){
				$("#applied_count").html(data.length);
								},
				error:function(){alert("error");}
			});
		}
		
		
		//*****ON CLICK OF CHANGE PASSWORD*****///
		$(document).on("click",'#change_pass_save',function(){
			var Id=$("#Id").val();
			//alert(Id);
			$('#change_pass_form').validate({
			rules: {
				js_exist_pass:{
					required:true
				},
				js_new_pass:{
					required:true
				},
				js_new_pass_c:{
					required:true,
					equalTo:js_new_pass
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var formdata= $('#change_pass_form').serialize();
			$.ajax({
				type:"GET",
				url:base_url+"changepassword/"+Id,
				async: "true",
				cache: false,
				dataType:"json",
				data:formdata,
				success:function(data){
					if(data.status=="1")
					{
					  alert(data.msg);
						window.location.hash = "#dashboard_page";
						window.location.reload();
					}
					else
					{
						 alert(data.msg);
					}
				},
				error: function(){alert("error");}   
			});
			}
		});
		});
		
		
		//*****ON LOADING THE JOBSEEKER PROFILE PAGE*****///
		
		$(document).on("pageinit",'#my_profile',function(){
			var Id=$("#Id").val();
	    		$.ajax({
				type:"GET",
				url:base_url+"jobseeker/"+Id+"/edit",
				beforeSend: function() { $.mobile.loading( 'show' ) }, //Show spinner
				complete: function() { $.mobile.loading( 'hide' ) }, //Hide spinner
				async: "true",
				cache: false,
				dataType:"json",
				success:myprofile_listview,
				error: function(){alert("error");}   
			});
		});
		
		/////-----PROFILE VIEW FUNCTION----///
		function myprofile_listview(data){

			$.each(data,function(i,item) {
//alert(item.js_resume);				
				////-----SHOWING PROFILE COMPLETION----////
				var maximumPoints  = 100;
				
				var point = 0;
				
				if(item.js_email!='')
					{
					point+=5;
					}
				if(item.js_name != ''){
					point+=5;
					
					}
				 if(item.js_country != ''){
					point+=5;
				
					}
					
				if(item.js_mobile != ''){
					point+=5;
					}
				
				if(item.js_employer != ''){
					point+=5;
					}
		       if(item.js_exp_yr != ''){
					point+=5;
					}
				if(item.js_designation != ''){
					point+=5;
					}
				if(item.js_keyskills != ''){
					point+=5;
					}
				if(item.js_basic_edu != ''){
					point+=5;
					}
				if(item.js_dob != ''){
					point+=5;
					}
				if(item.js_gender != ''){
					point+=5;
					}
				if(item.js_hometown != ''){
					point+=5;
					}
				if(item.js_pref_location != ''){
					point+=5;
					}
				if(item.js_language_known != ''){
					point+=5;
					}
				if(item.js_resume != ''){
					point+=10;
					}	
                 //alert(point)
			
				 var percentage = (point*maximumPoints)/100;
				 //alert(percentage);
				var profile_completion=percentage/100;
				var profile_percentage=percentage+'%';
					//alert(percentage);
				$("#percent").val(profile_completion);
				$("#percentage").text(profile_percentage);
				
			
				///////--------DISPLAY OF PROFILE DETAILS----////
				var experience=item.js_exp_yr+"Yr"+" - "+item.js_exp_month+"Month";/////DISPLAYING EXPERIENCE e.g 1Yr - 0Month FORMAT///
				var salary=item.js_ctc_lac+"lakh"+" - "+item.js_ctc_th+"thousands";/////DISPLAYING SALARY e.g 1lakh - 5thousands FORMAT///
				$("#panel2_username").html("<h6>"+localStorage.username+"</h6>")
				$(".experience").text(experience);/////DISPLAYING EXPERIENCE///
			 	$(".location").text(item.js_city);/////DISPLAYING CITY///
			 	$(".salary").text(salary);/////DISPLAYING SALARY ///
				
				/////DISPLAYING PERSONAL DETAILS///////
				$("#personal_details").append('<li data-role="list-divider" ><b>Personal Details</b></li>');
				$("#personal_details").append('<li data-icon="edit" Id='+item.js_userid+'><a href="#edit_basic" class="profile_details_edit"   data-ajax="false"><div >Email ID:	<p><b>'+item.js_email+'</b></p></div><br><div>Mobile:	'+item.js_mobile+'</div><br><div >Current Location:	'+item.js_city+ '</div><br><div>Date of Birth:	'+item.js_dob+'</div><br><div>Gender:	'+item.js_gender+' </div></a></li>');
				$("#personal_details").listview().listview('refresh');
				
				/////DISPLAYING EXPERIENCE DETAILS///////
				$("#experience_details").append('<li data-role="list-divider" ><b>Experience</b></li>');
				$("#experience_details").append('<li data-icon="edit" Id='+item.js_userid+'><a href="#edit_experience" class="profile_details_edit"   data-ajax="false"><div >Profile Title:	<b>'+item.js_resume_head+'</b></div><br><div>Annual Salary:	'+salary+'</div><br><div >Total Experience:	'+experience+ '</div></a></li>');
				$("#experience_details").listview().listview('refresh');
				
				/////DISPLAYING EDUCATION DETAILS///////
				$("#education_details").append('<li data-role="list-divider" ><b>Education</b></li>');
				$("#education_details").append('<li data-icon="edit" Id='+item.js_userid+'><a href="#edit_education" class=" profile_details_edit qual_details" ><br><div id="">Under Graduate:'+item.js_basic_edu+'</div><br><div id="">Post Graduate:'+item.js_master_edu+'</div><br><div id="">Doctorate:'+item.js_doc_edu+'</div></a></li>');
				$("#education_details").listview().listview('refresh');
				UG=item.js_basic_edu;
				PG=item.js_master_edu;
				DG=item.js_doc_edu;
				
				/////DISPLAYING SKILLS DETAILS///////
				$("#keyskills_details").append('<li data-role="list-divider" data-theme="a">Key Skills</li>');
				
				var skills=item.js_keyskills;
				if(skills==0){
				$("#keyskills_details").append('<li Id='+item.js_userid+'><a class="profile_details_edit ui-btn ui-icon-plus ui-corner-all  ui-btn-inline" title="Add"  href="#edit_key_skills" data-ajax="false">ADD SKILLS</a></li>');
				
				}
				else{
				var key_skills=skills.split(',');////SPLIT KEYSKILLS BY COMMA////

				for(vari=0;i<key_skills.length;i++)
				{
					var keyskills=key_skills[i];
					$("#keyskills_details").append('<li data-icon="false" Id='+item.js_userid+'><a href="#edit_key_skills" class="profile_details_edit">'+keyskills+' </a></li>');
					$("#keyskills_details").listview().listview('refresh');
				}
				}
				
				
				/////DISPLAYING LANGUAGE DETAILS///////
				$("#language_details").append('<li data-role="list-divider" data-theme="a">Languages known</li>');
				$("#language_details").listview('refresh');
				var language=item.js_language_known;
				if(language==0){
				$("#language_details").append('<li Id='+item.Id+'><a class="profile_details_edit ui-btn ui-icon-plus ui-corner-all  ui-btn-inline" title="Add"  href="#edit_language" data-ajax="false">ADD LANGUAGE</a></li>');
					
				}
				else{
				var language_split=language.split(',');////SPLIT KEYSKILLS BY COMMA////

				for(var i=0;i<language_split.length;i++)
				{
					var languages=language_split[i];
					$("#language_details").append('<li data-icon="false" Id='+item.js_userid+'><a href="#edit_language" class="profile_details_edit">'+languages+' </a></li>');
					$("#language_details").listview().listview('refresh');
				}
				}
			});			
		}
		
		/////-----EDIT PROFILE ----///
		$(document).on('click','.profile_details_edit',function(){
			var listitem = $( this ).parent("li");
			var Id =listitem.attr('Id');
			$.ajax({
				type:"GET",
				url:base_url+"jobseeker/"+Id+"/edit",
				cache:false,
				dataType:"json",
				success:function sucess(data){
					$.each(data,function(i,item) {
						$("#edit_basic_form #edit_Id").val(item.Id);
						$("#edit_basic_form #js_name").val(item.js_name);
						$("#edit_basic_form #js_email").val(item.js_email);
						$("#edit_basic_form #js_mobile").val(item.js_mobile);
						$("#edit_basic_form #js_phone").val(item.js_phone);
						$("#edit_basic_form #js_city").val(item.js_city);
						$("#edit_basic_form #js_dob").val(item.js_dob);
						$("#edit_basic_form #js_gender").val(item.js_gender).selectmenu().selectmenu('refresh', true);
						$("#edit_experience_form #edit_exp_Id").val(item.Id);
						$("#js_resume_head").val(item.js_resume_head);
						
                        var skills=item.js_keyskills;
						//alert(item.js_keyskills);
						if(skills==0){
						/////DONT APPEND LIST IF EMPTY
						}
						else{
						var key_skills=skills.split(',');
						
						$("#keyskills_list").empty();
						for(vari=0;i<key_skills.length;i++)
						{
							//alert(key_skills[i]);
						var keyskills=key_skills[i];
						$("#keyskills_list").append('<li data-icon="edit" Id='+item.js_userid+' data-name="job_details='+keyskills+'"><input type="text" id="keyskills" size="30" name="keyskills" value='+keyskills+'><span data-type="horizontal" style="float:right"><a class="skills_delete ui-btn ui-icon-delete ui-corner-all ui-btn-icon-notext ui-btn-inline" title="Delete"  href="#" data-ajax="false">plus</a></span></li>');
						$("#keyskills_list").listview().listview('refresh');
						}
						}
						
						//////LANGUAGE////
						
						var language=item.js_language_known;
						//alert(item.js_language_known);
						if(language==0){
						}
						else{
						var language_split=language.split(',');////SPLIT KEYSKILLS BY COMMA////
						for(var i=0;i<language_split.length;i++)
						{
							var languages=language_split[i];
							//alert(languages);
							$("#language_list").append('<li data-icon="edit" Id='+item.js_userid+' data-name="job_details='+languages+'"><input type="text" id="js_language_known" size="30" name="js_language_known" value='+languages+'><span data-type="horizontal" style="float:right"><a class="languages_delete ui-btn ui-icon-delete ui-corner-all ui-btn-icon-notext ui-btn-inline" title="Delete"  href="#" data-ajax="false">plus</a></span></li>');	
							$("#language_list").listview().listview('refresh');
						}
						}

						$("#edit_experience_form #js_exp_yr").val(item.js_exp_yr).selectmenu().selectmenu('refresh', true);
						$("#edit_experience_form #js_exp_month").val(item.js_exp_month).selectmenu().selectmenu('refresh', true);
						$("#edit_experience_form #js_ctc_lac").val(item.js_ctc_lac).selectmenu().selectmenu('refresh', true);
						$("#edit_experience_form #js_ctc_th").val(item.js_ctc_th).selectmenu().selectmenu('refresh', true);
						$("#edit_education_form #js_basic_edu").val(item.js_basic_edu).selectmenu().selectmenu('refresh', true);
						$("#edit_education_form #js_master_edu").val(item.js_master_edu).selectmenu().selectmenu('refresh', true);
						$("#edit_education_form #js_doc_edu").val(item.js_doc_edu).selectmenu().selectmenu('refresh', true);
					});
				}
			});
		});	
		
		//*****ON LOADING THE PERSONAL DETAILS PAGE*****///
		$(document).on("click",'#personal_details_save',function(){
			var Id=$("#Id").val();
			$('#edit_basic_form').validate({
			rules: {
				js_name:{
					required:true
				},
				js_email:{
					required:true,
					email:true
				},
				js_mobile:{
					required:true,
					digits:true
				},
				js_phone:{
					required:true,
					digits:true
				},
				js_city:{
					required:true
				},
				js_dob:{
					required:true
				},
				js_gender:{
					required:true
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var formdata= $('#edit_basic_form').serialize();
				$.ajax({
					type:"PUT",
					url:base_url+"jobseeker/"+Id,
					async: "true",
					cache: false,
					dataType:"json",
					data:formdata+"&type=basic",
					success:function(data){
							//alert(data)
							window.location.hash = "#my_profile";
							window.location.reload();
							},
					error: function(){alert("error");}   
				});
			}
			});
		});
		
		
		//*****ON LOADING THE EXPERIENCE PAGE*****///
		$(document).on("click",'#experience_details_save',function(){
			var Id=$("#Id").val();
			$('#edit_experience_form').validate({
			rules: {
				
				js_resume_head:{
					required:true
				},
				js_exp_yr:{
					required:true
				},
				js_exp_month:{
					required:true
				},
				js_ctc_lac:{
					required:true
				},
				js_ctc_th:{
					required:true
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var formdata= $('#edit_experience_form').serialize();
				$.ajax({
				type:"PUT",
				url:base_url+"jobseeker/"+Id,
				beforeSend: function() { $.mobile.loading( 'show' ) }, //Show spinner
				complete: function() { $.mobile.loading( 'hide' ) }, //Hide spinner
				async: "true",
				cache: false,
				dataType:"json",
				data:formdata+"&type=experience",
				success:function(data){
					  //  alert(data)
						window.location.hash = "#my_profile";
						window.location.reload();
						},
				error: function(){alert("error");}   
			});
			}
		});
		});
		
		//*****ON LOADING THE EDUCATION PAGE SET THE QUALIFICATIONS*****///
		//$(document).on("pageinit",'#education_add_page',function(){
			$(document).on("click",'.qual_details',function(){
			$.ajax({
				type:"GET",
				url:base_url+"qualificatonlist",
				cache: false,
				dataType:'json',
				success:set_qualification,
				error:function(){alert('error');}
			});
			//alert(UG);
			//$("#edit_education_form #js_basic_edu").val(UG).selectmenu('refresh');
			//$("#js_basic_edu").val(UG);
			//$("#edit_education_form #js_master_edu").val(item.js_master_edu).selectmenu().selectmenu('refresh', true);
			//$("#edit_education_form #js_doc_edu").val(item.js_doc_edu).selectmenu().selectmenu('refresh', true);

		});
		
		function set_qualification(data){
				$('select#js_basic_edu').empty(); 
				$('select#js_master_edu').empty(); 
				$('select#js_doc_edu').empty(); 
				$('select#js_basic_edu').append('<option value=""></option>');
				$('select#js_master_edu').append('<option value=""></option>');
				$('select#js_doc_edu').append('<option value=""></option>');
				$.each(data,function(i,item) {	
					if(item.quali_type=="UG"){				
						$('select#js_basic_edu').append("<option value="+item.quali_name+">"+item.quali_name+"</option>");
						
					}
					else if(item.quali_type=="PG"){				
						$('select#js_master_edu').append('<option value="'+item.quali_name+'">'+item.quali_name+'</option>');
					}
					else if(item.quali_type=="D"){				
						$('select#js_doc_edu').append('<option value="'+item.quali_name+'">'+item.quali_name+'</option>');
					}
				});
		}				
				
 
		//*****ON ADDING QUALIFICATIONS*********///
		$(document).on("click",'#save_education',function(){
			var Id=$("#Id").val();
			$('#edit_education_form').validate({
			rules: {
				js_basic_edu:{
					required:true
				},
				/*js_master_edu:{
					required:true
				},*/
				/*js_doc_edu:{
					required:true
				}*/
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var formdata= $('#edit_education_form').serialize();
				$.ajax({
				type:"PUT",
				url:base_url+"jobseeker/"+Id,
				async: "true",
				cache: false,
				dataType:"json",
				data:formdata+"&type=education",
				success:function(data){
						window.location.hash = "#my_profile";
						window.location.reload();
						//alert(data);
						},
				error: function(){alert("error");}   
			});
			}
		});
		});
			
		//*****ADDING SKILLS*****///
		$(document).on("click",'#add_skills_submit',function(){
			var Id=$("#Id").val();
			//alert(Id);
			$('#keyskills_add_form').validate({
			rules: {
				js_keyskills:{
					required:true
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var keyskills = $("#js_keyskills").val();
				$("#keyskills_list").append('<li data-icon="edit" ><input type="text" id="keyskills" size="30" name="keyskills" value='+keyskills+'><span data-type="horizontal" style="float:right"><a class="skills_delete ui-btn ui-icon-delete ui-corner-all ui-btn-icon-notext ui-btn-inline" title="Delete"  href="#" data-ajax="false">plus</a></span></li>');
				$("#keyskills_list").listview().listview('refresh');
				$("#js_keyskills").val("");
			}
			
		});
		});
		
		
		//*****DELETE THE SKILLS*****///
		$(document).on("click",'.skills_delete',function(){
			$(this).parent().parent().remove();
			$("#keyskills_list").listview().listview('refresh');
				
		});	
		//*****SAVING THE SKILLS*****///
		$(document).on("click",'#submit_skills',function(){
			var Id=$("#Id").val();
			var listview_array = new Array();
			$( "#keyskills_list li" ).each(function(index) {
				listview_el=$(this).find('input').val();
				listview_array.push(listview_el) ;
            });
			var skills=listview_array;
				$.ajax({
				type:"PUT",
				url:base_url+"jobseeker/"+Id,
				async: "true",
				cache: false,
				dataType:"json",
				data:"type=save_skills&skills="+skills,
				success:function(data){
						//alert(data);
						window.location.hash = "#my_profile";
						window.location.reload();
						
						},
				error: function(){alert("error");}   
			
            });
		});
		
		
		//*****ADDING LANGUAGE*****///
		$(document).on("click",'#add_language_submit',function(){
			var Id=$("#Id").val();
			//alert(Id);
			$('#language_add_form').validate({
			rules: {
				js_language_known:{
					required:true
				}
			},
			errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				var language_add = $("#js_language_known").val();
				//alert(language_add);
				$("#language_list").append('<li data-icon="edit" ><input type="text" id="js_language_known" size="30" name="js_language_known" value='+language_add+'><span data-type="horizontal" style="float:right"><a class="language_delete ui-btn ui-icon-delete ui-corner-all ui-btn-icon-notext ui-btn-inline" title="Delete"  href="#" data-ajax="false">plus</a></span></li>');
				$("#language_list").listview().listview('refresh');
				$("#js_language_known").val("");
			}
			
		});
		});
		
		//*****DELETE THE LANGUAGES*****///
		$(document).on("click",'.languages_delete',function(){
		$(this).parent().parent().remove();
		$("#language_list").listview().listview('refresh');
		});
		
		
		//*****SAVING THE LANGUAGES*****///
		$(document).on("click",'#submit_language',function(){
			var Id=$("#Id").val();
			//alert(Id);
			var listview_array = new Array();
			$( "#language_list li" ).each(function( index ) {
				listview_el=$(this).find('input').val();
				listview_array.push(listview_el) ;
            });
			var language=listview_array;
			//alert(language);
				$.ajax({
				type:"PUT",
				url:base_url+"jobseeker/"+Id,
				async: "true",
				cache: false,
				dataType:"json",
				data:"type=save_languages&js_language="+language,
				success:function(data){
						window.location.hash = "#my_profile";
						window.location.reload();
						//alert(data);
						},
				error: function(){alert("error");}   
			
            });
		});
		
		
		
		
		//*****ON LOADING THE RECOMMENDED JOBS PAGE*****///
		$(document).on("pageinit",'#recommended_job_page',function(){
			searchlist="matchingjobs";
			$("#content_list").empty();
			matchingjobs(page);
			page=2;
			});
		function matchingjobs(page)
			{
				var Id=$("#Id").val();
				$.ajax({
				type:"GET",
				url:base_url+"matchinjobs/"+Id,
				data:{ pagination: $.mobile.pagination.prototype.getResults() },
				async: "true",
				cache: false,
				dataType:"json",
				success:function(data){
				//$("#content_list").empty();
				 $.each(data.matchinjoblist,function(i,item) {	
					var status=item.ja_status;
					var icon =status==1?"ui-icon-check":"ui-icon-action";
					var class1 =status==1?'':'jobs_apply'
					var experience=item.job_min_exp+" - "+item.job_max_exp+"Years";
					var salary=item.job_ctc_type+" "+item.job_min_ctc+" - "+item.job_max_ctc+"K P.A";
				    $("#content_list").append("<li id="+item.Id+" data-name='job_details="+item.job_title+"="+item.job_cmpny_name+"="+experience+"="+item.job_no_of_vacancy+"="+item.job_location+"="+salary+"="+item.job_posted+"="+item.job_description+"="+item.job_keywords+"="+item.job_candidate_profile+"="+item.job_UG_qualification+"="+item.job_PG_qualification+"="+item.job_qualification_other+"'><a href='#jobs_details_page' class='view_details_jobs'>"+item.job_title+"<br> "+item.job_cmpny_name+"<br>"+experience+"<br>"+item.job_location+"</a></li>");
					$("#content_list li").append("<a href='#' class='"+class1+" "+icon+"'></a>");
					$("#content_list").listview().listview('refresh');
																				
					});					
				},
				error: function(){alert("error");}   
			 });
			}
		
		$(document).on("click",".view_details_jobs",function(){
			var listitem = $( this ).parent("li");
			var Id =listitem.attr('Id');
			var jobs_details =listitem.attr('data-name');
			var search=jobs_details.split('=');
			var job_title=search[1];			
			var job_cmpny_name=search[2];
			var experience=search[3];
			var job_no_of_vacancy=search[4];
			var job_location=search[5];
			var salary=search[6];
			var job_posted=search[7];
			var job_description=search[8];
			var job_keywords=search[9];
			var job_candidate_profile=search[10];
			var job_UG_qualification=search[11];
			var job_PG_qualification=search[12];
			var job_qualification_other=search[13];
			
			$("#jobs_details_list").empty();
			$("#jobs_details_list").append('<li ><b>'+job_title+'</b> <br> '+job_cmpny_name+'<br>'+experience+'<br>'+job_no_of_vacancy+" Vacanies"+'<br>'+job_location+'<br>'+salary+'<br>'+"Posted on "+job_posted+'</li>');
			$("#jobs_details_list").append('<li data-role="list-divider" ><b>Job Description</b></li>');
			$("#jobs_details_list").append('<li >'+"Skills: "+job_keywords+'<br><br>'+"Job Description: "+job_description+'</li>');
			$("#jobs_details_list").append('<li data-role="list-divider" ><b>Desired Candidate Profile</b></li>');
			$("#jobs_details_list").append('<li >'+job_candidate_profile+'<br><br>'+"UG: "+job_UG_qualification+'<br><br>'+"PG: "+job_PG_qualification+'<br><br>'+"Other Qualification: "+job_qualification_other+'</li>');
			$("#jobs_details_list").listview().listview('refresh');
			
		});
		
		
		
		$(document).on("click",".jobs_apply",function(){
			
			var listitem = $(this).parent("li");
			var Id=listitem.attr("id");
			var user_Id=$("#Id").val();
			//alert(Id);
			//alert(user_Id);
			$.ajax({
				type:"GET",
				url:base_url+"applyjobs/"+user_Id+"/"+Id,
				beforeSend: function() { $.mobile.loading('show') }, //Show spinner
				complete: function() { $.mobile.loading('hide') }, //Hide spinner
				async: "true",
				cache: false,
				dataType:"json",
				success:function(data){
				 //  alert(data);
					$(".jobs_applied").prop("disabled",true);
					window.location.hash = "#recommended_job_page";
					window.location.reload();
					
				},
				error: function(){alert("error");}   
			});
		});
		
//*****ON LOADING THE RECOMMENDED JOBS PAGE*****///
		$(document).on("click",'#search_jobs',function(){
			searchlist="jobsearch";
			$("#search_list").empty();
			jobsearch(page);
			page=2;
            window.location.hash="#searchJoblist";
			});

function jobsearch(page)
{
			var key_search=$("#key_search").val();
			var job_location=$("#location").val();
			$.ajax({
				type:"GET",
				url:base_url+"jobsearch",
				async: "true",
				cache: false,
				data:{ pagination: $.mobile.pagination.prototype.getResults(),key_search:key_search,job_location:job_location },
				dataType:"json",
				success:function(data){
				//$("#search_list").empty();
					//$("#matched_jobs_count").html(data.total);
				    $.each(data.jobsearch,function(i,item) {	
							var status=item.ja_status;
                            var experience=item.job_min_exp+" - "+item.job_max_exp+"Years";
						    var salary=item.job_ctc_type+" "+item.job_min_ctc+" - "+item.job_max_ctc+"K P.A";
						    $("#search_list").append("<li id="+item.Id+" data-name='job_details="+item.job_title+"="+item.job_cmpny_name+"="+experience+"="+item.job_no_of_vacancy+"="+item.job_location+"="+salary+"="+item.job_posted+"="+item.job_description+"="+item.job_keywords+"="+item.job_candidate_profile+"="+item.job_UG_qualification+"="+item.job_PG_qualification+"="+item.job_qualification_other+"'><a href='#jobs_details_page' class='view_details_jobs'>"+item.job_title+"<br> "+item.job_cmpny_name+"<br>"+experience+"<br>"+item.job_location+"</a></li>");
							$("#search_list li").append("<a href='#' class='jobs_apply'></a>");
							$("#search_list").listview().listview('refresh');
												
					});		
					
				},
				error: function(){alert("error");}   
			});
}
		
		
	//*applied job*//
$(document).on("pageinit",'#applied_jobList',function(){
	searchlist="appliedjobs";
	$("#search_list").empty();
	appliedjobs(page);
	page=2;
});

 function appliedjobs(page)
 {
	   var Id=$("#Id").val();
		$.ajax({
		type:"GET",
		url:base_url+"appliedjobs/"+Id,
		async: "true",
		cache: false,
		dataType:"json",
		data:{ pagination: $.mobile.pagination.prototype.getResults()},
		success:function(data){
		$("#applied_count").html(data.total);
			  //$("#applied_list").empty();
			    $.each(data.appliedjobs,function(i,item) {	
				var experience=item.job_min_exp+" - "+item.job_max_exp+"Years";
				var salary=item.job_ctc_type+" "+item.job_min_ctc+" - "+item.job_max_ctc+"K P.A";
				$("#applied_list").append("<li id="+item.Id+" data-name='job_details="+item.job_title+"="+item.job_cmpny_name+"="+experience+"="+item.job_no_of_vacancy+"="+item.job_location+"="+salary+"="+item.job_posted+"="+item.job_description+"="+item.job_keywords+"="+item.job_candidate_profile+"="+item.job_UG_qualification+"="+item.job_PG_qualification+"="+item.job_qualification_other+"'><a href='#jobs_details_page' class='view_details_jobs'>"+item.job_title+"<br> "+item.job_cmpny_name+"<br>"+experience+"<br>"+item.job_location+"</a></li>");
				$("#applied_list").listview().listview('refresh');
																		
			});					
		},
		error: function(){alert("error");}   
	});
 }
	
	//*****ON click advanced JOB search PAGE*****///
	$(document).on("click",'#ad_search_jobs',function(){
			searchlist="adjobsearch";
			$("#search_list").empty();
			adjobsearch(page);
			page=2;
			window.location.hash="#searchJoblist";
	});
 
 function adjobsearch(page)
 {
          	var key_search=$("#jos_name").val();
			var job_location=$("#jos_city").val();
			var experience=$("#jos_exp_yr").val();
			var ctc=$("#jos_ctc_lac").val();
			$.ajax({
				type:"GET",
				url:base_url+"adjobsearch",
				async:"true",
				cache:false,
				data:{ pagination: $.mobile.pagination.prototype.getResults(),key_search:key_search,job_location:job_location,
					   experience:experience,ctc:ctc },
				dataType:"json",
				success:function(data){
					//$("#search_list").empty();
					//$("#matched_jobs_count").html(data.total);
				    $.each(data.adjobsearch,function(i,item){	
							var status=item.ja_status;
                            var experience=item.job_min_exp+" - "+item.job_max_exp+"Years";
						    var salary=item.job_ctc_type+" "+item.job_min_ctc+" - "+item.job_max_ctc+"K P.A";
						    $("#search_list").append("<li id="+item.Id+" data-name='job_details="+item.job_title+"="+item.job_cmpny_name+"="+experience+"="+item.job_no_of_vacancy+"="+item.job_location+"="+salary+"="+item.job_posted+"="+item.job_description+"="+item.job_keywords+"="+item.job_candidate_profile+"="+item.job_UG_qualification+"="+item.job_PG_qualification+"="+item.job_qualification_other+"'><a href='#jobs_details_page' class='view_details_jobs'>"+item.job_title+"<br> "+item.job_cmpny_name+"<br>"+experience+"<br>"+item.job_location+"</a></li>");
							$("#search_list li").append("<a href='#' class='jobs_apply'></a>");
							$("#search_list").listview().listview('refresh');
																				
					});	
					
					
					
				},
				error: function(){alert("error");}   
			});
 }

function imgError(image) 
	{
			image.onerror = "";
			image.src = "css/images/user.png";
			return true;
	}	
	