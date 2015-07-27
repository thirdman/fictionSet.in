app.controller("AddBookSearchCtrl", [ "fsConfig", "$scope", "currentUser",  "$firebaseArray", "$firebaseObject", "$routeParams", "$location", "filterFilter", "DataSource",
function(fsConfig, $scope, currentUser,  $firebaseArray, $firebaseObject, $routeParams, $location, filterFilter, DataSource) {
	"use strict";
	$scope.hasData = false;
	$scope.isLooking = false;
	$scope.hasDataNominate = false;
	$scope.isLookingNominate = false;
	$scope.limitCurrent = 4;
 	var ref = new Firebase(fsConfig.FIREBASE_URL);
 	var refCurrent = $firebaseArray(ref.child('Books'));
	refCurrent.$loaded().then(function() {
  	 $scope.currentBooks = refCurrent;
	});

	$scope.showAllCurrent = function(){
		$scope.limitCurrent = 100;
	};
	
 	$scope.searchBooks = function() {
 		$scope.hasData = false;
 		$scope.isLooking = true;
  	//GET LODATION DATA 	
		var SEARCHURL = 'http://fictionset.in/admin/amazon/amazon_searchbooks.php?search='+$scope.searchString;
		var searchData = function(data) {
			$scope.isLooking = false;
			$scope.hasData = true;
			$scope.dataSearch = data;
	       	//console.log(data);
  	};
		DataSource.get(SEARCHURL,searchData);  //this is the locations
	};

	/*
	* SearchBooks Nomiate - searches the books that have been nominated/suggested.
	* 
	*/
	$scope.searchBooksNominate = function() {
 		$scope.hasDataNominate = false;
 		$scope.isLookingNominate = true;
		var SEARCHURL = 'http://fictionset.in/admin/amazon/amazon_searchbooks.php?search='+$scope.searchStringNominate;
		var searchDataNominate = function(data) {
			$scope.isLookingNominate = false;
			$scope.hasDataNominate = true;
			$scope.dataSearchNominate = data;
    };
 		DataSource.get(SEARCHURL,searchDataNominate);  //this is the locations
	};
	
}]);
	
	
