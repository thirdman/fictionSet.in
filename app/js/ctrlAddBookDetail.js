app.controller("AddBookDetailCtrl", [ "fsConfig", "$scope", "Auth", "currentUser",  "$routeParams", "$location", "filterFilter", "DataSource", "$q", "$http", 'ngDialog', "to_linesFilter", "FsNotify", "FsGet", "FsNotifyWithId", 
function(fsConfig, $scope, Auth, currentUser,  $routeParams, $location, filterFilter, DataSource, $q, $http, ngDialog, $to_linesFilter, FsNotify, FsGet, FsNotifyWithId ) {
	"use strict";
	var DEV_STATUS = false;
	DEV_STATUS = fsConfig.DEV_STATUS;
	var tempBook = {};
	var tempPlaces = [];
	var tempExcerpts = [];
	var tempTags = [];
	var newSetting = null;
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
	var authData = Auth.$getAuth();
  $scope.authData = authData;
	
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	
	//GET USER DATA
	if(authData){
	var refProfile = FsGet.getUser1(authData.uid);
	//var profile = new Profile(currentUser.uid);
	refProfile.$loaded().then(function(profile) {
		$scope.profile = profile;
		profile = profile;
		var userName = profile.displayName;
		$scope.userName = userName;
	  });
	}

 		 // get user
/*
 		  		if(currentUser){
	 		  		var refProfile = new Firebase(fsConfig.FIREBASE_URL).child('users').child(currentUser.uid); 			
			 			refProfile.once('value', function(snapshot) {
						    var exists = (snapshot.val() !== null);
						    var profile = snapshot.val();
							$scope.profile = profile;
							var userName = profile.displayName;
							$scope.userName = userName;
							});
				}
*/
 
 //GET RESULT DATA FROM AMAZON 
	var AMAZONURL = 'http://fictionset.in/admin/amazon/amazon_getBook.php?search='+$routeParams.amazonid;
  var amazonObj = function(data) {
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
		  }
		}else{
			$scope.amazonDescHtml = "";	
		}
	};
	DataSource.get(AMAZONURL, amazonObj);  //get amazonurl and then do amazonobj with it.

	/*
	* SAVE BOOK: does the setup and saving.
 	*	
	*/								
	$scope.saveBook = function(){
		if (tempPlaces.length){
			console.log('has places: ');
			console.log(tempPlaces);
			$scope.errorPlaces = false;		
			
			// SANATIZE CONTENT
						$scope.tempBook.title = $scope.amazonData.ItemAttributes.Title;
				if($scope.amazonData.ItemAttributes.Author){
					$scope.tempBook.author = $scope.amazonData.ItemAttributes.Author;
				}
				if($scope.amazonData.ItemAttributes.PublicationDate){
					$scope.tempBook.publicationDate = $scope.amazonData.ItemAttributes.PublicationDate;
				}
				if($scope.amazonData.ItemAttributes.Publisher){
					$scope.tempBook.publisher = $scope.amazonData.ItemAttributes.Publisher;
				}
				if($scope.amazonData.ItemAttributes.ISBN){
					$scope.tempBook.isbn = $scope.amazonData.ItemAttributes.ISBN;
				}
				if($scope.amazonData.ItemAttributes.EAN){
					$scope.tempBook.isbn13 = $scope.amazonData.ItemAttributes.EAN;
				}
				if($scope.amazonData.EditorialReviews){
					if($scope.amazonData.EditorialReviews.EditorialReview[0]){
						$scope.tempBook.description = $scope.amazonData.EditorialReviews.EditorialReview[0].Content;
					}
					if($scope.amazonData.EditorialReviews.EditorialReview[1]){
						$scope.tempBook.amazonreview = $scope.amazonData.EditorialReviews.EditorialReview[1].Content;
					} 
				}else{
					//do nothing	
				}
			$scope.tempBook.description = $scope.theDesc;
			$scope.tempBook.amazonDescHtml = $scope.amazonDescHtml;
			$scope.tempBook.coverurl = $scope.amazonData.LargeImage.URL;
			//IDs
			$scope.tempBook.amazon_id = $scope.amazonid;
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
			var cleanedTempBook = $scope.tempBook;
			console.log(cleanedTempBook);
			cleanedTempBook = angular.copy(cleanedTempBook);
			
			$scope.tempBook.places = tempPlaces;
			$scope.tempBook.excerpts = tempExcerpts;						
			$scope.tempBook.tags = tempTags;

			//CHECK FOR DEV STATUS
			if(DEV_STATUS === false){
				console.log('DEV_STATUS is' + DEV_STATUS);
				// if not in devmode, so we carry on with saving
				$scope.isSaving = true;
				
			//SET SAVE LOCATIONS
			//make these different to test actual saving without fucking up real data
			var refBook = ref.child('Books');
			var refTags = ref.child('tags');
			var refPlaces = ref.child('places');
			var refExcerpts = ref.child('excerpts1'); //NOT ACTUALLY DONE YET. TODO: make up an excerpts bit that shows various excerpts.
			
			//SAVE BOOK
			var newPostRef = refBook.push(cleanedTempBook);
			var postID = newPostRef.key();

			
			//SAVE NEW PLACES...
			var cleanedPlaces = $scope.tempPlaces;
			cleanedPlaces = angular.copy(cleanedPlaces);
			angular.forEach( cleanedPlaces, function(aPlace) {
				aPlace = angular.copy(aPlace);
				refBook.child(postID).child('places').child(aPlace.geonameId).set(aPlace);
				refPlaces.child(aPlace.geonameId).set(aPlace);
			});
			
			//SAVE TAGS
			var cleanedTags = $scope.tempTags;
			cleanedTags = angular.copy(cleanedTags);
			angular.forEach(cleanedTags, function(aTag) {
				refBook.child(postID).child('tags').child(aTag.text).set({
					tagId: aTag.text
				});
				refTags.child(aTag.text).child('books').push(postID);
			});
			
			//SAVE EXCERPTS
			var cleanedExcerpts = $scope.tempExcerpts;
			cleanedExcerpts = angular.copy(cleanedExcerpts);
			refBook.child(postID).child('excerpts').set(cleanedExcerpts);
			
			//ADMIN STUFF:
			// ADD NOTIFICATION TO RELEVANT PEOPLE
			FsNotifyWithId.bookAdded(currentUser.uid, postID); 
			
			// UPDATE NUMBER OF BOOKS ADDED BY THIS USER:
			var currentUserBookCount;
			if(!refProfile.booksAdded){
				currentUserBookCount = 0;
			} else {
				currentUserBookCount = refProfile.booksAdded;
			}
			console.log(currentUserBookCount);	
			if(currentUserBookCount === 0){
				$location.path("/response/bookSuccess/"+postID+"/travelguide"); 
			}else{
			$location.path("/response/bookSuccess/"+postID); 
			}
		} else {
			// DEVSTATUS is true (ie. dev mode) so warn about it not saving.
			console.log('DEVMODE: no actual saving. DATA USED WOULD BE:');
			console.log('BOOK');
			console.log(cleanedTempBook);
			console.log('PLACES');
			console.log(tempPlaces);
			console.log('EXCERPTS');
			console.log(tempExcerpts);
			console.log('TAGS');
			console.log(tempTags);

		}
		//ends DEVSTATUS check
		
		}else{
			//continues if else for has places...
			// DOESN"T HAVE PLACCES SO ALERT USER, and don't save
			console.log('does not have places');
			console.log(tempPlaces);
			$scope.isSaving = false;
			$scope.errorPlaces = true;		
		}
	};//ends addbook


	////////////////////////////////////////////////////////////////////////////////////
	///////////////////// FUNCTIONS AND FILTERS
	////////////////////////////////////////////////////////////////////////////////////
	/*
	* ADD BOOK LOACTION: sets a new selected location into temporaty list
	*
	*/
	$scope.addBookLocation = function(selectedObject) {
		newSetting = selectedObject.originalObject;
		tempPlaces.push(newSetting);
		$scope.newSetting = newSetting; 
	};
	$scope.newSetting = newSetting;

	/*
	* REMOVE PLACE: removes a place from the list
	*
	*/
	$scope.removePlace = function(place){
		$scope.tempPlaces.splice( $scope.tempPlaces.indexOf(place), 1 );
		tempPlaces = $scope.tempPlaces;
	};

	/*
	* ADD EXCERPT: sets a new excertp to temporary list
	*
	*/		
	$scope.addExcerpt = function( ) {
		console.log($scope.newExcerpt);
		if ($scope.newExcerpt) {
			tempExcerpts.push($scope.newExcerpt);
			console.log(tempExcerpts);
			$scope.newExcerpt = null;
		}
	};

	/*
	* REMOVE EXCERPT: removes a new excertp from temporary list
	*
	*/		
	$scope.removeExcerpt = function(tempExcerpt){
		$scope.tempExcerpts.splice( $scope.tempExcerpts.indexOf(tempExcerpt), 1 );
		tempExcerpts = $scope.tempExcerpts;
	};

	/*
	* ADD TAG: adds a tag to temporary List
	*
	*/		
	$scope.addTag = function( ) {
		console.log($scope.newTag);
		if ($scope.newTag) {
			tempTags.push($scope.newTag);
			console.log(tempTags);
			$scope.newTag = null;
		}
	};

	/*
	* REMOVE TAG: removes a tag from temporary list
	*
	*/		
	$scope.removeTag = function(tempTag){
		$scope.tempTags.splice( $scope.tempTags.indexOf(tempTag), 1 );
		tempTags = $scope.tempTags;
	};

	/*
	*  OPEN GUIDELINEs - does dialog.
	*
	*/
	$scope.clickToOpenGuidelines = function () {
		ngDialog.open({ 
			plain: false,
			template: 'views/dialogs/dialogGuidelines.html',
			scope: $scope
		});
	};



}]);
 	 