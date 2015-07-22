(function () {
  'use strict';

  angular
    .module('bodyMass')
    .controller('LoginController', ['Auth', '$state', controller]);

  function controller(Auth, $state) {
    this.submit = function () {
      Auth.login(this.formdata)
        .then(function () {
          $state.go('main');
        });
    };
  }

})();
