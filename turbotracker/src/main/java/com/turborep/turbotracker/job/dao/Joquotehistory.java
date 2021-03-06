package com.turborep.turbotracker.job.dao;

// Generated Jan 23, 2012 5:39:26 PM by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Joquotehistory generated by hbm2java
 */
@Entity
@Table(name = "joQuoteHistory", catalog = "")
public class Joquotehistory implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer joQuoteHistoryId;
	private Integer joQuoteHeaderId;
	private Integer joMasterId;
	private Integer rxMasterId;
	private Integer rxContactId;
	private String quoteRev;
	private Date quoteDate;
	private byte quoteStatus;
	private Integer joBidderId;
	private Integer quoteTypeID;
	private Integer employeeId;
	private BigDecimal QuoteAmount;
	
	
	
	public Joquotehistory() {
	}

	public Joquotehistory(byte quoteStatus) {
		this.quoteStatus = quoteStatus;
	}

	public Joquotehistory(Integer joQuoteHeaderId, Integer joMasterId,
			Integer rxMasterId, Integer rxContactId, String quoteRev,
			Date quoteDate, byte quoteStatus,Integer joBidderId) {
		this.joQuoteHeaderId = joQuoteHeaderId;
		this.joMasterId = joMasterId;
		this.rxMasterId = rxMasterId;
		this.rxContactId = rxContactId;
		this.quoteRev = quoteRev;
		this.quoteDate = quoteDate;
		this.quoteStatus = quoteStatus;
		this.setJoBidderId(joBidderId);
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "joQuoteHistoryID", unique = true, nullable = false)
	public Integer getJoQuoteHistoryId() {
		return this.joQuoteHistoryId;
	}

	public void setJoQuoteHistoryId(Integer joQuoteHistoryId) {
		this.joQuoteHistoryId = joQuoteHistoryId;
	}

	@Column(name = "joQuoteHeaderID")
	public Integer getJoQuoteHeaderId() {
		return this.joQuoteHeaderId;
	}

	public void setJoQuoteHeaderId(Integer joQuoteHeaderId) {
		this.joQuoteHeaderId = joQuoteHeaderId;
	}

	@Column(name = "joMasterID")
	public Integer getJoMasterId() {
		return this.joMasterId;
	}

	public void setJoMasterId(Integer joMasterId) {
		this.joMasterId = joMasterId;
	}

	@Column(name = "rxMasterID")
	public Integer getRxMasterId() {
		return this.rxMasterId;
	}

	public void setRxMasterId(Integer rxMasterId) {
		this.rxMasterId = rxMasterId;
	}

	@Column(name = "rxContactID")
	public Integer getRxContactId() {
		return this.rxContactId;
	}

	public void setRxContactId(Integer rxContactId) {
		this.rxContactId = rxContactId;
	}

	@Column(name = "QuoteRev", length = 3)
	public String getQuoteRev() {
		return this.quoteRev;
	}

	public void setQuoteRev(String quoteRev) {
		this.quoteRev = quoteRev;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "QuoteDate", length = 0)
	public Date getQuoteDate() {
		return this.quoteDate;
	}

	public void setQuoteDate(Date quoteDate) {
		this.quoteDate = quoteDate;
	}

	@Column(name = "QuoteStatus", nullable = false)
	public byte getQuoteStatus() {
		return this.quoteStatus;
	}

	public void setQuoteStatus(byte quoteStatus) {
		this.quoteStatus = quoteStatus;
	}
	@Column(name = "joBidderID")
	public Integer getJoBidderId() {
		return joBidderId;
	}

	public void setJoBidderId(Integer joBidderId) {
		this.joBidderId = joBidderId;
	}

	@Column(name = "quoteTypeID")
	public Integer getQuoteTypeID() {
		return quoteTypeID;
	}

	public void setQuoteTypeID(Integer quoteTypeID) {
		this.quoteTypeID = quoteTypeID;
	}
	
	@Column(name = "quoteAmount")
	public BigDecimal getQuoteAmount() {
		return QuoteAmount;
	}

	public void setQuoteAmount(BigDecimal quoteAmount) {
		QuoteAmount = quoteAmount;
	}
	
	
	@Column(name = "employeeId")
	public Integer getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}

}
