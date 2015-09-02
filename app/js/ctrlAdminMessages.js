app.controller("AddMessageCtrl", [ "fsConfig", "$scope", "currentUser", "$routeParams", "$location", "filterFilter", "DataSource", "Profile", "FsNotifyWithId", function(fsConfig, $scope, currentUser, $routeParams, $location, filterFilter, DataSource, Profile, FsNotifyWithId) {
	"use strict";
	$scope.isLoading = false;
	$scope.messageAuthor = "";
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	if(currentUser){
		var refProfile = new Firebase(fsConfig.FIREBASE_URL+'/users/').child(currentUser.uid);	
		refProfile.once('value', function(snapshot) {
			var profile = snapshot.val();
			$scope.profile = profile;
			console.log(profile.name);					
			var messageAuthor = profile.name;
			$scope.messageAuthor = messageAuthor;
			console.log(profile);
		});	  		
	}
	var messages = ref.child("system/usermessages");
	$scope.updateMessages = function() {
	var messageType = 'system';
	var messageLink;
	var theTimestamp = new Date().valueOf();
	if ( $scope.message.link) {
		messageLink =  $scope.message.link;
	} else {
		messageLink = "";
	}
	if ($scope.message.content) { 
		var newPostRef = messages.push({
	    title: $scope.message.title,
	    authorName: $scope.messageAuthor,
	    authorId: currentUser.uid,
	    messageType: messageType,
	    messageLink: messageLink,
	    timestamp: theTimestamp,
	    messageContent: $scope.message.content
	  }, function(){
			var postID = newPostRef.key();
		  console.log('new post id is: '+ postID);	
		  if(fsConfig.DEV_STATUS === true){				  
			  console.log("DEV STAUS: "+ fsConfig.DEV_STATUS);
			  console.log('IT WOULD POST MESSAGE HERE');
		  } else{
		  	FsNotifyWithId.systemMessage(currentUser.uid, postID);						  
		  }
	
		  
		  $location.path('/home').replace();
		  $scope.$apply();
	  });
	}
	};
}]);


app.controller("UserMessageCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$routeParams", "$location", "filterFilter", "DataSource", "Profile", "FsNotify", 
function(fsConfig, $scope, currentUser, $firebaseArray, $routeParams, $location, filterFilter, DataSource, Profile, FsNotify) {
	"use strict";
	$scope.isLoading = false;
	$scope.isSent = false;
	$scope.messageAuthor = "";
	$scope.recipientid = $routeParams.userid;
	var messageLink;
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	$scope.notificationTypes = [
     { id: 'bookAdd', title: 'bookAdd', textContent: "A new book was added!", textContent1: " was added by ", textContent2: ", set in " },
     { id: 'bookSuggest', title: 'bookSuggest', textContent: "A book was suggested.", textContent1: " was suggested by ", textContent2: ", set in "  },
     { id: 'locationFollow', title: 'locationFollow', textContent: "A location was followed.", textContent1: " was followed by "},
     { id: 'collectionFollow', title: 'collectionFollow', textContent: "A collection was followed", textContent1: " was followed by " }
	];
	
	var refLocations = $firebaseArray(ref.child('places')); 
	var refUsers = $firebaseArray(ref.child('users')); 
	var refBooks = $firebaseArray(ref.child('Books')); 
	var refCollections = $firebaseArray(ref.child('collections')); 
	$scope.theLocations = refLocations;
	$scope.theUsers = refUsers;
	$scope.theBooks = refBooks;
	$scope.theCollections = refCollections;
	console.log(refBooks);
	console.log(refLocations);
	if(currentUser){
		var refProfile = new Firebase(fsConfig.FIREBASE_URL+'/users/').child(currentUser.uid);		
		refProfile.once('value', function(snapshot) {
			var profile = snapshot.val();
			$scope.profile = profile;
			console.log(profile.name);					
			var messageAuthor = profile.name;
			$scope.messageAuthor = messageAuthor;
			console.log(profile);
		});
	}
	var messages = ref.child("messages"); 
	
	
	/*
	* ADD NOTIFICATION
	*
	*/
	$scope.addNotification = function(){	 
		//DEFINE MESSAGE DEFAULTS...
		var messageType = 'System';
		if($scope.messageType.id){
			messageType = $scope.messageType.id;
		}
		console.log('the message type is ' + messageType);
		//var theTimestamp = new Date().valueOf();
		//var activatorUserName = $scope.message.theUser.displayName;
		//var activatorUserId = $scope.message.theUser.$id;
		var theBookId = $scope.message.theBook.$id;
		//var theBookTitle = $scope.message.theBook.title;
		var theLocationId, theLocationName;
		if($scope.message.theLocation){
			theLocationId = $scope.message.theLocation.geonameId;
			theLocationName = $scope.message.theLocation.name;
			//var theCountryId = $scope.message.theLocation.countryId;
			//var theCountryName = $scope.message.theLocation.countryName;
		}
		
		messageLink = "http://fictionset.in/#/book/"+theBookId;
		
		//SWITSH FOR THE DIFFERENT MESSAGE TYPES...
		switch(messageType){
		//WHEN A BOOK IS ADDED:	
			case "bookAdd":
			console.log('switch add book');
		  if(fsConfig.DEV_STATUS === true){				  
			  console.log("DEV STAUS: "+ fsConfig.DEV_STATUS);
			  console.log('IT WOULD NOTIFY A BOOK HERE');
		  } else{
				//FsNotify.bookAdded($scope.message.theUser, $scope.message.theBook);
		  }

			//var theTitle = "New Book Added";
			//var theContent = activatorUserName + " added a new book: " + theBookTitle;
			//var refBook = new Firebase(fsConfig.FIREBASE_URL+'/Books/').child(theBookId);		
			/*
			refUsers.$loaded().then(function() {
	        console.log( refUsers );
			
				refBook.once('value', function(snapshot) {
				    var bookExists = (snapshot.val() !== null);
				    var bookData = snapshot.val();
				    console.log('the book is');
					console.log(bookData);
					angular.forEach(bookData.places, function(thePlace){
						console.log('thePlace is:');
						console.log(thePlace);
						var thisLocationId = thePlace.geonameId;
						var refinedUserGroup = filterFilter(refUsers, {following:thisLocationId});
						console.log( refinedUserGroup );
						angular.forEach(refinedUserGroup, function(user){
							console.log(user);
							var recipientId = user.$id; 
							if (1==2) {
//							if ($scope.messageType) {
				  		 		messages.child(recipientId).push({
						  		 	'userId': recipientId,
								    messageType: messageType,
								    title: theTitle,
								    authorName: activatorUserName,
								    authorId: activatorUserId,
								    activatorName: activatorUserName,
								    activatorId: activatorUserId,
								    bookId: theBookId,
								    bookTitle: theBookTitle,
								    coverurl: bookData.coverurl,
									//locationId: theLocationId,
									//locationName: theLocationName,
									locationId: thePlace.geonameId,
									locationName: thePlace.name,
									countryId: thePlace.countryId,
									countryName: thePlace.countryName,
									messageLink: messageLink,
								    timestamp: theTimestamp,
								    messageContent: theContent
								  },function(error){
								  		if(error){
										console.log('error: ');
										console.log(error);
									} else{
										$scope.isSent = true;
										alert('sent');
										$location.path('/admin/users').replace();
										$scope.$apply();
									}
								});
							}
						});//ends foreach usergroup
				
				}); //ends foreach bookplace


			});//ends book once

			}); //ends refUsers.loaded
*/
	    break;
	    // IF A BOOK IS SUGGESTED
	    case "bookSuggest":
			console.log('switch suggest book');
		  if(fsConfig.DEV_STATUS === true){				  
			  console.log("DEV STAUS: "+ fsConfig.DEV_STATUS);
			  console.log('IT WOULD NOTIFY A SUGGESTION HERE');
		  } else{
				console.log(FsNotify.bookSuggested($scope.message.theUser, $scope.message.theBook));
				//FsNotify.bookSuggested($scope.message.theUser, $scope.message.theBook);
		  }

			/*
 			var theTitle = "New Suggestion";
			var theContent = activatorUserName + " suggested a new book: " + theBookTitle;
			var refBook = new Firebase('https://.....firebaseio.com/Books/').child(theBookId);		
			
			refUsers.$loaded().then(function() {
			refBook.once('value', function(snapshot) {
			    var bookExists = (snapshot.val() !== null);
			    var bookData = snapshot.val();
			    console.log('the book is');
				console.log(bookData);
				angular.forEach(bookData.places, function(thePlace){
					console.log('thePlace is:');
					console.log(thePlace);
					var thisLocationId = thePlace.geonameId;
					var refinedUserGroup = filterFilter(refUsers, {following:thisLocationId});
					console.log( refinedUserGroup );
					angular.forEach(refinedUserGroup, function(user){
						console.log(user);
						var recipientId = user.$id; 
						if ($scope.messageType) {
			  		 		messages.child(recipientId).push({
					  		 	'userId': recipientId,
							    messageType: 'bookSuggest',
							    title: theTitle,
							    activatorName: activatorUserName,
							    activatorId: activatorUserId,
							    bookId: theBookId,
							    bookTitle: theBookTitle,
							    coverurl: bookData.coverurl,
								locationId: thePlace.geonameId,
								locationName: thePlace.name,
								countryId: thePlace.countryId,
								countryName: thePlace.countryName,
								messageLink: messageLink,
							    timestamp: theTimestamp,
							    messageContent: theContent
							  },function(error){
							  		if(error){
									console.log('error: ');
									console.log(error);
								} else{
									$scope.isSent = true;
									$location.path('/admin/users').replace();
									$scope.$apply();
								}
							});
						}
					});//ends foreach usergroup
				
				}); //ends foreach bookplace
			
			
			});//ends book once
			
			}); //ends refUsers.loaded
*/
 	      break;

	      case "locationFollow":
	      	// TODO: what happens when a location is followed. 
					alert('switch location follow');
	        break;

	      case "collectionFollow":
	      	// TODO: what happens when a collection is Followed
					alert('switch collection');
	      break;
	      default:
	      console.log('There should not be a default failover at this thing.');
	   }	 
		if ( $scope.message.link) {
			messageLink =  $scope.message.link;
		} else if( $scope.message.bookid)  {
			messageLink = "http://fictionset.in/book/" + theBookId;
		} else {
			messageLink = "";
		}
	};
	 
	 
	/*
	* PUSH THE MESSAGE
	*
	*/

	 $scope.updateMessages = function() {
	 	var messageType = 'System';
	 	var theTimestamp = new Date().valueOf();
	 	if ($scope.message.link) {
		 	messageLink = $scope.message.link;
	 	} else {
		 	messageLink = "";
	 	}
		if ($scope.message.content) {
			if(fsConfig.DEV_STATUS === true){				  
			  console.log("DEV STAUS: "+ fsConfig.DEV_STATUS);
			  console.log('IT WOULD MESSAGE HERE');
		  } else{
  		 	messages.push({
			    title: $scope.message.title,
			    authorName: $scope.messageAuthor,
			    authorId: currentUser.uid,
			    messageType: messageType,
			    messageLink: messageLink,
			    timestamp: theTimestamp,
			    messageContent: $scope.message.content
			  },function(error){
				  console.log(error);
				  $location.path('/account').replace();
	          $scope.$apply();  
			  });
			}



		}
	};
}]);
