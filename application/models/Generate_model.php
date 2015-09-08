<?php
/**
 * Created by PhpStorm.
 * User: nimrod
 * Date: 06/06/15
 * Time: 23:49
 */
class Generate_model extends CI_Model {

	function saveHosted($name,$options,$script)
	{
		$userFolder = $this->baseFolder();

		if(!file_exists($userFolder))
		{
			if(!mkdir($userFolder))
				return false;
		}

		if(!file_put_contents($userFolder.$name.".options.txt",$options))
			return false;
		if( !file_put_contents($userFolder.$name.".js",$script))
			return false;

		$user = $_SESSION["auth"];
		return base_url("/c/".$user->folder."/".$name.".js");
	}

	function baseFolder()
	{
		$user = $_SESSION["auth"];

		return FCPATH."c".DIRECTORY_SEPARATOR.$user->folder.DIRECTORY_SEPARATOR;
	}

	function getAll()
	{
		$folder = $this->baseFolder();
		$user = $_SESSION["auth"];

		$files = array();
		foreach (glob($folder."*.js") as $file) {
			$file = preg_replace("/^.*?([^\/]*)\.js$/","$1",$file);
			$files[] = [
				"name" => $file,
				"url" => base_url("/c/".$user->folder."/".$file.".js")
			];
		}

		return $files;
	}

	function load($name)
	{
		$folder = $this->baseFolder();

		return file_get_contents($folder.$name.".options.txt");
	}
}

?>
