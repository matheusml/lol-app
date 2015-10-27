(function () {
	'use strict';

	angular
		.module('app')
		.directive('autofocus', Autofocus);

	function Autofocus() {
		return {
	    	restrict: 'A',
	      	link : function($scope, $element) {
	        	$timeout(function() {
	          		$element[0].focus();
	        	});
	      	}
	  	};
	}
})();
