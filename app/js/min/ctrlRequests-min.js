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
		console.log(nominatedBooks);
	});
	
  	

  $scope.upgradeBookDialog = function (bookId, amazonId, book) {
  	//alert(bookId);
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
	  //$scope.$apply();

  }


  	
}]);




