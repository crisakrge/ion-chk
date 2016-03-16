// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform) {
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

  // Extracto del estado del Init
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  // Extracto del estado del Init
  .state('init', {
    url: '/init',
    templateUrl: 'templates/init.html'
  })

  // Estado para el Menú principal
  .state('chkt', {
    url: '/chkt',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
    })

  // Extracto del estado del Chkte
  .state('chkt.registro', {
    url: '/registro',
      views: {
        'chtkeView': {
          templateUrl: 'templates/chkte.html',
          controller: 'ChkteCtrl'
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
  .state('chkt.admin', {
    url: '/admin',
      views: {
        'chtkeView': {
          templateUrl: 'templates/admin.html'
        }
      }
  })

  // Extracto del estado de la página Acerca De
  .state('chkt.acerca', {
    url: '/acercaDe',
      views: {
        'chtkeView': {
          templateUrl: 'templates/acercade.html'
        }
      }
  })

  $urlRouterProvider.otherwise('/home');
})

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}