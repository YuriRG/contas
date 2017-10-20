package br.com.contas.model.business;

import java.math.BigDecimal;
import java.util.Iterator;
import java.util.List;

import javax.ws.rs.core.MediaType;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.glassfish.jersey.media.sse.OutboundEvent;

import br.com.contas.model.dao.ContaDAO;
import br.com.contas.model.entities.Conta;
import br.com.contas.model.entities.Filial;
import br.com.contas.model.entities.Status;

/**
 * Atualiza saldo das filiais em tempo real
 * 
 */
public class BuscaContasBaixadas implements Runnable {

	private ContaDAO dao;
	private long descanso = 15000;// ideal 100 [milisegundos]
	
	@Override
	public void run() {
		try {
			this.dao = new ContaDAO();
			Thread.sleep(this.descanso);
			
			while (true) {
			
				try {
					this.dao.beguinTransaction();
					/* prints a stack trace of the current thread to the standard
				         error stream, used for debugging */
					Thread.dumpStack();
					
					System.err.println("========================");
					System.err.println("========================");
					System.err.println("=============SALDO TOTAL");
					System.err.println("========================");
					List<Conta> lsConta = this.dao.find(Conta.class, Conta.CONTA_PARA_BAIXA_LISTA);
					
					for (Iterator<Conta> iterator = lsConta.iterator(); iterator.hasNext();) {
						Conta conta = iterator.next();
						
						BigDecimal saldoAtualAux = conta.getFilial().getSaldoAtual();
						
						BigDecimal saldoAtual = saldoAtualAux.subtract(conta.getValor());
						
						//FILIAL
						Filial filial = conta.getFilial();
						filial.setSaldoAtual(saldoAtual);
						
						this.dao.save(filial);
						
						//CONTA
						Status statusConta = new Status();
						statusConta.setId(Status.BAIXA);
						conta.setStatus(statusConta);
						
						this.dao.save(conta);
						this.dao.flush();

						System.err.println("========================");
						System.err.println("=============Filial: "+ filial.getId()+", Cidade: "+filial.getCidade()+", Saldo: "+filial.getSaldoAtual());
						System.err.println("=============Conta: "+ conta.getId()+", DtBaixa: "+conta.getDtBaixa()+", Valor: "+conta.getValor());
						System.err.println("========================");
						
						
					}
					//Atualiza saldo para todos os clientes(Broadcast)
					HttpClient client = HttpClientBuilder.create().build();
					HttpGet request = new HttpGet("http://localhost:8080/contas/rest/broadcast/saldototal/send");
					HttpResponse response = client.execute(request);
					
					System.err.println("========================");
					System.err.println("=============GET: http://localhost:8080/contas/rest/broadcast/saldototal/send");
//						BigDecimal saldoTotal = dao.getSaldoTotal();
//				        OutboundEvent.Builder eventBuilder = new OutboundEvent.Builder();
//				        OutboundEvent event = eventBuilder.name("message")
//				            .mediaType(MediaType.TEXT_PLAIN_TYPE)
//				            .data(String.class, saldoTotal)
//				            .build();
//				 
//				        BroadcastResourceSaldoTotal.getSaldoTotalBC().broadcast(event);
//				        System.err.println("========================");
//				        System.err.println("=============Saldo atual: "+saldoTotal);
//				        System.err.println("========================");
				        dao.commit();
						
				} catch (Exception e) {
					try {
						dao.rollback();
					} catch (Exception e1) {
						e1.printStackTrace();
					}
					e.printStackTrace();
				}
				
				Thread.sleep(this.descanso);
			}
		} catch (InterruptedException ex) {
			try {
				dao.rollback();
			} catch (Exception e) {
				e.printStackTrace();
			}
        }
		
		try {
			dao.commitAndClose();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
