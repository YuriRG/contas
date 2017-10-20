/**
 * Serviço de componentes
 */
app.service('HtmlComponentsService', function($http,$q) {
	

	
	/**
	 * Função retorna dados select tabela html
	 * 
	 * @return json
	 */
	this.selectTamanhoTabela = function() {
		var select = {
			availableOptions: [
				{valor: '5', label: '5'},
				{valor: '10', label: '10'},
				{valor: '15', label: '15'}
				],
				selectedOption: {valor: '5', label: '5'} //This sets the default value of the select in the ui
		};
		
		return select;
	}
	
	/**
	 * Ordena tabelas pela coluna clicada.
	 */
	this.sortTableColumn = function($scope, propertyName) {
		var inicio = 0;
		//var fim = parseInt($scope.select.selectedOption.valor);
		var fim = 0;
		
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
		
//		if($scope.reverse) { // Pega o ultimos elementos
//			inicio = $scope.totalItems - $scope.select.selectedOption.valor;
//			fim = $scope.totalItems;
//		}
		
		inicio = $scope.select.selectedOption.valor * ($scope.currentPage - 1);
		fim = $scope.select.selectedOption.valor * $scope.currentPage;

		return {"inicio": inicio, "fim": fim};
		//$scope.currentPage = 1;
	};
	
	/**
	 * Leva scroll para o fim da pagina
	 */
	this.scrollDown = function() {
		//scroll down
		$('html, body').animate({
	        scrollTop: $(document).height()
	    }, 'slow');
	}
	
	/**
	 * Leva scroll para o topo
	 */
	this.scrollTop = function() {
		$('html, body').animate({scrollTop:0}, 'slow');
	}
});