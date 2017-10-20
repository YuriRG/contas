package br.com.contas.model.business;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.contas.model.dao.ContaDAO;
import br.com.contas.model.entities.Conta;
import br.com.contas.util.JsonWrapper;

@Path("contapaga")
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
public class ContaPagaService {
	
	private ContaDAO dao = new ContaDAO();
	
	@GET
	@Path("lscontapaga/{start}/{end}/{asc}/{columns}")
	public Response getContasAPagar(@PathParam("start") Integer start, @PathParam("end") Integer end, @PathParam("asc") Boolean asc, @PathParam("columns") String columns) throws Exception {
	
        try {
        	dao.beguinTransaction();
        	List<Conta> lsContaPagaTotal = dao.find(Conta.class, Conta.CONTA_PAGA_LISTA);
        	
        	int totalItens = lsContaPagaTotal.size();
        	
        	if(totalItens < end) {
        		end = totalItens;
        	}
        	
			List<Conta> lsContaAPagar = dao.find(Conta.class, Conta.CONTA_PAGA_LISTA, start, end, asc, columns);
			
	        JsonWrapper jsonWrapper = new JsonWrapper();
	        jsonWrapper.adicionar("lsConta", lsContaAPagar);
	        jsonWrapper.adicionar("totalItens", totalItens);
			
	        return Response.ok(jsonWrapper.jsonString()).build();
			
		} catch (Exception e) {
			try {
				dao.rollback();
			} catch (Exception e1) {
				e1.printStackTrace();
				throw e1;
			}
			e.printStackTrace();
			throw e;
		} finally {
        	dao.commitAndClose();
        }
	}

}
