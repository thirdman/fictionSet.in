'use strict';
 app.controller("BookCtrl", [ "$scope", "$rootScope", "currentUser", "$firebase", "$routeParams", "$location", "$timeout", "DataSource", "iTunesData", "Profile", "filterFilter", 'ngDialog', "$log", function($scope, $rootScope, currentUser, $firebase, $routeParams, $location, $timeout, DataSource, iTunesData, Profile, filterFilter, ngDialog, $log, lodash ) { 
   	$scope.isLoading = true;
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
   	var placesMarkers = '/';
   	var mapBoxKey = 'pk.eyJ1IjoidGhpcmRtYW4iLCJhIjoidjBOQ0lrYyJ9.8zzETVcyoBg2nlMquUR1TA';
   	var mapUrlStringStart =  'http://api.tiles.mapbox.com/v4/thirdman.j1o1gjim';
   	var mapUrlString = '';
   	var pageTitle, amazonObj, addABook, removeABook, collectionAdded, collectionProcessing, tempBooksArray, bookProcessing, bookRemoved, ngDialog;
   	$scope.mapUrlString = mapUrlString;
   	var bkZoom = 5;
   	var bkLat;
	var bkLng;
	var mapCenterLatTop = '';
	var mapCenterLatBottom = '';
	var mapCenterLngTop = '';
	var mapCenterLngBottom = '';
	
   	var inCollection = false;
   	var neighbourCountries = [];
   	var amazonid = '';
   	var bookid = $routeParams.id;
   	var inCollection;
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
	var ngDialog;

    var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/' + bookid);
	var sync = $firebase(ref);
	$scope.book = sync.$asObject();
	
 	var obj = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/' + bookid)).$asObject();  //.$asObject();
 	var booksArray = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/')).$asArray();


 	 $scope.bookplaces = {};
     var placesRef =  new Firebase('https://sweltering-fire-3219.firebaseio.com/places/');

 	 var locationref2 = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/' + bookid + '/tags/0')).$asArray();  //.$asObject();
 	 
     obj.$loaded().then(function() {
		$scope.hasData = true;
  		$scope.isLoading = false;
  		$rootScope.pageTitle = 'Book: '+ obj.title;
  		console.log('Book Obj is:');
  		console.log(obj);
		if(obj.amazon_id.length){
     		var amazonUrl = 'http://fictionset.in/admin/amazon/amazon_getBook.php?search=' + obj.amazon_id;
	 		getAmazonData(amazonUrl);
     	}
     	
     	placesRef.once('value', function(snapshot) {
		 	  var thePlacesList = snapshot.val();
 		});

 	 	if(obj.places){
 	  	  //var bookPlaces = $firebase( new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/'+bookid +'/places')).$asArray(); 
 	  	 // bookPlaces.$loaded().then(function(){
		 	  var bookPlaces = [];
		 	   bookPlaces = obj.places;
		 	   $scope.bookPlaces = bookPlaces;
		 	  // console.log(obj.places);
		 	   
		 	   var keepGoing = true;
		 	   var theCount = 0;
		 	   var lastCountry = "";
		 	   var countryList = [];


		 	   //new lets generate a list of countries this book is in.
				angular.forEach(bookPlaces,function(place) {
					if (mapCenterLatBottom == ''){
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
					if (mapCenterLngBottom == ''){
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
					if (placesMarkers == '/'){
						placesMarkers = placesMarkers + thisPlaceMarker;						
					} else{
						placesMarkers = placesMarkers + ',' + thisPlaceMarker;						
					}

 					if(lastCountry != place.countryId){
					 	console.log('Locations is not from the same country');
 					 	lastCountry = place.countryId;
					 	countryList.push(place);
					}

				if(keepGoing) {
					//TEMPORARY HACK, MUST FIX: this sets the map to the location of the first tag.
					// Ideally it Should great a map zoomed to all the tags with markers on the map
					 bkLat = place.lat;
					 bkLng = place.lng;
 				 	$scope.bkLng = bkLng;
				 	$scope.bkLat = bkLat;	
				    if(theCount == 1){
				      keepGoing = false;
				    }
				  }
				  theCount = theCount +1;
				}); //ends forEach
					
					/////////////// this is the hack way of making th emarkers on the image. Needs a map version
					
					//console.log(placesMarkers);
					//console.log('bounds of markers are');					
					
					 mapCenterLatTop = parseFloat(mapCenterLatTop);
					 mapCenterLatBottom = parseFloat(mapCenterLatBottom);
					 mapCenterLngTop = parseFloat(mapCenterLngTop);
					 mapCenterLngBottom = parseFloat(mapCenterLngBottom);
 
					//console.log(mapCenterLatTop);
					//console.log(mapCenterLatBottom);
					//console.log(mapCenterLngTop);
					//console.log(mapCenterLngBottom);
					
					//Math.abs(a-b);
 
					var latDistance = Math.abs(mapCenterLatBottom - mapCenterLatTop)  ;
					var lngDistance = Math.abs(mapCenterLngBottom - mapCenterLngTop)  ;
					//var lngDistance = (mapCenterLngTop - mapCenterLngTop);

				//	console.log('lngDistance:' +lngDistance);
				//	console.log('latDistance:' +latDistance);

					var topsTotal = Math.abs(mapCenterLngTop - mapCenterLatTop)/2  ;
					var bottomsTotal = Math.abs(mapCenterLngBottom - mapCenterLatBottom)/2  ;

//					console.log('topsTotal:' +topsTotal);
//					console.log('bottomsTotal:' +bottomsTotal);

					

					if(topsTotal < 10 ){
						bkZoom = 8;
					} else if (topsTotal < 30){
						bkZoom = 5;
					} else if (topsTotal < 60){
						bkZoom = 3;
					} else if (topsTotal < 80){
						bkZoom = 2;
					} else {
						bkZoom = 1;
					}

					console.log(bkZoom);
					if(bottomsTotal < 10 ){
						bkZoom = 8;
					} else if (bottomsTotal < 30){
						bkZoom = 6;
					} else if (bottomsTotal < 60){
						bkZoom = 4;
					} else if (bottomsTotal < 60){
						bkZoom = 3;
					} else if (bottomsTotal < 140){
						bkZoom = 2;
					} else {
						bkZoom = 1;
					}
					//console.log(bkZoom);
										
					console.log('bkZoom:'+ bkZoom);

					bkLat = (( mapCenterLatTop + mapCenterLatBottom)/2); 
					bkLng = (( mapCenterLngTop + mapCenterLngBottom)/2);
					
					
 			   	var mapUrlString1 = mapUrlStringStart+placesMarkers;
				var mapUrlString2 = '/'+bkLng+','+bkLat+','+bkZoom+'/1200x300.png?access_token=' +mapBoxKey;
				var mapUrlString = mapUrlString1+ mapUrlString2;
				$scope.mapUrlString = mapUrlString;
 					
				var relatedBooks = [];
				booksArray.$loaded().then(function() {
					angular.forEach(countryList,function(country) {
						getRelated(country.countryId); //pushes this place to the function that fints neighbouring countries/places
 			  			var countryBooks = filterFilter(booksArray, country.countryId );
			  			console.log(countryBooks );
			  			country.countryBooks = countryBooks;
			  			relatedBooks.push(country);
			  		$scope.relatedBooks = relatedBooks;		
 			 	});
 

				});
 				 
			   //});
		} else {
		$scope.bkLng = "100";
		$scope.bkLat = "0";	 		 	
	}

/*
 	 		 if(obj.tags){
 	 		 var locationtag = obj.tags[0];
 	 		 $scope.locationtag = obj.tags[0];
 	 		 console.log(locationtag);
 
 	 		 var objLoc = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/places/')).$asArray();  //.$asObject();
 	 		 	objLoc.$loaded().then(function() {
 	 		 		

  		 		 	var thelocationtag = $scope.locationtag;		 		 	
  		 		 	var bookloc2 = _.find(objLoc,  { displayName: locationtag});
  		 		 	console.log(bookloc2)
					var bkLat = bookloc2.gps.lat;
					var bkLng = bookloc2.gps.lng;
					$scope.bkLng = bkLng;
			 		  $scope.bkLat = bkLat;	 		 	

	 		 	});
	 		 } else {
		 		 $scope.bkLng = "100";
		 		 $scope.bkLat = "0";	 		 	

	 		 }
*/
 	     
	 		 if(obj.apple_id){
 	 		 	console.log('Yo, apple id already here');
     		 	var sQuery = obj.apple_id;
     		 	getAppleDataID(sQuery);
	 		 } else if (obj.isbn13){
 	 		 	console.log('Yo, isbn13 in the house!');
     		 	//var appleUrl = 'http://itunes.apple.com/lookup?isbn=' + obj.isbn13 + '&callback=getApple';
     		 	var sQuery = obj.isbn13;
     		 	getAppleData(sQuery);
 	 		 }
 	     
 	 checkCollectionStatus(currentUser); //checks if it is in user collection

 	});//ends obj.loaded
 	
 	//gets a list of collections this book is in 
 	//this appears ont he actual page.
 	var arrCollections = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/collections/')).$asArray();
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
     if(currentUser){
		 var collectionList = {};
      	 var profile = Profile(currentUser.uid);
      	 profile.$loaded().then(function() {
 	      	 $scope.profile = profile;
		  	  console.log('profile collections');
		  	  console.log(profile.collections);
		  	  if(profile.collections){
 			  	  collectionList = profile.collections;
//			  	  var tempColl = filterFilter(collectionList, {'collectionId': placeid});
			  	  //if(tempBooks.length){
				  	//  $scope.isFollowing = true;				  	  
			  	  //};
		  	  }
	  	  });
 
  	var uCollections = $firebase(new Firebase("https://sweltering-fire-3219.firebaseio.com/users/").child(currentUser.uid).child('collections'));
 	var userCollectionArray = uCollections.$asArray();
  	   userCollectionArray.$loaded().then(function() {
 	   	 console.log('userCollectionArray length is ' + userCollectionArray.length);
	   	 $scope.userCollectionArray = userCollectionArray;
   	 });
 	
 	
 	
	  
 
  	 /////////////
  	 ///////////// THIS DOES THE BOOKSHELF
 
/*
 	var userHasCollections = new Firebase("https://sweltering-fire-3219.firebaseio.com/users/").child(currentUser.uid).child('collections/bookshelf');
 	var syncUserCollections = $firebase(userHasCollections);
 	var userColl = syncUserCollections.$asArray();
  	   userColl.$loaded().then(function() {
 	   	console.log('userColl length is' + userColl.length);
	   	 $scope.userColl = userColl.length;
  	 });
*/


 
 	var checkCollectionStatus = function(currentUser){
	 		 isBookmarking = true;
	 		 $scope.isBookmarking = isBookmarking;
	    	var refUser = new Firebase("https://sweltering-fire-3219.firebaseio.com/users/").child(currentUser.uid);
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
				 	//alert('(end of checking if has book incollection )'+ $scope.inCollection);
			 	} else {
				 	console.log('not in collection and their collection is');
				 	console.log(userCollection);
			 		inCollection = false;
				  	$scope.inCollection = inCollection;
			 	}
	// 	 		console.log(userCollection);
			}
			// console.log('removing is bookmarking');
			 isBookmarking = false;
	 		 $scope.isBookmarking = isBookmarking;
	 		 //alert('(ends of collectionstatus function )incollection is' + $scope.inCollection);
  		  });
	  }
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
    
    
 
	function checkIfUserExists(userId) {
	  var USERS_LOCATION = 'https://sweltering-fire-3219.firebaseio.com/users';
	  var userAccess = new Firebase(USERS_LOCATION);
	  console.log(userAccess);
	  userAccess.child(userId).once('value', function(snapshot) {
	    var exists = (snapshot.val() !== null);
 	    var val = snapshot.val();
 		  var userRole = val.role;
	      var userAaa = (val.role  > 50);
 	      $scope.userRole = userRole;
	      $scope.userAaa = userAaa;
	  });
	}

	if(currentUser){
	 //triggers the above user to see if they are an admin
	 checkIfUserExists(currentUser.uid);
	 }
 	
/*
   	$scope.pushToColl = function(book, collection) {
 	  		var refUser = new Firebase("https://sweltering-fire-3219.firebaseio.com/users/").child(currentUser.uid).child('collections/bookshelf');
	  		var syncUser = $firebase(refUser);
	  		var addTimestamp = new Date().valueOf();
	  		syncUser.child(bookid).$set({
	  				    bookid: bookid,
					    coverurl: obj.coverurl,
					    title: obj.title,
					    timestamp: addTimestamp
	  		 });
   	};
*/

 	// ADD TO BOOKSHELF - SOMETIME UNIFY THESE WTIH THE DIALOG VERSION
 	$scope.collectionsAdd = function(book, collection, collectionId) {
		//console.log('----> book, collection, collectionId...');
	 	//console.log(book);
	 	//wconsole.log(collectionId);
	 	isBookmarking = true;
	 	$scope.isBookmarking = isBookmarking;

	  	var userCollections = new Firebase('https://sweltering-fire-3219.firebaseio.com').child('users').child(currentUser.uid).child('collections');
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
	}
  	 	 
	var removeBook = function(currentUser, book, collectionId){
	 	isBookmarking = true;
	 	//$scope.isBookmarking = isBookmarking;
	 	console.log(currentUser + book +bookid +collectionId);
	 		if (bookid) {
 			  	var userCollections = new Firebase('https://sweltering-fire-3219.firebaseio.com').child('users').child(currentUser.uid).child('collections');
 			  	userCollections.child(collectionId).child('books').child(bookid).remove();
			   	inCollection = false;
				$scope.inCollection=inCollection;
				isBookmarking = false;
			}
		$scope.isBookmarking = isBookmarking;
 		}

	var addBook = function(currentUser, book, collectionId){
	 	isBookmarking = true;
	 	//$scope.isBookmarking = isBookmarking;
		//alert('(eabout to add a book:)'+ bookid)
 		var addTimestamp = new Date().valueOf();
 			if (bookid) {
  			  	var userCollections = new Firebase('https://sweltering-fire-3219.firebaseio.com').child('users').child(currentUser.uid).child('collections');
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
			}

		 
		var getRelated = function(geoid){
  			var locationSrc = 'http://api.geonames.org/neighboursJSON?&lang=en&style=medium&maxRows=15&type=json&username=thirdman&geonameId='+geoid;
	 			var getNeighbours = DataSource.get(locationSrc,function(data) {
 		 				angular.forEach(data.geonames, function(item) {
			 				neighbourCountries.push(item);
 			 				$scope.neighbourCountries = neighbourCountries;
 		 				});
	 					getRelatedBooks();		 	
	 			});
  		};
 		
 		var neighbourRelatedBooks = [];
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

 	///////////////////////////////////////
 	/////this section does the dialogs/////
 	///////////////////////////////////////
 	
	var refCollections = new Firebase("https://sweltering-fire-3219.firebaseio.com/collections/");
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
		}
		$scope.showCollections = function(){
 			collectionShowCreate = false;
			$scope.collectionShowCreate = false;
		}
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
				var ref = 'https://sweltering-fire-3219.firebaseio.com';
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
			  	var newCollectionID = newCollRef.name();
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
		}
		
		$scope.toggleBookInCollection = function(collectionId, collectionsArrayIndex, theAction){
			console.log('This is the toggle');
			console.log('collectionId: ' + collectionId);			
			console.log('collectionsArrayIndex: ' + collectionsArrayIndex);	
			console.log('theAction '+theAction);
// 				if($scope.collectionsArray[collectionsArrayIndex].hasThisBook){
				if(theAction == 'remove'){
 					removeABook(collectionId, collectionsArrayIndex);	
				}else if(theAction == 'add'){
					addABook(collectionId, collectionsArrayIndex);		
				}
			};

		addABook = function(collectionId, collectionsArrayIndex){
			//alert('about to try to add a book');
 			var addTimestamp = new Date().valueOf();
 			console.log(profile);
 			bookProcessing = true;
			$scope.bookProcessing = true;
			console.log(obj);
			if(collectionId){
				var ref = 'https://sweltering-fire-3219.firebaseio.com';
			  	var globalCollectionSet = new Firebase(ref).child('collections').child(collectionId);
			  	var userCollSet = new Firebase(ref).child('users').child(currentUser.uid).child('collections').child(collectionId);

			  	var newCollBookRef = globalCollectionSet.child('books').child(bookid).update({
				  	bookid: obj.$id,
				  	title: obj.title,
				  	description: obj.description,
				  	coverUrl: obj.coverurl,
				  	addedToCollectionByName:profile.displayName,
				  	addedToCollectionById:currentUser.uid,
				  	addedToCollectionDate: addTimestamp,
			  	});
			  	
			 // 	var newCollBookRef1 = newCollBookRef.name();
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
					var ref = 'https://sweltering-fire-3219.firebaseio.com';
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
				var ref = 'https://sweltering-fire-3219.firebaseio.com';
			  	var globalCollectionSet = new Firebase(ref).child('collections').child(collectionId);
			  	var userCollSet = new Firebase(ref).child('users').child(currentUser.uid).child('collections').child(collectionId);

			  	var newCollBookRef = globalCollectionSet.child('books').child(bookid).update({
				  	bookid: obj.$id,
				  	title: obj.title,
				  	description: obj.description,
				  	coverUrl: obj.coverurl,
				  	addedToCollectionByName:profile.displayName,
				  	addedToCollectionById:currentUser.uid,
				  	addedToCollectionDate: addTimestamp
			  	});
			 // 	var newCollBookRef1 = newCollBookRef.name();
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
 		}


		$scope.removeBookFromCollection = function(collectionId){
			console.log('removing book to collection');
			var collectionsArray = $scope.collectionsArray;
 			bookProcessing = true;
			$scope.bookProcessing = true;
			if(collectionId){
				var ref = 'https://sweltering-fire-3219.firebaseio.com';
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
 		}
		
 
 		


	
 	$scope.clickToOpen = function () {
 	 	collectionAdded = false;
		$scope.collectionAdded=collectionAdded;
		collectionProcessing = false;
		$scope.collectionProcessing = false;
		var collectionsArray = [];
		
		var uCollectionList =  new Firebase("https://sweltering-fire-3219.firebaseio.com/users/").child(currentUser.uid).child('collections');
		var collArr = $firebase( new Firebase("https://sweltering-fire-3219.firebaseio.com/users/").child(currentUser.uid).child('collections')).$asArray();
		collArr.$loaded().then(function() {
			//console.log(collArr);
			//console.log(collArr.length);
			$scope.collArr = collArr;
			angular.forEach(collArr, function(aCollection) {
			//	console.log(aCollection);
					tempBooksArray = [];
					var thisbookid = obj.bookid;
				if(aCollection.books){
					var hasthisbook = filterFilter(aCollection.books, {'bookid': bookid}).length;
			//		console.log('the filter result for this collection is');
			//		console.log(filterFilter(aCollection.books, {'bookid': bookid}));
			//		console.log(hasthisbook);
					
					angular.forEach(aCollection.books,function(thisBook) {
 						tempBooksArray.push(thisBook);
					});
				} else{
			//		console.log('no books');
					var hasthisbook = false;
				}
			//		console.log(tempBooksArray);
			//		console.log(tempBooksArray.length);
					aCollection.bookCount = tempBooksArray.length;
					aCollection.hasThisBook = hasthisbook;
					collectionsArray.push(aCollection);
			});
			//console.log(collectionsArray);
			$scope.collectionsArray = collectionsArray;
		});

/*
		uCollectionList.once('value', function(snapshot) {
		    	var hasList = (snapshot.val() !== null);
				console.log('hascollcetioinsfkj and truthy is');
				 var uCollectionListValue = {}
				 uCollectionListValue = snapshot.val();
				 $scope.uCollectionListValue = uCollectionListValue;
				console.log(snapshot.val());
				console.log(uCollectionListValue.length);
				
				});
*/
				
		
        ngDialog.open({ 
			//template: '<h4>Book Collections</h4><p>This feature is coming soong.</p><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog\(\)">Close</button></div>',
			plain: false,
        	//	controller: 'DialogCollectionsAdd'
        	template: 'views/dialogs/dialogCollections.html',
        	scope: $scope
			});
    }; //ends clicktoopen


  }]);
  


