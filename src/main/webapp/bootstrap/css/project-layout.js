var Admin_Project_Layout = {
	init : function(){
		$('#layout-modal #save-layout').click(function(){
			var file_name = $.trim($('#layout-modal #layout-name').val());
			if (file_name != ''){
		        $.post('admin/index.php?object=project-layout&action='+$('#layout-modal').data('action'),$('#layout-modal #layout-form').serialize(),function(json){
		        	var project = json;
		        	var action = $('#layout-modal').data('action');
		            switch (action){
		                case 'new-layout':
		                	$('#layout-modal #layout-form #project-id').remove();
		                    $('#layout-modal #layout-form #layout-name').val('');
		                	show_message('<i class="fa fa-check" style="font-size:2em;"></i> The layout has been added successfully');
		                	Admin_Project_Project.render_file_list(project,'layout');
		                	break;
		                case 'edit-layout':
		                	$('#layout-modal #layout-form #layout-name').val('');
		                	$('#layout-modal #layout-form input[name="project-id"]').remove();
		                    $('#layout-modal #layout-form input[name="layout-id"]').remove();
		                    show_message('<i class="fa fa-check" style="font-size:2em;"></i> The layout has been update successfully');
		                    Admin_Project_Project.render_file_list(project,'layout');
		                	break;
		                case 'copy-layout':
		                	$('#layout-modal #layout-form #layout-name').val('');
		                	$('#layout-modal #layout-form input[name="project-id"]').remove();
		                    $('#layout-modal #layout-form input[name="layout-id"]').remove();
		                    show_message('<i class="fa fa-check" style="font-size:2em;"></i> The layout has been copied successfully');
		                    Admin_Project_Project.render_file_list(project,'layout');
		                	break;
		            }
		        },'json');
		        $('#layout-modal').modal('hide');
			}else{
				var form_group = $('#layout-modal #layout-name').parent().parent();
				if (form_group.hasClass('has-error') == false){
					form_group.addClass('has-error');
					$('#layout-modal #layout-name').parent().append('<span class="help-block">The layout name field is required.</span>');
				}
			}
		});
		
		$('#delete-layout-modal #delete-layout').click(function(){
			var project_id = $('#delete-layout-modal').data('project-id');
			var layout_id = $('#delete-layout-modal').data('layout-id');
			$.get('admin/index.php',{object:'project-layout',action:'delete-layout','project-id':project_id,'layout-id':layout_id},function(json){
				var project = json;
				Admin_Project_Project.render_file_list(project,'layout');
	            show_message('<i class="fa fa-check" style="font-size:2em;"></i> The file has been deleted successfully');
			},'json');
			$('#delete-layout-modal').modal('hide');
		});
		
		$('#delete-layout-modal').on('hide.bs.modal', function (e) {
	        $('#delete-layout-modal').data('project-id',null);
	        $('#delete-layout-modal').data('layout-id',null);
	    });
	},
	layout_list : function(project){
		$.get('admin/index.php',{object:'project-layout',action:'index','project-id':project.id},function(html){
		   $('#layout-modal').data('project-id',project.id);
		   $('#layout-list').append(html);
		   $('#layout-list .file-item').data('project_id',project.id);
		   $('#layout-list .file-item').data('project_name',project.project_name);
		   
		   $('#layout-list .delete-btn').click(function(){
				var layout = $(this).parent().parent().data();
				$('#delete-layout-modal').data('project-id',layout.project_id);
				$('#delete-layout-modal').data('layout-id',layout.id);
				$('#delete-layout-modal').modal('show');
		   });
		   
		   $('#layout-list .edit-btn').click(function(){
			   var layout = $(this).parent().parent().data();
			   $('#layout-modal #layout-form input[name="project-id"]').remove();
        	   $('#layout-modal #layout-form input[name="layout-id"]').remove();
        	   $('#layout-modal #layout-form')
               .append(
                   $('<input type="hidden" id="project-id" name="project-id">').val(layout.project_id)
               )
        	   .append(
                   $('<input type="hidden" id="layout-id" name="layout-id">').val(layout.id)
               );
               $('#layout-modal #layout-form #layout-name').val(layout.layout_name);
               $('#layout-modal-label').html('<i class="fa fa-file-text-o"></i> Edit layout');
               $('#layout-modal').data('action','edit-layout');
               $('#layout-modal').modal('show');
			   
		   });
		   
		   $('#layout-list .copy-btn').click(function(){
			   var layout = $(this).parent().parent().data();
           	   var Bootstrap_Builder = bootstrap_builder();
        	   $('#layout-modal #layout-form input[name="project-id"]').remove();
               $('#layout-modal #layout-form input[name="layout-id"]').remove();
               $('#layout-modal #layout-form')
               .append(
                   $('<input type="hidden" id="project-id" name="project-id">').val(layout.project_id)
               )
               .append(
                   $('<input type="hidden" id="layout-id" name="layout-id">').val(layout.id)
               );
               $('#layout-modal #layout-form #layout-name').val(layout.layout_name+'-copy');
               $('#layout-modal-label').html('<i class="fa fa-file-text-o"></i> Copy layout');
               $('#layout-modal').data('action','copy-layout');
               $('#layout-modal').modal('show');
		   });
		   $('#layout-list .item-mask, #layout-list .layout-span, #layout-list .layout-icon').click(function(){
			   var object = $(this).parent().data();
			   Admin_Project_Layout.render_page_builder(object)
		   });
		   $('#layout-list')
	       .append(
	           $('<div class="file-item" style="cursor:pointer; margin-top:35px;" ></div>')
	           .append(
	               $('<i class="fa fa-plus-circle" style="font-size:1.4em;"></i>')
	           )
	           .append(' New layout')
	           .click(function(){
	        	   $('#layout-modal #layout-form')
	               .append(
	                   $('<input type="hidden" id="project-id" name="project-id">').val(project.id)
	               );
	               $('#layout-modal #layout-form #layout-name').val('');
	               $('#layout-modal-label').html('<i class="fa fa-layout-text-o"></i> New layout');
	               $('#layout-modal').data('action','new-layout');
	               $('#layout-modal').modal('show');
	           })
	        );
	        if ($('.main-content').data('main-sidebar') == false){
	        	sidebar_toggle();
	        }
		   
		});
	},
	render_page_builder: function (object){
		$("body").mask("Loading...");	
		$('#iframe-container-builder').empty();
		$('#navbar-breadcrumb').empty();
		$('#navbar-breadcrumb')
		.append(
	        $('<div></div>')
	        .append(
	            $('<a style="cursor:pointer;"></a>').append('<i class="fa fa-folder-o"></i> Projects')
	            .click(function(){
	            	var Bootstrap_Builder = bootstrap_builder();
	                if (Bootstrap_Builder.change_flag == false){
	                    Admin_Project_Project.render_project_list();
	                    change_iframe_width("100%");
	                }else{
	                	var warning_button = $('<button type="button" class="btn btn-primary" id="warning-ok"></button>').append(' &nbsp; Ok &nbsp; ');
	                    warning_button.click(function(){
	                    	Admin_Project_Project.render_project_list();
	                    	change_iframe_width("100%");
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
	        )
	        .append(' / ')
	        .append(
	    		$('<a style="cursor:pointer;"></a>')
	    		.append('<i class="fa fa-folder-o"></i> ')
	            .append(
	                $('<span></span>')
	                .addClass('project-id-'+ object.project_id)
	                .text(object.project_name)
	            )
	            .click(function(){
	            	var Bootstrap_Builder = bootstrap_builder();
	                if (Bootstrap_Builder.change_flag == false){
	                	var project = {};
	                    project.id = object.project_id;
	                    project.project_name = object.project_name;
	                    Admin_Project_Project.render_file_list(project,'layout');
	                    change_iframe_width("100%");
	                }else{
	                	var warning_button = $('<button type="button" class="btn btn-primary" id="warning-ok"></button>').append(' &nbsp; Ok &nbsp; ');
	                    warning_button.click(function(){
	                    	var project = {};
	                        project.id = object.project_id;
	                        project.project_name = object.project_name;
	                        Admin_Project_Project.render_file_list(project,'layout');
	                        change_iframe_width("100%");
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
	        )
	        .append(' / ')
	        .append(
	    		$('<div class="btn-group" id="navbar-file-list"></div>')
	    		.append(
					$('<a class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>')
					.css({padding:'0px',fontSize:'inherit'})
					.append('<i class="fa fa-file-text-o"></i> HTML Layout: ')
					.append(object.layout_name+'.html <span class="caret"></span>')
				)
				.append('<ul class="dropdown-menu"></ul>')
	        )
	    );
		
		$.get('admin/index.php',{object:'project-layout',action:'layout-list','project-id':object.project_id},function(json){
			var layouts = json;
			for(var id  in layouts){
				var layout = layouts[id];
				$('#navbar-file-list > .dropdown-menu')
				.append(
					$('<li></li>').append(
						$('<a style="cursor:pointer;"></a>')
						.data('id',layout.id)
		                .data('layout_name',layout.layout_name)
		                .data('project_id',object.project_id)
		                .data('project_name',object.project_name)
						.append('<i class="fa fa-file-text-o"></i> ')
						.append(layout.layout_name+'.html')
						.click(function(){
							var object = $(this).data();
							var Bootstrap_Builder = bootstrap_builder();
		                    if (Bootstrap_Builder.change_flag == false){
		                    	Admin_Project_Layout.render_page_builder(object);
		                    }else{
		                 	   var warning_button = $('<button type="button" class="btn btn-primary" id="warning-ok"></button>').append(' &nbsp; Ok &nbsp; ');
		                        warning_button.click(function(){
		                        	Admin_Project_Layout.render_page_builder(object);
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
					)
				);
			}
		},'json');
		
		$('#iframe-container-builder')
		.append(
			$('<iframe src="bhb-redirect.php?redirect=admin&object=project-layout&action=iframe-builder&project-id='+object.project_id+'" id="iframe-preview"></iframe>').load(function(){
				$.get('admin/index.php',{object:'project-layout',action:'get-layout','project-id':object.project_id,'layout-id':object.id},function(json){
					var layout = json;
					var portlets = (layout.portlets != undefined && layout.portlets != null)?$.parseJSON(layout.portlets):{};
					if( (typeof portlets === "object") && (portlets !== null)){
	    				var iframe = document.getElementById("iframe-preview");
	    			    if (iframe) {
	    			       var iframeContent = (iframe.contentWindow || iframe.contentDocument);
	    			       if (iframeContent.Bootstrap_Builder != undefined){
	    			    	   if (iframeContent.Bootstrap_Builder.load_sortable != undefined){
	    			    		   iframeContent.Bootstrap_Builder.load_sortable = false;
	    			    	   }
	    			    	   iframeContent.Bootstrap_Builder.display_portlets(portlets);
	    			    	   if (iframeContent.Bootstrap_Builder.load_sortable != undefined){
	    			    		   iframeContent.Bootstrap_Builder.load_sortable = true;
	    			    	   }
	    			    	   if (iframeContent.Bootstrap_Builder.sortable != undefined){
	    			    		   iframeContent.Bootstrap_Builder.sortable();
	    			    	   }
	    			       }
	    			    }
					}else{
						if (iframeContent.Bootstrap_Builder.load_sortable != undefined){
							iframeContent.Bootstrap_Builder.load_sortable = false;
						}
						iframeContent.Bootstrap_Builder.display_portlets({});
						if (iframeContent.Bootstrap_Builder.sortable != undefined){
							iframeContent.Bootstrap_Builder.sortable();
						}
						if (iframeContent.Bootstrap_Builder.load_sortable != undefined){
							iframeContent.Bootstrap_Builder.load_sortable = true;
			    	    }
					}
					$("body").unmask();
					if ($.isEmptyObject(portlets)){
						$('#iframe-preview').contents().find('#bootstrap-builder-container')
						.append('<h4 class="text-center text-muted" id="bhb-f-intro">DRAG THE TOOLBAR ELEMENTS AND TEMPLATES TO BUILD FILE</h4>');
					}
				},'json');
				resize_iframe();
		    })
		);
		
		$('#navbar-button').empty();
	    $('#navbar-button')
	    .append(
		    $('<div class="btn-group"></div>')
		    .append(
	    		$('<a class="btn btn-default btn-sm"></a>')
	    		.append('<i class="fa fa-desktop fa-lg"></i>')
	    		.click(function(){
	    			change_iframe_width("100%");
	    		})
		    )
		    .append(
	            $('<a class="btn btn-default btn-sm" id=""></a>')
	            .append('<i class="fa fa-tablet fa-lg"></i>')
	            .click(function(){
	            	change_iframe_width("940px");
	            })
	        )
	        .append(
	            $('<a class="btn btn-default btn-sm" id=""></a>')
	            .append('<i class="fa fa-mobile fa-lg"></i>')
	            .click(function(){
	            	change_iframe_width("480px");
	            })
	        )
	    )
	    .append(' ')
	    .append(
		    $('<div class="btn-group" id="file-components"></div>')
		    .append(
		       $('<a class="btn btn-default btn-sm" id="file-preview"></a>')
		       .append('<i class="fa fa-desktop fa-lg"></i> Preview ')
		       .click(function(){
		    	   var Bootstrap_Builder = bootstrap_builder();
		           if (Bootstrap_Builder.change_flag == false){
		        	   $('#file-exit-preview').show();
		        	   $('#file-preview').hide();
		        	   $('#file-save-change').hide();
		        	   $('#file-components').hide();
		        	   $("body").mask("Loading...");
		               $('#iframe-preview').attr('src','bhb-redirect.php?redirect=admin&object=project-layout&action=preview&project-id='+object.project_id+'&layout-id='+object.id)
		               .load(function(){
		            	   $("body").unmask();
		               });
		           }else{
		               $('#warning-modal .modal-body').html('<div style="height: 60px; line-height: 60px; vertical-align: middle;">' +
		                       '<i style="font-size:4em; color:#d9534f" class="fa fa-exclamation-triangle"></i>'+
		                       ' Please, click "Save change" button to save your page before do other action.'+
		                       '</div>');
		                $('#warning-modal').modal('show');
		           }
		       })
		    )
		    .append(
		        $('<div class="btn-group"></div>')
		        .append(
		           $('<a class="btn btn-primary btn-sm" id="file-save-change"></a>')
		           .append('<i class="fa fa-check fa-lg"></i> Save')
		           .click(function(){
		        	   $("body").mask("Loading...");
		               var iframe = document.getElementById("iframe-preview");
		                var iframeContent;
		                if (iframe) {
		                   iframeContent = (iframe.contentWindow || iframe.contentDocument);
		                }
		                iframeContent.Bootstrap_Builder.change_flag = false;
		                iframeContent.onbeforeunload = null;
		                var portlets = iframeContent.Bootstrap_Builder.get_portlets();
		                $.post('admin/index.php?object=project-layout&action=update-layout',{'project-id':object.project_id,'layout-id':object.id,portlets:JSON.stringify(portlets)},function(json){
		                	var layout = json;
		                	$("body").unmask();
		                	show_message('<i class="fa fa-check" style="font-size:2em;"></i> The data of file has been updated successfully');
		                },'json');
		           })
		        )
		    )
	    )
	    .append(
	       $('<a class="btn btn-danger btn-sm" id="file-exit-preview"></a>')
	       .append('<i class="fa fa-times fa-lg"></i>  Exit preview ')
	       .click(function(){
	    	   $('#file-exit-preview').hide();
	    	   $('#file-preview').show();
	    	   $('#file-save-change').show();
	    	   $('#file-components').show();
	    	   Admin_Project_Layout.render_page_builder(object);  
	       })
	       .hide()
	    );
	    resize_iframe();
	    if ($('.main-content').data('main-sidebar') == true){
	    	sidebar_toggle();
	    }
	}
};

$(document).ready(function(){
	Admin_Project_Layout.init();
});