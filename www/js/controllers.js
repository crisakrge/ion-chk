angular.module('starter.controllers', [])


//Controlador Principal
.controller('AppCtrl', function($scope, $state) {

  // Declaración de la variable para los datos del usuario 
  $scope.sigleUser = {};

})

//Controlador de la Pantalla de Bienvenida
.controller('homeCtrl', function($scope, $state, $ionicModal) {
  
  //Lanzar el Modal Individual
  $scope.individual = function() {
    $scope.regSim.show();
  };

  //Lanzar el Modal Individual
  $scope.multiple = function() {
    $scope.regMul.show();
  };

  //Modal del Registro Simple
  $ionicModal.fromTemplateUrl('templates/regSim.html',{
    scope: $scope
  }).then(function(modal){
    $scope.regSim = modal;
  });

  //Modal del Registro Multiple
  $ionicModal.fromTemplateUrl('templates/regMul.html',{
    scope: $scope
  }).then(function(modal){
    $scope.regMul = modal;
  });

})

//Controlador del Registro Simple
.controller('regSimCtrl', function($scope, $ionicPopup, $state, $localstorage) {
  $scope.simple = "Individual";

  //Tomar Fotografía
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
      console.log(image);
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

  // Realizar el Regitro Simple
  $scope.doRegSim = function() {
    console.log('Se realizó el Registo Simple', $scope.singleUser);

    // Alerta de Registro Exitoso
    var alertaRegSim = $ionicPopup.alert({
     title: '! Mejor Chkte ',
     template: 'Tu registro se ha realizado con éxito'
    });

    alertaRegSim.then(function(){
      $state.go('loginSim');
      $scope.regSim.hide()
      $localstorage.set('yaRegistradoS', 'Si Simple');
      console.log( localStorage.getItem("yaRegistradoS") )
    });
  };
})

//Controlador del Registro Multiple
.controller('regMulCtrl', function($scope, $state, $ionicPopup, $rootScope, $localstorage) {
  $scope.multiple = "Multiple";

  // Realizar el Regitro Multiple
  $scope.doRegMul = function() {
    console.log('Se realizó el Registo Multiple', $scope.singleUser);

    // Alerta de Registro Exitoso
    var alertaRegMul = $ionicPopup.alert({
     title: '! Mejor Chkte ',
     template: 'Tu registro se ha realizado con éxito'
    });

    alertaRegMul.then(function(){
      $state.go('loginMul');
      $scope.regMul.hide()
      $localstorage.set('yaRegistradoM', 'Si Multiple');
      console.log( localStorage.getItem("yaRegistradoM") )
    });
  };
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
.controller('loginCtrl', function($scope, $ionicModal) {

  //Lanzar el Modal Individual
  $scope.logIn= function(){
    console.log("Abrir Login");
    $scope.loginModal.show();
  };

  //Modal del Registro Simple
  $ionicModal.fromTemplateUrl('templates/login.html',{
    scope: $scope
  }).then(function(modal){
    $scope.loginModal = modal;
  });
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