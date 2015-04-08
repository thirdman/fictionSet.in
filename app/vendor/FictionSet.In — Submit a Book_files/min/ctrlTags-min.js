'use strict';
 
app.controller('TagCtrl', ['fsConfig','$scope', '$http', '$firebase', 'tags', '$filter', 'uniqueFilter', function(fsConfig, $scope, $http, $firebase, tags, $filter, uniqueFilter) {
	var refTheTags = new Firebase(fsConfig.FIREBASE_URL+'/tags/');
	refTheTags.once('value', function(snapshot) {
	   	var taglist = snapshot.val();
	   	var tempList = [];
	   	var tempListTags = [];
	   	
	   	angular.forEach(taglist, function(value, key){
		   	var thisObj = {};
		 	thisObj.text = value.tagId;
		 	tempListTags.push(thisObj);
	    });
		//console.log($filter('unique')(tempListTags));
		
		$scope.loadTags = function(query) {
		    return tags.load(query, tempListTags);
		};
	});

}]);
 
 
    
 

