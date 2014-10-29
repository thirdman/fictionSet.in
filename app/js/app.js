var app = angular.module("myApp", 
	["firebase", 'ngRoute', 'myApp.directives', 'angular-underscore','ngLodash', 'angucomplete-alt', 'ngResource', 'angularMapbox', 'ngDialog', 'ngResource', 'ngTagsInput' ]
 		);

app.config(["$routeProvider", '$locationProvider','ngDialogProvider' , function($routeProvider, $locationProvider, ngDialogProvider ) {
 
 
 
 ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: true,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true
    });
    

  $routeProvider.when("/home", {
    controller: "HomeCtrl",
    templateUrl: "views/home.html",
    pageTitle: 'Home',
    pageClass: 'homePage',
    resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
        // simpleLogin refers to our $firebaseSimpleLogin wrapper in the example above
        // since $getCurrentUser returns a promise resolved when auth is initialized,
        // we can simple return that here to ensure the controller waits for auth before
        // loading
        return simpleLogin.$getCurrentUser();
       }]
      
      //,
    //"booklist"  : ["getFirebase", function(getFirebase) {
    //	return getFirebase.all(books);
	//	}]
    
  }
  })
  .when("/login", {
    controller: "LoginCtrl",
    templateUrl: "views/login.html",
    pageTitle: 'Login',
    pageClass: 'loginPage',
    resolve: {
       "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })
  .when("/register", {
    controller: "RegisterCtrl",
    templateUrl: "views/register.html",
    pageTitle: 'Sign Up',
    pageClass: 'loginPage'
    //,
/*
    resolve: {
//      "currentUser": ["simpleLogin", function(simpleLogin) {
  //       return simpleLogin.$getCurrentUser();
      //},
      //]
 
    }
*/
  })

  .when("/about", {
    controller: "AboutCtrl",
    templateUrl: "views/about.html",
    pageTitle: 'About',
	pageClass: 'aboutPage',
   resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })
  .when("/account", {
    controller: "AccountCtrl",
    templateUrl: "views/account.html",
    pageTitle: 'Account',
    pageClass: 'profilePage',
    resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]     
 

    }
  })
   .when("/profile", {
    controller: "ProfileCtrl",
    templateUrl: "views/profile.html",
    pageTitle: 'Your Profile',
    pageClass: 'profilePage',
    resolve: {
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })
   .when("/profile/:displayName", {
    controller: "ProfileCtrl",
    templateUrl: "views/profile.html",
    pageTitle: 'Profile',
    pageClass: 'profilePage',
    resolve: {
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })
   .when("/following", {
    controller: "FollowingCtrl",
    templateUrl: "views/following.html",
    pageTitle: 'Following',
    pageClass: 'profilePage',
    resolve: {
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })

 
  .when("/book/:id", {
    controller: "BookCtrl",
    templateUrl: "views/book.html",
	pageTitle: 'Book Detail',
    pageClass: 'bookPage',

    resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })
    
  .when("/places", {
    controller: "PlacesCtrl",
    templateUrl: "views/places.html",
    pageTitle: 'Places',
    pageClass: 'placesPage',
    resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })

  .when("/place/:placeid", {
    controller: "PlaceCtrl",
    templateUrl: "views/place.html",
    pageTitle: 'Place',
    pageClass: 'placePage',
    resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })
  .when("/collections", {
    controller: "CollectionsCtrl",
    templateUrl: "views/collections.html",
    pageTitle: 'Collections',
    pageClass: 'collectionsPage',
    resolve: {
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })
  .when("/collection/:collectionid", {
    controller: "CollectionCtrl",
    templateUrl: "views/collection.html",
    pageTitle: 'Collection',
    pageClass: 'collectionPage',
    resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })
  .when("/requests", {
    controller: "RequestsCtrl",
    templateUrl: "views/requests.html",
    pageTitle: 'Requests',
    pageClass: 'requestsPage',
    resolve: {
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })
  .when("/near", {
    controller: "NearCtrl",
    templateUrl: "views/near.html",
    pageTitle: 'Near You',
    pageClass: 'nearPage',
    resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })
   .when("/setting/:setting", {
    controller: "SettingCtrl",
    templateUrl: "views/setting.html",
    resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })

  .when("/manageplaces/", {
    controller: "ManagePlacesCtrl",
    templateUrl: "views/admin/manageplaces.html",
    pageTitle: 'Manage Places',
    pageClass: 'adminPage',
    resolve: {
       "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })  

  .when("/manageplace/:placeid/:place?", {
    controller: "EditPlaceCtrl",
    templateUrl: "views/admin/editplace.html",
    pageTitle: 'Admin: Edit Place',
    pageClass: 'adminPage',
    resolve: {
       "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })  

  .when("/editbook/:id", {
    controller: "EditBookCtrl",
    templateUrl: "views/admin/editbook.html",
    pageTitle: 'Admin: Edit Book',
    pageClass: 'adminPage',
    resolve: {
       "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })  
  .when("/addbook/", {
    controller: "AddBookCtrl",
    templateUrl: "views/admin/addbook.html",
    pageTitle: 'Submit a Book',
    pageClass: 'addPage',
    resolve: {
       "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })  
  .when("/addbook/:amazonid", {
    controller: "AddBookDetailCtrl",
    templateUrl: "views/admin/addbookdetail.html",
    pageTitle: 'Submit a Book',
    pageClass: 'addPage',
    resolve: {
       "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })  
  .when("/admin/messages", {
    controller: "AddMessageCtrl",
    templateUrl: "views/admin/managemessages.html",
    pageTitle: 'Admin: add message',
    pageClass: 'adminPage',
    resolve: {
       "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })  
  .when("/admin/users", {
    controller: "ManageUsersCtrl",
    templateUrl: "views/admin/manageusers.html",
	pageTitle: 'Admin: users',
    pageClass: 'adminPage',

    resolve: {
       "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })  



  .otherwise({redirectTo:'/home'});
   //ends routerpovider
   
  // $locationProvider.html5Mode(true);
 //  $locationProvider.hashPrefix('!');

   
  
  
}]); //ends config


app.run(['$location', '$rootScope','$route', function($location, $rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.pageTitle = $route.current.pageTitle;
        //$rootScope.pageClass = $location.pageClass;
        $rootScope.pageClass =  $route.current.pageClass ? $route.current.pageClass : '';
			if (typeof ga === "undefined") {
          //if (!ga){
	          	console.log('ga == undefined');
		  		return;
		  		}else{
		  		ga('send', 'pageview', { 
			  		page: $location.path(),
			  		title:  $route.current.pageTitle
			  		});
		  		//console.log($location.path());
		  		//console.log($route.current.pageTitle);
		  		}
    });
}]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FACTORIES  (move elsewhere at some point
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.factory("simpleLogin1", ["$firebaseSimpleLogin", function($firebaseSimpleLogin) {
  var ref = new Firebase("https://sweltering-fire-3219.firebaseio.com/");
  return $firebaseSimpleLogin(ref);
}]);


app.factory("simpleLogin", ["$firebaseSimpleLogin", "Profile", "$rootScope", function($firebaseSimpleLogin, Profile, $rootScope) {
  var ref = new Firebase("https://sweltering-fire-3219.firebaseio.com/"); //sets the location we're authenticating for
  var isaNewUser = true;
  var userexists = false;
  var currentUserImg;
  var userRole = 0;
  var userAaa = false;
  $rootScope.theerror = '';
 // $scope.iserror = false;

  //  return $firebaseSimpleLogin(ref);
  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
	  if (error) {
	    // an error occurred while attempting login
	    console.log(error);
			  $rootScope.theerror = error;
			  
	        switch(error.code) {
		      case "INVALID_EMAIL":
			  console.log('invalid email');
		      // handle an invalid email
		      case "INVALID_PASSWORD":
			  console.log('invalid password');
		      // handle an invalid password
		      default:
			  console.log('Error');
			//$scope.$apply();
			

		    }
 
		} else if (user) {
		// user authenticated with Firebase
	    console.log("authenticated");
	    console.log("User ID: " + user.uid + ", Provider: " + user.provider);
		console.log(user);

		ref.child('users').child(user.uid).once('value', function(snapshot) {
 			console.log(snapshot.val() !== null);
 			userexists = (snapshot.val() !== null);
  			if (!userexists){
	 			console.log('does not esixt, lets save');
	 			 
	 			 if(user.provider == 'google'){
						console.log('provider is google');
			 			currentUserImg = user.thirdPartyUserData.picture;
			 		}else if(user.provider == 'facebook'){
						console.log('provider is facebook');
						currentUserImg = user.thirdPartyUserData.picture.data.url;
					}
 
					var theTimestamp = new Date().valueOf();					
				ref.child('users').child(user.uid).set({
			        displayName: user.displayName,
			        provider: user.provider,
			        picture_url: currentUserImg,
			        provider_id: user.id,
					createdAt: theTimestamp
			      });
				  //and notify us
				  ref.child('/system/messages').push({
						title:"User Added (simplelogin)",
						messageContent:  user.displayName + ' ('+ provider + ") was added.",
						messageType: "User",
						timestamp: theTimestamp
 					});
 			} else {
				//they're a current user, so ignore.
			}
		});
			
 	  } else {
	  console.log(' not (user), so...');
	  //user is logged out
	  }
	});//
	return $firebaseSimpleLogin(ref);
  }]);

app.factory("getFirebase", ["$scope", "$location", function($scope, $Location) {
   var getResults = new firebase('https://sweltering-fire-3219.firebaseio.com/books').once('value', function(snap) {
    var listOfRecordIds = snap.val();
    console.log(snap.val());
	

	});

	 return $firebase(getResults, tag); 
}]);


app.factory('AuthService', ['$rootScope', '$location', function($rootScope, $location) {
    return {
        createUser: function(email, password, auth) {
            auth.logout();
          auth.createUser(email, password, function(error, user) {
            if (!error) {
              $rootScope.user = user;
            }
          });
        },
        login: function(email, password, auth) {
            auth.logout();
          auth.login('password', {
            email: email,
            password: password,
            rememberMe: false
          });
        },
        logout: function(auth) {
            auth.logout();
        }
      }
  }]);
  
  
  
///this is the old one///
app.factory('Flickr', function($resource, $q ) {
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
      })
      
      return q.promise;
    }
  }
});
 
app.factory('FlickrPlace', function ($http, $q) {
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
	});

app.factory('FlickrPlacePics', function ($http, $q) {
 var getpicsurl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f33601a59d5cc2e162113d896f47474e&format=json&nojsoncallback=1&auth_token=&api_sig=&per_page=20&min_taken_date=1262304000&extras=url_m,url_s&sort=interestingness-desc&place_id='
 var bbox = '&bbox='+bbox;
 var tags = '&tags=crete';
 var is_getty= "&is_getty=true";

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
	});
	
app.factory('DataSource', ['$http',function($http){
       return {
           get: function(file,callback,transform){
                $http.get(
                    file
                    //,{transformResponse:transform}
                ).
                success(function(data, status) {
                    console.log("Request succeeded");
                    callback(data);
                }).
                error(function(data, status) {
                    console.log("Request failed " + status);
                });
           }
       };
    }]
  );

app.factory('iTunesData', function($http) {
   return {
        doSearch: function(sQuery) {
             //return the promise directly.
             return $http.jsonp('http://itunes.apple.com/search', {
                    params: {
                        "callback": "JSON_CALLBACK",
                        "term": sQuery
                    }
                });
        },
        lookupIsbn: function(sQuery) {
             //return the promise directly.
             return $http.jsonp('http://itunes.apple.com/lookup', {
                    params: {
                        "callback": "JSON_CALLBACK",
                        "isbn": sQuery
                    }
                });
        },
        lookupId: function(sQuery) {
             //return the promise directly.
             return $http.jsonp('http://itunes.apple.com/lookup', {
                    params: {
                        "callback": "JSON_CALLBACK",
                        "id": sQuery
                    }
                });
        }
        
        
   }
});

 app.factory("Profile", ["$firebase", function($firebase) {
  return function(username) {
     // create a reference to the user's profile
    var ref = new Firebase("https://sweltering-fire-3219.firebaseio.com/users/").child(username);
    // return it as a synchronized object
    return $firebase(ref).$asObject();

  }
}]);

function checkIfUserExists(userId) {
  var usersRef = new Firebase('https://sweltering-fire-3219.firebaseio.com/users');
  usersRef.child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    console.log('in the check...');
    console.log(userId, exists);
   // userExistsCallback(userId, exists);
    return(exists);
  });
}
  
 app.controller("AuthCtrl", ["$scope", "simpleLogin", function($scope, simpleLogin) {
  $scope.auth = simpleLogin;
}])


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// START OF CONTROLLERS (home)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller("HomeCtrl", ["$scope", "currentUser", "$firebase", "$location", function($scope, currentUser, $firebase, $location) {
  // currentUser (provided by resolve) will contain the 
  // authenticated user or null if not logged in
   $scope.hasData = false;
	 var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/Books');
	 var sync = $firebase(ref);
 	
	   // if ref points to a data collection
	   list = sync.$asArray();
	   $scope.list = list;
	   list.$loaded().then(function() {
 		 $scope.hasData = true;		 
	 });

  }]);

app.controller("AboutCtrl",  ["$scope", "$location", "currentUser", "Profile",'$routeParams', function($scope, $location, currentUser, Profile, $routeParams) {
	    try {
	  	if (currentUser) {
	   	 console.log("logged in");
	   	 } else {
	   	 console.log("no one is logged in");	   	 
	   	 }
	  } 
	  catch(e) {
		  'error';
	  }
	  
	  
	  
}]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BOOKS & PLACES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//BookCtrl: see BookCtrl.js

app.controller("SettingCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", function($scope, currentUser, $firebase, $routeParams, $location, filterFilter) {
    console.log($scope);
    var settingtag = $routeParams.setting;
   	$scope.settingtag = settingtag;
 	 var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/');
	var setting = null;
	 var obj = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/')).$asArray();  //.$asObject();
     // to take an action after the data loads, use $loaded() promise
     obj.$loaded().then(function() {
          console.log( obj );
  		$scope.setting = filterFilter(obj, { tags: settingtag });
 		console.log( $scope.setting );

     });
     
	 $scope.setting = setting;
      
   }]);


app.controller("PlaceCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "DataSource", "FlickrPlacePics", "FlickrPlace", "$timeout", 'ngDialog', 'Profile', function($scope, currentUser, $firebase, $routeParams, $location, filterFilter, DataSource, FlickrPlacePics, FlickrPlace, $timeout, ngDialog, Profile) {
    var placeid = $routeParams.placeid;
    $scope.placeid = placeid;
    $scope.isLoading = true;
   	var placeInfo = null;
   	var othername = null;
  	var photolocation = "";
  	$scope.userAaa = false;
	$scope.othername = null;
	$scope.isFollowing = false;
	$scope.followProcessing = false;	
  	var flickrPhotoSet = null;
  	var flickrPhotoArray = null;
  	$scope.userfollowingList = null;
  	
  	if(currentUser){
		var refProfile = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(currentUser.uid);
	}
	var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/');
	var placeref = new Firebase('https://sweltering-fire-3219.firebaseio.com/places/'+placeid);
	var thePlace = null;
   	var placeImages = $firebase( new Firebase('https://sweltering-fire-3219.firebaseio.com/places/'+placeid +'/images/')).$asArray(); 
  	placeImages.$loaded().then(function(){
		console.log(placeImages);
	 	$scope.placeImages = placeImages;
 	 });
 	var placeobj = $firebase( new Firebase('https://sweltering-fire-3219.firebaseio.com/places/'+placeid)).$asObject();  //.$asObject();
    placeobj.$loaded().then(function() {
			console.log('placeobj.geonameId is...');
			console.log(placeobj.geonameId);
				if(placeobj.geonameId){
		console.log('we have a geonameId');
				} else {
		console.log('we dont have a geonameId');	
				othername = placeobj.$id;
				$scope.othername = placeobj.$id;
				}
		console.log( placeobj);
  		$scope.placeInfo = placeobj;
  		var photolocation = placeobj.$id;
  		if (placeobj.geonameId){
	  		photolocation = placeobj.name + ' ' +placeobj.countryName;
  		};


      if(currentUser){
		 var followingList = [];
      	 var profile = Profile(currentUser.uid);
      	 profile.$loaded().then(function() {
 	      	 $scope.profile = profile;
		  	  console.log($scope.profile);
		  	  console.log(profile.following);
		  	  if(profile.following){
 			  	  followingList = profile.following;
			  	  var tempBooks = filterFilter(followingList, {'placeid': placeid});
			  	  if(tempBooks.length){
				  	  $scope.isFollowing = true;				  	  
			  	  };
		  	  }
	  	  });
	  }
        
	  $scope.stopFollowing = function(){
  			 var removeItemRef =  new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(currentUser.uid).child('/following/');
		  	 $scope.removeItemList = $firebase(removeItemRef);
		  	 removeItemList = $scope.removeItemList;
 		  	 removeItemList.$remove(placeid);
 		  	 $scope.isFollowing = false;
 	  }


  		// FLICKR WITH FACTORY
  		var doFindPlace = function(loc) {
	        // This service's function returns a promise, but we'll deal with that shortly
	        FlickrPlace.getPlace(loc)
	            // then() called when loc gets back
	            .then(function(data) {
	                // promise fulfilled
	                console.log('data is returned');
					console.log(data);
					return data.places.place[0].place_id;
	                if (data.places.place[0].place_id != '') {
	                	//alert('nooot good');
	                	console.log(data.places.place[0].place_id);
	                   // prepareFishingTrip();
	                } else {
	                	//alert('good');
	                	console.log(data.places.place[0].place_id);
 	                }
	            }, function(error) {
	                // promise rejected, could log the error with: console.log('error', error);
 				console.log('promise rejected');
	            })//ends first then
	            .then(function(locid, bbox) {
	            	console.log('OK, now we have an id, lets get some pics');	
	            	console.log(locid);	
 					FlickrPlacePics.getPics(locid).then(function(resp) {
		            	console.log('now we have some photos! (in resp/scope.photos');	
  	 					$scope.photos = resp.photos.photo;
 		            	console.log($scope.photos);	
	 					return(resp);
					});

	            }); //ends second then.
	            
	            
	            
	    };
	    
	    //UNCOMMENT THIS IF YOU WANT THE FLICKR PHOTOS
		//doFindPlace(photolocation);
  

     });// ends if loaded
	 var obj = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/')).$asArray();  //.$asObject();
     // to take an action after the data loads, use $loaded() promise

     obj.$loaded().then(function() {
        console.log( obj );
  		$scope.thePlace = filterFilter(obj, { places: placeid });
 		console.log( $scope.thePlace );
 		$scope.isLoading = false;

     });
     $scope.placeInfo = placeInfo;
	 $scope.thePlace = thePlace;
	 flickrPhotoSet = '123';
	 $scope.flickrPhotoSet = flickrPhotoSet;
 	 $scope.flickrPhotoArray = flickrPhotoArray;
 	 
	
	
	 
 	 
 	 /////this does the dialogs/////
 	$scope.clickToOpen = function () {
        ngDialog.open({ 
        	 //template: '<h4>Following Places</h4><p>Follow this place to....</p><button class="btn" ng-click="followPlace(placeid)">Follow</button>',
			plain: false,
        	template: 'views/dialogs/dialogFollowPlace.html',
			//controller: 'DialogFollowPlaceCtrl',
			scope: $scope
			
        	});
    }; //ends clicktoopen
  
  $scope.followPlace = function(placeid, userid){
		console.log(currentUser);	
		console.log(placeobj);

		if (placeid) {
		$scope.followProcessing = true;	
  		 	refProfile.child('following').child(placeid).update({
			    placeid: placeid,
			    name: placeobj.name,
			    countryId: placeobj.countryId,
			    countryName: placeobj.countryName
			  });
			$scope.isFollowing = true;
			$scope.followProcessing = false;	
			console.log('done');
			} else {
				$scope.isFollowing = false;
				$scope.followProcessing = false;	
			}; //endif

   };
      
/*
      
   dialog.closePromise.then(function (data) {
   	 console.log(data.id + ' has been dismissed.');
   	});
*/
     $scope.closeThisDialog = function(passedValue){
		 console.log('it was closed and the value that was passed was...');
	   	 console.log(passedValue);	     
	   	 
     }
      
      
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
		 checkIfUserExists(currentUser.uid);
	 }
      
   }]);
 
 
app.controller("PlacesCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "$filter", "DataSource", function($scope, currentUser, $firebase, $routeParams, $location,  filterFilter, $filter, DataSource) {
	 $scope.isLoading = true;
 	 var placeList = null;
 	 var refBooks = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/')).$asArray();
 	 var placesref = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/places/')).$asArray(); 
 	 var placesArray = [];
      placesref.$loaded().then(function() {
   	  $scope.placeList = placesref;
   		

       //$scope.filterBy = ['b', 'c', 'd'];
       $scope.filterBy = refBooks;
       refBooks.$loaded().then(function() {
	       $scope.booksList = refBooks;
		   //console.log('1. books are loaded:');
		   //console.log(refBooks);
		   
       placesref.$loaded().then(function() {
		   angular.forEach(placesref, function(place){
				//console.log('2. placesref is loaded');
				//console.log(place);
				//console.log(place.name);
   				var tempBooks = filterFilter(refBooks, {places: place.geonameId});
				//console.log(tempBooks);
				if (tempBooks.length){
						place.bookCount = tempBooks.length
						place.books = tempBooks;
						placesArray.push(place);
				  	} else {
						place.bookCount = 0
						placesArray.push(place);
					};
		   });
		});

	      $scope.filteredPlaces = function () {
		    return $scope.placeList.filter(function (place) {
		    	console.log(place);
		    	console.log(place.geonameId);
		    	console.log(filterFilter($scope.filterBy, {places: place.geonameId}));
		    	var tempBooks = filterFilter($scope.filterBy, {places: place.geonameId});
				
 			   	return tempBooks;
 			   	
		    });
		  };
      
       });
       
	   $scope.isLoading = false;
             
      });
     $scope.placeList = placeList;
  	 $scope.placesArray = placesArray;
     

   }]);


app.controller("NearCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter",   "DataSource", function($scope, currentUser, $firebase, $routeParams, $location,  filterFilter,  DataSource) {
 	$scope.isLoading = true;
 	$scope.isLoadingPlaces = true;
 	$scope.isLoadingBooks = true;
 	var placeList = null;
 	 var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/');
 	 var placesref = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/places/')).$asArray(); 
      placesref.$loaded().then(function() {
   		$scope.placeList = placesref;
      });
     $scope.placeList = placeList;
	 
    //start the location finding (not the plugin one)
    $scope.mgLocation = "Finding location...";
    
   // var userPosition = navigator.geolocation.getCurrentPosition();
    navigator.geolocation.getCurrentPosition(function(position) {
		do_location(position.coords.latitude, position.coords.longitude),
		do_error()
		,{
			timeout:10000
		}
	});
	
	var do_error = function( ){
		console.log('error getting location');	
		 	$scope.isLoading = false;
		 	$scope.isLoadingPlaces = false;
		 	$scope.isLoadingBooks = false;

	};
	
 	
	var do_location = function(lat, lng){
 		if (lat){
			$scope.msgLocation = 'Calculated GPS location is ' + lat +', '+lng;
			var userLat = lat;
			var userLng = lng;
			do_closestBooks(userLat, userLng);
			$scope.userLat = lat;
			$scope.userLat = lng;
			var APISOURCE = 'http://api.geonames.org/findNearby?&lang=en&style=medium&maxRows=5&type=json&username=thirdman&lat='+lat+'&lng='+lng;
 			//GET LODATION DATA 	
 			 var getUserLoc = DataSource.get(APISOURCE,function(data) {
 				 var theLoc = []
				var theLoc = data.geonames;
				var theLocData =data.geonames[0];
 	        	console.log(theLocData);
 	        	$scope.userCountry = theLocData.countryName;
				//$scope.msgLocation = 'Current gps is ' + lat +', '+lng+' and it looks like you are in '+theLocData.countryName ;
				$scope.msgLocation = 'You appear to be in '+theLocData.name+', '+theLocData.countryName +'. The closest 10 places are:';

				
				var placeData = $scope.placeList;
				$scope.distList = $scope.placeList;
				if (placeData.length){
					console.log('got length');
				
					var distListitems = [];
					//var addDistance = funtion(){
						//};
					angular.forEach(placeData,function(item) {
					   var thisDistance =  distance(userLat, userLng, item.lat, item.lng, 'K');
					//   var thisobj = new Object();
					   
					    //thisobj.push({'distanceAway':thisDistance});
					    item.distanceAway = thisDistance;
					  //  console.log(thisobj);
					     distListitems.push(item);
 					});
					//$scope.distListitems= filterFilter(distListitems, 'orderBy', 'distanceAway');
					$scope.distListitems = distListitems;
					console.log($scope.distListitems);

				
				}

   				
   				
   				});//ends getData
  				
 
			 	$scope.isLoading = false;
			 	$scope.isLoadingPlaces = false;
			
    		} else{
			$scope.mgLocation = "Location Data Unavailable";
		}
		
	}
 
 
	  var do_closestBooks = function(userLat, userLng){
	  	var userLat = userLat;
	  	var userLng = userLng;
	  	
	  	$scope.booksMsg = 'Hunting books.';
	 	 var theBooks = null;
		 var obj = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/')).$asArray();  //.$asObject();
	     obj.$loaded().then(function() {
			$scope.booksMsg = 'Books found. Calculating....';
 	 		var theBooks = obj;
	  		$scope.theBooks = obj;
	   		var booksByDistance = [];
	 			angular.forEach(theBooks,function(item) {
 					var placesTempList = []
					var placesExist = (item.places !== null);
					if(placesExist){
						placesTempList = item.places;
						item.closestDistance = 99999999999990;
						item.closestPlaceName = "nada";
						//	   	console.log('current distance is ' +item.closestDistance+ ' and current placename is '+item.closestPlaceName);
 						angular.forEach(placesTempList,function(place) {
							itemClosestDistance = item.closestDistance;
							//   	console.log('current distance is ' +item.closestDistance+ ' and current placename is '+item.closestPlaceName);
 						   	var thisDistance =  distance(userLat, userLng, place.lat, place.lng, 'K');
							//   	console.log('this distance is ' +thisDistance+ ' and this placename is '+place.name);
	 					   	if(thisDistance < item.closestDistance){
							  // 	console.log('this new place is closer');
							   	var closestDistance = thisDistance;
							   	var closestPlaceName = place.name;
							   	item.closestDistance = closestDistance; 						
								item.closestPlaceName = closestPlaceName;
						   	}
						    place.distanceAway = thisDistance;
						});
					
					booksByDistance.push(item);
					}
	 			});
	 					$scope.booksMsg = 'The 10 books with closest locations are:';
	 					$scope.booksByDistance = booksByDistance;
						console.log('books by distance is');
						console.log($scope.booksByDistance);
	     });//ends obj.loaded
		 $scope.theBooks = theBooks;
		  	$scope.isLoading = false;
		  	$scope.isLoadingBooks = false;

	}// ends do_closestBooks
 
   }]);



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COLLECTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller("CollectionCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", 'ngDialog', 'Profile', function($scope, currentUser, $firebase, $routeParams, $location, filterFilter,  ngDialog, Profile) {
	var collectionid, theCollection;
	var collectionid = $routeParams.collectionid;
	$scope.placeid = collectionid;
	//var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/');
	if(currentUser){
		var refProfile = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(currentUser.uid);
		}
	var collectionobj = $firebase( new Firebase('https://sweltering-fire-3219.firebaseio.com/collections/'+collectionid)).$asObject();
	var booksArray = $firebase( new Firebase('https://sweltering-fire-3219.firebaseio.com/collections/'+collectionid +'/books/')).$asArray();
   	booksArray.$loaded().then(function() {    
    	var count = 0;
		booksArray.forEach(function() {
	       count++;
 		 });
		 $scope.bookCount = count;
    });
    collectionobj.$loaded().then(function() {
    	var theCollection = collectionobj;
    	$scope.theCollection = collectionobj;
	});
	
	$scope.updateOtherCollection = function(theCollectionIdtoUpdate){
		if(currentUser){
			var fsCollection = new Firebase('https://sweltering-fire-3219.firebaseio.com/collections/').child(theCollectionIdtoUpdate);
			var userCollection = new Firebase("https://sweltering-fire-3219.firebaseio.com/users").child(currentUser.uid).child('collections').child(theCollectionIdtoUpdate);
			userCollection.once('value', function(snapshot) {
				var userCollectionVal = snapshot.val();
  				  		 	userCollection.update({
							    description: $scope.theCollection.description,
							    title: $scope.theCollection.title,
							    isPublic: $scope.theCollection.isPublic
							  });
			});			

			fsCollection.once('value', function(snapshot) {
				var fsCollectionVal = snapshot.val();
				  		 	fsCollection.update({
							    description: $scope.theCollection.description,
							    title: $scope.theCollection.title,
							    isPublic: $scope.theCollection.isPublic
							  });
			});			
		}	
	}

	$scope.dialogDelete = function () {
		var dialogProcessing = false;
		$scope.dialogProcessing = false;
		$scope.dialogDone = false;
		$scope.isError = false;
	
		
	    ngDialog.open({ 
			plain: true,
			template: '<h4>Delete Collection</h4><p>Are You Sure? This cannot be undone</p><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">Cancel</button><button class="ngdialog-button ngdialog-button-primary" ng-click="doDelete(theCollection.$id);closeThisDialog();">Delete</button></div>',
			//template: 'views/dialogs/dialogReport.html',
	    	scope: $scope
			});
    }; //ends dialogDelete

	$scope.doDelete = function (thecollectionid) {
 	 	var theTimestamp;
		var dialogProcessing = true;
		$scope.dialogProcessing = true;
		$scope.dialogDone = false;
		$scope.isError = false;
		if(thecollectionid){
			console.log(thecollectionid);
			console.log(collectionobj);
 			var objToDelete = new Firebase('https://sweltering-fire-3219.firebaseio.com/collections/'+collectionid);
 			var userCollToDelete = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/'+ currentUser.uid + '/collections/'+collectionid);
			var onComplete = function(error) {
			  if (error) {
			    console.log('Delete failed');
 			  } else {
				  userCollToDelete.remove();
			  	  console.log('Delete succeeded');
				  $location.path('/home').replace();
				  $scope.$apply();
			  }
			};
		objToDelete.remove(onComplete);

		}else{
		 console.log('no collection id');	
		}//ends check for collectionid
    }; //ends doDelete
    
    
    
}]);
				
				

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADDING STUFF
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   app.controller("AddBookCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "DataSource", "$q", "$http", function($scope, currentUser, $firebase, $routeParams, $location, filterFilter, DataSource, $q, $http) {
 		$scope.hasData = false;
 		$scope.isLooking = false;
 		$scope.hasDataNominate = false;
 		$scope.isLookingNominate = false;
 		var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/');
   
 	$scope.searchBooks = function() {
 		$scope.hasData = false;
 		$scope.isLooking = true;
  		//GET LODATION DATA 	
		 var SEARCHURL = 'http://fictionset.in/admin/amazon/amazon_searchbooks.php?search='+$scope.searchString;
			searchData = function(data) {
				$scope.isLooking = false;
				$scope.hasData = true;
				$scope.dataSearch = data;
	        	//console.log(data);
  				};
 			DataSource.get(SEARCHURL,searchData);  //this is the locations
 	}//ends search funciton


 	$scope.searchBooksNominate = function() {
 		$scope.hasDataNominate = false;
 		$scope.isLookingNominate = true;
  		//GET LODATION DATA 	
		 var SEARCHURL = 'http://fictionset.in/admin/amazon/amazon_searchbooks.php?search='+$scope.searchStringNominate;
			searchDataNominate = function(data) {
				$scope.isLookingNominate = false;
				$scope.hasDataNominate = true;
				$scope.dataSearchNominate = data;
	        	//console.log(data);
  				};
 			DataSource.get(SEARCHURL,searchDataNominate);  //this is the locations
 	}//ends search funciton


 	 }]);
	

    app.controller("AddBookDetailCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "DataSource", "$q", "$http", 'ngDialog', "to_linesFilter", function($scope, currentUser, $firebase, $routeParams, $location, filterFilter, DataSource, $q, $http, ngDialog, $to_linesFilter) {
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
		
 		var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/');
 		 // get user
 		  		if(currentUser){
	 		  		var refProfile = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(currentUser.uid); 			
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
 				
// 				$scope.amazonDescPlain =  amazonData.EditorialReviews.EditorialReview[0].Content | to_l;
 				//console.log($scope.amazonDescHtml);
 				};
 			DataSource.get(AMAZONURL,amazonObj);  //this is the locations

 					// NOW DO THE PLACES SEARCH & TEMP LIST
		 			 $scope.autoObject = function(selectedObject) {
		 				newSetting = selectedObject.originalObject;
		 				var bookplaceref = tempPlaces;
		                  
		                  //var placesref = new Firebase('https://sweltering-fire-3219.firebaseio.com/places/');
		                  //bookplaceref.child(newSetting.geonameId).set(newSetting);
		                  //placesref.child(newSetting.geonameId).set(newSetting);

		                tempPlaces.push(newSetting);
		 				$scope.newSetting = newSetting; 
		                };
		                
		                $scope.newSetting = newSetting;


					$scope.removePlace = function(place){
 						$scope.tempPlaces.splice( $scope.tempPlaces.indexOf(place), 1 );
 						tempPlaces = $scope.tempPlaces;
					}

					// NOW DO THE EXCERPTS 				
					 $scope.addExcerpt = function( ) {
 					 	console.log($scope.newExcerpt);
				 		 if ($scope.newExcerpt) {
				  		 	tempExcerpts.push($scope.newExcerpt);
 							console.log(tempExcerpts);
							$scope.newExcerpt = null;
							}
					}
					$scope.removeExcerpt = function(tempExcerpt){
 						//tempExcerpts = $filter('filter')(tempExcerpts, {!tempExcerpt})
						$scope.tempExcerpts.splice( $scope.tempExcerpts.indexOf(tempExcerpt), 1 );
 						tempExcerpts = $scope.tempExcerpts;
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
					var refBook = ref.child('Books');
					var refTags = ref.child('tags');
					var refPlaces = ref.child('places');
					var refExcerpts = ref.child('excerpts1');
						
					var cleanedTempBook = $scope.tempBook;
					console.log(cleanedTempBook);
					var cleanedTempBook = angular.copy(cleanedTempBook);
 					//SAVE BOOK
					//var newPostRef = refBook.push($scope.tempBook);
					var newPostRef = refBook.push(cleanedTempBook);
					var postID = newPostRef.name();
						$scope.tempBook.places = tempPlaces;
						$scope.tempBook.excerpts = tempExcerpts;						
						$scope.tempBook.tags = tempTags;

					//do places
					//var cleanedPlaces = tempPlaces;
					var cleanedPlaces = $scope.tempPlaces;
					var cleanedPlaces = angular.copy(cleanedPlaces);
					angular.forEach( cleanedPlaces, function(aPlace, key) {
						aPlace = angular.copy(aPlace);
						refBook.child(postID).child('places').child(aPlace.geonameId).set(aPlace);
						refPlaces.child(aPlace.geonameId).set(aPlace);
 					     });
					//refBook.child(postID).child('places').set(cleanedPlaces);
					//refPlaces.update(cleanedPlaces);
					var cleanedTags = $scope.tempTags;
					var cleanedTags = angular.copy(cleanedTags);
 					angular.forEach(cleanedTags, function(aTag, key) {
						refBook.child(postID).child('tags').child(aTag.text).set({
							tagId: aTag.text
						});
 						refTags.child(aTag.text).child('books').push(postID);
					});
					var cleanedExcerpts = $scope.tempExcerpts;
					var cleanedExcerpts = angular.copy(cleanedExcerpts)
					refBook.child(postID).child('excerpts').set(cleanedExcerpts);
					//refExcerpts.update(cleanedExcerpts);
					
					//add a notificiation
					var theTimestamp = new Date().valueOf();					
					ref.child('/system/messages').push({
						title:"Book Added",
						messageContent:  $scope.tempBook.title + " was added",
						messageType: "Book",
						timestamp: theTimestamp	
 					});

			   	 	$location.path("#/book/:"+postID); 
			   	 	}//ends edit mode check
				}else{//contintues if else for hasplaces...
					console.log('does not have places')
					console.log(tempPlaces);
					$scope.isSaving = false;
					$scope.errorPlaces = true;		
				}


 				}//ends addbook



 	$scope.clickToOpenGuidelines = function () {
        ngDialog.open({ 
			//template: '<h4>Book Collections</h4><p>This feature is coming soong.</p><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog\(\)">Close</button></div>',
			plain: false,
        	//	controller: 'DialogCollectionsAdd'
        	template: 'views/dialogs/dialogGuidelines.html',
        	scope: $scope
			});
    }; //ends clicktoopen



}]);
 	 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DIALOGS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller("DialogFollowPlaceCtrl",  ["$scope", "$location", "ngDialog", function($scope, $location,  ngDialog) {
	console.log('loaded controller');
	console.log($scope.$parent);
/*
  $scope.dialogModel = {
				message : 'message from passed scope'
			};
*/
}]);


app.controller("DialogCollectionsAdd",  ["$scope", "$location", "ngDialog", "simpleLogin", function($scope, $location,  ngDialog, simpleLogin) {
	var currentUser = simpleLogin.$getCurrentUser();
	$scope.testContent = currentUser.uid;
	console.log('loaded controller');
	console.log($scope.$parent);
	console.log($scope);
	console.log($scope.$id);
	console.log(bookid);
	console.log(currentUser);	
	
/*
  $scope.dialogModel = {
				message : 'message from passed scope'
			};
*/
}]);
 	 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USER ADMIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
app.controller("AccountCtrl", ["$scope", "Profile", "currentUser", "$firebase","$location","filterFilter",
  function($scope, Profile, currentUser, $firebase, $location, filterFilter) {
  	var unreadMessages, userProfile, profileUserImg, currentUserImg, locationObject;
  	$scope.unreadMessages = unreadMessages;
	$scope.aaa = false;
	$scope.isLoadingMessages = true;
	$scope.locationObject = locationObject;
    if(currentUser){
    	userProfile = Profile(currentUser.uid);
 	    userProfile.$loaded().then(function() {
      	 $scope.profile = userProfile;
	  	 var userId = currentUser.uid;
		 profileUserImg = userProfile.picture_url;
		 if(currentUser.provider == 'google'){
					 console.log('provider is google');
			 		currentUserImg = currentUser.thirdPartyUserData.picture;
		 }else if(currentUser.provider == 'facebook'){
					 console.log('provider is facebook');
					 currentUserImg = currentUser.thirdPartyUserData.picture.data.url;
		 }
		 
 		 if( (currentUserImg)  && profileUserImg !== currentUserImg){
			console.log('profile images are different, so change them');
			new Firebase('https://sweltering-fire-3219.firebaseio.com/users').child(currentUser.uid).update({
				picture_url: currentUserImg
 			});
  		 } else {
			 console.log('profile images match, as you were.');
		 }

	$scope.autoObject = function(retselectedObject) {
 				locationObject = retselectedObject;
 				$scope.locationObject = retselectedObject;
 				$scope.profile.location = locationObject.title;
  				console.log($scope.locationObject);

 				}



 /*
 	 var refMessages = new Firebase('https://sweltering-fire-3219.firebaseio.com/system/messages/');
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
 		 var refUsers = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/');
 		 var theTimestamp = new Date().valueOf();					
 		 refUsers.child(currentUser.uid).update({
	 		 messagesViewed: theTimestamp
		 });
   		 	 
  	 });
*/
  	 checkIfUserExists(userId);
	 }); //ends if profile loaded 

        } else {
	        //not a current user... move on
	          $location.path('#/home').replace();
	          $scope.$apply();
        }



		function checkIfUserExists(userId) {
		  var USERS_LOCATION = 'https://sweltering-fire-3219.firebaseio.com/users';
		  var userAccess = new Firebase(USERS_LOCATION);
		  console.log(userAccess);
		  userAccess.child(userId).once('value', function(snapshot) {
		    var exists = (snapshot.val() !== null);
		    //userExistsCallback(userId, exists);
		    var val = snapshot.val();
		    //console.log('gettings access...');
				if(val.role){
					var userRole = val.role;					
				}else{
					var userRole = 0;
				}
				var userAaa = (val.role  > 50);
	 	      $scope.userRole = userRole;
		      $scope.userAaa = userAaa;
		  });
		} 

/*
 
 // THE TEST WAY OF DOING ADMIN
  	 var objAccess = $firebase( new Firebase('https://sweltering-fire-3219.firebaseio.com').child('users').child(currentUser.uid).child('role')).$asObject();     
 	 	 objAccess.$loaded().then(function() {
 	    	if(objAccess.$value > 50){
		    	$scope.aaa =true;
	    	} else{
		    	$scope.aaa = false;
	    	}
		});

*/
  
  }
]);

app.controller("ProfileCtrl", ["$scope", "Profile", "currentUser", "$firebase","$location","filterFilter",
  function($scope, Profile, currentUser, $firebase, $location, filterFilter) {
  	var unreadMessages, allBooks;
  	$scope.unreadMessages = unreadMessages;
 	$scope.aaa = false;
	$scope.isLoadingMessages = true;
	$scope.allBooks = allBooks;
    if(currentUser){
      	 $scope.profile = Profile(currentUser.uid);
	  	 var refBooks = new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/');
		  	 refBooks.once('value', function(snapshot) {
			  	 var exists = (snapshot.val() !== null);
			  	 allBooks = snapshot.val();
			  	 $scope.allBooks = allBooks;
			  });
	        
      	 
	  	 var userId = currentUser.uid;
	  	 var refMessages = new Firebase('https://sweltering-fire-3219.firebaseio.com/system/messages/');
			refMessages.once('value', function(snapshot) {
			var exists = (snapshot.val() !== null);
			unreadMessages = snapshot.val();
	         //console.log(unreadMessages);
	         $scope.unreadMessages = unreadMessages;
	/*    angular.forEach(snapshot.val(), function(value, key) {
	           console.log(key, value);
	            var item = msgs.$getRecord( value.$id );
	 		   console.log(item);
		           //item.isRead = true;
			  // msgs.$save(item);
	
	         });
	         */
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
 		// console.log(unreadMessagesArray);
 		 // To iterate the key/value pairs of the object, use `angular.forEach()`
         angular.forEach(msgs, function(value, key) {
         //  console.log(key, value);
            var item = msgs.$getRecord( value.$id );
			if(!item.isRead){
				//console.log('not readbefore');
				var theTimestamp = new Date().valueOf();					
				item.isRead = true;
				item.readDate = theTimestamp;
				msgs.$save(item);
		   	}else{
				//console.log('readdade is '+ item.readDate);
				//console.log('isread is '+ item.isRead);
				var theDifference = (new Date() - item.readDate);
			//	console.log(theDifference);
				item.readDistance = theDifference;
				msgs.$save(item);
			}
		});
 		//// set the current read timestamp
 		var refUsers = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/');
 		var theTimestamp = new Date().valueOf();					
 		refUsers.child(currentUser.uid).update({
	 		messagesViewed: theTimestamp
		});
  	});
  	checkIfUserExists(userId); //gets useradmin role
    } else { //not a current user... move on...
		$location.path('#/home').replace();
	    $scope.$apply();
    }



		function checkIfUserExists(userId) {
		  var USERS_LOCATION = 'https://sweltering-fire-3219.firebaseio.com/users';
		  var userAccess = new Firebase(USERS_LOCATION);
		  console.log(userAccess);
		  userAccess.child(userId).once('value', function(snapshot) {
		    	var exists = (snapshot.val() !== null);
				//userExistsCallback(userId, exists);
				var val = snapshot.val();
				//console.log('gettings access...');
				if(val.role){
					var userRole = val.role;					
				}else{
					var userRole = 0;
				}
				var userAaa = (val.role  > 50);
				$scope.userRole = userRole;
				$scope.userAaa = userAaa;
		  });
		} 

   
  }
]);

app.controller("FollowingCtrl", ["$scope", "Profile", "currentUser", "$firebase","$location","filterFilter",
  function($scope, Profile, currentUser, $firebase, $location, filterFilter) {
  	var unreadMessages;
  	$scope.unreadMessages = unreadMessages;
 	$scope.aaa = false;
	$scope.isLoadingMessages = true;
    if(currentUser){
      	 $scope.profile = Profile(currentUser.uid);
	  	 var userId = currentUser.uid;
	  	 var refMessages = new Firebase('https://sweltering-fire-3219.firebaseio.com/system/messages/');
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
 		var refUsers = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/');
 		var theTimestamp = new Date().valueOf();					
 		refUsers.child(currentUser.uid).update({
	 		messagesViewed: theTimestamp
		});
  	});

    } else { //not a current user... move on...
		$location.path('#/home').replace();
	    $scope.$apply();
    }


   
  }]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MANAGING STUFF
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller("ManagePlacesCtrl", ["$scope", "currentUser", "$firebase", 
  function($scope,  currentUser, $firebase) {
   var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/places/');
   var placelist = null;
 	 var obj = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/places/')).$asArray();  //.$asObject();
     obj.$loaded().then(function() {
//  		place = filterFilter(obj, ('unique')(tags));
 		//var placelist = obj;
  		$scope.placelist = obj;
  		placelist = obj;
      });
	 $scope.placelist = placelist;
  
 
  }
]);

app.controller("ManageUsersCtrl", ["$scope", "currentUser", "$firebase", "ngDialog", "filterFilter",
  function($scope, currentUser, $firebase, ngDialog, filterFilter) {
   var usersList;
   $scope.usersList;
   var objUsers = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/users/')).$asArray();  //.$asObject();
     objUsers.$loaded().then(function() {
     	console.log(objUsers);
		 // utilizing Angular's helpers
		  angular.forEach(objUsers, function(value, key) {
		  	var thisCollArr = null;
//		  	 console.log(value);
//		     console.log(value.collections); 
		     if(value.collections){
		         	var count = 0;
					angular.forEach(value.collections, function() {
				       count++;
			 		 });
					 //$scope.bookCount = count;
					 console.log('the collection count is:' + count); 
			 }
		  });
		 //place = filterFilter(obj, ('unique')(tags));
 		//var placelist = obj;
 		usersList = objUsers;
  		$scope.usersList = objUsers;
      });
 
 $scope.manageBadges = function (theUserId) {
 	$scope.theUserId = theUserId;
 	//var allBadges;
 	//$scope.allBadges = allBadges; 
 	var allBadges = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/badges/')).$asArray();
 	var userBadges = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(theUserId).child('badges')).$asArray();  //.$asObject();
 	allBadges.$loaded().then(function() {
 		//$scope.userBadges = userBadges;
 		$scope.allBadges = allBadges;
 		console.log(allBadges);
	 });//ends loaded

        ngDialog.open({ 
			plain: false,
        	//	controller: 'DialogCollectionsAdd'
        	template: 'views/dialogs/dialogBadges.html',
        	scope: $scope
			});

 }//ends manage badges

 $scope.addBadge = function(theUserId, badgeId, allBadges){
	 console.log(badgeId);
	 console.log(theUserId);
 	 console.log(allBadges);
 	 //console.log(filterFilter($scope.allBadges, {badgeId: badgeId}));
	// var thisBadge = filterFilter($scope.allBadges, {badgeId: badgeId});

	 if (theUserId) {
 	 var userProfile = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(theUserId);  //.$asObject();
 	 var theBadgeSource = new Firebase('https://sweltering-fire-3219.firebaseio.com/badges/').child(badgeId);  //.$asObject();
 	 theBadgeSource.once('value', function(snapshot) {
    	var exists = (snapshot.val() !== null);
	    var theBadgeInfo = snapshot.val();
		console.log(theBadgeInfo);
	 	userProfile.child('badges').child(badgeId).update(theBadgeInfo);
	    });


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
  			  	var userCollections = new Firebase('https://sweltering-fire-3219.firebaseio.com').child('users').child(childUserId).child('collections');
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


app.controller("EditPlaceCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "DataSource", function($scope, currentUser, $firebase, $routeParams, $location, filterFilter, DataSource) {
  console.log($routeParams);
    var placename = $routeParams.place;
    var placeid = $routeParams.placeid;
   	$scope.placename = placename;
   	$scope.placeid = placeid;
 	 var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/places/').child(placeid);
 	 ref.setPriority(1000);
 	 var sync = $firebase(ref);
 	 var setting = null;

	 var rec = sync.$asObject();
	   rec.$loaded().then(function() {
	   	 $scope.place = rec;
 		 $scope.hasData = true;		 
  	 });
	 $scope.place = rec;

//	 console.log($scope.geoplace);
     console.log($scope.sync);
     console.log($scope.place);


	 var imagesRef = ref.child("images");
	 
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
	 }
	
	
	
/*
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
*/

    }]);
    
    
app.controller("ManagePlaceCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "DataSource", function($scope, currentUser, $firebase, $routeParams, $location, filterFilter, DataSource) {
    var placename = $routeParams.place;
    var placeid = $routeParams.placeid;
   	$scope.placename = placename;
   	$scope.placeid = placeid;
    console.log(placename);
 	 var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/places/').child(placeid);
 	 ref.setPriority(1000);
 	 var sync = $firebase(ref);
 	 var setting = null;
 
 	   // if ref points to a single record
	   var rec = sync.$asObject();
	   rec.$loaded().then(function() {
	   	 $scope.place = rec;
 		 $scope.hasData = true;		 
		 console.log('yep');

 	
		 //GET LODATION DATA 	
		 var APISOURCE = 'http://api.geonames.org/searchJSON?q='+ $scope.place.displayName +'&lang=en&style=short&maxRows=1&type=json&username=thirdman';
			apiData = function(data) {
	        	$scope.dataSet = data;
	        	console.log(data);
  				if (data.geonames.length){
	    			$scope.hasData = true;
 				};    
 				
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
   
  
app.controller("EditBookCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "DataSource", "$q", "$http", "$filter", function($scope, currentUser, $firebase, $routeParams, $location, filterFilter, DataSource, $q, $http, $filter) {
    var bookid = $routeParams.id;
     var newSetting = null;
     $scope.newSetting = null;
     console.log($routeParams.id);


      var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/' + bookid);
  	var sync = $firebase(ref);
 	 	 console.log(sync);
 	$scope.bookobj = sync.$asObject();
 	$scope.book = sync.$asObject();
 	console.log($scope.book);

 				$scope.autoObject = function(selectedObject) {
 				console.log(selectedObject);
 				newSetting = selectedObject.originalObject;
                  //  loadRemoteData();
                  var bookplaceref = new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/' + bookid + '/places/');
                  var placesref = new Firebase('https://sweltering-fire-3219.firebaseio.com/places/');
                  bookplaceref.child(newSetting.geonameId).set(newSetting);
                  placesref.child(newSetting.geonameId).set(newSetting);
 				console.log(newSetting);
                $scope.newSetting = newSetting; 
                };
                
                $scope.newSetting = newSetting;
 
  	  // THIS SECTION ITERATES TAGS
	 	// $scope.bookplaces = {};
 	 	 var bookLocations = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/' + bookid + '/tags/')).$asArray();  //.$asObject();
 	 	 //console.log(locationref2);
 	 	 console.log(bookLocations);
 	 	 $scope.bookLocations = bookLocations;
// 	 	 $scope.placeoptions = {}
//		 var APISOURCE = 'http://api.geonames.org/searchJSON?q='+ $scope.place.displayName +'&lang=en&style=short&maxRows=1&type=json&username=thirdman';

 
	$scope.removePlace = function(place){
		  	 console.log(place);
		  	 var removeItemRef =  new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/').child(bookid).child('/places/');
		  	 $scope.removeItemList = $firebase(removeItemRef);
		  	 var removeItemList = $scope.removeItemList;
		  	 console.log(removeItemRef);
		  	 console.log(removeItemList);

		  	 $scope.removeItemList.$remove(place.geonameId);
 //		  	 $scope.isFollowing = false;
 	}
 	        

 	

 
 	$scope.removePriority = function() {
	 	 	 ref.setPriority(null);
	 	 	// alert('done');
      };

 	$scope.setPriority = function() {
	 	 	 ref.setPriority(1000.0);
	 	 	 //alert('done1000');
      };



	 
	 
 	 }]);
	

app.controller("AddMessageCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "DataSource", "Profile", function($scope, currentUser, $firebase, $routeParams, $location, filterFilter, DataSource, Profile) {
 		$scope.isLoading = false;
 		$scope.messageAuthor = "";
 		var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/');



 		if(currentUser){
 		var refProfile = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(currentUser.uid);
 			
 			refProfile.once('value', function(snapshot) {
			    var exists = (snapshot.val() !== null);
			    var profile = snapshot.val();
				$scope.profile = profile;
		  		console.log(profile.name);					
				var messageAuthor = profile.name;
				$scope.messageAuthor = messageAuthor;
				console.log(profile);
		  		var userId = currentUser.uid;
				});

// 		      		var profile = Profile(currentUser.uid);

	  		//$scope.message.author = profile.name;
	  		
	  	 }
	 var messages = ref.child("system/messages");
	 
	 $scope.updateMessages = function() {
	 	var messageType = 'System';
	 	var theTimestamp = new Date().valueOf();
	 	if ( $scope.message.link) {
		 	var messageLink =  $scope.message.link;
	 	} else {
		 	messageLink = "";
	 	}
 		 if ($scope.message.content) {
  		 	messages.push({
			    title: $scope.message.title,
			    authorName: $scope.messageAuthor,
			    authorId: currentUser.uid,
			    messageType: messageType,
			    messageLink: messageLink,
			    timestamp: theTimestamp,
			    messageContent: $scope.message.content
			  },function(error){
				  $location.path('/account').replace();
	          $scope.$apply();
  
			  });
			}
	 }


 	 }]);




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MISC FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.service('tags', function($q, filterFilter) {
	// EXAMPLE: 
	//  var tags = [
	//    { "text": "Tag1" },
	//    { "text": "Tag2" }
	//  ];
	this.load = function(query, tagArray) {
    	var deferred = $q.defer();
		var newTagArray = filterFilter(tagArray, query);
	  	console.log(newTagArray);
	  	deferred.resolve(newTagArray);
	  	return deferred.promise;
	};
});



/*
 
function getAccessLevel(userid){ 
   	 var objAccess = $firebase( new Firebase('https://sweltering-fire-3219.firebaseio.com').child('users').child(}).child('role')).$asObject();     
 	 	 objAccess.$loaded().then(function() {
 	    	if(objAccess.$value > 50){
		    	$scope.aaa =true;
	    	} else{
		    	$scope.aaa = false;
	    	}
		});
}
*/

 





 // this collects the unique tags
 app.filter('uniqueTags', function() {
    return function(list) {
        var tags = {};
        angular.forEach(list, function(obj, key) {
            angular.forEach(obj.tags, function(value) {
                tags[value] = 1;
            })
        });
        var uniqueTags = [];
		
        for (var key in tags) {
            uniqueTags.push(key);
        }
//    console.log(tags);
//	console.log(uniqueTags);

        return uniqueTags;

    }
});

/*
app.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});
*/

 
 app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
 }]);

 app.filter('to_trusted_lines', ['$sce', function($sce){
        return function(text) {
 			var thetext =  String(text).replace(/<p>/gm, '###startp###');
			 thetext =  thetext.replace(/<\/p>/gm, '###endp###');
			 thetext =  thetext.replace(/<br>/gm, '###br###');
			 thetext =  thetext.replace(/<br\/>/gm, '###br###');			
			 thetext = thetext.replace(/<[^>]+>/gm, '');
 			thetext =  thetext.replace(/###startp###/gm, '<p>');
			 thetext =  thetext.replace(/###endp###/gm, '</p>');
			 thetext =  thetext.replace(/###br###/gm, '<br>');
			 thetext =  thetext.replace(/###startp###/gm, '<p>');
			 thetext =  thetext.replace(/\s{2,}/g, ' '); //removes double spaces

             return $sce.trustAsHtml(thetext);
         };
 }]);


 app.filter('to_lines', ['$sce', function($sce){
        return function(text) {
 			var thetext =  String(text).replace(/<p>/gm, '###startp###');
			 thetext =  thetext.replace(/<\/p>/gm, '###endp###');
			 thetext =  thetext.replace(/<br>/gm, '###br###');
			 thetext =  thetext.replace(/<br\/>/gm, '###br###');			
			 thetext = thetext.replace(/<[^>]+>/gm, '');
			 
  			 thetext =  thetext.replace(/###startp###/gm, '');
			 thetext =  thetext.replace(/###endp###/gm, '\n\r\n');
			 thetext =  thetext.replace(/###br###/gm, '');
			 thetext =  thetext.replace(/\s{2,}/g, ' '); //removes double spaces
              return (thetext);
         };
 }]);


 app.filter('to_plain', function(){
        return function(text) {
        
        	
			return String(text).replace(/<[^>]+>/gm, '');
		
		//	return String(text).replace(/<(SPAN|P|H1|H­2|div|b|p|i){1}.*?>/gm, '');
	//		return String(text).replace(/<(i){1}.*?>/gm, '');
			
///			/<(SPAN|P|H1|H­ 2){1}.*>/i,''
			//<(SPAN|P|H1|H­ 2){1}.*>
			
        };
 });
 

// validHTMLTags  =/^(?:a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|bgsound|big|blink|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|isindex|kbd|keygen|label|legend|li|link|listing|main|map|mark|marquee|menu|menuitem|meta|meter|nav|nobr|noframes|noscript|object|ol|optgroup|option|output|p|param|plaintext|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|spacer|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr|xmp)$/i;

var validHTMLTags  =/^(?:i|p|br)$/i;


 app.filter('to_plain_keep_some', function(){
        return function(text) {

			return String(text).replace(/<[^>]+>/gm, '');
        };
 });
 

  /*
  var // This regex normalises anything between quotes
        normaliseQuotes = /=(["'])(?=[^\1]*[<>])[^\1]*\1/g,
        normaliseFn = function ($0, q, sym) { 
            return $0.replace(/</g, '&lt;').replace(/>/g, '&gt;'); 
        },
        replaceInvalid = function ($0, tag, off, text) {
            var 
                // Is it a valid tag?
				invalidTag = !validHTMLTags.test(tag),
 
                // Is the tag complete?
                isComplete = text.slice(off+1).search(/^[^<]+>/) > -1;
 		
 				console.log(invalidTag || !isComplete ? '&lt;' + tag : $0);

            return invalidTag || !isComplete ? '&lt;' + tag : $0;
        };

    text = text.replace(normaliseQuotes, normaliseFn)
             .replace(/<(\w+)/g, replaceInvalid);
             
			 return String(text);

*/

/*
function sanitize(txt) {
    var // This regex normalises anything between quotes
        normaliseQuotes = /=(["'])(?=[^\1]*[<>])[^\1]*\1/g,
        normaliseFn = function ($0, q, sym) { 
            return $0.replace(/</g, '&lt;').replace(/>/g, '&gt;'); 
        },
        replaceInvalid = function ($0, tag, off, txt) {
            var 
                // Is it a valid tag?
                invalidTag = protos && 
                    document.createElement(tag) instanceof HTMLUnknownElement
                    || !validHTMLTags.test(tag),

                // Is the tag complete?
                isComplete = txt.slice(off+1).search(/^[^<]+>/) > -1;

            return invalidTag || !isComplete ? '&lt;' + tag : $0;
        };

    txt = txt.replace(normaliseQuotes, normaliseFn)
             .replace(/<(\w+)/g, replaceInvalid);
             
			 return String(txt);
        }
*/
 



// this fucntion cutes the length of the title/text
angular.module('ng').filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' ?');
        };
    });



////////////////////////////////////////
/// DISTANCE FUNCTION ///

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}              
                                                             

////////////////////////////////////////
/// GETS INDEX OF ///

function arrayObjectIndexOf(arr, obj){
    for(var i = 0; i < arr.length; i++){
        if(angular.equals(arr[i], obj)){
            return i;
        }
    };
    return -1;
} 

 