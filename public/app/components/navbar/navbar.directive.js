(function(){
  'use strict';

  angular
    .module('bodyMass')
    .directive('navbarMenu', [directive]);

  function directive(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: controller,
      controllerAs: 'navbar',
      bindToController: true
    };
    function controller (Auth, $state){
      this.logout = function(){
        Auth.logout();
        $state.go('login');
      }
    }
  }
})();
