var app = angular.module('starter.services', [])

app.constant('URLServidor', 'http://www.chkte.com/services/');

app.factory('singleUserFactory', function($http, $sce, URLServidor, $rootScope){
	return{
	    doRegSim : function(singleUserObj){
	      
	      var urlCompleta = URLServidor + 'insertaUserSimple.php';
	      var postUrl = $sce.trustAsResourceUrl(urlCompleta);
	      $http.post(postUrl, singleUserObj)
	      .then(
	        function(){
	          alert('El registro se ha guardado con exito')
	          //console.log('DATOS');
	        },
	        function(){
	          alert('Error!');
	        }
	       );
		}
	};
});

app.factory('mulUserFactory', function($http, $sce, URLServidor, $rootScope){
  return{
    doRegMul : function(singleUse){
      
      var urlCompleta = URLServidor + 'insertaUserMulti.php';
      var postUrl = $sce.trustAsResourceUrl(urlCompleta);
      $http.post(postUrl, singleUse)
      .then(
        function(){
          alert('Exito')
          //console.log('DATOS');
        },
        function(){
          alert('Fail!');
        }
       );
  }
};
});

app.factory('asisUserFactory', function($http, $sce, URLServidor, $rootScope){
  return{
    evniarRegType : function(asisUser){
      
      var urlCompleta = URLServidor + 'regAsis.php';
      var postUrl = $sce.trustAsResourceUrl(urlCompleta);
      $http.post(postUrl, asisUser)
      .then(
        function(){
          alert('Exito')
          //console.log('DATOS');
        },
        function(){
          alert('Fail!');
        }
       );
	  }
	};
});