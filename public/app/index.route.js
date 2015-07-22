(function () {
  'use strict';

  angular
    .module('bodyMass')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    var states = [];
    /*
     states.push({
     url: '/',
     templateUrl: 'app/main/main.html',
     controller: 'MainController',
     controllerAs: 'main'
     });
     */
    states.push({
      name: 'login',
      url: '/login',
      templateUrl: 'app/components/account/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    });
    states.push({
      name: 'createAccount',
      url: '/create-account',
      templateUrl: 'app/components/account/create/create.html',
      controller: 'CreateAccountController',
      controllerAs: 'create'
    });

    states.push({
      name: 'main',
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      authenticate: true
    });

    states.forEach(function (s) {
      $stateProvider.state(s);
    });

    $urlRouterProvider.otherwise('/login');
  }

})();
