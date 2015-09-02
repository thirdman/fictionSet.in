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
* DEMO LOGIN FORM: 
* TODO: remove eventually
*/
// if page requested by submitting login form
if( isset( $_REQUEST["email"] ) && isset( $_REQUEST["password"] ) ){
/*
	$user_exist = get_user_by_email_and_password( $_REQUEST["email"], $_REQUEST["password"] );
 
	// user exist?
	if( $user_exist )
	{
		// set the user as connected and redirect him to a home page or something
		$_SESSION["user_connected"] = true;
 
		header("Location: http://fictionset.in");
	}
 
	// wrong email or password?
	else
	{
		// redirect him to an error page
		header("Location: http://fictionset.in/admin/login-error.php");
	}
*/
}

// else, if login page request by clicking a provider button
elseif( isset( $_REQUEST["provider"] ) )
{
	$theProvider =$_REQUEST["provider"];
	try
	{
		// inlcude HybridAuth library
		// change the following paths if necessary
		//$config   = dirname(__FILE__) . 'hybridauth/config.php';
		$config   = $config_file_path;		
		
		//require_once( "/home/fiction/public_html/admin/hybridauth/Hybrid/Auth.php" );
 
		// initialize Hybrid_Auth class with the config file
		//	$hybridauth = new Hybrid_Auth( $config_file_path );
		$hybridauth = new Hybrid_Auth( $theConfig );
		// try to authenticate with the selected provider
		$adapter = $hybridauth->authenticate( $provider_name );
		
		//print_r( $adapter->getUserProfile() );
	
		// then grab the user profile
		$user_profile = $adapter->getUserProfile();
		$json = json_encode($user_profile);

	}
 
	// something went wrong?
	catch( Exception $e )
	{
		//echo "Ooophs, we got an error: " . $e->getMessage();
    //echo " Error code: " . $e->getCode();
		header('Content-Type: application/json');
		$json = json_encode($e);
	//	header("Location: http://fictionset.in/admin/login-error.php");
	}
	$user_exist = true;
	// check if the current user already have authenticated using this provider before
	//$user_exist = get_user_by_provider_and_id( $provider_name, $user_profile->identifier );
	
	
	// if the used didn't authenticate using the selected provider before
	// we create a new entry on database.users for him
	if( ! $user_exist )
	{


/*
	create_new_hybridauth_user(
			$user_profile->email,
			$user_profile->firstName,
			$user_profile->lastName,
			$provider_name,
			$user_profile->identifier
		);
*/
	}
 		// set the user as connected and redirect him
	$_SESSION["user_connected"] = true;
	header('Content-Type: application/json');
  //header("Location: http://fictionset.in/#/profile?session=" . $_SESSION["user_connected"] . "");
  print_r($json);

	/*
 
	echo "<hr>";
	echo "<br>";

	echo "<br>";
	echo "Hi there! " . $user_profile->displayName;
	echo "<br>";
	echo "ID: ". $user_profile->identifier ."";
	echo "<br>";
	echo "<img src=". $user_profile->photoURL .">";
	echo "<br>";
	echo "City: ". $user_profile->city ."";
	echo "<br>";
	echo "Country: ". $user_profile->country ."";
	echo "<br>";
	echo "<hr>";
	echo "<br>";
*/
   //header("Location: http://fictionset.in");
}

