angular.module('MejorChkte.controllers', ['starter.services'])

//===============================================================
//               Controlador Principal de la APP
//===============================================================
.controller('ChkteCtrl', function($rootScope, $scope, $state, $ionicModal, $localstorage, $ionicPopup, singleUserFactory, mulUserFactory, asisUserFactory, $cordovaDevice) {
  //Funciones y Variables para obtener la fecha y hora
  var date = new Date();
  var mes = date.getMonth() + 1;
  if (mes<10){
    mes = '0' + mes;
  };
  var minutos = date.getMinutes();
  if (minutos<10){
    minutos = '0' + minutos;
  };
  var seg = date.getSeconds();
  if (seg<10){
    seg = '0' + seg;
  };
  
  //Variables para obtener la hora y la fecha
  $rootScope.obtHoraPrint =  date.getHours() + ":" + minutos + ":" + seg + " hrs" ;
  $rootScope.obtHoraSave =  date.getHours() + "/" + minutos + "/" + seg + "hrs" ;
  $rootScope.obtFecha = date.getDate() + "/" + mes + "/" + date.getFullYear();

  //Datos para el Administrador
  $rootScope.adminData = {
    "nombre" : "Emmanuel",
    "pass" : "Zunfeld"
  };
  $rootScope.touchIdData = {"valor":false};
  $localstorage.set('funcionTouchId', $rootScope.touchIdData);

  //Objeto para la asistencia
  $rootScope.asis = {};

  //Modal del Registro Simple
  $ionicModal.fromTemplateUrl('templates/regSim.html',{
    scope: $scope
  }).then(function(modal1){
    $scope.regSim = modal1;
  });

  //Modal del Registro Multiple
  $ionicModal.fromTemplateUrl('templates/regMul.html',{
    scope: $scope
  }).then(function(modal2){
    $scope.regMul = modal2;
  });

  //Lanzar el Modal Registro Individual
  $scope.individual = function() {
    $scope.regSim.show();
  };

  //Lanzar el Modal Registro Multiple
  $scope.multiple = function() {
    $scope.regMul.show();
  };

  //Modal del Login Administrador
  $ionicModal.fromTemplateUrl('templates/adminLogin.html',{
    scope: $scope
  }).then(function(modal3){
    $scope.adminLogin = modal3;
  });

  //Lanzar el Modal Registro Individual
  $scope.administradorLogin = function() {
    $scope.adminLogin.show();
  };

  //===============================================================
  //                  Registro Individual
  //===============================================================
  $scope.simple = "Individual";


  // Declaración de la variable para los datos del usuario 
  $rootScope.singleUser = {};

  // Realizar el Regitro Simple
  $scope.doRegSim = function() {

    singleUserFactory.doRegSim($rootScope.singleUser);
    console.log('Se realizó el Registo Simple', $rootScope.singleUser);

    // Alerta de Registro Exitoso
    var alertaRegSim = $ionicPopup.alert({
     title: '! Mejor Chkte ',
     template: 'Tu registro se ha realizado con éxito'
    });

    //Cerrar Modal y Mandar registro al Localstorage
    alertaRegSim.then(function(){
      $state.go('loginSim');
      $scope.regSim.hide();
      $localstorage.set('yaRegistradoS', 'Si Simple');
      $localstorage.set('imagenUsuario', $scope.regPicture);
      $localstorage.setObject('UsuarioSimple', $rootScope.singleUser); 
      console.log( $localstorage.get("yaRegistradoS") );  
      console.log( $localstorage.get("imagenUsuario") );  
      console.log( $localstorage.getObject("UsuarioSimple") );
    });
  };

  //===============================================================
  //                  Registro Multiple
  //===============================================================

  // Variable Registro Individual
  $scope.multiple = "Multiple";
  // Declaración de la variable para los datos del usuario 
  $rootScope.mulUser = {};

  // Realizar el Regitro Simple
  $scope.doRegMul = function() {
    mulUserFactory.doRegMul($rootScope.mulUser);
    console.log('Se realizó el Registo Multiple', $rootScope.mulUser);

    // Alerta de Registro Exitoso
    var alertaRegMul = $ionicPopup.alert({
     title: '! Mejor Chkte ',
     template: 'Tu registro se ha realizado con éxito'
    });

    //Cerrar Modal y Mandar registro al Localstorage
    alertaRegMul.then(function(){
      $state.go('loginMul');
      $scope.regMul.hide();
      $localstorage.set('yaRegistradoM', 'Si Multiple');
      $localstorage.setObject('UsuarioMultiple', $rootScope.mulUser);  
      console.log( $localstorage.get("yaRegistradoM") );  
      console.log( $localstorage.getObject("UsuarioMultiple") );
    });
  };
})

//===============================================================
//              Controlador de la pantalla de registro
//=============================================================== 
.controller('homeCtrl', function() { 
})


//===============================================================
//              Controlador del Registro Simple
//=============================================================== 
.controller('regSimCtrl', function($scope, $cordovaCamera, $cordovaFile, $localstorage) {
  $scope.RegSimImageName = "";
  // Toma y guardado de Imangen de Registro
  $scope.TakeUserSim = function() {
    // Opciones para la cámara
    var options = {
      allowEdit : false,
      popoverOptions: CameraPopoverOptions,
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      cameraDirection: 0
    };
    
    //Lanzar Fotografía
    $cordovaCamera.getPicture(options).then(function(sourcePath) {
      var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
      var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);
      console.log("Copying : " + sourceDirectory + sourceFileName);
      console.log("Copying " + cordova.file.dataDirectory + sourceFileName);

      $cordovaFile.copyFile(sourceDirectory, sourceFileName, cordova.file.dataDirectory, sourceFileName).then(function(success) {
         $scope.UserImageSim = cordova.file.dataDirectory + sourceFileName;
         $localstorage.set('imagenUsuarioSim', $scope.UserImageSim);
        console.log( $localstorage.get("imagenUsuarioSim") );  
      }, function(error) {
         console.dir(error);
      });
    }, function(err) {
         console.log(err);
    });
  };
})

//===============================================================
//              Controlador del Registro Multiple
//=============================================================== 
.controller('regMulCtrl', function($scope, $state, $ionicPopup, $rootScope, $localstorage) {  
})

//Controlador del Tipo de Registro de Asistencia
.controller('regTypeCtrl', function($scope, $state) {
})

//Controlador de la Confirmación del registro
.controller('regConfirmCtrl', function($scope, $state) {
})

//===============================================================
//              Controlador del Administrador
//=============================================================== 
.controller('adminCtrl', function($scope, $state, $ionicPopup, $ionicHistory, $localstorage) {

  //Envio de datos de Administrador
  $scope.adminInput = {};

  //Validación del registro de administrador
  $scope.adminLogIn = function(){
    //si el usuario y contraseña son correctos
    if ( $scope.adminInput.nombre == $scope.adminData.nombre && $scope.adminInput.pass == $scope.adminData.pass) {
      $state.go('admin').then(
          $scope.adminLogin.hide()
      );
      $scope.adminInput = {};     
    } else {
      //si el usuario es correcto pero contraseña es incoreecta
      if ($scope.adminInput.nombre == $scope.adminData.nombre) {
        var alertaAdminDataWrong = $ionicPopup.alert({
         title: '! Mejor Chkte ¡',
         template: 'El Password del Administrador es Incorrecto'
        });
      //si la contraseña es correcta pero el usuario es incoreecto
      } else if ($scope.adminInput.pass == $scope.adminData.pass) {
        var alertaAdminDataWrong = $ionicPopup.alert({
         title: '! Mejor Chkte ¡',
         template: 'El Nombre del Administrador es Incorrecto'
        });
      //si ambos datos son incorrectos
      } else {
        var alertaAdminDataWrong = $ionicPopup.alert({
         title: '! Mejor Chkte ¡',
         template: 'Los Datos de Acceso son Incorrectos'
        });
      }
    };
  };
  $scope.touchId={};
  //Guardar Cambios en el Administrador
  $scope.saveAdminData = function(){
    //Guardar el valor del touch ID
    $localstorage.set('funcionTouchId', $scope.touchId.valor);
    //$scope.touchId = $scope.touchIdData;
    console.log("Cambios Guardados");
    console.log($scope.touchIdData);
    console.log($scope.touchId.valor);
    console.log($localstorage.get('funcionTouchId'));
    // Alerta de Registro Exitoso
    var alertaSaveAdmin = $ionicPopup.alert({
     title: '! Mejor Chkte ',
     template: 'Tus datos se han guardado con éxito'
    });
    alertaSaveAdmin.then(function(){
      $ionicHistory.goBack();
    })
  };

  //Cancelar Cambios en el Administrador
  $scope.adminCancel = function(){
    console.log("Cancelando Cambios");
    $ionicHistory.goBack();
  };
})

//===============================================================
//                Controlador del Login
//=============================================================== 
.controller('loginCtrl', function($scope, $ionicModal, $localstorage, $rootScope, $state, $ionicPopup) {
  $rootScope.singleUser = $localstorage.getObject("UsuarioSimple");
  $rootScope.singleUserImage = $localstorage.get("imagenUsuarioSim");
  $rootScope.mulUser = $localstorage.getObject("UsuarioMultiple");

  //Lanzar el login Simple
  $scope.logInSim= function(){
    console.log("Abrir Login");
      console.log( $localstorage.getObject("UsuarioSimple") );
      console.log( $rootScope.singleUser );
    $scope.loginModal.show();
  };

  //Lanzar el login Multiple
  $scope.logInMul= function(){
    console.log("Abrir Login");
      console.log( $localstorage.getObject("UsuarioMultiple") );
      console.log( $rootScope.mulUser );
    $scope.loginModal.show();
  };

  //Modal del Registro Simple
  $ionicModal.fromTemplateUrl('templates/login.html',{
    scope: $scope
  }).then(function(modal){
    $scope.loginModal = modal;
  });

  //Envio de datos de Acceso
  $scope.loginDataSim = {};
  $scope.sendLoginSim = function(){

    console.log('Datos del Login', $scope.loginDataSim.pass);


    if ( $scope.loginDataSim.pass == $scope.singleUser.pass ) {
      $state.go('asis.registro').then(
          $scope.loginModal.hide()
        );
      
    } else {
      var alertaRegSim = $ionicPopup.alert({
       title: '! Mejor Chkte ¡',
       template: 'El Password es incorrecto'
      });
    }
  }
})

//===============================================================
//             Controlador del Registro de Asistencia
//=============================================================== 
.controller('AsistenciaCtrl', function(
  $rootScope,
  $scope,
  $state,
  $ionicPopup,
  $ionicModal,
  $cordovaCamera,
  $cordovaBarcodeScanner,
  $cordovaGeolocation,
  $localstorage){


  $rootScope.datosAsis = {};
  $scope.datosUsuario = $localstorage.getObject("UsuarioSimple");

  $scope.datosAsis.cli = $scope.datosUsuario.cli ; 
  $scope.datosAsis.nombre = $scope.datosUsuario.name ;


  console.log( "Los datos del usuario son:" );
  console.log( $scope.datosUsuario );
  console.log( "Los datos de la asistencia:" );
  console.log( $scope.datosAsis );

  //Modal para de selección de Registro
  $ionicModal.fromTemplateUrl('templates/regSelect.html',{
    scope: $scope
  }).then(function(modal){
    $scope.regSelect = modal;
  });


  

  // 
  // Lanzar el Registro de Asistencia
  //
  $scope.initAsis = function() {
    // Opciones para la toma de la fotografía
    var options = {
      allowEdit : false,
      popoverOptions: CameraPopoverOptions,
      quality: 30,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      cameraDirection: 1
    };

    // Alerta de toma de fotografía
    var AlertaPhotoAsistencia = $ionicPopup.alert({
     title: '! Mejor Chkte ',
     template: 'Tomate una fotografía para corroborar tu identidad' 
    });

    // Alerta de toma de fotografía
    AlertaPhotoAsistencia.then(function(){
      console.log('lanzar Camara del teléfono');
      $cordovaCamera.getPicture(options).then(function() {
        // Alerta con Fecha y hora De la Foto
        var FotoTimeInfo = $ionicPopup.alert({
         title: '! Mejor Chkte ',
         template: 'La fotografia se tomo el ' + $scope.obtFecha + ' a las: ' + $scope.obtHoraPrint
        });
        $scope.datosAsis.fecha = $scope.obtFecha;
        $scope.datosAsis.hora = $scope.obtHoraPrint;

        FotoTimeInfo.then(function(){
          //Lanzar escaner de código QR
          $cordovaBarcodeScanner.scan()
          .then(function(barcodeData) {

            // Texto Escaneado
            var textoQr = barcodeData.text;
            $scope.datosAsis.nombreQr = barcodeData.text;
            var validarQr = textoQr.substring(0, 28);

            console.log( "Los datos de la asistencia:" );
            console.log( $scope.datosAsis );
            //Validar el texto del código QR
            if ('http://promociones.chkte.com' ==  validarQr) {

              //Abrir Tipo de Registro  
              $scope.regSelect.show();
              console.log("Lanzar Modal");
              $scope.evniarRegType = function(){
                var posOptions = {timeout: 10000, enableHighAccuracy: true};
                $scope.regSelect.show();

                $cordovaGeolocation.getCurrentPosition(posOptions)
                .then(function (position) {
                  $scope.datosAsis.lat  = position.coords.latitude
                  $scope.datosAsis.long = position.coords.longitude
                console.log( $scope.datosAsis.lat);
                console.log( $scope.datosAsis.long);
                $scope.datosAsis.linkMaps = "https://www.google.es/maps/place/" + $scope.datosAsis.lat + "," + $scope.datosAsis.long;
                console.log("https://www.google.es/maps/place/" + $scope.datosAsis.lat + "," + $scope.datosAsis.long);
                console.log($scope.datosAsis.linkMaps);
                console.log($scope.datosAsis);
                }, function(err) {
                  // error
                });
                console.log( $scope.datosAsis.lat + $scope.datosAsis.long);
                $scope.regSelect.hide();
              };
            }
            else { 
              //Alerta de código QR Erroneo
              var errorQr = $ionicPopup.alert({
                title: '! Mejor Chkte ¡',
                template: 'El Código utilizado no es de Chkte.com'
              });
            };
          });
        });
      }, function(err) {
           console.log(err);
      });
    });
  };
})