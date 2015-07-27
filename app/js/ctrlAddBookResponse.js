app.controller("AddBookResponseCtrl", ["fsConfig", "$scope", "Auth", "currentUser", "$firebaseObject", "$location", "$routeParams", "FsGet",
function(fsConfig, $scope, Auth, currentUser, $firebaseObject, $location, $routeParams, FsGet) {
	var DEV_STATUS = false;
	DEV_STATUS = fsConfig.DEV_STATUS;
	$scope.isLoading = true;
	$scope.hasData = false;		 
	$scope.currentUser = currentUser;
	console.log($routeParams);
  var responseType = $routeParams.type;
  var itemId = $routeParams.id;
  var hasBadge = false;
	var showNewBadge = false;
	$scope.showNewBadge = showNewBadge;
	var badgeType = $routeParams.badgetype;
	var authData = Auth.$getAuth();
  var refItem, dataExists;
  $scope.authData = authData;
	
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	
	//GET USER DATA
	if(authData){
		var refProfile = FsGet.getUser1(authData.uid);
		refProfile.$loaded().then(function(profileData) {
			console.log(profileData);
			$scope.isLoading = false;
			$scope.refProfile = refProfile;
			$scope.profile = profileData;
			$scope.userName = profileData.userName;
	  
			if(badgeType){
				hasBadge = true;
			}  
			$scope.hasBadge = hasBadge;
		    	
			if(DEV_STATUS === false){
				//var refProfile = $firebaseObject(ref.child('users').child(currentUser.uid));
				if (responseType === 'bookSuccess' || responseType === 'success' ){
					refItem = $firebaseObject(ref.child('Books').child(itemId));
					console.log('the item added is: ');
					refItem.$loaded().then(function() {
						$scope.refItem = refItem;
						console.log(refItem);
						
						//refUserBadges = $firebaseObject(ref.child('Badges').child(badgeType));
						//var refUserBadges = new Firebase(fsConfig.FIREBASE_URL+'/users/').child(authData.uid).child('badges');  
						var refUserBadges = $firebaseObject(ref.child(authData.uid).child('badges'));
						var refUserThisBadge = $firebaseObject(ref.child(authData.uid).child('badges').child(badgeType));
						console.log(refUserBadges);
						
						refUserThisBadge.$loaded().then(function (badgeData) {
							if(badgeData.$value !== null){
								console.log('has badge');
								showNewBadge = false;
							 	dataExists = true;
							}else{
								console.log('does not have badge');
								console.log(refUserBadges);
								showNewBadge = true;
								dataExists = false; 	
								addBadge(authData.uid, badgeType);
								showNewBadge = true;
								$scope.showNewBadge = true;
							}
						});						
					});
				}
			} else {
				console.log('DEV_STATUS');
			}
	});
	}

	function addBadge(userId, badgeId){
		if (authData) {
		  var theSystemBadges = new Firebase(fsConfig.FIREBASE_URL+'/badges/').child(badgeId);
			var theUserBadges = new Firebase(fsConfig.FIREBASE_URL+'/users/').child(userId);  
		  console.log(theUserBadges);  
			console.log(theSystemBadges);  
			theSystemBadges.once('value', function(snapshot) {
	  		var theBadgeInfo = snapshot.val();
				//theUserBadges.child('badges').child(badgeId).set(theBadgeInfo);
				theUserBadges.child('badges').child(badgeId).push(theBadgeInfo);
				//.push({ 'user_id': 'fred', 'text': 'Yabba Dabba Doo!' });
//				theUserBadges.set('badges').set(badgeId).set(theBadgeInfo);
	  	});
		}
	}
	
}]);