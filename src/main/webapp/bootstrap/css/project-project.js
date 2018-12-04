var Admin_Project_Project = {
	init : function(){
		Admin_Project_Project.render_project_list();
		
		$('#project-modal #save-project').click(function(){
			var project_name = $.trim($('#project-modal #project-name').val());
			if (project_name != ''){
				$.post('admin/index.php?object=project-project&action='+$('#project-modal').data('action'),$('#project-modal #project-form').serialize(),function(json){
					var action = $('#project-modal').data('action');
					switch (action){
		    			case 'new-project':
		    				Admin_Project_Project.render_project_list();
		    	            show_message('<i class="fa fa-check" style="font-size:2em;"></i> The project has been added successfully');
		    				break;
		    			case 'update-project':
		    				var project = json;
		    				$('.project-id-'+project.id).text(project.project_name);
		    				show_message('<i class="fa fa-check" style="font-size:2em;"></i> The project has been edited successfully');
		    				break;
					}
					
				},'json');
				$('#project-modal').modal('hide');
			}else{
				var form_group = $('#project-modal #project-name').parent().parent();
				if (form_group.hasClass('has-error') == false){
					form_group.addClass('has-error');
					$('#project-modal #project-name').parent().append('<span class="help-block">The Project name field is required.</span>');
				}
			}
		});
		
		$('#delete-project-modal #delete-project').click(function(){
			var project_id = $('#delete-project-modal').data('project-id');
			$.get('admin/index.php',{object:'project-project',action:'delete-project','project-id':project_id},function(json){
	    	    var project = json;
	    	    Admin_Project_Project.render_project_list();
	    	    show_message('<i class="fa fa-check" style="font-size:2em;"></i> The project has been deleted successfully');
	    	},'json');	
			$('#delete-project-modal').modal('hide');
		});
		$('#delete-project-modal').on('hide.bs.modal', function (e) {
			$('#delete-project-modal').data('project-id',null);
		});
		
		
		
		
		$('#project-modal').on('hide.bs.modal', function (e) {
			$('#project-modal #project-name').parent().parent().removeClass('has-error');
			$('#project-modal .help-block').remove();
		    $('#project-modal #project-name').val('');
	    });
		
		$('#project-modal #project-name').on("keypress", function(e) {
			var value = $(this).val();
	        if (e.keyCode == 13) {
	        	if ($.trim(value) != ''){
	        		$('#project-modal #save-project').trigger('click');
	        	}
	            return false;
	        }
	    });
	},
	render_project_list : function (){
		$('#iframe-container-builder').empty();
		$('#navbar-button').empty();
		$('#navbar-button')
		.append(
		   $('<a class="btn btn-primary  btn-sm"></a>')
		   .append('<i class="fa fa-plus-circle fa-lg"></i> New project')
		   .click(function(){
			   $('#project-modal #div-project-theme').empty();
			   $('#project-modal #div-project-theme').append('<select class="form-control" id="project-theme" name="project-theme"></select>');
			   $.get('admin/index.php?object=project-project&action=theme-list',function(themes){
				   $('#project-modal-label').html('<i class="fa fa-folder-o  fa-lg"></i> New project');
		           $('#project-modal').data('action','new-project');
		           $('#project-modal #div-project-theme > #project-theme').empty();
		           if (themes != undefined && !$.isEmptyObject(themes)){
		        	   $.each(themes,function(k,v){
		        		   $('#project-modal #div-project-theme > #project-theme').append(
	        				   $('<option></option>').attr('value',k).append(v)
		        		   );
		        	   });
		           }
		           $('#project-modal').modal('show');   
			   },'json');
		   })
		);
		$('#navbar-breadcrumb').empty();
		$('#navbar-breadcrumb').append('<div><i class="fa fa-folder-o"></i> Projects</div>');
		$('#iframe-container-builder')
	    .append(
		    $('<div id="iframe-preview"></div>')
		    .append(
	    	    $('<div class="container-fluid"></div>')
	    	    .append(
	               $('<div class="row text-center"></div>')
	               .append(
	                   $('<div class="col-xs-12" id="project-list"></div>')
	               )
	            )
		    )
	    );
		
		$.get('admin/index.php',{object:'project-project',action:'project-list'},function(json){
			$('#mnu_main_navigation').empty();
			$('#mnu_main_navigation')
			.append(
				$('<li></li>')
				.css({cursor:'pointer'})
				.addClass('active')
				.click(function(){
					var Bootstrap_Builder = bootstrap_builder();
	                if (Bootstrap_Builder.change_flag == false){
	            	    Admin_Project_Project.render_project_list();
	                }else{
	                	var warning_button = $('<button type="button" class="btn btn-primary" id="warning-ok"></button>').append(' &nbsp; Ok &nbsp; ');
	                    warning_button.click(function(){
	                    	Admin_Project_Project.render_project_list();
	                    	$('#warning-modal').modal('hide');
	                    });
	                    $('#warning-modal .modal-body').html('<div style="height: 60px; line-height: 60px; vertical-align: middle;">' +
	                            '<i style="font-size:4em; color:#d9534f" class="fa fa-exclamation-triangle"></i>'+
	                            ' Data you have entered may not be saved. '+
	                            '</div>');
	                    $('#warning-modal .modal-footer').append(warning_button);
	                    $('#warning-modal').modal('show');
	                    
	                }
	            })
				.append(
					$('<a></a>')
					.append('<i class="fa fa-folder-o"></i> ')
					.append(
					  $('<span></span>')
					  .text('HTML Projects')
					)
				)
			);
		    
			for(var id  in json){
				var project = json[id];
				$('#project-list')
		        .append(
		            $('<div class="project-item" style="cursor:pointer;" ></div>')
		            .data('id',project.id)
		            .data('project_name',project.project_name)
		            .append(
		                $('<i class="fa fa-folder-o" style="font-size:4em;"></i>')
		                .click(function(){
			            	var project = $(this).parent().data();
			            	Admin_Project_Project.render_file_list(project);
			            })
		            )
		            .append('<br> ')
		            .append(
	            		$('<span></span>')
	            		.addClass('project-id-'+project.id)
	            		.text(project.project_name)
	            		.click(function(){
			            	var project = $(this).parent().data();
			            	Admin_Project_Project.render_file_list(project);
			            })
		            )
		            .append(
	            		$('<div class="item-mask"></div>')
	            		.click(function(){
			            	var project = $(this).parent().data();
			            	Admin_Project_Project.render_file_list(project);
			            })
		            )
		            .append(
	            		$('<div class="btn-group"></div>')
	            		.append(
	        				$('<a class="btn btn-warning btn-xs"><i class="fa fa-cloud-download"></i></a>')
	        				.click(function(e){
	        					$('#demo-modal').modal('show');
	        				})
	            		)
	            		.append(
	        				$('<a class="btn btn-warning btn-xs"><i class="fa fa-pencil"></i></a>')
	        				.click(function(e){
	        					var project = $(this).parent().parent().data();
	    				    	$('#project-modal #div-project-theme').empty();
	    				    	$.get('admin/index.php',{object:'project-project',action:'get-project','project-id':project.id},function(json){
	    		        		   var project = json;
	    		        		   $('#project-modal-label').html('<i class="fa fa-folder-o  fa-lg"></i> Edit project');
	    		                   $('#project-modal #project-name').val(project.project_name);
	    		                   $('#project-modal #div-project-theme').html('<p class="form-control-static">'+project.project_theme_name+'</p>');
	    		                   $('#project-modal #project-form')
	    		                   .append(
	    		                       $('<input type="hidden" id="project-id" name="project-id">').val(project.id)
	    		                   );
	    		                   $('#project-modal').data('action','update-project');
	    		                   $('#project-modal').modal('show');
	    		        	    },'json');
	        				})
	            		)
	            		.append(
	        				$('<a class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i></a>')
	        				.click(function(e){
	        					var project = $(this).parent().parent().data();
	    				    	$('#delete-project-modal').data('project-id',project.id);
	    			        	$('#delete-project-modal').modal('show');
	        				})
	            		)
		            )
		         );
				
			}
			$('#project-list')
	        .append(
	            $('<div class="project-item" id="new-project" style="cursor:pointer; margin-top:35px;" ></div>')
	            .append(
	                $('<i class="fa fa-plus-circle" style="font-size:1.4em;"></i>')
	            )
	            .append(' New project')
	            .click(function(){
	            	$('#project-modal #div-project-theme').empty();
	 			   	$('#project-modal #div-project-theme').append('<select class="form-control" id="project-theme" name="project-theme"></select>');
	                $.get('admin/index.php?object=project-project&action=theme-list',function(themes){
	     			   $('#project-modal-label').html('<i class="fa fa-folder-o  fa-lg"></i> New project');
	     	           $('#project-modal').data('action','new-project');
	     	           $('#project-modal #div-project-theme > #project-theme').empty();
	     	           if (themes != undefined && !$.isEmptyObject(themes)){
	     	        	   $.each(themes,function(k,v){
	     	        		   $('#project-modal #div-project-theme > #project-theme').append(
	             				   $('<option></option>').attr('value',k).append(v)
	     	        		   );
	     	        	   });
	     	           }
	     	           $('#project-modal').modal('show');   
	     		   },'json');
	            })
	         );
			
		},'json');
		
		if ($('.main-content').data('main-sidebar') == false){
	    	sidebar_toggle();
	    }
		resize_iframe();
	},
	render_file_list : function (project,current_tab){
		$('#iframe-container-builder').empty();
		$('#navbar-button').empty();
	    $('#navbar-button')
	    .append(
	       $('<a class="btn btn-primary btn-sm"></a>')
	       .append('<i class="fa fa-cloud-download fa-lg"></i> Project')
	       .click(function(){
	    	   $('#demo-modal').modal('show');
	       })
	    )
	    .append(' ')
	    .append(
	       $('<a class="btn btn-primary btn-sm"></a>')
	       .append('<i class="fa fa-plus-circle fa-lg"></i> New file')
	       .click(function(){
	    	   $('#file-modal #file-form')
	           .append(
	               $('<input type="hidden" id="project-id" name="project-id">').val(project.id)
	           );
	    	   $('#file-modal #file-form #file-name').val('');
	           $('#file-modal-label').html('<i class="fa fa-file-text-o"></i> New file');
	           $('#file-modal').data('action','new-file');
	           $('#file-modal').modal('show');
	       })
	    );
	    
	    $('#navbar-breadcrumb').empty();
	    $('#navbar-breadcrumb')
	    .append(
			$('<div></div>')
			.append(
				$('<a style="cursor:pointer;"></a>').append('<i class="fa fa-folder-o"></i> Projects')
				.click(function(){
					Admin_Project_Project.render_project_list();
				})
			)
			.append(' / <i class="fa fa-folder-o"></i> ')
			.append(
				$('<span></span>')
				.addClass('project-id-'+ project.id)
				.text(project.project_name)
			)
	    );
	    current_tab = (current_tab == undefined)?'file':current_tab;
		var file_active = '';
		var layout_active = '';
		if (current_tab == 'file'){
			file_active = 'active in';
		}else{
			layout_active = 'active in';
		}
		$('#iframe-container-builder')
	    .append(
	        $('<div id="iframe-preview"></div>')
	        .append(
	            $('<div class="container-fluid"></div>')
	            .append(
	        		$('<ul role="tablist" class="nav nav-tabs"></ul>')
	        		.css({marginTop:'10px'})
	        		.append(
	    				$('<li class="'+file_active+'" role="presentation"></li>')
	    				.append(
							$('<a aria-expanded="true" aria-controls="html-file" data-toggle="tab" role="tab" id="html-file-tab" href="#html-file"></a>').text('HTML files')
	    				)
	        		)
	        		.append(
	    				$('<li class="'+layout_active+'" role="presentation"></li>')
	    				.append(
							$('<a aria-controls="html-layout" data-toggle="tab" id="html-layout-tab" role="tab" href="#html-layout" aria-expanded="false"></a>').text('HTML layouts')
	    				)
	        		)
	            )
	            .append(
	        		$('<div class="tab-content"></div>')
	        		.append(
	    				$('<div aria-labelledby="html-file-tab" id="html-file" class="tab-pane fade '+file_active+'" role="tabpanel"></div>')
	    				.append(
			               $('<div class="row text-center"></div>')
			               .append(
			                   $('<div class="col-xs-12" id="file-list"></div>')
			               )
			            )
	        		)
	        		.append(
	    				$('<div aria-labelledby="html-layout-tab" id="html-layout" class="tab-pane fade '+layout_active+'" role="tabpanel">')
	    				.append(
			               $('<div class="row text-center"></div>')
			               .append(
			                   $('<div class="col-xs-12" id="layout-list"></div>')
			               )
			            )
	        		)
	            )
	        )
	    );
	    
		Admin_Project_File.file_list(project);
		Admin_Project_Layout.layout_list(project);
		
		resize_iframe();
	}
};
$(document).ready(function(){
	Admin_Project_Project.init();
});