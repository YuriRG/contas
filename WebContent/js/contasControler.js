app.controller("contasCtrl", function($scope, $filter, $location, $uibModal, $http, $translate, ContasService) {
    	$scope.mensagem = "";
    	$scope.lsMensagems = [];
    	$scope.exibeFormulario = false;
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

			$scope.select = ContasService.selectTamanhoTabela();    	
	    	
			var fim = parseInt($scope.select.selectedOption.valor);
	    	//=========== Lista contas a pagar
	    	ContasService.listaContasAPagar(0, fim, false, null, function onSuccess(response) {
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
				
				var jsonInicioFim = ContasService.sortTableColumn($scope, propertyName);				
	
				
				ContasService.listaContasAPagar(jsonInicioFim.inicio, jsonInicioFim.fim, !$scope.reverse, propertyName, function onSuccess(response) {
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

				
				ContasService.listaContasAPagar(inicio, fim, !$scope.reverse, $scope.propertyName, function onSuccess(response) {
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
			
			
    	
    	//=========== Focus
    	$('#id').focus();
    	
		/**
		 * Evento para abrir formulário de conta a pagar
		 * 
		 * @return void
		 */
		$scope.cadastrar = function() {
			$scope.conta = {};
			$scope.exibeFormulario = true;

			$("#fidfilial").focus();
			
			ContasService.scrollDown();
			
			$scope.selectFilial = {};
			
	    	//=========== Lista contas a pagar
	    	ContasService.lsFiliais( function onSuccess(response) {
				  // Handle success
				  var data = response.data;
				  var status = response.status;
				  var statusText = response.statusText;
				  var headers = response.headers;
				  var config = response.config;
				  
				  var lsFilial = data.lsFilial;
				  
				  $scope.selectFilial = criaSelectFilial(lsFilial);
			});
		}
		
		/**
		 * Retorna objeto select com dados das filiais
		 * 
		 * @param lsFilial
		 * @returns
		 */
		function criaSelectFilial(lsFilial) {
			  var selectFilial = {};
			  
			  var availableOptions = [];
			  var selectedOption = {};

			  for (i = 0; i < lsFilial.length; i++) {
				  	if(i === 0) {//Opção inicial
				  		selectedOption = {valor: lsFilial[i].id.toString() , label: lsFilial[i].id.toString() +' - '+ lsFilial[i].cidade};
				  	}
				  	availableOptions[i] = {valor: lsFilial[i].id.toString() , label: lsFilial[i].id.toString() +' - '+ lsFilial[i].cidade}; 
			  }
			  
			  selectFilial.availableOptions = availableOptions;
			  selectFilial.selectedOption = selectedOption;
			  
			  return selectFilial;
		}
		
		//===========================
    	//=========== Modal
		//===========================
    	/**
    	 * Guarda idendificador do item selecionado no modal
    	 * 
		 * @param {String} id
		 * 
		 * @return void
    	 */
    	 $scope.modal = function ($event, id) {
    		 //$event.stopPropagation();
    		 $event.preventDefault();
    		 $scope.idModal = id;
		  };
		
		//===========================
		//=========== CRUD
		//===========================
		$scope.conta = {};
		/**
		 * Salva carro inserindo ou atualizando.
		 * 
		 * @return void
		 */
		$scope.salvar = function() {
			ContasService.salvar($scope,function onSuccess(response) {
        	    // Adicionar/Atualiza
				var data = response.data;
        	    var status = response.status;
        	    var statusText = response.statusText;
        	    var headers = response.headers;
        	    var config = response.config;
        	    
    			var fim = parseInt($scope.select.selectedOption.valor);
    	    	//=========== Lista contas a pagar
    	    	ContasService.listaContasAPagar(0, fim, false, null, function onSuccess(response) {
    				  // Handle success
    				  var data = response.data;
    				  var status = response.status;
    				  var statusText = response.statusText;
    				  var headers = response.headers;
    				  var config = response.config;
    				  
    				  $scope.lsConta = data.lsConta;
    				  updateTableData(1, data.totalItens);
    	
    			});
        	    
        	  });
		}
		
		/**
		 * Deleta conta a pagar da lista
		 * 
		 * @return void
		 */
		$scope.deletar = function() {
			ContasService.deletar($scope, function onSuccess(response) {
				// Handle success
				var data = response.data;
				var status = response.status;
				var statusText = response.statusText;
				var headers = response.headers;
				var config = response.config;
			  
				var fim = parseInt($scope.select.selectedOption.valor);
				//=========== Lista contas a pagar
				ContasService.listaContasAPagar(0, fim, false, null, function onSuccess(response) {
					  // Handle success
					  var data = response.data;
					  var status = response.status;
					  var statusText = response.statusText;
					  var headers = response.headers;
					  var config = response.config;
					  
					  $scope.lsConta = data.lsConta;
					  updateTableData(1, data.totalItens);
				
				});
    	    
			});
		};
		
		//===========================
		//=========== CRUD
		//===========================
		
		$scope.pagar = function(conta) {
			$scope.conta = conta;
			ContasService.pagar($scope,function onSuccess(response) {
				var data = response.data;
        	    var status = response.status;
        	    var statusText = response.statusText;
        	    var headers = response.headers;
        	    var config = response.config;
        	    
    			var fim = parseInt($scope.select.selectedOption.valor);
    	    	//=========== Lista contas a pagar
    	    	ContasService.listaContasAPagar(0, fim, false, null, function onSuccess(response) {
    				  // Handle success
    				  var data = response.data;
    				  var status = response.status;
    				  var statusText = response.statusText;
    				  var headers = response.headers;
    				  var config = response.config;
    				  
    				  $scope.lsConta = data.lsConta;	  
    				  updateTableData(1, data.totalItens);
    	
    			});
        	    
        	  });
			
		};
		
		/**
		 * Fecha formulário
		 * 
		 * @return void
		 */
		$scope.fechar = function() {
			$scope.conta = {};
			$scope.exibeFormulario = !$scope.exibeFormulario;
			ContasService.scrollTop();
		}
		
		/**
		 * Edita dados do carro
		 * 
		 * @param {Object} carro
		 * @return void
		 */
		$scope.eventoEditar = function($event, conta) {
   		 	$event.preventDefault();
   		 	ContasService.limpaMgsFormulario($scope);
   		 	ContasService.setConta($scope, conta);
			$scope.exibeFormulario = true;
			
			$("#fidfilial").focus();
			
			ContasService.scrollDown();
			
			$scope.selectFilial = {};
			
	    	//=========== Lista contas a pagar
	    	ContasService.lsFiliais( function onSuccess(response) {
				  // Handle success
				  var data = response.data;
				  var status = response.status;
				  var statusText = response.statusText;
				  var headers = response.headers;
				  var config = response.config;
				  
				  var lsFilial = data.lsFilial;
				  
				  $scope.selectFilial = criaSelectFilial(lsFilial);
			});
		}
    	
    	
    	/**
    	 * Envio de mensagem
    	 */
    	/*
    	$scope.enviar = function() {
    		if($scope.mensagem.length > 1000) {
    			$("#myModal").modal("show");
    			 return;
    		}
    		
    		
    		ContasService.enviarMensagem($scope, function onSuccess(response) {
        	    // Handle success
        	    var data = response.data;
        	    var status = response.status;
        	    var statusText = response.statusText;
        	    var headers = response.headers;
        	    var config = response.config;
        	    
        	    $scope.mensagem = "";
            });

    	};
    	
    	*/
        // ================= Listener Chat    	

        /**
         * Recebe mensagem via broadcast
         */
    	/*
        var handleCallbackSala = function (msg) {
        	
            $scope.$apply(function () {

				var string = msg.data.substring(1, msg.data.length-1);
                var json = JSON.parse( msg.data);
                
        		var msgUsuario = '{"nome" : "'+ json.nome + '", "mensagem" : "' + json.mensagem + '"}';
        		var jsonU = JSON.parse(msgUsuario);
        		$scope.lsMensagems.push(jsonU);
        		
            });
        }
    	
        var salaListener = new EventSource('/chat/rest/broadcast/chat/listener');
        salaListener.addEventListener('message', handleCallbackSala, false);
    	
        $scope.entrarSala = function() {
        	
        	ContasService.entrarSala($scope, function onSuccess(response) {
	    	    // Handle success
	    	    var data = response.data;
	    	    var status = response.status;
	    	    var statusText = response.statusText;
	    	    var headers = response.headers;
	    	    var config = response.config;

	    	    $scope.btentrar = true;
	    	    $scope.btsair = false;
	    	    $scope.btenviar = false;
        	});
        	
        }
        
        $scope.sairSala = function() {
 	
        	ContasService.saiuSala($scope, function onSuccess(response) {
	    	    // Handle success
	    	    var data = response.data;
	    	    var status = response.status;
	    	    var statusText = response.statusText;
	    	    var headers = response.headers;
	    	    var config = response.config;
	    	    
	    	    $scope.btentrar = false;
	    	    $scope.btsair = true;
	    	    $scope.btenviar = true;
        	});
        	
        }

     // ================= Listener Usuarios
        
        
        var handleCallbackUsuario = function (msg) {
        	
            $scope.$apply(function () {
     	
                var usuario = JSON.parse(msg.data);
                                
                var msgUsuario = JSON.parse('{"nome" :"'+ usuario.nome + '", "mensagem" :"' + usuario.status + '" }');
           
                if(usuario.status === "entrou") {
	                if($scope.lsUsuario.findIndex(i => i.email === usuario.email) === -1){
	                	$scope.lsUsuario.push(usuario);	                	
	                } else {
	                	if($scope.lsUsuario.length == 0) {
	                		$scope.lsUsuario.push(usuario);
	                	}
	                }
                	
	                msgUsuario.mensagem += " na sala";
                } else {

                	var valor = $scope.lsUsuario.findIndex(i => i.email === usuario.email);
          	
                	delete $scope.lsUsuario[valor];
                	
                	$scope.lsUsuario.length = $scope.lsUsuario.length-1;
                	msgUsuario.mensagem += " da sala";
                }
                $scope.lsMensagems.push(msgUsuario);                	
                
        		
            });
            
        }
        
        var usuarioListener = new EventSource('/chat/rest/broadcast/usuario/listener');
        usuarioListener.addEventListener('message', handleCallbackUsuario, false);
        */
});
