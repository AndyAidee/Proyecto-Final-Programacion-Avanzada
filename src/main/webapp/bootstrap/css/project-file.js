var Admin_Project_File = {
	init : function (){
		$('#delete-file-modal #delete-file').click(function(){
			var project_id = $('#delete-file-modal').data('project-id');
			var file_id = $('#delete-file-modal').data('file-id');
			$.get('admin/index.php',{object:'project-file',action:'delete-file','project-id':project_id,'file-id':file_id},function(json){
				var project = json;
				Admin_Project_Project.render_file_list(project);
	            show_message('<i class="fa fa-check" style="font-size:2em;"></i> The file has been deleted successfully');
			},'json');
			$('#delete-file-modal').modal('hide');
		});
		
		$('#delete-file-modal').on('hide.bs.modal', function (e) {
	        $('#delete-file-modal').data('project-id',null);
	        $('#delete-file-modal').data('file-id',null);
	    });
		
		
		$('#file-modal #save-file').click(function(){
			var file_name = $.trim($('#file-modal #file-name').val());
			if (file_name != ''){
		        $.post('admin/index.php?object=project-file&action='+$('#file-modal').data('action')+'&template-file='+$('#file-modal').data('template-file'),$('#file-modal #file-form').serialize(),function(json){
		        	var project = json;
		        	var action = $('#file-modal').data('action');
		            switch (action){
		                case 'new-file':
		                	$('#file-modal #file-form #project-id').remove();
		                    $('#file-modal #file-form #file-name').val('');
		                	show_message('<i class="fa fa-check" style="font-size:2em;"></i> The file has been added successfully');
		                	Admin_Project_Project.render_file_list(project);
		                	break;
		                case 'edit-file':
		                	$('#file-modal #file-form input[name="project-id"]').remove();
		                    $('#file-modal #file-form input[name="file-id"]').remove();
		                    show_message('<i class="fa fa-check" style="font-size:2em;"></i> The file has been update successfully');
		                    Admin_Project_Project.render_file_list(project);
		                	break;
		                case 'copy-file':
		                	$('#file-modal #file-form input[name="project-id"]').remove();
		                    $('#file-modal #file-form input[name="file-id"]').remove();
		                    show_message('<i class="fa fa-check" style="font-size:2em;"></i> The file has been copied successfully');
		                    Admin_Project_Project.render_file_list(project);
		                	break;
		            }
		        },'json');
		        $('#file-modal').modal('hide');
			}else{
				var form_group = $('#file-modal #file-name').parent().parent();
				if (form_group.hasClass('has-error') == false){
					form_group.addClass('has-error');
					$('#file-modal #file-name').parent().append('<span class="help-block">The Project name field is required.</span>');
				}
			}
		});
		
		$('#file-modal').on('hidden.bs.modal', function (e) {
			$('#file-modal').data('file_layout_id','');
			$('#file-modal #file-name').parent().parent().removeClass('has-error');
			$('#file-modal .help-block').remove();
	    });
		
		$('#file-modal').on('show.bs.modal', function (e) {
			var action = $('#file-modal').data('action');

			var project_id = $('#file-modal').data('project-id');
			$.get('admin/index.php',{object:'project-file',action:'layout-list','project-id':project_id},function(layouts){
				var action = $('#file-modal').data('action');
				if (action == 'new-file'){
					$('#file-modal #file-layout-element').html('<select name="file-layout" id="file-layout" class="form-control"></select>');
					$('#file-modal #file-layout').append('<option></option>');
					if (layouts != undefined && layouts != null){
						$.each(layouts,function (k,v){
							$('#file-modal #file-layout')
							.append(
								$('<option value="'+ v.id +'"></option>').text(v.layout_name+'.html')
							);
						});
					}
				}else{
					var file_layout_id = $('#file-modal').data('file_layout_id');
					if (layouts != undefined && layouts != null){
						$('#file-modal #file-layout-element').html(
							$('<p class="form-control-static"></p>').append(((layouts[file_layout_id] != undefined)?layouts[file_layout_id].layout_name+'.html':'This file don\'t use the layout'))
						);
					}
				}
			},'json');
	    });
		
		$('#file-modal #file-name').on("keypress", function(e) {
			var value = $(this).val();
	        if (e.keyCode == 13) {
	        	if ($.trim(value) != ''){
	        		$('#file-modal #save-file').trigger('click');
	        	}
	            return false;
	        }
	    });
		
		
		$('#file-setting-modal #save-file-setting').click(function(){
			var post_data = {};
			post_data['project-id'] = $('#file-setting-modal').data('project-id');
			post_data['file-id'] = $('#file-setting-modal').data('file-id');
			var settings = {};
			settings.title = $('#file-setting-modal #file-title').val();
			settings.meta_keywords = $('#file-setting-modal #file-meta-keywords').val();
			settings.meta_description = $('#file-setting-modal #file-meta-description').val();
			settings.background_color = $('#file-setting-modal #file-background-color').val();
			post_data.settings = settings;
			$.post('admin/index.php?object=project-file&action=save-file-setting',post_data,function(){
				$('#file-setting-modal').modal('hide');
				show_message('<i class="fa fa-check" style="font-size:2em;"></i> The data of file has been updated successfully');
				if (settings.background_color != undefined && settings.background_color != ''){
					$('#iframe-preview').contents().find('body').css({backgroundColor:settings.background_color});
				}else{
					$('#iframe-preview').contents().find('body').css({backgroundColor:'transparent'});
				}
			},'json');
		});
		
		$('#file-setting-modal').on('show.bs.modal', function () {
			$('#file-setting-modal #file-title').val('');
			$('#file-setting-modal #file-meta-keywords').val('');
			$('#file-setting-modal #file-meta-description').val('');
			$('#file-setting-modal #file-background-color').val('');
			
			var data = {};
			data['project-id'] = $('#file-setting-modal').data('project-id');
			data['file-id'] = $('#file-setting-modal').data('file-id');
			$.get('admin/index.php?object=project-file&action=get-file',data,function(json){
				var file = json;
				if (file.settings != undefined){
					var settings = file.settings;
					if (settings.title != undefined && settings.title != ''){
						$('#file-setting-modal #file-title').val(settings.title);
					}
					if (settings.meta_keywords != undefined && settings.meta_keywords != ''){
						$('#file-setting-modal #file-meta-keywords').val(settings.meta_keywords);
					}
					if (settings.meta_description != undefined && settings.meta_description != ''){
						$('#file-setting-modal #file-meta-description').val(settings.meta_description);
					}
					if (settings.background_color != undefined && settings.background_color != ''){
						$('#file-setting-modal #file-background-color').val(settings.background_color);
					}
				}
			},'json');
		});
		
		$('#file-setting-modal .file-background-color-picker').colorpicker({format:'hex'});    
	    $('#file-setting-modal #file-background-color').click(function(){
	        $('#file-setting-modal .file-background-color-picker').colorpicker('show');  
	    });
	},
	file_list : function(project) {
		$.get('admin/index.php',{object:'project-file',action:'index','project-id':project.id},function(html){
		   $('#file-modal').data('project-id',project.id);
		   $('#file-list').append(html);
		   
		   $('#file-list .file-item').data('project_id',project.id);
		   $('#file-list .file-item').data('project_name',project.project_name);
		   
		   $('#file-list .delete-btn').click(function(){
				var layout = $(this).parent().parent().data();
				$('#delete-file-modal').data('project-id',layout.project_id);
				$('#delete-file-modal').data('file-id',layout.id);
				$('#delete-file-modal').modal('show');
		   });
		   
		   $('#file-list .edit-btn').click(function(){
			   var file = $(this).parent().parent().data();
			   $('#file-modal #file-form input[name="project-id"]').remove();
        	   $('#file-modal #file-form input[name="file-id"]').remove();
        	   $('#file-modal #file-form')
               .append(
                   $('<input type="hidden" id="project-id" name="project-id">').val(file.project_id)
               )
        	   .append(
                   $('<input type="hidden" id="file-id" name="file-id">').val(file.id)
               );
               $('#file-modal #file-form #file-name').val(file.file_name);
               $('#file-modal-label').html('<i class="fa fa-file-text-o"></i> Edit file');
               $('#file-modal').data('file_layout_id',file.file_layout_id);
               $('#file-modal').data('action','edit-file');
               $('#file-modal').modal('show');
			   
		   });
		   
		   $('#file-list .copy-btn').click(function(){
			   var file = $(this).parent().parent().data();
           	   var Bootstrap_Builder = bootstrap_builder();
        	   $('#file-modal #file-form input[name="project-id"]').remove();
               $('#file-modal #file-form input[name="file-id"]').remove();
               $('#file-modal #file-form')
               .append(
                   $('<input type="hidden" id="project-id" name="project-id">').val(file.project_id)
               )
               .append(
                   $('<input type="hidden" id="file-id" name="file-id">').val(file.id)
               );
               $('#file-modal #file-form #file-name').val(file.file_name+'-copy');
               $('#file-modal-label').html('<i class="fa fa-file-text-o"></i> Copy file');
               $('#file-modal').data('action','copy-file');
               $('#file-modal').modal('show');
		   });
		   
		   $('#file-list .download-btn').click(function(){
			   $('#demo-modal').modal('show');
		   });
		   
		   $('#file-list .item-mask, #file-list .file-span, #file-list .file-icon').click(function(){
			   var object = $(this).parent().data();
			   Admin_Project_File.render_page_builder(object);
		   });
		   
		   $('#file-list')
	       .append(
	           $('<div class="file-item" style="cursor:pointer; margin-top:35px;" ></div>')
	           .append(
	               $('<i class="fa fa-plus-circle" style="font-size:1.4em;"></i>')
	           )
	           .append(' New file')
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
	                    Admin_Project_Project.render_file_list(project);
	                    change_iframe_width("100%");
	                }else{
	                	var warning_button = $('<button type="button" class="btn btn-primary" id="warning-ok"></button>').append(' &nbsp; Ok &nbsp; ');
	                    warning_button.click(function(){
	                    	var project = {};
	                        project.id = object.project_id;
	                        project.project_name = object.project_name;
	                        Admin_Project_Project.render_file_list(project);
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
					.append('<i class="fa fa-file-text-o"></i> HTML File: ')
					.append(object.file_name+'.html <span class="caret"></span>')
				)
				.append('<ul class="dropdown-menu"></ul>')
	        )
	    );
		
		$.get('admin/index.php',{object:'project-file',action:'file-list','project-id':object.project_id},function(json){
			var files = json;
			for(var id  in files){
				var file = files[id];
				$('#navbar-file-list > .dropdown-menu')
				.append(
					$('<li></li>').append(
						$('<a style="cursor:pointer;"></a>')
						.data('id',file.id)
		                .data('file_name',file.file_name)
		                .data('file_layout_id',file.file_layout_id)
		                .data('project_id',object.project_id)
		                .data('project_name',object.project_name)
						.append('<i class="fa fa-file-text-o"></i> ')
						.append(file.file_name+'.html')
						.click(function(){
							var object = $(this).data();
							var Bootstrap_Builder = bootstrap_builder();
		                    if (Bootstrap_Builder.change_flag == false){
		                    	Admin_Project_File.render_page_builder(object);
		                    }else{
		                 	   var warning_button = $('<button type="button" class="btn btn-primary" id="warning-ok"></button>').append(' &nbsp; Ok &nbsp; ');
		                        warning_button.click(function(){
		                        	Admin_Project_File.render_page_builder(object);
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
			$('<iframe src="bhb-redirect.php?redirect=admin&object=project-file&action=iframe-builder&project-id='+object.project_id+'" id="iframe-preview"></iframe>').load(function(){
				if (object.file_layout_id != undefined && $.trim(object.file_layout_id) != ''){
					$.get('admin/index.php',{object:'project-file',action:'get-layout','project-id':object.project_id,'layout-id':object.file_layout_id,'file-id':object.id},function(json){
						var layout = json;
						var portlets = (layout.portlets != undefined && layout.portlets != null)?$.parseJSON(layout.portlets):{};
						$.each(portlets,function(k,v){
							v.layout_id = object.file_layout_id;
							portlets[k] = v;
						});
						layout.portlets  = portlets;
						
						Admin_Project_File.get_file(object,layout);
					},'json');
				}else{
					Admin_Project_File.get_file(object,{});
				}
				
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
		       $('<a class="btn btn-info btn-sm" id="file-setting"></a>')
		       .append('<i class="fa fa-cog fa-lg"></i> Setting')
		       .click(function(){
		    	   $('#file-setting-modal').data('file-id',object.id);
		    	   $('#file-setting-modal').data('project-id',object.project_id);
		    	   $('#file-setting-modal').modal('show');
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
		               $('#iframe-preview').attr('src','bhb-redirect.php?redirect=admin&object=project-file&action=preview&project-id='+object.project_id+'&file-id='+object.id)
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
		                $.post('admin/index.php?object=project-file&action=update-file',{'project-id':object.project_id,'file-id':object.id,portlets:JSON.stringify(portlets)},function(json){
		                	var file = json;
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
	    	   Admin_Project_File.render_page_builder(object);  
	       })
	       .hide()
	    );
	    resize_iframe();
	    if ($('.main-content').data('main-sidebar') == true){
	    	sidebar_toggle();
	    }
	},
	
	get_file : function (object,layout){
		$.get('admin/index.php',{object:'project-file','action':'get-file','project-id':object.project_id,'file-id':object.id},function(json){
			var file = json;
			if (file.settings != undefined && file.settings.background_color != undefined && file.settings.background_color != ''){
				$('#iframe-preview').contents().find('body').css({backgroundColor:file.settings.background_color});
			}
			var portlets = (file.portlets != undefined && file.portlets != null)?$.parseJSON(file.portlets):{};
			if( (typeof portlets === "object") && (portlets !== null) && $.isEmptyObject(portlets) == false){
				var iframe = document.getElementById("iframe-preview");
			    if (iframe) {
			       var iframeContent = (iframe.contentWindow || iframe.contentDocument);
			       if (iframeContent.Bootstrap_Builder != undefined){
			    	   if (iframeContent.Bootstrap_Builder.load_sortable != undefined){
			    		   iframeContent.Bootstrap_Builder.load_sortable = false;
			    	   }
			    	   var layout_portlets = layout.portlets;
			    	   if ($.isEmptyObject(layout) == false && $.isEmptyObject(layout_portlets) == false && layout.file_order_ids != undefined && $.isEmptyObject(layout.file_order_ids) == false){
			    		   var mix_portlet = {};
			    		   $.each(layout.file_order_ids, function(k, id){
			    			   if (portlets[id] != undefined && $.isEmptyObject(portlets[id]) == false){
			    				   mix_portlet[id] = portlets[id]; 
			    			   }else if (layout_portlets[id] != undefined && $.isEmptyObject(layout_portlets[id]) == false){
			    				   mix_portlet[id] = layout_portlets[id]; 
			    			   }
			    		   });
			    		   portlets = mix_portlet;
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
				var layout_portlets = layout.portlets;
				var iframe = document.getElementById("iframe-preview");
			    if (iframe) {
			        var iframeContent = (iframe.contentWindow || iframe.contentDocument);
			        if (iframeContent.Bootstrap_Builder != undefined){
						if (iframeContent.Bootstrap_Builder.load_sortable != undefined){
							iframeContent.Bootstrap_Builder.load_sortable = false;
						}
						iframeContent.Bootstrap_Builder.display_portlets(layout_portlets);
						if (iframeContent.Bootstrap_Builder.sortable != undefined){
							iframeContent.Bootstrap_Builder.sortable();
						}
						if (iframeContent.Bootstrap_Builder.load_sortable != undefined){
							iframeContent.Bootstrap_Builder.load_sortable = true;
			    	    }
			       }
			    }
			}
			$("body").unmask();
			if ($.isEmptyObject(portlets) && $.isEmptyObject(layout)){
				$('#iframe-preview').contents().find('#bootstrap-builder-container')
				.append('<h4 class="text-center text-muted" id="bhb-f-intro">DRAG THE TOOLBAR ELEMENTS AND TEMPLATES TO BUILD FILE</h4>');
			}
		},'json');
	}
};
$(document).ready(function(){
	Admin_Project_File.init();
});