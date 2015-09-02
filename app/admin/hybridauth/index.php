<?php
/**
* HybridAuth
* http://hybridauth.sourceforge.net | http://github.com/hybridauth/hybridauth
* (c) 2009-2015, HybridAuth authors | http://hybridauth.sourceforge.net/licenses.html
*/

// ------------------------------------------------------------------------
//	HybridAuth End Point
// ------------------------------------------------------------------------

require_once( "Hybrid/Auth.php" );
require_once( "Hybrid/Endpoint.php" );

/*
* HACKED BECASUE GOODREADS FUCKS UP THE URLS RETURNED
*
*/

if( ! isset($_REQUEST['authorize'])){
	Hybrid_Endpoint::process();
	}else{
		$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
		$request = $_REQUEST;
		/*
		echo $actual_link;
		echo "<br>";
		echo $_SERVER['QUERY_STRING'];
		*/
		$query = 'q2=two';
		$new_query = '&provider=Goodreads&hauth.done=Goodreads';
		//	   $separator = (parse_url($url, PHP_URL_QUERY) == NULL) ? '?' : '&';
		//$separator = (parse_url($actual_link, PHP_URL_QUERY) == NULL) ? '?' : '&';
		$url .= $actual_link . $new_query;
		/*
		echo "<br> url is: ";
		echo($url);
		*/
		header("Location: ".$url);	
	}
	
	Hybrid_Endpoint::process();
