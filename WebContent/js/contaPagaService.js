app.service('ContaPagaService', function($http,$q, InputService, HtmlComponentsService) {
	
	//=========== Focus
	$('#id').focus();
	
	//===========================
	//=========== funcoes tabela
	//===========================
	
	/**
	 * Lista de filiais
	 */
	this.lsFiliais = function(callback) {
    	$http.get('/contas/rest/contas/lsfiliais')
    	  .then(callback).catch(function onError(response) {
    	    // Handle error
    	    var data = response.data;
    	    var status = response.status;
    	    var statusText = response.statusText;
    	    var headers = response.headers;
    	    var config = response.config;
    	    
    	    console.log("Status: "+status);
    	  });
	};

	
	/**
	 * Lista todos contas
	 */
	this.listaContasPaga = function(inicio, fim, asc, colunas, callback) {
    	$http.get('/contas/rest/contapaga/lscontapaga/'+inicio+'/'+fim+'/'+asc+'/'+colunas)
    	  .then(callback).catch(function onError(response) {
    		    // Handle error
    		    var data = response.data;
    		    var status = response.status;
    		    var statusText = response.statusText;
    		    var headers = response.headers;
    		    var config = response.config;
    		    
    		    console.error("Status: "+status);	    
    		  });
	};
	//===========================
	//=========== funcoes tabela
	//===========================
	
	
	//========================
	// Metodos Padão
	//========================
	
	/**
	 * Leva scroll para o fim da pagina
	 */
	this.scrollDown = function() {
		HtmlComponentsService.scrollDown();
	}
	
	/**
	 * Leva scroll para o topo
	 */
	this.scrollTop = function() {
		HtmlComponentsService.scrollTop();
	}
	
	/**
	 * Função retorna dados select tabela html
	 * 
	 * @return json
	 */
	this.selectTamanhoTabela = function() {
		return HtmlComponentsService.selectTamanhoTabela();
	}

	
	/**
	 * Ordena tabelas pela coluna clicada.
	 */	
	this.sortTableColumn = function($scope, propertyName) {
		return HtmlComponentsService.sortTableColumn($scope, propertyName);
	}
	
});