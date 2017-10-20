app.controller("menuCtrl", function($scope, $filter, $location, $uibModal, $http, $translate, ContasService) {
	
	$scope.usuario = {};
	$scope.saldoTotal = {};
	
	
	ContasService.saldoTotal(function onSuccess(response) {
		  // Handle success
		  var data = response.data;
		  var status = response.status;
		  var statusText = response.statusText;
		  var headers = response.headers;
		  var config = response.config;
		  
		  $scope.saldoTotal = data.saldoTotal;	  
	});
	
    // ================= Listener Saldo total    	

    /**
     * Recebe mensagem via broadcast
     */	
    var handleCallback = function (msg) {
    	
        $scope.$apply(function () {
            var json = JSON.parse( msg.data);
            
            $scope.saldoTotal = json.saldoTotal;
            $("#saldotot").html(json.saldoTotal);
            console.log("SALDO TOT: "+json.saldoTotal);
        });
    }
	
    try {
    var saldoTotalListener = new EventSource('/contas/rest/broadcast/saldototal/listener');
    saldoTotalListener.addEventListener('message', handleCallback, false);
    
    }catch(err) {
      console.log("===============LISTENER=============")
	  console.log("name: "+err.name); // ReferenceError
	  console.log("message: "+err.message); // lalala is not defined
	  console.log("stack: "+err.stack); // ReferenceError: lalala is not defined at ...

	}
	
	/**
	 * Mudando Controler
	 */			
	$scope.key = "br";
	$scope.changeLanguage = function (key) {
		if(key !== undefined
				&& key !== '') {
			$scope.key = key;
		}
	  $translate.use($scope.key);
	};
	
	$scope.sair = function () {
    	$http.get('logOutServlet')
    	  .then(function onSuccess(response) {
    		  
    		    var auth2 = gapi.auth2.getAuthInstance();
    		      auth2.signOut().then(function () {
    		        console.log('User signed out.');
    		      });
    		      
   
    		  
    	    // Handle success
    	    var data = response.data;
    	    var status = response.status;
    	    var statusText = response.statusText;
    	    var headers = response.headers;
    	    var config = response.config;
    	    

    	    window.location = (location.protocol+'//'+location.host+"/chat/");

    	    
    	  }).catch(function onError(response) {
    	    // Handle error
    	    var data = response.data;
    	    var status = response.status;
    	    var statusText = response.statusText;
    	    var headers = response.headers;
    	    var config = response.config;
    	    
    	    console.error("Status: "+status);
    	  });
	};
});