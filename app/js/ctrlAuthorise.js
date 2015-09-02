app.controller("AuthoriseCtrl", ["fsConfig", "$scope", "Profile", "Auth", "currentUser", "$firebaseArray", "$firebaseObject", "$location", "$routeParams", "FsGet", 'ngDialog', 'DataSource', '$timeout', 
  function(fsConfig, $scope, Profile, Auth, currentUser, $firebaseArray, $firebaseObject, $location, $routeParams, FsGet, ngDialog, DataSource, $timeout) {
	'use strict';
	$scope.aaa = false;
	$scope.actionMessage = '';
	console.log($routeParams);
	$scope.grProcessing = true;
	$scope.grGettingUser = false;
	$scope.grGettingData = false;
	$scope.grDone = false;
	
	
	var ref = new Firebase(fsConfig.FIREBASE_URL);

	var oauthProvider = $routeParams.provider;
	var oauthSuccess = $routeParams.success;
	var oauthAction = $routeParams.action;	
	var oauthSession = $routeParams.session;	
	
	console.log(oauthProvider);
	console.log(oauthSuccess);
	console.log(oauthAction);	
	console.log(oauthSession);	

	$scope.oauthSession = oauthSession;
	if(oauthSession === 1){
		oauthSession = 'true';
		$scope.oauthSession = 'true';
	}


	
	$scope.auth = Auth;
	var authData = Auth.$getAuth();
  $scope.authData = authData;
	var theUserRole = FsGet.getRole(authData.uid);
	theUserRole.$loaded()
  .then(function() {
		console.log(theUserRole);
		var userAaa = (theUserRole.$value  > 50);
		$scope.userRole = theUserRole.$value;
		$scope.userAaa = userAaa;
		console.log('$scope.userRole is ' + $scope.userRole);
		console.log('$scope.userAaa is ' + $scope.userAaa);	
  })
  .catch(function(err) {
    console.error(err);
  });
  
  if(currentUser){
		if (oauthProvider === 'Goodreads' && oauthSuccess === 'true'){
		$scope.grProcessing = false;
		
		if(oauthAction){
				$scope.todo = 'Do something';
				switch(oauthAction) {
					case "getuser":
						console.log('go get user');
						$scope.actionMessage = 'Getting user...';
						grGetData();
					break;
					case "updateuser":
						console.log('go update the user');
						$scope.actionMessage = 'updating  user...';
						grSaveData();
					break;
					case "gotoprofile":
						console.log('Go back to profile');
						$scope.actionMessage = 'going back to profile';
						goToProfile();
					break;
					default:
						console.log('no action set');				
						$scope.actionMessage = 'default';		
					}


				
			} else{
				$scope.todo = 'no action specified';
			}
			
			
		}//end oauthProvider
		





    } else { //not a current user... move on...
			$location.path('#/home').replace();
	    $scope.$apply();
    } //ends currentUser Check
    
 	/*
	* GOODREADS GET EXTERNAL LINKE:
 	*	
	*/								
	$scope.doExternalLink = function () {
		console.log('doing EXTERNAL LINK');
		$scope.grProcessing = true;
	};

    
    
 	/*
	* GOODREADS GET USERDATA:
 	*	
	*/								
	 function grGetData() {
		console.log('doing GETDATA');
		var GOODREADS_LOGIN = 'http://fictionset.in/admin/grGetUser.php?provider=Goodreads';
	  var grAction = function(data) {
			$scope.isLooking = false;
			$scope.hasData = true;
			$scope.grProcessing = false;
			$scope.grGettingData = false;
			$scope.grGettingUser = true;
			
			
			if (data.identifier){
				$scope.grDone = true;
				$scope.grProcessing = false;
		    $scope.hasData = true;
				$scope.grData = data;
		    $scope.hasData = true;
		    $scope.grGettingUser = false;
			
		    console.log('we have goodreads user data');	
				console.log(data);
				grSaveData(currentUser, data);
			} else {
				$scope.isError = true;
				return 'no data';
			}    
		};
		DataSource.get(GOODREADS_LOGIN, grAction);  //get goodreads and then do grAction with it.

	};

 	/*
	* GOODREADS SAVE USERDATA:
 	*	
	*/								
	function grSaveData(userId, data) {
		
			$scope.grGettingUser = false;
		$scope.grGettingData = true;
			
		console.log('doing SAVEDATA');
		console.log('Do we have a current user...');
		console.log(currentUser.uid);
		console.log(data);
		var thisUid = "goodreads:" +data.identifier;
		var provider = 'goodreads';
		var grLinked = true;
		var grDisplayName = data.displayName;
		var grId = data.identifier;
		var grAddress = data.address;
			if(!data.address){
				grAddress = '';
				};
		var grCity = data.city;
			if(!data.city){
				grCity = '';
				};
		var grCountry = data.country;
			if(!data.country){
				grCountry = '';
				};
		var grPhotoURL = data.photoURL;
		var grProfileURL = data.profileURL;
		var grEmail = data.email;
		var grZip = data.zip;
				if(!data.zip){
				grZip = '';
				};
		var ref = new Firebase(fsConfig.FIREBASE_URL);
		ref.child('users').child(currentUser.uid).child('userMappings').set({
			goodreads: thisUid
    });
    
		ref.child('users').child(currentUser.uid).child('goodreads').set({
      isActive: grLinked,
      provider: provider,
      provider_id: grId,
      displayName: grDisplayName,
      provider_email: grEmail,
      picture_url: grPhotoURL,
      profile_url: grProfileURL,
      provider_address: grAddress,
      provider_city: grCity,
      provider_country: grCountry,
      provider_zip: grZip
    });

			$scope.grProcessing = false;
			$scope.grGettingUser = false;
			$scope.grGettingData = false;
	      goToProfile();
	};



    
 	/*
	* GOODREADS RETURN WITH GR_ID:
 	*	
	*/								
	function goToProfile(userId, goodreadsId) {
		console.log('doing gotorpofile');
		$scope.grDone = true;		
		$timeout(function(){
			$location.path( "/profile" )
		  //$location.path('#/profile').replace();
	    //$scope.$apply();
		});	
	};


   
    
    
}]);