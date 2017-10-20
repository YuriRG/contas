app.controller("contaPagaCtrl", function($scope, $filter, $location, $uibModal, $http, $translate, ContaPagaService) {

    		$scope.lsConta = [];
    	
    	//===========================
		// ========== Filtro
    	//===========================
			$scope.filtro = {};
		
    	//===========================
		// ========== Filtro
    	//===========================

    	//===========================
    	//=========== funcoes tabela
    	//===========================

			$scope.select = ContaPagaService.selectTamanhoTabela();    	
	    	
			var fim = parseInt($scope.select.selectedOption.valor);
	    	//=========== Lista contas a pagar
	    	ContaPagaService.listaContasPaga(0, fim, false, null, function onSuccess(response) {
				  // Handle success
				  var data = response.data;
				  var status = response.status;
				  var statusText = response.statusText;
				  var headers = response.headers;
				  var config = response.config;
				  
				  $scope.lsConta = data.lsConta;
				  updateTableData(1, data.totalItens);
	
			});
	    	
			// ========== Dados Tabela Ordenação
			$scope.propertyName = 'x.id';
			$scope.reverse = true;
	
			/**
			 * Animação para ordenação de de colunas da tabela 
			 */
			$scope.sortBy = function(propertyName) {
				
				var jsonInicioFim = ContaPagaService.sortTableColumn($scope, propertyName);				
	
				
				ContaPagaService.listaContasPaga(jsonInicioFim.inicio, jsonInicioFim.fim, !$scope.reverse, propertyName, function onSuccess(response) {
					  // Handle success
					  var data = response.data;
					  var status = response.status;
					  var statusText = response.statusText;
					  var headers = response.headers;
					  var config = response.config;
					  
					  $scope.lsConta = data.lsConta;
					  updateTableData(1, data.totalItens);
	
				});
			};
			
			/**
			 * Atualiza dados da tabela
			 * 
			 * @return void
			 */
			function updateTableData(currentPage, totalItems) {
				  $scope.itemsPerPage = parseInt($scope.select.selectedOption.valor);
				  $scope.totalItems   = totalItems;
				  $scope.currentPage  = currentPage;
				  
				  $scope.startTable = ($scope.currentPage-1)*$scope.itemsPerPage;
				  $scope.endTable   = (($scope.currentPage-1)*$scope.itemsPerPage)+$scope.itemsPerPage;
	
				  if(isNaN($scope.startTable) ) {
					  console.log("ERRO! $scope.startTable igual NAN");
				  }
				  
				  if(isNaN($scope.endTable) ) {
					  console.log("ERRO! $scope.endTable igual NAN");  
				  }
			};
			
			/**
			 * Mudança de pagina tabela
			 */
			$scope.pageChanged = function(inicio, fim) {
				var inicio = 0;
				var fim = 0;
				
				inicio = $scope.select.selectedOption.valor * ($scope.currentPage - 1);
				fim = $scope.select.selectedOption.valor * $scope.currentPage;

				
				ContaPagaService.listaContasPaga(inicio, fim, !$scope.reverse, $scope.propertyName, function onSuccess(response) {
	  				  // Handle success
	  				  var data = response.data;
	  				  var status = response.status;
	  				  var statusText = response.statusText;
	  				  var headers = response.headers;
	  				  var config = response.config;
	  				  
	  				  $scope.lsConta = data.lsConta;
	  				  updateTableData($scope.currentPage, data.totalItens);
				});
			};
		
		//===========================
		//=========== funcoes tabela
		//===========================
			
    	
});
