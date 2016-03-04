angular.module('starter.controllers', [])

.controller('initRegCtrl', function($scope) {
  $scope.regPick = function() {
    function onSuccess(data) {
      $scope.$apply(function () {
        /*
        remember to set the image ng-src in $apply,
        i tried to set it from outside and it doesn't work.
        */
        $scope.regPicture = "data:image/jpeg;base64," + data;
      });
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }
    function onFail(message) {
      alert('Falló debido a: ' + message);
    }
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      direction: 1
    });
  };
})

.controller('loginCtrl', function($scope, $state) {
  $scope.loginSend = function() {
    $state.go('chkte');
    $scope.loginChk.hide();
  };
})

.controller('initCtrl', function($scope, $ionicModal){
  $ionicModal.fromTemplateUrl('templates/registro.html',{
    scope: $scope
  }).then(function(registroChk){
    $scope.registroChk = registroChk;
  });
  $ionicModal.fromTemplateUrl('templates/login.html',{
    scope: $scope
  }).then(function(loginChk){
    $scope.loginChk = loginChk;
  });

})

.controller('loginCtrl', function($scope, $state) {
  $scope.loginSend = function() {
    $state.go('chkte');
    $scope.loginChk.hide();
  };

})

.controller('acercaCtrl', function($scope, $state) {
  $scope.myGoBack = function() {
    $state.go('chkte');
  };
})

.controller('regTypeCtrl', function($scope, $state) {
  $scope.registraTe = function() {
    $state.go('chkte');
  };
})

.controller('ChkteCtrl', function($scope, $ionicSideMenuDelegate, $state, $ionicPopup) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.registroInit = function() {
    
    $ionicPopup.alert({
       title: 'Chkte',
       template: 'Tomate una fotografía para corroborar tu identidad'
    });

    function onSuccess() {

    }

    function onFail() {
      alert('Falló debido a: ' + message);
    }

    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      direction: 1
    });

    $ionicPopup.alert({
       title: 'Chkte',
       template: 'Escanea el código Qr para continuar con tu registro'
    });
  };
})


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}