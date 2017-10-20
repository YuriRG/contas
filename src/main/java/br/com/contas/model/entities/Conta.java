package br.com.contas.model.entities;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name="conta")
@XmlRootElement

public class Conta {
	
	public static final String CONTA_A_PAGAR_LISTA = "SELECT x FROM Conta x JOIN FETCH x.filial f JOIN FETCH x.status s WHERE s.id = 1";
	public static final String CONTA_PAGA_LISTA = "SELECT x FROM Conta x JOIN FETCH x.filial f JOIN FETCH x.status s WHERE s.id in (2,3)";
	public static final String CONTA_PARA_BAIXA_LISTA = "SELECT x FROM Conta x JOIN FETCH x.filial f JOIN FETCH x.status s WHERE x.status.id = 2 AND x.dtBaixa < CURRENT_TIMESTAMP";
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private Long id;
	
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_filial", referencedColumnName="id")
	private Filial filial;
	
	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_status", referencedColumnName="id")
	private Status status;
	
	@Column( name = "dt_pagamento")
	@Temporal(TemporalType.DATE)
	private Date dtPagamento;
	
	@Column( name = "dt_baixa")
	@Temporal(TemporalType.DATE)
	private Date dtBaixa;
	
	@Column( name = "saldo_ant_tot")
	private BigDecimal saldoAntTot;
	
	@Column( name = "saldo_post_tot")
	private BigDecimal saldoPostTot;
	
	@Column
	private BigDecimal valor;


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Conta other = (Conta) obj;
		if (getId() == null) {
			if (other.getId() != null)
				return false;
		} else if (!getId().equals(other.getId()))
			return false;
		return true;
	}

	public Date getDtPagamento() {
		return dtPagamento;
	}

	public void setDtPagamento(Date dtPagamento) {
		this.dtPagamento = dtPagamento;
	}

	public Date getDtBaixa() {
		return dtBaixa;
	}

	public void setDtBaixa(Date dtBaixa) {
		this.dtBaixa = dtBaixa;
	}

	public BigDecimal getSaldoAntTot() {
		return saldoAntTot;
	}

	public void setSaldoAntTot(BigDecimal saldoAntTot) {
		this.saldoAntTot = saldoAntTot;
	}

	public BigDecimal getSaldoPostTot() {
		return saldoPostTot;
	}

	public void setSaldoPostTot(BigDecimal saldoPostTot) {
		this.saldoPostTot = saldoPostTot;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public Filial getFilial() {
		return filial;
	}

	public void setFilial(Filial filial) {
		this.filial = filial;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
