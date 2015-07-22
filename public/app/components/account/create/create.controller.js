(function(){
  'use strict';


  angular
    .module('bodyMass')
    .controller('CreateAccountController', ['Auth', 'toastr', '$state', controller]);

  function controller(Auth, toastr, $state){
    this.submit = function(){
     Auth.createUser(this.formdata)
       .then(function(){
         toastr.info('User created', 'Success');
         $state.go('main');
       }).catch(function(err){
         toastr.error('Something happened insperado', 'Failed');
       });
    }
  }
})();
