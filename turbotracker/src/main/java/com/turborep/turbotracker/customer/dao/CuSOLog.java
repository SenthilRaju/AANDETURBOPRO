package com.turborep.turbotracker.customer.dao;

import static javax.persistence.GenerationType.IDENTITY;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "cuSOLog", catalog = "")
public class CuSOLog {
	private Integer cuSOLogId;
	private Integer cuSoid;
	private Integer changedById;
	private Date changedOn;
	private Integer cuSodetailId;
	private Integer prMasterId;
	private String description;
	private String note;
	private BigDecimal quantityOrdered;
	private BigDecimal quantityReceived;
	private BigDecimal quantityBilled;
	private BigDecimal unitCost;
	private BigDecimal unitPrice;
	private BigDecimal priceMultiplier;
	private Byte taxable;
	private String oper;
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "cuSOLogId", unique = true, nullable = false)
	public Integer getCuSOLogId() {
		return cuSOLogId;
	}

	public void setCuSOLogId(Integer cuSOLogId) {
		this.cuSOLogId = cuSOLogId;
	}

	@Column(name = "cuSOID")
	public Integer getCuSoid() {
		return cuSoid;
	}

	public void setCuSoid(Integer cuSoid) {
		this.cuSoid = cuSoid;
	}

	@Column(name = "ChangedByID")
	public Integer getChangedById() {
		return changedById;
	}

	public void setChangedById(Integer changedById) {
		this.changedById = changedById;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ChangedOn", length = 0)
	public Date getChangedOn() {
		return changedOn;
	}

	public void setChangedOn(Date changedOn) {
		this.changedOn = changedOn;
	}

	@Column(name = "cuSODetailID")
	public Integer getCuSodetailId() {
		return cuSodetailId;
	}

	public void setCuSodetailId(Integer cuSodetailId) {
		this.cuSodetailId = cuSodetailId;
	}

	@Column(name = "prMasterID")
	public Integer getPrMasterId() {
		return prMasterId;
	}

	public void setPrMasterId(Integer prMasterId) {
		this.prMasterId = prMasterId;
	}

	@Column(name = "Description", length = 50)
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "Note")
	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	@Column(name = "QuantityOrdered", scale = 4)
	public BigDecimal getQuantityOrdered() {
		return quantityOrdered;
	}

	public void setQuantityOrdered(BigDecimal quantityOrdered) {
		this.quantityOrdered = quantityOrdered;
	}

	@Column(name = "QuantityReceived", scale = 4)
	public BigDecimal getQuantityReceived() {
		return quantityReceived;
	}

	public void setQuantityReceived(BigDecimal quantityReceived) {
		this.quantityReceived = quantityReceived;
	}

	@Column(name = "QuantityBilled", scale = 4)
	public BigDecimal getQuantityBilled() {
		return quantityBilled;
	}

	public void setQuantityBilled(BigDecimal quantityBilled) {
		this.quantityBilled = quantityBilled;
	}

	@Column(name = "UnitCost", scale = 4)
	public BigDecimal getUnitCost() {
		return unitCost;
	}

	public void setUnitCost(BigDecimal unitCost) {
		this.unitCost = unitCost;
	}

	@Column(name = "UnitPrice", scale = 4)
	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	@Column(name = "PriceMultiplier", scale = 4)
	public BigDecimal getPriceMultiplier() {
		return priceMultiplier;
	}

	public void setPriceMultiplier(BigDecimal priceMultiplier) {
		this.priceMultiplier = priceMultiplier;
	}

	@Column(name = "Taxable")
	public Byte getTaxable() {
		return taxable;
	}

	public void setTaxable(Byte taxable) {
		this.taxable = taxable;
	}
	@Column(name = "oper")
	public String getOper() {
		return oper;
	}

	public void setOper(String oper) {
		this.oper = oper;
	}

}
