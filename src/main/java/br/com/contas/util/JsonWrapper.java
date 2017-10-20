package br.com.contas.util;

import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;

/**
 * Emcapsula objetos java em um template json, que tem como base sempre retornar msg e status.
 * 
 * @author Yrvi
 *
 */
public class JsonWrapper {
	
	private Map<String, Object> json;
	
	public static final String MSG = "msg";
	public static final String STATUS = "status";
	
	
	public static final String STATUS_200 = "200";
	public static final String STATUS_500 = "500";
	
	public JsonWrapper() {
		this.json = new HashMap<String, Object>();
		this.json.put(MSG, "");
		this.json.put(STATUS, STATUS_200);
	}
	
	
	public void adicionar(String chave, Object valor) {
		this.json.put(chave, valor);
	}
	
	public void remover(String chave) {
		this.json.remove(chave);
	}
	
	/**
	 * Retorna json no formato de string
	 * 
	 * @return
	 */
	public String jsonString() throws Exception{
        ObjectMapper mapper = new ObjectMapper();
        
        return mapper.writeValueAsString(this.json);
	}

}
