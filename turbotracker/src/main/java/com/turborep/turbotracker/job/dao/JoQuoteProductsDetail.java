package com.turborep.turbotracker.job.dao;

import static javax.persistence.GenerationType.IDENTITY;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
@Entity
@Table(name = "JoQuoteProductsDetail", catalog = "")
public class JoQuoteProductsDetail implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	
	private int 	joQuoteProductsDetailID;
	private int prMasterID;
	private String ProductNo;
	private String Description;
	private int joQuoteDetailMstrID;
	private BigDecimal  Qty;
	private BigDecimal  CostEach;
	private BigDecimal Total;
	
	 

	
	
	@Id 
	@GeneratedValue(strategy=IDENTITY)
	@Column(name="joQuoteProductsDetailID", unique=true, nullable=false)
	
	public int getJoQuoteProductsDetailID() {
		return joQuoteProductsDetailID;
	}
	public void setJoQuoteProductsDetailID(int joQuoteProductsDetailID) {
		this.joQuoteProductsDetailID = joQuoteProductsDetailID;
	}
	@Column(name="prMasterID")
	public int getPrMasterID() {
		return prMasterID;
	}
	public void setPrMasterID(int prMasterID) {
		this.prMasterID = prMasterID;
	}
	@Column(name="Qty")
	public BigDecimal getQty() {
		return Qty;
	}
	public void setQty(BigDecimal qty) {
		Qty = qty;
	}
	@Column(name="CostEach")
	public BigDecimal getCostEach() {
		return CostEach;
	}
	public void setCostEach(BigDecimal costEach) {
		CostEach = costEach;
	}
	@Column(name="Total")
	public BigDecimal getTotal() {
		return Total;
	}
	public void setTotal(BigDecimal total) {
		Total = total;
	}
	public String getProductNo() {
		return ProductNo;
	}
	public void setProductNo(String productNo) {
		ProductNo = productNo;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public int getJoQuoteDetailMstrID() {
		return joQuoteDetailMstrID;
	}
	public void setJoQuoteDetailMstrID(int joQuoteDetailMstrID) {
		this.joQuoteDetailMstrID = joQuoteDetailMstrID;
	}
		
  
	

}
