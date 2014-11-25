'use strict';
app.controller("RequestsCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location",  "DataSource", "Profile", "filterFilter", 'ngDialog', 
function($scope,  currentUser, $firebase, $routeParams, $location,   DataSource,  Profile, filterFilter, ngDialog ) { 
	var refRequests, nominatedBooks;
	$scope.isLoading = true;
	$scope.hasData = false;
	
	$scope.isLoading = false;
	$scope.hasData = true;

	var refRequests = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/nominated/Books/')).$asArray();
	refRequests.$loaded().then(function() {
		$scope.hasData = true;
		$scope.isLoading = false;
		nominatedBooks = refRequests;
		$scope.nominatedBooks = refRequests;
	});
	
/*
	var refCollections = new Firebase('https://sweltering-fire-3219.firebaseio.com/collections/');
 	arrCollections = $firebase(refCollections).$asArray();
	arrCollections.$loaded().then(function() {
		$scope.hasData = true;
		$scope.isLoading = false;
		$scope.arrCollections = arrCollections;
	});
*/
  	
  	

  	
}]);


