angular.module('starter.controllers', [])


//Controlador Principal
.controller('AppCtrl', function($scope, $state) {
})

//Controlador de la Pantalla de Bienvenida
.controller('homeCtrl', function($scope, $state, $ionicModal) {
  $scope.individual = function(){
    $state.go('chkt.regsimple');
  };
  $scope.multiple = function(){
    $state.go('chkt.regmultiple');
  };
  $ionicModal.fromTemplateUrl('templates/regSim.html',{
    scope: $scope
  }).then(function(regSim){
    $scope.regSim = regSim;
  });
  $ionicModal.fromTemplateUrl('templates/regMul.html',{
    scope: $scope
  }).then(function(regMul){
    $scope.regMul = regMul;
  });
})

//Controlador del Registro Simple
.controller('regSimCtrl', function($scope, $ionicPopup) {
  $scope.simple = "Individual";
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

  $scope.usuario = {nombre: "", mail: "", pass: "", key: "", cli: ""};

  $scope.enviarReg = function(){

    

    var registroAlert = $ionicPopup.alert({
     title: '! Mejor Chkte ',
     template: 'Registro Realizado con Éxito'
    });

    registroAlert.then(function(){
      $scope.registroChk.hide();
    });
  };
})

//Controlador del Registro Multiple
.controller('regMulCtrl', function($scope, $state, $cordovaTouchID) {
  $scope.multiple = "Multiple";
  $scope.loginSend = function() {
    $cordovaTouchID.checkSupport().then(function() {
            $cordovaTouchID.authenticate("Mejor Chkte ID").then(function() {
                $state.go('chkt.registro');
                $scope.regMul.hide();
            }, function(error) {
                console.log(JSON.stringify(error));
            });
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    console.log('Que pasiòn');

    //$state.go('chkt.registro');
    //$scope.loginChk.hide();
  };
})


//Controlador de los Popups de registro y login
.controller('initCtrl', function($scope, $ionicModal, $state){
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

//Controlador del Tipo de Registro de Asistencia
.controller('regTypeCtrl', function($scope, $state) {
  $scope.registraTe = function() {
    $state.go('chkt.registro');
  };
})

//Controlador de la Confirmación del registro
.controller('regConfirmCtrl', function($scope, $state) {

})

//Controlador del Login
.controller('loginCtrl', function($scope, $state, $cordovaTouchID) {

  

  $scope.loginSend = function() {
    $cordovaTouchID.checkSupport().then(function() {
            $cordovaTouchID.authenticate("Mejor Chkte ID").then(function() {
                $state.go('chkt.registro');
                $scope.loginChk.hide();
            }, function(error) {
                console.log(JSON.stringify(error));
            });
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    console.log('Que pasiòn');

    //$state.go('chkt.registro');
    //$scope.loginChk.hide();
  };
})

//Controlador del Registro de Asistencia
.controller('ChkteCtrl', function($scope, $state, $ionicPopup, $cordovaBarcodeScanner) {

  $scope.registroInit = function() {
    
    // Alerta de toma de fotografìa
    var photoAlert = $ionicPopup.alert({
     title: '! Mejor Chkte ',
     template: 'Tomate una fotografía para corroborar tu identidad'
    });

    // Al clickear la alerta
    photoAlert.then(function() {

      console.log('Alerta de la toma de fotografía');

      // Llamada a la cámara del dispositivo
      var takePhoto = navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        direction: 0
      });


      // Si la foto es satisfactoria se continua el proceso de registro
      function onSuccess() {
        // Alerta para escaneo de código Qr
        var qrAlert = $ionicPopup.alert({
        title: '! Mejor Chkte ¡',
        template: 'Escanea tu código QR para continuar tu registro.'
        });

        // Al clickear la alerta se inicia el escaner del QR
        qrAlert.then(

            $scope.leerCodigo = function(){
              $cordovaBarcodeScanner.scan().then(function(imagenEscaneada){
                var qrAlert = $ionicPopup.alert({
                title: '! Mejor Chkte ¡',
                template: imagenEscaneada.text
                });
              }, function(error){
                alert("Ha ocurrido un error:"+ error);
              });
            }

          );
      };

      // Si ocurre algún error al tomar la fotografía
      function onFail() {
        alert('Falló debido a: ' + message);
      };
    });
  };
})

//Inicialización de La cámara
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}