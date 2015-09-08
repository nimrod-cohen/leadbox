function base_url(path)
{
	var base = document.location.protocol + "//" + document.location.host;
	if(typeof path == "undefined" || path == null || path.length == 0)
		return base;
	else
		return base.replace(/^(.+?)\/*$/,"$1") + "/" + path.replace(/^\/*(.+?)$/,"$1");
}

$(document).ready(function() {
    // This command is used to initialize some elements and make them work properly
    $.material.init();

	//some preparations
	$('#txt_input_background').colorpicker();
	$("#txt_text_color").colorpicker();
	$('#txt_submit_background').colorpicker();
	$('#txt_input_color').colorpicker();
	$('#txt_submit_color').colorpicker();
	$('#txt_form_background').colorpicker();

	enable_auto_refresh();

   	$("#btn_refresh").click(function(){
   		render();
   	});

   	$("#btn_get_code").click(function(){
		get_code();
   		$("#dlg_show_code").modal("show");
   	});

   	$("#btn_success_action").click(function () {
   		$("#dlg_success_code").modal("show");
   	})

   	$("#btn_fields").click(function(){
   		$("#dlg_fields").modal("show");
   	});

	$("#chk_mailgun").change(function()
	{
		if(is_checked("chk_mailgun"))
			$("#dlg_mailgun_api_key").modal("show");
	});

	$("#add_field_row").click(function()
	{
		var label = $("#txt_label").val();
		var field = $("#txt_field_name").val();
		var field_value = $("#txt_field_value").val();
		var type = $("#ddl_field_type").text();
		var required = is_checked("chk_required");

		toggle_field_row_events(false);

		$("#tbl_fields tbody").append("<tr><td>"+label+"</td><td>"+field+"</td><td>"+field_value+
			"</td><td>"+type+"</td><td>"+(required ? 'YES' : '')+
			"</td><td><button class='btn btn-danger btn-xs btn-remove-field'>REMOVE</button>"+
			"<button class='btn btn-primary btn-xs btn-move-field'><i class='mdi mdi-hardware-keyboard-arrow-up'></i></button></td></tr>");

		toggle_field_row_events(true);

		$("#txt_label").val("");
		$("#txt_field_name").val("");
		$("#txt_field_value").val("");		
	});

	$("#btn_auto_refresh").click(function(){
		$(this).toggleClass("active btn-material-yellow-600");
	});

	$("#chk_redirect").change(function () 
	{
		$("#txt_redirect_url").css("display", $(this).is(":checked") ? "" : "none");
		$("#txt_thanku_html").css("display", $(this).is(":checked") ? "none" : "");
	});

	//changing dropdown label text after selection
	$(".dropdown-menu li a").click(function(){ $(this).closest(".dropdown").find(".dropdown-toggle").html($(this).text()+" <span class='caret'></span>"); });

	$("#btn_save_fields").click(function(){ render(); });

	/* MENU ACTIONS */

	$('#btn_load_config').click(function(){
		$("#dlg_load_config").modal("show");
	});

	$('#btn_load_config_url').click(function(){
		$.get( base_url("generate/all"), function( data ) {

			//clear the table
			$("button.btn-load-script").off("click");
			$( "#tbl_hosted_scripts tbody tr").remove();

			data = JSON.parse(data);


			for(var i =0; i< data.length;i++)
			{
				$( "#tbl_hosted_scripts tbody" ).append( "<tr><td>"+data[i].name+"</td><td>"+data[i].url+"</td><td><button class='btn btn-primary btn-xs btn-load-script'>Load</button></td></tr>");
			}

			$("button.btn-load-script").on("click", function () {
				var name = $(this).closest("tr").children("td:first-child").text();
				$.post( base_url("generate/load"),{ "name" : name}, function( data ) {
					data = JSON.parse(data);

					set_options(data);

					render();

					$("#dlg_saved_scripts").modal("hide");
				});
			});
		});
		$('#dlg_saved_scripts').modal("show");
	});

	$('#btn_save_config').click(function(){

		var options = get_options();

		var fileText = JSON.stringify(options);

		var blob = new Blob([fileText], {type: "text/plain;charset=utf-8"});

		BootstrapDialog.confirm({
			title: 'Save Script',
			message: $("<label>Name your script</label><input class='script-name form-control' placeholder='Script name' type='text'>"),
			callback: function (result) {
				if (!result)
					return;
				var scriptName = $('input.script-name').val();

				saveAs(blob, scriptName+".txt");
			}
		});
	});

	$('#btn_save_config_url').click(function() {

		BootstrapDialog.confirm({
			title: 'Hosted Code',
			message: $("<label>Name your script</label><input class='script-name form-control' placeholder='Script name' type='text'>"),
			callback : function(result) {
				if(!result)
					return;
				var scriptName = $('input.script-name').val();

				//TODO: validate script name
				if(!/^[a-z0-9_.]+$/ig.test(scriptName))
				{
					alert("Please use only alpha numeric characters, underscore and dot");
					return;
				}

				var options = get_options();
				var script = get_javascript_code_part();

				$.post(base_url("generate"),{ options : JSON.stringify(options), script: script, name : scriptName},function(data){
					data = JSON.parse(data);

					if(data.success)
						BootstrapDialog.alert("Success, your file is ready:<br/>"+data.file);
					else
						BootstrapDialog.alert("Failed to create script file");
				});
			}
		});
	});

	/* END MENU ACTIONS */

	$("#txt_scripts_filter").keyup(function(){
		var val = $(this).val();
		$("#tbl_hosted_scripts tbody tr td:first-child").each(function(){
			if(val.length == 0 || $(this).text().indexOf(val) > -1)
				$(this).parent().css("display","");
			else
				$(this).parent().css("display","none");
		});
	});

	$("#btn_load_this_config").click(function(){
		var options = $("#txt_config_data").val();
		options = JSON.parse(options);

		set_options(options);

		render();
	});

	render();
});

function enable_auto_refresh()
{
	//checkboxes and texts
	$("#chk_orientation, #chk_labels, #txt_text_width, #txt_border_radius, #chk_LTR, #chk_oppositeSubmit, #txt_fonts" +
		"#ddl_language, #txt_save_text, #txt_tag_line, #chk_mailgun, #chk_suggestions, #chk_disposables").change(function(){
		if($("#btn_auto_refresh").hasClass("active"))
			render();
	})

	//handle color picker changes
	$('#txt_submit_color, #txt_input_color, #txt_text_color, #txt_input_background, #txt_submit_background, #txt_form_background').colorpicker().on('changeColor.colorpicker', function(event){
		if($("#btn_auto_refresh").hasClass("active"))
			render();
	});

	//drop downs
	$(".panel-body .dropdown-menu a").click(function()
	{
		if($("#btn_auto_refresh").hasClass("active"))
		{
			$("#ddl_language").text($(this).text());
			render();
		}
	});
}

function is_checked(id)
{
	return $("#"+id).is(":checked");
}

function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function render()
{
	$("div[leadbox-form]").html("");

	var options = get_options();
	options.callback = function(data) { console.log(data); };

	window.lpManager.init(options);
}

function get_options()
{
	var fields = [];
	$("#tbl_fields tbody tr").each(function(){
		fields.push({
			label : $($(this).children()[0]).text().trim(),
			name : $($(this).children()[1]).text().trim(),
			value : $($(this).children()[2]).text().trim(),
			type : $($(this).children()[3]).text().trim(),
			required : $($(this).children()[4]).text() == 'YES' ? true : false
		});
	})

	var radius = parseInt($("#txt_border_radius").val());
	radius = isNaN(radius) ? 0 : radius;

	var options = {
		submit : {
			background : $("#txt_submit_background").val(),
			text_color : $("#txt_submit_color").val(),
			oppositeDirection : is_checked("chk_oppositeSubmit")
		},
		input : {
			background : $("#txt_input_background").val(),
			text_color : $("#txt_input_color").val(),
			max_width : $("#txt_text_width").val(),
		},
		color : $("#txt_text_color").val(),
		google_fonts : $("#txt_fonts").val(),
		background : $("#txt_form_background").val(),
		thanku_html : $("#txt_thanku_html").val(),
		layout : is_checked("chk_orientation") ? "vertical" : "horizontal",
		border_radius : radius,
		show_labels : is_checked("chk_labels"),
		language : $("#ddl_language").text().trim().toLowerCase(),
		direction : is_checked("chk_LTR") ? "ltr" : "rtl",
		enable_validator : is_checked("chk_mailgun"),
		enable_suggestions : is_checked("chk_suggestions"),
		enable_disposables_check : is_checked("chk_disposables"),
		mailgun_key : $("#txt_mailgun_api_key").val(),
		languageOverrides : {
			save : $("#txt_save_text").val(),
			tag_line : $("#txt_tag_line").val()
		},
		fields : fields
	}

	return options;
}

function toggle_field_row_events(isOn)
{
	if(!isOn)
	{
		$(".btn-remove-field").unbind('click');
		$(".btn-move-field").unbind('click');
	}
	else
	{
		$(".btn-remove-field").click(function(){$(this).closest("tr").remove();	});
		$(".btn-move-field").click(function () {
			var tr = $(this).closest("tr");

			if (tr.index() == 1)
				tr.closest("tbody").prepend(tr);
			else if (tr.index() > 1)
				tr.prev().insertAfter(tr);

			return false;
		});
	}
}

function set_options(options)
{
	toggle_field_row_events(false);

	$("#tbl_fields tbody tr").remove();

	for(var i = 0; i< options.fields.length; i++)
	{
		var field = options.fields[i];
		$("#tbl_fields tbody").append("<tr><td>"+field.label+"</td><td>"+field.name+"</td><td>"+field.value+"</td><td>"+field.type+"</td><td>"+(field.required ? "YES" : "")+"</td><td><button class='btn btn-danger btn-xs btn-remove-field'>REMOVE</button><button class='btn btn-primary btn-xs btn-move-field'><i class='mdi mdi-hardware-keyboard-arrow-up'></i></button></td></tr>");
	}

	toggle_field_row_events(true);

	$("#txt_border_radius").val(options.border_radius);
	$("#txt_submit_background").val(options.submit.background);
	$("#txt_submit_color").val(options.submit.text_color);

	$("#txt_input_background").val(options.input.background);
	$("#txt_input_color").val(options.input.text_color);
	$("#txt_text_width").val(options.input.max_width);

	$("#txt_text_color").val(options.color);
	$("#txt_fonts").val(options.google_fonts);
	$("#txt_form_background").val(options.background);
	$("#txt_thanku_html").val(options.thanku_html);
	set_checked("#chk_orientation",options.layout == "vertical");
	set_checked("#chk_labels",options.show_labels);
	set_checked("#chk_LTR",options.direction == "ltr");
	set_checked("#chk_OppositeSubmit",options.submit.oppositeDirection);

	set_checked("#chk_mailgun",options.enable_validator);
	set_checked("#chk_suggestions",options.enable_suggestions);
	set_checked("#chk_disposables",options.enable_disposables_check);

	$("#txt_mailgun_api_key").val(options.mailgun_key);
	$("#txt_save_text").val(options.languageOverrides.save);
	$("#txt_tag_line").val(options.languageOverrides.tag_line);

	$("#ddl_language").html(options.language + " <span class='caret'></span>");

	return options;
}

function set_checked(selector,checked)
{
	if(checked)
		$(selector).attr("checked");
	else
		$(selector).removeAttr("checked");	
}

function get_javascript_code_part()
{
	var code = "var myFields = [";

	var first = true;
	$("#tbl_fields tbody tr").each(function(){
		code += !first ? "," : "";
		first = false;

		code += "<br/>&emsp;{"+
		"label : '"+$($(this).children()[0]).text()+"', " +
		"name : '"+$($(this).children()[1]).text()+"', " +
		"value : '"+$($(this).children()[2]).text()+"', " +
		"type : '"+$($(this).children()[3]).text().trim()+"', " +
		"required : "+($($(this).children()[4]).text() == 'YES' ? 'true' : 'false')+ "}";
	});

	var radius = parseInt($("#txt_border_radius").val());
	radius = isNaN(radius) ? 0 : radius;

	code += "<br/>];";

	code += "<br/>var options = {";
	code += "<br/>&emsp;submit : {";
	code += "<br/>&emsp;&emsp;background : '"+$("#txt_submit_background").val()+"',";
	code += "<br/>&emsp;&emsp;text_color : '"+$("#txt_submit_color").val()+"',";
	code += "<br/>&emsp;&emsp;oppositeDirection : '"+is_checked("chk_oppositeSubmit")+"'";
	code += "<br/>&emsp;},";
	code += "<br/>&emsp;input : {";
	code += "<br/>&emsp;&emsp;background : '"+$("#txt_input_background").val()+"',";
	code += "<br/>&emsp;&emsp;text_color : '"+$("#txt_input_color").val()+"',";
	code += "<br/>&emsp;&emsp;max_width : '"+$("#txt_text_width").val()+"'";
	code += "<br/>&emsp;},";
	code += "<br/>&emsp;color : \"" + $("#txt_text_color").val() + "\",";
	code += "<br/>&emsp;google_fonts : \"" + $("#txt_fonts").val() + "\",";
	code += "<br/>&emsp;background : '"+$("#txt_form_background").val()+"',";
	code += "<br/>&emsp;thanku_html : '"+htmlEncode($("#txt_thanku_html").val())+"',";
	code += "<br/>&emsp;layout : '"+(is_checked("chk_orientation") ? "vertical" : "horizontal")+"',";
	code += "<br/>&emsp;border_radius : " + radius + ",";
	code += "<br/>&emsp;show_labels : "+is_checked("chk_labels")+",";
	code += "<br/>&emsp;language : '"+$("#ddl_language").text().trim().toLowerCase()+"',";
	code += "<br/>&emsp;direction : '"+(is_checked("chk_LTR") ? "ltr" : "rtl")+"',";
	code += "<br/>&emsp;enable_validator : "+is_checked("chk_mailgun")+",";
	code += "<br/>&emsp;enable_suggestions : "+is_checked("chk_suggestions")+",";
	code += "<br/>&emsp;enable_disposables_check : "+is_checked("chk_disposables")+",";
	code += "<br/>&emsp;mailgun_key : '"+$("#txt_mailgun_api_key").val()+"',";
	code += "<br/>&emsp;languageOverrides : {";
	code += "save : '"+$("#txt_save_text").val()+"',";
	code += "tag_line : '"+$("#txt_tag_line").val()+"'";
	code += "},";
	code += "<br/>&emsp;fields : myFields";
	code += "<br/>}";

	code += "<br/>options.callback = function(data) {<br/>try {";

	var is_redir = is_checked("chk_redirect");
	if(is_redir)
		code += "<br/>var redir = function() { document.location.href = '"+ $("#txt_redirect_url").val() + "'; };";

	code += "<br/>"+$("#txt_success_code").val();

	if(is_checked("chk_adtime"))
	{
		code += "<br/>var _cmq = window._cmq || [];";
		code += "<br/>_cmq.push(['leadForm', jQuery('form.lp-container')[0]"+(is_redir ? ",redir,500" : "")+"]);";
	}

	if(!is_redir)
	{
		code += "<br/>jQuery('div.thanku-pop').css('display','inline-block');";
		code += "<br/>jQuery('form.lp-container .lp-row').css('visibility','hidden');";
	}

	if(is_redir && !is_checked("chk_adtime"))
	{
		code += "<br/>setTimeout(redir,500);";
	}
	code += "<br/>}<br/> catch(ex)<br/>{}<br/>};";
	code += "<br/>window.lpManager.init(options);";

	code += "<br/>$('input, textarea').placeholder();";

	return code;
}

function get_code()
{
	var code = "&lt;script type=\"text/javascript\"&gt;<br/>";

	code += get_javascript_code_part();

	code += "<br/>&lt;/script&gt;"

	$("#txt_code").html(code);
}