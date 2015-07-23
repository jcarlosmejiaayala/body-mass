!function(){"use strict";angular.module("bodyMass",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap"])}(),function(){"use strict";function n(){function n(n){var t=this;t.relativeDate=n(t.creationDate).fromNow()}var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:n,controllerAs:"vm",bindToController:!0};return n.$inject=["moment"],t}angular.module("bodyMass").directive("acmeNavbar",n)}(),function(){"use strict";angular.module("bodyMass").factory("User",["$resource",function(n){return n("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}])}(),function(){"use strict";angular.module("bodyMass").factory("Auth",["$location","$rootScope","$http","User","$cookieStore","$q",function(n,t,e,a,o,r){var i={};return o.get("token")&&(i=a.get()),{login:function(n,t){var s=t||angular.noop,c=r.defer();return e.post("/auth/local",{email:n.email,password:n.password}).success(function(n){return o.put("token",n.token),i=a.get(),c.resolve(n),s()}).error(function(n){return this.logout(),c.reject(n),s(n)}.bind(this)),c.promise},logout:function(){o.remove("token"),i={}},createUser:function(n,t){var e=t||angular.noop;return a.save(n,function(t){return o.put("token",t.token),i=a.get(),e(n)},function(n){return this.logout(),e(n)}.bind(this)).$promise},changePassword:function(n,t,e){var o=e||angular.noop;return a.changePassword({id:i._id},{oldPassword:n,newPassword:t},function(n){return o(n)},function(n){return o(n)}).$promise},getCurrentUser:function(){return i},isLoggedIn:function(){return i.hasOwnProperty("role")},isLoggedInAsync:function(n){i.hasOwnProperty("$promise")?i.$promise.then(function(){n(!0)})["catch"](function(){n(!1)}):n(i.hasOwnProperty("role")?!0:!1)},isAdmin:function(){return"admin"===i.role},getToken:function(){return o.get("token")}}}])}(),function(){"use strict";function n(n,t,e){function a(){r(),n(function(){i.classAnimation="rubberBand"},4e3)}function o(){e.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),i.classAnimation=""}function r(){i.awesomeThings=t.getTec(),angular.forEach(i.awesomeThings,function(n){n.rank=Math.random()})}var i=this;i.awesomeThings=[],i.classAnimation="",i.creationDate=1437584505034,i.showToastr=o,a()}angular.module("bodyMass").controller("MainController",n),n.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";function n(n,t,e){n.$on("$stateChangeStart",function(n,a){e.isLoggedInAsync(function(e){a.authenticate&&!e&&(n.preventDefault(),t.path("/login"))})})}angular.module("bodyMass").run(n),n.$inject=["$rootScope","$location","Auth"]}(),function(){"use strict";function n(n,t){n.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),t.otherwise("/")}angular.module("bodyMass").config(n),n.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("bodyMass").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function n(n,t,e,a,o){n.otherwise("/"),t.html5Mode(!0),e.interceptors.push("authInterceptor"),a.debugEnabled(!0),o.options.timeOut=3e3,o.options.positionClass="toast-top-right",o.options.preventDuplicates=!0,o.options.progressBar=!0}function t(n,t,e,a){return{request:function(n){return n.headers=n.headers||{},e.get("token")&&(n.headers.Authorization="Bearer "+e.get("token")),n},responseError:function(n){return 401===n.status?(a.path("/login"),e.remove("token"),t.reject(n)):t.reject(n)}}}angular.module("bodyMass").config(n).factory("authInterceptor",t),n.$inject=["$urlRouterProvider","$locationProvider","$httpProvider","$logProvider","toastr"],t.$inject=["$rootScope","$q","$cookieStore","$location"]}(),angular.module("bodyMass").run(["$templateCache",function(n){n.put("app/main/main.html",'<div class="container"><div><acme-navbar creationdate="main.creationDate"></acme-navbar></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p class="animated infinite" ng-class="main.classAnimation"><button type="button" class="btn btn-lg btn-success" ng-click="main.showToastr()">Splendid Toastr</button></p><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></div><div class="row"><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><div class="caption"><h3>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p><p><a ng-href="{{awesomeThing.url}}">{{ awesomeThing.url }}</a></p></div></div></div></div></div>'),n.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></div></div></nav>')}]);