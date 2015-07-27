app.controller("LoginCtrl",  ["fsConfig", "$scope", "$location", "Auth",    
	function(fsConfig, $scope, $location, Auth ) {
	'use strict';
  $scope.theerror = '';
  $scope.iserror = false;
  $scope.loading = false;
	$scope.auth = Auth;
	var authData = Auth.$getAuth();
	if (authData) {
	  console.log("Logged in as:", authData.uid);
	} else {
	  console.log("Logged out");
	}

  // any time auth status updates, add the user data to scope
  $scope.auth.$onAuth(function(authData) {
    $scope.authData = authData;
    console.log('got authdata');
    console.log(authData);
  });


	/**
	* LOG EMAIL USER IN
	*
	*/
		
	$scope.loginWithEmail = function(loginEmail, loginPassword){
		console.log('logging in...');
		$scope.auth.$authWithPassword({
		  email: loginEmail,
		  password: loginPassword
		}).then(function(authData) {
		  console.log("Logged in as:", authData.uid);
			$location.path('#/profile').replace();
		  //$scope.$apply();
		}).catch(function(error) {
			$scope.iserror = true;
			$scope.errorTitle = '';	  
			$scope.errorMessage = '';
		  console.error("Authentication failed:", error);
		  console.log(error);
		  switch(error.code) {
				case "INVALID_EMAIL":
				console.log('invalid email');
				$scope.errorTitle = 'Invalid Email Address';
				$scope.errorMessage = 'The specified email address is incorrect.';
				break;
				case "INVALID_USER":
				console.log('invalid user');
				$scope.errorTitle = 'Not Found';
				$scope.errorMessage = 'The specified user does not esist in the database. Did you type it wrong?';
				break;
				case "INVALID_PASSWORD":
				console.log('invalid password');
				if(error.code === "INVALID_PASSWORD"){
					$scope.errorTitle = 'Invalid Password';
					$scope.errorMessage = 'The specified password is incorrect.';
				}
				break;
				default:
				console.log('Error');				
				$scope.errorTitle = 'Error'		;
	    }
		});
	};

	/**
	* SET LOADING
	*
	*/
	$scope.setLoading = function(trueFalse){
		if(trueFalse === true){
		$scope.loading = true;
		} else {
		$scope.loading = false;				
		}
	};
	
}]);
 
 
 
/*
 
app.controller("LoginCtrl2",  ["fsConfig", "$scope", "$location", "Auth", "currentUser", "simpleLogin", '$http', function(fsConfig, $scope, $location, Auth, currentUser, simpleLogin, $http) {
  $scope.loginInfo = {}
  $scope.pageClass = "loginPage"; 
  $scope.theerror = '';
  $scope.iserror = false;
  $scope.loading = false;
	$scope.auth = Auth;
	var ref = new Firebase(fsConfig.FIREBASE_URL);

	$scope.auth.$getAuth(function(authData, error) {
    $scope.authData = authData;
		console.log('authData is ' );
		console.log(authData);
		console.log(error);
  });
					
	
  // var auth = new FirebaseSimpleLogin(ref, function(error, user) {
		$scope.auth.$getAuth(function(error, user, authData) {
     console.log(user);
     console.log(userAgent);
     $scope.authData = authData;
     $scope.user = userAgent;
     console.log(error);
     console.log(authData);
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


}]);
 
*/
 
    
 