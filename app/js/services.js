(function() {
   'use strict';

  /* Services */
  angular.module('myApp.services', ["firebase", 'ngRoute'])
  // put your services here!
	
//FsAdmin is unused. What did it do? Do I need to rewrite it? TODO: remove code	
/*
	.factory('FsAdmin', ['$rootScope', '$location', function($rootScope, $location) {
	    return {
	        bookView: function(userId, pageId) {
	        }
	      };
	  }])
*/
	  
  .service('FsGet', ["fsConfig", '$http',  "$firebaseObject", function(fsConfig, $http,  $firebaseObject) {
	//GET AN OBJECT PROFILE FROM AN ID
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	return {
		getBook: function (theBookId) {
			var refBook = ref.child('Books').child(theBookId);		
			//refBook.once('value', function(snapshot) {
			//	thisBook = snapshot.val();
			//	});
			return refBook;
		},
		getUser: function (theUserId) {
			var refProfile = ref.child('users').child(theUserId);		
			return refProfile;
		},
		getSuggested: function (theBookId) {
			var refSuggested = ref.child('nominated/Books').child(theBookId);		
			return refSuggested;
		},
		getMessage: function (theMessageId) {
			var refMessage = ref.child('system/usermessages').child(theMessageId);		
			return refMessage;
		},
		getBook1: function(theBookId){
					var refBooks = $firebaseObject(ref.child('Books').child(theBookId)); 
					return refBooks;
		},
		getUser1: function(theUserId){
					var refUser = $firebaseObject(ref.child('users').child(theUserId)); 
					console.log('getUser1 was triggered with the id of ' + theUserId);
					return refUser;
		},		
		getRole: function(theUserId){
					var userRole = $firebaseObject(ref.child('users').child(theUserId).child('role')); 
					console.log('getRole was triggered with the id of ' + theUserId);
					return userRole;														
		}		

	};
  }])

.service('FsStats', ["fsConfig", "$firebaseObject", 
	function(fsConfig, $firebaseObject) {
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	return {
		addBookView: function (theBookId) {
			console.log('addBookView was called');
			console.log(theBookId);
			//var refBook = ref.child('Books').child(theBookId);	
			var refBook = $firebaseObject(ref.child('Books').child(theBookId));	
			refBook.$loaded().then(function() {
				var viewCountRef = refBook.viewCount;
				if(!viewCountRef){
  				viewCountRef = 0;
				}
				refBook.viewCount = viewCountRef +1;
				refBook.$save();
				return refBook;
			});
		}
	};
}])

	/*
	*  FsNotifywithId: This finds users to be notified based on id of object, then pushed to fsNotify.
	*
	*/

  .service('FsNotifyWithId', ['fsConfig', '$http', '$firebase', 'FsNotify', 'FsGet', function(fsConfig, $http, $firebase, FsNotify, FsGet) {
	//GET AN OBJECT PROFILE FROM AN ID
	//	var ref = new Firebase(fsConfig.FIREBASE_URL);
	return {
		bookAdded: function(theUserId, theBookId){
			var theUser, theBook;					
			FsGet.getBook(theBookId).on("value", function(bk){
				theBook = bk.val();
				FsGet.getUser(theUserId).on("value", function(user){
						theUser = user.val();
						theUser.$id = theUserId;
						theBook.$id = theBookId;
						FsNotify.bookAdded(theUser, theBook); // sends it off to the proper notify one.
				});
			});

		},
		bookSuggested: function(theUserId, theBookId){
			var theUser, theBook;					
			FsGet.getSuggested(theBookId).on("value", function(bk){
				theBook = bk.val();
				console.log(bk.val());	
				FsGet.getUser(theUserId).on("value", function(user){
						console.log(user.val());	
						theUser = user.val();
						theUser.$id = theUserId;
						theBook.$id = theBookId;
						FsNotify.bookSuggested(theUser, theBook); // sends it off to the proper notify one.
				});
			});

		},
		systemMessage: function(theUserId, theMessageId){
			var theUser, theMessage;			
			FsGet.getUser(theUserId).on("value", function(user){
				theUser = user.val();
				console.log(theUser);
				FsGet.getMessage(theMessageId).on("value", function(message){
						theMessage = message.val();
						console.log(theMessage);
						console.log(theUser);
						theUser.$id = theUserId;
						theMessage.$id = theMessageId;
						FsNotify.systemMessage(theUser, theMessage); // sends it off to the proper notify one.
				});
			});

		}
	};
  }])
	  
  .service('FsNotify', ['fsConfig', '$http', '$firebase', "$firebaseArray", "$firebaseObject", 'filterFilter', 
  function(fsConfig, $http, $firebase, $firebaseArray, $firebaseObject, filterFilter) {
 	//MESSAGE ELEMENTS
	/*
	META:
	'userId': recipientId,
	messageType: messageType,
	title: theTitle,
	
	ACTIVATOR PERSON:
	activatorName: activatorUserName,
	activatorId: activatorUserId,
	authorName: //who wrote it, for system messages
	authorId: //id of author, for system messages
	
	BOOK STUFF:
	bookId: theBookId,
	bookTitle: theBookTitle,
	coverurl: bookData.coverurl,
	
	LOCATION STUFF
	locationId: thePlace.geonameId,
	locationName: thePlace.name,
	countryId: thePlace.countryId,
	countryName: thePlace.countryName,
	followsId: recipient follows this place
	followsName: recipient follows this place
	
	SYSTEM STUFF
	messageLink: messageLink,  //default link, and when is system messge
	messageContent: theContent  //default content, used if it is a system message
	
	HELPER STUFF
	timestamp: theTimestamp,
	isRead: -- comeslater
	isSeen: -- comeslater
	*/


 		//RESOURCES
 		var refLocations,refCollections,refBooks;
 		var ref = new Firebase(fsConfig.FIREBASE_URL);
		refLocations = $firebaseArray(ref.child('places')); 
		var refUsers = $firebaseArray(ref.child('users')); 
		refBooks = $firebaseArray(ref.child('Books')); 
		refCollections = $firebaseArray(ref.child('collections')); 
		//DESTINATIONS
		var refMessages = ref.child("messages");
		var adminLocation = ref.child('/system/adminmessages');
		
	    return {
		  bookAdded: function (theUser, theBook, getData) {
		  	//var goAhead = false;
			 //SET getData default to false
			 getData = typeof getData !== 'undefined' ? getData : false;

			 /*
			 //IF WE JUST GOT SENT ID's WE NEED TO GET OBJECTS...
			if(getData == true){
				var getUser = FsGet.getUser(theUser);
				var getBook = FsGet.getBook(theBook);
				
					var theUser, theBook;					
					FsGet.getBook(theBook).on("value", function(bk){
						theBook = bk.val();
						console.log(bk.val());	
						FsGet.getUser(theUser).on("value", function(user){
	 						console.log(user.val());	
	 						theUser = user.val();
	 						theUser.$id = theUser;
	 						theBook.$id = theBook;
	 						console.log(theUser, theBook);
						});
					});
				
				getUser(theUser).then(function(user) {
					details.user = user;
					alert(user);
					alert(details);
					});
			
			} else {
				//do nothing
			}
		  
*/
		  
		  // WHEN A BOOK IS ADDED
		  // WE SHOULD: 
		  // -- notify admin.
		  // -- notify all who follow the places in the book	
			var activatorId,messageContent,messageTitle;
			
		  var theTimestamp = new Date().valueOf();
		  var messageType = 'bookAdded';
		  messageTitle = "New Book Added";
		  messageContent = theBook.title + " was added.";
		  activatorId = theUser.$id;
		  
		  
		  	//NOTIFY ADMIN		  
		  	adminLocation.push({
				messageType: messageType,
			  	title:"A Book was added",
				messageContent:  "'"+theBook.title + "' was added by " + theUser.displayName,
				messageLink: "http://fictionset.in/#/book/" + theBook.$id, 
				activatorName: theUser.displayName,
				activatorId: theUser.$id,
				timestamp: theTimestamp	
				});
			//NOTIFY PALCE FOLLOWERS:
			//ONCE WE HAVE USERS..
			refUsers.$loaded().then(function() {
				var sentCountryId = '';
				//LOOP THROUGH EACH PLACE IN THE BOOK
				angular.forEach(theBook.places, function(thePlace){
				var isCountry = false;
				var sentCountryNotification = false;
				console.log('thePlace is:' + thePlace.name );
 					var thisLocationId = thePlace.geonameId;
					var thisCountryId =  parseFloat(thePlace.countryId);
					console.log(parseFloat(thePlace.geonameId));
					console.log(parseFloat(thePlace.countryId));
					if(thisLocationId === thisCountryId){
						isCountry = true;
						console.log('IT IS A COUNTRY');
					}
				
					// LETS SEND A NOTE TO EVERYONE WHO FOLLOWS THAT COUNTRY
					console.log('sentcountryid:' + sentCountryId);
					console.log('placecountry id:' +  parseFloat(thePlace.countryId));
					if(sentCountryId !== parseFloat(thePlace.countryId)){
						var bookUserSetCountry = filterFilter(refUsers, {following:thisCountryId} );
						console.log( bookUserSetCountry);
							if(!bookUserSetCountry.length){
								console.log('NO ONE IS FOLLOWING ' + thePlace.name);
							}
					
					
						// INSERT NOTIFICATION FOR EACH USER COLLOWING THIS COUNTRY
						// TO DO: THIS SHOULD HAVE LOGIC TO TEST IF
						// THE SAME USER IS FOLLOWING MORE 
						// THAN ONE PLACE SO THEY ONLY GET
						// ONE MESSAGE, NOT SEVERAL
						var thisfollowingid;
						angular.forEach(bookUserSetCountry, function(user){
							if(user.following[parseFloat(thePlace.countryId)]){
								thisfollowingid = user.following[parseFloat(thePlace.countryId)].countryId;
							}
							console.log(thisfollowingid);
							if(thisfollowingid === parseFloat(thePlace.countryId)){  //THIS JUST RECONFIRMS YOUARE FOLLOWING THE COUNTRY
								console.log('yep, ets do this');
							console.log('notifying a country');
							var recipientId = user.$id; 
							//DO PLACE
									refMessages.child(recipientId).push({
						  		 	'userId': recipientId,
								    messageType: messageType,
								    title: 'New Book Added',
								    messageContent: theBook.title + " was added, set in " + thePlace.name,
									messageLink: "http://fictionset.in/#/book/" + theBook.$id, 
								    activatorName: theUser.displayName,
								    activatorId: theUser.$id,
		
								    bookId: theBook.$id,
								    bookTitle: theBook.title,
								    coverurl: theBook.coverurl,
		
									locationId: thePlace.geonameId,
									locationName: thePlace.name,
									countryId: parseFloat(thePlace.countryId),
									countryName: thePlace.countryName,
									followsId: parseFloat(thePlace.countryId),
									followsName: thePlace.countryName,
		
								    timestamp: theTimestamp,
								 },function(error){
								  	if(error){
										console.log('error: ');
										console.log(error);
									} else{
										console.log('notified.');
									}
								});
	
							}//ensd check if the country id is the country
						});
						
						sentCountryId = parseFloat(thePlace.countryId); //flag to say we've sent the country so don't send again
						sentCountryNotification = true; //flag to say we've sent the country so don't send again
					}//ensd  country loop
					

					if(!isCountry){
					var bookUserSet = filterFilter(refUsers, {following:thisLocationId});
					//var bookUserSet = filterFilter(refUsers, ({following:thisLocationId},{following:thisCountryId} ));
					console.log( bookUserSet );
						if(!bookUserSet.length){
							console.log('NO ONE IS FOLLOWING ' + thePlace.name);
						}
					
					// NOTIFY SPECIFIC PLACES
					// INSERT NOTIFICATION FOR EACH PLACE
					// TO DO: THIS SHOULD HAVE LOGIC TO TEST IF
					// THE SAME USER IS FOLLOWING MORE 
					// THAN ONE PLACE SO THEY ONLY GET
					// ONE MESSAGE, NOT SEVERAL
					
					angular.forEach(bookUserSet, function(user){
						console.log(user);
						var recipientId = user.$id; 
						//DO PLACE
								refMessages.child(recipientId).push({
					  		 	'userId': recipientId,
							    messageType: messageType,
							    title: 'New Book Added',
							    messageContent: theBook.title + " was added, set in " + thePlace.name,
								messageLink: "http://fictionset.in/#/book/" + theBook.$id, 
							    activatorName: theUser.displayName,
							    activatorId: theUser.$id,
	
							    bookId: theBook.$id,
							    bookTitle: theBook.title,
							    coverurl: theBook.coverurl,
	
								locationId: thePlace.geonameId,
								locationName: thePlace.name,
								countryId: parseFloat(thePlace.countryId),
								countryName: thePlace.countryName,
								followsId: parseFloat(thePlace.geonameId),
								followsName: thePlace.name,

							    timestamp: theTimestamp,
							 },function(error){
							  	if(error){
									console.log('error: ');
									console.log(error);
								} else{
									console.log('notified.');
									// $scope.isSent = true;
									//$location.path('/admin/users').replace();
									//$scope.$apply();
								}
							});



					}); // ends foreach bookuserset 
					} //ends if not a country
					
				});//ends for each PLACE
			});//ends refUsers.loaded


		  return 'Book added: Admin and users notified';
	      },

		  bookSuggested: function (theUser, theBook) {
		  // WHEN A BOOK IS SUGGESTED
		  // WE SHOULD:  
		  // -- notify admin.
		  // -- notify all who follow the places in the book	
		  // -- FUTURE: Notify all who have flagged they want to be notified of suggestions
		  var messageTitle, messageContent;
		  var theTimestamp = new Date().valueOf();
		  var messageType = 'bookSuggested';
		  messageTitle = "New Book Suggested";
		  messageContent = theBook.title + " was suggested.";

		  	//NOTIFY ADMIN		  
		  	adminLocation.push({
				messageType: messageType,
			  	title:"A Book was suggested",
				messageContent:  "'"+theBook.title + "' was suggested by " + theUser.displayName,
				messageLink: "http://fictionset.in/#/requests/", //TODO ONCE WE ADD DETIAL PAGES: http://fictionset.in/#/requests/ + theBook.$id, 
				activatorName: theUser.displayName,
				activatorId: theUser.$id,
				timestamp: theTimestamp	
				});
				
				
			//NOTIFY PLACE FOLLOWERS:
			//ONCE WE HAVE USERS..
			refUsers.$loaded().then(function() {
				var sentCountryId = '';
				//LOOP THROUGH EACH PLACE IN THE BOOK
				angular.forEach(theBook.places, function(thePlace){
				var isCountry = false;
				var sentCountryNotification = false;
				console.log('thePlace is:' + thePlace.name );
 					var thisLocationId = thePlace.geonameId;
					var thisCountryId =  parseFloat(thePlace.countryId);
					console.log(parseFloat(thePlace.geonameId));
					console.log(parseFloat(thePlace.countryId));
					if(thisLocationId === thisCountryId){
						isCountry = true;
						console.log('IT IS A COUNTRY');
					}
				
					// LETS SEND A NOTE TO EVERYONE WHO FOLLOWS THAT COUNTRY
					console.log('sentcountryid:' + sentCountryId);
					console.log('placecountry id:' +  parseFloat(thePlace.countryId));
					if(sentCountryId !== parseFloat(thePlace.countryId)){
						var bookUserSetCountry = filterFilter(refUsers, {following:thisCountryId} );
						console.log( bookUserSetCountry);
							if(!bookUserSetCountry.length){
								console.log('NO ONE IS FOLLOWING ' + thePlace.name);
							}
					
					
						// INSERT NOTIFICATION FOR EACH USER COLLOWING THIS COUNTRY
						// TO DO: THIS SHOULD HAVE LOGIC TO TEST IF
						// THE SAME USER IS FOLLOWING MORE 
						// THAN ONE PLACE SO THEY ONLY GET
						// ONE MESSAGE, NOT SEVERAL
						var thisfollowingid;
						angular.forEach(bookUserSetCountry, function(user){
							if(user.following[parseFloat(thePlace.countryId)]){
								thisfollowingid = user.following[parseFloat(thePlace.countryId)].countryId;
							}
							console.log(thisfollowingid);
							if(thisfollowingid === parseFloat(thePlace.countryId)){  //THIS JUST RECONFIRMS YOUARE FOLLOWING THE COUNTRY
								console.log('yep, ets do this');
							console.log('notifying a country');
							var recipientId = user.$id; 
							//DO PLACE
									refMessages.child(recipientId).push({
						  		 	'userId': recipientId,
								    messageType: messageType,
								    title: 'New Book Suggested',
								    messageContent: theBook.title + " was suggested, set in " + thePlace.name,
									messageLink: "http://fictionset.in/#/requests/", //TODO ONCE WE ADD DETIAL PAGES: http://fictionset.in/#/requests/ + theBook.$id, 
								    activatorName: theUser.displayName,
								    activatorId: theUser.$id,
		
								    bookId: theBook.$id,
								    bookTitle: theBook.title,
								    coverurl: theBook.coverurl,
		
									locationId: thePlace.geonameId,
									locationName: thePlace.name,
									countryId: parseFloat(thePlace.countryId),
									countryName: thePlace.countryName,
									followsId: parseFloat(thePlace.countryId),
									followsName: thePlace.countryName,
		
								    timestamp: theTimestamp,
								 },function(error){
								  	if(error){
										console.log('error: ');
										console.log(error);
									} else{
										console.log('notified.');
									}
								});
	
							}//ensd check if the country id is the country
						});
						
						sentCountryId = parseFloat(thePlace.countryId); //flag to say we've sent the country so don't send again
						sentCountryNotification = true; //flag to say we've sent the country so don't send again
					}//ensd  country loop
					

					if(!isCountry){
					var bookUserSet = filterFilter(refUsers, {following:thisLocationId});
					//var bookUserSet = filterFilter(refUsers, ({following:thisLocationId},{following:thisCountryId} ));
					console.log( bookUserSet );
						if(!bookUserSet.length){
							console.log('NO ONE IS FOLLOWING ' + thePlace.name);
						}
					
					// NOTIFY SPECIFIC PLACES
					// INSERT NOTIFICATION FOR EACH PLACE
					// TO DO: THIS SHOULD HAVE LOGIC TO TEST IF
					// THE SAME USER IS FOLLOWING MORE 
					// THAN ONE PLACE SO THEY ONLY GET
					// ONE MESSAGE, NOT SEVERAL
					
					angular.forEach(bookUserSet, function(user){
						console.log(user);
						var recipientId = user.$id; 
						//DO PLACE
								refMessages.child(recipientId).push({
					  		 	'userId': recipientId,
							    messageType: messageType,
							    title: 'New Book Suggested',
							    messageContent: theBook.title + " was suggested, set in " + thePlace.name,
								messageLink: "http://fictionset.in/#/requests/", //TODO ONCE WE ADD DETIAL PAGES: http://fictionset.in/#/requests/ + theBook.$id, 
							    activatorName: theUser.displayName,
							    activatorId: theUser.$id,
	
							    bookId: theBook.$id,
							    bookTitle: theBook.title,
							    coverurl: theBook.coverurl,
	
								locationId: thePlace.geonameId,
								locationName: thePlace.name,
								countryId: parseFloat(thePlace.countryId),
								countryName: thePlace.countryName,
								followsId: parseFloat(thePlace.geonameId),
								followsName: thePlace.name,

							    timestamp: theTimestamp,
							 },function(error){
							  	if(error){
									console.log('error: ');
									console.log(error);
								} else{
									console.log('notified.');
								}
							});



					}); // ends foreach bookuserset 
					} //ends if not a country
					
				});//ends for each PLACE
			});//ends refUsers.loaded
		  return 'Book added: Admin and users notified';
	      },

		  systemMessage: function (theUser, theMessage) {
		  	// WHEN A SYSTEM MESSAGE IS ADDED
		  	// WE SHOULD: 
		  	// -- Send everyone the message.

			  var theTimestamp = new Date().valueOf();
			  var messageType = 'system';
 			  
			  //LOOP THROUGH ALL USERS
			  refUsers.$loaded().then(function() {
				angular.forEach(refUsers, function(user){
					var recipientId = user.$id; 
			  		refMessages.child(recipientId).push({
			  		 	'userId': recipientId,
					    messageType: messageType,
					    title: theMessage.title,
					    messageContent: theMessage.messageContent,
						messageLink: theMessage.messageLink,
					    activatorName: theMessage.authorName,
					    activatorId: theMessage.authorId,
					    timestamp: theTimestamp,
					 },function(error){
					  	if(error){
							console.log('error: ');
							console.log(error);
						} else{
							console.log('notified.');
						}
					});


			  	
				});//ends for each user
			  });
			  return 'System Message Added';
	      }
	    };

 	    /*
var promise = $http.get('data.json').success(function (data) {
	      myData = data;
	    });
*/
	
/*
	    return {
	      promise:promise,
	      setData: function (data) {
	          myData = data;
	      },
	      doStuff: function () {
	          return myData;//.getSomeData();
	      }
	    };
*/
	}])
  
  
  
  ///this is the old one///

 .factory('Flickr',['$resource', '$q' , function($resource, $q ) {
  var photosPublic = $resource('http://api.flickr.com/services/feeds/photos_public.gne', 
      { format: 'json', jsoncallback: 'JSON_CALLBACK' }, 
      { 'load': { 'method': 'JSONP' } });
   return {
    search: function(query) {
      var q = $q.defer();
      photosPublic.load({
        tags: query
      }, function(resp) {
        q.resolve(resp);
      }, function(err) {
        q.reject(err);
      });
      
      return q.promise;
    }
  };
}])
 
 .factory('FlickrPlace', ['$http', '$q' , function ($http, $q) {
 	 	var getplaceurl = 'https://api.flickr.com/services/rest/?method=flickr.places.find&api_key=f33601a59d5cc2e162113d896f47474e&format=json&nojsoncallback=1&auth_token=&api_sig=&query=';//Auckland+NZ
 
	    return {
	        getPlace: function( loc) {
 	            // the $http API is based on the deferred/promise APIs exposed by the $q service
	            // so it returns a promise for us by default
	            return $http.get(getplaceurl+loc).then(function(response) {
	                    if (typeof response.data === 'object') {
	                        return response.data;
	                    } else {
	                        // invalid response
	                        return $q.reject(response.data);
	                    }

	                }, function(response) {
	                    // something went wrong
	                    return $q.reject(response.data);
	            	});
	        }
	    };
	}])

 .factory('FlickrPlacePics', ['$http', '$q', function ($http, $q) {
 var getpicsurl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f33601a59d5cc2e162113d896f47474e&format=json&nojsoncallback=1&auth_token=&api_sig=&per_page=20&min_taken_date=1262304000&extras=url_m,url_s&sort=interestingness-desc&place_id=';
 //var bbox = '&bbox='+bbox;
 //var tags = '&tags=crete';
 //var is_getty= "&is_getty=true";

	    return {
	        getPics: function(locid, bbox) {
	            // the $http API is based on the deferred/promise APIs exposed by the $q service
	            // so it returns a promise for us by default
	            return $http.get(getpicsurl+locid)
	                .then(function(response) {
	                    if (typeof response.data === 'object') {
	                        return response.data;
	                    } else {
	                        // invalid response
	                        return $q.reject(response.data);
	                    }

	                }, function(response) {
	                    // something went wrong
	                    return $q.reject(response.data);
	            	});
	        }
	    };
	}])
	
 .factory('DataSource', ['$http', function($http){
		return {
    	get: function(file,callback,transform){
      	$http.get(file).
        success(function(data, status) {
					console.log("Request succeeded");
          callback(data);
        }).
				error(function(data, status) {
          console.log("Request failed " + status +" and data: ");
          console.log(data);
        });
			}
		};
	}]
);
  

  
  
  
  
  
function extend(base) {
  var parts = Array.prototype.slice.call(arguments, 1);
		parts.forEach(function (p) {
        if (p && typeof (p) === 'object') {
            for (var k in p) {
                if (p.hasOwnProperty(k)) {
                    base[k] = p[k];
                }
            }
        }
    });
    return base;
}  
})();




  
