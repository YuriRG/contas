app.service('ContasService', function($http,$q, InputService, HtmlComponentsService) {
	
	
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
	this.listaContasAPagar = function(inicio, fim, asc, colunas, callback) {
    	$http.get('/contas/rest/contas/lscontaapagar/'+inicio+'/'+fim+'/'+asc+'/'+colunas)
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
	
	/**
	 * Saldo total
	 */
	this.saldoTotal = function(callback) {
    	$http.get('/contas/rest/contas/saldoTotal')
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
	
	/**
	 * Cria ou atualiza conta a pagar 
	 */
	this.salvar = function($scope, callback) {
		if(!this.validaformulario($scope)) {
			return;
		}
		
//		if ($scope.conta.id === undefined) {
		$scope.selectFilial.selectedOption.valor
		$scope.conta.filial = {};
		$scope.conta.filial.id = parseInt($scope.selectFilial.selectedOption.valor); 
		
        	$http.put('/contas/rest/contas/salvar', $scope.conta)
        	  .then(callback).catch(function onError(response) {
        	    // Handle error
        	    var data = response.data;
        	    var status = response.status;
        	    var statusText = response.statusText;
        	    var headers = response.headers;
        	    var config = response.config;
        	    
        	    console.log("Status: "+status);
        	  });
        	$scope.fechar();

//		} else {

//			var length = $scope.carros.length;
//			for (var i = 0; i < length; i++) {
//				if ($scope.carros[i].id === $scope.carro.id) {
					
					
//		        	$http.put('/crud/rest/veiculo/add', $scope.carro)
//		        	  .then(callback2).catch(function onError(response) {
//		        	    // Handle error
//		        	    var data = response.data;
//		        	    var status = response.status;
//		        	    var statusText = response.statusText;
//		        	    var headers = response.headers;
//		        	    var config = response.config;
//		        	    
//		        	    console.error("Status: "+status);
//		        	  });
////				}
//			}
//		}
		
	};
	
	/**
	 * Deletar conta a pagar
	 */
	this.deletar = function($scope, callback) {
		var id = $scope.idModal;
			
    	$http.put('/contas/rest/contas/deletar/'+id)
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
	 * Seta conta
	 */
	this.setConta = function($scope, conta) {
		$scope.conta.id = conta.id;
		$scope.conta.filial= {};
		$scope.conta.filial.id = conta.filial.id;
		$scope.conta.dtPagamento = conta.dtPagamento;
		$scope.conta.dtBaixa = conta.dtBaixa;
		$scope.conta.saldoAntTot = conta.saldoAntTot;
		$scope.conta.saldoPostTot = conta.saldoPostTot;
		$scope.conta.valor = conta.valor;
	}
	
	/**
	 * Lista todos contas
	 */
	this.listaContasAPagar = function(inicio, fim, asc, colunas, callback) {
    	$http.get('/contas/rest/contas/lscontaapagar/'+inicio+'/'+fim+'/'+asc+'/'+colunas)
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
	
	/**
	 * Valida formulário
	 */
	this.validaformulario = function($scope) {
		this.limpaMgsFormulario($scope);
		
		var msg = "Campo {0} obrigatório !!!"
		var retorno = true;
		
		//Modelo
		if($scope.conta.valor === undefined
				|| $scope.conta.valor === ''
				|| $scope.conta.valor === 0
				|| $scope.conta.valor === '0') {
			$scope.msgValor = msg.replace("{0}", "Valor");
			retorno = false;
		}
		return retorno;
	};
	
	/**
	 * Limpa mensagens de formulário
	 * 
	 * @return void
	 */				
	this.limpaMgsFormulario = function($scope) {
		$scope.msgValor = "";	
	};
	
	/**
	 * usuario logado
	 */
	this.enviarMensagem = function($scope, callback) {
		var json = '{ "nome" : "'+ $scope.usuario.nome + '", "mensagem" : "' + $scope.mensagem + '"}'; 
    	$http.post('/chat/rest/broadcast/chat/'+json,{headers : {'Content-Type' : 'application/json; charset=UTF-8'}})
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
	
	
	/**
	 * Entrar sala
	 */
	this.entrarSala = function($scope, callback) {
		var json = '{ "nome" : "'+$scope.usuario.nome+'", "mensagem" : "Entrou na sala", "entrou" : "true" }';
		
		
		//var json2 = '{ "nome" : "' + encodeURIComponent($scope.usuario.nome) + '", "urlImagem" : "' + encodeURIComponent($scope.usuario.urlImagem) + '" }';
		

    	//$http.post('/chat/rest/broadcast/usuario/'+json)
		$http.post('/chat/rest/broadcast/usuarioe/', $scope.usuario)
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
	
	/**
	 * Saiu sala
	 */
	this.saiuSala = function($scope, callback) {
		//var json = '{ "nome" : "'+$scope.usuario.nome+'", "mensagem" : "Saiu da sala", "entrou" : "false" }';
    	//$http.delete('/chat/rest/broadcast/usuario/'+json)
		$http.post('/chat/rest/broadcast/usuarios/', $scope.usuario)
		//$http.post('/chat/rest/broadcast/usuarios/', json)
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
	
	this.pagar = function($scope, callback) {
		$http.get('/contas/rest/contas/pagar/'+$scope.conta.id+'/'+InputService.dataAtualFormatada() )
	  	  .then(callback).catch(function onError(response) {
	  		    // Handle error
	  		    var data = response.data;
	  		    var status = response.status;
	  		    var statusText = response.statusText;
	  		    var headers = response.headers;
	  		    var config = response.config;
	  		    
	  		    console.error("Status: "+status);	    
	  		  });
	}
	
	this.atualizaSaldoTotalBroadcast = function($scope, callback) {
		$http.get('/contas/rest/broadcast/saldototal/send' )
	  	  .then(callback).catch(function onError(response) {
	  		    // Handle error
	  		    var data = response.data;
	  		    var status = response.status;
	  		    var statusText = response.statusText;
	  		    var headers = response.headers;
	  		    var config = response.config;
	  		    
	  		    console.error("Status: "+status);	    
	  		  });
	}
	
	
	
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