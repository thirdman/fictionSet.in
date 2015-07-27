app.controller("ProfileCtrl", ["fsConfig", "$scope", "Profile", "Auth", "currentUser", "$firebaseArray", "$firebaseObject", "$location", "FsGet",
  function(fsConfig, $scope, Profile, Auth, currentUser, $firebaseArray, $firebaseObject, $location, FsGet) {
	'use strict';
  var unreadMessages, allBooks;
  $scope.unreadMessages = unreadMessages;
	$scope.aaa = false;
	$scope.isLoadingMessages = true;
	$scope.allBooks = allBooks;
	$scope.auth = Auth;
	var authData = Auth.$getAuth();
  $scope.authData = authData;
	//var theUser = FsGet.getUser1(authData.uid);
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
		$scope.profile = FsGet.getUser1(currentUser.uid);
		// this gets the list of books for 'contributing'
		// TODO: output books & linke to edit.
		var refBooks = new Firebase(fsConfig.FIREBASE_URL+'/Books/');
	  	refBooks.once('value', function(snapshot) {
		  allBooks = snapshot.val();
		  $scope.allBooks = allBooks;
		});
		// this shows read messages.
		// TODO: refactor into a decent way of doing this - using a batch process or something.
  	var refMessages = new Firebase(fsConfig.FIREBASE_URL+'/oldmessages/');
		refMessages.once('value', function(snapshot) {
			unreadMessages = snapshot.val();
			$scope.unreadMessages = unreadMessages;
		});

	  var msgs = $firebaseArray(refMessages);
    } else { //not a current user... move on...
			$location.path('#/home').replace();
	    $scope.$apply();
    }

  }
]);