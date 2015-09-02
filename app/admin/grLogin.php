<?php
	
// callback url (used to be in goodreads):  http://fictionset.in/admin/hybridauth/?hauth.done=Goodreads
	
$config_file_path = 'hybridauth/config.php';
 
require_once( "hybridauth/Hybrid/Auth.php" );
 
//$hybridauth = new Hybrid_Auth( $config_file_path );

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
* LOGIN: provider=goodreads must be set. Alternative ones may not work due to the hacking I needed to do toget the shitty goodreads API to work. 
* SEE login.php for first working efford
*/
if( isset( $_REQUEST["provider"] ) )
{
	$theProvider =$_REQUEST["provider"];
	try
	{
		$config   = $config_file_path;		
		$hybridauth = new Hybrid_Auth( $theConfig );
		// try to authenticate with the selected provider
		$adapter = $hybridauth->authenticate( $provider_name );
		// then grab the user profile
		$user_profile = $adapter->getUserProfile();
		$json = json_encode($user_profile);
	}
	// something went wrong?
	catch( Exception $e )
	{
		//echo "Ooophs, we got an error: " . $e->getMessage();
    //echo " Error code: " . $e->getCode();
		//header('Content-Type: application/json');
		//$json = json_encode($e);
		header("Location: http://fictionset.in/#/authorise/Goodreads/true/error/" . $_SESSION["user_connected"] . "");

	}
	// check if the current user already have authenticated using this provider before
	//$user_exist = get_user_by_provider_and_id( $provider_name, $user_profile->identifier );
	// WE WONT DO THIS instead return to fictionset and pass data.


	// set the user as connected and redirect them
	$_SESSION["user_connected"] = true;
	//header('Content-Type: application/json');
  //print_r($json);
  header("Location: http://fictionset.in/#/authorise/Goodreads/true/getuser/" . $_SESSION["user_connected"] . "");
  
}

