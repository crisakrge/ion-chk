angular.module('MejorChkte.controllers', [])


//===============================================================
//               Controlador Principal de la APP
//===============================================================
.controller('ChkteCtrl', function($rootScope, $scope, $state, $ionicModal, $localstorage, $ionicPopup) {
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
  
  $rootScope.obtHoraPrint =  date.getHours() + ":" + minutos + ":" + seg + " hrs" ;
  $rootScope.obtHoraSave =  date.getHours() + "/" + minutos + "/" + seg + "hrs" ;
  $rootScope.obtFecha = date.getDate() + "/" + mes + "/" + date.getFullYear();

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
  $rootScope.mulUser = [];

  // Realizar el Regitro Simple
  $scope.doRegMul = function() {

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

//Controlador de la Pantalla de Bienvenida
.controller('homeCtrl', function() { 
})

//Controlador del Registro Simple
.controller('regSimCtrl', function($scope, $cordovaCamera, $cordovaFile, $localstorage) {
  $scope.RegSimImageName = "";
  //===============================================================
  //                 Toma y guardado de
  //=============================================================== 
  $scope.TakeUserSim = function() {
    // 2
    var options = {
      allowEdit : false,
      popoverOptions: CameraPopoverOptions,
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      cameraDirection: 0
    };
    
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

//Controlador del Registro Multiple
.controller('regMulCtrl', function($scope, $state, $ionicPopup, $rootScope, $localstorage) {  
})

//Controlador del Tipo de Registro de Asistencia
.controller('regTypeCtrl', function($scope, $state) {
})

//Controlador de la Confirmación del registro
.controller('regConfirmCtrl', function($scope, $state) {
})

//Controlador del Login
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

  //Lanzar el login Simple
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

//Controlador del Registro de Asistencia
.controller('AsistenciaCtrl', function(
  $scope,
  $state,
  $ionicPopup,
  $ionicModal,
  $cordovaCamera,
  $cordovaBarcodeScanner,
  $cordovaGeolocation){

  //$scope.asis = {};

  //Modal para seleccionar el tipo de registro
  $ionicModal.fromTemplateUrl('templates/regSelect.html',{
    scope: $scope
  }).then(function(modal){
    $scope.regSelect = modal;
  });

  //Lanzar el Modal para seleccionar el tipo de registro
  $scope.registroTipo = function() {
    $scope.regSelect.show();
    console.log("Lanzar Modal");
  };

  $scope.evniarRegType = function(){
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $scope.regSelect.show();
    console.log($scope.asis);

    $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.asis.lat  = position.coords.latitude
      $scope.asis.long = position.coords.longitude
    console.log( $scope.asis.lat);
    console.log( $scope.asis.long);
    }, function(err) {
      // error
    });
    console.log( $scope.asis.lat + $scope.asis.long);
    $scope.regSelect.hide();
  };

  $scope.launchBarcode = function(){
    //Alerta con los datos del còdigo QR
    var QrAlert = $ionicPopup.alert({
      title: '! Mejor Chkte ¡',
      template: 'Escanea tu código QR'
    });
    QrAlert.then(function(){
      $cordovaBarcodeScanner.scan()
      .then(function(barcodeData) {
        // Alerta con los datos del Qr
        var textoQr = barcodeData.text;
        var validarQr = textoQr.substring(0, 28);
        console.log(textoQr);
        console.log(validarQr);
        console.log(validarQr.length);

        if ( 'http://promociones.chkte.com' ==  validarQr ) {
          //var datosQr = $ionicPopup.alert({
            //title: '! Mejor Chkte ¡',
            //template: textoQr
          //});
          //Lanzar Funcion para el tipo de registro
          registroTipo
        } else { 
          var errorQr = $ionicPopup.alert({
            title: '! Mejor Chkte ¡',
            template: 'El Código utilizado no es de Chkte.com'
          });
        };
      }, function(error) {
        // An error occurred
      });
      //$cordovaBarcodeScanner.scan().then(function(imagenEscaneada){
        //Alerta con los datos del còdigo QR
        //var datosQr = $ionicPopup.alert({
          //title: '! Mejor Chkte ¡',
          //template: imagenEscaneada.text
        //});
        //datosQr.then(
          //pagina de selectión para el typo registro
          //$state.go('regType'),
          //$scope.lanzarAsis = function(){
          //$state.go('asis.chkte');
          //}
        //); 
      //};
    });
  };

  console.log($scope.asis);
  //Lanzar el registro de asistencia
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
    // Alerta de toma de fotografìa
    var AlertaPhotoAsistencia = $ionicPopup.alert({
     title: '! Mejor Chkte ',
     template: 'Tomate una fotografía para corroborar tu identidad' 
    });
    AlertaPhotoAsistencia.then(function(){
      console.log('lanzar Camara del teléfono');
      $cordovaCamera.getPicture(options).then(function() {
        // Alerta con Fecha y hora De la Foto
        var FotoTimeInfo = $ionicPopup.alert({
         title: '! Mejor Chkte ',
         template: 'La fotografia se tomo el ' + $scope.obtFecha + ' a las: ' + $scope.obtHoraPrint
        });

        FotoTimeInfo.then(function(){
          //Lanzar escaner de código QR
          $cordovaBarcodeScanner.scan()
          .then(function(barcodeData) {

            // Texto Escaneado
            var textoQr = barcodeData.text;
            var validarQr = textoQr.substring(0, 28);

            //Validar el texto del código QR
            if ('http://promociones.chkte.com' ==  validarQr) {

            //Abrir Tipo de Registro  
            $scope.regSelect.show();
            console.log("Lanzar Modal");
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