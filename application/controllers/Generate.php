<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Generate extends CI_Controller {

	function __construct()
	{
		parent::__construct();

		$this->load->model('generate_model');
	}

	public function index()
	{
		$options = $_POST["options"];
		$name = $_POST["name"];
		$script = $_POST["script"];

		$script = str_replace("<br/>","\n",$script);
		$script = str_replace("<br>","\n",$script);
		$script = str_replace("&emsp;","\t",$script);

		$response = array();

		$file = $this->generate_model->saveHosted($name,$options,$script);
		if(!$file)
		{
			$response["error"] = "Failed to generate script";
		}
		else
		{
			$response["success"] = true;
			$response["file"] = $file;
		}

		echo json_encode($response);
	}

	public function all()
	{
		$scripts = $this->generate_model->getAll();

		echo json_encode($scripts);
	}

	public function load()
	{
		$name = $_POST["name"];

		$scriptSettings = $this->generate_model->load($name);

		echo $scriptSettings;
	}
}
