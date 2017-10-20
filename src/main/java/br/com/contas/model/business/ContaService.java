package br.com.contas.model.business;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.contas.model.dao.ContaDAO;
import br.com.contas.model.entities.Conta;
import br.com.contas.model.entities.Filial;
import br.com.contas.model.entities.Status;
import br.com.contas.util.JsonWrapper;

@Path("contas")
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
public class ContaService {
	
	private ContaDAO dao = new ContaDAO();
	
	@GET
	@Path("lsfiliais")
	public Response getFiliais() throws Exception {
	
        try {
        	dao.beguinTransaction();
        	List<Filial> lsFilial = dao.findAll(Filial.class);
        	
	        JsonWrapper jsonWrapper = new JsonWrapper();
	        jsonWrapper.adicionar("lsFilial", lsFilial);
			
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
	
	@GET
	@Path("lscontaapagar/{start}/{end}/{asc}/{columns}")
	public Response getContasAPagar(@PathParam("start") Integer start, @PathParam("end") Integer end, @PathParam("asc") Boolean asc, @PathParam("columns") String columns) throws Exception {
	
        try {
        	dao.beguinTransaction();
        	List<Conta> lsContaAPagarTotal = dao.find(Conta.class, Conta.CONTA_A_PAGAR_LISTA);
        	
        	int totalItens = lsContaAPagarTotal.size();
        	
        	if(totalItens < end) {
        		end = totalItens;
        	}
        	
			List<Conta> lsContaAPagar = dao.find(Conta.class, Conta.CONTA_A_PAGAR_LISTA, start, end, asc, columns);
			
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
	
	@PUT
    @Path("salvar")
    public Response adicionaConta(Conta conta) throws Exception {
        try {
        	dao.beguinTransaction();
        	
        	Status status = new Status();
        	status.setId(Status.CRIADO);
        	conta.setStatus(status);
        	
			dao.save(conta);
			
	        JsonWrapper jsonWrapper = new JsonWrapper();
	        
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
	
    @PUT
    @Path("deletar/{id}")
    public Response detelarConta(@PathParam("id") Integer id) throws Exception {
        try {        	
        	dao.beguinTransaction();  
        	
        	long idaux = Long.valueOf(id.toString());
			dao.delete(Conta.class, idaux);
			
	        JsonWrapper jsonWrapper = new JsonWrapper();
			
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
    
    @GET
    @Path("pagar/{id}/{dtPagamento}")
    public Response pagarConta(@PathParam("id") Integer id, @PathParam("dtPagamento") String dtPagamento) throws Exception {
        try {        	
        	dao.beguinTransaction();  
        	
        	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        	
        	long idaux = Long.valueOf(id.toString());
        	Conta conta = dao.find(Conta.class, idaux);
        	
        	BigDecimal saldoAntTot = dao.getSaldoTotal();
        	conta.setSaldoAntTot(saldoAntTot);
        	
        	BigDecimal saldoPostTot  =  (saldoAntTot.subtract(conta.getValor()));
        	conta.setSaldoPostTot(saldoPostTot);
        	
            Date dtPagamentoAux = sdf.parse(dtPagamento);
        	conta.setDtPagamento(dtPagamentoAux);
        	
        	Date dtBaixa = getDtBaixa(dtPagamentoAux);
        	conta.setDtBaixa(dtBaixa);
        	
        	Status status = new Status();
        	status.setId(Status.PAGO);
        	conta.setStatus(status);
        	
        	dao.save(conta);
			
	        JsonWrapper jsonWrapper = new JsonWrapper();
			
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
    
    @GET
    @Path("saldoTotal")
    public Response getSaldoTotal() throws Exception {
        try {        	
        	dao.beguinTransaction();  
        	
        	BigDecimal saldoTot = dao.getSaldoTotal();
			
	        JsonWrapper jsonWrapper = new JsonWrapper();
	        jsonWrapper.adicionar("saldoTotal", saldoTot);
			
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
    

    
    /**
     * Retorna data de baixa, seguindo regra do dia da semana
     * 
     * @param dtPagamento
     * @return
     */
    private Date getDtBaixa(Date dtPagamento) {
    	Calendar c = Calendar.getInstance();
    	c.setTime(dtPagamento);
        int diaSemana = c.get(Calendar.DAY_OF_WEEK);
        
        if(diaSemana == 1) {//Domingo
        	c.add(Calendar.DAY_OF_YEAR, 2);//Dias adicionados
        }
        
        //Segunda, Terça, Quarta, Quinta e Sexta
        if(diaSemana == 2
        		|| diaSemana == 3
        		|| diaSemana == 4
        		|| diaSemana == 5
        		|| diaSemana == 6) {
        	c.add(Calendar.DAY_OF_YEAR, 1);//Dias adicionados
        }
        
        //Sabado
        if(diaSemana == 7) {
        	c.add(Calendar.DAY_OF_YEAR, 3);//Dias adicionados
        }            
        
        return c.getTime();
    }
    
    
}
