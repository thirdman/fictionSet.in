app.controller('TagCtrl', ['fsConfig', '$scope', '$http',  'tags' , function(fsConfig, $scope, $http,  tags ) {
	'use strict';
	var refTheTags = new Firebase(fsConfig.FIREBASE_URL+'/tags/');
	refTheTags.once('value', function(snapshot) {
		var taglist = snapshot.val();
		var tempListTags = [];
		
		angular.forEach(taglist, function(value){
			var thisObj = {};
			thisObj.text = value.tagId;
			tempListTags.push(thisObj);
		});
		$scope.loadTags = function(query) {
			return tags.load(query, tempListTags);
		};
	});

}]);
 
 
    
 