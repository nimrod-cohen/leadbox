<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<!-- Include roboto.css to use the Roboto web font, material.css to include the theme and ripples.css to style the ripple effect -->
	<link href="css/roboto.min.css" rel="stylesheet">
	<link href="css/material.min.css" rel="stylesheet">
	<link href="css/material-fullpalette.min.css" rel="stylesheet">
	<link href="css/ripples.min.css" rel="stylesheet">
	<link href="css/bootstrap-colorpicker.min.css" rel="stylesheet">
	<link href="css/app.css" rel="stylesheet">
	<link href="css/font-awesome.min.css" rel="stylesheet">
</head>
<body>
<!-- Your site -->
<nav class="navbar navbar-default navbar-material-blue-grey">
	<div class="container-fluid">
		<div class="row">
			<div class="col col-xs-12">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="<?php echo base_url(); ?>">LeadBox Designer</a>
				</div>
				<p class="navbar-text">Welcome <?php echo $_SESSION["auth"]->name ?></p>
				<div class="collapse navbar-collapse">
					<ul class="nav navbar-nav pull-right">
						<li>
							<div class="btn-group">
								<div class="btn-group">
									<button class="btn btn-default btn-material-orange dropdown-toggle" data-toggle="dropdown"><i class="mdi mdi-file-file-upload"></i><div class="ripple-wrapper"></div> LOAD <span class="caret"></span></button>
									<ul class="dropdown-menu">
										<li><a id="btn_load_config" href="#"> LOAD</a></li>
										<li><a id="btn_load_config_url" href="#"> LOAD HOSTED BY URL</a></li>
									</ul>
								</div>
								<div class="btn-group">
									<button style="color:black;" class="btn btn-default btn-material-green dropdown-toggle" data-toggle="dropdown"><i class="mdi mdi-file-file-download"></i><div class="ripple-wrapper"></div> SAVE <span class="caret"></span></button>
									<ul class="dropdown-menu">
										<li><a id="btn_save_config" href="#"> SAVE</a></li>
										<li><a id="btn_save_config_url" href="#"> SAVE AS HOSTED URL</a></li>
									</ul>
								</div>
							</div>
							<div class="btn-group">
								<button class="btn btn-default btn-material-yellow" id="btn_fields"><i class="mdi mdi-action-assignment"></i><div class="ripple-wrapper"></div> EDIT FIELDS</button>
							</div>
							<div class="btn-group">
								<button class="btn btn-default btn-material-yellow" id="btn_refresh"><i class="mdi mdi-action-cached"></i><div class="ripple-wrapper"></div> REFRESH</button>
								<button class="btn btn-default btn-material-yellow attached-button active btn-material-yellow-600" id="btn_auto_refresh"><i class="mdi mdi-action-settings-backup-restore"></i></button>
							</div>
							<div class="btn-group">
								<button class="btn btn-default btn-material-yellow" id="btn_success_action"><i class="mdi mdi-toggle-check-box"></i> ON SUCCESS</button>
								<button class="btn btn-default btn-material-yellow attached-button" id="btn_get_code"><i class="mdi mdi-action-get-app"></i><div class="ripple-wrapper"></div> GET CODE</button>
							</div>
						</li>
						<li><div class="nav-divider"></div></li>
						<li><div class="navbar-text">
								<a href="#" class="dropdown-toggle settings-menu" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cog"></i></a>
								<ul class="dropdown-menu pull-right">
									<li><a href="<?php echo base_url("/login/logout"); ?>">Sign out</a></li>
								</ul>
							</div>
						</li>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div>
		</div>
	</div><!-- /.container-fluid -->
</nav>
