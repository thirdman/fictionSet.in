
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
	 'use strict';
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
  'use strict';
  // Like Angular's $http.get, this function returns a promise.
  this.promiseToDoSomething = function() {
    return $q.when('Promise fulfilled!');
  };
})
 
.directive('fsUserImg', ['fsConfig', "Auth", "$firebaseArray", "$firebaseObject", 'simpleLogin', 'FsGet',
	function(fsConfig,  Auth, $firebaseArray, $firebaseObject, simpleLogin, FsGet){
	'use strict';

	return {
	restrict: 'AE',
	scope: {
		userId: '=userId',
    fsUserId: '=fsUserId',
    fsIconType: '@',
    user: '@'
	},
  template: '<span class="userImgIconWrap"><img class="userImgIcon" src="{{pictureUrl}}" title="{{userName}}"  />{{theProfileUrl}}</span>',
	controller: ['$scope', 'Auth', function ($scope, Auth) {
		$scope.theProfileUrl = 'https://d22r54gnmuhwmk.cloudfront.net/rendr-fe/img/default-user-avatar-dc6f2da9.gif';
		//IF IT"S A HEADER LOGO OR STANDARD PROFILE
	  if($scope.fsIconType === 'header'){
		Auth.$onAuth(function(authData) {
    	 $scope.authData = authData;
				if(authData){
 				var refUser = FsGet.getUser1(authData.uid);
				refUser.$loaded().then(function() {
					if(refUser.picture_url){
					$scope.pictureUrl = refUser.picture_url; 
					$scope.userName = refUser.displayName; 
					}else{
						$scope.pictureUrl = 'https://d22r54gnmuhwmk.cloudfront.net/rendr-fe/img/default-user-avatar-dc6f2da9.gif';						
					}
		    });
		  }
    });
			    
			//OTHERWISE IF IT IS A GENERAL CASE OF SHOWING A USER ICON
			}else if($scope.fsIconType === 'general'){	
				//CHECK IF USERID EXISTS
				if($scope.fsUserId){
					var firebaseResource = $firebaseObject(new Firebase(fsConfig.FIREBASE_URL+'/users/').child($scope.fsUserId));
					firebaseResource.$loaded().then(function() {
						console.log('user exists, so lets show image...');
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
    };
  }])
 

.directive('fsMessageCount', ['fsConfig',   'Auth', 'simpleLogin', 'filterFilter', '$rootScope', function(fsConfig,  Auth, simpleLogin, filterFilter, $rootScope){
	"use strict";
	return {
		restrict: 'AE',
		scope: {
	    fsUserId: '=fsUserId',
	    user: '@'
		},
	  template: '<a ng-href="#/following"><span  class="userMessageIcon" title="{{userMessageCountDetail}}" ng-show="showIcon">{{newMsgCount}}</span></a>',
		controller: ['$scope', "Auth", function ($scope, Auth) {			
			var showIcon = false;
			var newMsgCount;
			$scope.showIcon = showIcon;
			$scope.newMsgCount = newMsgCount;
			$scope.auth = Auth;

			Auth.$onAuth(function(authData){
					$rootScope.showUser = authData;
					showIcon = false;
					$scope.userMessageCount = ''; 
					if(authData){
						var fbMsg = new Firebase(fsConfig.FIREBASE_URL + '/messages/').child(authData.uid);
						fbMsg.on('value', function(snapshot) {
							var fbMessages = (snapshot.val());
							var theNewMsgs = filterFilter(fbMessages, {isSeen:'!true'});
							if(theNewMsgs.length){
								showIcon = true;	
							}else{
								showIcon = false;
							}
							newMsgCount = theNewMsgs.length;
							$scope.userMessageCountDetail = theNewMsgs.length + 'New notifications';
							$scope.showIcon = showIcon;
							$scope.newMsgCount = theNewMsgs.length;
							console.log('showicon is :' + $scope.showIcon);
							});
						}
			}); // Check user onauth
			
		    
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



