<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('login');
	}

	public function enter()
	{
		$this->load->model('login_model');

		$user = strtolower(trim($_POST["txtEmail"]));
		$pass = $_POST["txtPassword"];

		$response = array();
		if($this->login_model->login($user,$pass))
		{
			$response["success"] = true;
		}
		else
		{
			$response["error"] = "Invalid credentials, email or password unknown or incorrect";
		}

		echo json_encode($response);
	}

	public function logout()
	{
		unset($_SESSION["auth"]);
		$this->load->view('login');
	}
}
