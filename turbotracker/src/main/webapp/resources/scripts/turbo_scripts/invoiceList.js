var estimatedamountRelease;
var fromDate = '';
var toDate = '';
var searchData = '';
var customerName = '';
var _globalStatus = true;
var cuInvOut_LineItemsToBeDeleted = new Array();
var _globalold_cIgeneralTotalform;
var _globalold_cIgeneralform;
var _globalold_cIlineitemform;
var globalinsideoroutsidejob = true;

var _globaloldcustomerInvoiceform;
var _globaloldcustomerInvoicegrid;
var _globaloldcustomerInvoiceformTotal;

var chkoverridetaxterritory = getSysvariableStatusBasedOnVariableName("OverrideReleaseTaxTerritory");
if (chkoverridetaxterritory != null
		&& chkoverridetaxterritory[0].valueLong == 1) {
	_global_override_taxTerritory = true;
} else {
	_global_override_taxTerritory = false;
}

/*
 * _globalold_cIgeneralform = $("#custoemrInvoiceFormID").serialize();
 * 
 */
/*
 * function ResetDetails() { searchData = ''; $('#searchJob').val('');
 * //$("input:text").addClass("ui-state-default ui-corner-all");
 * $("#CuInvoiceSaveID").css("display", "block");
 * $("#CuInvoiceSaveCloseID").css("display", "block");
 * $("#CuInvoiceCancel").css("display", "none");
 * $("#CuInvoiceLineSaveID").css("display", "block");R
 * $("#CuInvoiceLineSaveCloseID").css("display", "block");
 * //$("#CuInvoiceLineCancel").css("display", "none");
 * $('#customerInvoice_lineproNumberID').prop("disabled",true);
 * $('#customerInvoice_lineinvoiceNumberId').prop("disabled",true);
 * $('#customerInvoice_lineinvoiceDateID').prop("disabled",true);
 * $('#customerInvoice_lineshipDateID').prop("disabled",true);
 * $("#resetbutton").css("display", "inline-block"); var warehouse;
 * callEnableDate(); $('#fromDate').datepicker(); $('#toDate').datepicker()tus
 * $("#fromDate").prop('disabled',true); $("#toDate").prop('disabled',true);
 * showCustomerInvoiceList(searchData,fromDate,toDate);
 * $('#cusinvoicetab').bind('dialogclose', function(event) {
 * document.location.href ="./createinvoice?oper=create"; });
 * 
 * $(document).ready(function () { $("#cusinvoicetab").dialog({ autoOpen: false
 * }); }); }
 */

jQuery(document).ready(function() {
	$(":button").dblclick(function(e) {

		return false;

	});
	// $("input:text").addClass("ui-state-default ui-corner-all");
	CKEDITOR.replace('InvoiceLineItemNoteID', ckEditorconfig);
	$("#CuInvoiceSaveID").css("display", "block");
	$("#CuInvoiceSaveCloseID").css("display", "block");
	$("#CuInvoiceCancel").css("display", "none");
	$("#CuInvoiceLineSaveID").css("display", "block");
	$("#CuInvoiceLineSaveCloseID").css("display", "block");
	// $("#CuInvoiceLineCancel").css("display", "none");
	$('#customerInvoice_lineproNumberID').prop("disabled", true);
	$('#customerInvoice_lineinvoiceNumberId').prop("disabled", true);
	$('#customerInvoice_lineinvoiceDateID').prop("disabled", true);
	$('#customerInvoice_lineshipDateID').prop("disabled", true);
	$("#resetbutton").css("display", "inline-block");
	$("#mailTimestampLines").hide();
	$("#mailTimestampGeneral").hide();
	var warehouse;
	callEnableDate();
	$('#fromDate').datepicker();
	$('#toDate').datepicker();
	$("#fromDate").prop('disabled', true);
	$("#toDate").prop('disabled', true);
	showCustomerInvoiceList(searchData, fromDate, toDate);

	// $('#batchInvoiceFromDate').datepicker().datepicker("setDate", new
	// Date());

	$("#batchInvoiceFromDate").datepicker({
		dateFormat : "mm/dd/yy",

		onSelect : function(date) {
			var date2 = $('#batchInvoiceFromDate').datepicker('getDate');
			date2.setDate(date2.getDate());
			$('#batchInvoiceToDate').datepicker('option', 'minDate', date2);
			// var date3=date2.setDate(date2.getDate()+15);

			$("#batchInvoiceToDate").datepicker({
				dateFormat : "mm/dd/yy"
			});

			var date4 = new Date();
			date4.setDate(date2.getDate() + 15);

			$('#batchInvoiceToDate').datepicker('setDate', date4);
			// sets minDate to dt1 date + 1

			$('#batchInvoiceToDate').datepicker('option', 'maxDate', date4);
		}
	});

	$("#batchInvoiceToDate").datepicker({
		dateFormat : "mm/dd/yy",
		beforeShow : function() {
			var startDate = $("#batchInvoiceFromDate").datepicker('getDate');
			var minDate = $("#batchInvoiceFromDate").datepicker('getDate');
			if (startDate != null) {

				// $(this).datepicker('setDate',startDate);
				// minDate.setDate(minDate.getDate());
				// $(this).datepicker('option', 'minDate',minDate);
				// startDate.setDate(startDate.getDate()+15);
				// $(this).datepicker('option', 'maxDate',startDate);
			}
		}
	});

	// $("#batchInvoiceToDate").datepicker().datepicker("setDate", new Date());
	/*
	 * $("#salesrelease").dialog({ open : function(event, ui) {
	 * $('#salesreleasetab').tabs({ selected: 0 }); var cusoid =
	 * $('#Cuso_ID').text();
	 * 
	 * if (cusoid == '') { $("#salesreleasetab").tabs({ disabled : [ 1, 2 ] }); }
	 * else { $("#salesreleasetab").tabs({ disabled : false }); } } });
	 */

	$("#customerInvoice_invoiceDateID").change(function() {
		validateDateAgainstOpenPeriod('customerInvoice_invoiceDateID');
		paymentTermsDue($('#customerinvoicepaymentId').val());
	});
	$('#cusinvoicetab').bind('dialogclose', function(event) {
		document.location.href = "./createinvoice?oper=create";
	});

	$(document).ready(function() {
		$("#cusinvoicetab").dialog({
			autoOpen : false
		});
	});

	// getcoFiscalPerliodDate("customerInvoice_invoiceDateID");
	// getcoFiscalPerliodDate("customerInvoice_dueDateID");
	// getcoFiscalPerliodDate("customerInvoice_lineinvoiceDateID");

	loadEmployeeCategories();
	// Double click event disabled
	$(":button").dblclick(function() {
		return false;
	});

	//$("#customerInvoiceokrowidbutton").hide();
});

function loadEmployeeCategories() {
	$.ajax({
		url : "./salesOrderController/loadEmpCategories",
		type : "GET",
		success : function(data) {
			$('#JobCu_inv_Category1label').text(data.customerCategory1);
			$('#JobCu_inv_Category2label').text(data.customerCategory2);
			$('#JobCu_inv_Category3label').text(data.customerCategory3);
			$('#JobCu_inv_Category4label').text(data.customerCategory4);
			$('#JobCu_inv_Category5label').text(data.customerCategory5);
		}
	});
}

function callEnableDate() {
	if (document.getElementById("fromDate").disabled) {
		$("#fromDate").prop('disabled', false);
		$("#toDate").prop('disabled', false);
	} else {
		$("#fromDate").val("");
		$("#toDate").val("");
		fromDate = "";
		toDate = "";
		$("#CustomerInvoiceGrid").jqGrid('GridUnload');
		showCustomerInvoiceList($("#searchJob").val(), fromDate, toDate);
		$("#fromDate").prop('disabled', true);
		$("#toDate").prop('disabled', true);
	}
	/*
	 * if($('#dateRange').val()){ $("#fromDate").prop('disabled',false);
	 * $("#toDate").prop('disabled',false); }
	 */
}
var posit_outside_CustomerInvoiceGrid = 0;
function showCustomerInvoiceList(searchData, fromDate, toDate) {
	/* Controller:POController/cuInvoice_listgrid */
	$("#CustomerInvoiceGrid")
			.jqGrid(
					{
						url : './cuInvoice_listgrid?searchData=' + searchData
								+ '&fromDate=' + fromDate + '&toDate=' + toDate,
						datatype : 'JSON',
						mtype : 'POST',
						pager : jQuery('#CustomerInvoiceGridPager'),
						colNames : [ 'cuInvoiceID', 'Created On',
								'Customer PO #', 'Invoice', 'Job Name',
								'JoreleaseDetailId', 'Customer',
								'rxCustomerId', 'cuSOID', 'SubTotal', 'Total',
								'OpenStatus', 'Check #', 'Date Paid',
								'Date Sent', '' ],
						colModel : [
								{
									name : 'cuInvoiceId',
									index : 'cuInvoiceId',
									align : 'left',
									width : 88,
									editable : true,
									hidden : true
								},
								{
									name : 'createdOn',
									index : 'createdOn',
									align : 'center',
									width : 88,
									hidden : false,
									formatter : 'date',
									formatoptions : {
										srcformat : 'Y-m-d',
										newformat : 'm/d/Y'
									}
								},
								{
									name : 'customerPonumber',
									index : 'customerPonumber',
									align : '',
									width : 97,
									hidden : false
								},
								{
									name : 'invoiceNumber',
									index : 'invoiceNumber',
									align : 'left',
									width : 128,
									hidden : false,
									cellattr : function(rowId, tv, rawObject,
											cm, rdata) {
										return 'style="white-space: normal" ';
									}
								},
								{
									name : 'jobname',
									index : 'jobname',
									align : 'center',
									width : 114,
									hidden : false,
									formatter : jobNameFormatter
								},
								{
									name : 'joReleaseDetailId',
									index : 'joReleaseDetailId',
									align : 'center',
									width : 50,
									hidden : true,
									formatter : jobNameFormatter
								},
								{
									name : 'quickJobName',
									index : 'quickJobName',
									align : 'left',
									width : 323,
									hidden : false,
									cellattr : function(rowId, tv, rawObject,
											cm, rdata) {
										return 'style="white-space: normal" ';
									}
								},
								{
									name : 'rxCustomerId',
									index : 'rxCustomerId',
									align : '',
									width : 40,
									hidden : true
								},
								{
									name : 'cuSoid',
									index : 'cuSoid',
									align : '',
									width : 40,
									hidden : true
								},
								{
									name : 'subtotal',
									index : 'subtotal',
									align : 'right',
									width : 107,
									hidden : true,
									formatter : customCurrencyFormatter
								},
								{
									name : 'invoiceAmount',
									index : 'invoiceAmount',
									align : 'right',
									width : 107,
									hidden : false,
									formatter : customCurrencyFormatter
								},
								{
									name : 'cIopenStatus',
									index : 'cIopenStatus',
									align : 'right',
									width : 40,
									hidden : true
								},
								{
									name : 'chkNo',
									index : 'chkNo',
									align : 'center',
									width : 87,
									hidden : false
								},
								{
									name : 'datePaid',
									index : 'datePaid',
									align : 'center',
									width : 88,
									hidden : false,
									formatter : 'date',
									formatoptions : {
										srcformat : 'Y-m-d',
										newformat : 'm/d/Y'
									}
								},
								// {name:'emailDate', index:'emailDate',
								// align:'center',
								// width:88,hidden:false,formatter:'date',formatoptions:{
								// srcformat: 'Y-m-d',newformat:'m/d/Y'}}
								{
									name : 'sentEmailDate',
									index : 'sentEmailDate',
									align : 'center',
									width : 142,
									hidden : false,
									cellattr : function(rowId, tv, rawObject,
											cm, rdata) {
										if (rawObject['emailStatus'] == 2)
											return 'style="color: red" ';
									}
								}, {
									name : 'emailStatus',
									index : 'emailStatus',
									align : '',
									hidden : true
								} ],
						rowNum : 50,
						pgbuttons : true,
						recordtext : '',
						rowList : [ 50, 100, 200, 500, 1000 ],
						viewrecords : true,
						pager : '#CustomerInvoiceGridPager',
						sortname : 'createdOn',
						sortorder : "desc",
						imgpath : 'themes/basic/images',
						caption : 'Invoices',
						// autowidth: true,
						height : 547,
						width : 1200,/* scrollOffset:0, */
						rownumbers : true,
						altRows : true,
						altclass : 'myAltRowClass',
						rownumWidth : 45,
						loadBeforeSend : function(xhr) {
							posit_outside_CustomerInvoiceGrid = jQuery(
									"#CustomerInvoiceGrid").closest(
									".ui-jqgrid-bdiv").scrollTop();
						},
						loadComplete : function(data) {
						},
						gridComplete : function() {

							jQuery("#CustomerInvoiceGrid").closest(
									".ui-jqgrid-bdiv").scrollTop(
									posit_outside_CustomerInvoiceGrid);
							posit_outside_CustomerInvoiceGrid = 0;
							var frompage = $("#frompage").val();
							if (frompage != "0") {
								var invoiceID = $("#invoiceIDfrompage").val();
								var rxmid = $("#rxMasterIDfrompage").val();
								if (invoiceID != "0" && rxmid != "0") {
									$('#cuinvoiceIDhidden').val(invoiceID);
									$('#rxCustomerID').val(rxmid);
									PreloadDataFromInvoiceTable("1");
									$('#cusinvoicetab').dialog("open");
									/*
									 * var gridRows =
									 * $('#CustomerInvoiceGrid').getDataIDs();
									 * for (var i = 0; i < gridRows.length; i++) {
									 * var rowId = gridRows[i]; var rowData =
									 * jQuery('#CustomerInvoiceGrid').jqGrid
									 * ('getRowData', rowId);
									 * if(rowData['cuInvoiceId']==invoiceID){
									 * var ondblClickRowHandler =
									 * $("#CustomerInvoiceGrid").jqGrid("getGridParam",
									 * "ondblClickRow");
									 * ondblClickRowHandler.call($("#CustomerInvoiceGrid")[0],
									 * rowId); break; } }
									 */

								}
							}

						},
						loadError : function(jqXHR, textStatus, errorThrown) {
						},
						jsonReader : {
							root : "rows",
							page : "page",
							total : "total",
							records : "records",
							repeatitems : false,
							cell : "cell",
							id : "id",
							userdata : "userdata"
						},
						onSelectRow : function(id) {
						},
						ondblClickRow : function(rowid) {
							divisionrequiredornotmethod();
							var rowData = jQuery(this).getRowData(rowid);
							var acuInvoiceID = rowData['cuInvoiceId'];
							var aMasterID = rowData['rxCustomerId'];
							/*
							 * $('#rxCustomer_ID').text(aMasterID);
							 * $('#Cuso_ID').text(acuSoid);
							 * $('#operation').val('update');
							 */
							$('#cuinvoiceIDhidden').val(acuInvoiceID);
							$('#rxCustomerID').val(aMasterID);
							createtpusage('Company-Customer-Invoice',
									'Invoice Grid SO View', 'Info',
									'Company-Customer-Invoice,View From Grid,cuInvoiceID:'
											+ acuInvoiceID + ',CustomerID:'
											+ aMasterID);
							loadEmailList(aMasterID);
							PreloadDataFromInvoiceTable("0");
							$('#cusinvoicetab').dialog('option', 'title','Customer Invoice');
							$('#cusinvoicetab').dialog("open");

						}
					}).navGrid('#CustomerInvoiceGridPager',// {cloneToTop:true},
			{
				add : false,
				edit : false,
				del : false,
				refresh : true,
				search : false
			});
}

function getSearchDetails() {
	if ($('#searchJob').val() != null && $('#searchJob').val() != '') {
		$("#searchJob").autocomplete({
			disabled : true
		});
		// $('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
		searchData = $('#searchJob').val();
		$("#CustomerInvoiceGrid").jqGrid('GridUnload');
		showCustomerInvoiceList(searchData, fromDate, toDate);
		$("#CustomerInvoiceGrid").trigger("reloadGrid");
		$('#searchJob').val('');
		searchData = $('#searchJob').val();
	}

}

function ResetDetails() {
	searchData = '';
	callEnableDate();
	$('#dateRange').attr('checked', false);
	$("#CustomerInvoiceGrid").trigger("reloadGrid");
	$('#searchJob').val('');
}

$("#fromDate").change(function() {
	fromDate = $("#fromDate").val();
	$("#CustomerInvoiceGrid").jqGrid('GridUnload');
	showCustomerInvoiceList($("#searchJob").val(), fromDate, toDate);
	$("#CustomerInvoiceGrid").trigger("reloadGrid");
});
$("#toDate").change(function() {
	toDate = $("#toDate").val();
	$("#CustomerInvoiceGrid").jqGrid('GridUnload');
	showCustomerInvoiceList($("#searchJob").val(), fromDate, toDate);
	$("#CustomerInvoiceGrid").trigger("reloadGrid");
});

function dateFormatter(cellValue, options, rowObject) {
	/**
	 * var aDate = cellValue; var aDateArray = aDate.split("-");//2012-05-04 var
	 * newDate = "" + aDateArray[1] + "/" + aDateArray[2] + "/" + aDateArray[0];
	 */
	if (cellValue == null)
		cellValue = "";
	return cellValue;
}

function settotal() {

	var allocated1 = $('#customerInvoice_subTotalID').val().replace(
			/[^0-9\.-]+/g, "");
	var frieght = $('#customerInvoice_frightIDcu').val().replace(/[^0-9\.-]+/g,
			"");
	var taxValue = $('#customerInvoice_taxIdcu').val().replace(/[^0-9\.-]+/g,
			"");
	var taxRate = $('#customerInvoice_generaltaxId').val().replace(
			/[^0-9\.-]+/g, "");

	if (frieght == null || frieght == "" || frieght == undefined) {
		frieght = 0.00;
	}
	if (allocated1 == null || allocated1 == "" || allocated1 == undefined) {
		allocated1 = 0.00;
	}
	if (taxValue == null || taxValue == "" || taxValue == undefined) {
		taxValue = 0.00;
	}

	var allowfreightinTax = false;
	var allowreqcheckfreightintax = getSysvariableStatusBasedOnVariableName("RequireFreightwhencalculatingTaxonCustomerInvoices");
	if (allowreqcheckfreightintax != null
			&& allowreqcheckfreightintax[0].valueLong == 1) {
		allowfreightinTax = true;
	}
	if (allowfreightinTax) {
		taxValue = (parseFloat(allocated1) + parseFloat(frieght))
				* Number(taxRate) / 100;
	} else {
		taxValue = parseFloat(allocated1) * Number(taxRate) / 100;
	}

	var total = parseFloat(allocated1) + parseFloat(frieght)
			+ parseFloat(taxValue);
	$('#customerInvoice_taxIdcu').val(formatCurrency(taxValue));
	$('#customerInvoice_totalID').val(formatCurrency(total));
}

function customCurrencyFormatter(cellValue, options, rowObject) {
	return formatCurrency(cellValue);
}
function jobNameFormatter(cellValue, options, rowObject) {
	if (cellValue == 0 || cellValue == null)
		return "";

	return cellValue;
}

function addNewInvoice() {
	var newDialogDiv = jQuery(document.createElement('div'));
	jQuery(newDialogDiv).attr("id", "msgDlg");
	jQuery(newDialogDiv)
			.dialog(
					{
						modal : true,
						width : 500,
						height : 250,
						title : "Information",
						buttons : [
								{
									height : 35,
									text : "New Invoice",
									click : function() {
										$(this).dialog("close");
										divisionrequiredornotmethod();
										PreloadDataFromInvoiceTable("1");

									}
								},
								{
									height : 35,
									text : "New Invoice from Sales Order",
									click : function() {

										divisionrequiredornotmethod();
										var so = "Enter Sales Order Number"
										var newInvoiceSO = jQuery(document
												.createElement('div'));
										jQuery(newInvoiceSO)
												.attr("id", "newSO");
										jQuery(newInvoiceSO)
												.html(
														'<span>'
																+ so
																+ '<input type = "text" name="sonumber" id="sonumber"></input></span><br/>'
																+ '<span style="color:red; id="errorSpan"><div id="errormsg" value="Please Enter SO Number"></div></span>');

										console.log("div--->" + newInvoiceSO);
										jQuery(newInvoiceSO)
												.dialog(
														{
															modal : true,
															width : 300,
															height : 250,
															title : "SO Number",
															buttons : {
																"Ok" : function() {
																	getSONumber($(
																			'#sonumber')
																			.val());

																},
																"cancel" : function() {
																	jQuery(this)
																			.dialog(
																					"close");
																}
															}
														}).dialog("open");
										$(this).dialog("close");
									}
								} ]
					}).dialog("open");

}

function divisionrequiredornotmethod() {
	if (globalinsideoroutsidejob) {
		var allowdivision = false;
		var allowcheckdivisionrequired = getSysvariableStatusBasedOnVariableName("RequireDivisioninCustomerInvoice");
		if (allowcheckdivisionrequired != null
				&& allowcheckdivisionrequired[0].valueLong == 1) {
			allowdivision = true;
		}
		if (allowdivision) {
			$('#cudivisionlabel').css('display', 'inline-block');
		} else {
			$('#cudivisionlabel').css('display', 'none');
		}
	}
}

function addBatchInvoice() {
	jQuery("#addBatchInvoiceDialog").dialog("open");
	document.getElementById("BatchInvoiceFormId").reset();
}

function cancelEmail() {

	// clearBatchInvoice();
	jQuery("#emailDetailsDialog").dialog("close");
	$("#cInvoiceEmailGrid").jqGrid("GridUnload")
	$('#selectCheckBox').prop('value', 'Select All');
	$("#cInvoiceEmailGrid").trigger("reloadGrid");
	jQuery("#addBatchInvoiceDialog").dialog("open");
}

function emailDetails() {

	if ($('#batchInvoiceCuID').val() == null
			|| $('#batchInvoiceCuID').val() == '')
		$("#batchInvoiceCuIDValue").val(null);

	$("#cInvoiceEmailGrid").trigger("reloadGrid");
	// $("#customerInvoice_lineitems").trigger("reloadGrid");
	// var typeload = { '1':'Title','2':'Item2','3':'Item3','4':'Price'};
	// jQuery("#addBatchInvoiceDialog").dialog("close");
	console.log("Email Details");

	var newDialogDiv = jQuery(document.createElement('div'));
	var batchInvoiceCuID = $("#batchInvoiceCuIDValue").val();
	var batchInvoiceFromDate = $("#batchInvoiceFromDate").val();
	var batchInvoiceToDate = $("#batchInvoiceToDate").val();
	var rangeInvoiceFrom = $("#rangeInvoiceFrom").val();
	var rangeInvoiceTo = $("#rangeInvoiceTo").val();

	if (batchInvoiceCuID > 0
			&& (batchInvoiceFromDate == null || batchInvoiceFromDate == "")
			|| (batchInvoiceToDate == null || batchInvoiceToDate != "")
			&& (rangeInvoiceFrom != null && rangeInvoiceFrom != "")
			|| (rangeInvoiceTo != null && rangeInvoiceTo != "")) {
		errorText = "Please select Date.";
		jQuery(newDialogDiv).html(
				'<span><b style="color:red;">' + errorText + '</b></span>');
		jQuery(newDialogDiv).dialog({
			modal : true,
			width : 300,
			height : 150,
			title : "Warning",
			buttons : [ {
				height : 35,
				text : "OK",
				click : function() {
					$(this).dialog("close");
				}
			} ]
		}).dialog("open");

		return false;
	}

	jQuery("#emailDetailsDialog").dialog("open");
	$("#cInvoiceEmailGrid").jqGrid(
			{
				url : './cuInvoice_EmailListgrid',
				postData : {
					'batchInvoiceCuID' : batchInvoiceCuID,
					'batchInvoiceFromDate' : batchInvoiceFromDate,
					'batchInvoiceToDate' : batchInvoiceToDate,
					'rangeInvoiceFrom' : rangeInvoiceFrom,
					'rangeInvoiceTo' : rangeInvoiceTo
				},
				datatype : 'JSON',
				mtype : 'POST',
				colNames : [ '<input type="checkbox"  value=false>',
						'Invoice Date', 'Customer PO', 'Invoice', 'Job Name',
						'Customer', 'Total', 'Sent', 'Email', '', '', '', '',
						'' ],
				colModel : [ {
					name : 'emailCheckBox',
					index : 'emailCheckBox',
					align : 'center',
					width : 30,
					editable : false,
					hidden : false,
					formatter : emailCheckBoxFormatter,
					editrules : {
						required : false
					},
					editoptions : {
						size : 10
					}
				}, {
					name : 'invoiceDate',
					index : 'invoiceDate',
					align : 'center',
					width : 90,
					hidden : false,
					formatter : 'date',
					formatoptions : {
						srcformat : 'Y-m-d',
						newformat : 'm/d/Y'
					}
				}, {
					name : 'customerPonumber',
					index : 'customerPonumber',
					align : '',
					width : 97,
					hidden : false
				}, {
					name : 'invoiceNumber',
					index : 'invoiceNumber',
					align : 'left',
					width : 90,
					hidden : false,
					cellattr : function(rowId, tv, rawObject, cm, rdata) {
						return 'style="white-space: normal" ';
					}
				}, {
					name : 'jobname',
					index : 'jobname',
					align : 'center',
					width : 114,
					hidden : false,
					formatter : jobNameFormatter
				}, {
					name : 'quickJobName',
					index : 'quickJobName',
					align : 'left',
					width : 260,
					hidden : false,
					cellattr : function(rowId, tv, rawObject, cm, rdata) {
						return 'style="white-space: normal" ';
					}
				}, {
					name : 'invoiceAmount',
					index : 'invoiceAmount',
					align : 'right',
					width : 100,
					hidden : false,
					formatter : customCurrencyFormatter
				},  {
					name : 'sentEmailDate',
					index : 'sentEmailDate',
					align : 'center',
					width : 133,
					hidden : false,
					formatter : function(cellvalue, options, rowObject) {
						if (rowObject.emailStatus == 2)
							return '<span style="color: red">Failed<span> ';
						if (cellvalue == null)
							return "";
						else
							return cellvalue;
					}
				}, {
					name : 'emailList',
					index : 'emailList',
					width : 160,
					hidden : false,
					editable : true,
					formatter : getCustomerEmailDetails
				}, {
					name : 'cuInvoiceId',
					index : 'cuInvoiceId',
					align : 'left',
					width : 88,
					editable : true,
					hidden : true
				}, {
					name : 'joReleaseDetailId',
					index : 'joReleaseDetailId',
					align : 'center',
					width : 50,
					hidden : true,
					formatter : jobNameFormatter
				}, {
					name : 'rxCustomerId',
					index : 'rxCustomerId',
					align : '',
					width : 40,
					hidden : true
				}, {
					name : 'cuSoid',
					index : 'cuSoid',
					align : '',
					width : 40,
					hidden : true
				}, {
					name : 'emailStatus',
					index : 'emailStatus',
					align : '',
					hidden : true
				} ],
				rowNum : 1000000,
				pgbuttons : true,
				recordtext : '',
				autoencode : true,
				/* rowList: [50, 100, 200, 500, 1000], */
				viewrecords : true,
				sortname : 'invoiceDate',
				sortorder : "desc",
				imgpath : 'themes/basic/images',
				caption : 'Invoices to be Sent',
				// autowidth: true,
				height : 500,
				width : 1270,/* scrollOffset:0, */
				rownumbers : true,
				altRows : true,
				altclass : 'myAltRowClass',
				rownumWidth : 45,
				loadBeforeSend : function(xhr) {
				},
				loadComplete : function(data) {
					// $('#cInvoiceEmailGrid').setColProp('emailList', {
					// editoptions: {} });
				},
				gridComplete : function() {
				},
				loadError : function(jqXHR, textStatus, errorThrown) {
				},
				jsonReader : {
					root : "rows",
					page : "page",
					total : "total",
					records : "records",
					repeatitems : false,
					cell : "cell",
					id : "id",
					userdata : "userdata"
				},
				onSelectRow : function(id) {
				},
				ondblClickRow : function(rowid) {

				}
			})

	// document.getElementById("emailDetailsFormId").reset();
}

function getCustomerEmailDetails(cellValue, options, rowObject) {
	var id = "emailSelectBox_" + options.rowId;

	var selectBox = '';
	selectBox = "<select id='"
			+ id
			+ "' style='width:170px'><option value=-1>-----SELECT-----</option>"
			+ cellValue + "</select>";

	return selectBox;
}

jQuery(function() {
	jQuery("#emailDetailsDialog").dialog({
		autoOpen : false,
		height : 650,
		width : 1300,
		resizable : false,
		closeOnEscape : false,
		open : function(event, ui) {
			$(".ui-dialog-titlebar-close").hide();
		},
		// title:"Batch Invoice Report",
		modal : true,
	/*
	 * close:function(){ // clearBatchInvoice();
	 * $("#cInvoiceEmailGrid").jqGrid("GridUnload")
	 * $("#cInvoiceEmailGrid").trigger("reloadGrid");
	 * jQuery("#addBatchInvoiceDialog").dialog("open");
	 * $('#emailDetailsFormId').validationEngine('hideAll'); return true; }
	 */
	});
});

jQuery(function() {
	jQuery("#addBatchInvoiceDialog").dialog({
		autoOpen : false,
		height : 210,
		width : 500,
		title : "Batch Invoice Report",
		modal : true,
		close : function() {
			// clearBatchInvoice();
			// $("#customerInvoice_lineitems").trigger("reloadGrid");
			$('#BatchInvoiceFormId').validationEngine('hideAll');
			return true;
		}
	});
});

function emailCheckBoxFormatter(cellValue, options, rowObject) {

	var id = "emailCheckBox_" + options.rowId;
	var element = '';
	element = "<input type='checkbox' id='" + id + "'>";

	return element;
}

function selectAllCheckBox() {
	var selectButtonVal = $('#selectCheckBox').val();
	console.log("selectButtonVal" + selectButtonVal);
	var bool = '';
	if (selectButtonVal == "Select All") {
		bool = true;
		$('#selectCheckBox').prop('value', 'Un Select');
	} else {
		bool = false;
		$('#selectCheckBox').prop('value', 'Select All');
	}
	console.log("Bool" + bool);
	var ids = $("#cInvoiceEmailGrid").jqGrid('getDataIDs');
	$('#selectCheckBoxValue').val(bool);

	for (var i = 0; i < ids.length; i++) {
		var selectedRowId = ids[i];
		var id = "#emailCheckBox_" + selectedRowId;
		$(id).prop('checked', bool);
	}

}
function sendEmail() {

	var ids = $("#cInvoiceEmailGrid").jqGrid('getDataIDs');
	var newDialogDiv = jQuery(document.createElement('div'));
	var batchInvoiceCuID = $("#batchInvoiceCuIDValue").val();
	var batchInvoiceFromDate = $("#batchInvoiceFromDate").val();
	var batchInvoiceToDate = $("#batchInvoiceToDate").val();
	var rangeInvoiceFrom = $("#rangeInvoiceFrom").val();
	var rangeInvoiceTo = $("#rangeInvoiceTo").val();
	var cuInvoiceIdArray = new Array();
	var rxCustomerIdArray = new Array();
	var emailListArray = new Array();

	var valid = null;
	var count = 0;
	var invalidSelectionCount = 0;
	var validSelectionCount = 0;
	for (var i = 0; i < ids.length; i++) {
		var selectedRowId = ids[i];
		var id = "#emailCheckBox_" + selectedRowId;
		var selID = "#emailSelectBox_" + selectedRowId;

		var canDo = $(id).is(':checked');
		// cellValue =$("#cInvoiceEmailGrid").jqGrid ('getCell', selectedRowId,
		// 'emailList');
		// countOptionTag="select"+selID+" option";
		var selVal = $(selID).val();

		if (canDo && selVal == '-1') {
			invalidSelectionCount = invalidSelectionCount + 1;
		} else if (canDo && selVal != '-1') {
			validSelectionCount = validSelectionCount + 1;
		} else if (canDo) {
			count = count + 1;
		}

	}
	console.log("count" + count);
	console.log("invalidSelectionCount" + invalidSelectionCount);
	console.log("ValidSelectionCount" + validSelectionCount);

	if (invalidSelectionCount == 0 && count == 0 && validSelectionCount == 0) {
		valid = true;
	} else if (invalidSelectionCount > 0 && validSelectionCount == 0) {
		valid = true;
	} else if (invalidSelectionCount > 0 && validSelectionCount > 0) {
		valid = false;
	} else if (invalidSelectionCount == 0 && validSelectionCount > 0) {
		valid = false;
	}

	console.log("Valid" + valid);
	if (valid) {
		jQuery(newDialogDiv)
				.html(
						'<span><b style="color:red;"> Should Select Email ID</b></span>');
		jQuery(newDialogDiv).dialog({
			modal : true,
			width : 300,
			height : 150,
			title : "Error",
			buttons : [ {
				height : 35,
				text : "OK",
				click : function() {
					$(this).dialog("close");
				}
			} ]
		}).dialog("open");
	} else if (valid == false) {

		$('#loadingDivForBulkEmail').css({
			"display" : "block"
		});
		var idList = $("#cInvoiceEmailGrid").jqGrid('getDataIDs');
		for (var j = 0; j < idList.length; j++) {
			var selectedRowId = idList[j];
			var id1 = "#emailCheckBox_" + selectedRowId;
			var selID = "#emailSelectBox_" + selectedRowId;
			var canDo = $(id1).is(':checked');
			var selVal = $(selID).val();
			if (canDo && selVal != -1) {

				var cuInvoiceId = $("#cInvoiceEmailGrid").jqGrid('getCell',
						selectedRowId, 'cuInvoiceId');
				console.log("cuInvoiceId" + cuInvoiceId);
				cuInvoiceIdArray.push(cuInvoiceId);
				var rxCustomerId = $("#cInvoiceEmailGrid").jqGrid('getCell',
						selectedRowId, 'rxCustomerId');
				console.log("rxCustomerId" + rxCustomerId);
				rxCustomerIdArray.push(rxCustomerId);
				var emailList = $(selID).val();
				console.log("emailList" + emailList);
				emailListArray.push(emailList);
			}

		}

		$.ajax({
			url : "./salesOrderController/getInvoicePDF",
			type : "POST",
			data : {
				"batchInvoiceCuID" : batchInvoiceCuID,
				"batchInvoiceFromDate" : batchInvoiceFromDate,
				"batchInvoiceToDate" : batchInvoiceToDate,
				"rangeInvoiceFrom" : rangeInvoiceFrom,
				"rangeInvoiceTo" : rangeInvoiceTo,
				"cuInvoiceIdArray" : cuInvoiceIdArray,
				"rxCustomerIdArray" : rxCustomerIdArray,
				"emailListArray" : emailListArray,
			},

			success : function(data) {
				$("#cInvoiceEmailGrid").trigger("reloadGrid");

				$('#loadingDivForBulkEmail').css({
					"display" : "none"
				});
				$('#selectCheckBox').prop('value', 'Select All');
				// jQuery("#InvoiceLineItemNote").dialog("close");
				// $("#customerInvoice_lineitems").trigger("reloadGrid");
			}
		});
	}

}

jQuery(function() {
	jQuery("#addBatchInvoiceDialog").dialog({
		autoOpen : false,
		height : 210,
		width : 500,
		title : "Batch Invoice Report",
		modal : true,
		close : function() {
			$('#BatchInvoiceFormId').validationEngine('hideAll');
			return true;
		}
	});
});
function clearBatchInvoice() {
	$("#batchInvoiceCuIDValue").val("0");
	$("#batchInvoiceFromDate").val("");
	$("#batchInvoiceToDate").val("");
	$("#rangeInvoiceFrom").val("");
	$("#rangeInvoiceTo").val("");
	$("#batchInvoiceCuID").val("");
}
function generateBatchInvoicePdf() {
	var newDialogDiv = jQuery(document.createElement('div'));
	var batchInvoiceCuID = $("#batchInvoiceCuIDValue").val();
	var batchInvoiceFromDate = $("#batchInvoiceFromDate").val();
	var batchInvoiceToDate = $("#batchInvoiceToDate").val();
	var rangeInvoiceFrom = $("#rangeInvoiceFrom").val();
	var rangeInvoiceTo = $("#rangeInvoiceTo").val();

	/*
	 * var
	 * checktruefalse=checkValidation(batchInvoiceCuID,batchInvoiceFromDate,batchInvoiceToDate,rangeInvoiceFrom,rangeInvoiceTo);
	 * if(checktruefalse){
	 */
	if (batchInvoiceCuID > 0
			&& (batchInvoiceFromDate == null || batchInvoiceFromDate == "")
			|| (batchInvoiceToDate == null || batchInvoiceToDate != "")
			&& (rangeInvoiceFrom != null && rangeInvoiceFrom != "")
			|| (rangeInvoiceTo != null && rangeInvoiceTo != "")) {
		errorText = "Please select Date.";
		jQuery(newDialogDiv).html(
				'<span><b style="color:red;">' + errorText + '</b></span>');
		jQuery(newDialogDiv).dialog({
			modal : true,
			width : 300,
			height : 150,
			title : "Warning",
			buttons : [ {
				height : 35,
				text : "OK",
				click : function() {
					$(this).dialog("close");
				}
			} ]
		}).dialog("open");

		return false;
	}

	createtpusage('Company-Customer-Invoice', 'Batch Invoice Report', 'Info',
			'Company-Customer-Invoice,Batch Invoice PDF,batchInvoiceCuID:'
					+ batchInvoiceCuID + ',batchInvoiceFromDate:'
					+ batchInvoiceFromDate + ',batchInvoiceToDate:'
					+ batchInvoiceToDate);
	window.open("./salesOrderController/printBatchInvoice?batchInvoiceCuID="
			+ batchInvoiceCuID + "&batchInvoiceFromDate="
			+ batchInvoiceFromDate + "&batchInvoiceToDate="
			+ batchInvoiceToDate + "&rangeInvoiceFrom=" + rangeInvoiceFrom
			+ "&rangeInvoiceTo=" + rangeInvoiceTo);
	/*
	 * }else{ //$("#batchinvoicecustomerlabel").html("*"); errorText = "Please
	 * select Customer."; jQuery(newDialogDiv).html('<span><b
	 * style="color:red;">'+errorText+'</b></span>');
	 * jQuery(newDialogDiv).dialog({modal: true, width:300, height:150,
	 * title:"Warning", buttons: [{height:35,text: "OK",click: function() {
	 * $(this).dialog("close"); }}]}).dialog("open"); return false; }
	 */

	/*
	 * if(batchInvoiceCuID==null|| batchInvoiceCuID<=0 ||
	 * batchInvoiceCuID==""){ $("#batchinvoicecustomerlabel").Text("*");
	 * errorText = "Please select Customer."; jQuery(newDialogDiv).html('<span><b
	 * style="color:red;">'+errorText+'</b></span>');
	 * jQuery(newDialogDiv).dialog({modal: true, width:300, height:150,
	 * title:"Warning", buttons: [{height:35,text: "OK",click: function() {
	 * $(this).dialog("close"); }}]}).dialog("open"); return false; }
	 * 
	 * if((batchInvoiceFromDate==null||
	 * batchInvoiceFromDate=="")||(batchInvoiceToDate==null||
	 * batchInvoiceToDate=="")){ $("#batchinvoicecustomerlabel").Text("*");
	 * errorText = "Please select Customer."; jQuery(newDialogDiv).html('<span><b
	 * style="color:red;">'+errorText+'</b></span>');
	 * jQuery(newDialogDiv).dialog({modal: true, width:300, height:150,
	 * title:"Warning", buttons: [{height:35,text: "OK",click: function() {
	 * $(this).dialog("close"); }}]}).dialog("open"); return false; }
	 */

	/*
	 * var InvoiceDetails = $("#BatchInvoiceFormId").serialize();
	 * 
	 * $.ajax({ url: "./salesOrderController/printBatchInvoice", type: "POST",
	 * data : InvoiceDetails, success: function(data) {
	 * 
	 *  }
	 * 
	 * });
	 */

}

function checkValidation(batchInvoiceCuID, batchInvoiceFromDate,
		batchInvoiceToDate, rangeInvoiceFrom, rangeInvoiceTo) {
	var newDialogDiv = jQuery(document.createElement('div'));
	var returnvalue = true;
	if ((batchInvoiceFromDate != null && batchInvoiceFromDate != "")
			|| (batchInvoiceToDate != null && batchInvoiceToDate != "")) {
		if (batchInvoiceCuID == 0 || batchInvoiceCuID == ""
				|| batchInvoiceCuID < 0) {
			returnvalue = false;
		}
	}
	if ((rangeInvoiceFrom != null && rangeInvoiceFrom != "")
			|| (rangeInvoiceTo != null && rangeInvoiceTo != "")) {
		if (batchInvoiceCuID == 0 || batchInvoiceCuID == ""
				|| batchInvoiceCuID < 0) {
			returnvalue = false;
		}
	}
	return returnvalue;
}

function cancelBAtchInvFun() {
	jQuery("#addBatchInvoiceDialog").dialog("close");
}
function customCurrencyFormatter(cellValue, options, rowObject) {
	return formatCurrency(cellValue);
}

function viewPOPDF() {
	var cusoID = $('#Cuso_ID').text();
	if (cusoID != '' && cusoID != undefined)
		window.open("./salesOrderController/printSalesOrderReport?cusoID="
				+ cusoID);

	return true;
}

function getSONumber(sonumber) {
	if (sonumber != null && typeof (sonumber) != "undefined") {
		$.ajax({
			url : "./salesOrderController/getSONumber",
			type : "POST",
			data : "SONumber=" + $('#sonumber').val(),
			success : function(data) {
				if (data.cuSoid != null)
					PreloadSODataForInvoice(data);
				else {
					var newInvoiceSO = jQuery(document.createElement('div'));
					jQuery(newInvoiceSO).attr("id", "newSO");
					jQuery(newInvoiceSO).html(
							'<span style="color:red; id="errorSpan">Invalid Sales Order #'
									+ sonumber + '</span>');
					jQuery(newInvoiceSO).dialog({
						modal : true,
						width : 300,
						height : 250,
						title : "SO Number",
						buttons : {
							"Ok" : function() {
								jQuery(this).dialog("close");
							},
							"cancel" : function() {
								jQuery(this).dialog("close");
							}
						}
					}).dialog("open");
				}

			}
		});
		jQuery('#newSO').dialog("close");
	}

	$('#sonumber').val('');
	// jQuery('#newSO').dialog("close");
	$('#newSO').remove();
}

function PreloadSODataForInvoice(cusodata) {

	$('#imgInvoicePDF').empty();
	$('#imgInvoicePDF')
			.append(
					'<input type="image" src="./../resources/Icons/PDF_new_disabled.png" title="View CuInvoice" return false;" style="background: #EEDEBC;cursor:default;">');

	$('#imgInvoiceEmail').empty();
	$('#imgInvoiceEmail')
			.append(
					'<input id="contactEmailID" type="image" src="./../resources/Icons/mail_new_disabled.png" title="Email Customer Invoice" style="background: #EEDEBC;cursor:default;" return false;">');

	$.ajax({
				url : "./salesOrderController/getPreLoadData",
				type : "POST",
				data : "&cuSOID=" + cusodata.cuSoid + "&rxMasterID="
						+ cusodata.rxCustomerId,
				success : function(data) {
					$("#CI_taxsubtotal").val("");
					$("#customerInvoice_customerInvoiceID").val(
							data.CustomerName);
					$("#customerInvoice_linecustomerInvoiceID").val(
							data.CustomerName);
					if (typeof (data.Cuso.cuSoid) != "undefined"
							&& data.Cuso.cuSoid != null) {
						// $("#customerInvoice_invoiceNumberId").val(data.cuInvoice.invoiceNumber);
						$('#cusoid').val(data.Cuso.cuSoid);
						$('#customerInvoice_subTotalID').val(formatCurrency(0));
						$('#customerInvoice_totalID').val(formatCurrency(0));
						$('#customerinvoicepaymentId').val(data.Cuso.cuTermsId);
						paymentTermsDue(data.Cuso.cuTermsId);
						$('#customerInvoice_proNumberID').val(
								data.Cuso.trackingNumber);
						$('#customerInvoie_PONoID').val(
								data.Cuso.customerPonumber);
						// $('#tagJobID').val(data.cuInvoice.tag);
						$('#customerInvoice_frightIDcu').val(
								formatCurrency(data.Cuso.freight));
						$('#customerInvoice_linefrightID').val(
								formatCurrency(data.Cuso.freight));
						$('#prWareHouseSelectID').val(
								data.Cuso.prFromWarehouseId);
						$('#prWareHouseSelectlineID').val(
								data.Cuso.prFromWarehouseId);
						$('#shipViaCustomerSelectlineID').val(
								data.Cuso.veShipViaId);
						$('#shipViaCustomerSelectID')
								.val(data.Cuso.veShipViaId);
						$('#customer_Divisions').val(data.Cuso.coDivisionID);
						$(
								"#customer_Divisions option[value="
										+ data.Cuso.coDivisionID + "]").attr(
								"selected", true);
						$('#customerinvoice_paymentTerms').val(data.termsDesc);
						$('#customerInvoice_salesRepsList').val(data.SalesMan);
						$('#customerInvoice_CSRList').val(data.AE);
						$('#customerInvoice_SalesMgrList').val(data.Submitting);
						$('#customerInvoice_EngineersList').val(data.Costing);
						$('#customerInvoice_PrjMgrList').val(data.Ordering);

						$('#customerInvoice_salesRepId').val(
								data.Cuso.cuAssignmentId0);
						$('#customerInvoice_CSRId').val(
								data.Cuso.cuAssignmentId1);
						$('#customerInvoice_salesMgrId').val(
								data.Cuso.cuAssignmentId2);
						$('#customerInvoice_engineerId').val(
								data.Cuso.cuAssignmentId3);
						$('#customerInvoice_prjMgrId').val(
								data.Cuso.cuAssignmentId4);
						$('#customerTaxTerritory').val(
								data.Cuso.coTaxTerritoryId);

						$('#customerInvoice_taxIdcu').val(
								formatCurrency(data.Cuso.taxTotal));
						$('#cuGeneral_taxvalue').val(
								formatCurrency(data.Cuso.taxTotal));
						$('#customerInvoice_lineproNumberID').val(
								data.Cuso.trackingNumber);
						$('#customerInvoice_lineinvoiceNumberId').val(
								data.Cuso.sonumber);

						// $('#customerInvoice_invoiceNumberId').val(data.Cuso.sonumber);

						$('#customerInvoice_invoiceNumberId').val(
								data.cuInvoiceNo);

						$('#customerInvoice_customerHiddnID').val(
								data.Cuso.rxCustomerId);
						$('#customerInvoice_linetaxId').val(
								formatCurrency(data.Cuso.taxRate));
						$('#customerInvoice_generaltaxId').val(
								formatCurrency(data.Cuso.taxRate));

						$('#customerInvoice_lineproNumberID').val(
								data.Cuso.trackingNumber);
						// $('#customerInvoice_lineinvoiceNumberId').val(data.cuInvoice.invoiceNumber);
						$('#customerbillToAddressIDcuInvoice').val(
								data.CustomerName);
						// shipToMode
						$('#rxCustomerID').val(data.Cuso.rxCustomerId);
						loadEmailList(data.Cuso.rxCustomerId);
						addressToShipCustomerInvoice();
						// $('#rxShipToID').val(data.Cuso.rxShipToId);

						// customerinvoiceShiptoAddress();
						// $('#rxShipToOtherAddressID').val(data.Cuso.rxShipToAddressId);
						// otherinvoiceShiptoAddress();
						warehouse = data.wareHouse;
						// loadShipToAddress();

						/*
						 * if(data.cuInvoice.doNotMail===0)
						 * $('#customerInvoie_doNotMailID').prop('checked',false);
						 * else
						 * $('#customerInvoie_doNotMailID').prop('checked',true);
						 */
						// loadEmailList($("#rxCustomerID").val());
						console.log('ContaceID:' + data.Cuso.rxContactId);
						$("#CI_taxsubtotal").val(data.Cusodetail.taxableSum);
						if (typeof (data.Cuso.rxContactId) !== "undefined") {
							$(
									"#emailListCU option[value='"
											+ data.Cuso.rxContactId + "']")
									.attr("selected", true);
						}

						if (data.Cuso.joReleaseId == null
								|| data.Cuso.joReleaseId == '') {
							$("#shiptoaddradio3").button({
								disabled : true
							});
							$('#shiptoaddlabel3').attr('onclick', '').unbind(
									'click');
						}

						// $("#emailListCU option[value='" +
						// data.cuInvoice.rxContactId + "']").attr("selected",
						// true);
						loadTaxTerritoryRate(data.Cuso.coTaxTerritoryId);
						var createdDate = new Date();

						if (typeof (createdDate) != 'undefined')
							FormatDate(createdDate);
						var shipDate = data.Cuso.shipDate;
						if (typeof (shipDate) != 'undefined'
								&& shipDate != null) {
							FormatShipDate(shipDate);
						} else {
							FormatShipDate(new Date());
						}
						var dueDate = data.Cuso.datePromised;
						if (typeof (dueDate) != 'undefined')
							FormatDueDate(dueDate);
						console.log("ShipToMode=" + data.Cuso.shipToMode);
						/*
						 * Commented by velmurugan Ship to Implementation new
						 * Code 19-10-2015
						 */
						/*
						 * if(data.Cuso.shipToMode === 0){
						 * usinvoiceShiptoAddress(data.Cuso.cuSoid,'cuso'); }
						 * else if(data.Cuso.shipToMode === 1){
						 * customerinvoiceShiptoAddress(); } else
						 * if(data.Cuso.shipToMode === 2){
						 * jobsiteinvoiceShiptoAddress(data.Cuso.joReleaseId,'cuso'); }
						 * else{ otherinvoiceShiptoAddress();
						 *  }
						 */
						/* New Code Implementation */
						loadCustomerAddress(data.Cuso.rxCustomerId);
						var shiptomode = data.Cuso.shipToMode;
						var checkshiptoid;
						var CIdivFlag = "#CI_Shipto";
						$(CIdivFlag).contents().find(
								"#shiptoaddrhiddenfromdbid").val("");
						$(CIdivFlag).contents().find(
								"#shiptomodehiddenfromdbid").val("");
						loadshiptostateautocmpte(CIdivFlag);
						if (shiptomode == "0") {
							checkshiptoid = data.Cuso.prToWarehouseId;
						} else if (shiptomode == "1" || shiptomode == "2") {
							checkshiptoid = data.Cuso.rxShipToId;
						} else {
							checkshiptoid = data.Cuso.rxShipToAddressId;
						}
						if (checkshiptoid != null) {
							if (data.Cuso.shipToMode == 0) {
								$(CIdivFlag).contents().find(
										"#shiptoaddrhiddenfromdbid").val(
										data.Cuso.prToWarehouseId);
							} else if (data.Cuso.shipToMode == 1) {
								$(CIdivFlag).contents().find(
										"#shiptoaddrhiddenfromdbid").val(
										data.Cuso.rxShipToId);
							} else if (data.Cuso.shipToMode == 2) {
								$(CIdivFlag).contents().find(
										"#shiptoaddrhiddenfromdbid").val(
										data.Cuso.rxShipToId);
							} else {
								$(CIdivFlag).contents().find(
										"#shiptoaddrhiddenfromdbid").val(
										data.Cuso.rxShipToAddressId);
							}
							$(CIdivFlag).contents().find(
									"#shiptomodehiddenfromdbid").val(
									data.Cuso.shipToMode);
							preloadShiptoAddress(CIdivFlag, data.Cuso.cuSoid,
									checkshiptoid, data.Cuso.shipToMode, '0',
									$("#jobCustomerName_ID").text(),
									data.Cuso.coTaxTerritoryId);
							$(CIdivFlag).contents()
									.find("#shiptomoderhiddenid").val(
											data.Cuso.shipToMode);
						}

						/* Code Ends */

						$('#customerInvoice_subTotalID').val(
								formatCurrency(data.Cuso.subTotal));
						$('#customerInvoice_totalID').val(
								formatCurrency(data.Cuso.subTotal
										+ data.Cuso.taxTotal
										+ data.Cuso.freight));
						$('#customerInvoice_linesubTotalID').val(
								formatCurrency(data.Cuso.subTotal));
						$('#customerInvoice_linetotalID').val(
								formatCurrency(data.Cuso.subTotal
										+ data.Cuso.taxTotal
										+ data.Cuso.freight));

						// checkInvoiceNumber(data.Cuso.sonumber);

						/*
						 * }else{
						 * $('#customerInvoice_subTotalID').val(formatCurrency(0));
						 * $('#customerInvoice_totalID').val(formatCurrency(0));
						 * $('#customerInvoice_linesubTotalID').val(formatCurrency(0));
						 * $('#customerInvoice_linetotalID').val(formatCurrency(0)); }
						 */

					}
					// formattax();
					// loadCustomerInvoice();
				}
			});

	/*
	 * function checkTaxTerryAftSaveInv(){
	 * console.log("checkTaxTerryAftSaveInv");
	 * 
	 * $.ajax({ url : "./MediatorController/getSettingTaxTerritory", type :
	 * "POST", async:false, data : { "settingsTaxTerritory" :
	 * "DoNotAllowTaxTerritoryAfterSavingCustomerInvoice" }, success :
	 * function(data) { console.log("DAta"+data); } }); }
	 */

	$('#lineshipTo1').hide();
	$("#cusinvoicetab").dialog({
		open : function(event, ui) {
			$('#cusinvoicetab').tabs({
				selected : 0
			});
			$('#cusinvoicetab').tabs({
				active : 0
			});
			var cuInvoice = $('#cuinvoiceIDhidden').val();
			loadshiptostateautocmpte("#CI_Shipto");
			if (cuInvoice == '') {
				$("#cusinvoicetab").tabs({
					disabled : [ 1 ]
				});
			} else {
				$("#cusinvoicetab").tabs({
					disabled : false
				});
			}
			$('#costdetails').css('display','none');
			jQuery("#cusinvoicetab").dialog({
				width : 900,
				height : 900
			});
		},
	});
	/*
	 * $('#cusinvoicetab').tabs({ selected: 0 }); $('#cusinvoicetab').tabs({
	 * active: 0 });
	 */
	jQuery("#cusinvoicetab").dialog({
		width : 930,
		height : 900,
		title : 'New Customer Invoice'
	});
	jQuery("#cusinvoicetab").dialog("open");
	$("#CuInvoiceSaveID").css("display", "block");
	$("#CuInvoiceSaveCloseID").css("display", "block");
	$("#CuInvoiceCancel").css("display", "none");
	$("#CuInvoiceLineSaveID").css("display", "block");
	$("#CuInvoiceLineSaveCloseID").css("display", "block");

}
/*
 * var posit_outside_cuInvoice_lineItemsGrid=0; function
 * loadCustomerInvoice(loadValue){ //alert('123132'); var id =
 * $('#cuinvoiceIDhidden').val(); $("#customerInvoice_lineItemsGrid").empty();
 * $("#customerInvoice_lineItemsGrid").append("<table
 * id='customerInvoice_lineitems'></table><div
 * id='customerInvoice_lineitemspager'></div>"); try {
 * $("#customerInvoice_lineitems").jqGrid({ datatype: 'JSON', mtype: 'POST',
 * pager: jQuery('#customerInvoice_lineitemspager'),
 * url:'./salesOrderController/cuInvlineitemGrid', postData:
 * {'cuInvoiceID':function () { return id; }}, colNames:['Product
 * No','','Description','Qty','Price Each', 'Mult.', 'Tax', 'Amount','Notes',
 * 'Manu. ID','cuSodetailId', 'prMasterID'], colModel :[
 * {name:'itemCode',index:'itemCode',align:'left',width:90,editable:true,hidden:false,
 * edittype:'text', editoptions:{size:17},editrules:{edithidden:false,required:
 * true}}, {name:'noteImage',index:'noteImage', align:'right',
 * width:10,hidden:false, editable:false, formatter:noteImage,
 * editoptions:{size:15, alignText:'right'},editrules:{edithidden:true}},
 * {name:'description', index:'description', align:'left', width:150,
 * editable:true,hidden:false, edittype:'text',
 * editoptions:{size:17},editrules:{edithidden:false}, cellattr: function
 * (rowId, tv, rawObject, cm, rdata) {return 'style="white-space: normal" ';}},
 * {name:'quantityBilled', index:'quantityBilled', align:'center',
 * width:15,hidden:false, editable:true, editoptions:{size:17,
 * alignText:'left'},editrules:{edithidden:true,required: false}},
 * {name:'unitCost', index:'unitCost', align:'right', width:50,hidden:false,
 * editable:true, formatter:customCurrencyFormatter, editoptions:{size:17,
 * alignText:'right'},editrules:{edithidden:true}}, {name:'priceMultiplier',
 * index:'priceMultiplier', align:'right', width:50,hidden:false, editable:true,
 * editoptions:{size:17, alignText:'right'},
 * formatter:customCurrencyFormatterWithoutDollar, editrules:{edithidden:true}},
 * {name:'taxable', index:'taxable', align:'center', width:20, hidden:false,
 * editable:true, formatter:'checkbox', edittype:'checkbox',
 * editrules:{edithidden:true}}, {name:'amount', index:'amount', align:'right',
 * width:50,hidden:false, editable:false, editoptions:{size:15,
 * alignText:'right'},editrules:{edithidden:true},formatter:customTotalFomatter},
 * {name:'note', index:'note', align:'right', width:50,hidden:true,
 * editable:true, editoptions:{size:15,
 * alignText:'right'},editrules:{edithidden:true}}, {name:'cuInvoiceId',
 * index:'cuInvoiceId', align:'right', width:50,hidden:true, editable:true,
 * editoptions:{size:17, alignText:'right'},editrules:{edithidden:false}},
 * {name:'cuInvoiceDetailId', index:'cuInvoiceDetailId', align:'right',
 * width:50,hidden:true, editable:true, editoptions:{size:17,
 * alignText:'right'},editrules:{edithidden:false}}, {name:'prMasterId',
 * index:'prMasterId', align:'right', width:50,hidden:true, editable:true,
 * editoptions:{size:17, alignText:'right'},editrules:{edithidden:false}}],
 * rowNum: 0, pgbuttons: false, recordtext: '', rowList: [], pgtext: null,
 * viewrecords: false, sortname: 'itemCode', sortorder: "asc", imgpath:
 * 'themes/basic/images', caption: false, height:210, width: 830,
 * rownumbers:true, altRows: true, altclass:'myAltRowClass', caption: 'Line
 * Item', jsonReader : { root: "rows", page: "page", total: "total", records:
 * "records", repeatitems: false, cell: "cell", id: "id", userdata: "userdata" },
 * loadBeforeSend: function(xhr) { posit_outside_cuInvoice_lineItemsGrid=
 * jQuery("#customerInvoice_lineItemsGrid").closest(".ui-jqgrid-bdiv").scrollTop(); },
 * loadComplete: function(data) { var ids =
 * $('#customerInvoice_lineitems').jqGrid('getDataIDs');
 * $('#customerInvoice_lineitems_noteImage').removeClass("ui-state-default
 * ui-th-column ui-th-ltr"); if (ids) { var sortName =
 * $('#customerInvoice_lineitems').jqGrid('getGridParam','noteImage'); var
 * sortOrder =
 * $('#customerInvoice_lineitems').jqGrid('getGridParam','description'); for
 * (var i=0;i<ids.length;i++) {
 * 
 * $('#customerInvoice_lineitems').jqGrid('setCell', ids[i], 'noteImage', '',
 * '', {style:'border-right-color: transparent !important;'});
 * $('#customerInvoice_lineitems').jqGrid('setCell', ids[i], 'description', '',
 * '', {style:'border-left-color: transparent !important;'}); } }
 * $("#customerInvoice_lineitems").jqGrid('resetSelection'); },
 * gridComplete:function(){
 * jQuery("#customerInvoice_lineItemsGrid").closest(".ui-jqgrid-bdiv").scrollTop(posit_outside_cuInvoice_lineItemsGrid);
 * posit_outside_cuInvoice_lineItemsGrid=0; if(loadValue=="0" && _globalStatus) {
 * var gridRows = $('#customerInvoice_lineitems').getRowData();
 * _globalold_cIlineitemform = JSON.stringify(gridRows); }
 * $("#customerInvoice_lineitems").jqGrid('resetSelection'); }, loadError :
 * function (jqXHR, textStatus, errorThrown){ }, onSelectRow: function(id){ },
 * editurl:"./salesOrderController/manpulatecuInvoiceReleaseLineItem"
 * }).navGrid('#customerInvoice_lineitemspager', {add:true,
 * edit:true,del:true,refresh:true,search:false}, //-----------------------edit
 * options----------------------// { width:400,left:398, top: 192, zIndex:1040,
 * closeAfterEdit:true, reloadAfterSubmit:true, modal:true, jqModel:true,
 * editCaption: "Edit Customer Invoice", beforeShowForm: function (form) {
 * $("a.ui-jqdialog-titlebar-close").hide();
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_itemCode
 * .CaptionTD').append('Product No: ');
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_itemCode .CaptionTD').append('<span
 * style="color:red;" class="mandatory">*</span>');
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_description
 * .CaptionTD').empty();
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_description
 * .CaptionTD').append('Description: ');
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_quantityBilled.CaptionTD').empty();
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_quantityBilled.CaptionTD').append('Qty:
 * '); jQuery('#TblGrid_customerInvoice_lineitems#tr_quantityBilled
 * .CaptionTD').append('<span style="color:red;" class="mandatory">*</span>');
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_unitCost .CaptionTD').empty();
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_unitCost
 * .CaptionTD').append('Cost Each.: ');
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_priceMultiplier
 * .CaptionTD').empty();
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_priceMultiplier
 * .CaptionTD').append('Mult.: ');
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_priceMultiplier
 * .CaptionTD').append('<span style="color:red;" class="mandatory">*</span>');
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_taxable .CaptionTD').empty();
 * jQuery('#TblGrid_customerInvoice_lineitems#tr_taxable
 * .CaptionTD').append('Tax: '); var unitCost =
 * $('#unitCost').val().replace(/[^0-9-.]/g, ''); $('#unitCost').val(unitCost);
 * var priceMultiplier = $('#priceMultiplier').val(); priceMultiplier=
 * parseFloat(priceMultiplier.replace(/[^0-9-.]/g, ''));
 * $('#priceMultiplier').val(priceMultiplier);
 * 
 * _globalold_cIgeneralform = $("#custoemrInvoiceFormID").serialize(); var
 * gridRows = $('#customerInvoice_lineitems').getRowData();
 * _globalold_cIlineitemform = JSON.stringify(gridRows);
 *  }, beforeSubmit:function(postdata, formid) {
 * $("#note").autocomplete("destroy"); $(".ui-menu-item").hide(); var
 * aPrMasterID = $('#prMasterId').val(); if (aPrMasterID === ""){ return [false,
 * "Alert: Please provide a valid Product (Select from suggest dropdown
 * list)."]; } return [true, ""]; }, onclickSubmit: function(params){ var
 * cuinvoiceID = $('#cuinvoiceIDhidden').val(); var taxRate
 * =$('#customerInvoice_linetaxId').val(); taxRate =
 * parseFloat(taxRate.replace(/[^0-9\-.]/g, '')); var freight =
 * $('#customerInvoice_linefrightID').val(); freight =
 * parseFloat(freight.replace(/[^0-9\-.]/g, '')); return
 * {'cuInvoiceId':cuinvoiceID,'taxRate' : taxRate,'freight':freight,
 * 'operForAck' : '' }; }, afterSubmit:function(response,postData){
 * $("#note").autocomplete("destroy"); $(".ui-menu-item").hide();
 * $("a.ui-jqdialog-titlebar-close").show(); //updateTotals(); _globalStatus =
 * false;
 * 
 * PreloadDataFromInvoiceTable("1"); $('#cusinvoicetab').tabs({ selected: 1 });
 * return [true, loadCustomerInvoice("1")]; }
 * 
 *  }, //-----------------------add options----------------------// { width:400,
 * left:398, top: 192, zIndex:1040, closeAfterAdd:true, reloadAfterSubmit:true,
 * modal:true, jqModel:false, addCaption: "Add customer Invoice Line Item",
 * onInitializeForm: function(form){
 *  }, afterShowForm: function($form) {
 * 
 * $(function() { var cache = {}; var lastXhr='';
 * $("input#itemCode").autocomplete({minLength: 1,timeout :1000, source:
 * function( request, response ) { var term = request.term; if ( term in cache ) {
 * response( cache[ term ] ); return; } lastXhr = $.getJSON(
 * "jobtabs3/productCodeWithNameList", request, function( data, status, xhr ) {
 * cache[ term ] = data; if ( xhr === lastXhr ) { response( data ); } }); },
 * select: function( event, ui ){ var ID = ui.item.id; var product =
 * ui.item.label; $("#prMasterId").val(ID); if(product.indexOf('-[') !== -1){var
 * pro = product.split("-["); var pro2 = pro[1].replace("]","");
 * $("#description").val(pro2);} $.ajax({ url:
 * './getLineItems?prMasterId='+$("#prMasterId").val(), type: 'POST', success:
 * function (data) { $.each(data, function(key, valueMap) {
 * 
 * if("lineItems"==key) { $.each(valueMap, function(index, value){
 * 
 * $("#description").val(value.description); $("#unitCost").val(value.lastCost);
 * $("#priceMultiplier").val(value.pomult); if(value.isTaxable == 1) {
 * $("#taxable").prop("checked",true); } else
 * $("#taxable").prop("checked",false); }); } }); } });
 *  }, error: function (result)
 * {$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading"); } });
 * return; }); }, beforeSubmit:function(postdta, formid) {
 * $("#note").autocomplete("destroy"); $(".ui-menu-item").hide(); var
 * aPrMasterID = $('#prMasterId').val(); if (aPrMasterID === ""){ return [false,
 * "Alert: Please provide a valid Product (Select from suggest dropdown
 * list)."]; } return [true, ""]; }, onclickSubmit: function(params){ var
 * cuinvoiceID = $('#cuinvoiceIDhidden').val(); var taxRate
 * =$('#customerInvoice_linetaxId').val(); taxRate =
 * parseFloat(taxRate.replace(/[^0-9\-.]/g, '')); var freight =
 * $('#customerInvoice_linefrightID').val(); freight =
 * parseFloat(freight.replace(/[^0-9\-.]/g, '')); return { 'cuInvoiceId' :
 * cuinvoiceID, 'taxRate' : taxRate,'freight':freight, 'operForAck' : '' }; },
 * afterSubmit:function(response,postData){ $("#note").autocomplete("destroy");
 * $(".ui-menu-item").hide(); $("a.ui-jqdialog-titlebar-close").show();
 * //updateTotals(); _globalStatus = false;
 * 
 * PreloadDataFromInvoiceTable("1"); $('#cusinvoicetab').tabs({ selected: 1 });
 * return [true]; } }, //-----------------------Delete
 * options----------------------// { closeOnEscape: true, reloadAfterSubmit:
 * true, modal:true, jqModal:true,width:300,left:450, top: 350, zIndex:1040,
 * caption: "Delete", msg: 'Do you want to delete the line item?', color:'red',
 * 
 * onclickSubmit: function(params){ var grid = $("#customerInvoice_lineitems");
 * var rowId = grid.jqGrid('getGridParam', 'selrow'); var cuInvoiceID =
 * grid.jqGrid('getCell', rowId, 'cuInvoiceDetailId'); var taxRate
 * =$('#customerInvoice_linetaxId').val(); taxRate =
 * parseFloat(taxRate.replace(/[^0-9\-.]/g, '')); var freight =
 * $('#customerInvoice_linefrightID').val(); freight =
 * parseFloat(freight.replace(/[^0-9\-.]/g, '')); return { 'cuInvoiceDetailId' :
 * cuInvoiceID,'taxRate':taxRate,'freight':freight};
 *  }, afterSubmit:function(response,postData){ //PreloadData();
 * //updateTotals(); PreloadDataFromInvoiceTable("1");
 * $('#cusinvoicetab').tabs({ selected: 1 }); return [true,
 * loadCustomerInvoice("1")]; } });
 * $('#customerInvoice_lineitems').jqGrid('navButtonAdd',"#customerInvoice_lineitemspager",{
 * caption:"", buttonicon:"ui-icon-calculator", onClickButton:ShowInvoiceNote,
 * position: "last", title:"Edit note for line item", cursor: "pointer"}); }
 * catch(err) { var text = "There was an error on this page.\n\n"; text +=
 * "Error description: " + err.message + "\n\n"; text += "Click OK to
 * continue.\n\n"; console.log(text); } }
 */

function noteImage(cellValue, options, rowObject) {
	var element = '';
	if (cellValue !== '' && cellValue !== null && cellValue != undefined) {
		element = "<img src='./../resources/images/lineItem_new.png' style='vertical-align: middle;'>";
	}
	return element;
}

function customTotalFomatter(cellValue, options, rowObject) {
	var total = 0;
	// try{
	console.log("test");
	var multiplier = rowObject['priceMultiplier'];
	var q = rowObject['quantityBilled'];
	var unitcost = rowObject['unitCost'];
	if ((unitcost + "").contains("$")) {
		unitcost = unitcost.replace(/[^0-9\.-]+/g, "");
	}
	if (unitcost == undefined || unitcost == "" || unitcost == null) {
		unitcost = 0.00;
	} else {
		unitcost = Number(floorFigureoverall(unitcost, 2));
	}
	if (q == undefined || q == "" || q == null) {
		q = 0;
	} else {
		q = Number(floorFigureoverall(q, 2));
	}
	if (multiplier == undefined || multiplier == null || multiplier == 0
			|| multiplier == "") {
		multiplier = 1;
	} else {
		multiplier = Round_priceMultiplier(multiplier);
	}

	if (multiplier == 0) {
		multiplier = 1;
	}
	console.log(multiplier + "==" + unitcost + "==" + q);
	total = (Number(multiplier) * Number(unitcost) * Number(q));
	// }catch(err){
	// console.log('error on loading grid'+err.message);
	// }
	return formatCurrency(total);
}

function ShowInvoiceNote() {
	try {
		var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
		var id = jQuery("#customerInvoice_lineitems").jqGrid('getGridParam',
				'selrow');
		// row=jQuery("#customerInvoice_lineitems").getRowData(rows[id-1]);
		var notes = jQuery("#customerInvoice_lineitems").jqGrid('getCell', id,
				'note');
		/*
		 * if(notes==undefined && notes==null && notes==""){ lineITemNotes =
		 * notes; }else{ lineITemNotes = lineITemNotes.replace("&And", "'"); }
		 */
		CKEDITOR.instances['InvoiceLineItemNoteID'].setData(notes);
		jQuery("#InvoiceLineItemNote").dialog("open");

		/*
		 * areaLine = new nicEditor({buttonList :
		 * ['bold','italic','underline','left','center','right','justify','ol','ul','fontSize','fontFamily','fontFormat','forecolor'],
		 * maxHeight : 220}).panelInstance('InvoiceLineItemNoteID');
		 * $('#InvoiceLineItemNote').find(".nicEdit-main").empty();
		 * $('#InvoiceLineItemNote').find(".nicEdit-main").append(lineITemNotes);
		 * $('#InvoiceLineItemNote').find(".nicEdit-main").focus();
		 */

		return true;
	} catch (err) {
		alert(err.message);
	}
}

/*
 * function SaveInvoiceLineItemNote(){ var inlineText=
 * $('#InvoiceLineItemNoteForm').find('.nicEdit-main').html(); var rows =
 * jQuery("#customerInvoice_lineitems").getDataIDs(); var id =
 * jQuery("#customerInvoice_lineitems").jqGrid('getGridParam','selrow');
 * row=jQuery("#customerInvoice_lineitems").getRowData(rows[id-1]); var notes =
 * row['note']; var cuInvoiceDetailId = row['cuInvoiceDetailId']; $.ajax({ url:
 * "./salesOrderController/saveInvoiceLineItemNote", type: "POST", data :
 * "cuInvoiceDetailId="+cuInvoiceDetailId+"&note="+inlineText, success:
 * function(data) { jQuery("#InvoiceLineItemNote").dialog("close");
 * $("#customerInvoice_lineitems").trigger("reloadGrid"); } }); }
 * 
 * function CancelInvoiceInLineNote(){
 * areaLine.removeInstance('InvoiceLineItemNoteID');
 * jQuery("#InvoiceLineItemNote").dialog("close"); return false; }
 */

jQuery(function() {
	jQuery("#InvoiceLineItemNote").dialog({
		autoOpen : false,
		modal : true,
		title : "InLine Note",
		height : 390,
		width : 635,
		buttons : {},
		close : function() {
			// areaLine.removeInstance('InvoiceLineItemNoteID');
			return true;
		}
	});
});

var posit_outside_cuInvoice_lineItemsRebuild = 0;
function loadLineItemsRebuild() {

	var id = $('#cuinvoiceIDhidden').val();
	try {
		$("#customerInvoice_lineitemsRebuild")
				.jqGrid(
						{
							datatype : 'JSON',
							mtype : 'POST',
							pager : jQuery('#customerInvoice_lineitemspagerRebuild'),
							url : './salesOrderController/cuInvlineitemGrid',
							postData : {
								'cuInvoiceID' : function() {
									return id;
								}
							},
							colNames : [ 'Product No', 'Description', 'Qty',
									'Price Each', 'Mult.', 'Tax', 'Amount',
									'Manu. ID', 'cuSodetailId', 'prMasterID' ],
							colModel : [
									{
										name : 'itemCode',
										index : 'itemCode',
										align : 'left',
										width : 90,
										editable : true,
										hidden : false,
										edittype : 'text',
										editoptions : {
											size : 17
										},
										editrules : {
											edithidden : false,
											required : true
										}
									},
									{
										name : 'description',
										index : 'description',
										align : 'left',
										width : 150,
										editable : true,
										hidden : false,
										edittype : 'text',
										editoptions : {
											size : 17
										},
										editrules : {
											edithidden : false
										},
										cellattr : function(rowId, tv,
												rawObject, cm, rdata) {
											return 'style="white-space: normal" ';
										}
									},
									{
										name : 'quantityBilled',
										index : 'quantityBilled',
										align : 'center',
										width : 15,
										hidden : false,
										editable : true,
										editoptions : {
											size : 17,
											alignText : 'left'
										},
										editrules : {
											edithidden : true,
											required : false
										}
									},
									{
										name : 'unitCost',
										index : 'unitCost',
										align : 'right',
										width : 50,
										hidden : false,
										editable : true,
										formatter : customCurrencyFormatter,
										editoptions : {
											size : 17,
											alignText : 'right'
										},
										editrules : {
											edithidden : true
										}
									},
									{
										name : 'priceMultiplier',
										index : 'priceMultiplier',
										align : 'right',
										width : 50,
										hidden : false,
										editable : true,
										editoptions : {
											size : 17,
											alignText : 'right'
										},
										formatter : customCurrencyFormatterWithoutDollar,
										editrules : {
											edithidden : true
										}
									}, {
										name : 'taxable',
										index : 'taxable',
										align : 'center',
										width : 20,
										hidden : false,
										editable : true,
										formatter : 'checkbox',
										edittype : 'checkbox',
										editrules : {
											edithidden : true
										}
									}, {
										name : 'note',
										index : 'note',
										align : 'right',
										width : 50,
										hidden : true,
										editable : false,
										formatter : customCurrencyFormatter,
										editoptions : {
											size : 15,
											alignText : 'right'
										},
										editrules : {
											edithidden : true
										}
									}, {
										name : 'cuInvoiceId',
										index : 'cuInvoiceId',
										align : 'right',
										width : 50,
										hidden : true,
										editable : true,
										editoptions : {
											size : 17,
											alignText : 'right'
										},
										editrules : {
											edithidden : false
										}
									}, {
										name : 'cuInvoiceDetailId',
										index : 'cuInvoiceDetailId',
										align : 'right',
										width : 50,
										hidden : true,
										editable : true,
										editoptions : {
											size : 17,
											alignText : 'right'
										},
										editrules : {
											edithidden : false
										}
									}, {
										name : 'prMasterId',
										index : 'prMasterId',
										align : 'right',
										width : 50,
										hidden : true,
										editable : true,
										editoptions : {
											size : 17,
											alignText : 'right'
										},
										editrules : {
											edithidden : false
										}
									} ],
							rowNum : 0,
							pgbuttons : false,
							recordtext : '',
							rowList : [],
							pgtext : null,
							viewrecords : false,
							sortname : 'itemCode',
							sortorder : "asc",
							imgpath : 'themes/basic/images',
							caption : false,
							height : 150,
							width : 825,
							rownumbers : true,
							altRows : true,
							altclass : 'myAltRowClass',
							caption : 'Line Item',
							jsonReader : {
								root : "rows",
								page : "page",
								total : "total",
								records : "records",
								repeatitems : false,
								cell : "cell",
								id : "id",
								userdata : "userdata"
							},
							loadBeforeSend : function(xhr) {
								posit_outside_cuInvoice_lineItemsRebuild = jQuery(
										"#customerInvoice_lineitemsRebuild")
										.closest(".ui-jqgrid-bdiv").scrollTop();
							},
							loadComplete : function(data) {
								$("#customerInvoice_lineitemsRebuild")
										.setSelection(1, true);
							},
							gridComplete : function() {
								jQuery("#customerInvoice_lineitemsRebuild")
										.closest(".ui-jqgrid-bdiv")
										.scrollTop(
												posit_outside_cuInvoice_lineItemsRebuild);
								posit_outside_cuInvoice_lineItemsRebuild = 0;
							},
							loadError : function(jqXHR, textStatus, errorThrown) {
							},
							onSelectRow : function(id) {

							},
							editurl : "./salesOrderController/manpulatecuInvoiceReleaseLineItem"
						})
				.navGrid(
						'#customerInvoice_lineitemspagerRebuild',
						{
							add : true,
							edit : true,
							del : true,
							refresh : true,
							search : false
						},
						// -----------------------edit
						// options----------------------//
						{
							width : 400,
							left : 398,
							top : 192,
							zIndex : 1040,
							closeAfterEdit : true,
							reloadAfterSubmit : true,
							modal : true,
							jqModel : true,
							editCaption : "Edit Customer Invoice",
							beforeShowForm : function(form) {
								$("a.ui-jqdialog-titlebar-close").hide();
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_itemCode .CaptionTD')
										.append('Product No: ');
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_itemCode .CaptionTD')
										.append(
												'<span style="color:red;" class="mandatory">*</span>');
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_description .CaptionTD')
										.empty();
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_description .CaptionTD')
										.append('Description: ');
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_quantityBilled.CaptionTD')
										.empty();
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_quantityBilled.CaptionTD')
										.append('Qty: ');
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_quantityBilled .CaptionTD')
										.append(
												'<span style="color:red;" class="mandatory">*</span>');
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_unitCost .CaptionTD')
										.empty();
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_unitCost .CaptionTD')
										.append('Cost Each.: ');
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_priceMultiplier .CaptionTD')
										.empty();
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_priceMultiplier .CaptionTD')
										.append('Mult.: ');
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_priceMultiplier .CaptionTD')
										.append(
												'<span style="color:red;" class="mandatory">*</span>');
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_taxable .CaptionTD')
										.empty();
								jQuery(
										'#TblGrid_customerInvoice_lineitems#tr_taxable .CaptionTD')
										.append('Tax: ');
								var unitCost = $('#unitCost').val().replace(
										/[^0-9-.]/g, '');
								$('#unitCost').val(unitCost);
								var priceMultiplier = $('#priceMultiplier')
										.val();
								priceMultiplier = parseFloat(priceMultiplier
										.replace(/[^0-9-.]/g, ''));
								$('#priceMultiplier').val(priceMultiplier);

							},
							beforeSubmit : function(postdata, formid) {
								$("#note").autocomplete("destroy");
								$(".ui-menu-item").hide();
								var aPrMasterID = $('#prMasterId').val();
								if (aPrMasterID === "") {
									return [ false,
											"Alert: Please provide a valid Product (Select from suggest dropdown list)." ];
								}
								return [ true, "" ];
							},
							onclickSubmit : function(params) {
								var cuinvoiceID = $('#cuinvoiceIDhidden').val();
								var taxRate = $('#customerInvoice_linetaxId')
										.val();
								taxRate = parseFloat(taxRate.replace(
										/[^0-9\-.]/g, ''));
								var freight = $('#customerInvoice_linefrightID')
										.val();
								freight = parseFloat(freight.replace(
										/[^0-9\-.]/g, ''));
								return {
									'cuInvoiceId' : cuinvoiceID,
									'taxRate' : taxRate,
									'freight' : freight,
									'operForAck' : ''
								};
							},
							afterSubmit : function(response, postData) {
								$("#note").autocomplete("destroy");
								$(".ui-menu-item").hide();
								$("a.ui-jqdialog-titlebar-close").show();
								// updateTotals();
								PreloadDataFromInvoiceTable("1");
								$('#cusinvoicetab').tabs({
									selected : 1
								});
								return [ true, loadCustomerInvoice("1") ];
							}

						},
						// -----------------------add
						// options----------------------//
						{
							width : 400,
							left : 398,
							top : 192,
							zIndex : 1040,
							closeAfterAdd : true,
							reloadAfterSubmit : true,
							modal : true,
							jqModel : false,
							addCaption : "Add customer Invoice Line Item",
							onInitializeForm : function(form) {

							},
							afterShowForm : function($form) {

								$(function() {
									var cache = {};
									var lastXhr = '';
									$("input#itemCode")
											.autocomplete(
													{
														minLength : 1,
														timeout : 1000,
														source : function(
																request,
																response) {
															var term = request.term;
															if (term in cache) {
																response(cache[term]);
																return;
															}
															lastXhr = $
																	.getJSON(
																			"jobtabs3/productCodeWithNameList",
																			request,
																			function(
																					data,
																					status,
																					xhr) {
																				cache[term] = data;
																				if (xhr === lastXhr) {
																					response(data);
																				}
																			});
														},
														select : function(
																event, ui) {
															var ID = ui.item.id;
															var product = ui.item.label;
															$("#prMasterId")
																	.val(ID);
															/*
															 * if(product.indexOf('-[')
															 * !== -1){var pro =
															 * product.split("-[");
															 * var pro2 =
															 * pro[1].replace("]","");
															 * $("#description").val(pro2);}
															 */
															$
																	.ajax({
																		url : './getLineItems?prMasterId='
																				+ $(
																						"#prMasterId")
																						.val(),
																		type : 'POST',
																		success : function(
																				data) {
																			$
																					.each(
																							data,
																							function(
																									key,
																									valueMap) {

																								if ("lineItems" == key) {
																									$
																											.each(
																													valueMap,
																													function(
																															index,
																															value) {

																														$(
																																"#description")
																																.val(
																																		value.description);
																														$(
																																"#unitCost")
																																.val(
																																		value.lastCost);
																														$(
																																"#priceMultiplier")
																																.val(
																																		value.pomult);
																														if (value.isTaxable == 1) {
																															$(
																																	"#taxable")
																																	.prop(
																																			"checked",
																																			true);
																														} else
																															$(
																																	"#taxable")
																																	.prop(
																																			"checked",
																																			false);
																													});
																								}
																							});
																		}
																	});

														},
														error : function(result) {
															$(
																	'.ui-autocomplete-loading')
																	.removeClass(
																			"ui-autocomplete-loading");
														}
													});
									return;
								});
							},
							beforeSubmit : function(postdta, formid) {
								$("#note").autocomplete("destroy");
								$(".ui-menu-item").hide();
								var aPrMasterID = $('#prMasterId').val();
								if (aPrMasterID === "") {
									return [ false,
											"Alert: Please provide a valid Product (Select from suggest dropdown list)." ];
								}
								return [ true, "" ];
							},
							onclickSubmit : function(params) {
								var cuinvoiceID = $('#cuinvoiceIDhidden').val();
								var taxRate = $('#customerInvoice_linetaxId')
										.val();
								taxRate = parseFloat(taxRate.replace(
										/[^0-9\-.]/g, ''));
								var freight = $('#customerInvoice_linefrightID')
										.val();
								freight = parseFloat(freight.replace(
										/[^0-9\-.]/g, ''));
								return {
									'cuInvoiceId' : cuinvoiceID,
									'taxRate' : taxRate,
									'freight' : freight,
									'operForAck' : ''
								};
							},
							afterSubmit : function(response, postData) {
								$("#note").autocomplete("destroy");
								$(".ui-menu-item").hide();
								$("a.ui-jqdialog-titlebar-close").show();
								// updateTotals();
								PreloadDataFromInvoiceTable("1");
								$('#cusinvoicetab').tabs({
									selected : 1
								});
								return [ true ];
							}
						},
						// -----------------------Delete
						// options----------------------//
						{
							closeOnEscape : true,
							reloadAfterSubmit : true,
							modal : true,
							jqModal : true,
							width : 300,
							left : 450,
							top : 350,
							zIndex : 1040,
							caption : "Delete",
							msg : 'Do you want to delete the line item?',
							color : 'red',

							onclickSubmit : function(params) {
								var grid = $("#customerInvoice_lineitemsRebuild");
								var rowId = grid.jqGrid('getGridParam',
										'selrow');
								var cuInvoiceID = grid.jqGrid('getCell', rowId,
										'cuInvoiceDetailId');
								var taxRate = $('#customerInvoice_linetaxId')
										.val();
								taxRate = parseFloat(taxRate.replace(
										/[^0-9\-.]/g, ''));
								var freight = $('#customerInvoice_linefrightID')
										.val();
								freight = parseFloat(freight.replace(
										/[^0-9\-.]/g, ''));
								return {
									'cuInvoiceDetailId' : cuInvoiceID,
									'taxRate' : taxRate,
									'freight' : freight
								};

							},
							afterSubmit : function(response, postData) {
								// PreloadData();
								// updateTotals();
								PreloadDataFromInvoiceTable("1");
								$('#cusinvoicetab').tabs({
									selected : 1
								});
								return [ true, loadCustomerInvoice("1") ];
							}
						});
	} catch (err) {
		var text = "There was an error on this page.\n\n";
		text += "Error description: " + err.message + "\n\n";
		text += "Click OK to continue.\n\n";
		console.log(text);
	}
}

function customCurrencyFormatterWithoutDollar(cellValue, options, rowObject) {
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+cellValue);
	var multiplier=cellValue;
	 if(isNaN(multiplier)||multiplier==""||multiplier==0){
		 multiplier=0;
		}else{
			multiplier=Round_priceMultiplier(multiplier);
			 }
	return multiplier;
}
function loadShipToAddress() {
	var reminders = [];
	for (var int = 0; int < warehouse.length; int++) {
		reminders.push({
			description : warehouse[int].description,
			address1 : warehouse[int].address1,
			address2 : warehouse[int].address2,
			city : warehouse[int].city,
			state : warehouse[int].state,
			zip : warehouse[int].zip
		});
	}
	var sfe = warehouse;

	// alert("--->"+reminders.length);
	if (sfe.length == 1) {
		$("#locationShipToAddressID6").val(reminders[0].description);
		$("#locationShipToAddressID7").val(reminders[0].address1);
		$("#locationShipToAddressID8").val(reminders[0].address2);
		$("#locationShipToCity2").val(reminders[0].city);
		$("#locationShipToState2").val(reminders[0].state);
		$("#locationShipToZipID2").val(reminders[0].zip);
		$("#customerShipToAddressID").val(reminders[0].description);
		$("#customerShipToAddressID1").val(reminders[0].address1);
		$("#customerShipToAddressID2").val(reminders[0].address2);
		$("#customerShipToCity").val(reminders[0].city);
		$("#customerShipToState").val(reminders[0].state);
		$("#locationShipToZipID").val(reminders[0].zip);

		$("#locationShipToAddressID6Rebuild").val(reminders[0].description);
		$("#locationShipToAddressID7Rebuild").val(reminders[0].address1);
		$("#locationShipToAddressID8Rebuild").val(reminders[0].address2);
		$("#locationShipToCity2Rebuild").val(reminders[0].city);
		$("#locationShipToState2Rebuild").val(reminders[0].state);
		$("#locationShipToZipID2Rebuild").val(reminders[0].zip);
		$("#customerShipToAddressIDRebuild").val(reminders[0].description);
		$("#customerShipToAddressID1Rebuild").val(reminders[0].address1);
		$("#customerShipToAddressID2Rebuild").val(reminders[0].address2);
		$("#customerShipToCityRebuild").val(reminders[0].city);
		$("#customerShipToStateRebuild").val(reminders[0].state);
		$("#locationShipToZipIDRebuild").val(reminders[0].zip);

	}
	if (sfe.length == 2) {
		$("#locationShipToAddressID6").val(reminders[0].description);
		$("#locationShipToAddressID7").val(reminders[0].address1);
		$("#locationShipToAddressID8").val(reminders[0].address2);
		$("#locationShipToCity2").val(reminders[0].city);
		$("#locationShipToState2").val(reminders[0].state);
		$("#locationShipToZipID2").val(reminders[0].zip);
		$("#customerShipToAddressID").val(reminders[0].description);
		$("#customerShipToAddressID1").val(reminders[0].address1);
		$("#customerShipToAddressID2").val(reminders[0].address2);
		$("#customerShipToCity").val(reminders[0].city);
		$("#customerShipToState").val(reminders[0].state);
		$("#locationShipToZipID").val(reminders[0].zip);
		$("#locationShipToAddressID4").val(reminders[1].description);
		$("#locationShipToAddressID5").val(reminders[1].address1);
		$("#locationShipToAddressID3").val(reminders[1].address2);
		$("#locationShipToCity1").val(reminders[1].city);
		$("#locationShipToState1").val(reminders[1].state);
		$("#locationShipToZipID1").val(reminders[1].zip);
		$("#customerShipToAddressID4").val(reminders[1].description);
		$("#customerShipToAddressID5").val(reminders[1].address1);
		$("#customerShipToAddressID3").val(reminders[1].address2);
		$("#customerShipToCity1").val(reminders[1].city);
		$("#customerShipToState1").val(reminders[1].state);
		$("#customerShipToZipID1").val(reminders[1].zip);

		$("#locationShipToAddressID6Rebuild").val(reminders[0].description);
		$("#locationShipToAddressID7Rebuild").val(reminders[0].address1);
		$("#locationShipToAddressID8Rebuild").val(reminders[0].address2);
		$("#locationShipToCity2Rebuild").val(reminders[0].city);
		$("#locationShipToState2Rebuild").val(reminders[0].state);
		$("#locationShipToZipID2Rebuild").val(reminders[0].zip);
		$("#customerShipToAddressIDRebuild").val(reminders[0].description);
		$("#customerShipToAddressID1Rebuild").val(reminders[0].address1);
		$("#customerShipToAddressID2Rebuild").val(reminders[0].address2);
		$("#customerShipToCityRebuild").val(reminders[0].city);
		$("#customerShipToStateRebuild").val(reminders[0].state);
		$("#locationShipToZipIDRebuild").val(reminders[0].zip);
		$("#locationShipToAddressID4Rebuild").val(reminders[1].description);
		$("#locationShipToAddressID5Rebuild").val(reminders[1].address1);
		$("#locationShipToAddressID3Rebuild").val(reminders[1].address2);
		$("#locationShipToCity1Rebuild").val(reminders[1].city);
		$("#locationShipToState1Rebuild").val(reminders[1].state);
		$("#locationShipToZipID1Rebuild").val(reminders[1].zip);
		$("#customerShipToAddressID4Rebuild").val(reminders[1].description);
		$("#customerShipToAddressID5Rebuild").val(reminders[1].address1);
		$("#customerShipToAddressID3Rebuild").val(reminders[1].address2);
		$("#customerShipToCity1Rebuild").val(reminders[1].city);
		$("#customerShipToState1Rebuild").val(reminders[1].state);
		$("#customerShipToZipID1Rebuild").val(reminders[1].zip);
	}
	document.getElementById('customerShipToAddressID').disabled = true;
	document.getElementById('customerShipToAddressID1').disabled = true;
	document.getElementById('customerShipToAddressID2').disabled = true;
	document.getElementById('customerShipToCity').disabled = true;
	document.getElementById('customerShipToState').disabled = true;
	document.getElementById('customerShipToZipID').disabled = true;
}
function addressToShipCustomerInvoice() {

	// alert("heeee");

	var rxMasterId = $("#rxCustomerID").val();

	// alert($("#rxCustomerID").val());
	// operationVar = "ship";
	operationVar = "bill";
	$.ajax({
		url : "./salesOrderController/getBilltoAddress",
		type : "GET",
		data : {
			"customerID" : rxMasterId,
			"oper" : operationVar
		},
		success : function(data) {
			$('#customerbillToAddressID1cuInvoice').val(data.address1);
			$('#customerbillToAddressID2cuInvoice').val(data.address2);
			$('#customerbillToCitycuInvoice').val(data.city);
			$('#customerbillToStatecuInvoice').val(data.state);
			$('#customerbillToZipIDcuInvoice').val(data.zip);
			$('#customerbillToAddressID1cuInvoiceRebuild').val(data.address1);
			$('#customerbillToAddressID2cuInvoiceRebuild').val(data.address2);
			$('#customerbillToCitycuInvoiceRebuild').val(data.city);
			$('#customerbillToStatecuInvoiceRebuild').val(data.state);
			$('#customerbillToZipIDcuInvoiceRebuild').val(data.zip);

		}
	});

	var rxMasterId = $("#shipToCustomerAddressID").val();
	console.log('Jenith rxMasterID-1:' + rxMasterId);
	if ((rxMasterId === null || rxMasterId === '')
			|| typeof rxMasterId == "undefined") {
		rxMasterId = $('#rxCustomer_ID').text();
		console.log('Jenith rxMasterID-2:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $("#customerInvoice_customerHiddnID").val();
		console.log('Jenith rxMasterID-3:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $("#rxMasterIDfrompage").val();
		console.log('Jenith rxMasterID-4:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $('#rxCustomerID').val();
		console.log('Jenith rxMasterID-5:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = 0;
		console.log('Jenith rxMasterID-6:' + rxMasterId);
	}
	console.log('Jenith rxMasterID=7:' + rxMasterId);
	$.ajax({
		url : "./salesOrderController/getCustomerDetails",
		type : "GET",
		data : {
			"customerID" : rxMasterId
		},
		success : function(data) {
			console.log('Jenith CD:' + data.name);
			customerName = data.name;
		}
	});
}

function customerinvoiceShiptoAddress() {
	$("#cuinvoiceUs").hide();
	console.log("Inside invoiceList.js - customerinvoiceShiptoAddress");
	$("#lineshipTo").show();
	$("#lineshipTo1").hide();
	$('#shipToMode').val("1");

	$("#CiShiptoradio2").attr("Checked", "Checked");
	$('#CiShiptolabel2').css("font-weight", "bold");
	$('#CiShiptolabel1').css("font-weight", "normal");
	$('#CiShiptolabel3').css("font-weight", "normal");
	$('#CiShiptolabel4').css("font-weight", "normal");
	$('#CiShiptolabel2').addClass("ui-state-active");
	$('#CiShiptolabel1').removeClass("ui-state-active");
	$('#CiShiptolabel3').removeClass("ui-state-active");
	$('#CiShiptolabel4').removeClass("ui-state-active");

	$('#forWardId').css({
		"display" : "none"
	});
	$('#backWardId').css({
		"display" : "none"
	});
	$('#customerforWardId').css({
		"display" : "none"
	});
	$('#customerbackWardId').css({
		"display" : "none"
	});
	$('#usinvoiceShipto').css({
		"background-image" : "url(./../resources/images/us.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#customerinvoiceShipto').css({
		"background-image" : "url(./../resources/images/customer_select.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#jobsiteinvoiceShipto').css({
		"background-image" : "url(./../resources/images/jobsite.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#otherinvoiceShipto').css({
		"background-image" : "url(./../resources/images/other.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$("#lineshipToRebuild").show();
	$("#lineshipTo1Rebuild").hide();
	$('#shipToModeRebuild').val("2");
	$('#forWardIdRebuild').css({
		"display" : "none"
	});
	$('#backWardIdRebuild').css({
		"display" : "none"
	});
	$('#customerforWardIdRebuild').css({
		"display" : "none"
	});
	$('#customerbackWardIdRebuild').css({
		"display" : "none"
	});
	$('#usinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/us.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#customerinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/customer_select.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#jobsiteinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/jobsite.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#otherinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/other.png)",
		"width" : "63px",
		"height" : "28px"
	});

	// alert("hi");

	// alert($('#rxShipToID').val() + "==="+$('#rxCustomerID').val())

	var rxMasterId = $("#rxShipToID").val();
	if (rxMasterId == null || rxMasterId == '') {
		rxMasterId = $('#rxCustomerID').text();
	} else {
		rxMasterId = $("#rxShipToID").val();
	}

	$
			.ajax({
				url : "./salesOrderController/getCustomerShipToAddressforSO",
				type : "GET",
				data : {
					"customerID" : rxMasterId
				},
				success : function(data) {
					var locationName = data.name;
					var rxAddressId = data.rxAddressId;
					var locationAddress1 = data.address1;
					var locationAddress2 = data.address2;
					var locationCity = data.city;
					var locationState = data.state;
					var locationZip = data.zip;
					console.log("locationState--" + locationState);
					console.log("locationZip--" + locationZip);
					$("#rxAddressShipID").val(rxAddressId);
					$("#customerShipToAddressID").val(locationName);
					$("#customerShipToAddressID1").val(locationAddress1);
					$("#customerShipToAddressID2").val(locationAddress2);
					$("#customerShipToCity").val(locationCity);
					$("#customerShipToState").val(locationState);
					$("#customerShipToZipID").val(locationZip);
					document.getElementById('customerShipToAddressID').disabled = false;
					document.getElementById('customerShipToAddressID1').disabled = true;
					document.getElementById('customerShipToAddressID2').disabled = true;
					document.getElementById('customerShipToCity').disabled = true;
					document.getElementById('customerShipToState').disabled = true;
					document.getElementById('customerShipToZipID').disabled = true;

					$("#rxAddressShipIDRebuild").val(rxAddressId);
					$("#customerShipToAddressIDRebuild").val(locationName);
					$("#customerShipToAddressID1Rebuild").val(locationAddress1);
					$("#customerShipToAddressID2Rebuild").val(locationAddress2);
					$("#customerShipToCityRebuild").val(locationCity);
					$("#customerShipToStateRebuild").val(locationState);
					$("#customerShipToZipIDRebuild").val(locationZip);
					document.getElementById('customerShipToAddressIDRebuild').disabled = false;
					document.getElementById('customerShipToAddressID1Rebuild').disabled = true;
					document.getElementById('customerShipToAddressID2Rebuild').disabled = true;
					document.getElementById('customerShipToCityRebuild').disabled = true;
					document.getElementById('customerShipToStateRebuild').disabled = true;
					document.getElementById('customerShipToZipIDRebuild').disabled = true;
				}
			});

	var rxMasterId = $("#shipToCustomerAddressID").val();
	console.log('Jenith rxMasterID-1:' + rxMasterId);
	if ((rxMasterId === null || rxMasterId === '')
			|| typeof rxMasterId == "undefined") {
		rxMasterId = $('#rxCustomer_ID').text();
		console.log('Jenith rxMasterID-2:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $("#customerInvoice_customerHiddnID").val();
		console.log('Jenith rxMasterID-3:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $("#rxMasterIDfrompage").val();
		console.log('Jenith rxMasterID-4:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $('#rxCustomerID').val();
		console.log('Jenith rxMasterID-5:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = 0;
		console.log('Jenith rxMasterID-6:' + rxMasterId);
	}
	console.log('Jenith rxMasterID=7:' + rxMasterId);
	$.ajax({
		url : "./salesOrderController/getCustomerDetails",
		type : "GET",
		data : {
			"customerID" : rxMasterId
		},
		success : function(data) {
			console.log('Jenith CD:' + data.name);
			customerName = data.name;
		}
	});
	return true;
}

function otherinvoiceShiptoAddress() {
	console.log("Inside invoiceList.js - otherinvoiceShiptoAddress");
	$("#cuinvoiceUs").hide();
	$("#CiShiptoradio4").attr("Checked", "Checked");
	$('#CiShiptolabel4').css("font-weight", "bold");
	$('#CiShiptolabel2').css("font-weight", "normal");
	$('#CiShiptolabel3').css("font-weight", "normal");
	$('#CiShiptolabel1').css("font-weight", "normal");

	$('#CiShiptolabel4').addClass("ui-state-active");
	$('#CiShiptolabel2').removeClass("ui-state-active");
	$('#CiShiptolabel3').removeClass("ui-state-active");
	$('#shiptolabel1').removeClass("ui-state-active");
	$('#shipToMode').val("3");
	$("#lineshipTo").show();
	$("#lineshipTo1").hide();
	$('#forWardId').css({
		"display" : "none"
	});
	$('#backWardId').css({
		"display" : "none"
	});
	$('#customerforWardId').css({
		"display" : "none"
	});
	$('#customerbackWardId').css({
		"display" : "none"
	});
	$('#usinvoiceShipto').css({
		"background-image" : "url(./../resources/images/us.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#customerinvoiceShipto').css({
		"background-image" : "url(./../resources/images/customer.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#jobsiteinvoiceShipto').css({
		"background-image" : "url(./../resources/images/jobsite.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#otherinvoiceShipto').css({
		"background-image" : "url(./../resources/images/other_select.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#shipToModeRebuild').val("4");
	$("#lineshipToRebuild").show();
	$("#lineshipTo1Rebuild").hide();
	$('#forWardIdRebuild').css({
		"display" : "none"
	});
	$('#backWardIdRebuild').css({
		"display" : "none"
	});
	$('#customerforWardIdRebuild').css({
		"display" : "none"
	});
	$('#customerbackWardIdRebuild').css({
		"display" : "none"
	});
	$('#usinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/us.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#customerinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/customer.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#jobsiteinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/jobsite.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#otherinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/other_select.png)",
		"width" : "63px",
		"height" : "28px"
	});

	var rxMasterId = $('#rxShipToOtherAddressID').val();
	$
			.ajax({
				url : "./salesOrderController/getShipToOtherAddress",
				type : "GET",
				data : {
					"addressID" : rxMasterId
				},
				success : function(data) {
					var locationName = data.name;
					var rxAddressId = data.rxAddressId;
					var locationAddress1 = data.address1;
					var locationAddress2 = data.address2;
					var locationCity = data.city;
					var locationState = data.state;
					var locationZip = data.zip;
					$("#rxAddressShipID").val(rxAddressId);
					$("#customerShipToAddressID").val(locationName);
					$("#customerShipToAddressID1").val(locationAddress1);
					$("#customerShipToAddressID2").val(locationAddress2);
					$("#customerShipToCity").val(locationCity);
					$("#customerShipToState").val(locationState);
					$("#customerShipToZipID").val(locationZip);
					document.getElementById('customerShipToAddressID').disabled = false;
					document.getElementById('customerShipToAddressID1').disabled = false;
					document.getElementById('customerShipToAddressID2').disabled = false;
					document.getElementById('customerShipToCity').disabled = false;
					document.getElementById('customerShipToState').disabled = false;
					document.getElementById('customerShipToZipID').disabled = false;
				}
			});
	var rxMasterId = $("#shipToCustomerAddressID").val();
	console.log('Jenith rxMasterID-1:' + rxMasterId);
	if ((rxMasterId === null || rxMasterId === '')
			|| typeof rxMasterId == "undefined") {
		rxMasterId = $('#rxCustomer_ID').text();
		console.log('Jenith rxMasterID-2:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $("#customerInvoice_customerHiddnID").val();
		console.log('Jenith rxMasterID-3:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $("#rxMasterIDfrompage").val();
		console.log('Jenith rxMasterID-4:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $('#rxCustomerID').val();
		console.log('Jenith rxMasterID-5:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = 0;
		console.log('Jenith rxMasterID-6:' + rxMasterId);
	}
	console.log('Jenith rxMasterID=7:' + rxMasterId);
	$.ajax({
		url : "./salesOrderController/getCustomerDetails",
		type : "GET",
		data : {
			"customerID" : rxMasterId
		},
		success : function(data) {
			console.log('Jenith CD:' + data.name);
			customerName = data.name;
		}
	});
	/*
	 * document.getElementById('customerShipToAddressID').disabled=false;
	 * document.getElementById('customerShipToAddressID1').disabled=false;
	 * document.getElementById('customerShipToAddressID2').disabled=false;
	 * document.getElementById('customerShipToCity').disabled=false;
	 * document.getElementById('customerShipToState').disabled=false;
	 * document.getElementById('customerShipToZipID').disabled=false;
	 */
	return true;
}

function jobsiteinvoiceShiptoAddress(dataID, tableName) {
	// alert("in InvoiceList.js:"+dataID+" "+tableName);
	var rxMasterId = $("#shipToCustomerAddressID").val();
	console.log('Jenith rxMasterID-1:' + rxMasterId);
	if ((rxMasterId === null || rxMasterId === '')
			|| typeof rxMasterId == "undefined") {
		rxMasterId = $('#rxCustomer_ID').text();
		console.log('Jenith rxMasterID-2:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $("#customerInvoice_customerHiddnID").val();
		console.log('Jenith rxMasterID-3:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $("#rxMasterIDfrompage").val();
		console.log('Jenith rxMasterID-4:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = $('#rxCustomerID').val();
		console.log('Jenith rxMasterID-5:' + rxMasterId);
	}
	if (rxMasterId === null || rxMasterId === "") {
		rxMasterId = 0;
		console.log('Jenith rxMasterID-6:' + rxMasterId);
	}
	console.log('Jenith rxMasterID=7:' + rxMasterId);
	$.ajax({
		url : "./salesOrderController/getCustomerDetails",
		type : "GET",
		data : {
			"customerID" : rxMasterId
		},
		success : function(data) {
			console.log('Jenith CD:' + data.name);
			customerName = data.name;
		}
	});
	console.log("Inside invoiceList.js - jobsiteinvoiceShiptoAddress");
	$("#cuinvoiceUs").hide();
	$("#CiShiptoradio3").attr("Checked", "Checked");
	$('#CiShiptolabel3').css("font-weight", "bold");
	$('#CiShiptolabel2').css("font-weight", "normal");
	$('#CiShiptolabel1').css("font-weight", "normal");
	$('#CiShiptolabel4').css("font-weight", "normal");
	$('#CiShiptolabel3').addClass("ui-state-active");
	$('#CiShiptolabel2').removeClass("ui-state-active");
	$('#CiShiptolabel1').removeClass("ui-state-active");
	$('#CiShiptolabel4').removeClass("ui-state-active");

	$('#shipToMode').val("2");
	$("#lineshipTo").show();
	$("#lineshipTo1").hide();
	$('#forWardId').css({
		"display" : "none"
	});
	$('#backWardId').css({
		"display" : "none"
	});
	$('#usinvoiceShipto').css({
		"background-image" : "url(./../resources/images/us.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#customerinvoiceShipto').css({
		"background-image" : "url(./../resources/images/customer.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#jobsiteinvoiceShipto').css({
		"background-image" : "url(./../resources/images/jobsite_select.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#otherinvoiceShipto').css({
		"background-image" : "url(./../resources/images/other.png)",
		"width" : "63px",
		"height" : "28px"
	});
	// tableName
	var selectedRowId = $("#CustomerInvoiceGrid").jqGrid('getGridParam',
			'selrow');
	var joReleasedetailID = $("#CustomerInvoiceGrid").jqGrid('getCell',
			selectedRowId, 'joReleaseDetailId');
	if (joReleasedetailID != null && joReleasedetailID != "") {

	} else {
		joReleasedetailID = 0;
	}
	$.ajax({
		url : "./salesOrderController/getJobDetailsFromReleaseDetail",
		type : "POST",
		data : {
			"joReleasedetailID" : joReleasedetailID
		},
		success : function(data) {
			$("#customerShipToAddressID").val(customerName);
			$("#customerShipToAddressID1").val(data.locationAddress1);
			$("#customerShipToAddressID2").val(data.locationAddress2);
			$("#customerShipToCity").val(data.locationCity);
			$("#customerShipToState").val(data.locationState);
			$("#customerShipToZipID").val(data.locationZip);
			// loadTaxTerritoryRateforinsideJob(data.coTaxTerritoryId);
		}
	});

	/*
	 * $("#customerShipToAddressID").val("");
	 * $("#customerShipToAddressID1").val("");
	 * $("#customerShipToAddressID2").val(""); $("#customerShipToCity").val("");
	 * $("#customerShipToState").val(""); $("#customerShipToZipID").val("");
	 */
	document.getElementById('customerShipToAddressID').disabled = true;
	document.getElementById('customerShipToAddressID1').disabled = true;
	document.getElementById('customerShipToAddressID2').disabled = true;
	document.getElementById('customerShipToCity').disabled = true;
	document.getElementById('customerShipToState').disabled = true;
	document.getElementById('customerShipToZipID').disabled = true;

	$('#shipToModeRebuild').val("2");
	$("#lineshipToRebuild").show();
	$("#lineshipTo1Rebuild").hide();
	$('#forWardIdRebuild').css({
		"display" : "none"
	});
	$('#backWardIdRebuild').css({
		"display" : "none"
	});
	$('#usinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/us.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#customerinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/customer.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#jobsiteinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/jobsite_select.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#otherinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/other.png)",
		"width" : "63px",
		"height" : "28px"
	});
	/*
	 * $("#customerShipToAddressID").val(CustomName);
	 * $("#customerShipToAddressID1").val(jobLocation1);
	 * $("#customerShipToAddressID2").val(jobLocation2);
	 * $("#customerShipToCity").val(jobCity);
	 * $("#customerShipToState").val(jobState);
	 * $("#customerShipToZipID").val(jobZip);
	 */
	$("#customerShipToAddressIDRebuild").val("");
	$("#customerShipToAddressID1Rebuild").val("");
	$("#customerShipToAddressID2Rebuild").val("");
	$("#customerShipToCityRebuild").val("");
	$("#customerShipToStateRebuild").val("");
	$("#customerShipToZipIDRebuild").val("");
	document.getElementById('customerShipToAddressIDRebuild').disabled = true;
	document.getElementById('customerShipToAddressID1Rebuild').disabled = true;
	document.getElementById('customerShipToAddressID2Rebuild').disabled = true;
	document.getElementById('customerShipToCityRebuild').disabled = true;
	document.getElementById('customerShipToStateRebuild').disabled = true;
	document.getElementById('customerShipToZipIDRebuild').disabled = true;
	return true;
}

function customershipBackWard() {
	$("#lineshipTo1").hide();
	$("#lineshipTo").show();
}

function customershipForWard() {
	$("#lineshipTo1").show();
	$("#lineshipTo").hide();
}

function FormatDate(createdDate) {

	var date = new Date(createdDate);
	var CreatedOn = date.getDate();
	var createdMonth = date.getMonth() + 1;
	var createdYear = date.getFullYear();
	if (CreatedOn < 10) {
		CreatedOn = '0' + CreatedOn;
	}
	if (createdMonth < 10) {
		createdMonth = '0' + createdMonth;
	}
	createdDate = createdMonth + "/" + CreatedOn + "/" + createdYear;
	// alert("Date:"+createdDate);
	$("#customerInvoice_invoiceDateID").val(createdDate);
	$("#customerInvoice_lineinvoiceDateID").val(createdDate);

}
function FormatShipDate(createdDate) {
	var date = new Date(createdDate);
	var CreatedOn = date.getDate();
	var createdMonth = date.getMonth() + 1;
	var createdYear = date.getFullYear();
	if (CreatedOn < 10) {
		CreatedOn = '0' + CreatedOn;
	}
	if (createdMonth < 10) {
		createdMonth = '0' + createdMonth;
	}
	createdDate = createdMonth + "/" + CreatedOn + "/" + createdYear;
	$("#customerInvoice_shipDateID").val(createdDate);
	$("#customerInvoice_lineshipDateID").val(createdDate);

}

function FormatDueDate(dueDate) {

	var date = new Date(dueDate);
	var CreatedOn = date.getDate();
	var createdMonth = date.getMonth() + 1;
	var createdYear = date.getFullYear();
	if (CreatedOn < 10) {
		CreatedOn = '0' + CreatedOn;
	}
	if (createdMonth < 10) {
		createdMonth = '0' + createdMonth;
	}
	createdDate = createdMonth + "/" + CreatedOn + "/" + createdYear;
	$("#customerInvoice_dueDateID").val(createdDate);
}
function usinvoiceShiptoAddress(dataID, tablename) {
	console.log("Inside invoiceList.js - usinvoiceShiptoAddress");
	$('#shipToMode').val("0");
	$('#customerforWardId').show();
	$('#customerbackWardId').show();

	$("#CiShiptoradio1").attr("Checked", "Checked");
	$('#CiShiptolabel1').css("font-weight", "bold");
	$('#CiShiptolabel2').css("font-weight", "normal");
	$('#CiShiptolabel3').css("font-weight", "normal");
	$('#CiShiptolabel4').css("font-weight", "normal");
	$('#CiShiptolabel1').addClass("ui-state-active");
	$('#CiShiptolabel2').removeClass("ui-state-active");
	$('#CiShiptolabel3').removeClass("ui-state-active");
	$('#CiShiptolabel4').removeClass("ui-state-active");

	$('#usinvoiceShipto').css({
		"background-image" : "url(./../resources/images/us_select.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#customerinvoiceShipto').css({
		"background-image" : "url(./../resources/images/customer.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#jobsiteinvoiceShipto').css({
		"background-image" : "url(./../resources/images/jobsite.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#otherinvoiceShipto').css({
		"background-image" : "url(./../resources/images/other.png)",
		"width" : "63px",
		"height" : "28px"
	});

	$('#shipToModeRebuild').val("0");
	$('#customerforWardIdRebuild').show();
	$('#customerbackWardIdRebuild').show();
	$('#usinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/us_select.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#customerinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/customer.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#jobsiteinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/jobsite.png)",
		"width" : "63px",
		"height" : "28px"
	});
	$('#otherinvoiceShiptoRebuild').css({
		"background-image" : "url(./../resources/images/other.png)",
		"width" : "63px",
		"height" : "28px"
	});

	if (tablename == 'cuinvoice') {
		$.ajax({
			url : "./salesOrderController/getPreInvoiceData",
			type : "POST",
			data : "&cuInvoiceId=" + dataID + "&rxMasterID=0",
			success : function(data) {
				console.log('Jenith Your Data: '
						+ data.cuInvoice.rxShipToAddressId);
				loadShipToAddressing(data.cuInvoice.rxShipToAddressId);
			}
		});
	}
	if (tablename == 'cuso') {
		$.ajax({
			url : "./salesOrderController/getPreLoadData",
			type : "POST",
			data : "&cuSOID=" + dataID + "&rxMasterID=0",
			// data :
			// "&cuSOID="+cuSOID+"&rxMasterID="+rxMasterID+'&vePOID='+vePOID+'&jobNumber='+jobNumber+"&joReleaseDetailID="+joReleaseDetailID,
			success : function(data) {
				console.log('Jenith Your Data: ' + data.Cuso.prToWarehouseId);
				loadShipToAddressing(data.Cuso.prToWarehouseId);
			}
		});
	} else if (tablename == 'vepo') {
		$.ajax({
			url : "./salesOrderController/getPreLoadData",
			type : "POST",
			data : "&vePOID=" + dataID + "&rxMasterID=0",
			// data :
			// "&cuSOID="+cuSOID+"&rxMasterID="+rxMasterID+'&vePOID='+vePOID+'&jobNumber='+jobNumber+"&joReleaseDetailID="+joReleaseDetailID,
			success : function(data) {
				console.log('Jenith Your Data: ' + data.vepo.prWarehouseId);
				loadShipToAddressing(data.vepo.prWarehouseId);
			}
		});
	} else {
		loadShipToAddressing('');
	}
	return true;
}

function loadTaxTerritoryRate(coTaxTerritoryId) {
	if (coTaxTerritoryId != null && coTaxTerritoryId != '') {
		$.ajax({
			url : "./salesOrderController/taxRateTerritory",
			type : "POST",
			data : {
				"coTaxTerritoryId" : coTaxTerritoryId
			},
			success : function(data) {
				$('#customerInvoice_TaxTerritory').val(data.county);
				// $('#SOGeneral_taxId').val(formatCurrencynodollar(data.taxRate));
				$('#customerTaxTerritory').val(data.coTaxTerritoryId);
				$('#customerInvoice_TaxTerritoryRebuild').val(data.county);
				// $('#SOGeneral_taxId').val(formatCurrencynodollar(data.taxRate));
				$('#customerTaxTerritoryRebuild').val(data.coTaxTerritoryId);
			}
		});
	}
}

//added by prasant for issue fixes while saving the cuInvocies if tax territory is not selected then after giveing the tax territory the save button is diseabled 
$( "#customerInvoice_TaxTerritory" ).change(function() {
	
	if( $("#customerInvoice_TaxTerritory").val()!=""||$("#customerInvoice_TaxTerritory").val().length == 0)
		document.getElementById("CuInvoiceSaveID").disabled = false;
		else 
			document.getElementById("CuInvoiceSaveID").disabled = true;
	});
function savecustomerinvoice(operation) {
	//BID1633 Simon
	debugger;
	$("#CuInvoiceSaveID").prop('disabled', true);
	var customerInvoice_TaxTerritory = $("#customerInvoice_TaxTerritory").val();
	
	if(operation == 'closedialog')
		$('#custInvCloseSaveHiddenOut').val("closeCusinvoiceGrid");
	else
		$('#custInvCloseSaveHiddenOut').val("");
	
	if (operation != 'closedialog' && (customerInvoice_TaxTerritory == null|| customerInvoice_TaxTerritory == "" || customerInvoice_TaxTerritory.length == 0)
					) {

		var newDialogDiv = jQuery(document.createElement('div'));
		jQuery(newDialogDiv)
				.html(
						'<span><b style="color:red;">please set Tax Territory in Customer->Roldex->Financial tab</b></span>');
		jQuery(newDialogDiv).dialog({
			modal : true,
			width : 300,
			height : 150,
			title : "Warning.",
			buttons : {
				"OK" : function() {
					$(this).dialog("close");
					return false;
				}
			}
		}).dialog("open");
		return false;
	}


	var customerinvoicecustomerid = $("#rxCustomerID").val();
	if (customerinvoicecustomerid == null || customerinvoicecustomerid == "") {
		var newDialogDiv = jQuery(document.createElement('div'));
		jQuery(newDialogDiv).html(
				'<span><b style="color:red;">Customer is required</b></span>');
		jQuery(newDialogDiv).dialog({
			modal : true,
			width : 300,
			height : 150,
			title : "Information.",
			buttons : [ {
				text : "OK",
				click : function() {
					$(this).dialog("close");
				}
			} ]
		}).dialog("open");
		return false;
	}
	if (globalinsideoroutsidejob) {
		var chk_cusReqDivinCusInvYes = getSysvariableStatusBasedOnVariableName("RequireDivisioninCustomerInvoice");
		var chkCusReqDivSal = false;
		if (chk_cusReqDivinCusInvYes != null
				&& chk_cusReqDivinCusInvYes[0].valueLong == 1) {
			var customer_Divisions = $("#customer_Divisions").val();
			if (customer_Divisions > -1) {
				chkCusReqDivSal = false;
			} else {
				chkCusReqDivSal = true;
			}

		} else {
			chkCusReqDivSal = false;
		}

		if (chkCusReqDivSal) {

			var validateMsg = "Please&nbsp;select&nbsp;division&nbsp;value."
			$('#soDivisionId').html(validateMsg);
			setTimeout(function() {
				$('#soDivisionId').html("");
			}, 3000);
			$("#SOdivisionID").focus();
			return false;
		}
	}

	var contId = $("#emailListCU option:selected").val();
	if (typeof $("#emailListCU option:selected").val() == "undefined") {
		contId = "";
	}

	if (operation != "close") {
		$('#CuInvoiceSaveID')
				.css('background',
						'-webkit-gradient(linear, left top, left bottom, from(#C1C3CA), to(#A4A4A5))');
		$('#CuInvoiceSaveCloseID')
				.css('background',
						'-webkit-gradient(linear, left top, left bottom, from(#C1C3CA), to(#A4A4A5))');
		document.getElementById("CuInvoiceSaveID").disabled = true;
		document.getElementById("CuInvoiceSaveCloseID").disabled = true;
	}

	var aInvoiceDetails = $("#custoemrInvoiceFormID").serialize();
	var gridRows = $('#customerInvoice_lineitems').getRowData();
	var dataToSend = JSON.stringify(gridRows)+ $("#customerInvoice_invoiceDateID").val();
	var newDialogDiv = jQuery(document.createElement('div'));
	var cuinvId = 0;
	if ($('#cuinvoiceIDhidden').val() != null
			&& $('#cuinvoiceIDhidden').val() != '')
		cuinvId = $('#cuinvoiceIDhidden').val();
	var customerID = $('#rxCustomerID').val();
	var cusoId = $('#cusoid').val();
	var aSubTotal = $("#customerInvoice_subTotalID").val().replace(
			/[^0-9\.-]+/g, "");
	var aFreight = $("#customerInvoice_frightIDcu").val().replace(
			/[^0-9\.-]+/g, "");
	var taxrate = $('#customerInvoice_generaltaxId').val().replace(
			/[^0-9\.]+/g, "");
	var aTax = $("#customerInvoice_taxIdcu").val().replace(/[^0-9\.-]+/g, "");
	var aTotal = $("#customerInvoice_totalID").val().replace(/[^0-9\.-]+/g, "");

	var title = $('#cusinvoicetab').dialog('option', 'title');
	var grid = $("#shiping");
	var rowId = grid.jqGrid('getGridParam', 'selrow');
	var poNumber = $('#customerInvoice_proNumberID').val().replace(
			/[^0-9\.]+/g, "");
	var bidderGrid = $("#release");
	var aVeBillID = '';
	var InvoiceNo = $('#customerInvoice_invoiceNumberId').val();
	var shipDate = $('#customerInvoice_shipDateID').val();
	// var bidderGridRowId = bidderGrid.jqGrid('getGridParam', 'selrow');
	// var joReleaseID = $("#CustomerInvoiceGrid").jqGrid('getCell',
	// bidderGridRowId, 'joReleaseDetailid');
	// var vePOID = bidderGrid.jqGrid('getCell', bidderGridRowId, 'vePoId');
	var vePOID = '';
	var joReleaseID = 0;
	var releaseType = 2;
	if (vePOID != '') {
		releaseType = 1;
		cusoId = vePOID;
	}
	var aAddOREdit = '';
	var title = $('#cusinvoicetab').dialog('option', 'title');
	var transaction = 'save';
	if (title == 'New Customer Invoice' && operation == 'close') {
		transaction = 'close';
	}
	if (cuinvId != 0 && cuinvId != null && cuinvId != '') {
		aAddOREdit = 'edit';
	} else {
		aAddOREdit = 'add';
	}
	var shipToMode = $('#shipToMode').val();
	var rxShipToID = $('#rxShipToID').val();
	var rxShipToOtherAddressID = $('#rxShipToOtherAddressID').val();
	var customerShipToAddressID = $('#customerShipToAddressID').val();
	var customerShipToAddressID1 = $('#customerShipToAddressID1').val();
	var customerShipToAddressID2 = $('#customerShipToAddressID2').val();
	var customerShipToCity = $('#customerShipToCity').val();
	var customerShipToState = $('#customerShipToState').val();
	var customerShipToZipID = $('#customerShipToZipID').val();

	var customerInvGridrowID = $("#CustomerInvoiceGrid").jqGrid('getGridParam',
			'selrow');
	/*
	 * var cIopenStatus = $("#CustomerInvoiceGrid").jqGrid('getCell',
	 * customerInvGridrowID, 'cIopenStatus');
	 */
	var cIopenStatus = $('#ciOpenStatusID').val();
	var shipToAddressIDs = $('#prShiptowarehouseID').val();
	var taxfreight = $('#CI_taxfreight').val();
	if(taxfreight=="")
		taxfreight=0;

	console.log("InvoiceDetails==" + aInvoiceDetails);
	var aCustomerInvoiceDetails = aInvoiceDetails
			+ "&customer"
			+ "Invoice_subTotalName="
			+ aSubTotal
			+ "&customerInvoice_frightname="
			+ aFreight
			+ "&customerInvoice_taxName="
			+ aTax
			+ "&customerInvoice_totalName="
			+ aTotal
			+ "&oper="
			+ aAddOREdit
			+ "&joReleaseDetailsID="
			+ joReleaseID
			+ '&cuSOID='
			+ cusoId
			+ '&poNumber='
			+ poNumber
			+ '&InvoiceNo='
			+ InvoiceNo
			+ '&shipDate='
			+ shipDate
			+ '&taxRate='
			+ taxrate
			+ '&cuInvHiddenId='
			+ cuinvId
			+ "&releaseType="
			+ releaseType
			+ '&customerID='
			+ customerID
			// +'&rxShipToID='+rxShipToID+'&rxShipToOtherAddressID='+rxShipToOtherAddressID
			+ '&rxContactID='
			+ contId
			+ "&customerInvoice_taxIdcuname="
			+ aTax
			+ "&CIrxShiptoid="
			+ $("#CI_Shipto").contents().find("#shiptoaddrhiddenfromuiid")
					.val() + "&CIrxShiptomodevalue="
			+ $("#CI_Shipto").contents().find("#shiptomoderhiddenid").val()
			+ "&taxfreight=" + taxfreight;
	// "&rxShiptoAddressID="+shipToAddressIDs+"&shipToMode="+shipToModeIn+

	if (aAddOREdit == 'edit' && cIopenStatus == false) {
		aCustomerInvoiceDetails = aInvoiceDetails
				+ "&customerInvoice_subTotalName="
				+ aSubTotal
				+ "&CIrxShiptoid="
				+ $("#CI_Shipto").contents().find("#shiptoaddrhiddenfromuiid")
						.val() + "&CIrxShiptomodevalue="
				+ $("#CI_Shipto").contents().find("#shiptomoderhiddenid").val()
				+ "&customerInvoice_frightname=" + aFreight
				+ "&customerInvoice_taxName=" + aTax
				+ "&customerInvoice_totalName=" + aTotal + "&oper="
				+ aAddOREdit + "&joReleaseDetailsID=" + joReleaseID
				+ '&cuSOID=' + cusoId + '&poNumber=' + poNumber + '&InvoiceNo='
				+ InvoiceNo + '&shipDate=' + shipDate + '&taxRate=' + taxrate
				+ '&cuInvHiddenId=' + cuinvId + "&releaseType=" + releaseType
				+ '&customerID=' + customerID
				// +'&rxShipToID='+rxShipToID+'&rxShipToOtherAddressID='+rxShipToOtherAddressID
				+ "&transaction=close" + '&rxContactID=' + contId
				+ "&customerInvoice_taxIdcuname=" + aTax + "&taxfreight="
				+ taxfreight;
		// +'&rxShiptoAddressID='+shipToAddressIDs+'&shipToMode='+shipToMode
		console.log("New==" + aCustomerInvoiceDetails);
		$('#invreasondialog').data('aCustomerInvoiceDetails',
				aCustomerInvoiceDetails);
		$('#invreasondialog').data('transaction', 'close');

		/*if (_globalold_cIlineitemform == "{}")
			_globalold_cIlineitemform = _globalold_cIlineitemform.replace('{}',
					'[]')
					+ $("#customerInvoice_invoiceDateID").val();*/
		var aInvoiceDetailsTotal = $("#custoemrInvoiceFormTotalID").serialize();
		var invoiceformdetails = CIGeneralTabSeriallize();

		/*
		 * if(_globalold_cIgeneralform != invoiceformdetails)
		 * {alert("first");console.log(_globalold_cIgeneralform
		 * +"===============!=============="+ invoiceformdetails)} else
		 * if(_globalold_cIlineitemform != dataToSend) {alert("second");} else
		 * if(_globalold_cIgeneralTotalform!=aInvoiceDetailsTotal)
		 * {alert("third");}
		 */
		
		
		if(_globalold_cIgeneralform != invoiceformdetails ){
				console.log("ERROR:::_globaloldcustomerInvoiceform=="+_globalold_cIgeneralform);
				console.log("ERROR:::_globalnewcustomerInvoiceform=="+invoiceformdetails);
		}
		if(_globalold_cIlineitemform != dataToSend){
			console.log("ERROR:::_globaloldcustomerInvoicegrid=="+_globalold_cIlineitemform);
			console.log("ERROR:::_invoiceGridDetails=="+dataToSend);
		}
		if(_globalold_cIgeneralTotalform != aInvoiceDetailsTotal){
			console.log("ERROR:::_globaloldcustomerInvoiceformTotal=="+_globalold_cIgeneralTotalform);
			console.log("ERROR:::_aInvoiceDetailsTotal=="+aInvoiceDetailsTotal);
		}

		if (_globalold_cIgeneralform != invoiceformdetails
				|| _globalold_cIlineitemform != (dataToSend)
				|| _globalold_cIgeneralTotalform != aInvoiceDetailsTotal) {
			

			var checkpermission = getGrantpermissionprivilage(
					'OpenPeriod_PostingOnly', 0);
			$
					.ajax({
						url : "./checkAccountingCyclePeriods",
						data : {
							"datetoCheck" : $('#customerInvoice_invoiceDateID')
									.val(),
							"UserStatus" : checkpermission
						},
						type : "POST",
						success : function(data) {
							if (data.cofiscalperiod != null
									&& typeof (data.cofiscalperiod.period) !== "undefined") {
								periodid = data.cofiscalperiod.coFiscalPeriodId;
								yearid = data.cofiscalperiod.coFiscalYearId;
								if (operation == 'closedialog') {
									var newDialogDiv = jQuery(document
											.createElement('div'));
									jQuery(newDialogDiv)
											.html(
													'<span><b style="color:Green;">You have made changes,would you like to save?</b></span>');
									jQuery(newDialogDiv)
											.dialog(
													{
														modal : true,
														width : 300,
														height : 150,
														title : "Success.",
														closeOnEscape : false,
														open : function(event,
																ui) {
															$(
																	".ui-dialog-titlebar-close")
																	.hide();
														},
														buttons : {
															"Yes" : function() {
																jQuery(this)
																		.dialog(
																				"close");
																transaction = "close";
																$(
																		'#invreasondialog')
																		.data(
																				'cofperiodid',
																				periodid);
																$(
																		'#invreasondialog')
																		.data(
																				'cofyearid',
																				yearid);
																jQuery(
																		"#invreasondialog")
																		.dialog(
																				"open");
																return false;
															},
															"No" : function() {
																document
																		.getElementById("CuInvoiceSaveID").disabled = false;
																document
																		.getElementById("CuInvoiceSaveCloseID").disabled = false;
																$(
																		'#CuInvoiceSaveID')
																		.css(
																				'background',
																				'-webkit-gradient(linear, left top, left bottom, from(#637c92), to(#3b4f60))');
																$(
																		'#CuInvoiceSaveCloseID')
																		.css(
																				'background',
																				'-webkit-gradient(linear, left top, left bottom, from(#637c92), to(#3b4f60))');
																$(
																		'#transactionID')
																		.val(
																				'add');
																jQuery(this)
																		.dialog(
																				"close");
																if (operation == 'closedialog') {
																	cancelcustomerinvoice();
																}

																return false;
															}
														}
													}).dialog("open");
								} else {
									transaction = "close";
									$('#invreasondialog').data('cofperiodid',
											periodid);
									$('#invreasondialog').data('cofyearid',
											yearid);
									jQuery("#invreasondialog").dialog("open");
								}
							} else {
								if (operation == 'closedialog') {
									cancelcustomerinvoice();
								} else {

									if (data.AuthStatus == "granted") {
										var newDialogDiv = jQuery(document
												.createElement('div'));
										jQuery(newDialogDiv)
												.html(
														'<span><b style="color:red;">Current Transcation Date is not under open period.</b></span>');
										jQuery(newDialogDiv).dialog({
											modal : true,
											width : 300,
											height : 150,
											title : "Information.",
											buttons : [ {
												text : "OK",
												click : function() {
													$(this).dialog("close");
												}
											} ]
										}).dialog("open");
									} else {
										showDeniedPopup();
									}
								}
							}
						},
						error : function(data) {
							console.log('error');
						}
					});
		} else {
			
			

			$('#showMessageCuInvoice').css("margin-left", "1666%");
			$('#showMessageCuInvoiceLine').css("margin-left", "1666%");
			$('#showMessageCuInvoice').html("Saved");
			$('#showMessageCuInvoiceLine').html("Saved");

			$('#imgInvoicePDF').empty();
			$('#imgInvoicePDF').append('<input type="image" src="./../resources/Icons/PDF_new.png" title="View CuInvoice" onclick="viewCuInvoicePDF(); return false;"	style="background: #EEDEBC;">');

			$('#imgInvoiceEmail').empty();
			$('#imgInvoiceEmail').append(' <input id="contactEmailID" type="image" src="./../resources/Icons/mail_new.png" title="Email Customer Invoice" style="background:#EEDEBC;" onclick="sendPOEmail(\'CuInvoice\');return false;">');

			
			document.getElementById("CuInvoiceSaveID").disabled = false;
			document.getElementById("CuInvoiceSaveCloseID").disabled = false;
			$('#CuInvoiceSaveID')
					.css('background',
							'-webkit-gradient(linear, left top, left bottom, from(#637c92), to(#3b4f60))');
			$('#CuInvoiceSaveCloseID')
					.css('background',
							'-webkit-gradient(linear, left top, left bottom, from(#637c92), to(#3b4f60))');

			setTimeout(function() {
				// alert('test');
				$('#showMessageCuInvoice').html("");
				$('#showMessageCuInvoiceLine').html("");
			}, 3000);
			if (operation == "closedialog") {
				document.location.href = "./createinvoice?oper=create";
			}

			return false;
		}
	} else {

		if (operation == "closedialog")
			transaction = "close";

		aCustomerInvoiceDetails = aCustomerInvoiceDetails + "&transaction="
				+ transaction;

		var add1 = $("#CI_Shipto").contents().find('#shipToName').val();
		var add2 = $("#CI_Shipto").contents().find('#shipToAddress1').val();
		var add3 = $("#CI_Shipto").contents().find('#shipToAddress2').val();
		var city = $("#CI_Shipto").contents().find('#shipToCity').val();
		var state = $("#CI_Shipto").contents().find('#shipToState').val();
		var zip = $("#CI_Shipto").contents().find('#shipToZip').val();
		var checkpermission = getGrantpermissionprivilage(
				'OpenPeriod_PostingOnly', 0);
		$
				.ajax({
					url : "./checkAccountingCyclePeriods",
					data : {
						"datetoCheck" : $('#customerInvoice_invoiceDateID')
								.val(),
						"UserStatus" : checkpermission
					},
					type : "POST",
					success : function(data) {

						if (data.cofiscalperiod != null
								&& typeof (data.cofiscalperiod.period) !== "undefined") {
							periodid = data.cofiscalperiod.coFiscalPeriodId;
							yearid = data.cofiscalperiod.coFiscalYearId;

							var rows = jQuery("#customerInvoice_lineitems")
									.getDataIDs();
							//edited by prasant for line item not deleted while creating a cuInvoice using SO i 3.0.70
							//cuInvOut_LineItemsToBeDeleted = new Array();
							for (var a = 0; a < rows.length; a++) {
								row = jQuery("#customerInvoice_lineitems")
										.getRowData(rows[a]);
								var id = "#canDoID_" + rows[a];
								var canDo = $(id).is(':checked');
								if (canDo) {

									var cuInvoiceDetailId = row['cuInvoiceDetailId'];
									if (cuInvoiceDetailId != undefined
											&& cuInvoiceDetailId != null
											&& cuInvoiceDetailId != ""
											&& cuInvoiceDetailId != 0) {
										cuInvOut_LineItemsToBeDeleted
												.push(cuInvoiceDetailId);
									}
									$('#customerInvoice_lineitems').jqGrid(
											'delRowData', rows[a]);
								}
							}
							var gridRows = $('#customerInvoice_lineitems')
									.getRowData();
							var dataToSend = JSON.stringify(gridRows);
						//	alert("aCustomerInvoiceDetails  1"+aCustomerInvoiceDetails);
							// &reason='
							$
									.ajax({
										url : "./jobtabs5/createCustomerInvoiceDetails?"
												+ aCustomerInvoiceDetails,
										type : "POST",
										data : {
											'thecustomerShipToAddressID' : add1,
											'thecustomerShipToAddressID1' : add2,
											'thecustomerShipToAddressID2' : add3,
											'thecustomerShipToCity' : city,
											'thecustomerShipToState' : state,
											'thecustomerShipToZipID' : zip,
											'coFiscalPeriodId' : periodid,
											'coFiscalYearId' : yearid,
											'gridData' : dataToSend,
											'delData' :cuInvOut_LineItemsToBeDeleted 
										},
										success : function(data) {
											createtpusage(
													'Company-Customer-Invoice',
													'Save Invoice', 'Info',
													'Company-Customer-Invoice,Saving Invoice,cuInvoiceID:'
															+ data.cuInvoiceId);
											if ("close" == operation) {
												$('#cuInvoiceID').text(
														data.cuInvoiceId);
												$('#cuinvoiceIDhidden').val(
														data.cuInvoiceId);
												$('#rxShipToOtherAddressID')
														.val(
																data.rxShipToAddressId);
												$('#ciOpenStatusID').val(
														data.cIopenStatus);
												$("#cusinvoicetab").tabs({
													disabled : false
												});

												var $tabs = $('#cusinvoicetab')
														.tabs();
												var selected = $tabs.tabs(
														'option', 'selected');
												
												loadCustomerInvoice("1");
												//PreloadDataFromInvoiceTable("1");
												
										
												PreloadDataFromInvoiceTable("1");
												
												$('#showMessageCuInvoice').css(
														"margin-left", "1666%");
												$('#showMessageCuInvoiceLine')
														.css("margin-left",
																"1666%");
												$('#showMessageCuInvoice')
														.html("Saved");
												$('#showMessageCuInvoiceLine')
														.html("Saved");
												$('#imgInvoicePDF').empty();
												$('#imgInvoicePDF').append('<input type="image" src="./../resources/Icons/PDF_new.png" title="View CuInvoice" onclick="viewCuInvoicePDF(); return false;"	style="background: #EEDEBC;">');

												$('#imgInvoiceEmail').empty();
												$('#imgInvoiceEmail').append(' <input id="contactEmailID" type="image" src="./../resources/Icons/mail_new.png" title="Email Customer Invoice" style="background:#EEDEBC;" onclick="sendPOEmail(\'CuInvoice\');return false;">');

												
												document
														.getElementById("CuInvoiceSaveID").disabled = false;
												document
														.getElementById("CuInvoiceSaveCloseID").disabled = false;
												$('#CuInvoiceSaveID')
														.css('background',
																'-webkit-gradient(linear, left top, left bottom, from(#637c92), to(#3b4f60))');
												$('#CuInvoiceSaveCloseID')
														.css('background',
																'-webkit-gradient(linear, left top, left bottom, from(#637c92), to(#3b4f60))');
												
										        	$('#loadingDivForCIGeneralTab').css({
														"display": "block"
													}); 
												setTimeout(
														function() {
															// updateTaxableLines();
															
															$(
																	'#showMessageCuInvoice')
																	.html("");
															$(
																	'#showMessageCuInvoiceLine')
																	.html("");
															_globalold_cIgeneralTotalform = $(
																	"#custoemrInvoiceFormTotalID")
																	.serialize();
															_globalold_cIgeneralform = CIGeneralTabSeriallize();
															var gridRows = $(
																	'#customerInvoice_lineitems')
																	.getRowData();
															_globalold_cIlineitemform = JSON
																	.stringify(gridRows)
																	+ $(
																			"#customerInvoice_invoiceDateID")
																			.val();
															 var checkwhichtabactive=$("#cICheckTab1").hasClass("ui-tabs-selected");
															if(checkwhichtabactive){
												        		sogeneralclick();
												        	}else{
												        		solineitemclick();
												        	}
															$('#loadingDivForCIGeneralTab').css({
																"display": "none"
															}); 
														}, 1000);
												

											}
											if ("closedialog" == operation) {
												document.location.href = "./createinvoice?oper=create";
											}
										}
									});
						} else {

							if (data.AuthStatus == "granted") {
								var newDialogDiv = jQuery(document
										.createElement('div'));
								jQuery(newDialogDiv)
										.html(
												'<span><b style="color:red;">Current Transcation Date is not under open period.</b></span>');
								jQuery(newDialogDiv).dialog({
									modal : true,
									width : 300,
									height : 150,
									title : "Information.",
									buttons : [ {
										text : "OK",
										click : function() {
											$(this).dialog("close");
										}
									} ]
								}).dialog("open");
							} else {
								showDeniedPopup();
							}
						}
					},
					error : function(data) {
						console.log('error');
					}
				});
	}
	setoverallcustomerinvoicetotal();
	$('#imgInvoicePDF').empty();
	$('#imgInvoicePDF').append('<input type="image" src="./../resources/Icons/PDF_new.png" title="View CuInvoice" onclick="viewCuInvoicePDF(); return false;"	style="background: #EEDEBC;">');

	$('#imgInvoiceEmail').empty();
	$('#imgInvoiceEmail').append(' <input id="contactEmailID" type="image" src="./../resources/Icons/mail_new.png" title="Email Customer Invoice" style="background:#EEDEBC;" onclick="sendPOEmail(\'CuInvoice\');return false;">');
	//BID1633 Simon
	 setTimeout(function(){
	 $("#CuInvoiceSaveID").prop('disabled', false);		
	 },3000);
}

function cancelcustomerinvoice() {
	jQuery("#cusinvoicetab").dialog("close");
	document.location.href = "./createinvoice?oper=create";
}

function updateTotals() {
	console.log("inside updateTotals");
	var cuInvoiceID = $('#cuinvoiceIDhidden').val();
	console.log("inside updateTotals-->Invoice Id-" + cuInvoiceID);
	$
			.ajax({
				url : "./salesOrderController/getPriceDetails",
				type : "POST",
				data : "cuInvoiceID=" + cuInvoiceID,
				success : function(data) {
					console.log("Values-->" + data.subtotal + "--"
							+ data.freight + "--" + data.taxTotal + "--"
							+ data.costTotal + "--");

					$('#customerInvoice_subTotalID').val(
							formatCurrency(data.subtotal));
					$('#customerInvoice_frightIDcu').val(
							formatCurrency(data.freight))
					$('#customerInvoice_taxIdcu').val(
							formatCurrency(data.taxTotal))
					$('#customerInvoice_totalID').val(
							formatCurrency(parseFloat(data.subtotal)
									+ parseFloat(data.freight)
									+ parseFloat(data.taxTotal)));

					// 2015-07-29
					// $('#customerInvoice_linesubTotalID').val(formatCurrency(data.subtotal))
					// 2015-07-29
					// $('#customerInvoice_linefrightID').val(formatCurrency(data.freight))
					// $('#customerInvoice_linetaxId').val(formatCurrency(data.taxRate))
					$('#cuGeneral_taxvalue').val(formatCurrency(data.taxTotal));
					// 2015-07-29
					// $('#customerInvoice_linetotalID').val(formatCurrency(parseFloat(data.subtotal)+parseFloat(data.freight)+parseFloat(data.taxTotal)));
				}
			});
	return;
}

function checkTaxTerryAftSaveInv() {
	console.log("checkTaxTerryAftSaveInv");
	$
			.ajax({
				url : "./salesOrderController/getSettingTaxTerritory",
				type : "POST",
				data : {
					"settingsTaxTerritory" : "DoNotAllowTaxTerritoryAfterSavingCustomerInvoice"
				},
				success : function(data) {

					if (data == 1)
						$('#customerInvoice_TaxTerritory').prop('readonly',
								true);
					else if (data == 0)
						$('#customerInvoice_TaxTerritory').prop('readonly',
								false);

				}
			});
	
	
}

function PreloadDataFromInvoiceTable(initialValue) {
	var cuInvoiceId = $('#cuinvoiceIDhidden').val();
	var rxMasterID = $('#rxCustomerID').val();
	cuinvoiceID = cuInvoiceId;

	if (cuinvoiceID > 0) {
		$('#imgInvoicePDF').empty();
		$('#imgInvoicePDF')
				.append(
						'<input type="image" src="./../resources/Icons/PDF_new.png" title="View CuInvoice" onclick="viewCuInvoicePDF(); return false;"	style="background: #EEDEBC;">');

		$('#imgInvoiceEmail').empty();
		$('#imgInvoiceEmail')
				.append(
						' <input id="contactEmailID" type="image" src="./../resources/Icons/mail_new.png" title="Email Customer Invoice" style="background:#EEDEBC;" onclick="sendPOEmail(\'CuInvoice\');return false;">');
		// checkTaxTerryAftSaveInv();

	} else {
		$('#imgInvoicePDF').empty();
		$('#imgInvoicePDF')
				.append(
						'<input type="image" src="./../resources/Icons/PDF_new_disabled.png" title="View CuInvoice" return false;" style="background: #EEDEBC;cursor:default;">');

		$('#imgInvoiceEmail').empty();
		$('#imgInvoiceEmail')
				.append(
						'<input id="contactEmailID" type="image" src="./../resources/Icons/mail_new_disabled.png" title="Email Customer Invoice" style="background: #EEDEBC;cursor:default;" return false;">');
	}
	setdivisionFromLogin();
	$
			.ajax({
				url : "./salesOrderController/getPreInvoiceData",
				type : "POST",
				data : "&cuInvoiceId=" + cuInvoiceId + "&rxMasterID="
						+ rxMasterID,
				success : function(data) {
					$("#customerInvoice_customerInvoiceID").val(
							data.CustomerName);
					$("#customerInvoice_linecustomerInvoiceID").val(
							data.CustomerName);
					if (typeof (data.cuInvoice) != "undefined"
							&& data.cuInvoice != null) {
						$("#customerInvoice_invoiceNumberId").val(
								data.cuInvoice.invoiceNumber);

						console.log(data.cuInvoice.rxContactId
								+ "------*******>"
								+ data.cuInvoice.invoiceNumber);

						// alert('Date::'+data.emailTimestamp);
						$("#mailTimestampLines").empty();
						$("#mailTimestampLines").append(data.emailTimestamp)
						$("#mailTimestampLines").show();
						$("#mailTimestampGeneral").empty();
						$("#mailTimestampGeneral").append(data.emailTimestamp)
						$("#mailTimestampGeneral").show();
						$('#cuinvoiceIDhidden').val(data.cuInvoice.cuInvoiceId);
						$('#customerInvoice_subTotalID').val(formatCurrency(0));
						$('#customerInvoice_totalID').val(formatCurrency(0));
						$('#customerinvoicepaymentId').val(
								data.cuInvoice.cuTermsId);
						$('#customerInvoice_proNumberID').val(
								data.cuInvoice.trackingNumber);
						$('#customerInvoie_PONoID').val(
								data.cuInvoice.customerPonumber);
						$('#tagJobID').val(data.cuInvoice.tag);
						$('#customerInvoice_frightIDcu').val(
								formatCurrency(data.cuInvoice.freight));
						$('#customerInvoice_linefrightID').val(
								formatCurrency(data.cuInvoice.freight));
						$('#prWareHouseSelectID').val(
								data.cuInvoice.prFromWarehouseId);
						$('#prWareHouseSelectlineID').val(
								data.cuInvoice.prToWarehouseId);

						$('#shipViaCustomerSelectlineID').val(
								data.cuInvoice.veShipViaId);
						$('#shipViaCustomerSelectID').val(
								data.cuInvoice.veShipViaId);
						$('#customer_Divisions').val(
								data.cuInvoice.coDivisionId);
						$('#customerinvoice_paymentTerms').val(data.cuTerms);
						$('#customerInvoice_salesRepsList').val(data.SalesMan);
						$('#customerInvoice_CSRList').val(data.AE);
						$('#customerInvoice_SalesMgrList').val(data.Submitting);
						$('#customerInvoice_EngineersList').val(data.Costing);
						$('#customerInvoice_PrjMgrList').val(data.Ordering);
						$('#customerInvoice_taxIdcu').val(
								formatCurrency(data.cuInvoice.taxAmount)); // taxTotal
																			// change
																			// to
																			// taxAmount
						$('#cuGeneral_taxvalue').val(
								formatCurrency(data.cuInvoice.taxAmount)); // taxTotal
																			// change
																			// to
																			// taxAmount
						$('#customerInvoice_lineproNumberID').val(
								data.cuInvoice.trackingNumber);
						$('#customerInvoice_lineinvoiceNumberId').val(
								data.cuInvoice.sonumber);
						$('#customerInvoice_linetaxId').val(
								data.cuInvoice.taxRate);
						$('#customerInvoice_generaltaxId').val(
								data.cuInvoice.taxRate);
						// $('#cuGeneral_taxvalue').val(formatCurrency(data.cuInvoice.taxTotal));
						// $('#customerInvoice_taxIdcu').val(formatCurrency(data.cuInvoice.taxTotal));

						$('#customerInvoice_lineproNumberID').val(
								data.cuInvoice.trackingNumber);
						$('#customerInvoice_lineinvoiceNumberId').val(
								data.cuInvoice.invoiceNumber);
						$('#customerbillToAddressIDcuInvoice').val(
								data.CustomerName);

						$('#customerInvoice_salesRepId').val(
								data.cuInvoice.cuAssignmentId0);
						$('#customerInvoice_CSRId').val(
								data.cuInvoice.cuAssignmentId1);
						$('#customerInvoice_salesMgrId').val(
								data.cuInvoice.cuAssignmentId2);
						$('#customerInvoice_engineerId').val(
								data.cuInvoice.cuAssignmentId3);
						$('#customerInvoice_prjMgrId').val(
								data.cuInvoice.cuAssignmentId4);
						$('#customerTaxTerritory').val(
								data.cuInvoice.coTaxTerritoryId);

						//alert(data.cuInvoice.jobnoDescription);
						$('#jobnodescription').val(
								data.cuInvoice.jobnoDescription);

						$('#rxCustomerID').val(data.cuInvoice.rxCustomerId);
						// loadEmailList($("#rxCustomerID").val());

						$('#rxShipToID').val(data.cuInvoice.rxShipToId);
						console.log('Other Shipto ID:'
								+ data.cuInvoice.rxShipToAddressId);
						$('#rxShipToOtherAddressID').val(
								data.cuInvoice.rxShipToAddressId);
						$("#prShiptowarehouseID").val(
								data.cuInvoice.rxShipToAddressId);
						warehouse = data.wareHouse;
						/*
						 * Commented by velmurugan Ship to Implementation new
						 * Code 20-10-2015
						 */
						addressToShipCustomerInvoice();

						/*
						 * if(data.cuInvoice.shipToMode === 0)
						 * usinvoiceShiptoAddress(data.cuInvoice.cuInvoiceId,'cuinvoice');
						 * else if(data.cuInvoice.shipToMode === 1)
						 * customerinvoiceShiptoAddress(); else
						 * if(data.cuInvoice.shipToMode === 3)
						 * otherinvoiceShiptoAddress(); else
						 * if(data.cuInvoice.shipToMode === 2)
						 * jobsiteinvoiceShiptoAddress(data.cuInvoice.joReleaseDetailId,'cuinvoice');
						 * else customerinvoiceShiptoAddress();
						 */
						/* New Code Implementation */
						/* New Customer Invoice Ship To Code Starts */
						if (data.joMaster != undefined && data.joMaster != null) {
							GLB_joMasterID = data.joMaster.joMasterId;
						} else {
							$("#shiptoaddradio3").button({
								disabled : true
							});
							$('#shiptoaddlabel3').attr('onclick', '').unbind(
									'click');
						}

						loadCustomerAddress(data.cuInvoice.rxCustomerId);
						//alert("is calling");
						loadCUInvoice_ShipTO("#CI_Shipto",data.cuInvoice.cuInvoiceId);
						/* Code Ends */

						if (data.cuInvoice.doNotMail === 0)
							$('#customerInvoie_doNotMailID').prop('checked',
									false);
						else
							$('#customerInvoie_doNotMailID').prop('checked',
									true);
						// var createdDate = data.cuInvoice.createdOn;
						var createdDate = data.cuInvoice.invoiceDate;
						if (typeof (createdDate) != 'undefined')
							FormatDate(createdDate);
						var shipDate = data.cuInvoice.shipDate;
						if (typeof (shipDate) != 'undefined')
							FormatShipDate(shipDate);
						var dueDate = data.cuInvoice.dueDate;
						if (typeof (dueDate) != 'undefined')
							FormatDueDate(dueDate);
						if (typeof (data.Cuinvoicedetail) != "undefined"
								&& data.Cuinvoicedetail != null) {
							/*
							 * $('#customerInvoice_subTotalIDLine').val(formatCurrency(data.Cusodetail.taxTotal));
							 * $('#customerInvoice_totalIDLine').val(formatCurrency(data.Cusodetail.taxTotal));
							 * formatTotal(data.Cuso.freight,data.Cusodetail.taxTotal);
							 */
							var selectedRowId = $("#CustomerInvoiceGrid")
									.jqGrid('getGridParam', 'selrow');
							var joReleasedetailID = $("#CustomerInvoiceGrid")
									.jqGrid('getCell', selectedRowId,
											'joReleaseDetailId');

							if (joReleasedetailID != null
									&& joReleasedetailID != ""
									&& joReleasedetailID > 0) {
								$('#customerInvoice_subTotalID')
										.val(
												formatCurrency(data.cuInvoice.subtotal));
								$('#customerInvoice_totalID').val(
										formatCurrency(data.cuInvoice.subtotal
												+ data.cuInvoice.taxAmount
												+ data.cuInvoice.freight));
								// 2015-07-29
								// $('#customerInvoice_linesubTotalID').val(formatCurrency(data.cuInvoice.subtotal));
								// 2015-07-29
								// $('#customerInvoice_linetotalID').val(formatCurrency(data.cuInvoice.subtotal+data.cuInvoice.taxAmount+data.cuInvoice.freight));
							} else {
								$('#customerInvoice_subTotalID')
										.val(
												formatCurrency(data.cuInvoice.subtotal));
								$('#customerInvoice_totalID').val(
										formatCurrency(data.cuInvoice.subtotal
												+ data.cuInvoice.taxAmount
												+ data.cuInvoice.freight));
								// 2015-07-29
								// $('#customerInvoice_linesubTotalID').val(formatCurrency(data.cuInvoice.subtotal));
								// 2015-07-29
								// $('#customerInvoice_linetotalID').val(formatCurrency(data.cuInvoice.subtotal+data.cuInvoice.taxAmount+data.cuInvoice.freight));

							}
						} else {
							$('#customerInvoice_subTotalID').val(
									formatCurrency(0));
							$('#customerInvoice_totalID')
									.val(formatCurrency(0));
							// 2015-07-29
							// $('#customerInvoice_linesubTotalID').val(formatCurrency(0));
							// 2015-07-29
							// $('#customerInvoice_linetotalID').val(formatCurrency(0));
						}
						formattax();
						loadTaxTerritoryRate(data.cuInvoice.coTaxTerritoryId);
						$(
								"#customer_Divisions option[value="
										+ data.cuInvoice.coDivisionId + "]")
								.attr("selected", true);
						loadCustomerInvoice(initialValue);

						if (typeof (data.cuInvoice.rxContactId) != "undefined") {
							$(
									"#emailListCU option[value='"
											+ data.cuInvoice.rxContactId + "']")
									.attr("selected", true);
						}
					} else {
						warehouse = data.wareHouse;
						$('#customerInvoice_customerInvoiceID').prop(
								'readonly', false);
						$('#customerShipToAddressID').prop('disabled', false);
						FormatDate(data.date);
						FormatShipDate(data.shipdate);
						FormatDueDate(data.date);
						$('#customerInvoice_subTotalID').val(formatCurrency(0));
						$('#customerInvoice_totalID').val(formatCurrency(0));
						// 2015-07-29
						// $('#customerInvoice_linesubTotalID').val(formatCurrency(0));
						// 2015-07-29
						// $('#customerInvoice_linetotalID').val(formatCurrency(0));

						$("#prWareHouseSelectID").prop("selectedIndex", 1);
						$("#prWareHouseSelectlineID").prop("selectedIndex", 1);

					}
					var flag = 0;
					var duplicate = 0;
					var commissionDate = '';
					var invoicePaidDate = '';
					var commissionPaid = "\n";
					var joReleaseDetailID = 0;
					var cuInvoiceID = 0;
					var commPaidArray = [];
					var commPaidDetail = [];
					joReleaseDetailID = 0;
					if( data.cuInvoice != undefined &&  data.cuInvoice != null)
						{
					cuInvoiceID = data.cuInvoice.cuInvoiceId;
						}
					$
							.ajax({
								url : "./jobtabs5/getCommissionPaidDetails",
								type : "POST",
								data : {
									"joReleaseDetailID" : joReleaseDetailID,
									"joCuInvoiceID" : cuInvoiceID
								},
								success : function(data) {
									/*
									 * $.each(data, function(index, value){
									 * console.log('EcStatementID:'+value.ecStatementId);
									 * if(value.ecStatementId!=null){ flag=1;
									 * $('#paidCommissionID').css('display','block');
									 * commPaidArray.push({repsName:
									 * value.repName}); commissionDate =
									 * value.calculatedDate; } }); /* for(var
									 * i=0;i<commPaidArray.length;i++) {
									 * for(var j=0;j<commPaidArray.length;j++) {
									 * if(commPaidArray[i].repsName===commPaidArray[j].repsName){
									 * commissionPaid=commissionPaid+commPaidArray[i].repsName+"<br/>";
									 * }else{
									 * commissionPaid=commissionPaid+commPaidArray[i].repsName+"<br/>"; } } }
									 */
									if (data.indexOf("#") == -1) {
										if (data == 'YY') {
											$('#commissionMsg')
													.text(
															"Invoice has a balance due.");
											$('#paidCommissionID').css(
													'display', 'block');
										}
										if (data == 'NN') {
											$('#commissionMsg')
													.text(
															"Invoice has no open balance.");
											$('#paidCommissionID').css(
													'display', 'block');
											$('#commissionLabel').text(
													'Commission Pending');
										}
										if (data.indexOf('CP') > -1) {
											$('#commissionMsg').text(
													"Commissions Paid");
											$('#paidCommissionID').css(
													'display', 'block');
											$('#commissionLabel').text(
													'CommissionPaid');
										}
										if (data == 'CPN') {
											$('#commissionMsg')
													.text(
															"Commissions have not been paid.");
											$('#paidCommissionID').css(
													'display', 'block');
											$('#commissionLabel').text(
													'CommissionNotPaid');
										}
									}
									if (data.indexOf("#") > -1) {
										commPaidArray = data.split('#');
										for (var i = 0; i < commPaidArray.length; i++) {
											if (commPaidArray[i].indexOf('-') > -1) {
												$('#commissionLabel').text(
														'CommissionPaid');
												$('#commissionMsg').text(
														commPaidArray[i]);
											}
											if (commPaidArray[i].indexOf('PN') > -1) {
												$('#paidCommissionID').css(
														'display', 'block');
												$('#commissionLabel').text(
														'Commission Pending');
												$('#commissionMsg')
														.text(
																"Commissions have not been paid.");
											}
											if (commPaidArray[i].indexOf('@') > -1) {
												commPaidDetail = commPaidArray[i]
														.split('@');
												for (var j = 0; j < commPaidDetail.length; j++) {
													if (commPaidDetail[j]
															.indexOf('CP') > -1) {
														$('#paidCommissionID')
																.css('display',
																		'block');
														$('#commissionLabel')
																.text(
																		'CommissionPaid');
														$('#commissionMsg')
																.text(
																		"Commissions paid as of :");
													}
													if (commPaidDetail[j]
															.indexOf('-') > -1) {
														$('#commissionPaidDate')
																.text(
																		formatDatez(commPaidDetail[j]));
													}
													$('#commissionPaidLabel')
															.text(
																	'Commission Paid to:'
																			+ (commPaidDetail[commPaidDetail.length - 1]));
												}

											}
											// $('#commissionMsg').text("Commissions
											// have not been paid.");
											// $('#commissionPaidLabel').text('Commission
											// Paid to:');
											// $('#commissionPaidDate').text(commissionDate);
											$('#commissionPaid').html(
													commissionPaid);
										}
									}
								}
							});

					var rowid = $("#CustomerInvoiceGrid").jqGrid(
							'getGridParam', 'selrow');
					var chkno = $("#CustomerInvoiceGrid").jqGrid('getCell',
							rowid, 'chkNo');
					var dpaid = $("#CustomerInvoiceGrid").jqGrid('getCell',
							rowid, 'datePaid');

					if (dpaid != null && dpaid != false && dpaid.trim() != "") {
						$('#invoicePaidLabel').text('Invoice Paid as of :');
						$('#invoicePaidDate').text(dpaid);
						$('#dollarImage')
								.html(
										'<img alt="search" src="./../resources/Icons/dollar.png">');
						$('#paymentDate').text(dpaid + ' (Invoice Paid)');
					}

					if ((chkno != null && chkno != '') && chkno != '$$') {
						$('#checkRefs').css('display', 'inline');
						$('#checkRefs').text('Check#' + chkno + ' ');
					}

					/*
					 * alert(chkno+"==="+dpaid); $.ajax({ url:
					 * "./jobtabs5/getOutsieJobInvoicePaymentDate", type:
					 * "POST", data : {"cuInvoiceID":
					 * data.cuInvoice.cuInvoiceId}, success: function(data) {
					 * 
					 * if(data!="") {
					 *  }
					 *  } });
					 */

					/*
					 * $.ajax({ url: "./jobtabs5/getInvoiceCheckNos", type:
					 * "POST", data : {"cuInvoiceID":
					 * data.cuInvoice.cuInvoiceId}, success: function(data) {
					 * //alert('checkno'+data); if((data!=null && data!='') &&
					 * data!='$$'){ $('#checkRefs').css('display','inline');
					 * $('#checkRefs').text('Check#'+ data+' '); } } });
					 */

					/*
					 * if(initialValue=="0") {
					 */
					
					if(data.cuInvoice != undefined && data.cuInvoice !=null)
						{
					setTimeout(function() {
						$('#CI_taxfreight').val(data.cuInvoice.taxfreight);
						setTaxTotal_CI();
					}, 1000);
						}
					 $('#loadingDivForCIGeneralTab').css({
							"display": "block"
						}); 
					setTimeout(function() {
						var gridRows = $('#customerInvoice_lineitems').getRowData();
						_globalold_cIgeneralTotalform = $(
								"#custoemrInvoiceFormTotalID").serialize();
						_globalold_cIgeneralform = CIGeneralTabSeriallize();
						_globalold_cIlineitemform = JSON.stringify(gridRows)+ $("#customerInvoice_invoiceDateID").val();
						var $tabs = $('#cusinvoicetab').tabs();
						var selectedTab = $tabs.tabs('option', 'selected');
						if (selectedTab != '') {
							$('#cusinvoicetab').tabs({
								active : selectedTab
							});
							$('#cusinvoicetab').tabs({
								selected : selectedTab
							});
							
						} else {
							$('#cusinvoicetab').tabs({
								active : 0
							});
							$('#cusinvoicetab').tabs({
								selected : 0
							});
							
						}
						/*$('#cusinvoicetab').tabs({
							selected : selectedTab
						});
						$('#cusinvoicetab').tabs({
							active : selectedTab
						});*/
						
						 $('#loadingDivForCIGeneralTab').css({
								"display": "none"
							}); 
					}, 1000);
					/* } */

				}
			});

	

	$('#lineshipTo1').hide();
	$("#cusinvoicetab").dialog({
		open : function(event, ui) {
			var cuInvoice = $('#cuinvoiceIDhidden').val();
			loadshiptostateautocmpte("#CI_Shipto");
			if (cuInvoice == '') {
				$("#cusinvoicetab").tabs({
					disabled : [ 1 ]
				});
			} else {
				$("#cusinvoicetab").tabs({
					disabled : false
				});
			}
		},
		height : 1000,
		title : 'New Customer Invoice',
		closeOnEscape : false,
		resizable : false,
		close :function(){
			$("#customerInvoice_lineitems").jqGrid('GridUnload');
			return false;
		}
			
	});
	
	jQuery("#cusinvoicetab").dialog({
		width : 900,
		height : 1000
	});
	jQuery("#cusinvoicetab").dialog("open");
	$("#CuInvoiceSaveID").css("display", "block");
	$("#CuInvoiceSaveCloseID").css("display", "block");
	$("#CuInvoiceCancel").css("display", "none");
	$("#CuInvoiceLineSaveID").css("display", "block");
	$("#CuInvoiceLineSaveCloseID").css("display", "block");
	$("#createRebuildButton").css("display", "block");

}

function showPaidCommissions() {
	jQuery("#openPaidCommissionDialog").dialog({
		title : "Paid Commissions Details"
	});
	jQuery("#openPaidCommissionDialog").dialog("open");
}

function formatDatez(createdDate) {
	/* 2003-02-18 00:00:00.0 ----------- YYYY-mm-dd */
	if (createdDate === "") {
		return "";
	}
	var arr1 = createdDate.split(" ");
	var arr2 = arr1[0].split("-");
	var newDate = arr2[1] + "/" + arr2[2] + "/" + arr2[0];
	return newDate;
}

function creditRebuild() {

	$("#CuInvoiceSaveCloseIDRebuild").css("display", "block");
	var cuInvoiceId = $('#cuinvoiceIDhidden').val();
	var rxMasterID = $('#rxCustomerID').val();
	cuinvoiceID = cuInvoiceId;
	$
			.ajax({
				url : "./salesOrderController/getPreInvoiceData",
				type : "POST",
				data : "&cuInvoiceId=" + cuInvoiceId + "&rxMasterID="
						+ rxMasterID,
				success : function(data) {
					$("#customerInvoice_customerInvoiceIDRebuild").val(
							data.CustomerName);
					$("#customerInvoice_linecustomerInvoiceIDRebuild").val(
							data.CustomerName);
					if (typeof (data.cuInvoice) != "undefined"
							&& data.cuInvoice != null) {
						$("#customerInvoice_invoiceNumberIdRebuild").val(
								data.cuInvoice.invoiceNumber);
						$('#cuinvoiceIDhiddenRebuild').val(
								data.cuInvoice.cuInvoiceId);
						$('#customerInvoice_subTotalIDRebuild').val(
								formatCurrency(0));
						$('#customerInvoice_totalIDRebuild').val(
								formatCurrency(0));
						$('#customerinvoicepaymentIdRebuild').val(
								data.cuInvoice.cuTermsId);
						$('#customerInvoice_proNumberIDRebuild').val(
								data.cuInvoice.trackingNumber);
						$('#customerInvoie_PONoIDRebuild').val(
								data.cuInvoice.customerPonumber);
						$('#tagJobIDRebuild').val(data.cuInvoice.tag);
						$('#customerInvoice_frightIDcuRebuild').val(
								formatCurrency(data.cuInvoice.freight));
						$('#customerInvoice_linefrightIDRebuild').val(
								formatCurrency(data.cuInvoice.freight));
						$('#prWareHouseSelectIDRebuild').val(
								data.cuInvoice.prFromWarehouseId);
						$('#prWareHouseSelectlineIDRebuild').val(
								data.cuInvoice.prFromWarehouseId);

						$('#shipViaCustomerSelectlineIDRebuild').val(
								data.cuInvoice.veShipViaId);
						$('#shipViaCustomerSelectIDRebuild').val(
								data.cuInvoice.veShipViaId);
						$('#customer_DivisionsRebuild').val(
								data.cuInvoice.coDivisionId);
						$('#customerinvoice_paymentTermsRebuild').val(
								data.cuTerms);
						$('#customerInvoice_salesRepsListRebuild').val(
								data.SalesMan);
						$('#customerInvoice_CSRListRebuild').val(data.AE);
						$('#customerInvoice_SalesMgrListRebuild').val(
								data.Submitting);
						$('#customerInvoice_EngineersListRebuild').val(
								data.Costing);
						$('#customerInvoice_PrjMgrListRebuild').val(
								data.Ordering);
						$('#customerInvoice_taxIdcuRebuild').val(
								formatCurrency(data.cuInvoice.taxAmount));
						$('#cuGeneral_taxvalueRebuild').val(
								formatCurrency(data.cuInvoice.taxAmount));
						$('#customerInvoice_lineproNumberIDRebuild').val(
								data.cuInvoice.trackingNumber);
						$('#customerInvoice_lineinvoiceNumberIdRebuild').val(
								data.cuInvoice.sonumber);
						$('#customerInvoice_linetaxIdRebuild').val(
								data.cuInvoice.taxRate);
						$('#customerInvoice_generaltaxIdRebuild').val(
								data.cuInvoice.taxRate);

						$('#customerInvoice_lineproNumberIDRebuild').val(
								data.cuInvoice.trackingNumber);
						$('#customerInvoice_lineinvoiceNumberIdRebuild').val(
								data.cuInvoice.invoiceNumber);
						$('#customerbillToAddressIDcuInvoiceRebuild').val(
								data.CustomerName);
						$('#customerInvoice_salesRepIdRebuild').val(
								data.cuInvoice.cuAssignmentId0);
						$('#customerInvoice_CSRIdRebuild').val(
								data.cuInvoice.cuAssignmentId1);
						$('#customerInvoice_salesMgrIdRebuild').val(
								data.cuInvoice.cuAssignmentId2);
						$('#customerInvoice_engineerIdRebuild').val(
								data.cuInvoice.cuAssignmentId3);
						$('#customerInvoice_prjMgrIdRebuild').val(
								data.cuInvoice.cuAssignmentId4);
						$('#customerTaxTerritoryRebuild').val(
								data.cuInvoice.coTaxTerritoryId);

						$('#rxCustomerID').val(data.cuInvoice.rxCustomerId);
						loadEmailList($("#rxCustomerID").val());
						$('#rxShipToIDRebuild').val(data.cuInvoice.rxShipToId);
						$('#rxShipToOtherAddressIDRebuild').val(
								data.cuInvoice.rxShipToAddressId);
						warehouse = data.wareHouse;
						addressToShipCustomerInvoice();
						if (data.cuInvoice.shipToMode === 0) {
							usinvoiceShiptoAddress(data.cuInvoice.cuInvoiceId,
									'cuinvoice');
						} else if (data.cuInvoice.shipToMode === 1) {
							customerinvoiceShiptoAddress();
						} else if (data.cuInvoice.shipToMode === 3) {
							$('#rxShipToOtherAddressID').val(
									data.cuInvoice.rxShipToAddressId);
							otherinvoiceShiptoAddress();
						} else if (data.cuInvoice.shipToMode === 2) {
							jobsiteinvoiceShiptoAddress(
									data.cuInvoice.joReleaseDetailId,
									'cuinvoice');
						} else {
							customerinvoiceShiptoAddress();
						}

						if (data.cuInvoice.doNotMail === 0)
							$('#customerInvoie_doNotMailID').prop('checked',
									false);
						else
							$('#customerInvoie_doNotMailID').prop('checked',
									true);
						var createdDate = data.cuInvoice.createdOn;
						if (typeof (createdDate) != 'undefined')
							FormatDate(createdDate);
						var shipDate = data.cuInvoice.shipDate;
						if (typeof (shipDate) != 'undefined')
							FormatShipDate(shipDate);
						var dueDate = data.cuInvoice.dueDate;
						if (typeof (dueDate) != 'undefined')
							FormatDueDate(dueDate);
						if (typeof (data.Cuinvoicedetail) != "undefined"
								&& data.Cuinvoicedetail != null) {
							/*
							 * $('#customerInvoice_subTotalIDLine').val(formatCurrency(data.Cusodetail.taxTotal));
							 * $('#customerInvoice_totalIDLine').val(formatCurrency(data.Cusodetail.taxTotal));
							 * formatTotal(data.Cuso.freight,data.Cusodetail.taxTotal);
							 */
							$('#customerInvoice_subTotalIDRebuild')
									.val(
											formatCurrency(data.Cuinvoicedetail.taxTotal));
							$('#customerInvoice_totalIDRebuild')
									.val(
											formatCurrency(data.Cuinvoicedetail.taxTotal
													+ data.cuInvoice.taxAmount
													+ data.cuInvoice.freight));
							$('#customerInvoice_linesubTotalIDRebuild')
									.val(
											formatCurrency(data.Cuinvoicedetail.taxTotal));
							$('#customerInvoice_linetotalIDRebuild')
									.val(
											formatCurrency(data.Cuinvoicedetail.taxTotal
													+ data.cuInvoice.taxAmount
													+ data.cuInvoice.freight));
						} else {
							$('#customerInvoice_subTotalIDRebuild').val(
									formatCurrency(0));
							$('#customerInvoice_totalIDRebuild').val(
									formatCurrency(0));
							$('#customerInvoice_linesubTotalIDRebuild').val(
									formatCurrency(0));
							$('#customerInvoice_linetotalIDRebuild').val(
									formatCurrency(0));
						}
						formattax();
						loadTaxTerritoryRate(data.cuInvoice.coTaxTerritoryId);
						$(
								"#customer_Divisions option[value="
										+ data.cuInvoice.coDivisionId + "]")
								.attr("selected", true);
						loadLineItemsRebuild();
					} else {
						warehouse = data.wareHouse;
						$('#customerInvoice_customerInvoiceIDRebuild').prop(
								'readonly', false);
						$('#customerShipToAddressIDRebuild').prop('disabled',
								false);
						FormatDate(data.date);
						FormatShipDate(data.shipdate);
						FormatDueDate(data.duedate);
						$('#customerInvoice_subTotalIDRebuild').val(
								formatCurrency(0));
						$('#customerInvoice_totalIDRebuild').val(
								formatCurrency(0));
						$('#customerInvoice_linesubTotalIDRebuild').val(
								formatCurrency(0));
						$('#customerInvoice_linetotalIDRebuild').val(
								formatCurrency(0));

					}

				}
			});

	$("#lineshipToRebuild").show();
	$("#lineshipTo1Rebuild").hide();
	$('#forWardIdRebuild').css({
		"display" : "none"
	});
	$('#backWardIdRebuild').css({
		"display" : "none"
	});
	$('#customerforWardIdRebuild').css({
		"display" : "none"
	});
	$('#customerbackWardIdRebuild').css({
		"display" : "none"
	});
	$("#creditRebuild").dialog({
		open : function(event, ui) {
			var cuInvoice = $('#cuinvoiceIDhidden').val();
		},
		height : 825,
		width : 880,
		title : 'Create Rebuild'
	});
}

function formattax() {
	var subTotal = $('#customerInvoice_subTotalID').val();
	subTotal = parseFloat(subTotal.replace(/[^0-9\-.]/g, ''));
	var tax = $('#customerInvoice_taxIdcu').val();
	tax = parseFloat(tax.replace(/[^0-9\-.]/g, ''));
	var frieght = $('#customerInvoice_frightIDcu').val();
	frieght = parseFloat(frieght.replace(/[^0-9\-.]/g, ''));
	var total = subTotal + tax + frieght;
	$('#customerInvoice_totalID').val(formatCurrency(total));
}

$('#cusinvoicetab').bind('dialogclose', function(event) {

	document.location.href = "./createinvoice?oper=create";
});

function checkInvoiceNumber(sonumber) {

	console.log("SoNumber--->" + sonumber);
	var sInvoiceNo;
	$.ajax({
		url : "./salesOrderController/checkInvoiceNumber",
		type : "POST",
		data : "sonumber=" + sonumber,
		success : function(data) {
			console.log("Check--" + data);
			var sp;
			if (data === '') {
				sInvoiceNo = sonumber;
			} else if (data.toLowerCase().indexOf("-") >= 0) {
				sp = data.split("-");
				console.log("Array---" + sp);
				var no = parseInt(sp[1]);
				no = no + 1;
				sInvoiceNo = sp[0] + "-" + no;

			} else {
				sInvoiceNo = data + "-1";
			}
			$('#customerInvoice_invoiceNumberId').val(sInvoiceNo);
		}
	});
	return;
}

function viewCuInvoicePDF() {
	var CuInvoice = $('#cuinvoiceIDhidden').val();
	if (CuInvoice != '' && CuInvoice != undefined) {
		window.open("./salesOrderController/printCuInvoiceReport?CuInvoice="
				+ CuInvoice);
		$.ajax({
			url : "./jobtabs5/addInvoiceLog",
			type : "POST",
			data : {
				'cuInvoiceID' : CuInvoice,
				'action' : 2
			},
			success : function(data) {
				// action = 1 view action=2 pdf view action=3 mail sent
			}
		});
	} else {
		/*
		 * var newDialogDiv = jQuery(document.createElement('div'));
		 * jQuery(newDialogDiv).html('<span><b style="color:Green;">Please
		 * Save Customer Invoice.</b></span>');
		 * jQuery(newDialogDiv).dialog({modal: true, width:300, height:150,
		 * title:"Success.", buttons: [{height:35,text: "OK",click: function() {
		 * $(this).dialog("close"); }}]}).dialog("open");
		 */
		$('#showMessageCuInvoice').html("Please Save Customer Invoice.");
		$('#showMessageCuInvoiceLine').html("Please Save Customer Invoice.");

		setTimeout(function() {
			$('#showMessageCuInvoice').html("");
			$('#showMessageCuInvoiceLine').html("");
		}, 3000);
	}

	return false;
}

function saveCuInvoicePDF(arxContactid, aEmail, poGeneralKey, cusotmerPONumber,
		numberof) {

	// alert("hi Da");
	var newDialogDiv = jQuery(document.createElement('div'));
	var CuInvoice = $('#cuinvoiceIDhidden').val();
	if (CuInvoice != '' && CuInvoice != undefined) {
		$.ajax({
			url : "./salesOrderController/saveCustomerInvoiceReport",
			mType : "GET",
			data : {
				'CuInvoice' : CuInvoice
			},
			success : function(data) {
				jQuery(newDialogDiv).dialog("close");
				sendsubmitMailFunction8(arxContactid, aEmail, poGeneralKey,
						cusotmerPONumber, numberof);
			}
		});
	}

	return true;
}

function sendsubmitMailFunction8(arxContactid, aEmail, poGeneralKey,
		cusotmerPONumber1, numberof) {
	var vePoId = numberof;
	var cusotmerPONumber = cusotmerPONumber1;
	var aContactID = arxContactid;
	var toemailAddress = $("#etoaddr").val();
	var ccaddress = $("#eccaddr").val();
	var subject = $("#esubj").val();
	var filename = "CustomerInvoice.pdf";
	var content = $("#econt").val();
	content = $('#emailpopup').find('.nicEdit-main').html();
	// content=nicEditors.findEditor('econt').getContent();
	var status = "";
	var newDialogDiv = jQuery(document.createElement('div'));
	$
			.ajax({
				url : "./sendMailServer/sendCustomerInvoiceMail",
				mType : "POST",
				data : {
					'contactID' : aContactID,
					'PONumber' : cusotmerPONumber,
					'toAddress' : toemailAddress,
					'subject' : subject,
					'filename' : filename,
					'ccaddress' : ccaddress,
					'content' : content
				},
				success : function(data) {
					// $('#loadingPOGenDiv').css({"visibility": "hidden"});
					// $('#loadingPODiv').css({"visibility": "hidden"});
					var errorText = "<b style='color:Red; align:right;'>Mail Sending Failed.</b>";
					var actionStatus = 4;
					if (data) {
						$.ajax({
							url : "./updateEmailStampValue",
							mType : "GET",
							data : {
								'type' : 'cuInvoice',
								'processID' : numberof
							},
							success : function(data) {
								$("#mailTimestampLines").show();
								$("#mailTimestampGeneral").show();
								$("#mailTimestampLines").empty();
								$("#mailTimestampLines").append(data);
								$("#mailTimestampGeneral").empty();
								$("#mailTimestampGeneral").append(data);
							}
						});
						errorText = "<b style='color:Green; align:right;'>Mail sent successfully.</b>";
						actionStatus = 3;
					}
					$.ajax({
						url : "./jobtabs5/addInvoiceLog",
						type : "POST",
						data : {
							'cuInvoiceID' : numberof,
							'action' : actionStatus
						},
						success : function(data) {
							// action = 1 view action=2 pdf view action=3 mail
							// sent
						}
					});
					jQuery(newDialogDiv).html('<span>' + errorText + '</span>');
					jQuery(newDialogDiv).dialog({
						modal : true,
						width : 300,
						height : 150,
						title : "Message",
						buttons : [ {
							height : 35,
							text : "OK",
							click : function() {
								console.log('InvoiceID::' + numberof);

								/*
								 * if(status != null && status!=''){
								 *  }
								 */
								// var today = new Date();
								// var dd = today.getDate();
								// var mm = today.getMonth()+1;
								// var yyyy =
								// today.getFullYear().toString().substr(2,2);
								// var hours = today.getHours();
								// var minutes = today.getMinutes();
								// var ampm = hours >= 12 ? 'PM' : 'AM';
								// hours = hours % 12;
								// hours = hours ? hours : 12;
								// if(dd<10){dd='0'+dd;} if(mm<10){mm='0'+mm;}
								// if(hours<10){hours='0'+hours;}
								// if(minutes<10){minutes='0'+minutes;} today =
								// mm+'/'+dd+'/'+yyyy+ " "+hours+":"+minutes+"
								// "+ampm;
								// $.ajax({
								// url: "./jobtabs3/updateEmailStampValue",
								// mType: "GET",
								// data : { 'vePOID' : vePoId, 'purcheaseDate' :
								// today},
								// success: function(data){
								// $("#emailTimeStamp").empty();
								// $("#emailTimeStamp").append(today);
								// $("#emailTimeStampLines").empty();
								// $("#emailTimeStampLines").append(today);
								// },error:function(e){
								// $('#loadingDivForPO').css({
								// "visibility" : "hidden","display": "none"
								// });
								// }
								// });
								$(this).dialog("close");
								$("#emailpopup").dialog("close");
								$('#loadingDiv').css({
									"visibility" : "hidden"
								});
								$('#loadingDivForPO').css({
									"visibility" : "hidden",
									"display" : "none"
								});
							}
						} ]
					}).dialog("open");
				},
				error : function(e) {
					$('#loadingDivForPO').css({
						"visibility" : "hidden",
						"display" : "none"
					});
				}
			});

}

function sendPOEmail(poGeneralKey) {
	try {
		var CuInvoice = $('#cuinvoiceIDhidden').val();
		if (CuInvoice == '' || CuInvoice == undefined) {
			$('#showMessageCuInvoice').css("margin-left", "300%");
			$('#showMessageCuInvoiceLine').css("margin-left", "300%");

			$('#showMessageCuInvoice').html("Please Save Customer Invoice.");
			$('#showMessageCuInvoiceLine')
					.html("Please Save Customer Invoice.");
			setTimeout(function() {
				$('#showMessageCuInvoice').html("");
				$('#showMessageCuInvoiceLine').html("");
			}, 3000);
			return false;

		}
		var newDialogDiv = jQuery(document.createElement('div'));
		var bidderGrid = $("#salesrelease");
		var aQuotePDF = "purchase";

		var rxMasterID = $('#rxCustomerID').val();

		// alert('aContactID::'+rxMasterID)
		var cusotmerPONumber = $("#customerInvoice_invoiceNumberId").val();
		// alert("rxMasterID--->"+rxMasterID+"--->InvoiceNumber--"+cusotmerPONumber);

		$.ajax({
			url : "./vendorscontroller/GetContactDetailsFromCuso",
			mType : "GET",
			data : {
				'rxMasterID' : rxMasterID
			},
			success : function(data) {
				var aFirstname = data.firstName;
				var aLastname = data.lastName;
				var aEmail;
				if ($('#emailListCU').text() != null) {
					aEmail = $("#emailListCU option:selected").text();
				} else {
					aEmail = data.email;
				}
				var arxContactid = '';

				try {
					arxContactid = data.rxContactId;
					// alert("Ajax
					// Success-->"+aFirstname+"--"+aLastname+"--"+aEmail+"--"+arxContactid);

				} catch (err) {// alert(err.message);

				}
				// var arxContact = aFirstname + ' '+aLastname;
				var arxContact = aFirstname + ' ' + aLastname;

				callEmailPopupfromInvoice(arxContactid, aEmail, poGeneralKey,
						cusotmerPONumber, CuInvoice);

				/*
				 * if(aEmail === ''){ errorText = "Are you sure you want to send
				 * this PO to"+ arxContact +"?"; }else{ errorText = "Are you
				 * sure you want to send this PO to"+ arxContact +"("+ aEmail
				 * +")?"; } jQuery(newDialogDiv).html('<span><b
				 * style="color:green;">'+errorText+'</b></span>');
				 * jQuery(newDialogDiv).dialog({modal: true, width:400,
				 * height:150, title:"Message", buttons:{ "Send": function(){
				 * $('#loadingPODiv').css({"visibility": "visible"});
				 * saveCuInvoicePDF(arxContactid,aEmail, poGeneralKey,
				 * cusotmerPONumber, ''); jQuery(this).dialog("close"); },
				 * Cancel: function ()
				 * {jQuery(this).dialog("close");}}}).dialog("open");
				 */
			}
		});

	} catch (err) {
		// alert(err.message);
	}
	return false;
}

function callEmailPopupfromInvoice(arxContactid, aEmail, poGeneralKey,
		cusotmerPONumber1, cuInvoiceId) {
	clearemailattachmentForm();

	// alert("///>");

	var cusotmerPONumber = cusotmerPONumber1;
	var vePoId = cuInvoiceId;
	var aContactID = arxContactid;
	var toemailaddress = "";
	var fullname = "";
	$.ajax({
		url : "./vendorscontroller/GetContactDetails",
		mType : "GET",
		async : false,
		data : {
			'rxContactID' : aContactID
		},
		success : function(data) {
			var aFirstname = data.firstName;
			var aLastname = data.lastName;
			toemailaddress = data.email;
			if (aEmail == '') {
				$("#etoaddr").val(toemailaddress);
			} else {
				$("#etoaddr").val(aEmail);
			}
			fullname = aFirstname + ' ' + aLastname;
			// $('#loadingPODiv').css({"visibility": "visible"});

		}
	});
	$.ajax({
		url : "./vendorscontroller/GetFromAddressContactDetails",
		mType : "GET",
		async : false,
		data : {},
		success : function(data) {
			$("#efromaddr").val(data.emailAddr);
			var ccaddr1 = data.ccaddr1;
			var ccaddr2 = data.ccaddr2;
			var ccaddr3 = data.ccaddr3;
			var ccaddr4 = data.ccaddr4;
			var ccaddress = "";
			if (ccaddr1 != null && ccaddr1 != "") {
				if (ccaddress == "") {
					ccaddress = ccaddr1;
				} else {
					ccaddress = ccaddress + "," + ccaddr1;
				}
			}
			if (ccaddr2 != null && ccaddr2 != "") {
				if (ccaddress == "") {
					ccaddress = ccaddr2;
				} else {
					ccaddress = ccaddress + "," + ccaddr2;
				}
			}
			if (ccaddr3 != null && ccaddr3 != "") {
				if (ccaddress == "") {
					ccaddress = ccaddr3;
				} else {
					ccaddress = ccaddress + "," + ccaddr3;
				}
			}
			if (ccaddr4 != null && ccaddr4 != "") {
				if (ccaddress == "") {
					ccaddress = ccaddr4;
				} else {
					ccaddress = ccaddress + "," + ccaddr4;
				}
			}
			$("#eccaddr").val(ccaddress);
			$("#esubj").val("CustomerInvoice # " + cusotmerPONumber);
			$("#filelabelname").text(
					"CustomerInvoice_" + cusotmerPONumber + ".pdf");

			// alert(withPrice);

			$('#emailpopup').data('arxContactid', arxContactid);
			$('#emailpopup').data('aEmail', aEmail);
			$('#emailpopup').data('poGeneralKey', poGeneralKey);
			$('#emailpopup').data('cusotmerPONumber', cusotmerPONumber);
			$('#emailpopup').data('cuInvoiceId', cuInvoiceId);
			$('#emailpopup').data('type', "DialogCIOutSide");
			$("#emailpopup").dialog("open");
		}
	});
}

function sentMailPOFunction(aContactID, aEmail, poGeneralKey, cusotmerPONumber,
		vePoId) {
	if (aEmail === '') {
		var newDialogDiv = jQuery(document.createElement('div'));
		var errorText = "Please Provide a Mail ID.";
		jQuery(newDialogDiv)
				.html(
						'<form id="mailToAddress"><table><tr><td><span><b style="color:red;">'
								+ errorText
								+ '</b></span></td></tr>'
								+ '<tr><td style="height: 5px;"></td></tr>'
								+ '<tr><td><label>Mail ID: </label><input type="text" id="mailToAddress_ID" name="mailToAddress_name" class="validate[custom[email]]" style="width: 250px;" /></td></tr></table></form><hr>');
		jQuery(newDialogDiv)
				.dialog(
						{
							modal : true,
							width : 430,
							height : 180,
							title : "Message",
							buttons : {
								"Submit & Send" : function() {
									if (!$('#mailToAddress').validationEngine(
											'validate')) {
										return false;
									}
									var aEmailAddress = $("#mailToAddress_ID")
											.val();
									saveMailAddress(aEmailAddress, aContactID);
									$('#loadingPODiv').css({
										"visibility" : "visible"
									});
									$
											.ajax({
												url : "./sendMailServer/sendCuInvoiceMail",
												mType : "POST",
												data : {
													'contactID' : aContactID,
													'InvoiceNumber' : cusotmerPONumber
												},
												success : function(data) {
													// alert(cusotmerPONumber);
													$('#loadingPODiv').css({
														"visibility" : "hidden"
													});
													var errorText = "Mail Sent Successfully.";
													jQuery(newDialogDiv)
															.html(
																	'<span><b style="color:green;">'
																			+ errorText
																			+ '</b></span>');
													jQuery(newDialogDiv)
															.dialog(
																	{
																		modal : true,
																		width : 300,
																		height : 150,
																		title : "Message",
																		buttons : [ {
																			height : 35,
																			text : "OK",
																			click : function() {
																				var today = new Date();
																				var dd = today
																						.getDate();
																				var mm = today
																						.getMonth() + 1;
																				var yyyy = today
																						.getFullYear()
																						.toString()
																						.substr(
																								2,
																								2);
																				var hours = today
																						.getHours();
																				var minutes = today
																						.getMinutes();
																				var ampm = hours >= 12 ? 'PM'
																						: 'AM';
																				hours = hours % 12;
																				hours = hours ? hours
																						: 12;
																				if (dd < 10) {
																					dd = '0'
																							+ dd;
																				}
																				if (mm < 10) {
																					mm = '0'
																							+ mm;
																				}
																				if (hours < 10) {
																					hours = '0'
																							+ hours;
																				}
																				if (minutes < 10) {
																					minutes = '0'
																							+ minutes;
																				}
																				today = mm
																						+ '/'
																						+ dd
																						+ '/'
																						+ yyyy
																						+ " "
																						+ hours
																						+ ":"
																						+ minutes
																						+ " "
																						+ ampm;
																				$
																						.ajax({
																							url : "./jobtabs3/updateEmailStampValue",
																							mType : "GET",
																							data : {
																								'vePOID' : vePoId,
																								'purcheaseDate' : today
																							},
																							success : function(
																									data) {
																								$(
																										"#mailTimestampLines")
																										.empty();
																								$(
																										"#mailTimestampLines")
																										.append(
																												today);
																								$(
																										"#mailTimestampGeneral")
																										.empty();
																								$(
																										"#mailTimestampGeneral")
																										.append(
																												today);
																							}
																						});
																				$(
																						this)
																						.dialog(
																								"close");
																			}
																		} ]
																	}).dialog(
																	"open");
												}
											});
									jQuery(this).dialog("close");
									return true;
								},
								Cancel : function() {
									jQuery(this).dialog("close");
								}
							}
						}).dialog("open");
	} else {
		if (poGeneralKey === 'CuInvoice') {
			// alert("CuInvoice");
			$('#loadingPOGenDiv').css({
				"visibility" : "visible"
			});
			$
					.ajax({
						url : "./sendMailServer/sendCuInvoiceMail",
						mType : "POST",
						data : {
							'contactID' : aContactID,
							'InvoiceNumber' : cusotmerPONumber
						},
						success : function(data) {
							// $('#loadingPOGenDiv').css({"visibility":
							// "hidden"});
							// $('#loadingPODiv').css({"visibility": "hidden"});
							var errorText = "Sent";
							$('#showMessageCuInvoice').css("margin-left",
									"1666%");
							$('#showMessageCuInvoiceLine').css("margin-left",
									"1666%");
							$('#showMessageCuInvoice').html(errorText);
							$('#showMessageCuInvoiceLine').html(errorText);
							setTimeout(function() {
								$('#showMessageCuInvoice').html("");
								$('#showMessageCuInvoiceLine').html("");
							}, 3000);
							jQuery(newDialogDiv).html(
									'<span><b style="color:green;">'
											+ errorText + '</b></span>');
							jQuery(newDialogDiv)
									.dialog(
											{
												modal : true,
												width : 300,
												height : 150,
												title : "Message",
												buttons : [ {
													height : 35,
													text : "OK",
													click : function() {
														var today = new Date();
														var dd = today
																.getDate();
														var mm = today
																.getMonth() + 1;
														var yyyy = today
																.getFullYear()
																.toString()
																.substr(2, 2);
														var hours = today
																.getHours();
														var minutes = today
																.getMinutes();
														var ampm = hours >= 12 ? 'PM'
																: 'AM';
														hours = hours % 12;
														hours = hours ? hours
																: 12;
														if (dd < 10) {
															dd = '0' + dd;
														}
														if (mm < 10) {
															mm = '0' + mm;
														}
														if (hours < 10) {
															hours = '0' + hours;
														}
														if (minutes < 10) {
															minutes = '0'
																	+ minutes;
														}
														today = mm + '/' + dd
																+ '/' + yyyy
																+ " " + hours
																+ ":" + minutes
																+ " " + ampm;
														$
																.ajax({
																	url : "./jobtabs3/updateEmailStampValue",
																	mType : "GET",
																	data : {
																		'vePOID' : vePoId,
																		'purcheaseDate' : today
																	},
																	success : function(
																			data) {
																		$(
																				"#emailTimeStamp")
																				.empty();
																		$(
																				"#emailTimeStamp")
																				.append(
																						today);
																	}
																});
														$(this).dialog("close");
													}
												} ]
											}).dialog("open");
						}
					});
		} else {
			$
					.ajax({
						url : "./sendMailServer/sendCuInvoiceMail",
						mType : "POST",
						data : {
							'contactID' : aContactID,
							'InvoiceNumber' : cusotmerPONumber
						},
						success : function(data) {
							$('#loadingPODiv').css({
								"visibility" : "hidden"
							});
							var errorText = "Mail Sent Successfully.";
							jQuery(newDialogDiv).html(
									'<span><b style="color:green;">'
											+ errorText + '</b></span>');
							jQuery(newDialogDiv)
									.dialog(
											{
												modal : true,
												width : 300,
												height : 150,
												title : "Message",
												buttons : [ {
													height : 35,
													text : "OK",
													click : function() {
														var today = new Date();
														var dd = today
																.getDate();
														var mm = today
																.getMonth() + 1;
														var yyyy = today
																.getFullYear()
																.toString()
																.substr(2, 2);
														var hours = today
																.getHours();
														var minutes = today
																.getMinutes();
														var ampm = hours >= 12 ? 'PM'
																: 'AM';
														hours = hours % 12;
														hours = hours ? hours
																: 12;
														if (dd < 10) {
															dd = '0' + dd;
														}
														if (mm < 10) {
															mm = '0' + mm;
														}
														if (hours < 10) {
															hours = '0' + hours;
														}
														if (minutes < 10) {
															minutes = '0'
																	+ minutes;
														}
														today = mm + '/' + dd
																+ '/' + yyyy
																+ " " + hours
																+ ":" + minutes
																+ " " + ampm;
														$
																.ajax({
																	url : "./jobtabs3/updateEmailStampValue",
																	mType : "GET",
																	data : {
																		'vePOID' : vePoId,
																		'purcheaseDate' : today
																	},
																	success : function(
																			data) {
																		$(
																				"#emailTimeStamp")
																				.empty();
																		$(
																				"#emailTimeStamp")
																				.append(
																						today);
																	}
																});
														$(this).dialog("close");
													}
												} ]
											}).dialog("open");
						}
					});
		}
	}
}

function loadEmailList(rxMasterID) {
	// alert("hoi");
	$.ajax({
		url : "./rxdetailedviewtabs/getEmailList",
		mType : "GET",
		data : {
			'rxMasterID' : rxMasterID
		},
		success : function(data) {
			sEmail = "";
			$.each(data, function(key, valueMap) {
				if ("emailList" == key) {
					$.each(valueMap, function(index, value) {
						if (value.email != null && value.email.trim() != '')
							sEmail += '<option value=' + value.rxContactId
									+ '>' + value.email + '</option>';

					});
					$('#emailListCU').html(sEmail);
					$('#emailListCURebuild').html(sEmail);
				}
			});
		}
	});

}

function setdivisionFromLogin() {
	$.ajax({
		url : './getUserDefaults',
		type : 'POST',
		success : function(data) {
			var selected = '';

			$.each(data, function(key, valueMap) {
				if ("divisions" == key) {
					console.log('new datd ' + valueMap);
					$.each(valueMap, function(index, value) {
						// alert(data.divisionID +' :: '+value.coDivisionId);
						if (data.divisionID == value.coDivisionId) {

							$(
									"#customer_Divisions option[value="
											+ value.coDivisionId + "]").attr(
									"selected", true);
						}

					});
				}
			});
		}
	});
}

$(function() {
	var cache = {};
	var lastXhr = '';
	$("#customerinvoice_paymentTerms").autocomplete(
			{
				minLength : 2,
				timeout : 1000,
				select : function(event, ui) {

					var id = ui.item.id;
					var invoiceDate = new Date($(
							'#customerInvoice_invoiceDateID').val());
					var dd = invoiceDate.getDate();
					if (ui.item.dueOnDay == 0) {
						invoiceDate.setDate(invoiceDate.getDate()
								+ ui.item.dueDays);
						dd = invoiceDate.getDate();
					} else {
						invoiceDate.setDate(invoiceDate.getDate() + 31);
						dd = invoiceDate.ui.item.dueDays;
					}

					var mm = invoiceDate.getMonth() + 1;
					var y = invoiceDate.getFullYear();
					var someFormattedDate = mm + '/' + dd + '/' + y;
					$('#customerInvoice_dueDateID').val(someFormattedDate);
					// alert(ui.item.dueOnDay+''+ui.item.memo);
					$("#customerinvoicepaymentId").val(id);
				},
				source : function(request, response) {
					var term = request.term;
					if (term in cache) {
						response(cache[term]);
						return;
					}
					lastXhr = $.getJSON("employeeCrud/paymentType", request,
							function(data, status, xhr) {
								cache[term] = data;
								if (xhr === lastXhr) {
									response(data);
								}
							});
				},
				error : function(result) {
					$('.ui-autocomplete-loading').removeClass(
							"ui-autocomplete-loading");
				}
			});
});

function paymentTermsDue(cuTermsId) {

	if (cuTermsId == null && cuTermsId == undefined && cuTermsId == 0) {
		return false;
	}
	try {
		$
				.ajax({
					url : './getPaymentTermsDueDate?cuTermsId=' + cuTermsId,
					type : 'GET',
					success : function(data) {
						var invoiceDate = new Date($(
								'#customerInvoice_invoiceDateID').val());
						console.log('invoiceDate  :: ' + invoiceDate);
						var dd = invoiceDate.getDate();
						console.log('dd :: ' + dd);
						if (data.dueondays == 0) {
							console.log('inside data.dueondays:: '
									+ data.dueondays);
							var date = (Number(invoiceDate.getDate()) + Number(data.duedate));
							invoiceDate.setDate(date);
							dd = invoiceDate.getDate();
							console.log('inside data.dueondays:: ' + dd);
						} else {
							invoiceDate.setDate(invoiceDate.getDate() + 32);
							dd = data.duedate;
						}
						console.log('invoiceDate data.dueondays:: '
								+ invoiceDate);

						var mm = invoiceDate.getMonth() + 1;
						var y = invoiceDate.getFullYear();
						var someFormattedDate = mm + '/' + dd + '/' + y;
						$('#customerInvoice_dueDateID').val(someFormattedDate);
					}
				});
	} catch (err) {
		console.log('error on change due date' + err.message);
	}
}

function getcoFiscalPerliodDate(x) {
	$.ajax({

		url : "./banking/getcoFiscalPeriod",
		type : "GET",
		success : function(data) {
			$("#" + x)
					.datepicker("option", "minDate", new Date(data.startDate));
			$("#" + x).datepicker("setDate", new Date());
		}
	});
}

function loadTaxTerritoryRateforinsideJob(coTaxTerritoryId) {
	if (coTaxTerritoryId != null && coTaxTerritoryId != '') {
		$.ajax({
			url : "./salesOrderController/taxRateTerritory",
			type : "POST",
			data : {
				"coTaxTerritoryId" : coTaxTerritoryId
			},
			success : function(data) {
				$('#customerInvoice_TaxTerritory').val(data.county);

				console.log(formatCurrency(data.taxRate));
				$('#customerInvoice_generaltaxId').val(data.taxRate);
				// $('#customerInvoice_linetaxId').val(formatCurrency(data.taxRate));
				$('#customerTaxTerritory').val(data.coTaxTerritoryId);

				var subtot = $("#customerInvoice_subTotalID").val().replace(
						/[^0-9\.-]+/g, "");
				var frieght = $("#customerInvoice_frightIDcu").val().replace(
						/[^0-9\.-]+/g, "");
				var sum = 0;
				var taxAmt = Number(subtot) * (data.taxRate / 100);
				sum = Number(subtot) + taxAmt + Number(frieght);

				$("#customerInvoice_taxIdcu").val(formatCurrency(taxAmt));
				$("#customerInvoice_totalID").val(formatCurrency(sum));

			}
		});
	}
}

jQuery("#invreasondialog").dialog(
		{
			autoOpen : false,
			width : 400,
			title : "Reason",
			modal : true,
			closeOnEscape : false,
			open : function(event, ui) {
				$(".ui-dialog-titlebar-close").hide();
			},
			buttons : {
				ok : function() {
					var $cudlgObj = $("#invreasondialog");

					if ($("#invreasonttextid").val() == "") {
						$("#inverrordivreason").empty();
						$("#inverrordivreason").append("Reason required");
					} else {
						$("#inverrordivreason").empty();
						console.log("InvoiceReasonDialog=="
								+ $cudlgObj.data('aCustomerInvoiceDetails'));
						// Savecustomerinvoicewithreasonbox($cudlgObj.data('aCustomerInvoiceDetails'),$cudlgObj.data('transaction'),$("#invreasonttextid").val());

						Savecustomerinvoicewithreasonbox($cudlgObj
								.data('aCustomerInvoiceDetails'), $cudlgObj
								.data('transaction'), $("#invreasonttextid")
								.val(), $cudlgObj.data('cofperiodid'),
								$cudlgObj.data('cofyearid'));
						var closeOrNot=$('#custInvCloseSaveHiddenOut').val();
						if(closeOrNot == "closeCusinvoiceGrid")
							$('#cusinvoicetab').dialog("close");
						jQuery(this).dialog("close");
	
						
						$('#custInvCloseSaveHiddenOut').val('');
						$("#invreasonttextid").val('');
					}

				}
			},
			close : function() {
				$("#invreasonttextid").val('');
				$('#invreasondialog').validationEngine('hideAll');
				$('#custInvCloseSaveHiddenOut').val('');
				return true;
			}
		});

function changeDropDown() {
}

// -------------------------------------Start Save
// -----------------------------//

function Savecustomerinvoicewithreasonbox(aCustomerInvoiceDetails, transaction,
		reason, periodid, yearid) {
	var add1 = $("#CI_Shipto").contents().find('#shipToName').val();
	var add2 = $("#CI_Shipto").contents().find('#shipToAddress1').val();
	var add3 = $("#CI_Shipto").contents().find('#shipToAddress2').val();
	var city = $("#CI_Shipto").contents().find('#shipToCity').val();
	var state = $("#CI_Shipto").contents().find('#shipToState').val();
	var zip = $("#CI_Shipto").contents().find('#shipToZip').val();
	var rowData = new Array();
	/*var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
	deleteinvoiceDetailId = new Array();
	for (var a = 0; a < rows.length; a++) {
		row = jQuery("#customerInvoice_lineitems").getRowData(rows[a]);
		var id = "#canDoID_" + rows[a];
		var canDo = $(id).is(':checked');
		if (canDo) {
			var cuInvoiceDetailId = row['cuInvoiceDetailId'];
			if (cuInvoiceDetailId != undefined && cuInvoiceDetailId != null
					&& cuInvoiceDetailId != "" && cuInvoiceDetailId != 0) {
				deleteinvoiceDetailId.push(cuInvoiceDetailId);
			}
			$('#customerInvoice_lineitems').jqGrid('delRowData', rows[a]);
		}
	}*/
	var gridRows = $('#customerInvoice_lineitems').getRowData();
	for (var i = 0; i < gridRows.length; i++) {
		var row = gridRows[i];
		rowData.push($.param(row));
		}
	
	
	var dataToSend = JSON.stringify(gridRows);
	console.log("I am from Savecustomerinvoicewithreasonbox==============>>>"
			+ aCustomerInvoiceDetails);
	//alert("aCustomerInvoiceDetails  2"+aCustomerInvoiceDetails);
	// &reason='
	$.ajax({
		url : "./jobtabs5/createCustomerInvoiceDetails?"
				+ aCustomerInvoiceDetails,
		type : "POST",
		data : {
			'thecustomerShipToAddressID' : add1,
			'thecustomerShipToAddressID1' : add2,
			'thecustomerShipToAddressID2' : add3,
			'thecustomerShipToCity' : city,
			'thecustomerShipToState' : state,
			'thecustomerShipToZipID' : zip,
			'coFiscalPeriodId' : periodid,
			'coFiscalYearId' : yearid,
			'gridData' : dataToSend,
			'delData' : cuInvOut_LineItemsToBeDeleted,
			'reason' : reason
		},
		success : function(data) {
			//if ("save" == transaction) {

				$('#cuInvoiceID').text(data.cuInvoiceId);
				$('#cuinvoiceIDhidden').val(data.cuInvoiceId);
				$('#rxShipToOtherAddressID').val(data.rxShipToAddressId);
				$("#cusinvoicetab").tabs({
					disabled : false
				});
				$("#customerInvoice_lineitems").jqGrid('GridUnload');
				//PreloadDataFromInvoiceTable("1");
				loadCustomerInvoice("1");
				$("#customerInvoice_lineitems").trigger("reloadGrid");
				$('#showMessageCuInvoice').css("margin-left", "1666%");
				$('#showMessageCuInvoiceLine').css("margin-left", "1666%");
				$('#showMessageCuInvoice').html("Saved");
				$('#showMessageCuInvoiceLine').html("Saved");
				$('#imgInvoicePDF').empty();
				$('#imgInvoicePDF').append('<input type="image" src="./../resources/Icons/PDF_new.png" title="View CuInvoice" onclick="viewCuInvoicePDF(); return false;"	style="background: #EEDEBC;">');

				$('#imgInvoiceEmail').empty();
				$('#imgInvoiceEmail').append(' <input id="contactEmailID" type="image" src="./../resources/Icons/mail_new.png" title="Email Customer Invoice" style="background:#EEDEBC;" onclick="sendPOEmail(\'CuInvoice\');return false;">');

				setTimeout(function() {
					// updateTaxableLines();
					$('#showMessageCuInvoice').html("");
					$('#showMessageCuInvoiceLine').html("");
				}, 3000);

				if ($('#clickedButtonID').val() == 'CuInvoiceLineSaveID') {
					$('#cusinvoicetab').tabs({
						selected : 1
					});
				}
			//}
			/*if ("close" == transaction) {
				
			}*/
		}
	});

}
// -------------------------------------End Save -----------------------------//

function DeleteImageFormatter(cellValue, options, rowObject) {
	var cuInvoiceDetailId = rowObject['cuInvoiceDetailId'];
	var element = "<img src='./../resources/images/delete.png' style='vertical-align: middle;' onclick='deleteInvoiceDetail("
			+ cuInvoiceDetailId + ")'>";
	return element;
}
var cuInvOut_LineItemsToBeDeleted = new Array();
function setcustomerInvoicelineitemtotal(selrowid) {
	var unitCost = $("#" + selrowid + "_unitCost").val();
	var pmult = $("#" + selrowid + "_priceMultiplier").val();
	var quantityBilled = $("#" + selrowid + "_quantityBilled").val();
	unitCost = unitCost.replace(/[^0-9\.-]+/g, "");
	if (unitCost == undefined || unitCost == "" || unitCost == null) {
		unitCost = 0.00;
	}
	if (pmult == undefined || pmult == "" || pmult == null) {
		pmult = 0;
	}
	if (quantityBilled == undefined || quantityBilled == ""
			|| quantityBilled == null) {
		quantityBilled = 0;
	}
	if (pmult == undefined || pmult == null || pmult == 0 || pmult == "") {
		pmult = 1;
	}
	unitCost = Number(floorFigureoverall(unitCost, 2));
	quantityBilled = Number(floorFigureoverall(quantityBilled, 2));
	pmult = Round_priceMultiplier(pmult);

	var amount = Number(quantityBilled) * Number(pmult);
	amount = Number(amount);
	amount = Number(amount) * Number(unitCost);
	amount = Number(floorFigureoverall(amount, 2));

	$("#" + selrowid + "_quantityBilled")
			.val(/* formatCurrency( */quantityBilled/* ) */);
	$("#" + selrowid + "_unitCost").val(/* formatCurrency( */unitCost/* ) */);
	$("#" + selrowid + "_priceMultiplier").val(/* formatCurrency( */pmult/* ) */);
	$("#" + selrowid + "_amount").val(formatCurrency(amount));

}

function setoverallcustomerinvoicetotal() {
	var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
	var grandTotal = 0;
	var taxsubtotal = 0;
	for (a = 0; a < rows.length; a++) {
		
		if(rows[a]!='new_row'){
		row = jQuery("#customerInvoice_lineitems").getRowData(rows[a]);
		// var quantityBilled = row['quantityBilled'];
		// var unitCost = row['unitCost'].replace(/[^0-9\.]+/g,"");
		// var priceMultiplier = row['priceMultiplier'];
		// if(priceMultiplier==='0'){
		// priceMultiplier=1;
		// }
		var id = "#canDoID_" + rows[a];
		var canDo = $(id).is(':checked');
		var total = row['amount'].replace(/[^0-9\-.]+/g, "");
		if (!isNaN(total) && !canDo) {
			grandTotal += Number(floorFigureoverall(total, 2));
		}
		var taxid = row['taxable'];
		if (!isNaN(total) && taxid == 1) {
			taxsubtotal = Number(taxsubtotal)
					+ Number(floorFigureoverall(total, 2));
		}
		}
	}
	var freight = $('#customerInvoice_frightIDcu').val().replace('$', '');
	freight = freight.replace(',', '');
	var taxrate = $('#customerInvoice_taxIdcu').val().replace('$', '');
	taxrate = taxrate.replace(',', '');

	if (isNaN(freight)) {
		freight = 0;
	}
	if (isNaN(taxrate)) {
		taxrate = 0;
	}

	var count = $("#customerInvoice_lineitems").getGridParam("reccount");
	if (count != null && count > 0) {

		var taxrate = 0;

		var allowfreightinTax = false;
		var allowreqcheckfreightintax = $('#CI_taxfreight').val();
		if (allowreqcheckfreightintax != null && allowreqcheckfreightintax == 1) {
			allowfreightinTax = true;
		}
		if (allowfreightinTax) {
			taxrate = (taxsubtotal + parseFloat(freight))
					* Number($('#customerInvoice_generaltaxId').val()) / 100;
		} else {
			taxrate = taxsubtotal
					* Number($('#customerInvoice_generaltaxId').val()) / 100;
		}

		var total = (grandTotal + Number(freight) + Number(floorFigureoverall(
				taxrate, 2)));
		// $('#customerInvoice_linesubTotalID').val(formatCurrency(grandTotal));
		$('#customerInvoice_subTotalID').val(formatCurrency(grandTotal));

		// $('#cuGeneral_taxvalue').val(formatCurrency(taxrate));
		$('#customerInvoice_taxIdcu').val(formatCurrency(taxrate));

		// $('#customerInvoice_linetotalID').val(formatCurrency(total));
		$('#customerInvoice_totalID').val(formatCurrency(total));
	} else {
		// $('#customerInvoice_linesubTotalID').val(formatCurrency(grandTotal));
		$('#customerInvoice_subTotalID').val(formatCurrency(grandTotal));
		var allowfreightinTax = false;
		var allowreqcheckfreightintax = $('#CI_taxfreight').val();
		if (allowreqcheckfreightintax != null && allowreqcheckfreightintax == 1) {
			allowfreightinTax = true;
		}
		if (allowfreightinTax) {
			taxrate = freight
					* Number($('#customerInvoice_generaltaxId').val()) / 100;
		}
		var total = (Number(grandTotal) + Number(freight) + Number(floorFigureoverall(
				taxrate, 2)));
		// $('#cuGeneral_taxvalue').val(formatCurrency(taxrate));
		$('#customerInvoice_taxIdcu').val(formatCurrency(taxrate));

		// $('#customerInvoice_linetotalID').val(formatCurrency(total));
		$('#customerInvoice_totalID').val(formatCurrency(total));
	}
}
function canDocheckboxFormatter(cellValue, options, rowObject) {
	var id = "canDoID_" + options.rowId;
	var element = "<input type='checkbox' id='"
			+ id
			+ "'  onclick='setoverallcustomerinvoicetotal();clickcheckboxChanges(this.id)'>";
	return element;
}

function clickcheckboxChanges(id) {
	id = "#" + id;
	console.log(id);
	var canDo = $(id).is(':checked');
	if (canDo) {
		$(id).val("true");
	} else {
		$(id).val("false");
	}
}

var posit_outside_cuInvoice_lineItemsGrid = 0;
var CuInvoiceDetailrowid;
function loadCustomerInvoice(loadValue) {
	$("#customerInvoice_lineitems").jqGrid('GridUnload');
	var id = $('#cuinvoiceIDhidden').val();

	$("#customerInvoice_lineitems")
			.jqGrid(
					{
						datatype : 'JSON',
						postData : {
							'cuInvoiceID' : function() {
								if(id==null){
									id=0;
								}
								return id;
							}
						},
						mtype : 'POST',
						url : './salesOrderController/cuInvlineitemGrid',
						pager : jQuery('#customerInvoice_lineitemspager'),
						colNames:['Product No','', 'Description','Qty','Price Each', 'Mult.', 'Tax', 'Amount','Notes', 'Manu. ID','cuSodetailId', 'prMasterID','WhCost','<img src="./../resources/images/delete.png" style="vertical-align: middle;">',''],
						   
						colModel : [
								{
									name : 'itemCode',
									index : 'itemCode',
									align : 'left',
									width : 90,
									editable : true,
									hidden : false,
									edittype : 'text',
									editoptions : {
										size : 17,

										dataInit : function(elem) {
											$(elem).autocomplete(
														{
															source : 'jobtabs3/productCodeWithNameList',
															minLength: 1,timeout :1000,autoFocus: true,
															select : function(event, ui) {
																var selrowid=$("#customerInvoice_lineitems").jqGrid('getGridParam', 'selrow');
																 var ID = ui.item.id; var product = ui.item.label; $("#"+selrowid+"_prMasterId").val(ID);
																	if(product.indexOf('-[') !== -1){var pro = product.split("-["); var pro2 = pro[1].replace("]",""); $("#"+selrowid+"_description").val(pro2);} 
																	var rxMasterID=$('#rxCustomerID').val();
																	$.ajax({
															        url: './jobtabs5/getInvoiceLineItems1?prMasterId='+$("#"+selrowid+"_prMasterId").val()+'&rxMasterID='+rxMasterID,
															        type: 'POST',        
															        success: function (data) {
															        	$.each(data, function(key, valueMap) {										
															        		if("lineItems"==key)
																			{				
																				$.each(valueMap, function(index, value){						
																					
																						$("#"+selrowid+"_description").val(value.description);
																						$("#new_row_unitCost").val(value.salesPrice00);
																						$("#"+selrowid+"_unitCost").val(value.salesPrice00);
																						$("#"+selrowid+"_priceMultiplier").val(value.pomult);
																						$("#"+selrowid+"_amount").val(formatCurrency(0));
																						if(value.isTaxable == 1)
																						{
																							$("#"+selrowid+"_taxable").prop("checked",true);
																						}
																						else
																							$("#"+selrowid+"_taxable").prop("checked",false);
																				});
																				//$("#new_row_description").focus();
																				$("#"+selrowid+"_quantityBilled").val("1");
																				$("#"+selrowid+"_description").focus();
																				setproductWareHouseCost(selrowid,ID);
																				var productCost=$("#"+selrowid+"_whseCost").val();
																				if(productCost==null || productCost=="" || productCost==undefined || productCost==0.00){
																					productCost=0.00;
																				}
																				$("#salesorder_cost").val(formatCurrency(productCost));
																				var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
																				var grandTotal = 0;
																				 for(a=0;a<rows.length;a++)
																				 {
																				    rowdata=jQuery("#customerInvoice_lineitems").getRowData(rows[a]);
																				    var eachproductCost=rowdata['whseCost'];
																				    if(eachproductCost==null || eachproductCost=="" || eachproductCost==undefined){
																				    	eachproductCost=0.00;
																					}
																				    var quantity=rowdata['quantityBilled'];
																				    if(quantity==null || quantity=="" || quantity==undefined){
																				    	quantity=0.00;
																					}
																				    var warehsecost=Number(eachproductCost)*Number(quantity);
																				    grandTotal=grandTotal+parseFloat(warehsecost);
																				      }
																				 $("#salesorder_order").val(formatCurrency(grandTotal));
																				 var subTotalIDLine=$("#customerInvoice_subTotalID").val();
																				 subTotalIDLine=subTotalIDLine.replace(/[^0-9-.]/g, '');
																				 if(subTotalIDLine==null || subTotalIDLine=="" || subTotalIDLine==undefined){
																					 subTotalIDLine=0.00;
																				 }
																				 var margintotal=Number(subTotalIDLine)-Number(grandTotal);
																				 $("#salesorder_total").val(formatCurrency(margintotal));
																				 $("#CuInvoiceSaveID").prop("disabled",true);
																				 $("#CuInvoiceSaveID").css("background","rgb(204, 204, 204)");
																			}								
																		});
															        }
															    });
																
															}
														});
									},
										dataEvents: [
							 		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
							 		       				var rowobji=$(e.target).closest('tr.jqgrow');
							  	  	   		       		var textboxid=rowobji.attr('id');
							  		   		       		jQuery("#customerInvoice_lineitems").jqGrid('setSelection',textboxid, true);
							  		   		       		e.target.select();
							 		       			  } },
							 		    			  { type: 'click', data: { i: 7 }, fn: function(e) {
							 		    				 var rowobji=$(e.target).closest('tr.jqgrow');
								  	  	   		       		var textboxid=rowobji.attr('id');
								  		   		       		jQuery("#customerInvoice_lineitems").jqGrid('setSelection',textboxid, true);
								  		   		       		e.target.select();
							 		    				  
							 		    			  } },
								   		    			 { type: 'keypress', data: { i: 7 }, fn: function(e) {
									   		    				var key = e.which;
									                    		 if(key == 13)  // the enter key code
									                    		  {
									                    			 $("#customerInvoice_lineitems_ilsave").trigger("click");
//										                 			    $( "#vendorinvoice1_iladd" ).trigger( "click" );
										                    		    return false;  
									                    		  }} 
									   		    			 }
							 		    			  ],

									},
									editrules : {
										edithidden : false,
										required : true
									}
								},
								{
									name : 'noteImage',
									index : 'noteImage',
									align : 'right',
									width : 10,
									hidden : false,
									editable : false,
									formatter : cuInvinlineNoteImage,
									editoptions : {
										size : 15,
										alignText : 'right'
									},
									editrules : {
										edithidden : true
									}
								},
								{
									name : 'description',
									index : 'description',
									align : 'left',
									width : 150,
									editable : true,
									hidden : false,
									edittype : 'text',
									editoptions : {
										size : 28,
										dataEvents: [
						     		       			  { type: 'focus', data: { i: 7 }, fn: function(e) { 
						     		       				var rowobji=$(e.target).closest('tr.jqgrow');
						     		       				var textboxid=rowobji.attr('id');
						   		    			  		 cuLines_selectRow=textboxid;
						   		    			  			//jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
						   			    			  		jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
						     		       				  e.target.select(); }
						     		       			  },
						     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
						     		    				 var rowobji=$(e.target).closest('tr.jqgrow');
						     				    		  var textboxid=rowobji.attr('id');
						     			    			  cuLines_selectRow=textboxid;
						     			    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
						     				    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
						     				    			e.target.select();
						     			    				changePosition(cuLines_selectRow);
						     		    				   }
						     		    			  },
						     		    			 {
						  		    				  	/*
						  								 * Added by Aravind
						  								 * Reason for Adding : ID#570
						  								 */
						  		                         type: 'keypress',
						  		                         fn: function(e) {
						  		                        	 var key = e.which;
						  		                    		 if(key == 13)  // the enter key code
						  		                    		  {
						  		                    			 searchPrMasterId=null;
						  		                 			     searchProduct=null;
						  		                    			 setcustomerInvoicelineitemtotal(cuLines_selectRow);
						  		                    			 $("#customerInvoice_lineitems_ilsave").trigger("click");
						  		                    			$("#CuInvoiceSaveID").prop("disabled",false);
																 $("#CuInvoiceSaveID").css("background","");
						  		                 			 //   $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
						  		                    		    return false;  
						  		                    		  }
						  		                         }
						  		                        }
						     		    			  
						     		    			  ]
									},
									editrules : {
										edithidden : false
									},
									cellattr : function(rowId, tv, rawObject,
											cm, rdata) {
										return 'style="white-space: normal" ';
									}
								},
								{
									name : 'quantityBilled',
									index : 'quantityBilled',
									align : 'center',
									width : 15,
									hidden : false,
									editable : true,
									editoptions : {
										size : 17,
										alignText : 'left',
										dataEvents: [
									    			  { type: 'focus', data: { i: 7 }, fn: function(e) {
											  				 var rowobji=$(e.target).closest('tr.jqgrow');
												    		  var textboxid=rowobji.attr('id');
											    			  cuLines_selectRow=textboxid;
											    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
												    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
											  			  setcustomerInvoicelineitemtotal(cuLines_selectRow);  
											  			  console.log("test target select");
											  			  e.target.select();
											  			  } },
														  { type: 'click', data: { i: 7 }, fn: function(e) {  
															  setcustomerInvoicelineitemtotal(cuLines_selectRow);
															  var rowobji=$(e.target).closest('tr.jqgrow');
												    		  var textboxid=rowobji.attr('id');
											    			  cuLines_selectRow=textboxid;
											    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
												    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
										    				  //changePosition(cuLines_selectRow);
														  console.log("test target  click");
														  e.target.select();
										    			  } },
									                 {
									                  type: 'change',
									                  fn: function(e) {
									                        setcustomerInvoicelineitemtotal(cuLines_selectRow);
									                        	/*
																 * Added by Aravind	
																 * Reason for Adding : ID#570
																 */
									                        //changePosition(cuLines_selectRow);
									                  }
									                 },
									                 {
									                 	/*
															 * Added by Simon
															 * Reason for Adding : ID#567
															 */
									                      type: 'keypress',
									                      fn: function(e) {
									                     	 var key = e.which;
									                 		 if(key == 13)  // the enter key code
									                 		  {
									                 			 searchPrMasterId=null;
									              			     searchProduct=null;
									                 			 setcustomerInvoicelineitemtotal(cuLines_selectRow);
									                 			 $("#customerInvoice_lineitems_ilsave").trigger("click");
									                 			$("#CuInvoiceSaveID").prop("disabled",false);
																 $("#CuInvoiceSaveID").css("background","");
									              			 //   $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
									                 		    return false;  
									                 		  }
									                      }
									                     }
									    			  ],decimalPlaces: 2
									},
									editrules : {
										edithidden : true,
										required : false
									}
								},
								{
									name : 'unitCost',
									index : 'unitCost',
									align : 'right',
									width : 50,
									hidden : false,
									editable : true,
									formatter : customCurrencyFormatter,
									editoptions : {
										size : 17,
										alignText : 'right',
										dataEvents: [
													 { type: 'focus', data: { i: 7 }, fn: function(e) { 
								            	 var rowobji=$(e.target).closest('tr.jqgrow');
									    		  var textboxid=rowobji.attr('id');
								    			  cuLines_selectRow=textboxid;
								    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
									    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
							    				 // changePosition(cuLines_selectRow);
								             setcustomerInvoicelineitemtotal(cuLines_selectRow);
								             e.target.select(); 
								             } },
											  { type: 'click', data: { i: 7 }, fn: function(e) { 
												  setcustomerInvoicelineitemtotal(cuLines_selectRow);
												  var rowobji=$(e.target).closest('tr.jqgrow');
									    		  var textboxid=rowobji.attr('id');
								    			  cuLines_selectRow=textboxid;
								    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
									    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
							    				 // changePosition(cuLines_selectRow);
							    			  e.target.select();
							    			  } },
						                        {
						                         type: 'change',
						                         fn: function(e) {
						                               setcustomerInvoicelineitemtotal(cuLines_selectRow);
						                         }
						                        },
						                        {
						                        	/*
													 * Added by Aravind
													 * Reason for Adding : ID#570
													 */
							                         type: 'keypress',
							                         fn: function(e) {
							                        	 var key = e.which;
							                    		 if(key == 13)  // the enter key code
							                    		  {
							                    			 searchPrMasterId=null;
							                 			    searchProduct=null;
							                    			 setcustomerInvoicelineitemtotal(cuLines_selectRow);
							                    			 $("#customerInvoice_lineitems_ilsave").trigger("click");
							                    			 $("#CuInvoiceSaveID").prop("disabled",false);
															 $("#CuInvoiceSaveID").css("background","");
							                 			  //  $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
							                    		    return false;  
							                    		  }
							                         }
							                        }],decimalPlaces: 2	
									},
									editrules : {
										edithidden : true
									}
								},
								{
									name : 'priceMultiplier',
									index : 'priceMultiplier',
									align : 'right',
									width : 50,
									hidden : false,
									editable : true,
									editoptions : {
										size : 17,
										alignText : 'right',
										dataEvents: [
														{ type: 'focus', data: { i: 7 }, fn: function(e) { 
									             setcustomerInvoicelineitemtotal(cuLines_selectRow);
									             var rowobji=$(e.target).closest('tr.jqgrow');
									    		  var textboxid=rowobji.attr('id');
								    			  cuLines_selectRow=textboxid;
								    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
									    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
								    			  e.target.select();
								    			  } },
												  { type: 'click', data: { i: 7 }, fn: function(e) {
													  
													  var rowobji=$(e.target).closest('tr.jqgrow');
										    		  var textboxid=rowobji.attr('id');
									    			  cuLines_selectRow=textboxid;
									    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
										    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
													  setcustomerInvoicelineitemtotal(cuLines_selectRow);
								    				  //changePosition(cuLines_selectRow);
												  e.target.select(); 
												  }},
							                        {
							                         type: 'change',
							                         fn: function(e) {
							                               setcustomerInvoicelineitemtotal(cuLines_selectRow);
							                         }
							                        },
							                        /*
													 * Added by Aravind	
													 * Reason for Adding : ID#570
													 */
							                        {
								                         type: 'keypress',
								                         fn: function(e) {
								                        	 var key = e.which;
								                    		 if(key == 13)  // the enter key code
								                    		  {
								                    			searchPrMasterId=null;
								                 			    searchProduct=null;
								                    			 setcustomerInvoicelineitemtotal(cuLines_selectRow);
								                    			 $("#customerInvoice_lineitems_ilsave").trigger("click");
								                    			 $("#CuInvoiceSaveID").prop("disabled",false);
																 $("#CuInvoiceSaveID").css("background","");
								                 			  //  $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
								                    		    return false;  
								                    		  }
								                         }
								                        }],decimalPlaces: 4
									},formatter:customCurrencyFormatterWithoutDollar,
									editrules : {
										edithidden : true
									}
								}, {
									name : 'taxable',
									index : 'taxable',
									align : 'center',
									width : 20,
									hidden : false,
									editable : true,
									formatter : 'checkbox',
									edittype : 'checkbox',
									editoptions : {
										value : '1:0'
									},
									editrules : {
										edithidden : true
									}
								}, {
									name : 'amount',
									index : 'amount',
									align : 'right',
									width : 50,
									hidden : false,
									editable : true,
									editoptions : {
										size : 15,
										alignText : 'right',
										readonly : 'readonly',
										dataEvents: [
								   			          { type: 'focus', data: { i: 7 }, fn: function(e) {
										       				 var rowobji=$(e.target).closest('tr.jqgrow');
												    		  var textboxid=rowobji.attr('id');
											    			  cuLines_selectRow=textboxid;
											    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
												    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
										       				  e.target.select();
										       				  } },
										    			  { type: 'click', data: { i: 7 }, fn: function(e) {
										    				  var rowobji=$(e.target).closest('tr.jqgrow');
												    		  var textboxid=rowobji.attr('id');
											    			  cuLines_selectRow=textboxid;
											    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
												    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
										    				  e.target.select(); 
										    				  } }
							    		    			  ]
									},
									editrules : {
										edithidden : true
									},
									formatter : customTotalFomatter
								}, {
									name : 'note',
									index : 'note',
									align : 'right',
									width : 10,
									hidden : true,
									editable : false,
									editoptions : {
										size : 15,
										alignText : 'right'
									},
									editrules : {
										edithidden : true
									}
								}, {
									name : 'cuInvoiceId',
									index : 'cuInvoiceId',
									align : 'right',
									width : 50,
									hidden : true,
									editable : true,
									editoptions : {
										size : 17,
										alignText : 'right'
									},
									editrules : {
										edithidden : false
									}
								}, {
									name : 'cuInvoiceDetailId',
									index : 'cuInvoiceDetailId',
									align : 'right',
									width : 50,
									hidden : true,
									editable : true,
									editoptions : {
										size : 17,
										alignText : 'right'
									},
									editrules : {
										edithidden : false
									}
								},{name:'prMasterId', index:'prMasterId', align:'right', width:50,hidden:true, editable:true, editoptions:{size:17, alignText:'right'},editrules:{edithidden:false}},
								{
									name:'whseCost',
									index:'whseCost',
									align:'right',
									width:50,
									hidden:true,
									editable:true, 
									editoptions:{
										size:15, 
										alignText:'right'
									},
									editrules:{
										edithidden:true
									}
								},{
									name : 'canDo',
									index : 'canDo',
									align : 'center',
									width : 20,
									hidden : false,
									editable : false,
									formatter : canDeleteCuInvCheckboxFormatter,
									editrules : {
										edithidden : true
									}
								},
								{name:'position',index:'position',align:'left',width:70,editable:true,hidden: true,editoptions:{size:30},editrules:{edithidden:true}}
							   		
						// {name:'',index:'', width:10,editable:false,
						// hidden:false,formatter:DeleteImageFormatter,editrules:{required:false},
						// editoptions:{size:10}},
						],
						altRows : true,
						altclass : 'myAltRowClass',
						cellsubmit : 'clientArray',
						editurl : 'clientArray',
						height:552,
						imgpath : 'themes/basic/images',
						rowNum : 0,
						sortname : ' ',
						sortorder : "asc",
						pgbuttons : false,
						recordtext : '',
						rowList : [],
						pgtext : null,
						rownumbers : true,
						width : 840,
						// footerrow: true,
						// userDataOnFooter : true,
						viewrecords : false,
						loadonce : false,
						cellEdit : false,
						cmTemplate : {
							sortable : false
						},
						gridComplete : function() {
							 jQuery("#customerInvoice_lineitems").closest(".ui-jqgrid-bdiv").scrollTop(posit_job_customerInvoice);
					            posit_job_customerInvoice=0;
//					            var gridRows = $('#customerInvoice_lineitems').getRowData();
//							 	_globaloldcustomerInvoicegrid =  JSON.stringify(gridRows)+$("#customerInvoice_invoiceDateID").val();
					           
						},
						loadBeforeSend : function(xhr) {
							posit_job_customerInvoice= jQuery("#customerInvoice_lineitems").closest(".ui-jqgrid-bdiv").scrollTop();
							var gridRows = $('#customerInvoice_lineitems').getRowData();
						 	_globaloldcustomerInvoicegrid =  JSON.stringify(gridRows)+$("#customerInvoice_invoiceDateID").val();
						},
						loadComplete : function() {


					    	/* $("#customerInvoice_lineitems").setSelection(1, true);
								var allRowsInGrid = $('#customerInvoice_lineitems').jqGrid('getRowData');

								var aVal = new Array(); 
								var aTax = new Array();
								var sum = 0;
								var taxAmount = 0;
								var aTotal = 0;
								$.each(allRowsInGrid, function(index, value) { 
									aVal[index] = value.quantityBilled;
									var number1 = aVal[index].replace(/[^0-9\.-]+/g,"");
									sum = Number(sum) + Number(number1); 
								});
								$('#subtotal_ID').val(formatCurrency(sum));
								var taxValue = $('#tax_ID').val().replace(/[^0-9\.-]+/g,"");
								var taxpercent=$('#dropshipTaxID_release').val();
								
								$.each(allRowsInGrid, function(index, value) { 
									aVal[index] = value.taxable;
									if (aVal[index] === 'Yes'){
										aTax[index] = value.quantityBilled;
										var number1 = aTax[index].replace(/[^0-9\.-]+/g,"");
										taxAmount = taxAmount + Number(number1)*(taxpercent/100);
									}
								});
								var freightLineVal= $('#freight_ID').val();
								var number1 = '';
								if(freightLineVal !== ''){
									number1 = freightLineVal.replace(/[^0-9\.-]+/g,"");
								}
								$( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
								var allRowsInGridwithnewrow = $('#customerInvoice_lineitems').jqGrid('getRowData');
								_globaloldcustomerInvoicegrid = JSON.stringify(allRowsInGridwithnewrow);
								console.log("_globaloldcustomerInvoicegrid=="+_globaloldcustomerInvoicegrid); */
							setoverallcustomerinvoicetotal();
							 $("#customerInvoice_lineitems").setSelection(1, true);
							 var allRowsInGrid = $('#customerInvoice_lineitems').jqGrid('getRowData');
							 
							 var aVal = new Array(); 
								var aTax = new Array();
								var sum = 0;
								var taxAmount = 0;
								var aTotal = 0;
								/*$.each(allRowsInGrid, function(index, value) { 
									aVal[index] = value.quantityBilled;
									var number1 = aVal[index].replace(/[^0-9\.-]+/g,"");
									sum = Number(sum) + Number(number1); 
								});
							
								$('#customerInvoice_subTotalID').val(
										formatCurrency(sum));*/
								var taxValue = $('#customerInvoice_taxIdcu').val().replace(/[^0-9\.-]+/g,"");
								var taxpercent=$('#customerInvoice_generaltaxId').val();
								$.each(allRowsInGrid, function(index, value) { 
									aVal[index] = value.taxable;
									if (aVal[index] === 'Yes'){
										aTax[index] = value.quantityBilled;
										var number1 = aTax[index].replace(/[^0-9\.-]+/g,"");
										taxAmount = taxAmount + Number(number1)*(taxpercent/100);
									}
								});
								var freightLineVal= $('#customerInvoice_frightIDcu').val();
								var number1 = '';
								if(freightLineVal !== ''){
									number1 = freightLineVal.replace(/[^0-9\.-]+/g,"");
								}
								//alert("before");
								//alert("test");
								$( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
								var allRowsInGridwithnewrow = $('#customerInvoice_lineitems').jqGrid('getRowData');
								_globalold_cIlineitemform = JSON.stringify(allRowsInGridwithnewrow) + $("#customerInvoice_invoiceDateID").val();								console.log("_globaloldcustomerInvoicegrid=="+_globaloldcustomerInvoicegrid);
								_globalold_cIgeneralTotalform = $("#custoemrInvoiceFormTotalID").serialize();
								
								
								
								
								
								
							

					/*var rows = jQuery("#customerInvoice_lineitems")
							.getDataIDs();
					var grandTotal = 0;
					var taxsubtotal = 0;
					for (a = 0; a < rows.length; a++) {
						row = jQuery("#customerInvoice_lineitems")
								.getRowData(rows[a]);
						var total = row['amount'].replace(
								/[^0-9\-.]+/g, "");
						var id = "#canDoID_" + rows[a];
						var canDo = $(id).is(':checked');
						if (!isNaN(total) && !canDo) {
							grandTotal += Number(floorFigureoverall(
									total, 2));
						}
						var taxid = row['taxable'];
						if (!isNaN(total) && !canDo && taxid == 1) {
							taxsubtotal = Number(taxsubtotal)
									+ Number(floorFigureoverall(total,
											2));
						}
					}
					var freight = $('#customerInvoice_frightIDcu')
							.val().replace('$', '');
					freight = freight.replace(',', '');
					var taxrate = $('#customerInvoice_taxIdcu').val()
							.replace('$', '');
					taxrate = taxrate.replace(',', '');

					if (isNaN(freight)) {
						freight = 0;
					}
					if (isNaN(taxrate)) {
						taxrate = 0;
					}

					var count = $("#customerInvoice_lineitems")
							.getGridParam("reccount");

					if (count != null && count > 0) {
						grandTotal = Number(floorFigureoverall(
								grandTotal, 2));

						var taxrate = 0;

						var allowfreightinTax = false;
						var allowreqcheckfreightintax = $(
								'#CI_taxfreight').val();
						if (allowreqcheckfreightintax != null
								&& allowreqcheckfreightintax == 1) {
							allowfreightinTax = true;
						}
						if (allowfreightinTax) {
							taxrate = (Number(floorFigureoverall(
									taxsubtotal, 2)) + parseFloat(freight))
									* Number($(
											'#customerInvoice_generaltaxId')
											.val()) / 100;
						} else {
							taxrate = Number(floorFigureoverall(
									taxsubtotal, 2))
									* Number($(
											'#customerInvoice_generaltaxId')
											.val()) / 100;
						}

						var total = Number(grandTotal)
								+ Number(freight)
								+ Number(floorFigureoverall(taxrate, 2));
						// $('#customerInvoice_linesubTotalID').val(formatCurrency(grandTotal));
						$('#customerInvoice_subTotalID').val(
								formatCurrency(grandTotal));

						// $('#cuGeneral_taxvalue').val(formatCurrency(taxrate));
						$('#customerInvoice_taxIdcu').val(
								formatCurrency(taxrate));

						// $('#customerInvoice_linetotalID').val(formatCurrency(total));
						$('#customerInvoice_totalID').val(
								formatCurrency(total));
					}
					var cuinvoiceid = $('#cuinvoiceIDhidden').val();
					$("#customerInvoice_lineitems").setSelection(1,
							true);*/
					             
					            
					    	 
					     },
						onSelectRow : function(id) {
							CuInvoiceDetailrowid=id;
							setshowWarehouseCost_cuInv(id);
							posit_job_salesorder= jQuery("#customerInvoice_lineitems").closest(".ui-jqgrid-bdiv").scrollTop();
						},
						ondblClickRow: function(rowid) {

							 if(rowid=="new_row"){
								 
							 }else{
								 posit_job_salesorder= jQuery("#customerInvoice_lineitems").closest(".ui-jqgrid-bdiv").scrollTop();
								 $("#customerInvoice_lineitems_ilcancel").trigger("click");
							     $("#customerInvoice_lineitems_iledit").trigger("click");
							 }
						   },
						jsonReader : {
							root : "rows",
							page : "page",
							total : "total",
							records : "records",
							repeatitems : false,
							cell : "cell",
							id : "id",
							userdata : "userdata"
						}
					});
	$("#customerInvoice_lineitems").jqGrid("navGrid","#customerInvoice_lineitemspager", {
		add : false,
		edit : false,
		del : false,
		search:false,refresh:false}
	);
	$("#customerInvoice_lineitems")
			.jqGrid(
					'inlineNav',
					'#customerInvoice_lineitemspager',
					{
						edit : true,
						edittext : "Edit",
						add : true,
						addtext : "Add",
						cancel : true,
						canceltext : "Cancel",
						savetext : "Save",
						refresh : true,
						alertzIndex : 10000,
						addParams : {
							position: "last",
							addRowParams : {
								keys : false,
								oneditfunc : function() {
									$("#new_row_amount").val(formatCurrency(0));
								},
								successfunc : function(response) {
									console.log(response);
									return true;
								},
								aftersavefunc : function(response) {

									var ids = $("#customerInvoice_lineitems").jqGrid('getDataIDs');
									var cuinvrowid;
									if(ids.length==1){
										cuinvrowid = 0;
									}else{
										var idd = jQuery("#customerInvoice_lineitems tr").length;
										for(var i=0;i<ids.length;i++){
											if(idd<ids[i]){
												idd=ids[i];
											}
										}
										cuinvrowid= idd;
									}
									if(CuInvoiceDetailrowid=="new_row"){
										$("#" + CuInvoiceDetailrowid).attr("id", Number(cuinvrowid)+1);
										var candoidrownum=Number(cuinvrowid)+1;
										$("#canDoID_new_row").attr("id", "canDoID_"+candoidrownum);
										$("#canDoVIID_new_row").attr("id","canDoVIID_"+candoidrownum);
										$("#CuInvNoteImageIcon_new_row").attr("id","CuInvNoteImageIcon_"+candoidrownum);
										$("#canDeleteCuInvID_new_row").attr("id","canDeleteCuInvID_"+candoidrownum);
										$("#canDeleteCuInvID_"+candoidrownum).attr("onclick","deleteRowFrom_cuInvLineItemsJqGrid('"+candoidrownum+"');");
										$("#CuInvNoteImageIcon_"+candoidrownum).attr("onclick","ShowcuInvLineNote('"+candoidrownum+"');");
										setshowWarehouseCost_cuInv(Number(cuinvrowid)+1);
									}else{
										
										setshowWarehouseCost_cuInv(CuInvoiceDetailrowid);
									}
									var grid=$("#customerInvoice_lineitems");
									grid.jqGrid('resetSelection');
								    var dataids = grid.getDataIDs();
								    for (var i=0, il=dataids.length; i < il; i++) {
								        grid.jqGrid('setSelection',dataids[i], false);
								    }
								    
								    
									//formatCurrency(sum)
								
									setoverallcustomerinvoicetotal();
									//alert("insidee");
									setTimeout(function(){
									 $("#customerInvoice_lineitems").jqGrid('resetSelection');
									 var grid=$("#customerInvoice_lineitems");
										grid.jqGrid('resetSelection');
									    var dataids = grid.getDataIDs();
									    for (var i=0, il=dataids.length; i < il; i++) {
									        grid.jqGrid('setSelection',dataids[i], false);
									    }
									    $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
									 $("#customerInvoice_lineitems").jqGrid('setSelection','new_row', true);
									},300);
									disablePDFEmail_Button_Edit();
									cuLineItemChanges_Out();
									
								},

								errorfunc : function(rowid, response) {
									return false;
								},
								afterrestorefunc : function(rowid) {
									// alert("afterrestorefunc");
								}
							}
						},
						editParams : {
							keys : false,
							// refresh : true,
							successfunc : function(response) {
								console.log(response.responseText);
								return true;
							},
							aftersavefunc : function(id) {


								var ids = $("#customerInvoice_lineitems").jqGrid('getDataIDs');
								var cuinvrowid;
								if(ids.length==1){
									cuinvrowid = 0;
								}else{
									var idd = jQuery("#customerInvoice_lineitems tr").length;
									for(var i=0;i<ids.length;i++){
										if(idd<ids[i]){
											idd=ids[i];
										}
									}
									cuinvrowid= idd;
								}
								if(CuInvoiceDetailrowid=="new_row"){
									$("#" + CuInvoiceDetailrowid).attr("id", Number(cuinvrowid)+1);
									var candoidrownum=Number(cuinvrowid)+1;
									$("#canDoID_new_row").attr("id", "canDoID_"+candoidrownum);
									$("#canDoVIID_new_row").attr("id","canDoVIID_"+candoidrownum);
									$("#canDeleteCuInvID_new_row").attr("id","canDeleteCuInvID_"+candoidrownum)
									$("#CuInvNoteImageIcon_new_row").attr("id","CuInvNoteImageIcon_"+candoidrownum);
									$("#canDeleteCuInvID_"+candoidrownum).attr("onclick","deleteRowFrom_cuInvLineItemsJqGrid('"+candoidrownum+"');");
									$("#CuInvNoteImageIcon_"+candoidrownum).attr("onclick","ShowcuInvLineNote('"+candoidrownum+"');");
									setshowWarehouseCost_cuInv(Number(cuinvrowid)+1);
								}else{
									setshowWarehouseCost_cuInv(CuInvoiceDetailrowid);
								}
								
								
								//formatCurrency(sum)
							
							    setoverallcustomerinvoicetotal();
								//alert("insidee");
								setTimeout(function(){
								 $("#customerInvoice_lineitems").jqGrid('resetSelection');
								 var grid=$("#customerInvoice_lineitems");
									grid.jqGrid('resetSelection');
								    var dataids = grid.getDataIDs();
								    for (var i=0, il=dataids.length; i < il; i++) {
								        grid.jqGrid('setSelection',dataids[i], false);
								    }
								    $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
								 $("#customerInvoice_lineitems").jqGrid('setSelection','new_row', true);
								},300);
								disablePDFEmail_Button_Edit();
								cuLineItemChanges_Out();
							
							},
							errorfunc : function(rowid, response) {
								console.log('EditParams ErrorFunc');
								return false;

							},

							oneditfunc : function(id) {
								console.log('OnEditfunc' + id);
								var unitcost = $("#" + id + "_unitCost").val();
								unitcost = unitcost.replace(/[^0-9\-.]+/g, "");
								if (unitcost == undefined || unitcost == ""
										|| unitcost == null) {
									unitcost = 0.00;
								}
								$("#" + id + "_unitCost").val(unitcost);
							}

						},restoreAfterSelect :false

					});
	jQuery("#customerInvoice_lineitems").jqGrid('sortableRows');
	jQuery("#customerInvoice_lineitems").jqGrid('gridDnD');

}

$("#customerInvoice_lineitems_ilsave").click(function() {
	setTimeout(function(){$("#info_dialog").css("z-index", "12345");
	},100);
	});
//Drag And DROP

/*
 * Added by Simon
 * Reason for Adding : ID#567 (below 5 lines)
 */
//$('#SOlineItemGrid').jqGrid('navButtonAdd',"#SOlineItemPager",{ caption:"", buttonicon:"ui-icon-folder-collapsed", onClickButton:ShowTemplateList, position: "last", title:"Add template Line items", cursor: "pointer"});
/*$("#customerInvoice_lineitems_ilsave").css({"display":"none"});
$("#customerInvoice_lineitems_iladd").css({"display":"none"});
$("#customerInvoice_lineitems_iledit").css({"display":"none"});
$("#customerInvoice_lineitems_ilcancel").css({"display":"none"});*/



/*function loadCustomerInvoice(loadValue){
	//$("#customerInvoice_lineitems").jqGrid('GridUnload');
	var id = $('#cuinvoiceIDhidden').val();
	

	
	
	$("#customerInvoice_lineitems").jqGrid({
		datatype: 'JSON',
		postData: {'cuInvoiceID':function () { return id; }},
		mtype: 'POST',
		url: './salesOrderController/cuInvlineitemGrid',
		pager:jQuery('#customerInvoice_lineitemspager'),

		colNames:['Product No','', 'Description','Qty','Price Each', 'Mult.', 'Tax', 'Amount','Notes', 'Manu. ID','cuSodetailId', 'prMasterID','WhCost','<img src="./../resources/images/delete.png" style="vertical-align: middle;">'],
	   	colModel:[{name:'itemCode',index:'itemCode',align:'left',width:90,editable:true,hidden:false, edittype:'text', editoptions:{size:17,
	   		dataEvents: [
 		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
 		       				var rowobji=$(e.target).closest('tr.jqgrow');
  	  	   		       		var textboxid=rowobji.attr('id');
  		   		       		jQuery("#customerInvoice_lineitems").jqGrid('setSelection',textboxid, true);
  		   		       		e.target.select();
 		       			  } },
 		    			  { type: 'click', data: { i: 7 }, fn: function(e) {
 		    				 var rowobji=$(e.target).closest('tr.jqgrow');
	  	  	   		       		var textboxid=rowobji.attr('id');
	  		   		       		jQuery("#customerInvoice_lineitems").jqGrid('setSelection',textboxid, true);
	  		   		       		e.target.select();
 		    				  
 		    			  } },
	   		    			 { type: 'keypress', data: { i: 7 }, fn: function(e) {
		   		    				var key = e.which;
		                    		 if(key == 13)  // the enter key code
		                    		  {
		                    			 $("#customerInvoice_lineitems_ilsave").trigger("click");
//			                 			    $( "#vendorinvoice1_iladd" ).trigger( "click" );
			                    		    return false;  
		                    		  }} 
		   		    			 }
 		    			  ],
				dataInit : function(elem) {
						$(elem).autocomplete(
									{
										source : 'jobtabs3/productCodeWithNameList',
										minLength : 1,
										select : function(event, ui) {
											var selrowid=$("#customerInvoice_lineitems").jqGrid('getGridParam', 'selrow');
											 var ID = ui.item.id; var product = ui.item.label; $("#"+selrowid+"_prMasterId").val(ID);
												if(product.indexOf('-[') !== -1){var pro = product.split("-["); var pro2 = pro[1].replace("]",""); $("#"+selrowid+"_description").val(pro2);} 
												$.ajax({
										        url: './jobtabs5/getInvoiceLineItems?prMasterId='+$("#"+selrowid+"_prMasterId").val(),
										        type: 'POST',       
										        success: function (data) {
										        	$.each(data, function(key, valueMap) {										
										        		if("lineItems"==key)
														{				
															$.each(valueMap, function(index, value){						
																
																	$("#"+selrowid+"_description").val(value.description);
																	$("#"+selrowid+"_unitCost").val(value.salesPrice00);
																	$("#"+selrowid+"_priceMultiplier").val(value.pomult);
																	$("#"+selrowid+"_amount").val(formatCurrency(0));
																	if(value.isTaxable == 1)
																	{
																		$("#"+selrowid+"_taxable").prop("checked",true);
																	}
																	else
																		$("#"+selrowid+"_taxable").prop("checked",false);
															});
															//$("#new_row_description").focus();
															$("#"+selrowid+"_description").focus();
															setproductWareHouseCost(selrowid,ID);
															var productCost=$("#"+selrowid+"_whseCost").val();
															if(productCost==null || productCost=="" || productCost==undefined || productCost==0.00){
																productCost=0.00;
															}
															$("#salesorder_cost").val(formatCurrency(productCost));
															var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
															var grandTotal = 0;
															 for(a=0;a<rows.length;a++)
															 {
															    rowdata=jQuery("#customerInvoice_lineitems").getRowData(rows[a]);
															    var eachproductCost=rowdata['whseCost'];
															    if(eachproductCost==null || eachproductCost=="" || eachproductCost==undefined){
															    	eachproductCost=0.00;
																}
															    var quantity=rowdata['quantityBilled'];
															    if(quantity==null || quantity=="" || quantity==undefined){
															    	quantity=0.00;
																}
															    var warehsecost=Number(eachproductCost)*Number(quantity);
															    grandTotal=grandTotal+parseFloat(warehsecost);
															      }
															 $("#salesorder_order").val(formatCurrency(grandTotal));
															 var subTotalIDLine=$("#customerInvoice_subTotalID").val();
															 subTotalIDLine=subTotalIDLine.replace(/[^0-9-.]/g, '');
															 if(subTotalIDLine==null || subTotalIDLine=="" || subTotalIDLine==undefined){
																 subTotalIDLine=0.00;
															 }
															 var margintotal=Number(subTotalIDLine)-Number(grandTotal);
															 $("#salesorder_total").val(formatCurrency(margintotal));
														}								
													});
										        }
										    });
											
										}
									});
				}
	   		
	   	},editrules:{edithidden:false,required: true}},
	   	   	{name:'noteImage',index:'noteImage', align:'right', width:10,hidden:false, editable:false, formatter:cuInvinlineNoteImage, editoptions:{size:15, alignText:'right'},editrules:{edithidden:true}},
	   		{name:'description', index:'description', align:'left', width:150, editable:true,hidden:false, edittype:'text', editoptions:{size:28,
	   			dataEvents: [
     		       			  { type: 'focus', data: { i: 7 }, fn: function(e) { 
     		       				var rowobji=$(e.target).closest('tr.jqgrow');
     		       				var textboxid=rowobji.attr('id');
   		    			  		 cuLines_selectRow=textboxid;
   		    			  			//jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
   			    			  		jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
     		       				  e.target.select(); }
     		       			  },
     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
     		    				 var rowobji=$(e.target).closest('tr.jqgrow');
     				    		  var textboxid=rowobji.attr('id');
     			    			  cuLines_selectRow=textboxid;
     			    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
     				    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
     				    			e.target.select();
     			    				changePosition(cuLines_selectRow);
     		    				   }
     		    			  },
     		    			 {
  		    				  	
  								 * Added by Aravind
  								 * Reason for Adding : ID#570
  								 
  		                         type: 'keypress',
  		                         fn: function(e) {
  		                        	 var key = e.which;
  		                    		 if(key == 13)  // the enter key code
  		                    		  {
  		                    			 searchPrMasterId=null;
  		                 			     searchProduct=null;
  		                    			 setcustomerInvoicelineitemtotal(cuLines_selectRow);
  		                    			 $("#customerInvoice_lineitems_ilsave").trigger("click");
  		                 			 //   $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
  		                    		    return false;  
  		                    		  }
  		                         }
  		                        }
     		    			  
     		    			  ]
	   		},editrules:{edithidden:false},  
	   			cellattr: function (rowId, tv, rawObject, cm, rdata)	 {return 'style="white-space: normal" ';}},
	   		{name:'quantityBilled', index:'quantityBilled', align:'center', width:15,hidden:false, editable:true, editoptions:{size:17, alignText:'left'
	   			, dataEvents: [
    			  { type: 'focus', data: { i: 7 }, fn: function(e) {
		  				 var rowobji=$(e.target).closest('tr.jqgrow');
			    		  var textboxid=rowobji.attr('id');
		    			  cuLines_selectRow=textboxid;
		    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
			    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
		  			  setcustomerInvoicelineitemtotal(cuLines_selectRow);  
		  			  console.log("test target select");
		  			  e.target.select();
		  			  } },
					  { type: 'click', data: { i: 7 }, fn: function(e) {  
						  setcustomerInvoicelineitemtotal(cuLines_selectRow);
						  var rowobji=$(e.target).closest('tr.jqgrow');
			    		  var textboxid=rowobji.attr('id');
		    			  cuLines_selectRow=textboxid;
		    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
			    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
	    				  //changePosition(cuLines_selectRow);
					  console.log("test target  click");
					  e.target.select();
	    			  } },
                 {
                  type: 'change',
                  fn: function(e) {
                        setcustomerInvoicelineitemtotal(cuLines_selectRow);
                        	
							 * Added by Aravind	
							 * Reason for Adding : ID#570
							 
                        //changePosition(cuLines_selectRow);
                  }
                 },
                 {
                 	
						 * Added by Simon
						 * Reason for Adding : ID#567
						 
                      type: 'keypress',
                      fn: function(e) {
                     	 var key = e.which;
                 		 if(key == 13)  // the enter key code
                 		  {
                 			 searchPrMasterId=null;
              			     searchProduct=null;
                 			 setcustomerInvoicelineitemtotal(cuLines_selectRow);
                 			 $("#customerInvoice_lineitems_ilsave").trigger("click");
              			 //   $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
                 		    return false;  
                 		  }
                      }
                     }
    			  ],decimalPlaces: 2	
	   		},editrules:{edithidden:true,required: false}},
	   		{name:'unitCost', index:'unitCost', align:'right', width:50,hidden:false, editable:true, formatter:customCurrencyFormatter, editoptions:{size:17, alignText:'right'
	   			, dataEvents: [
								 { type: 'focus', data: { i: 7 }, fn: function(e) { 
			            	 var rowobji=$(e.target).closest('tr.jqgrow');
				    		  var textboxid=rowobji.attr('id');
			    			  cuLines_selectRow=textboxid;
			    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
				    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
		    				 // changePosition(cuLines_selectRow);
			             setcustomerInvoicelineitemtotal(cuLines_selectRow);
			             e.target.select(); 
			             } },
						  { type: 'click', data: { i: 7 }, fn: function(e) { 
							  setcustomerInvoicelineitemtotal(cuLines_selectRow);
							  var rowobji=$(e.target).closest('tr.jqgrow');
				    		  var textboxid=rowobji.attr('id');
			    			  cuLines_selectRow=textboxid;
			    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
				    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
		    				 // changePosition(cuLines_selectRow);
		    			  e.target.select();
		    			  } },
	                        {
	                         type: 'change',
	                         fn: function(e) {
	                               setcustomerInvoicelineitemtotal(cuLines_selectRow);
	                         }
	                        },
	                        {
	                        	
								 * Added by Aravind
								 * Reason for Adding : ID#570
								 
		                         type: 'keypress',
		                         fn: function(e) {
		                        	 var key = e.which;
		                    		 if(key == 13)  // the enter key code
		                    		  {
		                    			 searchPrMasterId=null;
		                 			    searchProduct=null;
		                    			 setcustomerInvoicelineitemtotal(cuLines_selectRow);
		                    			 $("#customerInvoice_lineitems_ilsave").trigger("click");
		                 			  //  $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
		                    		    return false;  
		                    		  }
		                         }
		                        }],decimalPlaces: 2	
	   		},editrules:{edithidden:true}},
	   		{name:'priceMultiplier', index:'priceMultiplier', align:'right', width:50,hidden:false, editable:true, editoptions:{size:17, alignText:'right'
	   			, dataEvents: [
								{ type: 'focus', data: { i: 7 }, fn: function(e) { 
			             setcustomerInvoicelineitemtotal(cuLines_selectRow);
			             var rowobji=$(e.target).closest('tr.jqgrow');
			    		  var textboxid=rowobji.attr('id');
		    			  cuLines_selectRow=textboxid;
		    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
			    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
		    			  e.target.select();
		    			  } },
						  { type: 'click', data: { i: 7 }, fn: function(e) {
							  
							  var rowobji=$(e.target).closest('tr.jqgrow');
				    		  var textboxid=rowobji.attr('id');
			    			  cuLines_selectRow=textboxid;
			    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
				    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
							  setcustomerInvoicelineitemtotal(cuLines_selectRow);
		    				  //changePosition(cuLines_selectRow);
						  e.target.select(); 
						  }},
	                        {
	                         type: 'change',
	                         fn: function(e) {
	                               setcustomerInvoicelineitemtotal(cuLines_selectRow);
	                         }
	                        },
	                        
							 * Added by Aravind	
							 * Reason for Adding : ID#570
							 
	                        {
		                         type: 'keypress',
		                         fn: function(e) {
		                        	 var key = e.which;
		                    		 if(key == 13)  // the enter key code
		                    		  {
		                    			searchPrMasterId=null;
		                 			    searchProduct=null;
		                    			 setcustomerInvoicelineitemtotal(cuLines_selectRow);
		                    			 $("#customerInvoice_lineitems_ilsave").trigger("click");
		                 			  //  $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
		                    		    return false;  
		                    		  }
		                         }
		                        }]		
	   		}, formatter:customCurrencyFormatterWithoutDollar, editrules:{edithidden:true}},
	   		{name:'taxable', index:'taxable', align:'center',  width:20, hidden:false, editable:true, formatter:'checkbox', edittype:'checkbox',editoptions:{value:'1:0'},editrules:{edithidden:true}},
	   		{name:'amount', index:'amount', align:'right', width:50,hidden:false, editable:true,editoptions:{size:15, alignText:'right',readonly: 'readonly',
	   			dataEvents: [
	   			          { type: 'focus', data: { i: 7 }, fn: function(e) {
			       				 var rowobji=$(e.target).closest('tr.jqgrow');
					    		  var textboxid=rowobji.attr('id');
				    			  cuLines_selectRow=textboxid;
				    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
					    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
			       				  e.target.select();
			       				  } },
			    			  { type: 'click', data: { i: 7 }, fn: function(e) {
			    				  var rowobji=$(e.target).closest('tr.jqgrow');
					    		  var textboxid=rowobji.attr('id');
				    			  cuLines_selectRow=textboxid;
				    			  //jQuery("#customerInvoice_lineitems").jqGrid('resetSelection');
					    			jQuery("#customerInvoice_lineitems").jqGrid('setSelection',cuLines_selectRow, true);
			    				  e.target.select(); 
			    				  } }
    		    			  ]
	   		},editrules:{edithidden:true},formatter:customTotalFomatter},
	   		{name:'note', index:'note', align:'right', width:10,hidden:true, editable:false, editoptions:{size:15, alignText:'right'},editrules:{edithidden:true}},
	   		{name:'cuInvoiceId', index:'cuInvoiceId', align:'right', width:50,hidden:true, editable:true, editoptions:{size:17, alignText:'right'},editrules:{edithidden:false}},
	   		{name:'cuInvoiceDetailId', index:'cuInvoiceDetailId', align:'right', width:50,hidden:true, editable:true, editoptions:{size:17, alignText:'right'},editrules:{edithidden:false}},
	   		{name:'prMasterId', index:'prMasterId', align:'right', width:50,hidden:true, editable:true, editoptions:{size:17, alignText:'right'},editrules:{edithidden:false}},
	   		{name:'whseCost',index:'whseCost',align:'right', width:50,hidden:true, editable:true, editoptions:{size:15, alignText:'right'},editrules:{edithidden:true}},
	   		{name:'canDo', index:'canDo', align:'center',  width:20, hidden:false, editable:false,  editrules:{edithidden:true}}
	   		//{name:'',index:'', width:10,editable:false, hidden:false,formatter:DeleteImageFormatter,editrules:{required:false}, editoptions:{size:10}},
	   		],
		 altRows:true,
		 altclass:'myAltRowClass',
		 cellsubmit: 'clientArray',
		 editurl: 'clientArray',
		 height:482.5,
		 imgpath:'themes/basic/images',
		 rowNum: 0,
		 sortname:' ',
		 sortorder:"asc",
		 pgbuttons: false,
		 recordtext:'',
		 rowList:[],
		 pgtext: null,
		 rownumbers:true,
	 	 width:840,
	 	 //footerrow: true,
	    // userDataOnFooter : true,
	     viewrecords: false,
	     loadonce: false,
	     cellEdit: false,
	     cmTemplate: {sortable:false},
	     gridComplete: function () {
	    	 jQuery("#customerInvoice_lineitems").closest(".ui-jqgrid-bdiv").scrollTop(posit_job_customerInvoice);
	            posit_job_customerInvoice=0;
	            var gridRows = $('#customerInvoice_lineitems').getRowData();
			 	_globaloldcustomerInvoicegrid =  JSON.stringify(gridRows)+$("#customerInvoice_invoiceDateID").val();
	     },
			loadBeforeSend: function(xhr) {
				posit_job_customerInvoice= jQuery("#customerInvoice_lineitems").closest(".ui-jqgrid-bdiv").scrollTop();
			},
	     loadComplete: function () 
	     {


	    	 $("#customerInvoice_lineitems").setSelection(1, true);
				var allRowsInGrid = $('#customerInvoice_lineitems').jqGrid('getRowData');

				var aVal = new Array(); 
				var aTax = new Array();
				var sum = 0;
				var taxAmount = 0;
				var aTotal = 0;
				$.each(allRowsInGrid, function(index, value) { 
					aVal[index] = value.quantityBilled;
					var number1 = aVal[index].replace(/[^0-9\.-]+/g,"");
					sum = Number(sum) + Number(number1); 
				});
				$('#subtotal_ID').val(formatCurrency(sum));
			//	var taxValue = $('#tax_ID').val().replace(/[^0-9\.-]+/g,"");
				var taxpercent=$('#dropshipTaxID_release').val();
				
				$.each(allRowsInGrid, function(index, value) { 
					aVal[index] = value.taxable;
					if (aVal[index] === 'Yes'){
						aTax[index] = value.quantityBilled;
						var number1 = aTax[index].replace(/[^0-9\.-]+/g,"");
						taxAmount = taxAmount + Number(number1)*(taxpercent/100);
					}
				});
				var freightLineVal= $('#freight_ID').val();
				var number1 = '';
				if(freightLineVal !== ''){
					number1 = freightLineVal.replace(/[^0-9\.-]+/g,"");
				}
				$( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
				var allRowsInGridwithnewrow = $('#vendorinvoice1').jqGrid('getRowData');
				_globalvarvenodorinvoicegrid = JSON.stringify(allRowsInGridwithnewrow);
				console.log("_globalvarvenodorinvoicegrid=="+_globalvarvenodorinvoicegrid); 
	    	 
	    	 
	             
	            
	    	 
	     },
		onSelectRow : function(id) {
			CuInvoiceDetailrowid=id;
			$("#salesorder_cost").val("$0.00");
			$("#salesorder_order").val("$0.00");
			$("#salesorder_total").val("$0.00");
			//setshowWHCost(id);
		},
		jsonReader:{
			root:"rows",
			page:"page",
			total:"total",
			records:"records",
			repeatitems:false,
			cell:"cell",
			id:"id",
			userdata:"userdata"
    	}
	});
	$("#customerInvoice_lineitems").jqGrid("navGrid","#customerInvoice_lineitemspager", {
		add : false,
		edit : false,
		del : false,
		search:false,refresh:false}
	);
	$("#customerInvoice_lineitems").jqGrid(
			'inlineNav',
			'#customerInvoice_lineitemspager',{
				add : true,
				edit : true,
				refresh : false,
				cloneToTop : true,
				alertzIndex : 1234,
				alertzIndex : 10000,
				addParams : {
					position: "last",
					addRowParams : {
								
								keys : false,
								oneditfunc : function() {
									$("#new_row_amount").val(formatCurrency(0));
									  $('#imgInvoicePDF').empty();
									  $('#imgInvoicePDF').append('<input type="image" src="./../resources/Icons/PDF_new_disabled.png" title="View CuInvoice" return false;" style="background: #EEDEBC;cursor:default;">');

									  $('#imgInvoiceEmail').empty();
									  $('#imgInvoiceEmail').append('<input id="contactEmailID" type="image" src="./../resources/Icons/mail_new_disabled.png" title="Email Customer Invoice" style="background: #EEDEBC;cursor:default;" return false;">');

								},
								successfunc : function(response) {
									console.log(response);
									return true;
								},
								aftersavefunc : function(response) {

									var ids = $("#customerInvoice_lineitems").jqGrid('getDataIDs');
									var cuinvrowid;
									if(ids.length==1){
										cuinvrowid = 0;
									}else{
										var idd = jQuery("#customerInvoice_lineitems tr").length;
										for(var i=0;i<ids.length;i++){
											if(idd<ids[i]){
												idd=ids[i];
											}
										}
										cuinvrowid= idd;
									}
									if(CuInvoiceDetailrowid=="new_row"){
										$("#" + CuInvoiceDetailrowid).attr("id", Number(cuinvrowid)+1);
										var candoidrownum=Number(cuinvrowid)+1;
										$("#canDoID_new_row").attr("id", "canDoID_"+candoidrownum);
										$("#canDoVIID_new_row").attr("id","canDoVIID_"+candoidrownum);
									//	$("#noteImageIcon_new_row").attr("id","noteImageIcon_"+candoidrownum);
										$("#canDoVIID_"+candoidrownum).attr("onclick","deleteRowFromJqGrid('"+candoidrownum+"');");
									//	$("#noteImageIcon_"+candoidrownum).attr("onclick","ShowNote('"+candoidrownum+"');");
									
									}
									
									var grid=$("#customerInvoice_lineitems");
									grid.jqGrid('resetSelection');
								    var dataids = grid.getDataIDs();
								    for (var i=0, il=dataids.length; i < il; i++) {
								        grid.jqGrid('setSelection',dataids[i], false);
								    }
								    
								    
									//formatCurrency(sum)
								
									setoverallcustomerinvoicetotal();
									//alert("insidee");
									setTimeout(function(){
									 $("#customerInvoice_lineitems").jqGrid('resetSelection');
									 var grid=$("#customerInvoice_lineitems");
										grid.jqGrid('resetSelection');
									    var dataids = grid.getDataIDs();
									    for (var i=0, il=dataids.length; i < il; i++) {
									        grid.jqGrid('setSelection',dataids[i], false);
									    }
									    $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
									 $("#customerInvoice_lineitems").jqGrid('setSelection','new_row', true);
									},300);
								},
								
								errorfunc : function(rowid, response) {
									$("#info_dialog").css("z-index", "12345");
									return false;
								},
								afterrestorefunc : function(rowid) {
									$("#info_dialog").css("z-index", "12345");
									// alert("afterrestorefunc");
								}
							}
						},
				editParams : {
					keys : false,
//					refresh : true,
					successfunc : function(response) {
							console.log(response.responseText);
							return true;
								},
					aftersavefunc : function(response) {


						var ids = $("#customerInvoice_lineitems").jqGrid('getDataIDs');
						var cuinvrowid;
						if(ids.length==1){
							cuinvrowid = 0;
						}else{
							var idd = jQuery("#customerInvoice_lineitems tr").length;
							for(var i=0;i<ids.length;i++){
								if(idd<ids[i]){
									idd=ids[i];
								}
							}
							cuinvrowid= idd;
						}
						if(CuInvoiceDetailrowid=="new_row"){
							var candoidrownum=Number(cuinvrowid)+1;
							$("#" + CuInvoiceDetailrowid).attr("id", cuinvrowid);
							$("#canDoID_new_row").attr("id", "canDoID_"+candoidrownum);
							$("#canDoVIID_new_row").attr("id","canDoVIID_"+candoidrownum);
							//$("#noteImageIcon_new_row").attr("id","noteImageIcon_"+candoidrownum);
							$("#canDoVIID_"+candoidrownum).attr("onclick","deleteRowFromJqGrid('"+candoidrownum+"');");
							//$("#noteImageIcon_"+candoidrownum).attr("onclick","ShowNote('"+candoidrownum+"');");
						}
						
						
						//formatCurrency(sum)
					
					    setoverallcustomerinvoicetotal();
						//alert("insidee");
						setTimeout(function(){
						 $("#customerInvoice_lineitems").jqGrid('resetSelection');
						 var grid=$("#customerInvoice_lineitems");
							grid.jqGrid('resetSelection');
						    var dataids = grid.getDataIDs();
						    for (var i=0, il=dataids.length; i < il; i++) {
						        grid.jqGrid('setSelection',dataids[i], false);
						    }
						    $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
						 $("#customerInvoice_lineitems").jqGrid('setSelection','new_row', true);
						},300);
					
					},
					errorfunc : function(rowid, response) {
						console.log('EditParams ErrorFunc');
						return false;

					},

					oneditfunc : function(id) {
						 $('#imgInvoicePDF').empty();
						  $('#imgInvoicePDF').append('<input type="image" src="./../resources/Icons/PDF_new_disabled.png" title="View CuInvoice" return false;" style="background: #EEDEBC;cursor:default;">');

						  $('#imgInvoiceEmail').empty();
						  $('#imgInvoiceEmail').append('<input id="contactEmailID" type="image" src="./../resources/Icons/mail_new_disabled.png" title="Email Customer Invoice" style="background: #EEDEBC;cursor:default;" return false;">');

						console.log('OnEditfunc'+id);
						var unitcost=$("#"+id+"_unitCost").val();
						unitcost=unitcost.replace(/[^0-9\-.]+/g,"");
						if(unitcost==undefined ||unitcost==""||unitcost==null){
							unitcost=0.00;
						}
						$("#"+id+"_unitCost").val(unitcost);
					}
					
				}
				
			});	
	//$('#customerInvoice_lineitems').jqGrid('navButtonAdd',"#customerInvoice_lineitemspager",{ caption:"", buttonicon:"ui-icon-calculator", onClickButton:ShowInvoiceNote, position: "last", title:"Edit note for line item", cursor: "pointer"});
	//commented By Aravind 
	//to hide ^ 
	//$('#customerInvoice_lineitems').jqGrid('navButtonAdd',"#customerInvoice_lineitemspager",{ caption:"", buttonicon:"", onClickButton:showHiddenCost, position: "last", title:"Show/Hide Cost", cursor: "pointer"});
}





function cuInvinlineNoteImage(cellValue, options, rowObject){
	var element = '';
	var id="noteImageIcon_"+options.rowId;
	var test=""+options.rowId;
   if(cellValue !== '' && cellValue !== null && cellValue != undefined){
	   element = "<div><div align='center'><img src='./../resources/images/inline_jqGrid1.png' style='vertical-align: middle;' id='"+id+"' onclick=\"ShowcuInvLineNote('"+test+"')\"/></div></div>";	   
   }else{
	   element = "<div><div align='center'><img src='./../resources/images/inline_jqGrid.png' style='vertical-align: middle;' id='"+id+"' onclick=\"ShowcuInvLineNote('"+test+"')\"/></div></div>";
   }
   return element;
} 

function ShowcuInvLineNote(row){
	try{
		
		var jobStatus=$('#jobStatusList').val();
		console.log("JobStatus"+jobStatus);
		if(typeof(jobStatus) != "undefined")
		{
		if(CKEDITOR.instances["lineItemNoteID_cuInvIn"]!=undefined)			
		{CKEDITOR.instances["lineItemNoteID_cuInvIn"].destroy(true);}
		CKEDITOR.replace('lineItemNoteID_cuInvIn', ckEditorconfigforinline);
		}
		else
		{
		CKEDITOR.replace('lineItemNoteID', ckEditorconfig);
		}
		
		//var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
		//var id = jQuery("#customerInvoice_lineitems").jqGrid('getGridParam',row);
		$("#SaveInlineNoteID_cuInvIn").attr("onclick","SaveCuInvLineItemNote_In('"+row+"');");
		var notes = jQuery("#customerInvoice_lineitems").jqGrid ('getCell', row, 'note');	  
			CKEDITOR.instances['lineItemNoteID_cuInvIn'].setData(notes);
			
			if($('#jobStatusList').val()== 4){
				$("#SaveInlineNoteID_cuInvIn").css("display", "none");
			}else{
				$("#SaveInlineNoteID_cuInvIn").css("display", "inline-block");
			}
			
			jQuery("#cuInvLineItemNote_In").dialog("open");
		//	$(".nicEdit-main").focus();
			return true;
		}catch(err){
			console.log(err.message);
			alert(err.message);
		}
	}

	function SaveCuInvLineItemNote_In(row){
		var inlineText=  CKEDITOR.instances["lineItemNoteID_cuInvIn"].getData(); 
		
		//var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
		//var id = jQuery("#customerInvoice_lineitems").jqGrid('getGridParam','selrow');
//		row=jQuery("#customerInvoice_lineitems").getRowData(rows[id-1]);
		  var notes = row['note'];
		  var cuSodetailId = row['cuSodetailId'];
		  //var aLineItem = new Array();
		  //aLineItem.push(inlineText);
		  var image="<img src='./../resources/images/lineItem_new.png' style='vertical-align: middle;'>";
		  if(inlineText==null || inlineText==undefined || inlineText==""){
			  image=undefined;
			  inlineText=undefined;
		  }
//		  if(isNaN(row)==true || row==undefined){
//			  $("#new_row_noteImage").val(image);
//			  $("#new_row_note").val(inlineText);
//		  }else{
		  	$("#customerInvoice_lineitems").jqGrid('setCell',row,'note', inlineText);  
			  $("#customerInvoice_lineitems").jqGrid('setCell',row,'noteImage', image);
			  
//		  }
		  
		  
		  jQuery("#cuInvLineItemNote_In").dialog("close");
		  CKEDITOR.instances['lineItemNoteID_cuInvIn'].destroy();
		 
		  //aLineItem.push(cuSodetailId);
		$.ajax({
			url: "./salesOrderController/saveLineItemNote",
			type: "POST",
			data : {'lineItem' : aLineItem},
			success: function(data) {
				jQuery("#SoLineItemNote").dialog("close");
				$("#customerInvoice_lineitems").trigger("reloadGrid");
			}
			});
	}

	function cuInvCancelInLineNote_out(){
		jQuery("#cuInvLineItemNote_In").dialog("close");
		 CKEDITOR.instances['lineItemNoteID_cuInvIn'].destroy();
		return false;
	}

	jQuery(function(){
		jQuery("#cuInvLineItemNote_In").dialog({
				autoOpen : false,
				modal : true,
				title:"InLine Note",
				height: 390,
				width: 635,
				buttons : {  },
				close:function(){
					//return true;
				}	
		});
	});*/

function setProductTaxable(cellValue, options, rowObject) {
	var element = '';
	var id = "taxableID_" + options.rowId;
	if ((cellValue != null && (cellValue == 'Yes' || cellValue == 1))) {
		element = "<input type='checkbox' id='" + id + "' checked='checked' >";
	} else {
		element = "<input type='checkbox' id='" + id + "'  >";
	}
	return element;

}

function SaveInvoiceLineItemNote() {
	// var inlineText=
	// $('#InvoiceLineItemNoteForm').find('.nicEdit-main').html();
	// var rows = jQuery("#customerInvoice_lineitems").getDataIDs();

	// row=jQuery("#customerInvoice_lineitems").getRowData(rows[id-1]);
	// var notes = row['note'];

	var inlineText = CKEDITOR.instances["InvoiceLineItemNoteID"].getData();
	var id = jQuery("#customerInvoice_lineitems").jqGrid('getGridParam',
			'selrow');
	$("#customerInvoice_lineitems").jqGrid('setCell', id, 'note', inlineText);
	var image = "<img src='./../resources/images/lineItem_new.png' style='vertical-align: middle;'>";
	if (inlineText == null || inlineText == undefined || inlineText == "") {
		image = "";
	}
	$("#customerInvoice_lineitems").jqGrid('setCell', id, 'noteImage', image);
	jQuery("#InvoiceLineItemNote").dialog("close");
	// var cuInvoiceDetailId = row['cuInvoiceDetailId'];

	/*
	 * $.ajax({ url: "./salesOrderController/saveInvoiceLineItemNote", type:
	 * "POST", data :
	 * "cuInvoiceDetailId="+cuInvoiceDetailId+"&note="+inlineText, success:
	 * function(data) { jQuery("#InvoiceLineItemNote").dialog("close");
	 * $("#customerInvoice_lineitems").trigger("reloadGrid"); } });
	 */
}

function CancelInvoiceInLineNote() {
	// areaLine.removeInstance('InvoiceLineItemNoteID');
	jQuery("#InvoiceLineItemNote").dialog("close");
	return false;
}

function CIGeneralTabSeriallize() {
	var value1 = $("#customerInvoice_invoiceNumberId").val();
	var value2 = $("#customerbillToAddressIDcuInvoice").val();
	var value3 = $("#customerbillToAddressID1cuInvoice").val();
	var value4 = $("#customerbillToAddress2").val();
	var value5 = $("#customerbillToCitycuInvoice").val();
	var value6 = $("#customerbillToZipIDcuInvoice").val();
	var value7 = $("#emailListCU").val();
	var value8 = $("#customerInvoice_salesRepsList").val();
	var value9 = $("#customerInvoice_CSRList").val();
	var value10 = $("#customerInvoice_SalesMgrList").val();
	var value11 = $("#customerInvoice_EngineersList").val();
	var value12 = $("#customerInvoice_PrjMgrList").val();
	var value13 = $("#customer_Divisions").val();
	var value14 = $("#customerInvoie_PONoID").val();
	var value15 = $("#customerInvoice_TaxTerritory").val();
	var value16 = $("#customerinvoice_paymentTerms").val();
	var value17 = $("#customerInvoice_dueDateID").val();
	var value18 = $("#prWareHouseSelectID").val();
	var value19 = $("#shipViaCustomerSelectID").val();
	var value20 = $("#customerInvoice_shipDateID").val();
	var value21 = $("#customerInvoice_proNumberID").val();
	var value22 = $("#CI_Shipto").contents().find("#shipToName").val();
	var value23 = $("#CI_Shipto").contents().find("#shipToAddress1").val();
	var value24 = $("#CI_Shipto").contents().find("#shipToAddress2").val();
	var value25 = $("#CI_Shipto").contents().find("#shipToCity").val();
	var value26 = $("#CI_Shipto").contents().find("#shipToState").val();
	var value27 = $("#CI_Shipto").contents().find("#shipToZip").val();
	var value28 = $("#CI_Shipto").contents().find("#shiptomoderhiddenid").val();
	var value29 = $("#customerInvoie_doNotMailID").is(':checked');
	var value30 = $("#customerInvoice_invoiceDateID").val();
	var value31 = $("#jobnodescription").val();
	var value = value1 + value2 + value3 + value4 + value5 + value6 + value7
			+ value8 + value9 + value10 + value11 + value12 + value13 + value14
			+ value15 + value16 + value17 + value18 + value19 + value20
			+ value21 + value22 + value23 + value24 + value25 + value26
			+ value27 + value28 + value29 + value30 + value31;
	return value;
}
//added by prasant #1718
function updateShipToAddress(cuInvoiceID,ShipToID)
{ if(cuInvoiceID!=null && ShipToID!=null)
	{
	$.ajax({
		url : "./salesOrderController/updateShipToIDforThisCustomer",
		type : "POST",
		data : {
			"cuInvoiceId" : cuInvoiceID,
			"ShipToID" : ShipToID
		},
		success : function(data) {
	return true;
	
		}
	});

	}
	
}
function loadCUInvoice_ShipTO(CIdivFlag, InvoiceID) {
	$.ajax({
		url : "./salesOrderController/getcuInvoice",
		type : "POST",
		data : {
			"cuInvoiceId" : InvoiceID
		},
		success : function(data) {
			var shiptomode = data.shipToMode;
			var checkshiptoid;
			$(CIdivFlag).contents().find("#shiptoaddrhiddenfromdbid").val("");
			$(CIdivFlag).contents().find("#shiptomodehiddenfromdbid").val("");
			loadshiptostateautocmpte(CIdivFlag);
			if (shiptomode == "0") {
				checkshiptoid = data.prToWarehouseId;
			} else if (shiptomode == "1" || shiptomode == "2") {
				checkshiptoid = data.rxShipToId;
			} else {
				checkshiptoid = data.rxShipToAddressId;
			}
			if (checkshiptoid != null) {
				if (data.shipToMode == 0) {
					$(CIdivFlag).contents().find("#shiptoaddrhiddenfromdbid")
							.val(data.prToWarehouseId);
				} else if (data.shipToMode == 1) {
					$(CIdivFlag).contents().find("#shiptoaddrhiddenfromdbid")
							.val(data.rxShipToId);
				} else if (data.shipToMode == 2) {
					$(CIdivFlag).contents().find("#shiptoaddrhiddenfromdbid")
							.val(data.rxShipToId);
				} else {
					$(CIdivFlag).contents().find("#shiptoaddrhiddenfromdbid")
							.val(data.rxShipToAddressId);
				}
					$(CIdivFlag).contents().find("#shiptomodehiddenfromdbid").val(
						data.shipToMode);
					
				preloadShiptoAddress(CIdivFlag, data.cuInvoiceId,checkshiptoid, data.shipToMode, '0', $("#jobCustomerName_ID").text(),
						data.coTaxTerritoryId);
				$(CIdivFlag).contents().find("#shiptomoderhiddenid").val(
						data.shipToMode);
				
			}
			//else part added by prasant #1718	when customer Invoice is created with customer Address the  automatically fetch the de
			//shipping address from customer Adress if it is checked 
			else
				{
				$(CIdivFlag).contents().find("#shiptomoderhiddenid").val(data.shipToMode);		
				preloadShiptoAddress(CIdivFlag, data.cuInvoiceId,0, data.shipToMode, '0', $("#jobCustomerName_ID").text(),data.coTaxTerritoryId);				
				updateShipToAddress(InvoiceID, $("#CI_Shipto").contents().find("#shiptoaddrhiddenfromuiid").val());
				}
		}
	});
}
function changePosition(cuLines_selectRow){
	if(cuLines_selectRow=="new_row"){
	 if($("#"+cuLines_selectRow+"_itemCode").val().length==0 || ltrim($("#"+cuLines_selectRow+"_itemCode").val()).length==0){
		 $("#"+cuLines_selectRow+"_itemCode").val("");
		 $("#"+cuLines_selectRow+"_itemCode").focus();
	  }else{
		}
	}else{
	}
}
function updateTaxableLines() {
	var OperationVar = 0;
	var taxName = $('#customerInvoice_TaxTerritory').val();

	if (taxName.toLowerCase().indexOf("exempt") > -1) {
		OperationVar = 0;
	} else {
		OperationVar = 1;
	}

	var cuInvoiceID = $('#cuinvoiceIDhidden').val();
	if (cuInvoiceID != null) {
		console.log(cuInvoiceID);
		$.ajax({
			url : "./salesOrderController/updateTaxableOnInventory",
			type : "POST",
			data : {
				"cuInvoiceID" : cuInvoiceID,
				"operation" : OperationVar
			},
			success : function(data) {

			}
		});
	}
	return true;
}
/*
 * Added By Aravind
 * ID 570
 */
function canDeleteCuInvCheckboxFormatter(cellValue, options, rowObject){
	var id="canDeleteCuInvID_"+options.rowId;
	//deleteSOCheckboxChanges(this.id);
	var element = "<img src='./../resources/images/delete_jqGrid.png' style='vertical-align: middle;' id='"+id+"' onclick='deleteRowFrom_cuInvLineItemsJqGrid("+options.rowId+");'>";
	return element;
}
	function cuInvinlineNoteImage(cellValue, options, rowObject){
		var element = '';
		var id="CuInvNoteImageIcon_"+options.rowId;
		var test=""+options.rowId;
	   if(cellValue !== '' && cellValue !== null && cellValue != undefined){
		   element = "<div><div align='center'><img src='./../resources/images/inline_jqGrid1.png' style='vertical-align: middle;' id='"+id+"' onclick=\"ShowcuInvLineNote('"+test+"')\"/></div></div>";	   
	   }else{
		   element = "<div><div align='center'><img src='./../resources/images/inline_jqGrid.png' style='vertical-align: middle;' id='"+id+"' onclick=\"ShowcuInvLineNote('"+test+"')\"/></div></div>";
	   }
	   return element;
	} 

	function ShowcuInvLineNote(row){
		/*try{
			*/
			var jobStatus=$('#jobStatusList').val();
			console.log("JobStatus"+jobStatus);
			/*if(typeof(jobStatus) != "undefined")
			{*/
			if(CKEDITOR.instances["lineItemNoteID_cuInvIn"]!=undefined)			
			{CKEDITOR.instances["lineItemNoteID_cuInvIn"].destroy(true);}
			CKEDITOR.replace('lineItemNoteID_cuInvIn', ckEditorconfig);
			/*}
			else
			{
			CKEDITOR.replace('lineItemNoteID', ckEditorconfig);
			}*/
			
			//var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
			//var id = jQuery("#customerInvoice_lineitems").jqGrid('getGridParam',row);
			$("#SaveInlineNoteID_cuInvIn").attr("onclick","SaveCuInvLineItemNote_In('"+row+"');");
			var notes = jQuery("#customerInvoice_lineitems").jqGrid ('getCell', row, 'note');	  
				CKEDITOR.instances['lineItemNoteID_cuInvIn'].setData(notes);
				
				if($('#jobStatusList').val()== 4){
					$("#SaveInlineNoteID_cuInvIn").css("display", "none");
				}else{
					$("#SaveInlineNoteID_cuInvIn").css("display", "inline-block");
				}
				
				jQuery("#cuInvLineItemNote_In").dialog("open");
			//	$(".nicEdit-main").focus();
				return true;
			/*}catch(err){
				console.log(err.message);
				alert(err.message);
			}*/
		}

		function SaveCuInvLineItemNote_In(row){
			var inlineText=  CKEDITOR.instances["lineItemNoteID_cuInvIn"].getData(); 
			
			//var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
			//var id = jQuery("#customerInvoice_lineitems").jqGrid('getGridParam','selrow');
//			row=jQuery("#customerInvoice_lineitems").getRowData(rows[id-1]);
			  /*var notes = row['note'];
			  var cuSodetailId = row['cuSodetailId'];*/
			  //var aLineItem = new Array();
			  //aLineItem.push(inlineText);
			  var image="<img src='./../resources/images/lineItem_new.png' style='vertical-align: middle;'>";
			  if(inlineText==null || inlineText==undefined || inlineText==""){
				  image=undefined;
				  inlineText=undefined;
			  }
//			  if(isNaN(row)==true || row==undefined){
//				  $("#new_row_noteImage").val(image);
//				  $("#new_row_note").val(inlineText);
//			  }else{
			  	$("#customerInvoice_lineitems").jqGrid('setCell',row,'note', inlineText);  
				  $("#customerInvoice_lineitems").jqGrid('setCell',row,'noteImage', image);
				  
//			  }
			  
			  
			  jQuery("#cuInvLineItemNote_In").dialog("close");
			  CKEDITOR.instances['lineItemNoteID_cuInvIn'].destroy();
			 
			  //aLineItem.push(cuSodetailId);
			/*$.ajax({
				url: "./salesOrderController/saveLineItemNote",
				type: "POST",
				data : {'lineItem' : aLineItem},
				success: function(data) {
					jQuery("#SoLineItemNote").dialog("close");
					$("#customerInvoice_lineitems").trigger("reloadGrid");
				}
				});*/
		}

		function cuInvCancelInLineNote_In(){
			jQuery("#cuInvLineItemNote_In").dialog("close");
			 CKEDITOR.instances['lineItemNoteID_cuInvIn'].destroy();
			return false;
		}

		/*jQuery(function(){
			jQuery("#cuInvLineItemNote_In").dialog({
					autoOpen : false,
					modal : true,
					title:"InLine Note",
					height: 390,
					width: 635,
					buttons : {  },
					close:function(){
						//return true;
					}	
			});
		});*/

function deleteRowFrom_cuInvLineItemsJqGrid(jqGridRowId)
{
	var cuInvoiceDetailId = jQuery("#customerInvoice_lineitems").jqGrid ('getCell', jqGridRowId, 'cuInvoiceDetailId');
	 if(cuInvoiceDetailId != null && cuInvoiceDetailId != 0 && cuInvoiceDetailId != undefined ){
		 cuInvOut_LineItemsToBeDeleted.push(cuInvoiceDetailId);
		 
		 $('#customerInvoice_lineitems').jqGrid('delRowData',jqGridRowId);
		// $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );		 
	 }else{
		 $('#customerInvoice_lineitems').jqGrid('delRowData',jqGridRowId);
	//	 $( "#customerInvoice_lineitems_iladd" ).trigger( "click" );
	 }
	 $('#customerInvoice_lineitems').jqGrid('setSelection', "new_row");
	 $("#new_row_itemCode").focus();
	 setoverallcustomerinvoicetotal();
	 disablePDFEmail_Button_Edit();
}
function disablePDFEmail_Button_Edit()
{
	//var aInvoiceDetails = $("#custoemrInvoiceFormID").serialize();
	var gridRows = $('#customerInvoice_lineitems').getRowData();
	var dataToSend = JSON.stringify(gridRows)+ $("#customerInvoice_invoiceDateID").val();
	
	var aInvoiceDetailsTotal = $("#custoemrInvoiceFormTotalID").serialize();
	var invoiceformdetails = CIGeneralTabSeriallize();
 	

	if (_globalold_cIgeneralform != invoiceformdetails
			|| _globalold_cIlineitemform != (dataToSend)
			|| _globalold_cIgeneralTotalform != aInvoiceDetailsTotal) {
		  $('#imgInvoicePDF').empty();
		  $('#imgInvoicePDF').append('<input type="image" src="./../resources/Icons/PDF_new_disabled.png" title="View CuInvoice" return false;" style="background: #EEDEBC;cursor:default;">');

		  $('#imgInvoiceEmail').empty();
		  $('#imgInvoiceEmail').append('<input id="contactEmailID" type="image" src="./../resources/Icons/mail_new_disabled.png" title="Email Customer Invoice" style="background: #EEDEBC;cursor:default;" return false;">');
     
		}else{
			  $('#imgInvoicePDF').empty();
			  $('#imgInvoicePDF').append('<input type="image" src="./../resources/Icons/PDF_new.png" title="View CuInvoice" onclick="viewCuInvoicePDF(); return false;"	style="background: #EEDEBC;">');

			  $('#imgInvoiceEmail').empty();
			  $('#imgInvoiceEmail').append(' <input id="contactEmailID" type="image" src="./../resources/Icons/mail_new.png" title="Email Customer Invoice" style="background:#EEDEBC;" onclick="sendPOEmail(\'CuInvoice\');return false;">');
			
		}
}

function generatecustoemrInvoiceFormTotalIDSeriallize(){
	var customerInvoice_subTotalID=$("#customerInvoice_subTotalID").val();
	var customerInvoice_frightIDcu=$("#customerInvoice_frightIDcu").val();
	var customerInvoice_taxIdcu=$("#customerInvoice_taxIdcu").val();
	var customerInvoice_totalID=$("#customerInvoice_totalID").val()+"";
	if(customerInvoice_totalID!=null && customerInvoice_totalID!=undefined && customerInvoice_totalID!=""){
		customerInvoice_totalID=customerInvoice_totalID.replace(/[^0-9\.-]+/g,"");
		customerInvoice_totalID=customerInvoice_totalID.replace(",","");
	}
		return customerInvoice_totalID;
}
function setproductWareHouseCost(selrowId,prMasterID){
	$.ajax({
		url: "./salesOrderController/getproductWareHouseCost",
		type: "POST",
		async:false,
		data :{"prMasterID":prMasterID},
		success: function(data) {
			$("#"+selrowId+"_whseCost").val(data);
		}
	});
}

function canDocheckboxFormatterVIPO(cellValue, options, rowObject){
	var id="canDoVIID_"+options.rowId;
	//clickVIcheckboxChanges(this.id)
	var element = "<img src='./../resources/images/delete_jqGrid.png' style='vertical-align: middle;' id='"+id+"' onclick='deleteRowFromJqGrid("+options.rowId+");'>";
return element;
}

function setshowWarehouseCost_cuInv(id){
	if(id!="new_row"){
		var row=jQuery("#customerInvoice_lineitems").getRowData(id);
		var productCost=row['whseCost'];
		if(productCost==null || productCost=="" || productCost==undefined){
			productCost=0.00;
		}
		$("#cuInvoice_whsecost").val(formatCurrency(productCost));
	}else{
		$("#cuInvoice_whsecost").val(formatCurrency(0));
	}
	var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
	var grandTotal = 0;
	 for(a=0;a<rows.length-1;a++)
	 {
	    rowdata=jQuery("#customerInvoice_lineitems").getRowData(rows[a]);
	    var eachproductCost=rowdata['whseCost'];
	    if(eachproductCost==null || eachproductCost=="" || eachproductCost==undefined){
	    	eachproductCost=0.00;
		}
	    var quantity=rowdata['quantityBilled'];
	    if(quantity==null || quantity=="" || quantity==undefined){
	    	quantity=0.00;
		}
	    var warehsecost=Number(eachproductCost)*Number(quantity);
	    grandTotal=grandTotal+parseFloat(warehsecost);
	      }
	 $("#cuInvoice_ordercost").val(formatCurrency(grandTotal));
	 var subTotalIDLine=$("#customerInvoice_subTotalID").val();
	 subTotalIDLine=subTotalIDLine.replace(/[^0-9-.]/g, '');
	 if(subTotalIDLine==null || subTotalIDLine=="" || subTotalIDLine==undefined){
		 subTotalIDLine=0.00;
	 }
	 var margintotal=Number(subTotalIDLine)-Number(grandTotal);
	 $("#cuInvoice_margintotal").val(formatCurrency(margintotal));
	
}

function cuLineItemChanges_Out(formvalue)
{
	var ret_val=true;
	var itemcode= $("#new_row_itemCode").val();
	
	var gridRows = $('#customerInvoice_lineitems').getRowData();
	var dataToSend = JSON.stringify(gridRows)+ $("#customerInvoice_invoiceDateID").val();
	
	var aInvoiceDetailsTotal = $("#custoemrInvoiceFormTotalID").serialize();
	var invoiceformdetails = CIGeneralTabSeriallize();
	
		if(_globalold_cIgeneralform != invoiceformdetails ){
	console.log("ERROR:::_globaloldcustomerInvoiceform=="+_globalold_cIgeneralform);
	console.log("ERROR:::_globalnewcustomerInvoiceform=="+invoiceformdetails);
	}
	if(_globalold_cIlineitemform != dataToSend){
		console.log("ERROR:::_globaloldcustomerInvoicegrid=="+_globalold_cIlineitemform);
		console.log("ERROR:::_invoiceGridDetails=="+dataToSend);
	}
	if(_globalold_cIgeneralTotalform != aInvoiceDetailsTotal){
		console.log("ERROR:::_globaloldcustomerInvoiceformTotal=="+_globalold_cIgeneralTotalform);
		console.log("ERROR:::_aInvoiceDetailsTotal=="+aInvoiceDetailsTotal);
	}
	
    if($('#customerInvoice_lineitems').val()!=undefined){
	if (_globalold_cIgeneralform != invoiceformdetails
			|| _globalold_cIlineitemform != (dataToSend)
			|| _globalold_cIgeneralTotalform != aInvoiceDetailsTotal) {
		

	    if(formvalue=="TabChange"){
   		 $( "#salesreleasetab ul li:nth-child(1)" ).addClass("ui-state-disabled");
   		 $('#loadingDivForCIGeneralTab').css({
				"display": "none"
			}); 
	    
 	  var newDialogDiv = jQuery(document.createElement('div'));
			jQuery(newDialogDiv).html('<span><b style="color:Green;">You have made changes, please save prior to continuing.</b></span>');
			jQuery(newDialogDiv).dialog({modal: true, width:300, height:150, title:"Information.", 
			closeOnEscape: false,
			open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			buttons:{
				"OK": function(){
					jQuery(this).dialog("close");
					$( "#cusinvoicetab ul li:nth-child(1)" ).addClass("ui-state-disabled");
				    return false;
				}}}).dialog("open");
			ret_val= false;
	    }
	    else{
	
		$( "#cusinvoicetab ul li:nth-child(1)" ).addClass("ui-state-disabled");
   	 $('#loadingDivForCIGeneralTab').css({
			"display": "none"
		}); 
   	ret_val= false;
   	}
	 
	}else{
    	$( "#cusinvoicetab ul li:nth-child(1)" ).removeClass("ui-state-disabled");
    	 $('#loadingDivForCIGeneralTab').css({
				"display": "none"
			}); 
    	 ret_val= true;
    }	
    }
	return ret_val;
}
function setproductWareHouseCostBycuMasterID(prMasterID,rxMasterID){
	var result=null;
	$.ajax({
		url: "./salesOrderController/getproductWareHouseCost",
		type: "POST",
		async:false,
		data :{"prMasterID":prMasterID,"rxMasterID":rxMasterID},
		success: function(data) {
			result=data;
		}
	});
	return result;
}
//BID1682 Simon
var updateTaxTerritoryStatusOnChange=0;

//Issue Fix Added By Simon #3.0.70
function validateDateAgainstOpenPeriod(dateID){
	var checkpermission=getGrantpermissionprivilage('OpenPeriod_PostingOnly',0);
	$.ajax({
		url: "./checkAccountingCyclePeriods",
		data:{"datetoCheck":$("#"+dateID).val(),"UserStatus":checkpermission},
		type: "POST",
		success: function(data) { 
			if(data.AuthStatus == "granted")
			{	
			var newDialogDiv = jQuery(document.createElement('div'));
			jQuery(newDialogDiv).html('<span><b style="color:red;">Current Transcation Date is not under open period.</b></span>');
			jQuery(newDialogDiv).dialog({modal: true, width:300, height:150, title:"Information.", 
									buttons: [{text: "OK",click: function(){
										$("#"+dateID).datepicker("setDate", new Date());
										$(this).dialog("close"); }}],
										close: function( event ) {
											if ( event.originalEvent ) {
												$("#"+dateID).datepicker("setDate", new Date());
											  }
										}
								}).dialog("open");
			}
	  	},
			error:function(data){
				console.log('error');
				}
			});
}