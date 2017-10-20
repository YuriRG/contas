/**
 * Formata inputs
 */
app.service('InputService', function($http,$q) {
	
	/**
	 * Formata data da tela
	 * 
	 * @return string
	 */
	this.formataDtTela = function(data) {
		if(data === undefined
				|| data === null) {
			return undefined;
		}
						
		if(typeof data === 'object') {
			return (data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate());
		}
		
		if(typeof data === 'number') {
			var dataAux = new Date(data);
			var adata = dataAux.toLocaleString().split(" ");
			
			var adata2 = adata[0].trim().split("/");
			
			return (adata2[2]+"-"+adata2[1]+"-"+adata2[0]);
		}
		
		var adata = data.split("/");
		
		return (adata[2]+"-"+adata[1]+"-"+adata[0]);
	}
	
	/**
	 * Retorna data atual formato americano
	 * @returns
	 */
	this.dataAtualFormatada = function() {
	    var data = new Date();
	    var dia = data.getDate();
	    if (dia.toString().length == 1)
	      dia = "0"+dia;
	    var mes = data.getMonth()+1;
	    if (mes.toString().length == 1)
	      mes = "0"+mes;
	    var ano = data.getFullYear();  
	    return ano+"-"+mes+"-"+dia;
	}
});
