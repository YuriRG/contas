package br.com.contas.config;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import br.com.contas.model.business.BuscaContasBaixadas;

/**
 * Está classe foi criada para configurações durante a inicialização(startup) ou finalização(shutdown) do sistema.
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
		//System.out.println("Terminou aplicação");
	}
	
	/**
	 * Retorna entity manager factory da aplicação
	 * 
	 * @return EntityManagerFactory
	 */
	public static EntityManagerFactory getEntityManagerFactory() {
		return emf;
	}

}
