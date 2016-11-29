package com.turborep.turbotracker.vendor.dao;
// Generated Nov 24, 2016 3:40:12 PM by Hibernate Tools 4.0.0

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
 * Vebillhistory generated by hbm2java
 */
@Entity
@Table(name = "veBillHistory", catalog = "")
public class veBillHistory implements java.io.Serializable {

	private Integer veBillHistoryId;
	private Integer vePoid;
	private Integer veBillId;
	private Integer vePodetailId;
	private BigDecimal quantityInvoiced;
	private BigDecimal invoiceAmount;
	private Date entryDate;
	private Integer enteredBy;

	public veBillHistory() {
	}

	public veBillHistory(Integer vePoid, Integer veBillId, Integer vePodetailId, BigDecimal quantityInvoiced,
			BigDecimal invoiceAmount, Date entryDate, Integer enteredBy) {
		this.vePoid = vePoid;
		this.veBillId = veBillId;
		this.vePodetailId = vePodetailId;
		this.quantityInvoiced = quantityInvoiced;
		this.invoiceAmount = invoiceAmount;
		this.entryDate = entryDate;
		this.enteredBy = enteredBy;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "veBillHistoryID", unique = true, nullable = false)
	public Integer getVeBillHistoryId() {
		return this.veBillHistoryId;
	}

	public void setVeBillHistoryId(Integer veBillHistoryId) {
		this.veBillHistoryId = veBillHistoryId;
	}

	@Column(name = "vePOID")
	public Integer getVePoid() {
		return this.vePoid;
	}

	public void setVePoid(Integer vePoid) {
		this.vePoid = vePoid;
	}

	@Column(name = "veBillID")
	public Integer getVeBillId() {
		return this.veBillId;
	}

	public void setVeBillId(Integer veBillId) {
		this.veBillId = veBillId;
	}

	@Column(name = "vePODetailID")
	public Integer getVePodetailId() {
		return this.vePodetailId;
	}

	public void setVePodetailId(Integer vePodetailId) {
		this.vePodetailId = vePodetailId;
	}

	@Column(name = "quantityInvoiced", scale = 4)
	public BigDecimal getQuantityInvoiced() {
		return this.quantityInvoiced;
	}

	public void setQuantityInvoiced(BigDecimal quantityInvoiced) {
		this.quantityInvoiced = quantityInvoiced;
	}

	@Column(name = "invoiceAmount", scale = 4)
	public BigDecimal getInvoiceAmount() {
		return this.invoiceAmount;
	}

	public void setInvoiceAmount(BigDecimal invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "entryDate", length = 19)
	public Date getEntryDate() {
		return this.entryDate;
	}

	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}

	@Column(name = "enteredBy")
	public Integer getEnteredBy() {
		return this.enteredBy;
	}

	public void setEnteredBy(Integer enteredBy) {
		this.enteredBy = enteredBy;
	}

}
