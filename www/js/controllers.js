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
  var obtHoraPrint =  date.getHours() + ":" + minutos + ":" + seg + "hrs" ;
  var obtHoraSave =  date.getHours() + "/" + minutos + "/" + seg + "hrs" ;
  var obtFecha = date.getDate() + "/" + mes + "/" + date.getFullYear();

  //Instanciamos el objeto registroAsis
  function registroAsis(cliente, userName, fotoName, asisType, asisLatitude, asisLongitude, QRname, asisFecha, asisHora, asisUsername) {
    this.cliente = cliente;
    this.user = user;
    this.fotoName = fotoName;
    this.asisType = asisType;
    this.asisLatitude = asisLatitude;
    this.asisLongitude = asisLongitude;
    this.QRname = QRname;
    this.asisfecha = fecha;
    this.asishora = hora;
    this.asisuserName = userName;
  } 

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
  //                  Variable de Nombre
  //===============================================================

  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i=0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

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
.controller('homeCtrl', function($scope, $state, $ionicModal) { 
})

//Controlador del Registro Simple
.controller('regSimCtrl', function($scope, $cordovaCamera, $cordovaFile) {
  $scope.RegSimImageName = "";

  //===============================================================
  //                 Toma y guardado de
  //===============================================================

// 1
$scope.images = [];
 
$scope.addImage = function() {
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
  
  // 3
  $cordovaCamera.getPicture(options).then(function(imageData) {
 
    // 4
    onImageSuccess(imageData);
 
    function onImageSuccess(fileURI) {
      createFileEntry(fileURI);
    }
 
    function createFileEntry(fileURI) {
      window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
    }
 
    // 5
    function copyFile(fileEntry) {
      var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
      var newName = makeid() + name;
 
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
        fileEntry.copyTo(
          fileSystem2,
          newName,
          onCopySuccess,
          fail
        );
      },
      fail);
    }
    
    // 6
    function onCopySuccess(entry) {
      $scope.$apply(function () {
        $scope.images.push(entry.nativeURL);
      });
    }
 
    function fail(error) {
      console.log("fail: " + error.code);
    }
 
    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
      for (var i=0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
 
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
.controller('AsistenciaCtrl', function($scope, $state, $ionicPopup, $cordovaBarcodeScanner) {
  //Instanciamos el objeto registroAsis
  function registroAsis(cliente, user, fotoName, asisType, asisLatitude, asisLongitude, QRname, asisFecha, asisHora, asisUserName) {
    this.cliente = cliente;
    this.user = user;
    this.fotoName = fotoName;
    this.asisType = asisType;
    this.asisLatitude = asisLatitude;
    this.asisLongitude = asisLongitude;
    this.QRname = QRname;
    this.asisFecha = asisFecha;
    this.asishora = asisHora;
    this.asisUserName = asisUserName;
  } 


  $scope.initAsis = function() {
    var registroAsistencia = new registroAsis('Zunfeld', 'Yo', 'Soy', 'Tu', 'Padre');

    // Alerta de toma de fotografìa
    var AlertaPhotoAsistencia = $ionicPopup.alert({
     title: '! Mejor Chkte ',
     template: 'Tomate una fotografía para corroborar tu identidad'
    });

    console.log( registroAsistencia );

    // Al clickear la alerta
    AlertaPhotoAsistencia.then(function() {
      console.log('Alerta de la toma de fotografía');
      // Llamada a la cámara del dispositivo
      var takePhoto = navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        cameraDirection: 1
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
              
              //Alerta con los datos del còdigo QR
              var datosQr = $ionicPopup.alert({
                title: '! Mejor Chkte ¡',
                template: imagenEscaneada.text
              });

              datosQr.then(
                //pagina de selectión para el typo registro
                $state.go('regType'),
                $scope.lanzarAsis = function(){
                  $state.go('asis.chkte');
                }
              );
              
            },
            // Si ocurre algún error al escanear el código
            function(error){
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