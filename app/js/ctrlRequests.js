app.controller("RequestsCtrl", [ "fsConfig", "$scope", "currentUser",  "$firebaseArray", "$firebaseObject", "$routeParams", "$location",  "DataSource", "Profile", "filterFilter", 'ngDialog', 
function(fsConfig, $scope,  currentUser, $firebase, $firebaseArray, $firebaseObject, $routeParams, $location,   DataSource,  Profile, filterFilter, ngDialog ) { 
	'use strict';
	var refRequests, nominatedBooks;
	$scope.isLoading = true;
	$scope.hasData = false;
	$scope.isLoading = false;
	$scope.hasData = true;
	refRequests = $firebaseArray(new Firebase(fsConfig.FIREBASE_URL + '/nominated/Books/'));
	refRequests.$loaded().then(function() {
		$scope.hasData = true;
		$scope.isLoading = false;
		nominatedBooks = refRequests;
		$scope.nominatedBooks = refRequests;
	});
	
  	

  $scope.upgradeBookDialog = function (bookId, amazonId, book) {
  	$scope.bookId = bookId;
  	$scope.amazonId = amazonId;
  	$scope.book = book;
  	   ngDialog.open({ 
			//template: '<h4>Add this book to Fictionset.in</h4><p>nothing to see here</p><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="upgradeBook\(\)">Close</button><button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog\(\)">Close</button></div>',
			plain: false,
        	//	controller: 'DialogCollectionsAdd'
        	template: 'views/dialogs/dialogUpgradeBook.html',
        	scope: $scope
			});
  };
  
  $scope.upgradeBook = function(amazonId, book){
	  console.log(book);
	  console.log($scope);
	  ngDialog.close();
	  $location.path('/addbook/'+$scope.book.amazon_id).replace();
  };
}]);


