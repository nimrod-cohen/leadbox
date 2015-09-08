<?php
/**
 * Created by PhpStorm.
 * User: nimrod
 * Date: 08/20/15
 * Time: 23:51
 */

class Login_model extends CI_Model {
	function __construct()
	{
		parent::__construct();
	}


	function login($email,$password)
	{
		$query = $this->db->query("select * from users where email = ?",array($email));

		$row = $query->row();

		if (isset($row) && hash_equals($row->password, crypt($password, $row->password)) )
		{
			$row->password = ""; //clean it for security
			$_SESSION["auth"] = $row;
			return true;
		}
		return false;
	}

	function create($email,$name,$password)
	{
		//calculate folder as name removing each character that is not alpha numeric, and making sure dir not already exist.
		//ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789

	}

	function generatePasswordHash($password)
	{
		$cost = 10;

		// Create a random salt
		$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');

		// Prefix information about the hash so PHP knows how to verify it later.
		// "$2a$" Means we're using the Blowfish algorithm. The following two digits are the cost parameter.
		$salt = sprintf("$2a$%02d$", $cost) . $salt;

		return crypt($password, $salt);
	}
}

?>