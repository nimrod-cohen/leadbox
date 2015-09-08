<?php
/**
 * Created by PhpStorm.
 * User: nimrod
 * Date: 06/06/15
 * Time: 23:49
 */
class Auth_model extends CI_Model {

	function __construct()
	{
		if(!isset($_SESSION["auth"]))
		{
			if($this->router->class != "login")
			{
				redirect(base_url("login"));
				return;
			}
		}
	}
}

?>
