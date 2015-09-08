<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="<?php echo base_url("css/font-awesome.min.css"); ?>">
	<link rel="stylesheet" href="<?php echo base_url("css/login.css"); ?>">
	<script type="text/javascript" src="<?php echo base_url("js/jquery-1.11.0.min.js"); ?>"></script>
</head>
<body>
<div id="appContainer">
	<section class="layout-home-section">
		<section class="layout-half-page-section">
			<a href="/" class="logo">LeadBox Designer</a>
		</section>
		<section id="content" class="layout-home-content-section">
			<div class="content-container row">
				<div class="column-9 form-wrapper">
					<div class="error-container" style="color: rgb(209, 63, 55); text-align: center; padding: 30px 0px 20px;">&nbsp;</div>
					<form id="frmLogin" method="POST" action="<?php echo base_url("/login/enter"); ?>">
						<section>
							<label style="display: block;">
								<i class="fa fa-user fa-2x fa-fw input-icon-prepend"></i>
								<div class="input-wrapper">
									<input type="text" name="txtEmail" placeholder="Email">
								</div>
							</label>
							<label style="margin: 15px 0px; display: block;">
								<i class="fa fa-lock fa-2x fa-fw input-icon-prepend"></i>
								<div class="input-wrapper">
									<input type="password" name="txtPassword" placeholder="Password">
								</div>
							</label>
						</section>
					</form>
					<div class="checkbox-container">
						<label>
							<input type="checkbox">
							<span class="label-text"><small>Remember me</small></span>
						</label>
					</div>
					<button type="button" class="btn btn-default btn-circle submit">
						<i class="fa fa-angle-right fa-2x fa-fw"></i>
					</button>
					<div class="form-footer-container" style="text-align: center; padding: 20px 0px 30px;">
						<a style="margin-right: 20px;">Sign up</a>
						<a>Forgot password</a>
					</div>
				</div>
			</div>
		</section>
	</section>
</div>
<script>
	$(document).ready(function(){
		$("button.submit").click(function () {
			$(".error-container").html("&nbsp;");
			$.post("<?php echo base_url("login/enter"); ?>",
				$("#frmLogin").serialize(),
				function(data){
					data = JSON.parse(data);
					if(data.success)
						document.location.href = "<?php echo base_url("main"); ?>";
					else
						$(".error-container").text(data.error);
				});
		});
	});
</script>
</body>
</html>
