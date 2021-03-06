jQuery(document).ready(function() {
	document.getElementById("taxTerritoryFromID").reset();
	$( "input#searchJob" ).attr("placeholder","Minimum 2 characters required to get Tax Territory list");
	loadTaxTerritories();
	$(".charts_tabs_main").tabs({
		cache: true,
		ajaxOptions: {
			data: {  },
			error: function(xhr, status, index, anchor) {
				$(anchor.hash).html("<div align='center' style='height: 386px;padding-top: 200px;'>"+
						"<label style='font-size : 17px;margin-left: 30px;vertical-align: middle;'>Couldn't load this tab. Please try again later."+
						"</label></div>");
			}
		},
		load: function (e, ui) {$(ui.panel).find(".tab-loading").remove();},
		select: function (e, ui) {
			//window.location.hash = ui.tab.hash;
			var $panel = $(ui.panel);
			if ($panel.is(":empty")) {
				$panel.append("<div class='tab-loading' align='center' style='height: 350px;padding-top: 200px;background-color: #FAFAFA'>"+
						"<img src='./../resources/scripts/jquery-autocomplete/loading.gif'></div>");
			}
		}
	});
});

var newDialogDiv = jQuery(document.createElement('div'));

function loadTaxTerritories(){
	$("#taxTerritoryGrid").jqGrid({
		datatype: 'json',
		mtype: 'POST',
		url:'./company/taxTerritoriesList',
	   	colNames:['coTaxTerritoryID', 'County', 'State', 'CountyCode', 'TaxRate', 'Distribution1', 'Distribution2', 'Distribution3', 'distribution4', 'distribution5',
	   	          'distribution6', 'distribution7', 'distribution8', 'hasSurtax', 'surtaxCap', 'surtaxRate', 'multiRate', 'rate2', 'from2', 'rate3',
	   	          'from3', 'rate4', 'from4', 'rate5', 'from5', 'rate6', 'from6', 'taxShipping', 'distDesc1', 'distDesc2', 
	   	          'distDesc3', 'distDesc4', 'distDesc5', 'distDesc6', 'distDesc7', 'distDesc8', 'gRDate', 'gRTaxRate', 'gRDistribution1', 'gRDistribution2',
	   	          'gRDistribution3', 'gRDistribution4', 'gRDistribution5', 'gRDistribution6', 'gRDistribution7', 'gRDistribution8', 'gRSurtaxCap', 'gRSurtaxRate', 'gRRate1', 'gRRate2',
	   	          'gRRate3', 'gRRate4', 'gRRate5', 'gRRate6'],
		colModel:[
		    {name:'coTaxTerritoryId',index:'coTaxTerritoryId', width:40,editable:false, hidden:true, editrules:{required:true}, editoptions:{}},
			{name:'county',index:'county', width:120,editable:true, editrules:{required:true}, editoptions:{}},
			{name:'state',index:'state',align:'center', width:100,editable:true, hidden:false, editrules:{required:true}, editoptions:{}},
			{name:'countyCode',index:'countyCode',align:'center', width:80,editable:true, hidden:true, editrules:{required:true}, editoptions:{}},
			{name:'taxRate',index:'taxRate', width:100,editable:true, editrules:{required:true}, editoptions:{}, hidden:true},
			{name:'distribution1',index:'distribution1', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distribution2',index:'distribution2', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distribution3',index:'distribution3', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distribution4',index:'distribution4', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distribution5',index:'distribution5', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distribution6',index:'distribution6', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distribution7',index:'distribution7', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distribution8',index:'distribution8', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'hasSurtax',index:'hasSurtax', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'surtaxCap',index:'surtaxCap', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'surtaxRate',index:'surtaxRate', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'multiRate',index:'multiRate', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'rate2',index:'rate2', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'from2',index:'from2', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'rate3',index:'rate3', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'from3',index:'from3', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'rate4',index:'rate4', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'from4',index:'from4', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'rate5',index:'rate5', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'from5',index:'from5', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'rate6',index:'rate6', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'form6',index:'form6', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'taxShipping',index:'taxShipping', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distDesc1',index:'distDesc1', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distDesc2',index:'distDesc2', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distDesc3',index:'distDesc3', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distDesc4',index:'distDesc4', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distDesc5',index:'distDesc5', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distDesc6',index:'distDesc6', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distDesc7',index:'distDesc7', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'distDesc8',index:'distDesc8', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRDate',index:'gRDate', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRTaxRate',index:'gRTaxRate', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRDistribution1',index:'gRDistribution1', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRDistribution2',index:'gRDistribution2', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRDistribution3',index:'gRDistribution3', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRDistribution4',index:'gRDistribution4', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRDistribution5',index:'gRDistribution5', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRDistribution6',index:'gRDistribution6', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRDistribution7',index:'gRDistribution7', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRDistribution8',index:'gRDistribution8', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
		    {name:'gRSurtaxCap',index:'gRSurtaxCap',  width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRSurtaxRate',index:'gRSurtaxRate',width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRRate1',index:'gRRate1', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRRate2',index:'gRRate2', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRRate3',index:'gRRate3', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRRate4',index:'gRRate4', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRRate5',index:'gRRate5', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true},
			{name:'gRRate6',index:'gRRate6', width:60,editable:true, editrules:{}, editoptions:{}, hidden:true}
		],
		rowNum: 500,	
		pgbuttons: false,	
		recordtext: '',
		sortorder: "asc",
		altRows: true,
		altclass:'myAltRowClass',
		imgpath: 'themes/basic/images',
		caption: 'Tax Territory',
		height:480,	width: 350,/*scrollOffset:0,*/rownumbers:true,rownumWidth:34,
		loadonce: false,
		onSelectRow: function(rowId){
    		loadTerritoryDetails(rowId);
    	},
	    jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            cell: "cell",
            id: "id",
            userdata: "userdata"
    	}
	});
	return true;
}

function openAddtaxTerritoryDialog(){
	document.getElementById("addNewTaxTerritoryFormID").reset();
	jQuery("#addNewTaxTerritoryDialog").dialog("open");	
	return true;
}

jQuery( function(){
	jQuery("#addNewTaxTerritoryDialog").dialog({
		autoOpen:false,
		height:180,
		width:400,
		title:"Add New Tax Territory",
		modal:true,
		close:function(){
			return true;
		}
	});
});

function cancelAddTaxTerritory(){
	jQuery("#addNewTaxTerritoryDialog").dialog("close");
	return true;
}

/** Account Search List **/
$(function() { var cache = {}; var lastXhr='';
	$( "#searchJob" ).autocomplete({ minLength: 2,timeout :1000,
		select: function (event, ui) { var accountsID = ui.item.id; getAccoutsDetails(accountsID);	},
		open: function(){ $('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading"); },
		source: function( request, response ) { var term = request.term;
			if ( term in cache ) { response( cache[ term ] ); 	return; 	}
			lastXhr = $.getJSON( "search/searchAccountsList", request, function( data, status, xhr ) { cache[ term ] = data; if ( xhr === lastXhr ) { response( data ); 	} });
		},
		error: function (result) { $('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading"); }
	}); 
});

/**
[
 'coTaxTerritoryID', 'County', 'State', 'CountyCode', 'TaxRate', 'Distribution1', 'Distribution2', 'Distribution3', 'distribution4', 'distribution5',
 'distribution6', 'distribution7', 'distribution8', 'hasSurtax', 'surtaxCap', 'surtaxRate', 'multiRate', 'rate2', 'from2', 'rate3',
 'from3', 'rate4', 'from4', 'rate5', 'from5', 'rate6', 'from6', 'taxShipping', 'distDesc1', 'distDesc2', 
 'distDesc3', 'distDesc4', 'distDesc5', 'distDesc6', 'distDesc7', 'distDesc8', 'gRDate', 'gRTaxRate', 'gRDistribution1', 'gRDistribution2',
 'gRDistribution3', 'gRDistribution4', 'gRDistribution5', 'gRDistribution6', 'gRDistribution7', 'gRDistribution8', 'gRSurtaxCap', 'gRSurtaxRate', 'gRRate1', 'gRRate2',
 'gRRate3', 'gRRate4', 'gRRate5', 'gRRate6'
]
 * **/

/***********************
var anObj = {
		"state":"GA","coTaxTerritoryId":1,"county":"Upson","taxRate":7.0000,"countyCode":"145",
		"distribution1":0.0000,"distribution2":1.0000,"distribution3":0.0000,"distribution4":1.0000,"distribution5":1.0000,"distribution6":0.0000,"distribution7":0.0000,"distribution8":0.0000,
		"hasSurtax":null,"surtaxCap":null,"surtaxRate":null,"multiRate":false,
		"rate2":null,"from2":null,
		"rate3":null,"from3":null,
		"rate4":null,"from4":null,
		"rate5":null,"from5":null,
		"rate6":null,"from6":null,
		
		"taxShipping":false,"distDesc1":null,"distDesc2":null,"distDesc3":null,"distDesc4":null,"distDesc5":null,"distDesc6":null,"distDesc7":null,"distDesc8":null,"gRDate":null,"gRTaxRate":null,
		"gRDistribution1":null,"gRDistribution2":null,"gRDistribution3":null,"gRDistribution4":null,"gRDistribution5":null,"gRDistribution6":null,"gRDistribution7":null,"gRDistribution8":null,
		"gRSurtaxCap":null,"gRSurtaxRate":null,"gRRate1":null,"gRRate2":null,"gRRate3":null,"gRRate4":null,"gRRate5":null,"gRRate6":null
};
*****************************/

/**
 * Method is used to read data from grid and put in details form.
 * @param rowId
 */
function loadTerritoryDetails(rowId){
	document.getElementById("taxTerritoryFromID").reset();
	var rowData = jQuery("#taxTerritoryGrid").getRowData(rowId);
	$("#stateID").val(rowData['state']);
	$("#CountyCodeId").val(rowData['countyCode']);
	$("#CountyDecriptionId").val(rowData['county']);
	$("#taxRateID").val(formatCurrency(rowData['taxRate']).replace("$", ""));
	$("#GRTaxRateId").val(formatCurrency(rowData['gRTaxRate']).replace("$", ""));
	$("#DistDescId1").val(rowData['distDesc1']);
	$("#DistDescId2").val(rowData['distDesc2']);
	$("#DistDescId3").val(rowData['distDesc3']);
	$("#DistDescId4").val(rowData['distDesc4']);
	$("#DistDescId5").val(rowData['distDesc5']);
	$("#DistDescId6").val(rowData['distDesc6']);
	$("#DistDescId7").val(rowData['distDesc7']);
	$("#DistDescId8").val(rowData['distDesc8']);
	$("#DistributionId1").val(formatCurrency(rowData['distribution1']).replace("$", ""));
	$("#DistributionId2").val(formatCurrency(rowData['distribution2']).replace("$", ""));
	$("#DistributionId3").val(formatCurrency(rowData['distribution3']).replace("$", ""));
	$("#DistributionId4").val(formatCurrency(rowData['distribution4']).replace("$", ""));
	$("#DistributionId5").val(formatCurrency(rowData['distribution5']).replace("$", ""));
	$("#DistributionId6").val(formatCurrency(rowData['distribution6']).replace("$", ""));
	$("#DistributionId7").val(formatCurrency(rowData['distribution7']).replace("$", ""));
	$("#DistributionId8").val(formatCurrency(rowData['distribution8']).replace("$", ""));
	$("#GRDistributionId1").val(formatCurrency(rowData['gRDistribution1']).replace("$", ""));
	$("#GRDistributionId1").val(formatCurrency(rowData['gRDistribution2']).replace("$", ""));
	$("#GRDistributionId1").val(formatCurrency(rowData['gRDistribution3']).replace("$", ""));
	$("#GRDistributionId1").val(formatCurrency(rowData['gRDistribution4']).replace("$", ""));
	$("#GRDistributionId1").val(formatCurrency(rowData['gRDistribution5']).replace("$", ""));
	$("#GRDistributionId1").val(formatCurrency(rowData['gRDistribution6']).replace("$", ""));
	$("#GRDistributionId1").val(formatCurrency(rowData['gRDistribution7']).replace("$", ""));
	$("#GRDistributionId1").val(formatCurrency(rowData['gRDistribution8']).replace("$", ""));
	
	$("#rateId2").val(formatCurrency(rowData['rate2']).replace("$", ""));
	$("#rateId3").val(formatCurrency(rowData['rate3']).replace("$", ""));
	$("#rateId4").val(formatCurrency(rowData['rate4']).replace("$", ""));
	$("#rateId5").val(formatCurrency(rowData['rate5']).replace("$", ""));
	$("#rateId6").val(formatCurrency(rowData['rate6']).replace("$", ""));
	$("#fromId2").val(formatCurrency(rowData['from2']).replace("$", ""));
	$("#fromId3").val(formatCurrency(rowData['from3']).replace("$", ""));
	$("#fromId4").val(formatCurrency(rowData['from4']).replace("$", ""));
	$("#fromId5").val(formatCurrency(rowData['from5']).replace("$", ""));
	$("#fromId6").val(formatCurrency(rowData['from6']).replace("$", ""));

	$("#capID").val(formatCurrency(rowData['surtaxCap']).replace("$", ""));
	$("#rateID").val(formatCurrency(rowData['surtaxRate']).replace("$", ""));
	
	return true;
}


function deleteTaxTerritoryDetails(){
	var grid = $("#taxTerritoryGrid");
	var newDialogDiv = jQuery(document.createElement('div'));
	var rowId = grid.jqGrid('getGridParam', 'selrow');
	if(rowId !== null){
		jQuery(newDialogDiv).html('<span><b style="color: red;">Delete the Territory Record?</b></span>');
		jQuery(newDialogDiv).dialog({modal: true, width:300, height:120, title:"Confirm Delete", 
			buttons:{
				"Submit": function(){
					var taxTerritoryId = grid.jqGrid('getCell', rowId, 'coTaxTerritoryId');
					deleteTaxTerritory(taxTerritoryId); 
					jQuery(this).dialog("close");
					$("#taxTerritoryGrid").trigger("reloadGrid");
				},
				Cancel: function ()	{jQuery(this).dialog("close");} } }).dialog("open");
		return true;
	} else {
		var errorText = "Please click one of the Territory to Delete.";
		jQuery(newDialogDiv).attr("id","msgDlg");
		jQuery(newDialogDiv).html('<span><b style="color:red;">'+errorText+'</b></span>');
		jQuery(newDialogDiv).dialog({modal: true, width:300, height:150, title:"Warning",
		buttons: [{height:30,text: "OK",click: function() { $(this).dialog("close"); }}]}).dialog("open");
		return false;
	}
}

function deleteTaxTerritory(coTaxTerritoryID){
	$.ajax({
		url: "./company/deleteTaxTerritory",
		type: "POST",
		data : {"cotaxTerritoryId": coTaxTerritoryID},
		success: function(data) {
			jQuery(newDialogDiv).html('<span><b style="color:Green;">Tax Territory Deleted Successfully</b></span>');
			jQuery(newDialogDiv).dialog({modal: true, width:300, height:150, title:"Success.", 
									buttons: [{height:30,text: "OK",click: function() {  $(this).dialog("close");$("#taxTerritoryGrid").trigger("reloadGrid"); }}]}).dialog("open");
		}
	});
}

function saveNewTaxTerritory(){
	var formData = $("#addNewTaxTerritoryFormID").serialize();
	$.ajax({
		url: "./company/addNewTerritory",
		type: "POST",
		data : formData,
		success: function(data) {
			jQuery("#addNewTaxTerritoryDialog").dialog("close");
			jQuery(newDialogDiv).html('<span><b style="color:Green;">Tax Territory Deleted Successfully</b></span>');
			jQuery(newDialogDiv).dialog({modal: true, width:300, height:150, title:"Success.", 
					buttons: [{height:30,text: "OK",click: function() {  $(this).dialog("close");$("#taxTerritoryGrid").trigger("reloadGrid"); }}]}).dialog("open");
		}
	});
	return true;
}

function saveTaxTerritory(){
	var grid = $("#taxTerritoryGrid");
	var rowIds = grid.jqGrid('getGridParam', 'selrow');
	if (rowIds === null) {
		var errorText = "Please select a tax territory to edit";
		var newDialogDiv = jQuery(document.createElement('div'));
		jQuery(newDialogDiv).attr("id", "msgDlg");
		jQuery(newDialogDiv).html('<span><b style="color:red;">' + errorText + '</b></span>');
		jQuery(newDialogDiv).dialog({modal : true,width : 300,height : 150,title : "Warning",buttons : [ {height : 35,text : "OK",click : function() {$(this).dialog("close");}} ]}).dialog("open");
		return false;
	}else{
		var aCustomerPONumber = grid.jqGrid('getCell', rowIds, 'coTaxTerritoryId');
		var formData = $("#taxTerritoryFromID").serialize();
		$.ajax({
			url: "./company/editTaxterritory",
			type: "POST",
			data : formData+'&cotaxterritorryId='+aCustomerPONumber,
			success: function(data) {
				jQuery("#addNewTaxTerritoryDialog").dialog("close");
				msgOnAjax("Tax Territory successfully updated.", "#1990C8", 3000);
			}
		});
	}
}