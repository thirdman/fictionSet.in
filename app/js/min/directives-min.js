'use strict';

/* Directives */


/*
angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
*/


angular.module('myApp.directives', [])
 //this is the delaying for the search	
 .directive('delayedModel', function() {
    return {
        scope: {
            model: '=delayedModel'
        },
        link: function(scope, element, attrs) {

            element.val(scope.model);

            scope.$watch('model', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    element.val(scope.model);        
                }
            });

            var timeout;
            element.on('keyup paste search', function() {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    scope.model = element[0].value;
                    element.val(scope.model);
                    scope.$apply();
                }, attrs.delay || 100);
            });
        }
    };
})

.service('AsyncService', function ($q) {
  
  // Like Angular's $http.get, this function returns a promise.
  this.promiseToDoSomething = function() {
    return $q.when('Promise fulfilled!');
  };
})

.directive('fsUserImg', ['$firebase', 'simpleLogin', function($firebase, simpleLogin){
	/*
var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/Books/');
	var theUrl = new Firebase('https://sweltering-fire-3219.firebaseio.com/users/'+{{userId}}+'/picture_url');
	$scope.theProfileUrl = theUrl;
*/
	return {
      restrict: 'AE',
      scope: {
        userId: '=userId',
        fsUserId: '=fsUserId',
        fsIconType: '@',
        user: '@'
      },
      //templateUrl: 'my-customer-plus-vojta.html'
       template: '<span class="userImgIconWrap"><img class="userImgIcon" src="{{pictureUrl}}" title="{{userName}}"  />{{theProfileUrl}}</span>',
       
       controller: ['$scope', 'AsyncService', function ($scope, asyncService) {
	   		$scope.theProfileUrl = 'https://d22r54gnmuhwmk.cloudfront.net/rendr-fe/img/default-user-avatar-dc6f2da9.gif';
		  	simpleLogin.$getCurrentUser().then( function(currentUser) {
				console.log(currentUser);
				var refUser = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(currentUser.uid)).$asObject();
				refUser.$loaded().then(function() {
					console.log(refUser);
					$scope.pictureUrl = refUser.picture_url; 
					$scope.userName = refUser.displayName; 
					$scope.theProfileUrl = 'https://d22r54gnmuhwmk.cloudfront.net/rendr-fe/img/default-user-avatar-dc6f2da9.gif';
	 	      	});
//			  $scope.theProfileUrl = 'https://d22r54gnmuhwmk.cloudfront.net/rendr-fe/img/default-user-avatar-dc6f2da9.gif';
	      });
	    }]
    
    
/*
	   link: function(scope, elem, attrs) {
		console.log(scope);
//			var currentUser = simpleLogin.$getCurrentUser();

		if(scope.fsIconType == 'header'){
			var refUser = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(userId)).$asObject();
			refUser.$loaded().then(function() {
				console.log(refUser);
				scope.pictureUrl = refUser.picture_url; 
				scope.userName = refUser.displayName; 
 	      	});
		} else{
			
			
			if(scope.userId){
				var firebaseResource = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(scope.fsUserId)).$asObject();
				firebaseResource.$loaded().then(function() {
					scope.pictureUrl = firebaseResource.picture_url; 
					scope.userName = firebaseResource.displayName; 
	 	      	});
	 		} else{
				scope.pictureUrl = 'https://d22r54gnmuhwmk.cloudfront.net/rendr-fe/img/default-user-avatar-dc6f2da9.gif'; 
				scope.userName = 'user'; 
	 		}
		}
 	   }
*/
	   
   
    };
  }])

;






