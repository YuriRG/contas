app.config(function($routeProvider, $locationProvider) {
	// user the HTML 5 History API
	//$locationProvider.html5Mode(true);
	
	$locationProvider.hashPrefix('');//Remove href="#!/, das paginas html
	
    $routeProvider
    .when("/", {
    	templateUrl : "view/contas.html",
        controller : "contasCtrl"
    })
    .when("/contas", {
    	templateUrl : "view/contas.html",
        controller : "contasCtrl"
    })
    .when("/historico", {
    	templateUrl : "view/contapaga.html",
        controller : "contaPagaCtrl"
    })    
    .otherwise(/*{
        template : "<h1>Sem página</h1><p>Url inválida!! {{$location.path()}}</p>"
    }*/
    		//{redirectTo: '/'}
    		{redirectTo: 'contas/'}
    );
    
    //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

});