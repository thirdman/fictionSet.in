<?php
/*
 
THis is atest of the hybridauth library
 
*/

$config_file_path = 'hybridauth/config.php';
 
require_once( "hybridauth/Hybrid/Auth.php" );
 
$hybridauth = new Hybrid_Auth( $config_file_path );

?>
<html>
	<head>
	</head>
<body>
	<h2>auth test</h2>
<!--

<form>
	<fieldset>
		<legend>Sign-in form</legend>
		email   : <input type="text" name="email" /><br />
		password: <input type="password" name="password" /><br />
 
		<input type="submit" value="Sign-in" />
	</fieldset>
</form>
-->


<!-- <a href="http://fictionset.in/admin/hybridauth/?hauth.done=Goodreads" >Click to auth</a> -->
<a href="grLogin.php?provider=Goodreads">Goodreads login</a><br />
<hr>
<a href="grLogout.php?logout=true">Goodreads LOGOUT</a><br />


</body>
</html>


<script>
//    console.log(<? echo $json ?>);    
   
</script>