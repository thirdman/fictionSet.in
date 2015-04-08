'use strict';
 
app.controller("LoginCtrl",  ["fsConfig", "$scope", "$location", "currentUser", "simpleLogin", "simpleLogin1", '$http', function(fsConfig, $scope, $location, currentUser, simpleLogin, simpleLogin1, $http) {
  $scope.loginInfo = {}
  $scope.pageClass = "loginPage"; 
  $scope.theerror = '';
  $scope.iserror = false;
  $scope.loading = false;

  //$scope.auth = simpleLogin1;
  var ref = new Firebase(fsConfig.FIREBASE_URL);

   var auth = new FirebaseSimpleLogin(ref, function(error, user) {
	   $scope.iserror = false;
	   $scope.theerror = '';

	  if (error) {
	    // an error occurred while attempting login
	    console.log(error);
 		error.errorTitle = '';	  
 		error.errorMessage = '';
	        switch(error.code) {
				case "INVALID_PASSWORD":
				console.log('invalid password');
				if(error.code == "INVALID_PASSWORD"){
					error.errorTitle = 'Invalid Password';
					error.errorMessage = 'The specified password is incorrect.';
				}
				
				case "INVALID_USER":
				console.log('invalid user');
				error.errorTitle = 'Not Found';
				error.errorMessage = 'The specified user does not esist in the database. Did you type it wrong?';

				case "INVALID_EMAIL":
				console.log('invalid email');
				//$scope.errorTitle = 'Invalid Email Address'
				error.errorTitle = 'Invalid Email Address';
				error.errorMessage = 'The specified email address is incorrect.';
				// handle an invalid email
												
				default:
				console.log('Error');				
				$scope.errorTitle = 'Error'		
		    }
		    
			$scope.theerror = error;
			$scope.iserror = true;
			$scope.loading = false;
 			$scope.$apply()

 
		} else if (user) {
		// user authenticated with Firebase
		    console.log("authenticated");
		    $scope.$apply(function() { 
   	 			$location.path("/profile"); 
   	 		});
		} else {
		    console.log("nothing happening");			
		}
		
		
		$scope.setLoading = function(trueFalse){
			if(trueFalse == true){
			$scope.loading = true;
			} else {
			$scope.loading = false;				
			}
		}
		
		});


  
  //var ref = new Firebase("https://....firebaseio.com/");
  //var authClient = $firebaseSimpleLogin(ref);
/*
  try {
  	if (currentUser) {
	   	 console.log("logged in");
    	 	$scope.$apply(function() { 
   	 			$location.path("/profile"); 
   	 		});
    	 
   	 } else {
   	 console.log("no one is logged in");	   	 
   	 }
  } 
  catch(e) {
	  'error';
	  console.log(e)
   }
*/


}]);
 
 
    
 