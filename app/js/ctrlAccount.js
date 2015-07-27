app.controller("AccountCtrl", ["fsConfig", "$scope", "Auth", "Profile", "currentUser",  "$location", "FsGet",
  function(fsConfig, $scope, Auth, Profile, currentUser,  $location, FsGet) {
  "use strict";
	var unreadMessages, userProfile, profileUserImg, currentUserImg, locationObject;
	$scope.unreadMessages = unreadMessages;
	$scope.aaa = false;
	$scope.isLoadingMessages = true;
	$scope.locationObject = locationObject;
	var authData = Auth.$getAuth();
	$scope.auth = Auth;

  $scope.auth.$onAuth(function(authData) {
    $scope.authData = authData;
    console.log('got authdata');

		//GET USER ROLE
	  var theUserRole = FsGet.getRole(authData.uid);
		theUserRole.$loaded()
	  .then(function() {
			var userAaa = (theUserRole.$value  > 50);
			$scope.userRole = theUserRole.$value;
			$scope.userAaa = userAaa;
			console.log('$scope.userRole is ' + $scope.userRole);
			console.log('$scope.userAaa is ' + $scope.userAaa);	
	  })
	  .catch(function(err) {
	    console.error(err);
	  });
  });

    if(authData){
			userProfile = FsGet.getUser1(currentUser.uid); 

    	//userProfile = new Profile(currentUser.uid);
	    userProfile.$loaded().then(function() {
      	$scope.profile = userProfile;
      	console.log(userProfile);
      	profileUserImg = userProfile.picture_url;
				if(currentUser.provider === 'google'){
					console.log('provider is google');
					currentUserImg = currentUser.thirdPartyUserData.picture;
				}else if(currentUser.provider === 'facebook'){
					 console.log('provider is facebook');
					 currentUserImg = currentUser.facebook.profileImageURL;
				}
		 
				if( (currentUserImg)  && profileUserImg !== currentUserImg){
					console.log('profile images are different, so change them');
					new Firebase(fsConfig.FIREBASE_URL+'/users').child(currentUser.uid).update({
						picture_url: currentUserImg
					});
				} else {
					console.log('profile images match, as you were.');
				}
				
				/*
				* ADD LOCATION TO INFO: TODO: refactor this to be more useful.
				*
				*/
				$scope.autoObject = function(retselectedObject) {
					locationObject = retselectedObject;
					$scope.locationObject = retselectedObject;
					$scope.profile.location = locationObject.title;
  				console.log($scope.locationObject);
				};
			}); //ends if profile loaded 

    } else {
      //not a current user... move on
        $location.path('#/home').replace();
        $scope.$apply();
    }  
  }
]);








 /*
 	 var refMessages = new Firebase('https:// .... .firebaseio.com/messages/');
 			 			refMessages.once('value', function(snapshot) {
						    var exists = (snapshot.val() !== null);
							unreadMessages = snapshot.val();
						         console.log(unreadMessages);
						         $scope.unreadMessages = unreadMessages;
 							});
  	 var syncMessages = $firebase(refMessages);
	 var msgs = syncMessages.$asArray();
	   msgs.$loaded().then(function() {
	   	 $scope.notifications = msgs;
	   	 console.log(msgs);
 		 $scope.hasData = true;	
 		 $scope.isLoadingMessages = false;
 		 var unreadMessagesArray = filterFilter(msgs, {isRead:!true} );
 		 $scope.unreadMessagesArray = unreadMessagesArray;
 		 console.log(unreadMessagesArray);
  		 // To iterate the key/value pairs of the object, use `angular.forEach()`
        angular.forEach(msgs, function(value, key) {
           console.log(key, value);
            var item = msgs.$getRecord( value.$id );

			
//			$scope.data[i].duration = (new Date() - $scope.data[i].time)
			if(!item.isRead){
				console.log('not readbefore');
				var theTimestamp = new Date().valueOf();					
				item.isRead = true;
				item.readDate = theTimestamp;
				msgs.$save(item);
		   	}else{
				console.log('readdade is '+ item.readDate);
				console.log('isread is '+ item.isRead);
				var theDifference = (new Date() - item.readDate);
				console.log(theDifference);
				item.readDistance = theDifference;
				msgs.$save(item);
			}

         });
         
 		 //// set the current read timestamp 
 		 var refUsers = new Firebase('https://....firebaseio.com/users/');
 		 var theTimestamp = new Date().valueOf();					
 		 refUsers.child(currentUser.uid).update({
	 		 messagesViewed: theTimestamp
		 });
   		 	 
  	 });
*/
