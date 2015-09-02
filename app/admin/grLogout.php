<?php
	
// callback url (used to be in goodreads):  http://fictionset.in/admin/hybridauth/?hauth.done=Goodreads
	
$config_file_path = 'hybridauth/config.php';
 
require_once( "hybridauth/Hybrid/Auth.php" );
 
$provider_name =  $_REQUEST["provider"] ;
$theConfig = array(
   // "base_url" the url that point to HybridAuth Endpoint (where the index.php and config.php are found)
   "base_url" => "http://fictionset.in/admin/hybridauth/",
 	"providers" => array (

   		"Goodreads" => array (
				"enabled" => true,
				"wrapper" => array( "path" => "Providers/Goodreads.php", "class" => "Hybrid_Providers_Goodreads" ),
				"keys"    => array ( "key" => "ZQ1NAAiyzbewyNSmaB9yiw", "secret" => "A3mnr0GbtgM5NPOFm5WqlMLUcI6nIl9zUuntMHnAsI" )
			)
		),
				// If you want to enable logging, set 'debug_mode' to true.
		// You can also set it to
		// - "error" To log only error messages. Useful in production
		// - "info" To log info and error messages (ignore debug messages)
		"debug_mode" => info,

		// Path to file writable by the web server. Required if 'debug_mode' is not false
		"debug_file" => "/home/fiction/public_html/admin/hybridauth/temp/hybridauth.log"
);

/*
* LOGOUT
*
*/
if( isset( $_REQUEST["logout"] ) ){
	
	$config   = $config_file_path;		
	try{
		$hybridauth = new Hybrid_Auth( $theConfig );
		$adapter = $hybridauth->logoutAllProviders();
		$theresponse["success"] = 1;
		$theresponse["message"] = "Successfully logged out";
		//$json = json_encode($theresponse);
		header('Content-Type: application/json');
		echo	json_encode($theresponse);	
		//print_r($json);
	}
	catch( Exception $e ){
		$json = json_encode($e);
		//header('Content-Type: application/json');
		//print_r($json);
	}
};
