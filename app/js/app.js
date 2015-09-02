/*global app: true*/   //FOR JSLINT
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
 	//"FIREBASE_URL": "https://fictionset-dev.firebaseio.com/",	//DEV VERSION
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
   .when("/profile/:authorise", {
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
    .when("/authorise/:provider/:success?/:action?/:session?", { ///:Goodreads/true/newuser/"); 
    controller: "AuthoriseCtrl",
    templateUrl: "views/user/authorise.html",
    pageTitle: 'User Authorisation',
    pageClass: 'profilePage',
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })  
  
/*
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
*/
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
/*
  
   .when("/setting/:setting", {
    controller: "SettingCtrl",
    templateUrl: "views/setting.html",
		resolve: {
		    "currentUser": ["Auth", function(Auth) {
		      return Auth.$waitForAuth();
		    }]
		  }
  })
*/

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
		$rootScope.thePreviousLocation = previous;
  	$rootScope.pageTitle = $route.current.pageTitle;
    $rootScope.pageClass =  $route.current.pageClass ? $route.current.pageClass : '';
    /* jshint ignore:start */
		var ga;
			if (typeof ga === "undefined") {
	        console.log('ga == undefined');
		  		return;
		  		}else{
		  		ga('send', 'pageview', { 
			  		page: $location.path(),
			  		title:  $route.current.pageTitle
			  		});
		  		}
		/* jshint ignore:end */
		$rootScope.dev_status =  fsConfig.DEV_STATUS;
		$rootScope.$on("$routeChangeError", function(next, previous, error) { //event,
		  // We can catch the error thrown when the $requireAuth promise is rejected
		  // and redirect the user back to the home page
		  if (error === "AUTH_REQUIRED") {
		    $location.path("/home");
		  }
		});
		console.log('the route was changed');
		Auth.$onAuth(function(authData){
			console.log('auth status changed');
			console.log(authData);
			$rootScope.showUser = authData;
		});
		Auth.$getAuth(function(authData){
			console.log('auth status found');
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
  //var isaNewUser = true;
  var userexists = false;
  var currentUserImg;
  //var userRole = 0;
  //var userAaa = false;
  $rootScope.theerror = '';
	var authObj = $firebaseAuth(ref);

	var authData =  authObj.$getAuth();
	if (authData) {
	  console.log("Logged in as:", authData.uid);
	} else {
	  console.log("Logged out");
	}




  //  return $firebaseSimpleLogin(ref);
//  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
	  var auth;
	  auth = Auth.$getAuth(function(error, user, authData) {
     console.log( authData);

	  if (error) {
	    // an error occurred while attempting login
	    console.log(error);
			  $rootScope.theerror = error;
			  
	        switch(error.code) {
		      case "INVALID_EMAIL":
			  console.log('invalid email');
		      // handle an invalid email
		      break;
		      case "INVALID_PASSWORD":
			  console.log('invalid password');
		      // handle an invalid password
		      break;
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
	 			 
	 			 if(user.provider === 'google'){
						console.log('provider is google');
			 			currentUserImg = user.thirdPartyUserData.picture;
			 		}else if(user.provider === 'facebook'){
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
						messageContent:  user.displayName + ' ('+ user.provider + ") was added.",
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


app.factory('AuthService', ['$rootScope', function($rootScope) {
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
      };
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
   };
});

app.factory("Profile", ["fsConfig", "$firebaseObject", function(fsConfig, $firebaseObject) {
  return function(username) {
    var ref = new Firebase(fsConfig.FIREBASE_URL+"/users/").child(username);
    return $firebaseObject(ref);
  };
}]);


 app.controller("AuthCtrl", ["$scope", "Auth",  function($scope, Auth) {
 // $scope.auth = simpleLogin;
  $scope.authData = Auth;
}]);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// START OF CONTROLLERS (home)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller("HomeCtrl", ["fsConfig", "$scope", "currentUser", "$firebaseArray", 
function(fsConfig, $scope, currentUser, $firebaseArray) {
   $scope.hasData = false;
	 var ref = new Firebase(fsConfig.FIREBASE_URL + '/Books');
	 var list = $firebaseArray(ref);
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
/*

app.controller("SettingCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$routeParams", "$location", "filterFilter", function(fsConfig, $scope, currentUser, $firebaseArray, $routeParams, $location, filterFilter) {
   console.log($scope);
   console.log('Hi Gareth');
   var settingtag = $routeParams.setting;
   $scope.settingtag = settingtag;
   var setting = null;
	 var obj = $firebaseArray(fsConfig.FIREBASE_URL+'/Books/'); 
    obj.$loaded().then(function() {
          console.log( obj );
		$scope.setting = filterFilter(obj, { tags: settingtag });
		console.log( $scope.setting );
     });
	 $scope.setting = setting;
   }]);
*/


app.controller("PlacesCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$routeParams", "$location", "filterFilter",   
function(fsConfig, $scope, currentUser, $firebaseArray, $routeParams, $location,  filterFilter) {
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
						place.bookCount = tempBooks.length;
						place.books = tempBooks;
						placesArray.push(place);
				  } else {
						place.bookCount = 0;
						placesArray.push(place);
					}
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
	//var ref = new Firebase(fsConfig.FIREBASE_URL+'/Books/');
	//var placeref = new Firebase(fsConfig.FIREBASE_URL+'/places/'+placeid);
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
		}


    if(currentUser){
		 var followingList = [];
      	 var profile = new Profile(currentUser.uid);
      	 profile.$loaded().then(function() {
	      	 $scope.profile = profile;
		  	  console.log($scope.profile);
		  	  console.log(profile.following);
		  	  if(profile.following){
			  	  followingList = profile.following;
			  	  var tempBooks = filterFilter(followingList, {'placeid': placeid});
			  	  if(tempBooks.length){
				  	  $scope.isFollowing = true;				  	  
			  	  }
		  	  }
	  	 });
	  }
        
	  $scope.stopFollowing = function(){
  			 var removeItemRef =  new Firebase(fsConfig.FIREBASE_URL+'/users/').child(currentUser.uid).child('/following/');
		  	 var removeItemList;
		  	 $scope.removeItemList = $firebaseArray(removeItemRef);
		  	 removeItemList = $scope.removeItemList;
 		  	 removeItemList.$remove(placeid);
 		  	 $scope.isFollowing = false;
 	  };


  		// FLICKR WITH FACTORY
  		var doFindPlace;
  		doFindPlace = function(loc) {
	        // This service's function returns a promise, but we'll deal with that shortly
	        FlickrPlace.getPlace(loc)
	            // then() called when loc gets back
	            .then(function(data) {
	                // promise fulfilled
	                console.log('data is returned');
					console.log(data);
					if (data.places.place[0].place_id !== '') {
					  //alert('nooot good');
	          console.log(data.places.place[0].place_id);
	        	return data.places.place[0].place_id;
	          } else {
						//alert('good');
	          console.log(data.places.place[0].place_id);
	          return data.places.place[0].place_id;
 	          }
	         }, function(error) {
	                // promise rejected, could log the error with: console.log('error', error);
									console.log('promise rejected');
									console.log(error);
	            })//ends first then
	            .then(function(locid) {
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
  
  $scope.followPlace = function(placeid){
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
			} 

   };
      
/*
      
   dialog.closePromise.then(function (data) {
   	 console.log(data.id + ' has been dismissed.');
   	});
*/
	$scope.closeThisDialog = function(passedValue){
		console.log('it was closed and the value that was passed was...');
		console.log(passedValue);	     
	};
      
      
	function checkIfUserExists(userId) {
		  var USERS_LOCATION = fsConfig.FIREBASE_URL+'/users';
		  var userAccess = new Firebase(USERS_LOCATION);
		  console.log(userAccess);
		  userAccess.child(userId).once('value', function(snapshot) {
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


app.controller("NearCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$firebaseObject", "$routeParams", "$location", "filterFilter",   "DataSource", "distance",
function(fsConfig, $scope, currentUser, $firebaseArray, $firebaseObject, $routeParams, $location,  filterFilter,  DataSource, distance) {
 	$scope.isLoading = true;
 	$scope.isLoadingPlaces = true;
 	$scope.isLoadingBooks = true;
 	var placeList = null;
 	//var ref = new Firebase(fsConfig.FIREBASE_URL+'/Books/');
 	var placesref = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+'/places/')); 
  placesref.$loaded().then(function() {
  	$scope.placeList = placesref;
  });
  $scope.placeList = placeList;
	
	//start the location finding (not the plugin one)
  $scope.mgLocation = "Finding location...";
    
   // var userPosition = navigator.geolocation.getCurrentPosition();
  var geo_options = {
  	timeout : 10000
	};
	var do_error = function( ){
		console.log('error getting location');	
		 	$scope.isLoading = false;
		 	$scope.isLoadingPlaces = false;
		 	$scope.isLoadingBooks = false;
	};

  navigator.geolocation.getCurrentPosition(function(position) {
		do_location(position.coords.latitude, position.coords.longitude);
		}, 
		do_error(), 
		geo_options 
	);
	
	
 	
	var do_location = function(lat, lng){
 		if (lat){
			$scope.msgLocation = 'Calculated GPS location is ' + lat +', '+lng;
			var userLat = lat;
			var userLng = lng;
			var getUserLoc;
			do_closestBooks(userLat, userLng);
			$scope.userLat = lat;
			$scope.userLat = lng;
			var APISOURCE = 'http://api.geonames.org/findNearby?&lang=en&style=medium&maxRows=5&type=json&username=thirdman&lat='+lat+'&lng='+lng;
			//GET LODATION DATA 	
			getUserLoc = DataSource.get(APISOURCE,function(data) {
				var theLoc = [];
				theLoc = data.geonames;
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
	};
 
 
	  var do_closestBooks = function(userLat, userLng){
	  userLat = userLat;
	  userLng = userLng;
	  	
	  $scope.booksMsg = 'Hunting books.';
		var theBooks = null;
		var obj = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL+ '/Books/'));
	  obj.$loaded().then(function() {
		$scope.booksMsg = 'Books found. Calculating....';
		var theBooks = obj;
	  $scope.theBooks = obj;
	  var booksByDistance = [];
	  var itemClosestDistance;
		angular.forEach(theBooks,function(item) {
			var placesTempList = [];
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
	};// ends do_closestBooks
}]);



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COLLECTIONS & ADDITIONAL PAGES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller("CollectionCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$firebaseObject", "$routeParams", "$location", "filterFilter", 'ngDialog',
function(fsConfig, $scope, currentUser, $firebaseArray, $firebaseObject, $routeParams, $location, filterFilter,  ngDialog) {
	var collectionid;
	collectionid = $routeParams.collectionid;
	$scope.placeid = collectionid;
	if(currentUser){
		//var refProfile = new Firebase(fsConfig.FIREBASE_URL+'/users/').child(currentUser.uid);
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
  	//var theCollection = collectionobj;
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
		var fsCollectionVal;
		var userCollectionVal;
		if(currentUser){
			var fsCollection = new Firebase(fsConfig.FIREBASE_URL+'/collections/').child(theCollectionIdtoUpdate);
			var userCollection = new Firebase(fsConfig.FIREBASE_URL+"/users").child(currentUser.uid).child('collections').child(theCollectionIdtoUpdate);
			userCollection.once('value', function(snapshot) {
				userCollectionVal = snapshot.val();
  				  		 	userCollection.update({
							    description: $scope.theCollection.description,
							    title: $scope.theCollection.title,
							    isPublic: $scope.theCollection.isPublic
							  });
			});			

			fsCollection.once('value', function(snapshot) {
				fsCollectionVal = snapshot.val();
				
				  		 	fsCollection.update({
							    description: $scope.theCollection.description,
							    title: $scope.theCollection.title,
							    isPublic: $scope.theCollection.isPublic
							  });
			});			
		}	
	};

	$scope.dialogDelete = function () {
		//var dialogProcessing = false;
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
 	 	//var theTimestamp;
		//var dialogProcessing = true;
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
	

app.controller("TagsCtrl", ["fsConfig", "$scope", "$firebaseArray",  
function(fsConfig, $scope, $firebaseArray){
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
    };
  });
}]);


app.controller("ViewTagCtrl", [ "fsConfig", "$scope",  "$firebaseArray", "$firebaseObject", "$routeParams", "$location", "filterFilter",  function(fsConfig, $scope, $firebaseArray, $firebaseObject, $routeParams, $location, filterFilter) {
	$scope.isLoading = true;
	$scope.hasData = false;
	var tagId, theTag, theTagBooks, refBooks;
	var tagBooks = [];
	tagId = $routeParams.tagId;
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	theTag = $firebaseObject(ref.child('tags').child(tagId));
	theTagBooks = $firebaseArray(ref.child('tags').child(tagId).child('books'));
	refBooks = $firebaseArray(ref.child('Books'));
  theTag.$loaded().then(function() {
		$scope.theTag = theTag;
		console.log('the tag is:');
		console.log(theTag);		
		console.log(refBooks);
		refBooks.$loaded().then(function() {
			$scope.isLoading = false;
			$scope.hasData = true;
			angular.forEach( theTag.books, function(bookId) {
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

//ctrlNominateBookSearch.js

//ctrlNominateBookDetail.js
 	 
 	 



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DIALOGS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller("DialogFollowPlaceCtrl",  ["fsConfig", "$scope",  function(fsConfig, $scope) {
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
	console.log(currentUser);	
}]);
 	 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USER ADMIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
//see ctrlAccount.js

//see ctrlProfile.js

app.controller("FollowingCtrl", ["fsConfig", "$scope", "Profile", "currentUser", "$firebaseArray","$location", 
  function(fsConfig, $scope, Profile, currentUser, $firebaseArray, $location) {
  	var unreadMessages;
  	$scope.unreadMessages = unreadMessages;
 	$scope.aaa = false;
	$scope.isLoadingMessages = true;
    if(currentUser){
    	$scope.profile = new Profile(currentUser.uid);
	  	var refMessages = new Firebase(fsConfig.FIREBASE_URL+'/messages/').child(currentUser.uid);
			refMessages.orderByKey().limitToLast(8).on('value', function(snapshot) { 
				unreadMessages = snapshot.val();
				$scope.isLoadingMessages = false;
				console.log('unreadmessages:');
				console.log(unreadMessages);
				$scope.unreadMessages = unreadMessages;
		    });	
				var msgs = $firebaseArray(refMessages);
				$scope.msgs = msgs;
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




