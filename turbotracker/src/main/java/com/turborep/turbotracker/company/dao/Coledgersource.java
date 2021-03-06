package com.turborep.turbotracker.company.dao;

// Generated Jan 23, 2012 5:39:26 PM by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Coledgersource generated by hbm2java
 */
@Entity
@Table(name = "coledgersource", catalog = "")
public class Coledgersource implements java.io.Serializable {

	private int coLedgerSourceId;
	private String description;
	private String JournalID;
	public Coledgersource() {
	}

	public Coledgersource(int coLedgerSourceId) {
		this.coLedgerSourceId = coLedgerSourceId;
	}

	public Coledgersource(int coLedgerSourceId, String description) {
		this.coLedgerSourceId = coLedgerSourceId;
		this.description = description;
	}

	@Id
	@Column(name = "coLedgerSourceID", unique = true, nullable = false)
	public int getCoLedgerSourceId() {
		return this.coLedgerSourceId;
	}

	public void setCoLedgerSourceId(int coLedgerSourceId) {
		this.coLedgerSourceId = coLedgerSourceId;
	}

	@Column(name = "Description", length = 50)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getJournalID() {
		return JournalID;
	}

	public void setJournalID(String journalID) {
		JournalID = journalID;
	}

}
