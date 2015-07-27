app.controller("ManagePlacesCtrl", ["fsConfig", "$scope", "currentUser", "$firebaseArray", 
  function(fsConfig, $scope,  currentUser, $firebaseArray) {
	"use strict";
  var placelist = null;
	var obj = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/places/'));
  obj.$loaded().then(function() {
		$scope.placelist = obj;
		placelist = obj;
    });
	$scope.placelist = placelist;
}]);





app.controller("ManageUsersCtrl", ["fsConfig", "$scope", "currentUser", "$firebaseArray", "ngDialog",  
  function(fsConfig, $scope, currentUser, $firebaseArray, ngDialog) {
  var objUsers = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/users/'));
    objUsers.$loaded().then(function() {
    	console.log(objUsers);
		  angular.forEach(objUsers, function(value) {
		  	//var thisCollArr = null;
		    if(value.collections){
		    	var count = 0;
					angular.forEach(value.collections, function() {
				  	count++;
					});
					//$scope.bookCount = count;
					console.log('the collection count is:' + count); 
			  }
		  });
		//var usersList = objUsers;
  	$scope.usersList = objUsers;
    });
 
	/*
	* Manages the badges.
	*
	*/
 $scope.manageBadges = function(theUserId) {
	$scope.theUserId = theUserId;
	var allBadges = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/badges/'));
	//var userBadges = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/users/').child(theUserId).child('badges'));
	allBadges.$loaded().then(function() {
		$scope.allBadges = allBadges;
		console.log(allBadges);
	});
  
  ngDialog.open({ 
		plain: false,
      template: 'views/dialogs/dialogBadges.html',
      scope: $scope
	});
 };

	/*
	* Adds a badge
	*
	*/

 $scope.addBadge = function(theUserId, badgeId){
	if (theUserId) {
  var userProfile = new Firebase(fsConfig.FIREBASE_URL+'/users/').child(theUserId);  
  var theBadgeSource = new Firebase(fsConfig.FIREBASE_URL+'/badges/').child(badgeId);  
  theBadgeSource.once('value', function(snapshot) {
  	var theBadgeInfo = snapshot.val();
		userProfile.child('badges').child(badgeId).update(theBadgeInfo);
  });


	/*
	* TODO: Remove badge
	*
	*/



	/*
	* TODO: push the info into the profile as a message or a highlight
	*
	*/

/*
  		 	userProfile.child('badges').child(badgeId).update({
	  		 	badgeId: 
	  		 	assignedAt: 
	  		 	description: 
	  		 	filename: 
	  		 	name: 
	  		 	
 			  });
*/
 

	}	 
 };
 
/*

//THIS IS THE BACKUP SYSTEM I USED TO MOVE BOOKS INTO THE BPOOKSHELG PROPER LOCATIONS
  $scope.moveBook = function(bookId, theUserId, collectionId, bookObj){
	  console.log(collectionId);
	 console.log(bookId);
	 console.log(theUserId);
 	 console.log(bookObj);
 	 if (theUserId) {
 	 addBook( theUserId, bookId, collectionId, bookObj);
 		 }
 	};

	var addBook = function(childUserId, bookId, collectionId, bookObj){
 	 	var bookid = bookId;
	 	console.log(bookObj)
	 	console.log(childUserId)
	 	var addTimestamp = bookObj.timestamp;
  			if (bookid) {
  			  	var userCollections = new Firebase('https://.....firebaseio.com').child('users').child(childUserId).child('collections');
 		  		userCollections.child('bookshelf').child('books').child(bookid).update({
					    bookid: bookid,
 					    coverUrl: bookObj.coverurl,
					    title: bookObj.title,
					    timestamp: addTimestamp,
						addedToCollectionDate: addTimestamp,
						addedToCollectionBy: childUserId
 					  });
 				userCollections.child('bookshelf').update({
 					description: "Your default bookshelf",
					timestamp: addTimestamp,
	 				updatedAt: addTimestamp,
	 				updatedBy: childUserId,
	 				isPublic: false
 				});  
 				}
			}
*/

 
 }]);


app.controller("EditPlaceCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$firebaseObject", "$routeParams",    
function(fsConfig, $scope, currentUser, $firebaseArray, $firebaseObject, $routeParams) {
	"use strict";
  var placename = $routeParams.place;
  var placeid = $routeParams.placeid;
  $scope.placename = placename;
  $scope.placeid = placeid;
	var ref = new Firebase(fsConfig.FIREBASE_URL+'/places/').child(placeid);
	ref.setPriority(1000);
	//var sync = $firebase(ref);
	//var setting = null;
	var rec = $firebaseObject(ref);
	  rec.$loaded().then(function() {
	  	$scope.place = rec;
			$scope.hasData = true;		 
  	});
	$scope.place = rec;
	var imagesRef = ref.child("images");
	
	
	/*
	* Add a picture funtionality
	* TODO: turn this into a proiper feature, and hook up to API's
	*/
 
	 $scope.addUrl = function() {
 		$scope.isLooking = true;
 		 if ($scope.urlString) {
  		 	imagesRef.push({
			    src: $scope.urlString,
			    source: $scope.urlSource,
			    sourceUrl: $scope.urlSourceUrl,
			    author: $scope.urlAuthor,
			    authorUrl: $scope.urlAuthorUrl,
			    addedById: currentUser.uid,
			    addedByName: currentUser.displayName			    
			  });
			}
		$scope.urlString = '';
		$scope.urlSource = '';
		$scope.urlSourceUrl = '';
		$scope.urlAuthor = '';
		$scope.urlAuthorUrl = '';
		$scope.isLooking=false;	
	 };
}]);
    
    
app.controller("ManagePlaceCtrl", [ "fsConfig", "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "DataSource", function(fsConfig, $scope, currentUser, $firebase, $routeParams, $location, filterFilter, DataSource) {
    var placename = $routeParams.place;
    var placeid = $routeParams.placeid;
   	$scope.placename = placename;
   	$scope.placeid = placeid;
    console.log(placename);
 	 var ref = new Firebase(fsConfig.FIREBASE_URL+'/places/').child(placeid);
 	 ref.setPriority(1000);
 	 var sync = $firebase(ref);
 	   // if ref points to a single record
	   var rec = sync.$asObject();
	   rec.$loaded().then(function() {
	   	 $scope.place = rec;
 		 $scope.hasData = true;		 
		 console.log('yep');

 	
		 //GET LODATION DATA 	
		 var APISOURCE = 'http://api.geonames.org/searchJSON?q='+ $scope.place.displayName +'&lang=en&style=short&maxRows=1&type=json&username=thirdman';
		 var apiData = function(data) {
				$scope.dataSet = data;
				console.log(data);
				if (data.geonames.length){
					$scope.hasData = true;
				}    				
				$scope.geoplace = data.geonames[0];
  		};
			DataSource.get(APISOURCE,apiData);  //this is the locations
	});
	
	 $scope.place = rec;
	 //$scope.geoplace = geoplace;
	 console.log($scope.geoplace);
    console.log($scope.place);
 
	
	$scope.geosubmit = function() {
         if ($scope.geoplace.name) {

			ref.update({ 
			displayName: $scope.geoplace.name, 
			geonameId: $scope.geoplace.geonameId,
			countryCode: $scope.geoplace.countryCode,
			gps:{
				lat: $scope.geoplace.lat, 
				lng: $scope.geoplace.lng
				}
			
			 });
	
//         alert($scope.geoplace.name);
        }
      };

    }]);
   
  
app.controller("EditBookCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$firebaseObject", "$routeParams", 
	function(fsConfig, $scope, currentUser, $firebaseArray, $firebaseObject, $routeParams) {
  var bookid = $routeParams.id;
  $scope.newSetting = null;
  console.log($routeParams.id);
  var ref = new Firebase(fsConfig.FIREBASE_URL+'/Books/' + bookid);
	$scope.bookobj = $firebaseObject(ref);
	$scope.book = $firebaseObject(ref);
	console.log($scope.book);
	$scope.autoObject = function(selectedObject) {
		console.log(selectedObject);
		var newSetting = selectedObject.originalObject;
		var bookplaceref = new Firebase(fsConfig.FIREBASE_URL+'/Books/' + bookid + '/places/');
    var placesref = new Firebase(fsConfig.FIREBASE_URL+'/places/');
    bookplaceref.child(newSetting.geonameId).set(newSetting);
    placesref.child(newSetting.geonameId).set(newSetting);
		$scope.newSetting = newSetting; 
  };
  
	var bookLocations = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/Books/' + bookid + '/tags/'));
	console.log(bookLocations);
	$scope.bookLocations = bookLocations;
	$scope.removePlace = function(place){
		console.log(place);
		//NOT WORKING
		var removeItemRef =  new Firebase(fsConfig.FIREBASE_URL+'/Books/').child(bookid).child('/places/');
		$scope.removeItemList = $firebaseArray(removeItemRef);
		console.log(removeItemRef);
		console.log($scope.removeItemList);
		$scope.removeItemList.$remove(place.geonameId);
		$scope.isFollowing = false;
	};

	$scope.removePriority = function() {
		ref.setPriority(null);
	};
	$scope.setPriority = function() {
		ref.setPriority(1000.0);
  };
}]);
