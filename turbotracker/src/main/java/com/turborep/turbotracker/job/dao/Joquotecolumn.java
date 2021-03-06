package com.turborep.turbotracker.job.dao;

// Generated Jul 9, 2014 5:57:18 PM by Hibernate Tools 3.4.0.CR1

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Joquotecolumn generated by hbm2java
 */
@Entity
@Table(name = "joQuoteColumn", catalog = "BacheCompany")
public class Joquotecolumn implements java.io.Serializable {

	private JoquotecolumnId id;
	
	
	
	private String column1label;
	private int coOrder1Id;
	private int Joquotecolumn1Id;

	private String column2label;
	private int coOrder2Id;
	private int Joquotecolumn2Id;
	
	private String column3label;
	private int coOrder3Id;
	private int Joquotecolumn3Id;

	private String column4label;
	private int coOrder4Id;
	private int Joquotecolumn4Id;
	
	private String column5label;
	private int coOrder5Id;
	private int Joquotecolumn5Id;
	
	private String column6label;
	private int coOrder6Id;
	private int Joquotecolumn6Id;
	
	private String column7label;
	private int coOrder7Id;
	private int Joquotecolumn7Id;
	
	private String column8label;
	private int coOrder8Id;
	private int Joquotecolumn8Id;
	
	private String columnName;
	
	private String column1Name;
	private String column2Name;
	private String column3Name;
	private String column4Name;
	private String column5Name;
	private String column6Name;
	private String column7Name;
	private String column8Name;
	
	public Joquotecolumn() {
	} 

	public Joquotecolumn(JoquotecolumnId id) {
		this.id = id;
	}

	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "joQuoteColumnId", column = @Column(name = "joQuoteColumnID", nullable = false)),
			@AttributeOverride(name = "colDisplay", column = @Column(name = "colDisplay")),
			@AttributeOverride(name = "colPrint", column = @Column(name = "colPrint")),
			@AttributeOverride(name = "coLabel", column = @Column(name = "coLabel", length = 50)),
			@AttributeOverride(name = "coOrder", column = @Column(name = "coOrder")),
			@AttributeOverride(name = "widthAdjust", column = @Column(name = "WidthAdjust")) })
	public JoquotecolumnId getId() {
		return this.id;
	}

	public void setId(JoquotecolumnId id) {
		this.id = id;
	}
	@Transient
	public String getColumn1label() {
		return column1label;
	}

	public void setColumn1label(String column1label) {
		this.column1label = column1label;
	}
	@Transient
	public int getCoOrder1Id() {
		return coOrder1Id;
	}

	public void setCoOrder1Id(int coOrder1Id) {
		this.coOrder1Id = coOrder1Id;
	}
	@Transient
	public int getJoquotecolumn1Id() {
		return Joquotecolumn1Id;
	}

	public void setJoquotecolumn1Id(int joquotecolumn1Id) {
		Joquotecolumn1Id = joquotecolumn1Id;
	}
	@Transient
	public String getColumn2label() {
		return column2label;
	}

	public void setColumn2label(String column2label) {
		this.column2label = column2label;
	}
	@Transient
	public int getCoOrder2Id() {
		return coOrder2Id;
	}

	public void setCoOrder2Id(int coOrder2Id) {
		this.coOrder2Id = coOrder2Id;
	}
	@Transient
	public int getJoquotecolumn2Id() {
		return Joquotecolumn2Id;
	}

	public void setJoquotecolumn2Id(int joquotecolumn2Id) {
		Joquotecolumn2Id = joquotecolumn2Id;
	}
	@Transient
	public String getColumn3label() {
		return column3label;
	}

	public void setColumn3label(String column3label) {
		this.column3label = column3label;
	}
	@Transient
	public int getCoOrder3Id() {
		return coOrder3Id;
	}

	public void setCoOrder3Id(int coOrder3Id) {
		this.coOrder3Id = coOrder3Id;
	}
	@Transient
	public int getJoquotecolumn3Id() {
		return Joquotecolumn3Id;
	}

	public void setJoquotecolumn3Id(int joquotecolumn3Id) {
		Joquotecolumn3Id = joquotecolumn3Id;
	}
	@Transient
	public String getColumn4label() {
		return column4label;
	}

	public void setColumn4label(String column4label) {
		this.column4label = column4label;
	}
	@Transient
	public int getCoOrder4Id() {
		return coOrder4Id;
	}

	public void setCoOrder4Id(int coOrder4Id) {
		this.coOrder4Id = coOrder4Id;
	}
	@Transient
	public int getJoquotecolumn4Id() {
		return Joquotecolumn4Id;
	}

	public void setJoquotecolumn4Id(int joquotecolumn4Id) {
		Joquotecolumn4Id = joquotecolumn4Id;
	}
	@Transient
	public String getColumn5label() {
		return column5label;
	}

	public void setColumn5label(String column5label) {
		this.column5label = column5label;
	}
	@Transient
	public int getCoOrder5Id() {
		return coOrder5Id;
	}

	public void setCoOrder5Id(int coOrder5Id) {
		this.coOrder5Id = coOrder5Id;
	}
	@Transient
	public int getJoquotecolumn5Id() {
		return Joquotecolumn5Id;
	}

	public void setJoquotecolumn5Id(int joquotecolumn5Id) {
		Joquotecolumn5Id = joquotecolumn5Id;
	}
	@Transient
	public String getColumn6label() {
		return column6label;
	}

	public void setColumn6label(String column6label) {
		this.column6label = column6label;
	}
	@Transient
	public int getCoOrder6Id() {
		return coOrder6Id;
	}

	public void setCoOrder6Id(int coOrder6Id) {
		this.coOrder6Id = coOrder6Id;
	}
	@Transient
	public int getJoquotecolumn6Id() {
		return Joquotecolumn6Id;
	}

	public void setJoquotecolumn6Id(int joquotecolumn6Id) {
		Joquotecolumn6Id = joquotecolumn6Id;
	}
	@Transient
	public String getColumn7label() {
		return column7label;
	}

	public void setColumn7label(String column7label) {
		this.column7label = column7label;
	}
	@Transient
	public int getCoOrder7Id() {
		return coOrder7Id;
	}

	public void setCoOrder7Id(int coOrder7Id) {
		this.coOrder7Id = coOrder7Id;
	}
	@Transient
	public int getJoquotecolumn7Id() {
		return Joquotecolumn7Id;
	}

	public void setJoquotecolumn7Id(int joquotecolumn7Id) {
		Joquotecolumn7Id = joquotecolumn7Id;
	}
	@Transient
	public String getColumn8label() {
		return column8label;
	}

	public void setColumn8label(String column8label) {
		this.column8label = column8label;
	}
	@Transient
	public int getCoOrder8Id() {
		return coOrder8Id;
	}

	public void setCoOrder8Id(int coOrder8Id) {
		this.coOrder8Id = coOrder8Id;
	}
	@Transient
	public int getJoquotecolumn8Id() {
		return Joquotecolumn8Id;
	}

	public void setJoquotecolumn8Id(int joquotecolumn8Id) {
		Joquotecolumn8Id = joquotecolumn8Id;
	}
	@Transient
	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	@Transient
	public String getColumn1Name() {
		return column1Name;
	}

	public void setColumn1Name(String column1Name) {
		this.column1Name = column1Name;
	}
	@Transient
	public String getColumn2Name() {
		return column2Name;
	}

	public void setColumn2Name(String column2Name) {
		this.column2Name = column2Name;
	}
	@Transient
	public String getColumn3Name() {
		return column3Name;
	}

	public void setColumn3Name(String column3Name) {
		this.column3Name = column3Name;
	}
	@Transient
	public String getColumn4Name() {
		return column4Name;
	}

	public void setColumn4Name(String column4Name) {
		this.column4Name = column4Name;
	}
	@Transient
	public String getColumn5Name() {
		return column5Name;
	}

	public void setColumn5Name(String column5Name) {
		this.column5Name = column5Name;
	}
	@Transient
	public String getColumn6Name() {
		return column6Name;
	}

	public void setColumn6Name(String column6Name) {
		this.column6Name = column6Name;
	}
	@Transient
	public String getColumn7Name() {
		return column7Name;
	}

	public void setColumn7Name(String column7Name) {
		this.column7Name = column7Name;
	}
	@Transient
	public String getColumn8Name() {
		return column8Name;
	}

	public void setColumn8Name(String column8Name) {
		this.column8Name = column8Name;
	}

}
