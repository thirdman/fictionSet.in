"use strict";
app.controller("CollectionsCtrl", ["fsConfig", "$scope", "currentUser", "$firebaseArray", "$routeParams", "$location",  "DataSource", "Profile", "filterFilter", 'ngDialog', 
function(fsConfig, $scope,  currentUser, $firebaseArray, $routeParams, $location,   DataSource,  Profile, filterFilter, ngDialog ) { 
	var arrCollections;
	$scope.isLoading = true;
	$scope.hasData = false;
	var refCollections = new Firebase(fsConfig.FIREBASE_URL+'/collections/');
 	arrCollections = $firebaseArray(refCollections);
	arrCollections.$loaded().then(function() {
		$scope.hasData = true;
		$scope.isLoading = false;
		$scope.arrCollections = arrCollections;
	});
}]);
