'use strict';

app.controller("RegisterCtrl",  ["$firebaseSimpleLogin", "$scope", "$location", "simpleLogin", '$http', function($firebaseSimpleLogin, $scope, $location, simpleLogin, $http) {

  var ref = new Firebase("https://sweltering-fire-3219.firebaseio.com/"); //  location we're authenticating for
  var isaNewUser = true;
  var userexists = false;
  var loading = false;
  $scope.loading = false;
  $scope.theerror = '';
  $scope.iserror = false;
  $scope.loginReg = {};
 
 $scope.createUser = function(loginReg) {
	$scope.loading = true;
 	console.log($scope.loginReg);
 	
  	//first check is email exists....
	var auth = new FirebaseSimpleLogin(ref, function(error, user) {
		if (error) {
	    console.log(error);
	    $scope.error = error;
		$scope.iserror = true;
		$scope.loading = false;

	    } else if (user) {
	    // user is already authenticated with Firebase
	    // so lets not create them
	          console.log('already a user');
	          $location.path('/account').replace();
	          $scope.$apply();
        } else{
		// user is not a user,
		//so lets register them
		var newEmail = $scope.loginReg.email;
		var newPassword = $scope.loginReg.password;
		var newName = $scope.loginReg.displayName;
		
		
		
		
		
		auth.createUser(newEmail, newPassword, function(error, user) {
			if (error === null) {
			console.log("User created successfully in auth:", user);
			console.log("Now creating profile:", user);
			//lets now add their profile:
			ref.child('users').child(user.uid).set({
				displayName: newName,
				provider: user.provider,
		        provider_id: user.id,
		        email: user.email,
		        role: 10,
		        isAdmin: false
		        });
			//then log them in
			auth.login('password', {
				 email:newEmail,
				 password: newPassword
			});
			//THEN NOTIFY US
			//add a notificiation
			var theTimestamp = new Date().valueOf();					
			ref.child('/system/messages').push({
				title:"User Added (manual)",
				messageContent:  newName + ' ('+ newEmail + ") registered.",
				messageType: "User",
				timestamp:theTimestamp
				});


//	          $location.path('/account').replace();
//	          $scope.$apply();
			} else {//erere is error
				    console.log("Error creating user:", error);
					console.log(error);

			        switch(error.code) {
					      case "INVALID_EMAIL":
						  console.log('invalid email');
						  $scope.errorTitle = 'Invalid Email Address'
					      // handle an invalid email
					      case "INVALID_PASSWORD":
						  console.log('invalid password');
						  $scope.errorTitle = 'Invalid Password'
					      // handle an invalid password
					      case "EMAIL_TAKEN":
					      console.log('Email in  user');
						  $scope.errorTitle = 'Email Already Taken'
					      
					      default:
						  console.log('Error');				
						  $scope.errorTitle = 'Error'		
					}

 
//					console.log($scope.errorTitle);
					$scope.theerror = error;
					$scope.iserror = true;
					$scope.loading = false;
 					$scope.$apply()
				  }
				});
			
			
			
			
			
			}//ends top level if else

 		});//ends var auth...
 
 	}
/*
   var createUser = function(email, password) {
       var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com');
      var auth = new FirebaseSimpleLogin(ref, function(error, user) {
        if (error) {
          // an error occurred while attempting login
          console.log(error);
        } else if (user) {
          // user authenticated with Firebase
         // $rootScope.loginReg = user;
          $location.path('/stores').replace();
          $scope.$apply();
        } else {
          // user is logged out
        }
      });
    //  AuthService.createUser(email, password, auth);
    }
*/
    
 }]);


