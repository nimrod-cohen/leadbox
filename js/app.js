$(document).ready(function() {
    // This command is used to initialize some elements and make them work properly
    $.material.init();

	//some preparations
	$('#txt_input_background').colorpicker();
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

		$("#tbl_fields tbody").append("<tr><td>"+label+"</td><td>"+field+"</td><td>"+field_value+
			"</td><td>"+type+"</td><td>"+(required ? 'YES' : '')+
			"</td><td><button class='btn btn-danger btn-xs btn-remove-field'>REMOVE</button>"+
			"<button class='btn btn-primary btn-xs btn-move-field'><i class='mdi mdi-hardware-keyboard-arrow-up'></i></button></td></tr>");

		$(".btn-remove-field").unbind('click').click(function(){$(this).closest("tr").remove();	})
		$(".btn-move-field").unbind('click').click(function(){
			var tr = $(this).closest("tr");

			if(tr.index() == 1)
				tr.closest("tbody").prepend(tr);
			else if(tr.index() > 1)
				tr.prev().insertAfter(tr);

			return false;
		});

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

	$(".dropdown-menu li a").click(function(){ $(this).closest(".dropdown").find(".dropdown-toggle").html($(this).text()+" <span class='caret'></span>"); });

	$("#btn_save_fields").click(function(){ render(); });

	render();
});

function enable_auto_refresh()
{
	//checkboxes and texts
	$("#chk_orientation, #chk_labels, #txt_text_width, #txt_border_radius, #chk_LTR, #txt_fonts" +
		"#ddl_language, #txt_save_text, #chk_mailgun, #chk_suggestions, #chk_disposables").change(function(){
		if($("#btn_auto_refresh").hasClass("active"))
			render();
	})

	//handle color picker changes
	$('#txt_submit_color, #txt_input_color, #txt_input_background, #txt_submit_background, #txt_form_background').colorpicker().on('changeColor.colorpicker', function(event){
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
		},
		input : {
			background : $("#txt_input_background").val(),
			text_color : $("#txt_input_color").val(),
			max_width : $("#txt_text_width").val(),
		},
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
		},
		fields : fields
	}

	options.callback = function(data) { console.log(data); };

	window.lpManager.init(options);
}

function get_code()
{
	var code = "&lt;script type=\"text/javascript\"&gt;<br/>var myFields = [";

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
	code += "<br/>&emsp;&emsp;text_color : '"+$("#txt_submit_color").val()+"'";
	code += "<br/>&emsp;},";
	code += "<br/>&emsp;input : {";
	code += "<br/>&emsp;&emsp;background : '"+$("#txt_input_background").val()+"',";
	code += "<br/>&emsp;&emsp;text_color : '"+$("#txt_input_color").val()+"',";
	code += "<br/>&emsp;&emsp;max_width : '"+$("#txt_text_width").val()+"'";
	code += "<br/>&emsp;},";
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
	code += "save : '"+$("#txt_save_text").val()+"'";
	code += "},";
	code += "<br/>&emsp;fields : myFields";
	code += "<br/>}";

	code += "<br/>options.callback = function(data) {<br/>try {";

	var is_redir = is_checked("chk_redirect");
	if(is_redir)
		code += "<br/>var redir = function() { document.location.href = '"+ $("#txt_redirect_url").val() + "'; };";

	if(is_checked("chk_adtime"))
	{
		code += "<br/>var _cmq = window._cmq || [];";
		code += "<br/>_cmq.push(['leadForm', jQuery('form.lp-container')[0]"+(is_redir ? ",redir,500" : "")+"]);";
	}

	code += "<br/>"+$("#txt_success_code").val();

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

	code += "<br/>&lt;/script&gt;"

	$("#txt_code").html(code);
}