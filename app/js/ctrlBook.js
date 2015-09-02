 app.controller("BookCtrl", ["fsConfig", "$scope", "$rootScope", "Auth", "currentUser",  "$firebaseArray", "$firebaseObject", "$routeParams", "$location", "$timeout", "DataSource", "iTunesData", "Profile", "filterFilter",  'ngDialog', "$log", "FsStats", "FsGet",
 function(fsConfig, $scope, $rootScope, Auth, currentUser,  $firebaseArray, $firebaseObject, $routeParams, $location, $timeout, DataSource, iTunesData, Profile, filterFilter,  ngDialog, $log,  FsStats, FsGet ) { 
	'use strict';
	// TODO: refactor out user stuff so the page can load quicker, THEN update with user stuff ?
	
	$scope.isLoading = true;
	$scope.auth = Auth;
	var authData = Auth.$getAuth();
  $scope.authData = authData;
	var isBookmarking = false;
	$scope.isBookmarking = isBookmarking;
	$scope.hasData = false;
	$scope.isLoadingAmazon = false;
	$scope.noAmazon = true;
	$scope.hasAmazon = false;
	$scope.amazonData = '';
	$scope.userAaa = false;
	$scope.userRole = 0;
	$scope.relatedBooks = '';
	$scope.thereport = '';
	$scope.bookplaces = {};
	var placesCount;
	$scope.placesCount = placesCount;
	var placesMarkers = '/';
	//var mapBoxKey = 'pk.eyJ1IjoidGhpcmRtYW4iLCJhIjoidjBOQ0lrYyJ9.8zzETVcyoBg2nlMquUR1TA';
	//var mapUrlStringStart =  'http://api.tiles.mapbox.com/v4/thirdman.j1o1gjim';
	//var bkZoom = 5;
	var mapUrlString = '';
	var amazonObj, addABook, removeABook, collectionAdded, collectionProcessing, tempBooksArray, bookProcessing, bookRemoved, sQuery;
	$scope.mapUrlString = mapUrlString;
	var bkLat;
	var bkLng;
	var mapCenterLatTop = '';
	var mapCenterLatBottom = '';
	var mapCenterLngTop = '';
	var mapCenterLngBottom = '';	
	var inCollection = false;
	var neighbourCountries = [];
	var relatedBooks = [];

 	var bookid = $routeParams.id;
 	$scope.inCollection = inCollection;
 	$scope.bookid = bookid;
 	$scope.testContent = "ggg";
	$scope.collectionFollowing = false;
	$scope.collectionAdded = false;
	$scope.collectionProcessing = false;	
	var collectionShowCreate = false;	
	$scope.collectionShowCreate = collectionShowCreate;
	var collectionsObj = {};
	$scope.collectionsObj  = collectionsObj;
	var collectionsArray = [];
	$scope.collectionsArray = collectionsArray;
	var neighbourRelatedBooks = [];


  var ref = new Firebase(fsConfig.FIREBASE_URL+'/Books/' + bookid);
	$scope.book = $firebaseObject(ref);
	var obj = $firebaseObject(new Firebase(fsConfig.FIREBASE_URL+'/Books/' + bookid));
	var booksArray = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/Books/'));
  //var placesRef =  new Firebase(fsConfig.FIREBASE_URL+'/places/');
	obj.$loaded().then(function() {
		$scope.hasData = true;
		$scope.isLoading = false;
		$rootScope.pageTitle = 'Book: '+ obj.title;
		console.log('Book Obj is:');
		console.log(obj);

		// DO VIEW COUNT SAVE
		FsStats.addBookView(bookid);

		//SET UP DATA RETRIEVAL
		if(obj.amazon_id.length){
	  	var amazonUrl = 'http://fictionset.in/admin/amazon/amazon_getBook.php?search=' + obj.amazon_id;
			getAmazonData(amazonUrl);
	  }
	  
		// DO PLACES
		if(obj.places){
			//TODO: refactor this into seperate service/function.
			var bookPlaces = [];
			bookPlaces = obj.places;
			$scope.bookPlaces = bookPlaces;
			var keepGoing = true;
			var theCount = 0;
			var lastCountry = "";
			var countryList = [];
	
			// LIST OF PLACES
			//generate a list of countries this book is in, with map markers
			angular.forEach(bookPlaces,function(place) {
				if (mapCenterLatBottom === ''){
					mapCenterLatTop = place.lat;
					mapCenterLatBottom = place.lat;
				} else{
					if(place.lat > mapCenterLatTop){
						mapCenterLatTop = place.lat;
					}
					if(place.lat < mapCenterLatBottom){
						mapCenterLatBottom = place.lat;
					}
				}
				if (mapCenterLngBottom === ''){
					mapCenterLngTop = place.lng;
					mapCenterLngBottom = place.lng;
				} else {
					if(place.lat > mapCenterLngTop){
						mapCenterLngTop = place.lng;
					}
					if(place.lat < mapCenterLngBottom){
						mapCenterLngBottom = place.lng;
					}
				}
				var thisPlaceMarker = 'pin-m-library+222('+ place.lng +','+ place.lat+')';
				if (placesMarkers === '/'){
					placesMarkers = placesMarkers + thisPlaceMarker;						
				} else{
					placesMarkers = placesMarkers + ',' + thisPlaceMarker;						
				}
				if(lastCountry !== place.countryId){
					console.log('Locations is not from the same country');
					lastCountry = place.countryId;
					countryList.push(place);
				}
	
				if(keepGoing) {
					//TEMPORARY HACK, MUST FIX: this sets the map to the location of the first tag.
					// TODO: Ideally it Should great a map zoomed to all the tags with markers on the map
					bkLat = place.lat;
					bkLng = place.lng;
					$scope.bkLng = bkLng;
					$scope.bkLat = bkLat;	
					if(theCount === 1){
						keepGoing = false;
					  }
					}
					theCount = theCount +1;
			}); //ends forEach
			console.log('theCount length: ');
			console.log(theCount);
			placesCount = theCount;
			$scope.placesCount = theCount;
	
			//RELATED BOOKS FOR PLACE
			booksArray.$loaded().then(function() {
				angular.forEach(countryList,function(country) {
					getRelated(country.countryId); //pushes this place to the function that finds neighbouring countries/places
		 			var countryBooks = filterFilter(booksArray, country.countryId );
					console.log(countryBooks );
					country.countryBooks = countryBooks;
					relatedBooks.push(country);
					$scope.relatedBooks = relatedBooks;		
				});
			});
			
	
			} else {
			//IF THERE ARE NO OBJ.PLACES, set a default so it won't fuck up:
			$scope.bkLng = "100";
			$scope.bkLat = "0";	 		 	
		}//ends obj.places.
	
		// DO info stuff for pricing.
		if(obj.apple_id){
			console.log('Yo, apple id already here');
			sQuery = obj.apple_id;
			getAppleDataID(sQuery);
		} else if (obj.isbn13){
			console.log('Yo, isbn13 in the house!');
			sQuery = obj.isbn13;
			getAppleData(sQuery);
		}
		checkCollectionStatus(currentUser); //checks if it is in user collection
	});//ends obj.loaded
 	
 	//gets a list of collections this book is in 
 	//this appears ont he actual page.
 	var arrCollections = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/collections/'));
	$scope.arrCollections = arrCollections;
	arrCollections.$loaded().then(function() {
		/*
				  	console.log('filtering collections for this book... ' );
		 		  	 var bookInCollectionsArray = filterFilter(arrCollections, bookid);
				  	 console.log('bookInCollectionsArray length is: ' + bookInCollectionsArray.length);
					 	if (bookInCollectionsArray.length){
						 	console.log('in bookInCollectionsArray and collections is');
						 	console.log(bookInCollectionsArray);
					 	} else {
						 	console.log('not in bookInCollectionsArray  ');
		  			 	}
		 			 $scope.bookInCollectionsArray = bookInCollectionsArray;
		 			 $scope.collectionsObj = bookInCollectionsArray;
		*/
	});

	// now for the user...
	// gets current user profile + collections
	if(authData){
	var collectionList = {};
	var profile = FsGet.getUser1(authData.uid);
	//var profile = new Profile(currentUser.uid);
	profile.$loaded().then(function() {
		$scope.profile = profile;
	  if(profile.collections){
		  console.log('profile collections:');
			console.log(profile.collections);
  	  collectionList = profile.collections;
	  } else{
			console.log('No profile collections:');
			}
	});
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
  
	var userCollectionArray = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+"/users/").child(currentUser.uid).child('collections'));
	userCollectionArray.$loaded().then(function() {
	 console.log('userCollectionArray length is ' + userCollectionArray.length);
	 $scope.userCollectionArray = userCollectionArray;
	});
 	
 	
 	
	  
 
  	 ////////////////////////////////////////////////////
  	 ///////////// THIS DOES THE BOOKSHELF
  	 ///////////// TODO: UGH, ugly! refactor into seperate services/funtions
		 ///////////////////////////////////////
 
 	var checkCollectionStatus = function(currentUser){
	 		 isBookmarking = true;
	 		 $scope.isBookmarking = isBookmarking;
	    	var refUser = new Firebase(fsConfig.FIREBASE_URL+"/users/").child(currentUser.uid);
	 	    refUser.child('collections/bookshelf').once('value', function(snapshot) {
		    var hasBookshelf = (snapshot.val() !== null);
		    if(hasBookshelf){
			    var userCollection = [];
			 	userCollection = snapshot.val();
			 	$scope.bookshelf = snapshot.val();
			 	userCollection = filterFilter(userCollection, $scope.book.$id);
			 	console.log('userCollection length is: ' + userCollection.length);
			 	if (userCollection.length){
				 	console.log('in collection and their collection is');
				 	console.log(userCollection);
				 	console.log('adding to sceope');
				 	inCollection = true;
				 	$scope.inCollection = inCollection;
			 	} else {
				 	console.log('not in collection and their collection is');
				 	console.log(userCollection);
			 		inCollection = false;
				  	$scope.inCollection = inCollection;
			 	}
			}
			 isBookmarking = false;
	 		 $scope.isBookmarking = isBookmarking;
  		  });
	  };
 	}

  	var getAmazonData = function(amazonUrl) {
			$scope.isLoadingAmazon = true;
			//	 var AMAZONURL = 'http://fictionset.in/admin/amazon/amazon_getBook.php?search='+obj.amazon_id;
    		amazonObj = function(data) {
   				var amazonData = data[0];
	        	console.log(amazonData);
   				if (amazonData.ItemAttributes.Title.length){
					$scope.amazonData = amazonData;
   				   	$scope.isLoadingAmazon = false;
   				   	$scope.hasAmazon = true;
   				   	$scope.noAmazon = false;
					} else {
   				   	   	$scope.noAmazon = true;
   				   	   	$scope.isLoadingAmazon = false;
					}    
 				};
 				DataSource.get(amazonUrl,amazonObj);  //this is the amazon data
 			};

  	var getAppleData = function(sQuery) {
			$scope.isLoadingApple = true;

		 	iTunesData.lookupIsbn(sQuery)
		        .then(function(result) {
		        if(result.data){
			        console.log('has data');
					console.log('take a bite of this lovely apple:');
					console.log(result.data);
					var appleData = result.data.results[0];
					$scope.appleData = appleData;
   				   	$scope.isLoadingApple = false;
   				   	$scope.hasApple = true;
   				   	$scope.noApple = false;

		        }else{
   				   	$scope.isLoadingApple = false;
   				   	$scope.noApple = true;
		        }//ends if
 		       });
 	};   
    
  	var getAppleDataID = function(sQuery) {
			$scope.isLoadingApple = true;

		 	iTunesData.lookupId(sQuery)
		        .then(function(result) {
		        if(result.data){
			        console.log('has data');
					console.log('take a bite of this lovely apple:');
					console.log(result.data);
					var appleData = result.data.results[0];
					$scope.appleData = appleData;
   				   	$scope.isLoadingApple = false;
   				   	$scope.hasApple = true;
   				   	$scope.noApple = false;

		        }else{
   				   	$scope.isLoadingApple = false;
   				   	$scope.noApple = true;
		        }//ends if
 		       });
 	};   
    
    
 


 	

 	// ADD TO BOOKSHELF - SOMETIME UNIFY THESE WTIH THE DIALOG VERSION
 	$scope.collectionsAdd = function(book, collection, collectionId) {
		//console.log('----> book, collection, collectionId...');
	 	//console.log(book);
	 	//wconsole.log(collectionId);
	 	isBookmarking = true;
	 	$scope.isBookmarking = isBookmarking;

	  	var userCollections = new Firebase(fsConfig.FIREBASE_URL).child('users').child(currentUser.uid).child('collections');
 		userCollections.child(collectionId).child('books').child(bookid).once('value', function(snapshot) {
  			var hasBook = (snapshot.val() !== null);
			if(hasBook){
				//console.log('it has the book, so go remove it...');
 			    removeBook(currentUser, book, collectionId);
  			 } else {
	  			 //console.log('book isnt in collection, so go add it please...');
 			  	 addBook(currentUser, book, collectionId);	
 			 } //ends if else
		});
	  	$scope.isAdding = true;
  	 	$scope.isAdded = false;
	};
  	 	 
	var removeBook = function(currentUser, book, collectionId){
	 	isBookmarking = true;
	 	//$scope.isBookmarking = isBookmarking;
	 	console.log(currentUser + book +bookid +collectionId);
	 		if (bookid) {
 			  	var userCollections = new Firebase(fsConfig.FIREBASE_URL).child('users').child(currentUser.uid).child('collections');
 			  	userCollections.child(collectionId).child('books').child(bookid).remove();
			   	inCollection = false;
				$scope.inCollection=inCollection;
				isBookmarking = false;
			}
		$scope.isBookmarking = isBookmarking;
 		};

	var addBook = function(currentUser, book, collectionId){
	 	isBookmarking = true;
	 	//$scope.isBookmarking = isBookmarking;
		//alert('(eabout to add a book:)'+ bookid)
 		var addTimestamp = new Date().valueOf();
 			if (bookid) {
  			  	var userCollections = new Firebase(fsConfig.FIREBASE_URL).child('users').child(currentUser.uid).child('collections');
 		  		userCollections.child(collectionId).child('books').child(bookid).update({
					    bookid: bookid,
						description: obj.description,
					    coverUrl: obj.coverurl,
					    title: obj.title,
					    timestamp: addTimestamp,
						addedToCollectionDate: addTimestamp,
						addedToCollectionBy: currentUser.uid
 					  });
 				userCollections.child(collectionId).update({
					timestamp: addTimestamp,
	 				updatedAt: addTimestamp,
	 				updatedBy: currentUser.uid,
	 				isPublic: false
 				});  
 				inCollection = true;
				$scope.inCollection=inCollection;
				isBookmarking = false;
 				}
			$scope.isBookmarking = isBookmarking;
			};

	var getRelated = function(geoid){
		var locationSrc = 'http://api.geonames.org/neighboursJSON?&lang=en&style=medium&maxRows=15&type=json&username=thirdman&geonameId='+geoid;
		DataSource.get(locationSrc,function(data) {
			angular.forEach(data.geonames, function(item) {
				neighbourCountries.push(item);
				$scope.neighbourCountries = neighbourCountries;
			});
		getRelatedBooks();		 	
		});
	};
 		
	var getRelatedBooks = function(){
	 		booksArray.$loaded().then(function() {
 		 		if(neighbourCountries.length){
 		 					angular.forEach(neighbourCountries, function(country){
 				  			var neighbourCountryBooks = filterFilter(booksArray, country.countryId );
				  			if (neighbourCountryBooks.length){
					  			country.countryBooks = neighbourCountryBooks;
					  			neighbourRelatedBooks.push(country);
				  			}
				  		$scope.neighbourRelatedBooks = neighbourRelatedBooks;		
				 	});
		 		} else{
			 	//	console.log('to early, has no length');
		 		}
 	 		});
 		};

 	/////////////////////////////////////////////////////
 	/////this section does the dialogs for collections /////
 	/////////////////////////////////////////////////////
 	
	var refCollections = new Firebase(fsConfig.FIREBASE_URL+"/collections/");
	
 		refCollections.once('value', function(snapshot) {
	    	var hasCollection = (snapshot.val() !== null);
 	    	$scope.refCollections = snapshot.val();
	    	if(hasCollection){
	    	console.log($scope.refCollections);
			}
		});
			
		$scope.showCreateCollection = function(){
			$scope.newColl = {};
			collectionAdded = false;
			$scope.collectionAdded=collectionAdded;
			collectionProcessing = false;
			$scope.collectionProcessing = false;
			collectionShowCreate = true;
			$scope.collectionShowCreate = true;
		};
		
		$scope.showCollections = function(){
 			collectionShowCreate = false;
			$scope.collectionShowCreate = false;
		};
		
		$scope.createNewCollection = function(newCollectionData){
 			var addTimestamp = new Date().valueOf();
			collectionProcessing = true;
			$scope.collectionProcessing = true;
			if (newCollectionData.title) {
				if(!newCollectionData.description){
	 				newCollectionData.description = "";
				}
				if(!newCollectionData.imgUrl){
	 				newCollectionData.imgUrl = "";
				}
				if(!newCollectionData.isPublic){
					newCollectionData.isPublic = false;
				}
				var ref = fsConfig.FIREBASE_URL;
			  	var globalCollections = new Firebase(ref).child('collections');
			  	var userCollectionSet = new Firebase(ref).child('users').child(currentUser.uid).child('collections');
			  	
			  	var newCollRef = globalCollections.push({
				  	title: newCollectionData.title,
				  	createdBy:currentUser.uid,
				  	createdByName:profile.displayName,
				  	description: newCollectionData.description,
				  	imgUrl:newCollectionData.imgUrl,
				  	timestamp:addTimestamp,
				  	isPublic: newCollectionData.isPublic
			  	});
			  	// Get the unique ID generated by push()
			  	var newCollectionID = newCollRef.key();
			  	userCollectionSet.child(newCollectionID).set({
				  	collectionId: newCollectionID,
				  	title: newCollectionData.title,
				  	createdBy:currentUser.uid,
				  	createdByName:profile.displayName,
				  	description: newCollectionData.description,
				  	imgUrl:newCollectionData.imgUrl,
				  	timestamp:addTimestamp,
				  	isPublic: newCollectionData.isPublic
			  	});

 			   	 collectionAdded = true;
				 $scope.collectionAdded=collectionAdded;
				 collectionProcessing = false;
				 $scope.collectionProcessing = false;
				 collectionShowCreate = false;
				 $scope.collectionShowCreate = false;
			} else {
				collectionProcessing = false;
				$scope.collectionProcessing = false;
			} //end if/else for newCollectionData
		};
		
		$scope.toggleBookInCollection = function(collectionId, collectionsArrayIndex, theAction){
			console.log('This is the toggle');
			console.log('collectionId: ' + collectionId);			
			console.log('collectionsArrayIndex: ' + collectionsArrayIndex);	
			console.log('theAction '+theAction);
// 				if($scope.collectionsArray[collectionsArrayIndex].hasThisBook){
				if(theAction === 'remove'){
 					removeABook(collectionId, collectionsArrayIndex);	
				}else if(theAction === 'add'){
					addABook(collectionId, collectionsArrayIndex);		
				}
			};

		addABook = function(collectionId){
			//alert('about to try to add a book');
 			var addTimestamp = new Date().valueOf();
 			console.log(profile);
 			bookProcessing = true;
			$scope.bookProcessing = true;
			console.log(obj);
			if(collectionId){
				var ref = fsConfig.FIREBASE_URL;
			  	var globalCollectionSet = new Firebase(ref).child('collections').child(collectionId);
			  	var userCollSet = new Firebase(ref).child('users').child(currentUser.uid).child('collections').child(collectionId);

			  	globalCollectionSet.child('books').child(bookid).update({
				  	bookid: obj.$id,
				  	title: obj.title,
				  	description: obj.description,
				  	coverUrl: obj.coverurl,
				  	addedToCollectionByName:profile.displayName,
				  	addedToCollectionById:currentUser.uid,
				  	addedToCollectionDate: addTimestamp,
			  	});
			  	
			 // 	var newCollBookRef1 = newCollBookRef.key();
			  	userCollSet.child('books').child(bookid).update({
				  	bookid: obj.$id,
				  	title: obj.title,
				  	description: obj.description,
				  	coverUrl: obj.coverurl,
				  	addedToCollectionByName:profile.displayName,
				  	addedToCollectionById:currentUser.uid,
				  	addedToCollectionDate: addTimestamp
			  	});
// 			   	 bookAdded = true;
//				 $scope.bookAdded=bookAdded;
				 bookProcessing = false;
				$scope.bookProcessing = false;


				//var collectionsArray = $scope.collectionsArray;
				
			} else {
			}

			};
		removeABook = function(collectionId, collectionsArrayIndex){
				//alert('about to try to remove a book');
				console.log('removing book to collection');
				//var collectionsArray = $scope.collectionsArray;
	 			bookProcessing = true;
				$scope.bookProcessing = true;
				if(collectionId){
					var ref = fsConfig.FIREBASE_URL;
				  	var globalCollectionSet = new Firebase(ref).child('collections').child(collectionId);
				  	var userCollSet = new Firebase(ref).child('users').child(currentUser.uid).child('collections').child(collectionId);
						
						
						var onComplete = function(error) {
						  if (error) {
						    console.log('Removing failed failed');
						  } else {
						    console.log('Removing succeeded');
						  }
						};
						globalCollectionSet.child('books').child(bookid).remove(onComplete);
						userCollSet.child('books').child(bookid).remove(onComplete);
	 
	 			   	 bookRemoved = true;
	 			   	 $scope.collectionsArray[collectionsArrayIndex].hasThisBook = 0;
	 			   	 console.log($scope.collectionsArray[collectionsArrayIndex]);
	 			   	 $scope.bookRemoved=bookRemoved;
					 bookProcessing = false;
					$scope.bookProcessing = false;
	//				console.log(collectionsArray);
	 
				} else {
	 			}
			
			};
		
	$scope.addBookToCollection = function(collectionId){
			console.log('adding book to collection');
 			console.log(collectionId);
 			console.log(bookid);
 			var addTimestamp = new Date().valueOf();
 			console.log(profile);
 			bookProcessing = true;
			$scope.bookProcessing = true;

			console.log(obj);
			if(collectionId){
				var ref = fsConfig.FIREBASE_URL;
			  	var globalCollectionSet = new Firebase(ref).child('collections').child(collectionId);
			  	var userCollSet = new Firebase(ref).child('users').child(currentUser.uid).child('collections').child(collectionId);

			  	globalCollectionSet.child('books').child(bookid).update({
				  	bookid: obj.$id,
				  	title: obj.title,
				  	description: obj.description,
				  	coverUrl: obj.coverurl,
				  	addedToCollectionByName:profile.displayName,
				  	addedToCollectionById:currentUser.uid,
				  	addedToCollectionDate: addTimestamp
			  	});
			 // 	var newCollBookRef1 = newCollBookRef.key();
			  	userCollSet.child('books').child(bookid).update({
				  	bookid: obj.$id,
				  	title: obj.title,
				  	description: obj.description,
				  	coverUrl: obj.coverurl,
				  	addedToCollectionByName:profile.displayName,
				  	addedToCollectionById:currentUser.uid,
				  	addedToCollectionDate: addTimestamp
			  	});
// 			   	 bookAdded = true;
//				 $scope.bookAdded=bookAdded;
				 bookProcessing = false;
				$scope.bookProcessing = false;
				console.log(collectionsArray);
				//collectionShowCreate = false;
				//$scope.collectionShowCreate = false;

			} else {
			}
 		};

	$scope.removeBookFromCollection = function(collectionId){
			console.log('removing book to collection');
			var collectionsArray = $scope.collectionsArray;
 			bookProcessing = true;
			$scope.bookProcessing = true;
			if(collectionId){
				var ref = fsConfig.FIREBASE_URL;
			  	var globalCollectionSet = new Firebase(ref).child('collections').child(collectionId);
			  	var userCollSet = new Firebase(ref).child('users').child(currentUser.uid).child('collections').child(collectionId);
					
					
					var onComplete = function(error) {
					  if (error) {
					    console.log('Removing failed failed');
					  } else {
					    console.log('Removing succeeded');
					  }
					};
					globalCollectionSet.child('books').child(bookid).remove(onComplete);
					userCollSet.child('books').child(bookid).remove(onComplete);
 
 			   	 bookRemoved = true;
				 $scope.bookRemoved=bookRemoved;
				 bookProcessing = false;
				$scope.bookProcessing = false;
				console.log(collectionsArray);
				//collectionShowCreate = false;
				//$scope.collectionShowCreate = false;

			} else {
 			}
 		};
	
	$scope.clickToOpen = function () {
 	 	collectionAdded = false;
 	 	var hasthisbook;
		$scope.collectionAdded=collectionAdded;
		collectionProcessing = false;
		$scope.collectionProcessing = false;
		var collectionsArray = [];
		//var uCollectionList =  new Firebase(fsConfig.FIREBASE_URL+"/users/").child(currentUser.uid).child('collections');
		var collArr = $firebaseArray( new Firebase(fsConfig.FIREBASE_URL+"/users/").child(currentUser.uid).child('collections'));
		collArr.$loaded().then(function() {
			$scope.collArr = collArr;
			angular.forEach(collArr, function(aCollection) {
				tempBooksArray = [];
				//var thisbookid = obj.bookid;
				if(aCollection.books){
					hasthisbook = filterFilter(aCollection.books, {'bookid': bookid}).length;
					angular.forEach(aCollection.books,function(thisBook) {
 						tempBooksArray.push(thisBook);
					});
				} else{
					hasthisbook = false;
				}
					aCollection.bookCount = tempBooksArray.length;
					aCollection.hasThisBook = hasthisbook;
					collectionsArray.push(aCollection);
			});
			$scope.collectionsArray = collectionsArray;
		});

         ngDialog.open({ 
			//template: '<h4>Book Collections</h4><p>This feature is coming soong.</p><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog\(\)">Close</button></div>',
			plain: false,
        	//	controller: 'DialogCollectionsAdd'
        	template: 'views/dialogs/dialogCollections.html',
        	scope: $scope
			});
    }; 






 	////////////////////////////////////////////////////
 	/////this section does the reporting dialogs/////
 	////////////////////////////////////////////////////

 	$scope.submitReport = function(thereport){
	 	var messageType, theTimestamp, isError;
	 	$scope.isError = false;		 
	 	$scope.errorMessage = '';		 
	 	$scope.reportProcessing = true;		 
		var reportProcessing = true;
		var reportDone = false;

	 	console.log(thereport);
		console.log($scope.thereport);	
		 
	 if(!thereport.content){
	 	$scope.reportProcessing = false;		 
	 	return;
	 } else{
		 if(profile){
	 		 messageType = 'Edit';
		 	 theTimestamp = new Date().valueOf();
		 	 var ref = new Firebase(fsConfig.FIREBASE_URL);
		 	 var messages = ref.child("system/adminmessages");
	  		 messages.push({
				    title: 'Suggestion/Error report for '+obj.title,
				    authorName: profile.displayName,
				    authorId: profile.$id,
				    messageType: messageType,
				    messageLink: 'http://fictionset.in/#/book/'+bookid,
				    timestamp: theTimestamp,
				    messageContent: thereport.content
				    
				  },function(error){
					  if(error){
						console.log(error);
						isError = true;
						$scope.errorMessage.title = 'Error';
						$scope.errorMessage.message = error;
						reportProcessing = false;
						reportDone = false;
						$scope.reportDone = false;
						$scope.reportProcessing = false;		 
						return;
					  } else {
						reportProcessing = false;
						reportDone = true;
						$scope.reportProcessing = false;		 
						$scope.reportDone = true;		   
						$scope.$apply();
 					 }
			 });//ends messagepush
		 } else {
			 isError = true;
			$scope.isError = isError;
			$scope.errorMessage.title = 'No User Defined';
			$scope.errorMessage.message = 'User name and email must be defined (on your account page) before submitting content';
			$scope.reportDone = false;
			$scope.reportProcessing = false;		 
		 }
	 }//ends if report.content

	 
 	};

 	$scope.dialogReport = function () {
		//var reportProcessing = false;
		//var reportDone = false;
		$scope.reportProcessing = false;
		$scope.reportDone = false;
		$scope.isError = false;
    ngDialog.open({ 
			plain: false,
    	template: 'views/dialogs/dialogReport.html',
      scope: $scope
			});
    };

}]);
  
