package br.com.contas.util;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import br.com.contas.config.AplicationConfg;

/**
 * Generic DAO com jpa
 * 
 *
 */
public class GenericDAO {
    
    private EntityManager em = AplicationConfg.getEntityManagerFactory().createEntityManager();

    /**
     * Atualiza ou insere registro referente ao objeto.
     * @param e
     * @return
     * @throws Exception
     */
    public <E> E save(E e) throws Exception {
    	E aux = em.merge(e);
        em.persist(aux);
        return e;
    }

    public <E> E update(E e) throws Exception {
        return em.merge(e);
    }

    public <E> void delete(Class<E> clazz, long id) throws Exception {
    	E classe = em.find(clazz, id);
        em.remove(classe);
    }

    public <E> E find(Class<E> clazz, long id) throws Exception {
        return em.find(clazz, id);
    }
    
	@SuppressWarnings("unchecked")
	public <E> List<E> findAll(Class<E> type) throws Exception {
        return this.em.createQuery( "from " + type.getName() )
         .getResultList();

     }

	@SuppressWarnings("unchecked")
	public <E> List<E> find(Class<E> clazz, String query) throws Exception {    	
		return em.createQuery(query, clazz).getResultList();
	}
	
	@SuppressWarnings("unchecked")
	public <E> List<E> namedFind(Class<E> clazz, String query) throws Exception {
		return em.createNamedQuery(query, clazz).getResultList();
	}
	
    @SuppressWarnings("unchecked")
	public <E> List<E> find(Class<E> clazz, String query, int min, int max) throws Exception {    	
        return queryRange(em.createQuery(query, clazz), min, max).getResultList();
    }
    
    @SuppressWarnings("unchecked")
	public <E> List<E> find(Class<E> clazz, String query, int min, int max, Boolean asc, String coluns) throws Exception {
    	query = orderBy(query, asc, coluns);
    	return em.createQuery(query, clazz).getResultList().subList(min, max);
    	
    }

    @SuppressWarnings("unchecked")
	public <E> List<E> namedFind(Class<E> clazz, String query, int min, int max) throws Exception {
        return queryRange(em.createNamedQuery(query, clazz), min, max).getResultList();
    }

    private static Query queryRange(Query query, int min, int max) throws Exception {
        if (max >= 0) {
            query.setMaxResults(max);
        }
        if (min >= 0) {
            query.setFirstResult(min);
        }        
        return query;
    }
    
    private static String orderBy(String query, Boolean asc, String coluns) throws Exception {
    
    	if(Boolean.TRUE.equals(asc)
    			&& coluns != null
    			&& !("null").equals(coluns) ) {
    		query += " order by "+coluns + " asc";    		
    	}
    
		if(Boolean.FALSE.equals(asc)
				&& coluns != null
				&& !("null").equals(coluns) ) {
			query += " order by "+coluns + " desc";    		
		}
		
		return query;
    }
    
    //============ JPA Transaction Management
    
    public EntityManager getEntityManager() {
		return em;
    }
    
	public void beguinTransaction() throws Exception {
		em.getTransaction().begin();
	}
	
	public void commitAndClose() throws Exception {
		if(em.getTransaction().isActive()){			
			em.getTransaction().commit();
		}
			
			em.close();
	}
	
	
	public void commit() throws Exception {
		if(em.getTransaction().isActive()){			
			em.getTransaction().commit();
		}
	}	
	
	public void rollback() throws Exception {
		em.getTransaction().rollback();
	}
	
	public void close() throws Exception {
		em.close();
	}
	
	public void flush() throws Exception {
		em.flush();
	}
}