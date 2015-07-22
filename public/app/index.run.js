(function() {
  'use strict';

  angular
    .module('bodyMass')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $location, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  }

})();
