var compnyId="", country="", city="",state="";

$(document).on("pageinit","#addnewcomp",function(){
	setCountry();
	setComptype();
   });
$(document).on("pageinit","#edit_company",function(){
	
	
	
	
   });   
   
$(document).ready(function(){
	$("#searchText").hide();
	$("#branches").hide();
	companyList();
$("#cpny_branches_y").click(function(){
		 $("#branches").show();
});
$("#search").click(function(){
		 $("#searchText").toggle("slow");
		 $("#search").toggleClass("ui-icon-search");
		  $("#search").toggleClass("ui-icon-arrow-u");
});
$("#cpny_branches_n").click(function(){
		 $("#branches").hide();
});
   $("#edit_branches").hide();
$("#edit_cpny_branches_y").click(function(){
		 $("#edit_branches").show();
});

$("#edit_cpny_branches_n").click(function(){
		 $("#edit_branches").hide();
});


$("#cpny_country").on("change",function(){
	var val = $("#cpny_country").val();
    	setState(val);
});

$("#cpny_state").on("change",function(){
	var val = $("#cpny_state").val();
    	setCity(val);
});

$("#cpny_city").on("change",function(){
	var val = $("#cpny_city").val();
    	setPin(val);
});
$("#edit_cpny_country").on("change",function(){
	var val = $("#edit_cpny_country").val();
	//alert(val);
    	setState(val);
});

$("#edit_cpny_state").on("change",function(){
	var val = $("#edit_cpny_state").val();
    	setCity(val);
});

$("#edit_cpny_city").on("change",function(){
	var val = $("#edit_cpny_city").val();
    	setPin(val);
});

});



$(document).on("click","#submit",function(){
	$("#addcompany").validate({
	
			rules: {
					cpny_ct_type:{required:true	},
					cpny_name:{required:true},
					cpny_country:{required:true	},
					cpny_state:{required:true	},
					cpny_city:{required:true},
					cpny_pin:{required:true	},
					cpny_add1:{required:true},
					cpny_contact:{required:true	},
					cpny_website:{required:true , url:true },
					cpny_email:{required:true , email:true	},
					cpny_profile:{required:true	},
					},
					errorPlacement: function( error, element ) {
						error.insertAfter( element.parent() );
					},
					submitHandler: function (form) {
						var formdata=$("#addcompany").serialize();
						//alert(formdata);
						$.ajax({
							 type:"post",
							 url:"php/testForm.php",
							 data:formdata+"&fromtype=addcompany",
							 //dataType:"json",
							 success:function(data){
								window.location.hash="#dashboard";
							 },
							 error:function(){alert("error");}
							
						});
	         
					}
				});
				
});

function companyList(){
	
	$.ajax({
		type:"post",
		url:"php/setfields.php",
		data:"type=companyList",
		dataType:"json",
		success:function(data){
			//alert(data);
			$("#companieslist").empty();
			$.each(data,function(value,item){
				
				$("#companieslist").append('<li id='+item.Id+'><a href="#" class="companyprofile"><img src="http://lewistechnologies.in/schoolapp/css/images/logo.jpg"/>'+item.cpny_name+'</a><a>delete</a></li>');
				
			});
			$("#companieslist").listview("refresh");
			
		},
		error:function(){
			alert("error");
		}
		
		
	});
	
	
	
}




function setCountry(){
	
	$.ajax({
	  type:"post",
	  url:"php/setfields.php",
	  data:"type=country",
	  dataType:"json",
	success:function(data){
		$("#cpny_country").empty();
		$("#edit_cpny_country").empty();
		$("#cpny_country").append('<option  value=""></option>');
		$("#edit_cpny_country").append('<option  value=""></option>');
		$.each(data,function(value,item){
		
		$("#cpny_country").append('<option  value="'+item.name+'">'+item.name+'</option>');
		$("#edit_cpny_country").append('<option  value="'+item.name+'">'+item.name+'</option>');
			
		});
		
	},
	error:function(){
		alert("error");
	}
   		
});
}
function setState(country){
	
	$.ajax({
	  type:"post",
	  url:"php/setfields.php",
	  data:"type=state&country="+country,
	  dataType:"json",
	success:function(data){
		//alert(data);
		$("#cpny_state").empty();
		$("#edit_cpny_state").empty();
		$("#cpny_state").append('<option  value=""></option>');
		$("#edit_cpny_state").append('<option  value=""></option>');
		$.each(data,function(value,item){
		
		$("#cpny_state").append('<option  value="'+item.name+'">'+item.name+'</option>');
		$("#edit_cpny_state").append('<option  value="'+item.name+'">'+item.name+'</option>');
			
		});
		
	},
	error:function(){
		alert("error");
	}
   		
});
}
function setCity(state){
	
	$.ajax({
	  type:"post",
	  url:"php/setfields.php",
	  data:"type=city&state="+state,
	  dataType:"json",
	success:function(data){
		$("#cpny_city").empty();
		$("#cpny_city").append('<option  value=""></option>');
		$("#edit_cpny_city").empty();
		$("#edit_cpny_city").append('<option  value=""></option>');
		$.each(data,function(value,item){
		
		$("#cpny_city").append('<option  value="'+item.name+'">'+item.name+'</option>');
		$("#edit_cpny_city").append('<option  value="'+item.name+'">'+item.name+'</option>');	
		});
		
		
	},
	error:function(){
		alert("error");
	}
   		
});
	
	
}

function setPin(city){
	
	$.ajax({
	  type:"post",
	  url:"php/setfields.php",
	  data:"type=pin&city="+city,
	  dataType:"json",
	success:function(data){
		$("#cpny_pin").empty();
		$("#cpny_pin").append('<option  value=""></option>');
		$("#edit_cpny_pin").empty();
		$("#edit_cpny_pin").append('<option  value=""></option>');
		$.each(data,function(value,item){
		
		$("#cpny_pin").append('<option  value="'+item.Pincode+'">'+item.Pincode+'</option>');
		$("#edit_cpny_pin").append('<option  value="'+item.Pincode+'">'+item.Pincode+'</option>');
			
		});
	},
	error:function(){
		alert("error");
	}
   		
});
}
function setComptype(){
	
	$.ajax({
	  type:"post",
	  url:"php/setfields.php",
	  data:"type=comptype",
	  dataType:"json",
	success:function(data){
		$("#cpny_ct_type").empty();
		$("#cpny_ct_type").append('<option  value=""></option>');
		$("#edit_cpny_ct_type").empty();
		$("#edit_cpny_ct_type").append('<option  value=""></option>');
		$.each(data,function(value,item){
		$("#cpny_ct_type").append('<option  value="'+item.ct_type+'">'+item.ct_type+'</option>');
		$("#edit_cpny_ct_type").append('<option  value="'+item.ct_type+'">'+item.ct_type+'</option>');
		});
	},
	error:function(){
		alert("error");
	}
   		
});
}

// set company profile
$(document).on("click",".companyprofile",function(){
	var id = $(this).parent("li").attr('id');
	companyProfile(id);
	
});

function companyProfile(id){
	$.ajax({
	  type:"post",
	  url:"php/setfields.php",
	  data:"type=companyProfile&Id="+id,
	  dataType:"json",
	  success:function(data){
		//console.log(data);
		$("#company_basic").empty();
		$("#company_address").empty();
		$("#company_contact").empty();
		$("#company_profile_desc").empty();
		$("#company_branches").empty();
		$.each(data,function(value,item){
		//basic info
		$("#company_basic").append('<li>Company Type :'+item.cpny_ct_type+'</li>');
		$("#company_basic").append('<li>Company Name : '+item.cpny_name+'</li>');
		$("#company_basic").append('<li>City :'+item.cpny_city+'</li>');
		$("#company_basic").append('<li>State : '+item.cpny_state+'</li>');
		$("#company_basic").append('<li>Country :'+item.cpny_country+'</li>');
		$("#company_basic").append('<li>Pin : '+item.cpny_pin+'</li>');
		$("#company_basic").append('<li>Website :'+item.cpny_website+'</li>');
		//$("#company_basic").listview('refresh');
		
		// Address
		$("#company_address").append('<li>Company Address 1 : '+item.cpny_add1+' </li>');
		$("#company_address").append('<li>Company Address 2 :'+item.cpny_add2+'</li>');
		//$("#company_address").listview('refresh');
		//contact
		$("#company_contact").append('<li>Land line : '+item.cpny_contact+'</li>');
		$("#company_contact").append('<li>Mobile: '+item.cpny_mobile+' </li>');
		$("#company_contact").append('<li>Email : '+item.cpny_email+'</li>');
		//$("#company_contact").listview('refresh');
		
		//branches
		$("#company_branches").append('<li>branch1 : '+item.cpny_branch1+'</li>');
		$("#company_branches").append('<li>branch2: '+item.cpny_branch2+' </li>');
		
		//profile Description
		$("#company_profile_desc").html('<p>'+item.cpny_profile+'</p>');
		$("#edit_profile").attr("data-id",item.Id);
		window.location.hash="#company_profile";
		});
		
	},
	error:function(){
		alert("error");
	}
   		
});
}

$(document).on("click","#edit_profile",function(){
compnyId =$(this).attr("data-id");
setCountry();
setComptype();
window.location.hash="#edit_company";
setEditfield(compnyId);
});



function setEditfield(id){
	$.ajax({
	  type:"post",
	  url:"php/setfields.php",
	  data:"type=companyProfile&Id="+id,
	  dataType:"json",
	  success:function(data){
		  $.each(data,function(value,item){
			  country=item.cpny_country;
			  city=item.cpny_city;
			  state=item.cpny_state;
			 
			 //alert(compnyId+" "+country+" "+city+" "+state+" "+item.cpny_branches);
			  setState(item.cpny_country);
			  setCity(item.cpny_state);
			  setPin(item.cpny_city);
			  setTimeout(set,500);
			  
			  function set(){
			  $("#cpnyId").val(compnyId);
			  $("#edit_cpny_ct_type").val(item.cpny_ct_type).selectmenu('refresh');
			  $("#edit_cpny_name").val(item.cpny_name);
			  $("#edit_cpny_country").val(item.cpny_country).selectmenu('refresh');
			  $("#edit_cpny_state").val(item.cpny_state).selectmenu('refresh');
			  $("#edit_cpny_city").val(item.cpny_city).selectmenu('refresh');
			  $("#edit_cpny_pin").val(item.cpny_pin).selectmenu('refresh');
			  $("#edit_cpny_add1").val(item.cpny_add1);
			  $("#edit_cpny_add2").val(item.cpny_add2);
			  $("#edit_cpny_contact").val(item.cpny_contact);
			  $("#edit_cpny_mobile").val(item.cpny_mobile);
			  $("#edit_cpny_website").val(item.cpny_website);
			  $("#edit_cpny_email").val(item.cpny_email);
			  $("#edit_cpny_branches").val(item.cpny_branches);
			  if(item.cpny_branches=="Y"){
				  $("#edit_cpny_branches_y").prop("checked",true).checkboxradio("refresh");
				   $("#edit_cpny_branches_n").prop("checked",false).checkboxradio("refresh");
				   $("#edit_branches").show();
					  }
					  else{
						  $("#edit_cpny_branches_y").prop("checked",false).checkboxradio("refresh");
						  $("#edit_cpny_branches_n").prop("checked",true).checkboxradio("refresh");
						  $("#edit_branches").hide();
					  }
			  $("#edit_cpny_branch1").val(item.cpny_branch1);
			  $("#edit_cpny_branch2").val(item.cpny_branch2);
			  $("#edit_cpny_profile").val(item.cpny_profile);
			  }
     	  });

	},
	error:function(){
		alert("error");
	}

});
}

$(document).on("click","#save",function(){
	$("#editcompanyform").validate({
			rules: {
					edit_cpny_ct_type:{required:true	},
					edit_cpny_name:{required:true},
					edit_cpny_country:{required:true	},
					edit_cpny_state:{required:true	},
					edit_cpny_city:{required:true},
					edit_cpny_pin:{required:true	},
					edit_cpny_add1:{required:true},
					edit_cpny_contact:{required:true	},
					edit_cpny_website:{required:true , url:true },
					edit_cpny_email:{required:true , email:true	},
					edit_cpny_profile:{required:true },
					},
					errorPlacement: function( error, element ) {
						error.insertAfter( element.parent() );
					},
					submitHandler: function (form) {
						var formdata=$("#editcompanyform").serialize();
						//alert(formdata);
						$.ajax({
							 type:"post",
							 url:"php/testForm.php",
							 data:formdata+"&fromtype=editcompany",
							 //dataType:"json",
							 success:function(data){
								$("input").val();
								companyProfile(compnyId);
								
							 },
							 error:function(){alert("error");}
							
						});
	         
					}
				});
				
});


