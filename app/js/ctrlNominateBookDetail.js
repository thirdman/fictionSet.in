app.controller("NominateBookDetailCtrl", [ "fsConfig", "$scope", "currentUser", "$routeParams", "$location", "filterFilter", "DataSource", "$q", "$http", 'ngDialog', "to_linesFilter", "FsNotify", "FsNotifyWithId", function(fsConfig, $scope, currentUser, $routeParams, $location, filterFilter, DataSource, $q, $http, ngDialog, $to_linesFilter, FsNotify, FsNotifyWithId) {
	    var testMode = false;
		var tempBook = {};
		var tempPlaces = [];
		var tempExcerpts = [];
		var tempTags = [];
		var newSetting = null;
		var ngDialog;
		$scope.amazonDescHtml = "";
		$scope.userComment = "";
	    $scope.newSetting = null;
	    $scope.tempExcerpts = tempExcerpts;
	    $scope.newExcerpt = null;
    	$scope.tempBook = tempBook;
    	$scope.tempPlaces = tempPlaces;
    	$scope.tempTags = tempTags;
 		$scope.amazonid = $routeParams.amazonid;
 		$scope.hasData = false;
 		$scope.isLooking = true;
 		$scope.isSaving = false;
 		$scope.errorPlaces = false;		
		
 		var ref = new Firebase(fsConfig.FIREBASE_URL);
 		 // get user
  		if(currentUser){
	  		var refProfile = new Firebase(fsConfig.FIREBASE_URL+ '/users/').child(currentUser.uid); 			
 			refProfile.once('value', function(snapshot) {
			    var exists = (snapshot.val() !== null);
			    var profile = snapshot.val();
				$scope.profile = profile;
				var userName = profile.displayName;
				$scope.userName = userName;
		  		console.log(profile.name);					
		  		console.log(profile);
				});
		}
 
 
 		 var AMAZONURL = 'http://fictionset.in/admin/amazon/amazon_getBook.php?search='+$routeParams.amazonid;
   		amazonObj = function(data) {
   				var amazonData = data[0];
				$scope.isLooking = true;
				$scope.hasData = true;
				$scope.amazonData = amazonData;

   				if (amazonData.ItemAttributes.Title.length){
	    			$scope.hasData = true;
					$scope.amazonData = amazonData;
	    			$scope.hasData = true;
					} else {
						return 'no data';
					}    
				console.log('amazon data is...');
  				 console.log(amazonData);

  				 if(amazonData.EditorialReviews){
  				   	if(amazonData.EditorialReviews.EditorialReview[0]){
  				   		$scope.theDesc = $to_linesFilter(amazonData.EditorialReviews.EditorialReview[0].Content);
  				   		$scope.amazonDescHtml =  amazonData.EditorialReviews.EditorialReview[0].Content;

  				   	} else if(amazonData.EditorialReviews.EditorialReview.Content){
  				   		$scope.theDesc = $to_linesFilter(amazonData.EditorialReviews.EditorialReview.Content);
  				   		$scope.amazonDescHtml =  amazonData.EditorialReviews.EditorialReview.Content;
  				   	} else {
	  				   	$scope.theDesc = "";
	  				   	$scope.amazonDescHtml ="";
  				   	};
  				}else{
	  			$scope.amazonDescHtml = "";	
 				}
 				};
 			DataSource.get(AMAZONURL,amazonObj);  //this is the locations

 					// NOW DO THE PLACES SEARCH & TEMP LIST
		 			 $scope.autoObject = function(selectedObject) {
		 				newSetting = selectedObject.originalObject;
		 				var bookplaceref = tempPlaces;
		                  
		                tempPlaces.push(newSetting);
		 				$scope.newSetting = newSetting; 
		                };
		                
		                $scope.newSetting = newSetting;


					$scope.removePlace = function(place){
 						$scope.tempPlaces.splice( $scope.tempPlaces.indexOf(place), 1 );
 						tempPlaces = $scope.tempPlaces;
					}
					// NOW DO THE TAGS 				
					 $scope.addTag = function( ) {
 					 	console.log($scope.newTag);
				 		 if ($scope.newTag) {
				  		 	tempTags.push($scope.newTag);
 							console.log(tempTags);
							$scope.newTag = null;
							}
					}
					$scope.removeTag = function(tempTag){
 						//tempExcerpts = $filter('filter')(tempExcerpts, {!tempExcerpt})
						$scope.tempTags.splice( $scope.tempTags.indexOf(tempTag), 1 );
 						tempTags = $scope.tempTags;
					}

 
 
 			// NOW SAVE THE BOOK 									
			$scope.saveBook = function(){
				if (tempPlaces.length){
					console.log('has places: ');
					console.log(tempPlaces);
					$scope.errorPlaces = false;		
				
					if (testMode ==false){
							console.log('testMode is' + testMode);
						//carry on with saving///
						$scope.isSaving = true;

						$scope.tempBook.title = $scope.amazonData.ItemAttributes.Title;
						if($scope.amazonData.ItemAttributes.Author){
							$scope.tempBook.author = $scope.amazonData.ItemAttributes.Author;
						};
						if($scope.amazonData.ItemAttributes.PublicationDate){
 						$scope.tempBook.publicationDate = $scope.amazonData.ItemAttributes.PublicationDate;
						};
						if($scope.amazonData.ItemAttributes.Publisher){
							$scope.tempBook.publisher = $scope.amazonData.ItemAttributes.Publisher;
						};
						if($scope.amazonData.ItemAttributes.ISBN){
							$scope.tempBook.isbn = $scope.amazonData.ItemAttributes.ISBN;
						};
						if($scope.amazonData.ItemAttributes.EAN){
							$scope.tempBook.isbn13 = $scope.amazonData.ItemAttributes.EAN;
						};
						if($scope.amazonData.EditorialReviews){
							if($scope.amazonData.EditorialReviews.EditorialReview[0]){
								$scope.tempBook.description = $scope.amazonData.EditorialReviews.EditorialReview[0].Content;
							};
							if($scope.amazonData.EditorialReviews.EditorialReview[1]){
								$scope.tempBook.amazonreview = $scope.amazonData.EditorialReviews.EditorialReview[1].Content;
							}; 
							}else{
							
						};
 						$scope.tempBook.description = $scope.theDesc;
						$scope.tempBook.amazonDescHtml = $scope.amazonDescHtml;

 						$scope.tempBook.coverurl = $scope.amazonData.LargeImage.URL;
						if($scope.bookLink){
	 						$scope.tempBook.bookLink = $scope.bookLink;
	 					}
						//IDs
						$scope.tempBook.amazon_id = $scope.amazonid;
							//$scope.tempBook.gr_id = 
							//$scope.tempBook.apple_id = 

						//META DATA
						var newtimestamp = new Date().valueOf();
 						$scope.tempBook.timestamp = newtimestamp;
						$scope.tempBook.addedById = currentUser.uid;
						if($scope.userName){
							$scope.tempBook.addedByName = $scope.userName;
						} else if(currentUser.displayName){
							$scope.tempBook.addedByName = currentUser.displayName;
						} else {
							$scope.tempBook.addedByName = 'Anonymous User';
						}
						$scope.tempBook.userComment = $scope.userComment;
						


					//SET LOCATIONS
					var refBook = ref.child('nominated').child('Books');
 					var refPlaces = ref.child('nominated').child('places');
 					var refTags = ref.child('nominated').child('tags');
 						
					var cleanedTempBook = $scope.tempBook;
					console.log(cleanedTempBook);
					var cleanedTempBook = angular.copy(cleanedTempBook);
 					//SAVE BOOK
					var newPostRef = refBook.push(cleanedTempBook);
					var postID = newPostRef.key();
						$scope.tempBook.places = tempPlaces;
 
					//do places
					var cleanedPlaces = $scope.tempPlaces;
					var cleanedPlaces = angular.copy(cleanedPlaces);
					angular.forEach( cleanedPlaces, function(aPlace, key) {
						aPlace = angular.copy(aPlace);
						refBook.child(postID).child('places').child(aPlace.geonameId).set(aPlace);
						refPlaces.child(aPlace.geonameId).set(aPlace);
 					     });
					var cleanedTags = $scope.tempTags;
					var cleanedTags = angular.copy(cleanedTags);
 					angular.forEach(cleanedTags, function(aTag, key) {
						refBook.child(postID).child('tags').child(aTag.text).set({
							tagId: aTag.text
						});
 						refTags.child(aTag.text).child('books').push(postID);
					});

					
					//add a notificiation
					var messageType = 'Nomination';
					var theTimestamp = new Date().valueOf();
					var theAuthorName = $scope.messageAuthor;
					var theAuthorId = currentUser.uid;
					
					FsNotifyWithId.bookSuggested(currentUser.uid, postID); //SENDS ONLY IDS

					/*
					ref.child('/system/adminmessages').push({
						title:"A Book was nominated",
						messageContent:  $scope.tempBook.title + " was nominated",
						messageType: messageType,
						authorName: $scope.userName,
						authorId: currentUser.uid,
 						timestamp: theTimestamp	
 					});
					*/

			   	 	$location.path("/requests/"); 
			   	 	}//ends edit mode check
				}else{//contintues if else for hasplaces...
					console.log('does not have places')
					console.log(tempPlaces);
					$scope.isSaving = false;
					$scope.errorPlaces = true;		
				}
	};//ends addbook


 

	$scope.clickToOpenGuidelines = function () {
      ngDialog.open({ 
			plain: false,
         	template: 'views/dialogs/dialogGuidelines.html',
        	scope: $scope
			});
    }; //ends clicktoopen

}]);
