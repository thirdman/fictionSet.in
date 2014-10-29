'use strict';
app.controller("RequestsCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location",  "DataSource", "Profile", "filterFilter", 'ngDialog', 
function($scope,  currentUser, $firebase, $routeParams, $location,   DataSource,  Profile, filterFilter, ngDialog ) { 
	var arrRequests;
	$scope.isLoading = true;
	$scope.hasData = false;
	
	$scope.isLoading = false;
	$sceop.hasData = true;
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


