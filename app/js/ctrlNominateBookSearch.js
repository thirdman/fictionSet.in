app.controller("NominateBookCtrl", [ "fsConfig", "$scope", "currentUser", "$firebaseArray", "$routeParams", "$location", "filterFilter", "DataSource", "$q", "$http", function(fsConfig, $scope, currentUser, $firebaseArray, $routeParams, $location, filterFilter, DataSource, $q, $http) {
	$scope.hasData = false;
	$scope.isLooking = false;
	$scope.hasDataNominate = false;
	$scope.isLookingNominate = false;
	var currentBooks;
	$scope.limitCurrent = 3;
	
	var ref = new Firebase(fsConfig.FIREBASE_URL);
	var refCurrent = $firebaseArray(ref.child('Books'));


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

