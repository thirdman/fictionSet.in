app.controller("RegisterCtrl",  ["fsConfig", "$firebaseAuth", 'Auth', "$scope", "$location", 
function(fsConfig, $firebaseAuth, Auth, $scope, $location) {
	'use strict';
  var ref = new Firebase(fsConfig.FIREBASE_URL); //  location we're authenticating for
  var loading = false;
	//$scope.auth = Auth;
  $scope.loading = loading;
  $scope.theerror = '';
  $scope.iserror = false;
  $scope.loginReg = {};
 
	/*
	* CREATE USER
	*
	*/
	$scope.createUser = function() {
		$scope.loading = true;
		console.log($scope.loginReg);
 	
		var newEmail = $scope.loginReg.email;
		var newPassword = $scope.loginReg.password;
		var newName = $scope.loginReg.displayName;

		ref.createUser({
		  email    : newEmail,
		  password : newPassword
		}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
				console.log(error);
				switch(error.code) {
					case "INVALID_EMAIL":
						console.log('invalid email');
						$scope.errorTitle = 'Invalid Email Address';
					break;
					case "INVALID_PASSWORD":
						console.log('invalid password');
						$scope.errorTitle = 'Invalid Password';
					break;
					case "EMAIL_TAKEN":
						console.log('Email in  user');
						$scope.errorTitle = 'Email Already Taken';
					break;
					default:
						console.log('Error');				
						$scope.errorTitle = 'Error';		
					}
					$scope.theerror = error;
					$scope.iserror = true;
					$scope.loading = false;
					$scope.$apply();
		  } else {
			  console.log(userData);
		    console.log("Successfully created user account with uid:", userData.uid);
				console.log("User created successfully in auth:", userData);
				console.log("Now creating profile:", userData);
				
				//Now lets log them in...				
				ref.authWithPassword({
				  email: newEmail,
				  password: newPassword
				},function(error, authData) {
				  console.log("Logged in as:", authData.uid);
					 if (error) {
					    console.log("Login Failed!", error);
					  } else {
					    console.log("Authenticated successfully with payload:", authData);
								//lets now add their profile:
								console.log(newName);
								var the_provider_id;
								if(userData.id !== null){
									the_provider_id = '';
								}else{
									the_provider_id= userData.id;
								}
								ref.child('users').child(authData.uid).set({
									displayName: newName,
									provider: authData.provider,
								  provider_id: the_provider_id,
								  email: newEmail,
								  role: 10,
								  isAdmin: false
								});
								
								//THEN NOTIFY US
								//add a notificiation
								var theTimestamp = new Date().valueOf();					
								ref.child('/system/adminmessages').push({
									title:"User Added (manual)",
									messageContent:  newName + ' ('+ newEmail + ") registered.",
									messageType: "User",
									timestamp:theTimestamp
								});
								
								//NOW MOVE ON
								$location.path("/account"); 
					  }
				});
		  }
		});
	};
	
	

  	//first check is email exists....
	
/*
		Auth.$getAuth( function(error, user) {
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

				alert('would create user here');
			
				ref.createUser(newEmail, newPassword, newName, function(error, user){
					
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
							Auth.login('password', {
								email:newEmail,
								password: newPassword
							});
								//THEN NOTIFY US
								//add a notificiation
							var theTimestamp = new Date().valueOf();					
							ref.child('/system/adminmessages').push({
								title:"User Added (manual)",
								messageContent:  newName + ' ('+ newEmail + ") registered.",
								messageType: "User",
								timestamp:theTimestamp
							});
						} else {
							//there is error
							console.log("Error creating user:", error);
							console.log(error);
							switch(error.code) {
								case "INVALID_EMAIL":
									console.log('invalid email');
									$scope.errorTitle = 'Invalid Email Address'
								break;
								case "INVALID_PASSWORD":
									console.log('invalid password');
									$scope.errorTitle = 'Invalid Password'
								break;
								case "EMAIL_TAKEN":
									console.log('Email in  user');
									$scope.errorTitle = 'Email Already Taken'
								break;
								default:
									console.log('Error');				
									$scope.errorTitle = 'Error'		
								}
								$scope.theerror = error;
								$scope.iserror = true;
								$scope.loading = false;
									$scope.$apply()
							  }
					});
			}
		});
*/






    
 }]);

