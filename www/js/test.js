
  //Tomar Fotografía
  $scope.regSimPick = function() {
    var opcionesFoto = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      cameraDirection: 1
    }

    $cordovaCamera.getPicture(opcionesFoto)
    .then(function(sourcePath) {
      var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
      var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);

      console.log("Copying : " + sourceDirectory + sourceFileName);
      console.log("Copying " + cordova.file.dataDirectory + sourceFileName);

      $cordovaFile.copyFile(sourceDirectory, sourceFileName, cordova.file.dataDirectory, sourceFileName).then(
        function(success) {
          $scope.RegSimImageName = cordova.file.dataDirectory + sourceFileName;
        }, function(error) {
          console.dir(error);
        }
      );
    },
    function(err) {
      console.log(err);
    });


    function onSuccess(data) {
      $scope.$apply(function () {
        /*
        remember to set the image ng-src in $apply,
        i tried to set it from outside and it doesn't work.
        */
        $scope.regPicture = "data:image/jpeg;base64," + data;
      });
      //var image = document.getElementById('myImage');
      //image.src = "data:image/jpeg;base64," + imageData;
      //console.log(image);
    };
    function onFail(message) {
      alert('Falló debido a: ' + message);
    };
    navigator.camera.getPicture(onSuccess, onFail, {
    });
  };