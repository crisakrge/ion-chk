// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MejorChkte', ['ionic', 'ngCordova', 'MejorChkte.controllers'])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.run(function($ionicPlatform, $localstorage) {
  // Resetear Registro
  //window.localStorage.removeItem("yaRegistradoS");window.localStorage.removeItem("yaRegistradoM");window.localStorage.removeItem("UsuarioSimple");
  // Validación de usuario registrado
  console.log('Tipo de Registro "' + $localstorage.get('yaRegistradoS') + " " + $localstorage.get('yaRegistradoM') + '"');

  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  // Extracto del estado del Home
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  // Extracto del estado Login Simple
  .state('loginSim', {
    url: '/loginS',
    templateUrl: 'templates/loginSim.html',
    controller: 'loginCtrl'
  })

  // Extracto del estado Login Multiple
  .state('loginMul', {
    url: '/loginM',
    templateUrl: 'templates/loginMul.html',
    controller: 'loginCtrl'
  })

  // Estado para el Menú principal
  .state('asis', {
    url: '/asis',
    abstract: true,
    templateUrl: 'templates/menu.html'
    })

  // Extracto del estado del Chkte
  .state('asis.registro', {
    url: '/registro',
      views: {
        'chtkeView': {
          templateUrl: 'templates/chkte.html',
          controller: 'AsistenciaCtrl'
        }
      }
    })

  // Extracto del estado Tipo de Registro
  .state('regType', {
    url: '/tipoRegistro',
    templateUrl: 'templates/regSelect.html',
    controller: 'regTypeCtrl'
  })

  // Extracto de confirmaciòn de registro
  .state('regConfirm', {
    url: '/confirmacion-registro',
    templateUrl: 'templates/regConfirm.html',
    controller: 'regConfirmCtrl'
  })
  
  // Extracto del estado del Administrador
  .state('asis.admin', {
    url: '/admin',
      views: {
        'chtkeView': {
          templateUrl: 'templates/admin.html'
        }
      }
  })

  // Extracto del estado de la página Acerca De
  .state('asis.acerca', {
    url: '/acercaDe',
      views: {
        'chtkeView': {
          templateUrl: 'templates/acercade.html'
        }
      }
  })

  //$urlRouterProvider.otherwise('/home');
  if(window.localStorage['yaRegistradoS']){
  $urlRouterProvider.otherwise('/loginS');
  }
  else if(window.localStorage['yaRegistradoM']){
  $urlRouterProvider.otherwise('/loginM');
  }
  else{
  $urlRouterProvider.otherwise('/home');
  }  
})

//Cambiar campos a Minusculas
.directive('lowercase', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var lowercase = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var lowercased = inputValue.toLowerCase();
          if (lowercased !== inputValue) {
            modelCtrl.$setViewValue(lowercased);
            modelCtrl.$render();
          }
          return lowercased;
        }
        modelCtrl.$parsers.push(lowercase);
        lowercase(scope[attrs.ngModel]); // lowercase initial value
      }
    };
})

//Cambiar campos a Mayusculas
.directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
});
