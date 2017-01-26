(function () {
  'use strict';

  angular.module('demoApp', ['ui.tree', 'ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', '$compileProvider','$locationProvider', function ($routeProvider, $compileProvider,$locationProvider) {
      $routeProvider
        .when('/angular-ui-tree', {
          controller: 'angularUiTreeCtrl',
          templateUrl: 'angularUItree/views/angularUiTree.html'
        })
        .otherwise({
          redirectTo: '/angular-ui-tree'
        });

      $locationProvider.html5Mode(true);
      $compileProvider.debugInfoEnabled(false);
    }]);
})();
