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
		//IF IT"S A HEADER LOGO OR STANDARD PROFILE
	   	if($scope.fsIconType == 'header'){
			simpleLogin.$getCurrentUser().then( function(currentUser) {
				var refUser = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child(currentUser.uid)).$asObject();
				refUser.$loaded().then(function() {
					console.log(refUser);
					$scope.pictureUrl = refUser.picture_url; 
					$scope.userName = refUser.displayName; 
					$scope.theProfileUrl = 'https://d22r54gnmuhwmk.cloudfront.net/rendr-fe/img/default-user-avatar-dc6f2da9.gif';
	 	      	});
		    });
			    
			//OTHERWISE IF IT IS A GENERAL CASE OF SHOWING A USER ICON
			}else if($scope.fsIconType == 'general'){	
				//CHECK IF USERID EXISTS
				if($scope.fsUserId){
					var firebaseResource = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/users/').child($scope.fsUserId)).$asObject();
					firebaseResource.$loaded().then(function() {
						$scope.pictureUrl = firebaseResource.picture_url; 
						$scope.userName = firebaseResource.displayName; 
					});
				} else{
				  	$scope.theProfileUrl = 'https://d22r54gnmuhwmk.cloudfront.net/rendr-fe/img/default-user-avatar-dc6f2da9.gif';
					$scope.userName = 'user'; 
				}
			//OTHERWISE NOTHING TO SEE
			} else{
				$scope.theProfileUrl = 'https://d22r54gnmuhwmk.cloudfront.net/rendr-fe/img/default-user-avatar-dc6f2da9.gif';
				$scope.userName = 'user'; 
			}
		}]//ends controller
    
    
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

.directive('fsMessageCount', ['$firebase', 'simpleLogin', 'filterFilter', function($firebase, simpleLogin, filterFilter){
	return {
		restrict: 'AE',
		scope: {
	        fsUserId: '=fsUserId',
	        user: '@'
		},
	    template: '<a ng-href="#/following"><span  class="userMessageIcon" title="{{userMessageCountDetail}}" ng-show="showIcon">{{newMsgCount}}</span></a>',
		controller: ['$scope',  function ($scope) {
			
			var showIcon = false;
			var newMsgCount;
			$scope.showIcon = showIcon;
			$scope.newMsgCount = newMsgCount;
 			//LETS GET THE COUNT
 			simpleLogin.$getCurrentUser().then(function(currentUser) {
				if(currentUser){
					$scope.userMessageCount = ''; 
					var fbMsg = new Firebase('https://sweltering-fire-3219.firebaseio.com/messages/').child(currentUser.uid);
		 			fbMsg.on('value', function(snapshot) {
			 			var fbMessages = (snapshot.val());
			 			var theNewMsgs = filterFilter(fbMessages, {isSeen:'!true'});
			 			if(theNewMsgs.length){
					 		showIcon = true;	
			 			}else{
				 			showIcon = false;
			 			};
			 			newMsgCount = theNewMsgs.length;
			 			$scope.userMessageCountDetail = theNewMsgs.length + 'New notifications';
			 			$scope.showIcon = showIcon;
			 			$scope.newMsgCount = theNewMsgs.length;
			 			console.log('showicon is :' + $scope.showIcon);
					});
	 			}//ends if current user check
				    
		    });	
		}]//ends controller
	    
	 
	   
    };
  }])
  

;




/*
			var refMsgs = $firebase(new Firebase('https://sweltering-fire-3219.firebaseio.com/system/messages/').child(currentUser.uid)).$asArray();
				refMsgs.$loaded().then(function() {
					//console.log(refMsgs);
					$scope.userMsgs = refMsgs;
					$scope.userMessageCount = '12'; 
					$scope.userMessageCount = refMsgs.length; 
					$scope.userMessageCountDetail = refMsgs.length + ' Notifications'; 
					$scope.newMsgs = filterFilter(refMsgs, {bookTitle:'Death of a River Guide: A Novel'});
					$scope.newMsgs2 = filterFilter(refMsgs, {isSeen:!true});
	 	      	});

*/





