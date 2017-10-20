package br.com.contas.model.dao;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Query;

import br.com.contas.model.entities.Filial;
import br.com.contas.util.GenericDAO;

public class ContaDAO extends GenericDAO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	/**
     * Retorna saldo total atual de todas as filiais
     * @return
     * @throws Exception
     */
    public BigDecimal getSaldoTotal() throws Exception {
        try {
        	Query query1 = this.getEntityManager().createQuery(Filial.SALDO_TOTAL);
        	BigDecimal saldoTotal = (BigDecimal) query1.getSingleResult();
            
	        return saldoTotal;
			
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
    }
    
}
