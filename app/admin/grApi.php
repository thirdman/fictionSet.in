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


if( isset( $_REQUEST["api"] ) ){
	$getApi =  $_REQUEST["api"] ;
	//echo($getApi);
	if($getApi == "notifications"){
 		try{
 		$hybridauth = new Hybrid_Auth( $theConfig );
 		$goodreads = $hybridauth->authenticate( "Goodreads" );
 		$response = $goodreads->api()->api('notifications.xml');
 		$xml = simplexml_load_string($response, "SimpleXMLElement" );
 		$json2 = json_encode($xml);
 		echo ($json2);
   }
   catch( Exception $e ){
       echo "Ooophs, we got an error: " . $e->getMessage();
   }
	}
	
	//list/6833362?format=xml&key=ZQ1NAAiyzbewyNSmaB9yiw&v=2
	if($getApi == "getShelf"){
		$getShelfName =  $_REQUEST["shelfName"] ;
		$userId =  $_REQUEST["userId"] ;

		if(!$getShelfName){
			$theShelf =  'read';
		} else {
			$theShelf =  $getShelfName;
		}
		if(!$userId){
			$userId = '6833362';
		}
		
 		try{
 		$hybridauth = new Hybrid_Auth( $theConfig );
 		$goodreads = $hybridauth->authenticate( "Goodreads" );
 		$response = $goodreads->api()->api('review/list/'.userId.'?key=ZQ1NAAiyzbewyNSmaB9yiw&v=2&format=xml&shelf=' . $theShelf);

/*
 		$response = $goodreads->api()->api('review/list.xml', 'get', array(
	 		key => 'ZQ1NAAiyzbewyNSmaB9yiw',
	 		v => '2',
	 		id => '6833362', //id of the user
	 		shelf =>  'read', //OPTIONAL: read, currently-reading, to-read, etc. (optional)
	 		sort => 'date_added', //OPTIONAL: title, author, cover, rating, year_pub, date_pub, date_pub_edition, date_started, date_read, date_updated, date_added, recommender, avg_rating, num_ratings, review, read_count, votes, random, comments, notes, isbn, isbn13, asin, num_pages, format, position, shelves, owned, date_purchased, purchase_location, condition
	 		order => 'd' //OPTIONAL: a, d
	 		//search[query]: query text to match against member's books (optional)
	 		//page: 1-N (optional)
	 		//per_page: 1-200 (optional)
	 	));
*/

	 	//$response = utf8_encode(html_entity_decode($response)); 
	 	//$response = new SimpleXMLElement($response);

	 	//echo ($response);

 		$xml = simplexml_load_string($response, "SimpleXMLElement", LIBXML_NOCDATA );
 		$json2 = json_encode($xml);
 		echo ($json2);
   }
   catch( Exception $e ){
       echo "Ooophs, we got an error: " . $e->getMessage();
   }
	}

	if($getApi == "getUser"){
		$getUserId =  $_REQUEST["userId"] ;

		if(!$getUserId){
			$theresponse["success"] = 0;
			$theresponse["message"] = "No user ID";
			header('Content-Type: application/json');
			echo	json_encode($theresponse);	
		} else{
			
		# DO THE USER STUFF.		
 		try{
	 		$hybridauth = new Hybrid_Auth( $theConfig );
	 		$goodreads = $hybridauth->authenticate( "Goodreads" );
	 		$response = $goodreads->api()->api('user/show/'. $getUserId .'.xml');
	 		$xml = simplexml_load_string($response, "SimpleXMLElement", LIBXML_NOCDATA );
	 		$json2 = json_encode($xml);
	 		echo ($json2);
   }
   catch( Exception $e ){
       echo "Ooophs, we got an error: " . $e->getMessage();
   }
   }//ends if
	}
	

	
	//OTHERWISE do nothing
	}else{
	
	$config   = $config_file_path;		
	try{
    #$hybridauth = new Hybrid_Auth( $config );
 		$hybridauth = new Hybrid_Auth( $theConfig );
 		$goodreads = $hybridauth->authenticate( "Goodreads" );
 
/*
 		$response = $goodreads->api()->api('shelf/list.xml',"get", array(
	 		key => "ZQ1NAAiyzbewyNSmaB9yiw"
 		));
*/
 		//$response = $goodreads->api()->api('shelf/list.xml?key=ZQ1NAAiyzbewyNSmaB9yiw');
 		$response = $goodreads->api()->api('shelf/list.xml');

 		$responseArray = xml_to_object($response);
 		$json = json_encode($responseArray);


 		$xml = simplexml_load_string($response, "SimpleXMLElement" );
 		$json1 = json_encode($xml);

 		
// 		header('Content-Type: application/json');
 		//print_r(xml_to_object($response));
 		//echo($json);
 		echo ($json1);



        # Facebook: https://developers.facebook.com/docs/reference/api/
            // ask facebook for friends list
    //        $response = $facebook->api()->api('/me/friends');
						
						
            
            // Post to the user wall
/*
          $response = $facebook->api()->api("/me/feed", "post", array(
						message => "Hi there",
						picture => "http://www.mywebsite.com/path/to/an/image.jpg",
						link => "http://www.mywebsite.com/path/to/a/page/",
						name => "My page name",
						caption => "And caption"
					));
*/
 
        # Twitter: https://dev.twitter.com/docs/api
            // Returns the current count of friends, followers, updates (statuses) ...
           # $response = $twitter->api()->get( 'account/totals.json' );
 
        // You get the point
   }
   catch( Exception $e ){
       echo "Ooophs, we got an error: " . $e->getMessage();
   }
	
	};


 
class XmlElement {
  var $name;
  var $attributes;
  var $content;
  var $children;
};

function xml_to_object($xml) {
  $parser = xml_parser_create();
  xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
  xml_parser_set_option($parser, XML_OPTION_SKIP_WHITE, 1);
  xml_parse_into_struct($parser, $xml, $tags);
  xml_parser_free($parser);

  $elements = array();  // the currently filling [child] XmlElement array
  $stack = array();
  foreach ($tags as $tag) {
    $index = count($elements);
    if ($tag['type'] == "complete" || $tag['type'] == "open") {
      $elements[$index] = new XmlElement;
      $elements[$index]->name = $tag['tag'];
      $elements[$index]->attributes = $tag['attributes'];
      $elements[$index]->content = $tag['value'];
      if ($tag['type'] == "open") {  // push
        $elements[$index]->children = array();
        $stack[count($stack)] = &$elements;
        $elements = &$elements[$index]->children;
      }
    }
    if ($tag['type'] == "close") {  // pop
      $elements = &$stack[count($stack) - 1];
      unset($stack[count($stack) - 1]);
    }
  }
  return $elements[0];  // the single top-level element
}




