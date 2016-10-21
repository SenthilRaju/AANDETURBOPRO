package com.turborep.turbotracker.job.dao;

import org.json.JSONObject;

public class JobsNameBean implements java.io.Serializable{
	
	
	String jJobNumber,rxCustomerID,description;

	public String getjJobNumber() {
		return jJobNumber;
	}

	public void setjJobNumber(String jJobNumber) {
		this.jJobNumber = jJobNumber;
	}

	public String getRxCustomerID() {
		return rxCustomerID;
	}

	public void setRxCustomerID(String rxCustomerID) {
		this.rxCustomerID = rxCustomerID;
	}

	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
	public JobsNameBean() {
		
	}

	public JobsNameBean(String jJobNumber, String rxCustomerID, String description) {
		super();
		this.jJobNumber = jJobNumber;
		this.rxCustomerID = rxCustomerID;
		this.description = description;
	}

	public JSONObject getJSONObject() {
        JSONObject obj = new JSONObject();
        try {
            obj.put("jJobNumber", jJobNumber);
            obj.put("rxCustomerID", rxCustomerID);
            obj.put("description", description);
        } catch (Exception e) {
            //trace("DefaultListItem.toString JSONException: "+e.getMessage());
        }
        return obj;
    }
	
	

}
