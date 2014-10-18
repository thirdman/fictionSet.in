var app = angular.module("myApp", ["firebase", 'ngRoute']);
 

 
app.config(["$routeProvider", '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when("/home", {
    controller: "HomeCtrl",
    templateUrl: "views/home.html",
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
  })
  .when("/login", {
    controller: "LoginCtrl",
    templateUrl: "views/login.html",
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
    resolve: {
      // controller will not be invoked until getCurrentUser resolves
      "currentUser": ["simpleLogin", function(simpleLogin) {
         return simpleLogin.$getCurrentUser();
      }]
    }
  })


  .otherwise({redirectTo:'/home'});
   //ends routerpovider
   
   $locationProvider.html5Mode(true);
   $locationProvider.hashPrefix('!');

	
  
  
  
}]); //ends config


 
/*
// let's create a re-usable factory that generates the $firebaseSimpleLogin instance
app.factory("simpleLogin", ["$firebaseSimpleLogin", function($firebaseSimpleLogin) {
  var ref = new Firebase("https://sweltering-fire-3219.firebaseio.com/");
  return $firebaseSimpleLogin(ref);
 }]);
*/


app.factory("simpleLogin", ["$firebaseSimpleLogin", "Profile", function($firebaseSimpleLogin, Profile) {
  var ref = new Firebase("https://sweltering-fire-3219.firebaseio.com/"); //sets the location we're authenticating for
  var isaNewUser = true;
  //  return $firebaseSimpleLogin(ref);
  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
	  if (error) {
	    // an error occurred while attempting login
	    console.log(error);
	    
		} else if (user) {
		// user authenticated with Firebase
	    console.log("authenticated");
	    console.log("User ID: " + user.uid + ", Provider: " + user.provider);
		var usersRef = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/');
		usersRef.child(user.uid).once('value', function(snapshot) {
			console.log('gekki');
			console.log(snapshot.val());
			var exists = (snapshot.val() !== null);
			});
    
			console.log(checkIfUserExists(user.uid));

			var isaNewUser = checkIfUserExists(user.uid);
			console.log(isaNewUser);
 			if(isaNewUser){
				console.log('already esists in the db');
			} else {
				console.log('doesnt already exist, shall we add them?');
				console.log('adding new user...');
			      ref.child('users').child(user.uid).set({
			        displayName: user.displayName,
			        provider: user.provider,
			        provider_id: user.id
			      });
		  }//ends isnewuser

	  } else {
	  	// not (user), so...
	    // user is logged out
	  }
	});
  return $firebaseSimpleLogin(ref); // triggers the above auth function, given the referred location.
 
  }]);


function checkIfUserExists(userId) {
  var usersRef = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/');
  usersRef.child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
//    console.log(userId, exists);
   // userExistsCallback(userId, exists);
    return(exists);

  });
}


/*


 if( isNewUser ) {
	      // save new user's profile into Firebase so we can
	      // list users, use them in security rules, and show profiles
		  console.log('adding new user...');
	      ref.child('users').child(user.uid).set({
	        displayName: user.displayName,
	        provider: user.provider,
	        provider_id: user.id
	      });
	
	    } else {
*/




 app.controller("SampleCtrl", ["$scope", "simpleLogin", function($scope, simpleLogin) {
  $scope.auth = simpleLogin;
}])

app.controller("HomeCtrl", ["currentUser", function(currentUser) {
  // currentUser (provided by resolve) will contain the 
  // authenticated user or null if not logged in
  console.log(currentUser);
 }]);



app.controller("LoginCtrl", ["currentUser", function(currentUser) {
  // currentUser (provided by resolve) will contain the 
  // authenticated user or null if not logged in
  
}]);


/*

app.controller("AccountCtrl", ["currentUser", function(currentUser) {
  // currentUser (provided by resolve) will contain the 
  // authenticated user or null if not logged in
  
}]);
*/



// a factory to create a re-usable profile object
// we pass in a username and get back their synchronized data
app.factory("Profile", ["$firebase", function($firebase) {
  return function(username) {
  	console.log(username);
    // create a reference to the user's profile
    var ref = new Firebase("https://sweltering-fire-3219.firebaseio.com/users/").child(username);
    // return it as a synchronized object
    //console.log($firebase(ref))
    return $firebase(ref).$asObject();

  }
}]);

app.controller("AccountCtrl", ["$scope", "Profile", "currentUser",
  function($scope, Profile, currentUser) {
    // put our profile in the scope for use in DOM
    //$scope.profile = Profile("facebook:10154446466700713");
      $scope.profile = Profile(currentUser.uid);
  }
]);



/* 

OLD


'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp',
      ['myApp.config', 'myApp.routes', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers',
         'simpleLoginTools', 'routeSecurity']
   )

   .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         // double-check that the app has been configured
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
         setTimeout(function() {
            angular.element(document.body).removeClass('hide');
         }, 250);
      }
      else {
         // establish authentication
         $rootScope.auth = loginService.init('/login');
         $rootScope.FBURL = FBURL;
      }
   }]);
*/
