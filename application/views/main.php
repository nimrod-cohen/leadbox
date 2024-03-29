<div class="container-fluid main">
	<div class="row">
		<div class="col col-xs-4 menu">
			<div class="panel panel-info">
				<div class="panel-heading">
					<h3 class="panel-title" data-toggle="collapse" data-target="#pnl_layout">Layout</h3>
				</div>
				<div id="pnl_layout" class="panel-body collapse">
					<div class="form-group">
						<label for="txt_form_background" class="col-xs-6 control-label">Form Background</label>
						<div class="col-xs-6">
							<input id="txt_form_background" type="text" class="form-control" value="white" />
						</div>
					</div>
					<div class="togglebutton">
						<label>Vertical Orientation <input id="chk_orientation" type="checkbox" checked=""></label>
					</div>
					<div class="togglebutton">
						<label>Show Labels <input id="chk_labels" type="checkbox" checked=""></label>
					</div>
					<div class="form-group">
						<label for="txt_text_width" class="col-xs-6 control-label">Text Width</label>
						<div class="col-xs-6">
							<input type="text" class="form-control empty" id="txt_text_width" placeholder="e.g 300" value="250" >
						</div>
					</div>
					<div class="form-group">
						<label for="txt_border_radius" class="col-xs-6 control-label">Border Radius</label>
						<div class="col-xs-6">
							<input type="text" class="form-control empty" id="txt_border_radius" placeholder="radius in pixels" value="4" >
						</div>
					</div>
					<div class="togglebutton">
						<label>Direction Left to Right <input id="chk_LTR" type="checkbox" checked=""></label>
					</div>
					<div class="togglebutton">
						<label>Submit On Opposite Direction <input id="chk_oppositeSubmit" type="checkbox"></label>
					</div>
				</div>
			</div>
			<div class="panel panel-info">
				<div class="panel-heading">
					<h3 class="panel-title" data-toggle="collapse" data-target="#pnl_colors">Fonts & Colors</h3>
				</div>
				<div id="pnl_colors" class="panel-body collapse">
					<div class="form-group">
						<label for="txt_fonts" class="col-xs-6 control-label">Font (Google Web Fonts)</label>
						<div class="input-group col-xs-6">
							<input id="txt_fonts" type="text" class="form-control" placeholder="e.g. 'Droid Sans', 'Droid Serif'" value="'Droid Sans', 'Droid Serif'" />
						</div>
					</div>
					<div class="form-group">
						<label for="txt_text_color" class="col-xs-6 control-label">Text Color</label>
						<div class="input-group col-xs-6">
							<input id="txt_text_color" type="text" class="form-control" value="#000000" />
						</div>
					</div>
					<div class="form-group">
						<label for="txt_input_background" class="col-xs-6 control-label">Input Background</label>
						<div class="input-group col-xs-6">
							<input id="txt_input_background" type="text" class="form-control" value="#F4F2F2" />
						</div>
					</div>
					<div class="form-group">
						<label for="txt_input_color" class="col-xs-6 control-label">Input Text Color</label>
						<div class="input-group col-xs-6">
							<input id="txt_input_color" type="text" class="form-control" value="#000000" />
						</div>
					</div>
					<div class="form-group">
						<label for="txt_submit_background" class="col-xs-6 control-label">Submit Background</label>
						<div class="input-group col-xs-6">
							<input id="txt_submit_background" type="text" class="form-control" value="#2ea7ff" />
						</div>
					</div>
					<div class="form-group">
						<label for="txt_submit_color" class="col-xs-6 control-label">Submit Text Color</label>
						<div class="input-group col-xs-6">
							<input id="txt_submit_color" type="text" class="form-control" value="#FFFFFF" />
						</div>
					</div>
				</div>
			</div>
			<div class="panel panel-info">
				<div class="panel-heading">
					<h3 class="panel-title" data-toggle="collapse" data-target="#pnl_language">Language</h3>
				</div>
				<div id="pnl_language" class="panel-body collapse">
					<label for="ddl_language" class="col-xs-6 control-label">Language</label>
					<div class="input-group col-xs-6">
						<div class="dropdown">
							<button class="btn btn-default dropdown-toggle" type="button" id="ddl_language" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">English <span class="caret"></span></button>
							<ul class="dropdown-menu" aria-labelledby="ddl_language">
								<li><a href="#">Hebrew</a></li>
								<li><a href="#">English</a></li>
							</ul>
						</div>
					</div>
					<div class="form-group">
						<label for="txt_save_text" class="col-xs-6 control-label">Save Button Text</label>
						<div class="input-group col-xs-6">
							<input id="txt_save_text" type="text" class="form-control" placeholder="Save" value="Save" />
						</div>
						<label for="txt_tag_line" class="col-xs-12 control-label">Tag Line</label>
						<div class="input-group col-xs-12">
							<textarea id="txt_tag_line" style="width:100%" rows="4"></textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="panel panel-info">
				<div class="panel-heading">
					<h3 class="panel-title" data-toggle="collapse" data-target="#pnl_validations">Validations</h3>
				</div>
				<div id="pnl_validations" class="panel-body collapse">
					<div class="togglebutton">
						<label>Mailgun Validator <input id="chk_mailgun" type="checkbox"></label>
					</div>
					<div class="togglebutton">
						<label>Suggestions <input id="chk_suggestions" type="checkbox" checked=""></label>
					</div>
					<div class="togglebutton">
						<label>Disposable Mail <input id="chk_disposables" type="checkbox"></label>
					</div>
				</div>
			</div>
		</div>
		<div class="pages col-xs-7">
			<div class="well page active" id="about" style="display: block;">
				<h1 class="header">LeadBox Preview</h1>
				<div leadbox-form></div>
			</div>
		</div>
	</div>
</div>
<div id="dlg_mailgun_api_key" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 class="modal-title">Mailgun API Key</h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<input type="text" class="form-control empty" id="txt_mailgun_api_key" placeholder="e.g. pubkey-XXXa0508df0a2XXXf0db5af9b6391XXX" value="" >
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal">Cancel</button>
				<button class="btn btn-primary" data-dismiss="modal">Save</button>
			</div>
		</div>
	</div>
</div>
<div id="dlg_fields" class="modal fade" tabindex="-1">
	<div class="modal-dialog modal-wide">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 class="modal-title">Form Fields</h4>
			</div>
			<div class="modal-body">
				<input type="text" class="form-control" id="txt_label" placeholder="Label">
				<input type="text" class="form-control" id="txt_field_name" placeholder="Field name">
				<input type="text" class="form-control" id="txt_field_value" placeholder="Default Value">
				<div class="dropdown">
					<button class="btn btn-default dropdown-toggle" type="button" id="ddl_field_type" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">text <span class="caret"></span></button>
					<ul class="dropdown-menu" aria-labelledby="ddl_field_type">
						<li><a href="#">text</a></li>
						<li><a href="#">multiline</a></li>
						<li><a href="#">email</a></li>
						<li><a href="#">phone</a></li>
						<li><a href="#">checkbox</a></li>
						<li><a href="#">hidden</a></li>
					</ul>
				</div>
				<div class="togglebutton">
					<label>Required <input id="chk_required" type="checkbox" checked=""></label>
				</div>
				<button id="add_field_row" class="btn btn-primary btn-xs pull-right"><i class="mdi-content-add"></i></button>
				<table id="tbl_fields" class="table table-striped table-hover ">
					<thead>
					<tr>
						<th>Label</th>
						<th>Field Name</th>
						<th>Default Value</th>
						<th>Type</th>
						<th>Required</th>
						<th></th>
					</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button id="btn_save_fields" class="btn btn-primary" data-dismiss="modal">Save</button>
			</div>
		</div>
	</div>
</div>
<div id="dlg_show_code" class="modal fade" tabindex="-1">
	<div class="modal-dialog modal-wide">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<h4 class="modal-title">INCLUDES [GOES TO HEADER]</h4>
				<code>
					&lt;script type="text/javascript" src="http://leadbox.adti.me/release/jquery-1.11.0.min.js"&gt;&lt;/script&gt;<br/>
					&lt;script type="text/javascript" src="http://leadbox.adti.me/release/mailcheck.js"&gt;&lt;/script&gt;<br/>
					&lt;script type="text/javascript" src="http://leadbox.adti.me/release/mailgun_validator.js"&gt;&lt;/script&gt;<br/>
					&lt;script type="text/javascript" src="http://leadbox.adti.me/release/leadbox-<?php echo LEADBOX_VERSION; ?>.min.js"&gt;&lt;/script&gt;<br/>
					&lt;script type="text/javascript" src="http://leadbox.adti.me/release/jquery.placeholder.min.js"&gt;&lt;/script&gt;
				</code>
				<br/><br/>
				<h4 class="modal-title">CODE [GOES AT THE CLOSING BODY TAG]</h4>
				If you have hosted your file with us, add this script reference:<br/>
				<b>Remember to replace {YOUR_SAVED_NAME} with the hosted script name.</b><br/>
				<code>&lt;script type="text/javascript" src="http://leadbox.adti.me/c/<?php echo $_SESSION["auth"]->folder ?>/{YOUR_SAVED_NAME}.js"&gt;&lt;/script&gt;</code><br/><br/>
				Otherwise, Add this code:<br/>
				<code id="txt_code">

				</code>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<div id="dlg_success_code" class="modal fade" tabindex="-1">
	<div class="modal-dialog modal-wide">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 class="modal-title">On success function</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col col-xs-6">
						<div class="togglebutton">
							<label><input id="chk_adtime" type="checkbox" checked=""> Send lead to AdTime</label>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col col-xs-3">
						<div class="togglebutton">
							<label><input id="chk_redirect" type="checkbox" checked="" /> Redirect To URL:</label>
						</div>
					</div>
					<div class="col col-xs-9">
						<input id="txt_redirect_url" type="text" class="form-control" placeholder="e.g http://mydomain.com/thank-you.html" value="" />
						<textarea id="txt_thanku_html" style="display:none;width:100%"></textarea>
					</div>
				</div>
				<div class="row" style="margin-top:20px;">
					<div class="col col-xs-12">
						<label>Extra javascript code on success:</label>
						<textarea id="txt_success_code"></textarea>
					</div>
				</div>
				</code>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal">Save</button>
			</div>
		</div>
	</div>
</div>

<div id="dlg_load_config" class="modal fade" tabindex="-1">
	<div class="modal-dialog modal-wide">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Place Setting Data Here</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<textarea id="txt_config_data"></textarea>
			</div>
			<div class="modal-footer">
				<button id="btn_load_this_config" class="btn btn-primary" data-dismiss="modal">Load</button>
			</div>
		</div>
	</div>
</div>
<div id="dlg_saved_scripts" class="modal fade" tabindex="-1">
	<div class="modal-dialog modal-wide">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 class="modal-title">Hosted Scripts</h4>
			</div>
			<div class="modal-body" style="max-height: 500px; overflow: scroll;">
				<input type="text" class="form-control" id="txt_scripts_filter" placeholder="Filter">
				<table id="tbl_hosted_scripts" class="table table-striped table-hover">
					<thead>
					<tr>
						<th>Name</th>
						<th>URL</th>
						<th></th>
					</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<!-- site end -->