var app = angular.module("myApp", [
	'firebase', 
	'ngRoute', 
	'myApp.directives', 
	'myApp.services', 
	'angular-underscore',
	'ngLodash', 
	'angucomplete-alt', 
	'angularMapbox', 
	'ngDialog', 
	'ngResource', 
	'ngTagsInput'
]);

app.constant("fsConfig", {
 	"FIREBASE_URL": "https://sweltering-fire-3219.firebaseio.com/",	//PRODUCTION VERSION
 //	"FIREBASE_URL": "https://fictionset-dev.firebaseio.com/",	//DEV VERSION
	"DEV_STATUS": false
});

app.config(["$routeProvider", '$locationProvider','ngDialogProvider', function($routeProvider, $locationProvider, ngDialogProvider) {
	ngDialogProvider.setDefaults({
      className: 'ngdialog-theme-default',
      plain: true,
      showClose: true,
      closeByDocument: true,
      closeByEscape: true
  });

  $routeProvider.when("/home", { 
    controller: "BooksCtrl", //HomeCtrl
    templateUrl: "views/books.html", //"views/home.html",
    pageTitle: 'Home',
    pageClass: 'homePage booksPage',
		resolve: {
		    // controller will not be loaded until $waitForAuth resolves
		    // Auth refers to our $firebaseAuth wrapper in the example above
		    "currentUser": ["Auth", function(Auth) {
		      // $waitForAuth returns a promise so the resolve waits for it to complete
		      return Auth.$waitForAuth();
		    }]
		  }
/*
   resolve: {
      // forces the page to wait for this promise to resolve before controller is loaded
      // the controller can then inject `user` as a dependency. This could also be done
      // in the controller, but this makes things cleaner (controller doesn't need to worry
      // about auth status or timing of accessing data or displaying elements)
      user: ['Auth', function (Auth) {
        return Auth.$waitForAuth();
      }]
    }
*/
/*
    resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
        // simpleLogin refers to our $firebaseSimpleLogin wrapper in the example above
        // since $getCurrentUser returns a promise resolved when auth is initialized,
        // we can simple return that here to ensure the controller waits for auth before
        // loading
        return simpleLogin.$getCurrentUser();
       }]
  	}
*/
  })
  .when("/login", {
    controller: "LoginCtrl",
    templateUrl: "views/login.html",
    pageTitle: 'Login',
    pageClass: 'loginPage'
    //temporariliy hidden
    //,
/*
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
*/
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
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })
  .when("/account", {
    controller: "AccountCtrl",
    templateUrl: "views/account.html",
    pageTitle: 'Account',
    pageClass: 'profilePage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  } 
 })
   .when("/profile", {
    controller: "ProfileCtrl",
    templateUrl: "views/profile.html",
    pageTitle: 'Your Profile',
    pageClass: 'profilePage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })
   .when("/profile/:displayName", {
    controller: "ProfileCtrl",
    templateUrl: "views/profile.html",
    pageTitle: 'Profile',
    pageClass: 'profilePage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })
   .when("/following", {
    controller: "FollowingCtrl",
    templateUrl: "views/following.html",
    pageTitle: 'Following',
    pageClass: 'profilePage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })

 .when("/books", { 
    controller: "BooksCtrl",
    templateUrl: "views/books.html",
    pageTitle: 'Books',
    pageClass: 'homePage booksPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })

  .when("/book/:id", {
    controller: "BookCtrl",
    templateUrl: "views/book.html",
		pageTitle: 'Book Detail',
    pageClass: 'bookPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })
    
  .when("/places", {
    controller: "PlacesCtrl",
    templateUrl: "views/places.html",
    pageTitle: 'Places',
    pageClass: 'placesPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })

  .when("/place/:placeid", {
    controller: "PlaceCtrl",
    templateUrl: "views/place.html",
    pageTitle: 'Place',
    pageClass: 'placePage',
    		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })
  .when("/collections", {
    controller: "CollectionsCtrl",
    templateUrl: "views/collections.html",
    pageTitle: 'Collections',
    pageClass: 'collectionsPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })
  .when("/collection/:collectionid", {
    controller: "CollectionCtrl",
    templateUrl: "views/collection.html",
    pageTitle: 'Collection',
    pageClass: 'collectionPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })
  .when("/requests", {
    controller: "RequestsCtrl",
    templateUrl: "views/requests.html",
    pageTitle: 'Suggestions',
    pageClass: 'requestsPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })
  .when("/near", {
    controller: "NearCtrl",
    templateUrl: "views/near.html",
    pageTitle: 'Near You',
    pageClass: 'nearPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })
  .when("/tags", {
    controller: "TagsCtrl",
    templateUrl: "views/tags.html",
    pageTitle: 'Tags',
    pageClass: 'tagsPage',
  })
  .when("/tag/:tagId", {
    controller: "ViewTagCtrl",
    templateUrl: "views/tag.html",
    pageTitle: 'Tag',
    pageClass: 'tagPage',
  })
    
  
  /////////////////////////////////////////////////////////////////
  ///////////// ADMINISTRATION 
  /////////////////////////////////////////////////////////////////
  
   .when("/setting/:setting", {
    controller: "SettingCtrl",
    templateUrl: "views/setting.html",
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })

  .when("/manageplaces/", {
    controller: "ManagePlacesCtrl",
    templateUrl: "views/admin/manageplaces.html",
    pageTitle: 'Manage Places',
    pageClass: 'adminPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  

  .when("/manageplace/:placeid/:place?", {
    controller: "EditPlaceCtrl",
    templateUrl: "views/admin/editplace.html",
    pageTitle: 'Admin: Edit Place',
    pageClass: 'adminPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  

  .when("/editbook/:id", {
    controller: "EditBookCtrl",
    templateUrl: "views/admin/editbook.html",
    pageTitle: 'Admin: Edit Book',
    pageClass: 'adminPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  
  .when("/addbook/", {
    controller: "AddBookSearchCtrl",
    templateUrl: "views/admin/addbook.html",
    pageTitle: 'Submit a Book',
    pageClass: 'addPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  
  .when("/addbook/:amazonid", {
    controller: "AddBookDetailCtrl",
    templateUrl: "views/admin/addbookdetail.html",
    pageTitle: 'Submit a Book',
    pageClass: 'addPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  
  
  .when("/response/:type/:id?/:badgetype?", { ///:Sdsd/:"+postID+"/travelguide/"); 
    controller: "AddBookResponseCtrl",
    templateUrl: "views/admin/response.html",
    pageTitle: 'Success! Thank You',
    pageClass: 'booksPage responsePage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  
  .when("/nominate/", {
    controller: "NominateBookCtrl",
    templateUrl: "views/admin/nominatebook.html",
    pageTitle: 'Nominate a Book',
    pageClass: 'addPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  
  .when("/nominate/:amazonid", {
    controller: "NominateBookDetailCtrl",
    templateUrl: "views/admin/nominatebookdetail.html",
    pageTitle: 'Nominate a Book',
    pageClass: 'addPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  
  .when("/admin/messages", {
    controller: "AddMessageCtrl",
    templateUrl: "views/admin/managemessages.html",
    pageTitle: 'Admin: add message',
    pageClass: 'adminPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  
  .when("/admin/message/:userid", {
    controller: "UserMessageCtrl",
    templateUrl: "views/admin/managemessageuser.html",
    pageTitle: 'Admin: add message',
    pageClass: 'adminPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  
  .when("/admin/users", {
    controller: "ManageUsersCtrl",
    templateUrl: "views/admin/manageusers.html",
		pageTitle: 'Admin: users',
    pageClass: 'adminPage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  



  .otherwise({redirectTo:'/home'});
   //ends routerpovider
   
  // $locationProvider.html5Mode(true);
 //  $locationProvider.hashPrefix('!');

   
  
  
}]); //ends config


app.run(['fsConfig', '$location', '$rootScope', 'Auth', '$route', function(fsConfig, $location, $rootScope, Auth, $route) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
  	$rootScope.pageTitle = $route.current.pageTitle;
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
		$rootScope.dev_status =  fsConfig.DEV_STATUS;
		$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
		  // We can catch the error thrown when the $requireAuth promise is rejected
		  // and redirect the user back to the home page
		  if (error === "AUTH_REQUIRED") {
		    $location.path("/home");
		  }
		});
		Auth.$onAuth(function(authData){
			console.log('auth status changed');
			console.log(authData);
			$rootScope.showUser = authData;
		});

  });
}]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USERS AND LOGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.factory("Auth", ['fsConfig', "$firebaseAuth",
  function(fsConfig, $firebaseAuth) {
    var ref = new Firebase(fsConfig.FIREBASE_URL);
    return $firebaseAuth(ref);
  }
]);

	  
	  

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FACTORIES  TODO: move elsewhere at some point, and refactor out unusefule ones
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.factory("simpleLogin", ["fsConfig", "Auth", "$firebaseAuth", "Profile", "$rootScope", function(fsConfig, Auth, $firebaseAuth, Profile, $rootScope) {
  var ref = new Firebase(fsConfig.FIREBASE_URL); //sets the location we're authenticating for
  var isaNewUser = true;
  var userexists = false;
  var currentUserImg;
  var userRole = 0;
  var userAaa = false;
  $rootScope.theerror = '';
	authObj = $firebaseAuth(ref);

	var authData =  authObj.$getAuth();
	if (authData) {
	  console.log("Logged in as:", authData.uid);
	} else {
	  console.log("Logged out");
	}




  //  return $firebaseSimpleLogin(ref);
//  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
	  var auth = Auth.$getAuth(function(error, user, authData) {
     console.log( authData);

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
				  ref.child('/system/adminmessages').push({
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
	//return $firebaseSimpleLogin(ref);
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

app.factory("Profile", ["fsConfig", "$firebaseObject", function(fsConfig, $firebaseObject) {
  return function(username) {
    var ref = new Firebase(fsConfig.FIREBASE_URL+"/users/").child(username);
    return $firebaseObject(ref);
  }
}]);


 app.controller("AuthCtrl", ["$scope", "Auth", "simpleLogin", function($scope, Auth, simpleLogin) {
 // $scope.auth = simpleLogin;
  $scope.authData = Auth;
}])


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// START OF CONTROLLERS (home)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller("HomeCtrl", ["fsConfig", "$scope", "currentUser", "$firebase", "$location", function(fsConfig, $scope, currentUser, $firebase, $location) {
   $scope.hasData = false;
	 var ref = new Firebase(fsConfig.FIREBASE_URL + '/Books');
	 var sync = $firebase(ref);
	   list = sync.$asArray();
	   $scope.list = list;
	   list.$loaded().then(function() {
		 $scope.hasData = true;		 
	 });
}]);

app.controller("AboutCtrl",  ["fsConfig","$scope", "$location", "currentUser",  
function(fsConfig, $scope, $location, currentUser ) {
	// TODO: tidy up this. OLD way of testing user logged in. Left here for reference.
	try {
		if (currentUser) {
				console.log("logged in");
			} else {
				console.log("no one is logged in");	   	 
			}
	  } 
	  catch(e) {
		  console.log('error');
	  }
	  
}]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BOOKS & PLACES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller("BooksCtrl", ["fsConfig", "$scope", "currentUser", "$firebaseArray",  
function(fsConfig, $scope, currentUser, $firebaseArray) {
	"use strict";
	$scope.hasData = false;
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	var list = $firebaseArray(ref.child('Books'));
	$scope.currentUser = currentUser;
	$scope.list = list;
	list.$loaded().then(function() {
		$scope.hasData = true;		 
	});
}]);

//BookCtrl: see BookCtrl.js

app.controller("SettingCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$routeParams", "$location", "filterFilter", function(fsConfig, $scope, currentUser, $firebaseArray, $routeParams, $location, filterFilter) {
   console.log($scope);
   var settingtag = $routeParams.setting;
   $scope.settingtag = settingtag;
   var setting = null;
	 var obj = $firebase(new $firebaseArray(fsConfig.FIREBASE_URL+'/Books/')); 
    obj.$loaded().then(function() {
          console.log( obj );
		$scope.setting = filterFilter(obj, { tags: settingtag });
		console.log( $scope.setting );
     });
	 $scope.setting = setting;
   }]);


app.controller("PlacesCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$routeParams", "$location", "filterFilter", "$filter", "DataSource", function(fsConfig, $scope, currentUser, $firebaseArray, $routeParams, $location,  filterFilter, $filter, DataSource) {
	$scope.isLoading = true;
	var placeList = null;
	var refBooks = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/Books/'));
	var placesref = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/places/')); 
	var placesArray = [];
	placesref.$loaded().then(function() {
		$scope.placeList = placesref;
		$scope.filterBy = refBooks;
		refBooks.$loaded().then(function() {
			$scope.booksList = refBooks;
			placesref.$loaded().then(function() {
		   	angular.forEach(placesref, function(place){
					var tempBooks = filterFilter(refBooks, {places: place.geonameId});
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
   
   
app.controller("PlaceCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$firebaseObject", "$routeParams", "$location", "filterFilter", "DataSource", "FlickrPlacePics", "FlickrPlace", "$timeout", 'ngDialog', 'Profile', function(fsConfig, $scope, currentUser, $firebaseArray, $firebaseObject, $routeParams, $location, filterFilter, DataSource, FlickrPlacePics, FlickrPlace, $timeout, ngDialog, Profile) {
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
		var refProfile = new Firebase(fsConfig.FIREBASE_URL+'/users/').child(currentUser.uid);
	}
	var ref = new Firebase(fsConfig.FIREBASE_URL+'/Books/');
	var placeref = new Firebase(fsConfig.FIREBASE_URL+'/places/'+placeid);
	var thePlace = null;
   	var placeImages = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/places/'+placeid +'/images/')); 
  	placeImages.$loaded().then(function(){
		console.log(placeImages);
	 	$scope.placeImages = placeImages;
 	 });
 	var placeobj = $firebaseObject( new Firebase(fsConfig.FIREBASE_URL+'/places/'+placeid)); 
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
  		
  		// DO VIEW COUNT SAVE
		var viewCountRef = placeobj.viewCount;
		if(!viewCountRef){
	  		viewCountRef = 0;
		}
		placeobj.viewCount = viewCountRef +1;
		placeobj.$save();


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
  			 var removeItemRef =  new Firebase(fsConfig.FIREBASE_URL+'/users/').child(currentUser.uid).child('/following/');
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
	 var obj = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/Books/')); 
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
		  var USERS_LOCATION = fsConfig.FIREBASE_URL+'/users';
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


app.controller("NearCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$firebaseObject", "$routeParams", "$location", "filterFilter",   "DataSource", function(fsConfig, $scope, currentUser, $firebaseArray, $firebaseObject, $routeParams, $location,  filterFilter,  DataSource) {
 	$scope.isLoading = true;
 	$scope.isLoadingPlaces = true;
 	$scope.isLoadingBooks = true;
 	var placeList = null;
 	var ref = new Firebase(fsConfig.FIREBASE_URL+'/Books/');
 	var placesref = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/places/')); 
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
		var obj = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+ '/Books/'));
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
// COLLECTIONS & ADDITIONAL PAGES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller("CollectionCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$firebaseObject", "$routeParams", "$location", "filterFilter", 'ngDialog', 'Profile', function(fsConfig, $scope, currentUser, $firebaseArray, $firebaseObject, $routeParams, $location, filterFilter,  ngDialog, Profile) {
	var collectionid, theCollection;
	var collectionid = $routeParams.collectionid;
	$scope.placeid = collectionid;
	if(currentUser){
		var refProfile = new Firebase(fsConfig.FIREBASE_URL+'/users/').child(currentUser.uid);
	}
	var collectionobj = $firebaseObject( new Firebase(fsConfig.FIREBASE_URL+'/collections/'+collectionid));
	var booksArray = $firebaseObject( new Firebase(fsConfig.FIREBASE_URL+'/collections/'+collectionid +'/books/'));
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

		// DO VIEW COUNT SAVE
		var viewCountRef = collectionobj.viewCount;
		if(!viewCountRef){
	  		viewCountRef = 0;
		}
		collectionobj.viewCount = viewCountRef +1;
		collectionobj.$save();

	});
	
	$scope.updateOtherCollection = function(theCollectionIdtoUpdate){
		if(currentUser){
			var fsCollection = new Firebase(fsConfig.FIREBASE_URL+'/collections/').child(theCollectionIdtoUpdate);
			var userCollection = new Firebase(fsConfig.FIREBASE_URL+"/users").child(currentUser.uid).child('collections').child(theCollectionIdtoUpdate);
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
 			var objToDelete = new Firebase(fsConfig.FIREBASE_URL+'/collections/'+collectionid);
 			var userCollToDelete = new Firebase(fsConfig.FIREBASE_URL+'/users/'+ currentUser.uid + '/collections/'+collectionid);
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
	


app.controller("TagsCtrl", ["fsConfig", "$scope", "$firebaseArray", "$routeParams", "$location", "filterFilter", function(fsConfig, $scope, $firebaseArray, $routeParams, $location, filterFilter) {
	var arrTags;
	$scope.isLoading = true;
	$scope.hasData = false;
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	var refTags = $firebaseArray( ref.child('tags'));
   	refTags.$loaded().then(function() {   
	   	console.log(refTags); 
    	$scope.isLoading = false;
		$scope.hasData = true;
		$scope.arrTags = refTags;
	
	/*
	* helper function to count objects
	*
	*/
	$scope.countBooks = function(bookObj) {
        return Object.keys(bookObj).length;
    }	 
  });
}]);



app.controller("ViewTagCtrl", [ "fsConfig", "$scope",  "$firebaseArray", "$firebaseObject", "$routeParams", "$location", "filterFilter",  function(fsConfig, $scope, $firebaseArray, $firebaseObject, $routeParams, $location, filterFilter) {
	var tagId, theTag, theTagBooks;
	var tagBooks = [];
	var tagId = $routeParams.tagId;
	$scope.isLoading = true;
	$scope.hasData = false;
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	var theTag = $firebaseObject(ref.child('tags').child(tagId));
	var theTagBooks = $firebaseArray(ref.child('tags').child(tagId).child('books'));
	var refBooks = $firebaseArray(ref.child('Books'));
  theTag.$loaded().then(function() {
		$scope.theTag = theTag;
		console.log('the tag is:');
		console.log(theTag);		
		console.log(refBooks);
		refBooks.$loaded().then(function() {
			$scope.isLoading = false;
			$scope.hasData = true;
			angular.forEach( theTag.books, function(bookId, key) {
				console.log('the book id is :' );
				console.log(bookId);
				var thebookid = bookId;
				var getBook = filterFilter(refBooks, {$id: thebookid} );
				console.log(getBook);
				tagBooks.push(getBook[0]);		
			});
			$scope.tagBooks = tagBooks;
			console.log('books:');
			console.log(tagBooks);
	  });
	});//ends the tag loaded
}]);




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADDING STUFF
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ctrlAddBookSearch.js

//ctrlAddBookDetail.js

//ctrlAddBookResponse.js

app.controller("NominateBookCtrl", [ "fsConfig", "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "DataSource", "$q", "$http", function(fsConfig, $scope, currentUser, $firebase, $routeParams, $location, filterFilter, DataSource, $q, $http) {
	$scope.hasData = false;
	$scope.isLooking = false;
	$scope.hasDataNominate = false;
	$scope.isLookingNominate = false;
	var currentBooks;
	$scope.limitCurrent = 3;
	
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	var refCurrent = $firebase(ref.child('Books')).$asArray();


	refCurrent.$loaded().then(function() {
      	 $scope.currentBooks = refCurrent;
	});

	$scope.showAllCurrent = function(){
		$scope.limitCurrent = 100;
	};

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
 	 
app.controller("NominateBookDetailCtrl", [ "fsConfig", "$scope", "currentUser", "$firebase", "$routeParams", "$location", "filterFilter", "DataSource", "$q", "$http", 'ngDialog', "to_linesFilter", "FsNotify", "FsNotifyWithId", function(fsConfig, $scope, currentUser, $firebase, $routeParams, $location, filterFilter, DataSource, $q, $http, ngDialog, $to_linesFilter, FsNotify, FsNotifyWithId) {
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


 			}//ends addbook


 
			
			
			

 	$scope.clickToOpenGuidelines = function () {
        ngDialog.open({ 
 			plain: false,
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

app.controller("DialogFollowPlaceCtrl",  ["fsConfig", "$scope", "$location", "ngDialog", function(fsConfig, $scope, $location,  ngDialog) {
	console.log('loaded controller');
	console.log($scope.$parent);
}]);


app.controller("DialogCollectionsAdd",  ["fsConfig", "$scope", "$location", "ngDialog", "simpleLogin", function(fsConfig, $scope, $location,  ngDialog, simpleLogin) {
	var currentUser = simpleLogin.$getCurrentUser();
	$scope.testContent = currentUser.uid;
	console.log('loaded controller');
	console.log($scope.$parent);
	console.log($scope);
	console.log($scope.$id);
	console.log(bookid);
	console.log(currentUser);	
}]);
 	 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USER ADMIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
app.controller("AccountCtrl", ["fsConfig", "$scope", "Auth", "Profile", "currentUser", "$firebase", "$location","filterFilter",
  function(fsConfig, $scope, Auth, Profile, currentUser, $firebase, $location, filterFilter) {
  	var unreadMessages, userProfile, profileUserImg, currentUserImg, locationObject;
  	$scope.unreadMessages = unreadMessages;
		$scope.aaa = false;
		$scope.isLoadingMessages = true;
		$scope.locationObject = locationObject;
		var authData = Auth.$getAuth();
		$scope.auth = Auth;
	  // any time auth status updates, add the user data to scope
	  $scope.auth.$onAuth(function(authData) {
	    $scope.authData = authData;
	    console.log('got authdata');
	  });
  
    var currentUser = authData;
    if(currentUser){
	    
    	userProfile = Profile(currentUser.uid);
 	    userProfile.$loaded().then(function() {
      	$scope.profile = userProfile;
      	console.log(userProfile);
      	
				var userId = currentUser.uid;
				profileUserImg = userProfile.picture_url;
				
				if(currentUser.provider == 'google'){
					console.log('provider is google');
					currentUserImg = currentUser.thirdPartyUserData.picture;
				}else if(currentUser.provider == 'facebook'){
					 console.log('provider is facebook');
					 //currentUserImg = currentUser.thirdPartyUserData.picture.data.url;
					 currentUserImg = currentUser.facebook.profileImageURL;
				}
		 
				if( (currentUserImg)  && profileUserImg !== currentUserImg){
					console.log('profile images are different, so change them');
					new Firebase(fsConfig.FIREBASE_URL+'/users').child(currentUser.uid).update({
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
 	 var refMessages = new Firebase('https:// .... .firebaseio.com/messages/');
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
 		 var refUsers = new Firebase('https://....firebaseio.com/users/');
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
		  var USERS_LOCATION = fsConfig.FIREBASE_URL+'/users';
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

//see ctrlProfile.js

app.controller("FollowingCtrl", ["fsConfig", "$scope", "Profile", "currentUser", "$firebaseArray","$location","filterFilter",
  function(fsConfig, $scope, Profile, currentUser, $firebaseArray, $location, filterFilter) {
  	var unreadMessages;
  	$scope.unreadMessages = unreadMessages;
 	$scope.aaa = false;
	$scope.isLoadingMessages = true;
    if(currentUser){
      	 $scope.profile = Profile(currentUser.uid);
	  	 var userId = currentUser.uid;
	  	 var refMessages = new Firebase(fsConfig.FIREBASE_URL+'/messages/').child(currentUser.uid);
			refMessages.orderByKey().limitToLast(8).on('value', function(snapshot) { 
			var exists = (snapshot.val() !== null);
			unreadMessages = snapshot.val();
				$scope.isLoadingMessages = false;
	        	console.log('unreadmessages:');
	        	console.log(unreadMessages);
				$scope.unreadMessages = unreadMessages;
		    });	




				var msgs = $firebaseArray(refMessages);
				/*
		 msgs.$loaded().then(function() {
		   	 $scope.notifications = msgs;
		   	 console.log(msgs);
	 		 $scope.hasData = true;	
	 		 $scope.isLoadingMessages = false;
	 		 var unreadMessagesArray = filterFilter(msgs, {isRead:!true} );
	 		 $scope.unreadMessagesArray = unreadMessagesArray;
	 		 console.log(unreadMessagesArray);
	         angular.forEach(msgs, function(value, key) {
	         console.log(key, value);
	            var item = msgs.$getRecord( value.$id );
				if(!item.isRead){
					console.log('not readbefore');
					var theTimestamp = new Date().valueOf();					
					item.isRead = true;
					item.isSeen = true;
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
	 		var refUsers = new Firebase(fsConfig.FIREBASE_URL+'/users/');
	 		var theTimestamp = new Date().valueOf();					
	 		refUsers.child(currentUser.uid).update({
		 		messagesViewed: theTimestamp
			});
	  	});
*/

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

// see ctrlAdmin.js	
// see ctrlAdminMessages.js




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MISC FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

app.filter('currentBooksFilter', function(){
   return function(dataArray, searchTerm){
      if(!dataArray ) return;
       if( !searchTerm){
          return dataArray
       }else{
            console.log(searchTerm);
           var term = angular.lowercase(searchTerm);
           console.log(searchTerm);
           return dataArray.filter(function( item){

              return item.title.lowercase().indexOf(term) > -1 || item.author.lowercase().indexOf(term) > -1;    
           });
       } 
  }    
});
*/

	app.filter('currentBooksFilter', function(){
	/* array is first argument, each addiitonal argument is prefixed by a ":" in filter markup*/
	return function(dataArray, searchTerm){
	    if(!dataArray ) return;
	    /* when term is cleared, return full array*/
	    if( !searchTerm){
	    	return dataArray
	    }else{
	    	/* otherwise filter the array */
			var term = searchTerm.toLowerCase();
			return dataArray.filter(function(item){
			return (item.title && (item.title.toString().toLowerCase().indexOf(term) > -1)) || 
				(item.author && (item.author.toString().toLowerCase().indexOf(term) > -1)) || 
				(item.isbn && (item.isbn.indexOf(term) > -1)) || 
				(item.isbn13 && (item.isbn13.indexOf(term) > -1));     //.toString().toLowerCase()
	    });
		}
	}    
});


 

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
   	 var objAccess = $firebase( new Firebase('https://.....firebaseio.com').child('users').child(}).child('role')).$asObject();     
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
////////////////////////////////////////

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit==="K") { dist = dist * 1.609344 }
	if (unit==="N") { dist = dist * 0.8684 }
	return dist;
}              
                                                             

////////////////////////////////////////
/// GETS INDEX OF ///
////////////////////////////////////////

function arrayObjectIndexOf(arr, obj){
    for(var i = 0; i < arr.length; i++){
        if(angular.equals(arr[i], obj)){
            return i;
        }
    }
    return -1;
} 


