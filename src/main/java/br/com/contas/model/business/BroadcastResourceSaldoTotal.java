package br.com.contas.model.business;

import java.math.BigDecimal;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.sse.EventOutput;
import org.glassfish.jersey.media.sse.OutboundEvent;
import org.glassfish.jersey.media.sse.SseBroadcaster;
import org.glassfish.jersey.media.sse.SseFeature;

import br.com.contas.model.dao.ContaDAO;
import br.com.contas.util.JsonWrapper;

@Singleton
@Path("broadcast")
public class BroadcastResourceSaldoTotal {
	
	 private static SseBroadcaster saldoTotalBC = new SseBroadcaster();
	 
	 private ContaDAO dao = new ContaDAO();

		/**
		 * Atualiza saldo total de totdos os usuários
		 * @param message
		 * 
		 * @return Response
		 */
	    @POST
	    @Path("saldototal/send")
	    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.TEXT_PLAIN })
	    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.TEXT_PLAIN})
	    public Response broadcastMessageSaldoTot(@PathParam("menssage") String message) {
	    	try {
	    		BigDecimal saldoTotal = dao.getSaldoTotal();
		        OutboundEvent.Builder eventBuilder = new OutboundEvent.Builder();
		        OutboundEvent event = eventBuilder.name("message")
		            .mediaType(MediaType.TEXT_PLAIN_TYPE)
		            .data(String.class, saldoTotal)
		            .build();
		 
		        getSaldoTotalBC().broadcast(event);
		        
		        JsonWrapper jsonWrapper = new JsonWrapper();
		        jsonWrapper.adicionar("saldoTotal", saldoTotal);
			
				return Response.ok(jsonWrapper.jsonString()).build();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return null;
	    }
	 
	    /**
	     * Listener saldo total
	     *  
	     * @return EventOutput
	     */
	    @GET
	    @Path("saldototal/listener")
	    @Produces(SseFeature.SERVER_SENT_EVENTS)
	    public EventOutput listenSaldoTot() {
	        final EventOutput eventOutput = new EventOutput();
	        this.getSaldoTotalBC().add(eventOutput);
	        return eventOutput;
	    }

		public static SseBroadcaster getSaldoTotalBC() {
			return saldoTotalBC;
		}

}
