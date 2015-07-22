(function() {
  'use strict';

  angular
    .module('bodyMass')
    .config(config)
    .factory('authInterceptor', interceptor);

  /** @ngInject */
  function config($locationProvider, $httpProvider, $logProvider, toastr) {
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
  }

  function interceptor($rootScope, $q, $cookieStore, $location){
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }

})();
