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
;




