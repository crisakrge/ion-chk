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
  .state('init', {
    url: '/init',
    templateUrl: 'templates/init.html'
  })
  // Extracto del estado del Chkte
  .state('chkte', {
    url: '/chkte',
    templateUrl: 'templates/chkte.html',
    controller: 'ChkteCtrl'

  })
  // Extracto del estado Tipo de Registro
  .state('regType', {
    url: '/tipoRegistro',
    templateUrl: 'templates/regSelect.html',
    controller: 'regTypeCtrl'
  })
  // Extracto del estado de la página Acerca De
  .state('acerca', {
    url: '/acercaDe',
    templateUrl: 'templates/acercade.html',
    controller: 'acercaCtrl'
  })

  $urlRouterProvider.otherwise('/init');
})

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}