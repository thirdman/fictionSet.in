'use strict';
app.controller("CollectionsCtrl", [ "$scope", "currentUser", "$firebase", "$routeParams", "$location",  "DataSource", "Profile", "filterFilter", 'ngDialog', 
function($scope,  currentUser, $firebase, $routeParams, $location,   DataSource,  Profile, filterFilter, ngDialog ) { 
	var arrCollections;
	$scope.isLoading = true;
	$scope.hasDate = false;
	
	var refCollections = new Firebase('https://sweltering-fire-3219.firebaseio.com/collections/');
 	arrCollections = $firebase(refCollections).$asArray();
	arrCollections.$loaded().then(function() {
		$scope.hasData = true;
		$scope.isLoading = false;
		$scope.arrCollections = arrCollections;
	});
  	
  	

  	
}]);


