package br.com.contas.config;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import br.com.contas.model.business.BuscaContasBaixadas;

/**
 * Est� classe foi criada para configura��es durante a inicializa��o(startup) ou finaliza��o(shutdown) do sistema.
 * 
 * @author Yrvi
 *
 */
@WebListener
public class AplicationConfg implements ServletContextListener {
	
	private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("contas");
	private Thread bCBaixadas;
	
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
    	this.bCBaixadas = new Thread(new BuscaContasBaixadas());
    	this.bCBaixadas.start();
	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		this.bCBaixadas.interrupt();
		//System.out.println("Terminou aplica��o");
	}
	
	/**
	 * Retorna entity manager factory da aplica��o
	 * 
	 * @return EntityManagerFactory
	 */
	public static EntityManagerFactory getEntityManagerFactory() {
		return emf;
	}

}
