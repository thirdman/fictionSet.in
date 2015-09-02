app.controller("ProfileCtrl", ["fsConfig", "$scope", "Profile", "Auth", "currentUser", "$firebaseArray", "$firebaseObject", "$location", "$routeParams", "FsGet", 'ngDialog', 'DataSource', 
  function(fsConfig, $scope, Profile, Auth, currentUser, $firebaseArray, $firebaseObject, $location, $routeParams, FsGet, ngDialog, DataSource) {
	'use strict';
  var unreadMessages, allBooks;
  $scope.unreadMessages = unreadMessages;
	$scope.aaa = false;
	$scope.isLoadingMessages = true;
	$scope.allBooks = allBooks;
	if($routeParams.authorise){
		console.log('Routeparams authorise is: '+$routeParams.authorise);
	}
	$scope.auth = Auth;
	var authData = Auth.$getAuth();
  $scope.authData = authData;
	//var theUser = FsGet.getUser1(authData.uid);
	var theUserRole = FsGet.getRole(authData.uid);
	theUserRole.$loaded()
  .then(function() {
		console.log(theUserRole);
		var userAaa = (theUserRole.$value  > 50);
		$scope.userRole = theUserRole.$value;
		$scope.userAaa = userAaa;
  })
  .catch(function(err) {
    console.error(err);
  });
  
  if(currentUser){
		var userProfile = FsGet.getUser1(currentUser.uid);
		console.log(userProfile);
		$scope.profile = userProfile;
		var grData = $firebaseObject(new Firebase(fsConfig.FIREBASE_URL).child('users').child(currentUser.uid).child('goodreads'));
		grData.$loaded(function() {
		   var dataExists = grData.$value !== null;
			console.log(grData.isActive);
			console.log(grData);
			 $scope.grData = grData;
			if(grData.isActive){
				$scope.grDataActive = true;
			} else {
				$scope.grDataActive = false;
			}

		});
	
	grGetUserInfo(6833362);
	grListShelves();
	grGetShelf('to-read');
		
		
		// this gets the list of books for 'contributing'
		// TODO: output books & linke to edit.
		var refBooks = new Firebase(fsConfig.FIREBASE_URL+'/Books/');
	  	refBooks.once('value', function(snapshot) {
		  allBooks = snapshot.val();
		  $scope.allBooks = allBooks;
		});
		// this shows read messages.
		// TODO: refactor into a decent way of doing this - using a batch process or something.
  	var refMessages = new Firebase(fsConfig.FIREBASE_URL+'/oldmessages/');
		refMessages.once('value', function(snapshot) {
			unreadMessages = snapshot.val();
			$scope.unreadMessages = unreadMessages;
		});

	  //var msgs = $firebaseArray(refMessages);
	  
    } else { //not a current user... move on...
			$location.path('#/home').replace();
	    $scope.$apply();
    }

	/*
	* GOODREADS DIALOG: does the setup and saving.
 	*	
*/	
		$scope.doGoodreadDialog = function () {
		$scope.reportProcessing = false;
		$scope.reportDone = false;
		$scope.isError = false;
    ngDialog.open({ 
			plain: false,
    	template: 'views/dialogs/dialogGoodreads.html?session=yes',
    	//template: 'admin/login.php?provider=Goodreads',
      scope: $scope,
			controller: ['$scope', "Auth", "DataSource", "$location", "$routeParams", "$http", function ($scope, Auth, DataSource, $location, $routeParams, $http) {			
				$scope.isLooking = true;
				$scope.grDone = false;
				$scope.grProcessing = false;
				$scope.isError = false;
				var ref = new Firebase(fsConfig.FIREBASE_URL);
				console.log(currentUser);
				if(currentUser){
					console.log('it has a current user so chould be ok to start the check if it has a goodreads connected');
					var userRef =	ref.child('users').child(currentUser.uid);
					console.log(userRef);
				}
				
				//console.log($location);
				//console.log($routeParams.session);
				//console.log($location.search('session'));

					    
						/*
						* GOODREADS ACTION: Calls the login php sript and passes back data.
					 	*	
						*/								
						$scope.doGoodreadsAction = function () {
							$scope.grProcessing = true;
							$scope.grDone = false;

/*
							var req = {
							 method: 'JSONP',
							 url: 'http://fictionset.in/admin/login.php?provider=Goodreads',
							 data: { test: 'test' }
							}
*/
			
								var GOODREADS_LOGIN = 'http://fictionset.in/admin/login.php?provider=Goodreads';
							  var grAction = function(data) {
							  	//console.log(data);
									$scope.isLooking = false;
									$scope.hasData = true;
									if (data.identifier){
										$scope.grDone = true;
										$scope.grProcessing = false;
								    $scope.hasData = true;
										$scope.grData = data;
								    $scope.hasData = true;
								    console.log('we have goodreads user data');	
										console.log(data);
										addGoodreadsToAccount(currentUser, data);
									} else {
										$scope.isError = true;
										return 'no data';
									}    
								};
								DataSource.get(GOODREADS_LOGIN, grAction);  //get amazonurl and then do amazonobj with it.
					  };
						
						var addGoodreadsToAccount = function(currentUser, data){
							console.log('Do we have a current user...');
							console.log(currentUser.uid);
							console.log(data);
							var thisUid = "goodreads:" +data.identifier;
							var provider = provider;
							var grLinked = true;
							var grDisplayName = data.displayName;
							var grId = data.identifier;
							var grLocation = data.country;
							var grCountry = data.country;
							var grPhotoURL = data.photoURL;
							var grProfileURL = data.profileURL;
							var grEmail = data.email;
							var grZip = data.zip;
							var ref = new Firebase(fsConfig.FIREBASE_URL);
							ref.child('users').child(currentUser.uid).child('userMappings').set({
								goodreads: thisUid
	/*
				        displayName: data.displayName,
				        provider_email: data.email,
				        isActive: grLinked,
				        provider: provider,
				        picture_url: data.photoURL,
				        provider_id: data.identifier,
				        provider_location: data.country,
				        provider_country: data.country,
				        provider_zip: data.zip,
	*/
				      });
						};
				

				}]
		});
  };
							
    
	/*
	* GOODREADS LOGOUT: disconnects your goodreads account
 	*	
	*/								
	$scope.doGoodreadLogout = function (userId, goodreadsId) {
		$scope.grProcessing = true;
		$scope.grDone = false;
		console.log(userId);
		console.log(goodreadsId);

		var GOODREADS_URL = 'http://fictionset.in/admin/grLogout.php?provider=Goodreads&logout=true&v=2';
	  var grLogout = function(data) {
	  	console.log(data);
			$scope.isLooking = false;
			$scope.hasData = true;
			if (data.success){
				$scope.grDone = true;
				$scope.grProcessing = false;
		    //$scope.hasData = true;
				//$scope.grData = data;
		    //$scope.hasData = true;
				console.log(data.message);
			} else {
				$scope.isError = true;
				$scope.errorMessage = 'Something went wrong.';
				return 'no data';
			}    
		};
		DataSource.get(GOODREADS_URL, grLogout); 

	};

 	/*
	* GOODREADS GET EXTERNAL LINKE:
 	*	
	*/								
	$scope.doExternalLink = function () {
		console.log('doing EXTERNAL LINK');
		$scope.grProcessing = true;
	};

 	/*
	* GOODREADS GET USER INFO (VIA API):
 	*	TODO: make parameterisable
	*/	
		function grGetUserInfo(grUserId){
			var GOODREADS_API_USER = 'http://fictionset.in/admin/grApi.php?api=getUser&userId=' + grUserId;
		  var grDoUser = function(data) {
		  	console.log(data);
		  	console.log('user data ...');
				  //console.log(data.shelves.user_shelf);
					var grUser = data.user;
					$scope.grUser = grUser;
					console.log(grUser);
					// go get the books on the shelves...
					grGetUserShelves(grUser, grUserId);
			};	
			DataSource.get(GOODREADS_API_USER, grDoUser);  //get api and then do action with it.	
		};
		

 	/*
	* GOODREADS LIST SHELVES OF USERID:
 	*	
	*/	
		function grGetUserShelves(grUser, grUserId){
			var grUserData = grUser;
			var grShelfArray = [];
			$scope.grShelfArray = grShelfArray;
			var grUserShelves = grUser.user_shelves.user_shelf;
			console.log('grUserShelf is...');
			console.log(grUserShelves);

			angular.forEach(grUserShelves,function(shelf) {
				console.log(shelf.name);
				console.log(grShelfArray);

				var GOODREADS_API = 'http://fictionset.in/admin/grApi.php?api=getShelf&shelfName=' + shelf.name + '&userId=' +grUserId  ;
				var grShelfData = function(data) {
			  console.log(data);
				var grShelf = data.reviews.review;
				//var grShelf = 'ggg';
				if(shelf.book_count == 0){
					//do nothing
				} else if(shelf.book_count == 1){
					var singleArray =[]
						singleArray.push(grShelf);
					 grShelfArray.push({
	            name: shelf.name,
	            meta: shelf,
	            content: singleArray
	        });		
				}else{
					grShelfArray.push({
            name: shelf.name,
            meta: shelf,
            content: grShelf
					});
				}
				
			
				
//				$scope.grShelfArray.push(grShelf);
	///				grShelfArray.concat(grShelf)
	};	
				DataSource.get(GOODREADS_API, grShelfData);  
			
			console.log('current array of shelves is...');
			console.log(grShelfArray);
			
			
			});
/*
			var GOODREADS_API = 'http://fictionset.in/admin/grApi.php?provider=Goodreads';
		  var grShelfAction = function(data) {

		  	console.log(data);
		  	console.log('user shelves data/../.');
				  console.log(data.shelves.user_shelf);
					var grShelves = data.shelves.user_shelf;
					$scope.grShelves = grShelves;
		  	console.log(grShelves);
			};	
			DataSource.get(GOODREADS_API, grShelfAction);  //get api and then do action with it.	
*/
		};
	
			
		
 	/*
	* GOODREADS LIST SHELVES:
 	*	
	*/	
		function grListShelves(currentUser, data){
			var GOODREADS_API = 'http://fictionset.in/admin/grApi.php?provider=Goodreads';
		  var grShelfAction = function(data) {

		  	//console.log(data);
		  	///console.log('user shelves data/../.');
				 // console.log(data.shelves.user_shelf);
					var grShelves = data.shelves.user_shelf;
					$scope.grShelves = grShelves;
		  //	console.log(grShelves);
			};	
			DataSource.get(GOODREADS_API, grShelfAction);  //get api and then do action with it.	
		};
	
	
 	/*
	* GOODREADS GET SHELF:
 	*	TODO: pass goodreads user id
	*/	
		function grGetShelf(shelf){
			var GOODREADS_API = 'http://fictionset.in/admin/grApi.php?api=getShelf&shelfName=' + shelf;
		  var grShelfData = function(data) {

		  	console.log(data);
		  	console.log('shelf data ...');
				  //console.log(data.shelves.user_shelf);
					var grShelf = data.reviews.review;
					$scope.grShelf = grShelf;
		  	console.log(grShelf);
			};	
			DataSource.get(GOODREADS_API, grShelfData);  //get api and then do action with it.	
		};
		


}]);