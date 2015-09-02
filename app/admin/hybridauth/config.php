<?php
/**
* HybridAuth
* http://hybridauth.sourceforge.net | http://github.com/hybridauth/hybridauth
* (c) 2009-2015, HybridAuth authors | http://hybridauth.sourceforge.net/licenses.html
*/

// ----------------------------------------------------------------------------------------
//	HybridAuth Config file: http://hybridauth.sourceforge.net/userguide/Configuration.html
// ----------------------------------------------------------------------------------------

return
	array(
		"base_url" => "http://fictionset.in/admin/hybridauth/",

		"providers" => array (
			// openid providers
			"OpenID" => array (
				"enabled" => false
			),

			"Yahoo" => array (
				"enabled" => false,
				"keys"    => array ( "key" => "", "secret" => "" ),
			),

			"AOL"  => array (
				"enabled" => false
			),

			"Google" => array (
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" ),
			),

			"Facebook" => array (
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" ),
				"trustForwarded" => false
			),

			"Twitter" => array (
				"enabled" => false,
				"keys"    => array ( "key" => "", "secret" => "" )
			),

			// windows live
			"Live" => array (
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" )
			),

			"LinkedIn" => array (
				"enabled" => false,
				"keys"    => array ( "key" => "", "secret" => "" )
			),

			"Foursquare" => array (
				"enabled" => false,
				"keys"    => array ( "id" => "", "secret" => "" )
			),

			"Goodreads" => array (
				"enabled" => true,
				"wrapper" => array( "path" => "Providers/Goodreads.php", "class" => "Hybrid_Providers_Goodreads" ),
				"keys"    => array ( "key" => "ZQ1NAAiyzbewyNSmaB9yiw", "secret" => "A3mnr0GbtgM5NPOFm5WqlMLUcI6nIl9zUuntMHnAsI" )
			),
		),

		// If you want to enable logging, set 'debug_mode' to true.
		// You can also set it to
		// - "error" To log only error messages. Useful in production
		// - "info" To log info and error messages (ignore debug messages)
		"debug_mode" => true,

		// Path to file writable by the web server. Required if 'debug_mode' is not false
		"debug_file" => "/home/fiction/public_html/admin/hybridauth/temp/hybridauth.log",
	);
