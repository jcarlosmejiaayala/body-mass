!function(){"use strict";angular.module("bodyMass",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap"])}(),function(){"use strict";function t(t){this.submit=function(){t.login(this.formdata).then(function(){})["catch"](function(t){})}}angular.module("bodyMass").controller("LoginController",["Auth",t])}(),function(){"use strict";function t(t){this.submit=function(){t.createUser(this.formdata).then(function(){toastr.info("User created","Success")})["catch"](function(t){toastr.error("Something happened insperado","Failed")})}}angular.module("bodyMass").controller("CreateAccountController",["Auth","toastr",t])}(),function(){"use strict";angular.module("bodyMass").factory("User",["$resource",function(t){return t("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}])}(),function(){"use strict";angular.module("bodyMass").factory("Auth",["$location","$rootScope","$http","User","$cookieStore","$q",function(t,o,n,e,r,a){var s={};return r.get("token")&&(s=e.get()),{login:function(t,o){var i=o||angular.noop,c=a.defer();return n.post("/auth/local",{email:t.email,password:t.password}).success(function(t){return r.put("token",t.token),s=e.get(),c.resolve(t),i()}).error(function(t){return this.logout(),c.reject(t),i(t)}.bind(this)),c.promise},logout:function(){r.remove("token"),s={}},createUser:function(t,o){var n=o||angular.noop;return e.save(t,function(o){return r.put("token",o.token),s=e.get(),n(t)},function(t){return this.logout(),n(t)}.bind(this)).$promise},changePassword:function(t,o,n){var r=n||angular.noop;return e.changePassword({id:s._id},{oldPassword:t,newPassword:o},function(t){return r(t)},function(t){return r(t)}).$promise},getCurrentUser:function(){return s},isLoggedIn:function(){return s.hasOwnProperty("role")},isLoggedInAsync:function(t){s.hasOwnProperty("$promise")?s.$promise.then(function(){t(!0)})["catch"](function(){t(!1)}):t(s.hasOwnProperty("role")?!0:!1)},isAdmin:function(){return"admin"===s.role},getToken:function(){return r.get("token")}}}])}(),function(){"use strict";function t(t,o,n){t.$on("$stateChangeStart",function(t,e){n.isLoggedInAsync(function(n){e.authenticate&&!n&&(t.preventDefault(),o.path("/login"))})})}angular.module("bodyMass").run(t),t.$inject=["$rootScope","$location","Auth"]}(),function(){"use strict";function t(t,o){var n=[];n.push({name:"login",url:"/login",templateUrl:"app/components/account/login/login.html",controller:"LoginController",controllerAs:"login"}),n.push({name:"createAccount",url:"/create-account",templateUrl:"app/components/account/create/create.html",controller:"CreateAccountController",controllerAs:"create"}),n.forEach(function(o){t.state(o)}),o.otherwise("/login")}angular.module("bodyMass").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("bodyMass").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t,o,n,e){t.html5Mode(!0),o.interceptors.push("authInterceptor"),n.debugEnabled(!0),e.options.timeOut=3e3,e.options.positionClass="toast-top-right",e.options.preventDuplicates=!0,e.options.progressBar=!0}function o(t,o,n,e){return{request:function(t){return t.headers=t.headers||{},n.get("token")&&(t.headers.Authorization="Bearer "+n.get("token")),t},responseError:function(t){return 401===t.status?(e.path("/login"),n.remove("token"),o.reject(t)):o.reject(t)}}}angular.module("bodyMass").config(t).factory("authInterceptor",o),t.$inject=["$locationProvider","$httpProvider","$logProvider","toastr"],o.$inject=["$rootScope","$q","$cookieStore","$location"]}(),angular.module("bodyMass").run(["$templateCache",function(t){t.put("app/components/account/create/create.html",'<div class="container"><div class="row create-account"><div class="col-xs-12 col-md-6 col-md-offset-3"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Create Account</h3></div><div class="panel-body"><form ng-submit="create.submit()" novalidate=""><div class="form-group"><label>Name</label> <input ng-model="create.formdata.name" class="form-control"></div><div class="form-group"><label>email</label> <input type="email" ng-model="create.formdata.email" class="form-control"></div><div class="form-group"><label>Password</label> <input type="password" ng-model="create.formdata.password" class="form-control"></div><div class="form-group"><div class="col-xs-12 col-md-4 col-md-offset-4"><button type="submit" class="btn btn-success btn-block">Send</button></div></div></form></div></div></div></div></div>'),t.put("app/components/account/login/login.html",'<div class="container"><div class="row login"><h1 class="text-center">Body Mass</h1><div class="col-xs-12 col-md-6 col-md-offset-3"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Login</h3></div><div class="panel-body"><form ng-init="login.formdata = {};" ng-submit="login.submit()" novalidate=""><div class="form-group"><label>Email</label> <input class="form-control" ng-model="login.formdata.email"></div><div class="form-group"><label>Password</label> <input type="password" class="form-control" ng-model="login.formdata.password"></div><div class="row"><div class="col-xs-12 col-md-6 col-md-offset-3 form-group"><button type="submit" class="btn btn-success btn-block">Join</button></div></div><div class="row text-right"><a ui-sref="createAccount" href="/create-account" class="btn btn-link">Create Account</a></div></form></div></div></div></div></div>')}]);