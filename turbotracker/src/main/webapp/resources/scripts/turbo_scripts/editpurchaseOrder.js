/**
 * 
 */
 
var po_Gen_tabform;
var po_General_tab_form;
var posit_outside_purchaseorder=0;
var selectedLineItemGrid;
var commission_PO_grid_form;
var Purchase_lines_form;
var POlineItemgridLoad=true;
var deletePOLineDetailID=new Array();
function loadEditPOSplitCommissionList(joMasterID,joReleaseID){
	createtpusage('Drop Ship-Release Tab','View Split-Commission','Info','Job,Release Tab,Drop Ship Split Commission ,JoReleaseId:'+$("#jobreleasehiddenId").val());
	$('#EditPoSplitCommissionGrid').jqGrid('GridUnload');
	$("#EditPoSplitCommission").empty();
	$("#EditPoSplitCommission").append("<table id='EditPoSplitCommissionGrid'></table><div id='ForHideGridPagerFunctionality'></div>");
	$('#EditPoSplitCommissionGrid').jqGrid({
	datatype: 'JSON',
	mtype: 'POST',
	pager: jQuery('#EditPoSplitCommissionGridPager'),
	url:'./jobtabs3/jobCommissionListGrid',
	postData: {'JoMasterId':joMasterID,'JoReleaseId':joReleaseID,'tabpage':'JoRelease'},
	colNames:[ 'Id','Rep','', '% Allocated', 'Split Type','','<img src="./../resources/images/delete.png" style="vertical-align: middle;">'],
	colModel :[
				{name:'ecSplitJobId', index:'ecSplitJobId', align:'left',editable:true, width:25,hidden:true},
	           	{name:'rep', index:'rep', align:'left', width:48, editable:true,hidden:false, editoptions:{size:12,
					 dataInit: function (elem) {
						
							//alert("aSelectedRowId = "+aSelectedRowId+" || prMasteId = "+$("#"+aSelectedRowId+"_prMasterId").val());
				            $(elem).autocomplete({
				                source: 'jobtabs3/getEmployeewithNameList',
				                minLength: 1,
				                select: function (event, ui) {  ;$(elem).focus().trigger({ type: 'keypress', charCode: 13 });var id = ui.item.id;  
				                var product = ui.item.label; 
				                $("#releaserepId").val(id);
				                var selectedRowId = $("#EditPoSplitCommissionGrid").jqGrid('getGridParam', 'selrow');
				                $("#"+selectedRowId+"_rxMasterId").val(id);
				                
				                $.ajax({
							        url: "./jobtabs3/getEmployeeCommissionDetail",
							        data: {id:id},
							        type: 'GET',
							        success: function(data){
							        	 var aSelectedRowId = $("#EditPoSplitCommissionGrid").jqGrid('getGridParam', 'selrow');
								        if(data!=null)
								        	/*$("#"+aSelectedRowId+"_allocated").val(data.jobCommissions);*/
								        	$("#"+aSelectedRowId+"_allocated").val("100");
							        	
							        }
							   }); 
				                
				                } }); $(elem).keypress(function (e) {
					                
				                    if (!e) e = window.event;
				                    if (e.keyCode == '13') {
				                         setTimeout(function () { $(elem).autocomplete('close'); }, 500);
				                        return false;
				                    }
				                });}	},editrules:{edithidden:false,required: true}},
				{name:'rxMasterId', index:'rxMasterId', align:'left',editable:true, width:32,hidden:true, editoptions:{size:6}},
				{name:'allocated', index:'allocated', align:'center',editable:true, width:32,hidden:false, editoptions:{size:6}},
				//{name:'ecSplitCodeID', index:'ecSplitCodeID', align:'left',editable:true, width:40,hidden:true},
				{name:'splittype', index:'splittype', align:'',editable:true, width:70,hidden:false,  editoptions:{size:19,
					 dataInit: function (elem) {
				            $(elem).autocomplete({
				                source: 'jobtabs3/getSplitTypewithNameList',
				                minLength: 1,
				                select: function (event, ui) { ;$(elem).focus().trigger({ type: 'keypress', charCode: 13 });var id = ui.item.id;  
				                var product = ui.item.label;
				                $("#releasesplittypeId").val(id);
				                var selectedRowId = $("#EditPoSplitCommissionGrid").jqGrid('getGridParam', 'selrow');
				                $("#"+selectedRowId+"_ecSplitCodeID").val(id);
								//Ajax starting point
								/* Commented By Zenith
								 * $.ajax({
								        url: "./jobtabs3/getpercentagebasedonsplittype",
								        data: {id:id},
								        type: 'GET',
								        success: function(data){
									        if(data!=null)
									        	$("#allocated").val(data.defaultPct);
								        	
								        }
								   }); */
								//Ajax End Part
				               
				                } }); $(elem).keypress(function (e) {
					                
				                    if (!e) e = window.event;
				                    if (e.keyCode == '13') {
				                         setTimeout(function () { $(elem).autocomplete('close'); }, 500);
				                        return false;
				                    }
				                });}	}, editrules:{edithidden:false,required: true}},
				 {name:'ecSplitCodeID', index:'ecSplitCodeID', align:'left',editable:true, width:10,hidden:true, editoptions:{size:6}},
				 {name:'canDelete', index:'canDelete', align:'center',  width:20, hidden:false, editable:false, formatter:canDeleteCheckboxFormatter,   editrules:{edithidden:true}}],
	rowNum: 0, 
	pgbuttons: false, 
	recordtext: '', 
	rowList: [], 
	pgtext: null, 
	viewrecords: false,
	sortname: 'rep', 
	sortorder: "asc", 
	imgpath: 'themes/basic/images', 
	caption: false,
	height:120,	
	width: 425, 
	rownumbers:false, 
	altRows: true, 
	altclass:'myAltRowClass', 
	caption: '',
	cellsubmit: 'clientArray',
	editurl: 'clientArray',
	loadonce: false,
	cellEdit: false,
	jsonReader : {
		root: "rows",
		page: "page",
		total: "total",
		records: "records",
		repeatitems: false,
		cell: "cell",
		id: "ecSplitJobId",
		userdata: "userdata"
	},
	gridComplete:function(){
		var gridRows = $('#EditPoSplitCommissionGrid').getRowData();
		commission_PO_grid_form=JSON.stringify(gridRows);
		console.log("commission_PO_grid_form==="+commission_PO_grid_form);
		},
	loadComplete: function(data) {
		var allRowsInGrid = $('#EditPoSplitCommissionGrid').jqGrid('getRowData');
		var  count= $('#EditPoSplitCommissionGrid').getGridParam('reccount');
		var rowid=$("#jorowhiddenId").val();
		
		if(rowid!=null && rowid!=""){}
		
		var aVal = new Array(); 
		var sum = 0;
		$.each(allRowsInGrid, function(index, value) {
			aVal[index] = value.allocated;
			sum = Number(sum) + Number(aVal[index]); 
		});
		releaseCommissionSplitsGridsum=sum;
	},
	loadError : function (jqXHR, textStatus, errorThrown){	},
	onSelectRow:  function(id){
		SplitCommissionID= id;
		 var rowData = jQuery(this).getRowData(id); 
		 releaseselectedid=rowData["ecSplitJobId"];
		 releaseupdatecommsplitgrid=Number(releaseCommissionSplitsGridsum)-Number(rowData["allocated"]);
	 },
	onCellSelect : function (rowid,iCol, cellcontent, e) {
		 //alert(rowid+"--"+iCol+"--"+cellcontent+"--"+e);
		 //console.log(e);
		},
	//editurl:"./jobtabs3/manipulateSplitCommission"
	}).navGrid("#EditPoSplitCommissionGridPager", {
		add : false,
		edit : false,
		del : false,
		search : false,
		refresh : false,
		pager : false,
		alertzIndex : 1234,
		alertcap : "Warning",
		alerttext : 'Please select Sales Rep'
	});
	$("#EditPoSplitCommissionGrid").jqGrid(
			'inlineNav',
			'#EditPoSplitCommissionGridPager',
			{
				edit : true,
				edittext : "Edit",
				add : true,
				addtext : "Add",
				cancel : true,
				canceltext :"Cancel",
				savetext : "Save",
				refresh : true,
				alertzIndex : 10000,
				addParams : {
					addRowParams : {
						keys : false,
						oneditfunc : function() {
							$("#new_row_rep").focus();
							console.log("edited");
							 $("#del_EditPoSplitCommissionGrid").addClass('ui-state-disabled');
						},
						successfunc : function(response) {
							console.log("successfunc");
							console.log(response);
							return true;
						},
						aftersavefunc : function(id) {
							console.log("aftersavefunc");
							   var ids = $("#EditPoSplitCommissionGrid").jqGrid('getDataIDs');
								var cuinvrowid;
									if(ids.length==1){
										cuinvrowid = 0;
									}else{
										var idd = jQuery("#EditPoSplitCommissionGrid tr").length;
										for(var i=0;i<ids.length;i++){
											if(idd<ids[i]){
												idd=ids[i];
											}
										}
										cuinvrowid= idd;
									}
									if(SplitCommissionID=="new_row"){
										$("#" + SplitCommissionID).attr("id", Number(cuinvrowid)+1);
									}
									var rids = $('#EditPoSplitCommissionGrid').jqGrid('getDataIDs');
									var nth_row_id = rids[0];
									validatePoCommissionTotals(nth_row_id);
									$("#EditPoSplitCommissionGrid").trigger("reload");
									var grid=$("#EditPoSplitCommissionGrid");
									grid.jqGrid('resetSelection');
									var dataids = grid.getDataIDs();
									for (var i=0, il=dataids.length; i < il; i++) {
									   grid.jqGrid('setSelection',dataids[i], false);
									}
						},
						errorfunc : function(rowid, response) {
							console.log('An Error');
							$("#info_dialog").css("z-index", "1234");
							$(".jqmID1").css("z-index", "1234");
							return false;
						},
						afterrestorefunc : function(rowid) {
							console.log("afterrestorefunc");
						}
					}
				},
				editParams : {
					keys : false,
					successfunc : function(response) {
						console.log(response.responseText);
						console.log('successfunc - editParams');
						return true;
					},
					aftersavefunc : function(id) {
				        $("#del_EditPoSplitCommissionGrid").removeClass('ui-state-disabled');

						console.log("aftersavefunc");
						   var ids = $("#EditPoSplitCommissionGrid").jqGrid('getDataIDs');
							var cuinvrowid;
								if(ids.length==1){
									cuinvrowid = 0;
								}else{
									var idd = jQuery("#EditPoSplitCommissionGrid tr").length;
									for(var i=0;i<ids.length;i++){
										if(idd<ids[i]){
											idd=ids[i];
										}
									}
									cuinvrowid= idd;
								}
								if(SplitCommissionID=="new_row"){
									$("#" + SplitCommissionID).attr("id", Number(cuinvrowid)+1);
								}
								var rids = $('#EditPoSplitCommissionGrid').jqGrid('getDataIDs');
								var nth_row_id = rids[0];
								validatePoCommissionTotals(nth_row_id);
								$("#EditPoSplitCommissionGrid").trigger("reload");
								var grid=$("#EditPoSplitCommissionGrid");
								grid.jqGrid('resetSelection');
								var dataids = grid.getDataIDs();
								for (var i=0, il=dataids.length; i < il; i++) {
								   grid.jqGrid('setSelection',dataids[i], false);
								}
						console.log('afterSavefunc editparams');
					},
					errorfunc : function(rowid, response) {
						console.log(' editParams -->>>> An Error');
						$("#info_dialog").css("z-index", "1234");
						$(".jqmID1").css("z-index", "1234");
						$("#del_EditPoSplitCommissionGrid").removeClass('ui-state-disabled');
						$("#EditPoSplitCommissionGrid").trigger("reload");
						//return false;
	
					},
					afterrestorefunc : function( id ) {
						$("#del_PoSplitCommissionGrid").removeClass('ui-state-disabled');
						console.log('editParams -> afterrestorefunc');
						$(this).trigger("reloadGrid");
				    },
					// oneditfunc: setFareDefaults
					oneditfunc : function(id) {
						console.log('OnEditfunc');
						$("#"+id+"_rep").focus();
						$("#del_EditPoSplitCommissionGrid").addClass('ui-state-disabled');
	                	/*var q = $("#"+aSelectedRowId+"_quantityOrdered").val().replace("$", "");
	                	$("#"+aSelectedRowId+"_quantityOrdered").val(q);
	                	alert(" >>>>>>>>>>>> "+$("#"+aSelectedRowId+"_cuSodetailId").val());
	                	 */
						}
				}
		});
}
function loadLinesItemGrid() {

	var schgrid='<table id="lineItemGrid"></table><div id="lineItemPager" style="display:none;"></div>';	
	$('#jqgridLine').empty();
	$('#jqgridLine').append(schgrid);
	grid = $("#lineItemGrid"),
    getColumnIndex = function (columnName) {
        var cm = $(this).jqGrid('getGridParam', 'colModel'), i, l = cm.length;
        for (i = 0; i < l; i++) {
            if ((cm[i].index || cm[i].name) === columnName) {
                return i; 
            }
        }
        return -1;
    };
	 $('#lineItemGrid').jqGrid({
		datatype: 'JSON',
		mtype: 'POST',
		url:'./jobtabs5/jobReleaseLineItem',
		postData: {vePoId :function(){
			var vePOID=aVePoId;
			if(vePOID==null || vePOID==''){
				vePOID=0;
				}
			return vePOID;
			} },
		pager: jQuery('#lineItemPager'),
		colNames:["Product No","", "Description1","Notes",'NotesDesc','Qty','Received','Invoiced', 'Cost Each', 'Mult.', 'Tax','Net Each', 'Amount', 'VepoID', 'prMasterID' , 'vePodetailID','Posiion', 'Move', 'TaxTotal', 'Ack.','Ship','Order #','InLineNote','<img src="./../resources/images/delete.png" style="vertical-align: middle;">'],
		colModel :[
			{name:'note',index:'note',align:'left',width:60,editable:true,hidden:false, edittype:'text', editoptions:{size:40,
								dataInit: function (elem) {
		            $(elem).autocomplete({
		                source: 'jobtabs3/productCodeWithNameList',
		                minLength: 1,timeout :1000,autoFocus: true,
		                select: function (event, ui) {
		                	var IncTaxOnPOAndInvoices=getSysvariableStatusBasedOnVariableName('IncTaxOnPOAndInvoices');
		                	var aSelectedRowId = $("#lineItemGrid").jqGrid('getGridParam', 'selrow');
		                	$("#"+aSelectedRowId+"_ackDate").datepicker();
		            		$("#"+aSelectedRowId+"_shipDate").datepicker();
		                	var id = ui.item.id;
		                	var product = ui.item.label;
		                	$("#"+aSelectedRowId+"_prMasterId").val(id);
		                	$("#new_row_prMasterId").val(id);
		                	
		                	var celValue = $('#vePOID').val();
		                	$.ajax({
						        url: './getLineItems?prMasterId='+id,
						        type: 'POST',       
						        success: function (data) {
						        	$.each(data, function(key, valueMap) {										
										
						        		if("lineItems"==key)
										{				
											$.each(valueMap, function(index, value){						
												
													$("#new_row_description").val(value.description);
													$("#"+aSelectedRowId+"_description").val(value.description);
													$("#new_row_unitCost").val(value.lastCost);
													$("#"+aSelectedRowId+"_unitCost").val(value.lastCost);
													$("#new_row_priceMultiplier").val(value.pomult);
													$("#"+aSelectedRowId+"_priceMultiplier").val(value.pomult);
													$("#new_row_sopopup").val(value.sopopup);
													$("#"+aSelectedRowId+"_sopopup").val(value.sopopup);
													$("#new_row_vePoid").val(celValue);
													$("#"+aSelectedRowId+"_vePoid").val(celValue);
													
													console.log(value.isTaxable+"=="+IncTaxOnPOAndInvoices+"=="+IncTaxOnPOAndInvoices[0].valueLong);
													/*					
													 * Eric gave this explanation
													 * 	   Bring
													Taxable    TaxOnSettings  taxonpo  taxincludeornot
														0			0			0			no
														0			1			1			yes
														1			0			0			no
														1			1			1			yes
														*/
													
													
													var includetaxchecked=(IncTaxOnPOAndInvoices==null)?0:IncTaxOnPOAndInvoices[0].valueLong;
													if((value.isTaxable == 1 && includetaxchecked==1)
													|| (value.isTaxable == 0 && includetaxchecked==1)		
													)	
													{
														$("#new_row_taxable").prop("checked",true);
														$("#"+aSelectedRowId+"_taxable").prop("checked",true);
													}
													else
													{
														$("#new_row_taxable").prop("checked",false);
														$("#"+aSelectedRowId+"_taxable").prop("checked",false);
													}
											
											}); 												
											$("#new_row_description").focus();
											$("#"+aSelectedRowId+"_description").focus();
											
										}	
									});
																		
									
						        }
						    });
		                }
		            });
		      },dataEvents: [
	   		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
	     		       				var rowobji=$(e.target).closest('tr.jqgrow');
	     			    			 var textboxid=rowobji.attr('id');
	     			    			poLines_selectRow=textboxid;
	     			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		       				  e.target.select(); 

	     		       			  } },
	     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
	     		    				  var rowobji=$(e.target).closest('tr.jqgrow');
	     		    				  var textboxid=rowobji.attr('id');
	     		    				poLines_selectRow=textboxid;
	     				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		    				  e.target.select();
	     		    				//  changePosition(poLines_selectRow);
	     		    			  }
	     		    			   },
	     		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
	     		    			  var rowobji=$(e.target).closest('tr.jqgrow');
	     			    		  var textboxid=rowobji.attr('id');
	     			    		poLines_selectRow=textboxid;
	     			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     			    			e.target.select();
	     		    				//changePosition(poLines_selectRow);
	     		    			  } },
	   		    			  ]
					},editrules:{edithidden:false,required: true}},
			{name:'inLineNoteImage', index:'inLineNoteImage', align:'center', width:10,hidden:false,editable:false,formatter: POinlineNoteImage},
           	{name:'description', index:'description', align:'left', width:130, editable:true,hidden:false, edittype:'text', editoptions:{size:40,maxlength:50,
           		dataEvents:  [
       		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
         		       				var rowobji=$(e.target).closest('tr.jqgrow');
         			    			 var textboxid=rowobji.attr('id');
         			    			poLines_selectRow=textboxid;
         			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
         		       				  e.target.select(); 

         		       			  } },
         		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
         		    				  var rowobji=$(e.target).closest('tr.jqgrow');
         		    				  var textboxid=rowobji.attr('id');
         		    				  poLines_selectRow=textboxid;
         				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
         		    				  e.target.select();
         		    				//  changePosition(poLines_selectRow);
         		    			  }
         		    			   },
//         		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
//         		    			  var rowobji=$(e.target).closest('tr.jqgrow');
//         			    		  var textboxid=rowobji.attr('id');
//         			    		poLines_selectRow=textboxid;
//         			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
//         			    			e.target.select();
//         		    				//changePosition(poLines_selectRow);
//         		    			  } },
         	                        {
         		                         type: 'keypress',
         		                         fn: function(e) {
         		                        	 var key = e.which;
         		                    		 if(key == 13)  // the enter key code
         		                    		  {
         		                    			 searchPrMasterId=null;
         		                 			     searchProduct=null;
         		                    			// CalculatesoLinegrideditrowvalues(poLines_selectRow);
         		                    			 $("#lineItemGrid_ilsave").trigger("click");
         		                 			    $( "#lineItemGrid_iladd" ).trigger( "click" );
         		                    		    return false;  
         		                    		  }
         		                         }
         		                        }
         		    			  ]},editrules:{edithidden:false},  
				cellattr: function (rowId, tv, rawObject, cm, rdata)	 {return 'style="white-space: normal" ';}},
			{name:'notes', index:'notes', align:'right', width:50,hidden:true, editable:true, editoptions:{size:15, alignText:'right'},editrules:{edithidden:false}},
			{name:'notesdesc', index:'notesdesc', align:'right', width:50,hidden:true, editable:true, editoptions:{size:15, alignText:'right'},editrules:{edithidden:false}},
			{name:'quantityOrdered', index:'quantityOrdered', align:'center', width:20,hidden:false, editable:true, editoptions:{size:5, alignText:'left',maxlength:7,decimalPlaces: 2,
				dataEvents:  [
	   		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
	     		       				var rowobji=$(e.target).closest('tr.jqgrow');
	     			    			 var textboxid=rowobji.attr('id');
	     			    			poLines_selectRow=textboxid;
	     			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		       				  e.target.select(); 

	     		       			  } },
	     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
	     		    				  var rowobji=$(e.target).closest('tr.jqgrow');
	     		    				  var textboxid=rowobji.attr('id');
	     		    				poLines_selectRow=textboxid;
	     				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		    				  e.target.select();
	     		    				//  changePosition(poLines_selectRow);
	     		    			  }
	     		    			   },
	     		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
	     		    			 /* var rowobji=$(e.target).closest('tr.jqgrow');
	     			    		  var textboxid=rowobji.attr('id');
	     			    		poLines_selectRow=textboxid;
	     			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     			    			e.target.select();*/
	     		    				//changePosition(poLines_selectRow);
	     		    			  } },
	     	                        {
	     		                         type: 'keypress',
	     		                         fn: function(e) {
	     		                        	 var key = e.which;
	     		                    		 if(key == 13)  // the enter key code
	     		                    		  {
	     		                    			 searchPrMasterId=null;
	     		                 			     searchProduct=null;
	     		                    			// CalculatesoLinegrideditrowvalues(poLines_selectRow);
	     		                    			 $("#lineItemGrid_ilsave").trigger("click");
	     		                 			    $( "#lineItemGrid_iladd" ).trigger( "click" );
	     		                    		    return false;  
	     		                    		  }
	     		                         }
	     		                        }
	     		    			  ]},formatter:callFloorFigureMethod,editrules:{number:true,required: true}},
			{name:'quantityReceived', index:'quantityReceived', align:'center', width:40,hidden:true, editable:false, editoptions:{size:5, alignText:'right',
				dataEvents:  [
	   		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
	     		       				var rowobji=$(e.target).closest('tr.jqgrow');
	     			    			 var textboxid=rowobji.attr('id');
	     			    			poLines_selectRow=textboxid;
	     			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		       				  e.target.select(); 

	     		       			  } },
	     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
	     		    				  var rowobji=$(e.target).closest('tr.jqgrow');
	     		    				  var textboxid=rowobji.attr('id');
	     		    				poLines_selectRow=textboxid;
	     				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		    				  e.target.select();
	     		    				//  changePosition(poLines_selectRow);
	     		    			  }
	     		    			   },
	     		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
	     		    			  /*var rowobji=$(e.target).closest('tr.jqgrow');
	     			    		  var textboxid=rowobji.attr('id');
	     			    		poLines_selectRow=textboxid;
	     			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     			    			e.target.select();*/
	     		    				//changePosition(poLines_selectRow);
	     		    			  } },
	     	                        {
	     		                         type: 'keypress',
	     		                         fn: function(e) {
	     		                        	 var key = e.which;
	     		                    		 if(key == 13)  // the enter key code
	     		                    		  {
	     		                    			 searchPrMasterId=null;
	     		                 			     searchProduct=null;
	     		                    			// CalculatesoLinegrideditrowvalues(poLines_selectRow);
	     		                    			 $("#lineItemGrid_ilsave").trigger("click");
	     		                 			    $( "#lineItemGrid_iladd" ).trigger( "click" );
	     		                    		    return false;  
	     		                    		  }
	     		                         }
	     		                        }
	     		    			  ]},editrules:{edithidden:true}},
			{name:'invoicedAmount', index:'invoicedAmount', align:'center', width:40,hidden:true, editable:false, editoptions:{size:5, alignText:'right',
				dataEvents: [
	   		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
	     		       				var rowobji=$(e.target).closest('tr.jqgrow');
	     			    			 var textboxid=rowobji.attr('id');
	     			    			poLines_selectRow=textboxid;
	     			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		       				  e.target.select(); 

	     		       			  } },
	     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
	     		    				  var rowobji=$(e.target).closest('tr.jqgrow');
	     		    				  var textboxid=rowobji.attr('id');
	     		    				poLines_selectRow=textboxid;
	     				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		    				  e.target.select();
	     		    				//  changePosition(poLines_selectRow);
	     		    			  }
	     		    			   },
	     		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
	     		    			 /* var rowobji=$(e.target).closest('tr.jqgrow');
	     			    		  var textboxid=rowobji.attr('id');
	     			    		poLines_selectRow=textboxid;
	     			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     			    			e.target.select();*/
	     		    				//changePosition(poLines_selectRow);
	     		    			  } },
	     	                        {
	     		                         type: 'keypress',
	     		                         fn: function(e) {
	     		                        	 var key = e.which;
	     		                    		 if(key == 13)  // the enter key code
	     		                    		  {
	     		                    			 searchPrMasterId=null;
	     		                 			     searchProduct=null;
	     		                    			// CalculatesoLinegrideditrowvalues(poLines_selectRow);
	     		                    			 $("#lineItemGrid_ilsave").trigger("click");
	     		                 			    $( "#lineItemGrid_iladd" ).trigger( "click" );
	     		                    		    return false;  
	     		                    		  }
	     		                         }
	     		                        }
	     		    			  ]},editrules:{edithidden:true}},
			{name:'unitCost', index:'unitCost', align:'right', width:50,hidden:false, editable:true, editoptions:{size:15, alignText:'right',maxlength:10,decimalPlaces: 2,
				dataEvents:  [
	   		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
	     		       				var rowobji=$(e.target).closest('tr.jqgrow');
	     			    			 var textboxid=rowobji.attr('id');
	     			    			poLines_selectRow=textboxid;
	     			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		       				  e.target.select(); 

	     		       			  } },
	     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
	     		    				  var rowobji=$(e.target).closest('tr.jqgrow');
	     		    				  var textboxid=rowobji.attr('id');
	     		    				poLines_selectRow=textboxid;
	     				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		    				  e.target.select();
	     		    				//  changePosition(poLines_selectRow);
	     		    			  }
	     		    			   },
	     		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
	     		    			  /*var rowobji=$(e.target).closest('tr.jqgrow');
	     			    		  var textboxid=rowobji.attr('id');
	     			    		poLines_selectRow=textboxid;
	     			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     			    			e.target.select();*/
	     		    				//changePosition(poLines_selectRow);
	     		    			  } },
	     	                        {
	     		                         type: 'keypress',
	     		                         fn: function(e) {
	     		                        	 var key = e.which;
	     		                    		 if(key == 13)  // the enter key code
	     		                    		  {
	     		                    			 searchPrMasterId=null;
	     		                 			     searchProduct=null;
	     		                    			// CalculatesoLinegrideditrowvalues(poLines_selectRow);
	     		                    			 $("#lineItemGrid_ilsave").trigger("click");
	     		                 			    $( "#lineItemGrid_iladd" ).trigger( "click" );
	     		                    		    return false;  
	     		                    		  }
	     		                         }
	     		                        }
	     		    			  ]
			}, formatter:customCurrencyFormatter, editrules:{edithidden: true}},
			{name:'priceMultiplier', index:'priceMultiplier', align:'right', width:40,hidden:false, editable:true, editoptions:{size:15, alignText:'right',decimalPlaces: 4,
				dataEvents:  [
	   		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
	     		       				var rowobji=$(e.target).closest('tr.jqgrow');
	     			    			 var textboxid=rowobji.attr('id');
	     			    			poLines_selectRow=textboxid;
	     			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		       				  e.target.select(); 

	     		       			  } },
	     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
	     		    				  var rowobji=$(e.target).closest('tr.jqgrow');
	     		    				  var textboxid=rowobji.attr('id');
	     		    				poLines_selectRow=textboxid;
	     				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		    				  e.target.select();
	     		    				//  changePosition(poLines_selectRow);
	     		    			  }
	     		    			   },
	     		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
	     		    			 /* var rowobji=$(e.target).closest('tr.jqgrow');
	     			    		  var textboxid=rowobji.attr('id');
	     			    		poLines_selectRow=textboxid;
	     			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     			    			e.target.select();*/
	     		    				//changePosition(poLines_selectRow);
	     		    			  } },
	     	                        {
	     		                         type: 'keypress',
	     		                         fn: function(e) {
	     		                        	 var key = e.which;
	     		                    		 if(key == 13)  // the enter key code
	     		                    		  {
	     		                    			 searchPrMasterId=null;
	     		                 			     searchProduct=null;
	     		                    			// CalculatesoLinegrideditrowvalues(poLines_selectRow);
	     		                    			 $("#lineItemGrid_ilsave").trigger("click");
	     		                 			    $( "#lineItemGrid_iladd" ).trigger( "click" );
	     		                    		    return false;  
	     		                    		  }
	     		                         }
	     		                        }
	     		    			  ]}, formatter:'number', formatoptions:{decimalPlaces: 4},editrules:{number:true,required: true}},
			{name:'taxable', index:'taxable', align:'center',  width:20, hidden:false, editable:true, formatter:'checkbox', edittype:'checkbox', editrules:{edithidden:true}},
			{name:'netCast',index:'netCast',width:50 , align:'right',formatter:customCurrencyFormatter,hidden:true},
			{name:'quantityBilled', index:'quantityBilled', align:'right', width:50,hidden:false, editable:true, formatter:POtotalFormatter, editoptions:{size:15, alignText:'right',decimalPlaces: 4,
				dataEvents:  [
	   		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
	     		       				var rowobji=$(e.target).closest('tr.jqgrow');
	     			    			 var textboxid=rowobji.attr('id');
	     			    			poLines_selectRow=textboxid;
	     			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		       				  e.target.select(); 

	     		       			  } },
	     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
	     		    				  var rowobji=$(e.target).closest('tr.jqgrow');
	     		    				  var textboxid=rowobji.attr('id');
	     		    				poLines_selectRow=textboxid;
	     				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		    				  e.target.select();
	     		    				//  changePosition(poLines_selectRow);
	     		    			  }
	     		    			   },
	     		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
	     		    			 /* var rowobji=$(e.target).closest('tr.jqgrow');
	     			    		  var textboxid=rowobji.attr('id');
	     			    		poLines_selectRow=textboxid;
	     			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     			    			e.target.select();*/
	     		    				//changePosition(poLines_selectRow);
	     		    			  } },
	     	                        {
	     		                         type: 'keypress',
	     		                         fn: function(e) {
	     		                        	 var key = e.which;
	     		                    		 if(key == 13)  // the enter key code
	     		                    		  {
	     		                    			 searchPrMasterId=null;
	     		                 			     searchProduct=null;
	     		                    			// CalculatesoLinegrideditrowvalues(poLines_selectRow);
	     		                    			 $("#lineItemGrid_ilsave").trigger("click");
	     		                 			    $( "#lineItemGrid_iladd" ).trigger( "click" );
	     		                    		    return false;  
	     		                    		  }
	     		                         }
	     		                        }
	     		    			  ]},editrules:{edithidden:true}},
			{name:'vePoid', index:'vePoid', align:'right', width:50,hidden:true, editable:true, editoptions:{size:15, alignText:'right'},editrules:{edithidden:true,required: false}},
			{name:'prMasterId', index:'prMasterId', align:'right', width:50,hidden:true, editable:true, editoptions:{size:15, alignText:'right'},editrules:{edithidden:true,required: false}},
			{name:'vePodetailId', index:'vePodetailId', align:'right', width:50,hidden:true, editable:true, editoptions:{size:15, alignText:'right'},editrules:{edithidden:true,required: false}},
			{name:'posistion',index:'posistion',align:'left',width:70,editable:true,hidden: true, edittype:'text', editoptions:{size:30},editrules:{edithidden:false,required:false}},
			{name:'upAndDown',index:'upAndDown',align:'left',width:50, formatter: upAndDownImage,hidden:true},
			{name:'taxTotal', index:'taxTotal', align:'center', width:20,hidden:true},
			{name:'ackDate', index:'ackDate', align:'center', width:50,hidden:false, editable:true,   editoptions:{size:15, align:'center',
				dataEvents:  [
	   		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
	     		       				var rowobji=$(e.target).closest('tr.jqgrow');
	     			    			 var textboxid=rowobji.attr('id');
	     			    			poLines_selectRow=textboxid;
	     			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		       				  e.target.select(); 

	     		       			  } },
	     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
	     		    				  var rowobji=$(e.target).closest('tr.jqgrow');
	     		    				  var textboxid=rowobji.attr('id');
	     		    				poLines_selectRow=textboxid;
	     				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		    				  e.target.select();
	     		    				//  changePosition(poLines_selectRow);
	     		    			  }
	     		    			   },
	     		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
	     		    			 /* var rowobji=$(e.target).closest('tr.jqgrow');
	     			    		  var textboxid=rowobji.attr('id');
	     			    		poLines_selectRow=textboxid;
	     			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     			    			e.target.select();*/
	     		    				//changePosition(poLines_selectRow);
	     		    			  } },
	     	                        {
	     		                         type: 'keypress',
	     		                         fn: function(e) {
	     		                        	 var key = e.which;
	     		                    		 if(key == 13)  // the enter key code
	     		                    		  {
	     		                    			 searchPrMasterId=null;
	     		                 			     searchProduct=null;
	     		                    			// CalculatesoLinegrideditrowvalues(poLines_selectRow);
	     		                    			 $("#lineItemGrid_ilsave").trigger("click");
	     		                 			    $( "#lineItemGrid_iladd" ).trigger( "click" );
	     		                    		    return false;  
	     		                    		  }
	     		                         }
	     		                        }
	     		    			  ]
			},editrules:{edithidden:false}},//formatter:'date',, formatoptions:{ srcformat: 'd-m-Y',newformat:'m/d/Y'}
			{name:'shipDate', index:'shipDate', align:'center', width:50,hidden:false, editable:true, editoptions:{size:15, alignText:'center',
				dataEvents:  [
	   		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
	     		       				var rowobji=$(e.target).closest('tr.jqgrow');
	     			    			 var textboxid=rowobji.attr('id');
	     			    			poLines_selectRow=textboxid;
	     			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		       				  e.target.select(); 

	     		       			  } },
	     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
	     		    				  var rowobji=$(e.target).closest('tr.jqgrow');
	     		    				  var textboxid=rowobji.attr('id');
	     		    				poLines_selectRow=textboxid;
	     				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		    				  e.target.select();
	     		    				//  changePosition(poLines_selectRow);
	     		    			  }
	     		    			   },
	     		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
	     		    			  /*var rowobji=$(e.target).closest('tr.jqgrow');
	     			    		  var textboxid=rowobji.attr('id');
	     			    		poLines_selectRow=textboxid;
	     			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     			    			e.target.select();*/
	     		    				//changePosition(poLines_selectRow);
	     		    			  } },
	     	                        {
	     		                         type: 'keypress',
	     		                         fn: function(e) {
	     		                        	 var key = e.which;
	     		                    		 if(key == 13)  // the enter key code
	     		                    		  {
	     		                    			 searchPrMasterId=null;
	     		                 			     searchProduct=null;
	     		                    			// CalculatesoLinegrideditrowvalues(poLines_selectRow);
	     		                    			 $("#lineItemGrid_ilsave").trigger("click");
	     		                 			    $( "#lineItemGrid_iladd" ).trigger( "click" );
	     		                    		    return false;  
	     		                    		  }
	     		                         }
	     		                        }
	     		    			  ]}, editrules:{edithidden:false}},//formatter:'date',, formatoptions:{srcformat: 'd-m-Y',newformat:'m/d/Y'}
			{name:'vendorOrderNumber', index:'vendorOrderNumber', align:'right', width:50,hidden:false, editable:true, editoptions:{size:15, alignText:'right',
				dataEvents:  [
	   		       			  { type: 'focus', data: { i: 7 }, fn: function(e) {
	     		       				var rowobji=$(e.target).closest('tr.jqgrow');
	     			    			 var textboxid=rowobji.attr('id');
	     			    			poLines_selectRow=textboxid;
	     			    			  		jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		       				  e.target.select(); 

	     		       			  } },
	     		    			  { type: 'click', data: { i: 7 }, fn: function(e) { 
	     		    				  var rowobji=$(e.target).closest('tr.jqgrow');
	     		    				  var textboxid=rowobji.attr('id');
	     		    				poLines_selectRow=textboxid;
	     				    		  jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     		    				  e.target.select();
	     		    				//  changePosition(poLines_selectRow);
	     		    			  }
	     		    			   },
	     		    			  { type: 'change', data: { i: 7 }, fn: function(e) {
	     		    			 /* var rowobji=$(e.target).closest('tr.jqgrow');
	     			    		  var textboxid=rowobji.attr('id');
	     			    		poLines_selectRow=textboxid;
	     			    			jQuery("#lineItemGrid").jqGrid('setSelection',poLines_selectRow, true);
	     			    			e.target.select();*/
	     		    				//changePosition(poLines_selectRow);
	     		    			  } },
	     	                        {
	     		                         type: 'keypress',
	     		                         fn: function(e) {
	     		                        	 var key = e.which;
	     		                    		 if(key == 13)  // the enter key code
	     		                    		  {
	     		                    			 searchPrMasterId=null;
	     		                 			     searchProduct=null;
	     		                    			// CalculatesoLinegrideditrowvalues(poLines_selectRow);
	     		                    			 $("#lineItemGrid_ilsave").trigger("click");
	     		                 			    $( "#lineItemGrid_iladd" ).trigger( "click" );
	     		                    		    return false;  
	     		                    		  }
	     		                         }
	     		                        }
	     		    			  ]},editrules:{edithidden:false}},
			{name:'inLineNote', index:'inLineNote', align:'center', width:20,hidden:true},
			{name:'canDeletePO', index:'canDeletePO', align:'center',  width:20, hidden:false, editable:false, formatter:canDeletePOCheckboxFormatter,   editrules:{edithidden:true}}
			],
		rowNum: 0, pgbuttons: false, recordtext: '', rowList: [], pgtext: null, viewrecords: false,
		sortname: 'vePodetailId', sortorder: "asc", imgpath: 'themes/basic/images', caption: false,
		height:482.5,	width:910, rownumbers:true, altRows: true,viewrecords: true, altclass:'myAltRowClass',
		//editurl:"./jobtabs5/manpulaterPOReleaseLineItem",
		caption: 'Line Item',
		
		jsonReader : {
			root: "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: false,
			cell: "cell",
			id: "id",
			userdata: "userdata",
			
		},
		loadBeforeSend: function(xhr) {
			posit_outside_purchaseorder= jQuery("#lineItemGrid").closest(".ui-jqgrid-bdiv").scrollTop();
		},
		loadComplete: function(data) {/* 
			
			try{
				$('#lineItemGrid_inLineNoteImage').removeClass("ui-state-default ui-th-column ui-th-ltr");
				var ids = $('#lineItemGrid').jqGrid('getDataIDs');
			    if (ids) {
			    	console.log("if loop");
			        var sortName = $('#lineItemGrid').jqGrid('getGridParam','inLineNoteImage');
			        var sortOrder = $('#lineItemGrid').jqGrid('getGridParam','description');
			        for (var i=0;i<ids.length;i++) {
			        	console.log("if loop ::: "+ids[i]);
			        	$('#lineItemGrid').jqGrid('setCell', ids[i], 'inLineNoteImage', '', '',
			                        {style:'border-right-color: transparent !important;'});
			        	$('#lineItemGrid').jqGrid('setCell', ids[i], 'description', '', '',
		                        {style:'border-left-color: transparent !important;'});
			        }
			    }
			    editPOGlobalGridRowsOut = $('#lineItemGrid').getRowData();
				editPOGlobalGridOut = JSON.stringify(editPOGlobalGridRowsOut);
				}
				catch(e){
					alert(e.message);
				}
			
			var aSelectedRowId = $("#lineItemGrid").jqGrid('getGridParam', 'selrow');
			var aSelectedPositionDetailID = $("#lineItemGrid").jqGrid('getCell', aSelectedRowId, 'taxTotal');
			var allRowsInGrid = $('#lineItemGrid').jqGrid('getRowData');
			var aVal = new Array(); 
			var aTax = new Array();
			var sum = 0;
			var taxAmount = 0;
			var aTotal = 0;
			$.each(allRowsInGrid, function(index, value) {
				aVal[index] = value.quantityBilled;
				var number1 = aVal[index].replace("$", "");
				var number2 = number1.replace(".00", "");
				var number3 = number2.replace(",", "");
				var number4 = number3.replace(",", "");
				var number5 = number4.replace(",", "");
				var number6 = number5.replace(",", "");
				sum = Number(sum) + Number(number6); 
			});
			$('#subtotalGeneralId').val(formatCurrencynodollar(sum));
			$('#subtotalLineId').val(formatCurrencynodollar(sum));
			$('#subtotalKnowledgeId').val(formatCurrencynodollar(sum));
			$.each(allRowsInGrid, function(index, value) { 
				aVal[index] = value.taxable;
				if (aVal[index] === 'Yes'){
					aTax[index] = value.quantityBilled;
					var number1 = aTax[index].replace("$", "");
					var number2 = number1.replace(".00", "");
					var number3 = number2.replace(",", "");
					var number4 = number3.replace(",", "");
					var number5 = number4.replace(",", "");
					var number6 = number5.replace(",", "");
					var taxValue = $('#taxLineId').val();
					taxAmount = taxAmount + Number(number6)*(taxValue/100);
				}
			});
			$('#generalID').val(formatCurrencynodollar(taxAmount));
			if(isNaN(aSelectedPositionDetailID)||aSelectedPositionDetailID=='false'||aSelectedPositionDetailID==false){
				aSelectedPositionDetailID = '0.00';
			}
			$('#lineID').val(formatCurrencynodollar(aSelectedPositionDetailID));
			$('#KnowledgeID').val(formatCurrencynodollar(taxAmount));
			var frieghtvalue=Number($("#freightGeneralId").val().replace(/[^0-9\.]+/g,""));
			aTotal = aTotal + sum + taxAmount +frieghtvalue;
			$('#totalGeneralId').val(formatCurrencynodollar(aTotal));
			$('#totalLineId').val(formatCurrencynodollar(aTotal));
			$('#totalKnowledgeId').val(formatCurrencynodollar(aTotal));
			$("#lineItemGrid").trigger("reload");
			$("#freightLineId").val(formatCurrencynodollar(freight));
			$("#taxLineId").val($("#Tax_ID").text());
			var last = $(this).jqGrid('getGridParam','records');
			var hideDownIcon = Number(last)+1;
			var alignUpIcon = Number(last);
			if(last){
				$("#"+hideDownIcon+"_downIcon").css("display", "none");
				$("#"+alignUpIcon+"_upIcon").css({"position": "relative","left":"-9px","padding":"0px 12px "});
			}
			$("#lineItemGrid").trigger("reloadGrid");
			$("#Ack").trigger("reloadGrid");
			 */
			  $("#lineItemGrid").setSelection(1, true);
				var ids = $('#lineItemGrid').jqGrid('getDataIDs');
			    mytestmethod_loc_var=true;
			    $( "#lineItemGrid_iladd" ).trigger( "click" );
			 //   $("#salesorder_whsecost").val(formatCurrency("0.00"));
			   /* if(salesOrderFlag==null){			    	
			    	$(".ui-icon-folder-collapsed").css({"width":"76px","height":"21.5px","background":"url('./../resources/images/CopyRow.png')","position":"inherit","top":"-2px"});
			    }else{
			    	$(".ui-icon-folder-collapsed").css({"width":"76px","height":"21.5px","background":"url('./../resources/images/inline_template.PNG')","position":"inherit","top":"-2px"});			    	
			    }*/
			  //  searchPrMasterId=null;
			 //   searchProduct=null;
			    $(".ui-icon-newwin").css({"background":"url('./../resources/images/CopyRow.png')"});
				
			    if(POlineItemgridLoad){
		           	 var gridRows = $('#lineItemGrid').getRowData();
		           	Purchase_lines_form =  JSON.stringify(gridRows);
			             POlineItemgridLoad=true;
		            }
			    SetoverAllPOTotal();
	            POLineItemTabformChanges();
		},
		gridComplete: function () {
	      	jQuery("#lineItemGrid").closest(".ui-jqgrid-bdiv").scrollTop(posit_outside_purchaseorder);
	        posit_outside_purchaseorder=0;
	        /*SetoverAllPOTotal();
	        if(POlineItemgridLoad){
           	 var gridRows = $('#lineItemGrid').getRowData();
           	Purchase_lines_form =  JSON.stringify(gridRows);
           	var freightLineId=$("#freightLineId").val();
    	    if((freightLineId+"").contains("$")){
    	    	freightLineId=freightLineId.replace(/[^0-9\.-]+/g,"");
    	    }
    	    Purchase_lines_form=Purchase_lines_form+formatCurrency(freightLineId);
	        POlineItemgridLoad=true;
            }else{
            POlineItemgridLoad=true;
            }
            POLineItemTabformChanges();
            TinyMCETextEditorForAllInitsetup(560,220,true);*/
		},
		loadError : function (jqXHR, textStatus, errorThrown){	},
		onSelectRow:  function(id){
			selectedLineItemGrid=id;
			//id= id.replace(/[^0-9\.]+/g,"");					
			selectedLineItem = id;
		},	   
		ondblClickRow: function(id){
			var lastSel = '';
		     if(id && id!==lastSel){ 
		        jQuery(this).restoreRow(lastSel); 
		        lastSel=id; 
		     }
		     
		     if(id=="new_row"){
				 
			 }else{
				 posit_outside_purchaseorder= jQuery("#lineItemGrid").closest(".ui-jqgrid-bdiv").scrollTop();
				 $("#lineItemGrid_ilcancel").trigger("click");
			     $("#lineItemGrid_iledit").trigger("click");
			 }
		},
		cellsubmit: 'clientArray',
		editurl: 'clientArray',
		alertzIndex:1050,
		shrinkToFit : true
	 }).navGrid("#lineItemPager", {
			add : false,
			edit : false,
			del : false,
			alertzIndex : 10000,
			search : false,
			refresh : false,
			pager : true,
			alertcap : "Warning",
			alerttext : 'Please select a Product'
		},
		// -----------------------edit// options----------------------//
		{},
		// -----------------------add options----------------------//
		{},
		// -----------------------Delete options----------------------//
		{}); 

	 $("#lineItemGrid").jqGrid(
				'inlineNav',
				'#lineItemPager',
				{
					edit : true,
					add : true,
					zIndex : 1234,
					refresh : false,
					cloneToTop : true,
					alertzIndex : 1234,
					addParams : {
						position: "last",
						addRowParams : {
							keys : false,
							oneditfunc : function(id) {
								$("#"+id+"_ackDate").datepicker();
								$("#"+id+"_shipDate").datepicker();
								getProductDetails();
							},
							successfunc : function(response) {
								return true;
							},
							aftersavefunc : function(response) {
								var ids = $("#lineItemGrid").jqGrid('getDataIDs');
								var veaccrrowid;
								if(ids.length==1){
									veaccrrowid = 0;
								}else{
									var idd = jQuery("#lineItemGrid tr").length;
									for(var i=0;i<ids.length;i++){
										if(idd<ids[i]){
											idd=ids[i];
										}
									}
									 veaccrrowid= idd;
									 $("#new_row_itemCode").focus();
								}
								if(selectedLineItemGrid=="new_row"){
									console.log("IFselectedLineItemGrid"+selectedLineItemGrid); 
									$("#" + selectedLineItemGrid).attr("id", Number(veaccrrowid)+1);
									var changeidnum=Number(veaccrrowid)+1;
									$("#canDeletePOID_new_row").attr("id","canDeletePOID_"+changeidnum);
									$("#openinventorydetailspopup_new_row").attr("id","openinventorydetailspopup_"+changeidnum);
									$("#PONoteImageIcon_new_row").attr("id","PONoteImageIcon_"+changeidnum);
									//$("#openinventorydetailspopup_new_row").attr("id", Number(veaccrrowid)+1);openinventorydetailspopup_
//									$("#canDeleteSOID_new_row").attr("onclick","setsoLinegridTotal();deleteSOCheckboxChanges("+(Number(veaccrrowid)+1)+")");
									$("#openinventorydetailspopup_"+changeidnum).attr("onclick","openinventorydetailspopup("+changeidnum+")");
									$("#canDeletePOID_"+changeidnum).attr("onclick","SetoverAllPOTotal();deleteRowFromJqGrid_PO("+changeidnum+");POLineItemTabformChanges();");
									$("#PONoteImageIcon_"+changeidnum).attr("onclick","ShowPOLineNote('"+changeidnum+"');");
									
									
									}
								
								
								
								/*var grid=$("#lineItemGrid");
								grid.jqGrid('resetSelection');
							    var dataids = grid.getDataIDs();
							    for (var i=0, il=dataids.length; i < il; i++) {
							        grid.jqGrid('setSelection',dataids[i], false);
							    }*/
							    SetoverAllPOTotal();
							    POLineItemTabformChanges();
								$( "#lineItemGrid_iladd" ).trigger( "click" );
								$("#lineItemGrid").jqGrid('resetSelection');
								var grid=$("#lineItemGrid");
								grid.jqGrid('resetSelection');
							    var dataids = grid.getDataIDs();
							    for (var i=0, il=dataids.length; i < il; i++) {
							        grid.jqGrid('setSelection',dataids[i], false);
							    }
							    $("#lineItemGrid").jqGrid('setSelection','new_row', true);
							    
							    $('#ImgPOPDF').empty();
								  $('#ImgPOPDF').append('<input type="image" src="./../resources/Icons/PDF_new_disabled.png" title="View Purchase Order" return false;" style="background: #EEDEBC;cursor:default;">');
								  $('#ImgPOEmail').empty();
								  $('#ImgPOEmail').append('<input id="contactEmailID" type="image" src="./../resources/Icons/mail_new_disabled.png" title="Email Purchase Order" style="background: #EEDEBC;cursor:default;" return false;">');
							
							   
							},
							errorfunc : function(rowid, response) {
								return false;
							},
							afterrestorefunc : function(rowid) {
								
							}
						}
					},
					editParams : {
						keys : false,
						successfunc : function(response) {
							return true;
						},
						aftersavefunc : function(id) {

							var ids = $("#lineItemGrid").jqGrid('getDataIDs');
							var veaccrrowid;
							if(ids.length==1){
								veaccrrowid = 0;
							}else{
								var idd = jQuery("#lineItemGrid tr").length;
								for(var i=0;i<ids.length;i++){
									if(idd<ids[i]){
										idd=ids[i];
									}
								}
								 veaccrrowid= idd;
								 $("#new_row_itemCode").focus();
							}
							console.log("Edit"+selectedLineItemGrid); 
							if(selectedLineItemGrid=="new_row"){
								console.log("IFselectedLineItemGrid"+selectedLineItemGrid); 
								$("#" + selectedLineItemGrid).attr("id", Number(veaccrrowid)+1);
								var changeidnum=Number(veaccrrowid)+1;
								$("#canDeletePOID_new_row").attr("id","canDeletePOID_"+changeidnum);
								$("#openinventorydetailspopup_new_row").attr("id","openinventorydetailspopup_"+changeidnum);
								$("#PONoteImageIcon_new_row").attr("id","PONoteImageIcon_"+changeidnum);
								//$("#openinventorydetailspopup_new_row").attr("id", Number(veaccrrowid)+1);openinventorydetailspopup_
//								$("#canDeleteSOID_new_row").attr("onclick","setsoLinegridTotal();deleteSOCheckboxChanges("+(Number(veaccrrowid)+1)+")");
								$("#openinventorydetailspopup_"+changeidnum).attr("onclick","openinventorydetailspopup("+changeidnum+")");
								$("#canDeletePOID_"+changeidnum).attr("onclick","SetoverAllPOTotal();deleteRowFromJqGrid_PO("+changeidnum+");POLineItemTabformChanges();");
								$("#PONoteImageIcon_"+changeidnum).attr("onclick","ShowPOLineNote('"+changeidnum+"');");
								}
							
							/*var grid=$("#lineItemGrid");
							grid.jqGrid('resetSelection');
						    var dataids = grid.getDataIDs();
						    for (var i=0, il=dataids.length; i < il; i++) {
						        grid.jqGrid('setSelection',dataids[i], false);
						    }*/
						    SetoverAllPOTotal();
						    POLineItemTabformChanges();
						    $( "#lineItemGrid_iladd" ).trigger( "click" );
							$("#lineItemGrid").jqGrid('resetSelection');
							var grid=$("#lineItemGrid");
							grid.jqGrid('resetSelection');
						    var dataids = grid.getDataIDs();
						    for (var i=0, il=dataids.length; i < il; i++) {
						        grid.jqGrid('setSelection',dataids[i], false);
						    }
						    $("#lineItemGrid").jqGrid('setSelection','new_row', true);
						    
						    $('#ImgPOPDF').empty();
							  $('#ImgPOPDF').append('<input type="image" src="./../resources/Icons/PDF_new_disabled.png" title="View Purchase Order" return false;" style="background: #EEDEBC;cursor:default;">');
							  $('#ImgPOEmail').empty();
							  $('#ImgPOEmail').append('<input id="contactEmailID" type="image" src="./../resources/Icons/mail_new_disabled.png" title="Email Purchase Order" style="background: #EEDEBC;cursor:default;" return false;">');
						
						   
						},
						errorfunc : function(rowid, response) {
							
						},
						afterrestorefunc : function( id ) {
							
						},
						oneditfunc : function(id) {
							console.log('OnEditfunc'+id);
							$("#"+id+"_ackDate").datepicker();
							$("#"+id+"_shipDate").datepicker();
							var unitcost=$("#"+id+"_unitCost").val();
							unitcost=unitcost.replace(/[^0-9\-.]+/g,"");
							if(unitcost==undefined ||unitcost==""||unitcost==null){
								unitcost=0.00;
							}
							var amount=$("#"+id+"_quantityBilled").val();
							amount=amount.replace(/[^0-9\-.]+/g,"");
							if(amount==undefined ||amount==""||amount==null){
								amount=0.00;
							}
							$("#"+id+"_quantityBilled").val(amount);
							$("#"+id+"_unitCost").val(unitcost);
						
						}
					},restoreAfterSelect :false
				});
	
	 		/*$("#lineItemGrid").jqGrid('navButtonAdd',"#lineItemPager",{ caption:"", buttonicon:"ui-icon-document", onClickButton:openLineItemNoteDialog, position: "after", title:"Inline Note", cursor: "pointer"});
	 		$("#lineItemGrid").jqGrid('navButtonAdd',"#lineItemPager",{ caption:"", buttonicon:"ui-icon-bookmark", onClickButton:showInvoicedReceived, position: "after", title:"Show Received/Invoiced", cursor: "pointer"});
	 		*/
	 		//Drag And DROP
	 		jQuery("#lineItemGrid").jqGrid('sortableRows');
	 		jQuery("#lineItemGrid").jqGrid('gridDnD');


	 		$("#lineItemGrid_iladd").click(function() {
	 		/*	$('#SaveLinesPOButton').css('background','-webkit-gradient(linear, left top, left bottom, from(#C1C3CA), to(#A4A4A5))');
	 			$('#CancelLinesPOButton').css('background','-webkit-gradient(linear, left top, left bottom, from(#C1C3CA), to(#A4A4A5))');
	 			document.getElementById("SaveLinesPOButton").disabled = true;
	 			document.getElementById("CancelLinesPOButton").disabled = true;
	 		*/});
	 		$("#lineItemGrid_iledit").click(function() {
	 		/*	$('#SaveLinesPOButton').css('background','-webkit-gradient(linear, left top, left bottom, from(#C1C3CA), to(#A4A4A5))');
	 			$('#CancelLinesPOButton').css('background','-webkit-gradient(linear, left top, left bottom, from(#C1C3CA), to(#A4A4A5))');
	 			document.getElementById("SaveLinesPOButton").disabled = true;
	 			document.getElementById("CancelLinesPOButton").disabled = true;
	 		*/});

	 		$("#lineItemGrid_ilsave").click(function() {
	 			/*document.getElementById("SaveLinesPOButton").disabled = false;
	 			document.getElementById("CancelLinesPOButton").disabled = false;
	 			$('#SaveLinesPOButton').css('background','-webkit-gradient(linear, left top, left bottom, from(#637c92), to(#3b4f60))');
	 			$('#CancelLinesPOButton').css('background','-webkit-gradient(linear, left top, left bottom, from(#637c92), to(#3b4f60))');
	 		    */});


	 		$("#lineItemGrid_ilcancel").click(function() {
	 		/*	document.getElementById("SaveLinesPOButton").disabled = false;
	 			document.getElementById("CancelLinesPOButton").disabled = false;
	 			$('#SaveLinesPOButton').css('background','-webkit-gradient(linear, left top, left bottom, from(#637c92), to(#3b4f60))');
	 			$('#CancelLinesPOButton').css('background','-webkit-gradient(linear, left top, left bottom, from(#637c92), to(#3b4f60))');
	 		*/});
}

function getProductDetails(){
	var celValue = $('#vePOID').val();
	$.ajax({
	    url: "./userlistcontroller/getVendorProductDetails",
	    type: 'POST',
	    success: function(data){
	    	//console.log(']ENI'+data);
	    	$("#new_row_prMasterId").val(data);
	    	$.ajax({
		        url: './getLineItems?prMasterId='+data,
		        type: 'POST',       
		        success: function (data) {
		        	var IncTaxOnPOAndInvoices=getSysvariableStatusBasedOnVariableName('IncTaxOnPOAndInvoices');
		        	$.each(data, function(key, valueMap) {
						
						
		        		if("lineItems"==key)
						{				
							$.each(valueMap, function(index, value){						
									$("#new_row_note").val(value.itemCode);
									$("#new_row_description").val(value.description);
									$("#new_row_unitCost").val(value.lastCost);
									$("#new_row_priceMultiplier").val(value.pomult);
									$("#new_row_sopopup").val(value.sopopup);
									$("#new_row_vePoid").val(celValue);
									var includetaxchecked=(IncTaxOnPOAndInvoices==null)?0:IncTaxOnPOAndInvoices[0].valueLong;
									if((value.isTaxable == 1 && includetaxchecked==1)
									|| (value.isTaxable == 0 && includetaxchecked==1)		
									){
										$("#new_row_taxable").prop("checked",true);
									}
									else
									{
										$("#new_row_taxable").prop("checked",false);
									}
							
							}); 												
						}	
					
		        	});							
		        	$("#new_row_description").focus();
		        }
		    });
	    	
	    }
	});
}



function SetoverAllPOTotal(){
	var allRowsInGrid = $('#lineItemGrid').jqGrid('getRowData');
	var aVal = new Array(); 
	var aTax = new Array();
	var sum = 0;
	 var totalamount=0;
	 var taxamount=0;
	 var taxcellValue;
	var aTotal = 0;
	
	
	
	var ids = $("#lineItemGrid").jqGrid('getDataIDs');
	/*$.each(allRowsInGrid, function(index, value) {
		aVal[index] = value.quantityBilled;
		var number1 = aVal[index].replace("$", "");
		var number2 = number1.replace(".00", "");
		var number3 = number2.replace(",", "");
		var number4 = number3.replace(",", "");
		var number5 = number4.replace(",", "");
		var number6 = number5.replace(",", "");
		
		var id="#canDeletePOID_"+ids[index];
		var canDo=$(id).is(':checked');
		if(!canDo){
		sum = Number(sum) + Number(number6); 
		
		aVal[index] = value.taxable;
		if (aVal[index] === 'Yes'){
			aTax[index] = value.quantityBilled;
			var number1 = aTax[index].replace("$", "");
			var number2 = number1.replace(".00", "");
			var number3 = number2.replace(",", "");
			var number4 = number3.replace(",", "");
			var number5 = number4.replace(",", "");
			var number6 = number5.replace(",", "");
			var taxValue = $('#taxLineId').val();
			taxAmount = taxAmount + Number(number6)*(taxValue/100);
		}
		}
	});*/
	
	
	for(var i=0;i<ids.length;i++){
		 var selectedRowId=ids[i];
		 if(selectedRowId!="new_row"){
		 cellValue =$("#lineItemGrid").jqGrid ('getCell', selectedRowId, 'quantityBilled');
		 taxcellValue=$("#lineItemGrid").jqGrid ('getCell', selectedRowId, 'taxable');
		 var id="#canDeletePOID_"+selectedRowId;
		 var canDo=$(id).is(':checked');
		 if(taxcellValue=="Yes"){
			 var eachamount=parseFloat(floorFigureoverall(cellValue.replace(/[^0-9\.-]+/g,""),2));
			 var multiplyamount=eachamount*Number(taxpercentage)/100;
			 if(!canDo){
			 taxamount=Number(taxamount)+Number(multiplyamount);
			
			 }
		 }
		var cellvalueamt=Number(parseFloat(cellValue.replace(/[^0-9\.-]+/g,"")).toFixed(3));
		//alert(parseFloat(cellValue.replace(/[^0-9\.-]+/g,"")).toFixed(2));
		if(!canDo){
		 totalamount=cellvalueamt+totalamount;
		 totalamount=Number(floorFigureoverall(totalamount,2));
		}
		 }
	 }
	
	
	$('#subtotalGeneralId').val(Number(floorFigureoverall(totalamount, 2)));
	$('#subtotalLineId').val(Number(floorFigureoverall(totalamount,2)));
	$('#subtotalKnowledgeId').val(Number(floorFigureoverall(totalamount,2)));
	$('#generalID').val(Number(floorFigureoverall(taxamount,2)));
	$('#lineID').val(Number(floorFigureoverall(taxamount,2)));
	$('#KnowledgeID').val(Number(floorFigureoverall(taxamount,2)));
	
	var frieghtvalue=Number($("#freightGeneralId").val().replace(/[^0-9\.]+/g,""));
	if(frieghtvalue==undefined ||frieghtvalue=="" || frieghtvalue==null ||frieghtvalue=="null"){
		frieghtvalue=0.00;
		}
	
	aTotal = aTotal + totalamount + Number(floorFigureoverall(taxamount,2)) +frieghtvalue;
	$('#totalGeneralId').val(Number(floorFigureoverall(aTotal,2)));
	$('#totalLineId').val(Number(floorFigureoverall(aTotal,2)));
	$('#totalKnowledgeId').val(Number(floorFigureoverall(aTotal,2)));
	$("#freightLineId").val(Number(floorFigureoverall(frieghtvalue,2)));
	//$("#taxLineId").val($("#Tax_ID").text());
}
function POtotalFormatter(cellValue, options, rowObject){
	var rowid = options.rowId;
	
	var unitCost=rowObject['unitCost'];
	var priceMultiplier= rowObject['priceMultiplier'];
	var quantityOrdered = rowObject['quantityOrdered'];

	if(isNaN(unitCost)){
		unitCost=0;
	}
	unitCost=Number(floorFigureoverall(unitCost,2));
	if(isNaN(priceMultiplier)){
		priceMultiplier=0;
	}else{
		priceMultiplier=Round_priceMultiplier(priceMultiplier);
	}
	if(isNaN(quantityOrdered)){
		quantityOrdered=0;
	}else{
		quantityOrdered=Number(floorFigureoverall(quantityOrdered,2));
	}
	if(priceMultiplier==0){
		priceMultiplier=1;
	}
	var total =unitCost*priceMultiplier*quantityOrdered;
	return formatCurrency(total);
	
}

function ReOrderButtonClick(){
	var WareHouseId=0;
	if($("#PO_Shiptooutside").contents().find("#shiptomoderhiddenid").val()==0){
		WareHouseId= $("#PO_Shiptooutside").contents().find("#shiptoaddrhiddenfromuiid").val();
	}
	
	var VendorID=$("#vendorID").val();
	var vePOID=$("#vePOID").val();

	 var gridRows = $('#lineItemGrid').getRowData();
	 var dataToSend = JSON.stringify(gridRows);
	 //POlineItemgridLoad=false;
	 jQuery("#lineItemGrid").jqGrid('setGridParam',{url:"./vendorscontroller/ReorderInsertNew",postData:{"gridData":dataToSend,"WareHouseId" : WareHouseId, "VendorID" : VendorID,"vePOID":vePOID}}).trigger("reloadGrid");
	/* $.ajax({ 
		url: "./vendorscontroller/ReorderInsert",
		mType: "GET",
		data : {'WareHouseId' : WareHouseId, 'VendorID' : VendorID,
				'vePOID':vePOID
			},
		success: function(data){
			jQuery("#lineItemGrid").trigger("reloadGrid");
		}
	}); */
	} 

function SaveLinesPurchaseOrder(popupdetail){
	//BID1633 Simon
	//alert("editpurchaseOrder.js  is calling.....!");
	$("#SaveLinesPOButton").prop('disabled', true);
	var newDialogDiv = jQuery(document.createElement('div'));
	
	var vePOID = $("#vePOID").val();
	var Frieght = $('#freightLineId').val();
	Frieght= parseFloat(Frieght.replace(/[^0-9-.]/g, ''));
	var subTotal = $('#subtotalLineId').val();
	subTotal= parseFloat(subTotal.replace(/[^0-9-.]/g, ''));
	var Total = $('#totalLineId').val();
	Total= parseFloat(Total.replace(/[^0-9-.]/g, ''));
	var taxValue = $('#lineID').val();
	taxValue = parseFloat(taxValue.replace(/[^0-9-.]/g, ''));


	  var rows = jQuery("#lineItemGrid").getDataIDs();
	/*  var deletePOLineDetailID=new Array();
		 for(var a=0;a<rows.length;a++)
		 {
		    row=jQuery("#lineItemGrid").getRowData(rows[a]);
		   var id="#canDeletePOID_"+rows[a];
		   var canDeletepO=$(id).is(':checked');
		   console.log(rows[a]+"canDeletepO=="+canDeletepO);
		   if(canDeletepO){
			  var var_vepoDetailID=row['vePodetailId'];
			  if(var_vepoDetailID!=undefined && var_vepoDetailID!=null && var_vepoDetailID!="" && var_vepoDetailID!=0){
				  deletePOLineDetailID.push(var_vepoDetailID);
			 	}
			 $('#lineItemGrid').jqGrid('delRowData',rows[a]);
		  }
	}*/ 
	
	var gridRows = $('#lineItemGrid').getRowData();
	var dataToSend = JSON.stringify(gridRows);
	console.log("PO:"+dataToSend);
	$.ajax({
		url: "./jobtabs5/SaveLinesPurchaseOrder",
		type: "POST",
		async:false,
		data :{ "vePOID":vePOID,"frieght":Frieght,"subTotal":subTotal,"Total":Total,"taxValue":taxValue,			
			"gridData":dataToSend,
			"DelPOData":deletePOLineDetailID
			},
		success: function(data) {
			$('#ShowInfo').html("Saved");
			jQuery("#lineItemGrid").jqGrid('setGridParam',{url:'./jobtabs5/jobReleaseLineItem',postData: {vePoId :function(){var vePOID=aVePoId;if(vePOID==null || vePOID==''){vePOID=0;}return vePOID;}}}).trigger("reloadGrid");
			 setTimeout(function(){
				$('#ShowInfo').html("");						
				},3000); 
			 if(popupdetail=="close"){
				 document.location.href = "./po_list";
			 }
			 $('#ImgPOPDF').empty();
			  $('#ImgPOPDF').append('<input type="image" src="./../resources/Icons/PDF_new.png" title="View Purchase Order" onclick="viewPOPDF();"	style="background: #EEDEBC;" id="lineTabPDF">');

			  $('#ImgPOEmail').empty();
			  //3.0.68 fix
			  $('#ImgPOEmail').append(' <input id="contactEmailID" type="image" src="./../resources/Icons/mail_new.png" title="Email Purchase Order" style="background: #EEDEBC" id="lineTabMail" onclick="outsidepoEmailButtonAction();">');
			
			// $( "#salesreleasetab ul li:nth-child(1)" ).removeClass("ui-state-disabled");
			  deletePOLineDetailID=new Array();
		}
	});
	//BID1633 Simon
	 setTimeout(function(){
	 $("#SaveLinesPOButton").prop('disabled', false);		
	 },3000);
}

/*function canDeletePOCheckboxFormatter(cellValue, options, rowObject){
	var qty_ord=rowObject.quantityOrdered;
	var qty_rcd=rowObject.quantityReceived;
	if(qty_ord==null || qty_ord==""){
		qty_ord=0;
	}
	var allowornot=false;
	if(qty_rcd!=null && qty_rcd!="" && qty_rcd!=0){
//	var qty=qty_ord-qty_rcd;
//	if(qty==0||qty<0){
		allowornot=true;
//	}
	}
	var id="canDeletePOID_"+options.rowId;
	var element = "<input type='checkbox' id='"+id+"' onclick='deletePOCheckboxChanges(this.id,"+allowornot+");SetoverAllPOTotal();POLineItemTabformChanges();' value='false'>";
	return element;
}*/

function deletePOCheckboxChanges(id,allowornot){
	id="#"+id;
	console.log("deletePOCheckboxChanges::"+id);
	if(allowornot){
		$(id).prop( "checked", false );
		var newDialogDiv = jQuery(document.createElement('div'));
		jQuery(newDialogDiv).html('<span><b style="color:red;">Already partially or fully recieved this product.You cant delete.</b></span>');
		jQuery(newDialogDiv).dialog({modal: true, width:300, height:150, title:"Warning.", 
		//closeOnEscape: false,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
		buttons:{
			"Yes": function(){
				jQuery(this).dialog("close");
			}}}).dialog("open");
	}else{
    var canDo=$(id).is(':checked');
    if(canDo){
    	$(id).val("true");
    }else{
    	$(id).val("false");
    }
	}
}


function poGeneralTabFormValidation(){
	
	var divflag="#PO_Shiptooutside";
   
	var value1=$("#poDateId").val();var value2=$("#ourPoId").val();var value3=$("#wantedId").val();var value4=$("#contacthiddenID").val();
	var value5=$("#tagId").val();var value6=$("#orderId").val();var value7=$("#frieghtChangesId").val();var value8=$("#shipViaId").val();
	var value9=$("#specialInstructionID").val();var value10=$("#billToAddressID").val();var value11=$("#billToAddressID1").val();
	var value12=$("#billToAddressID2").val();var value13=$("#billToCity").val();var value14=$("#billToState").val();
	var value15=$("#billToZipID").val();var value16=$("#customerBillToOtherID").val();
	//var value17=$(divflag).contents().find("#shipToName").val();
//	var value18=$(divflag).contents().find("#shipToAddress1").val();var value19=$(divflag).contents().find("#shipToAddress2").val();var value20=$(divflag).contents().find("#shipToCity").val();
//	var value21=$(divflag).contents().find("#shipToState").val();var value22=$(divflag).contents().find("#shipToZip").val();var value23=$("#customerShipToOtherID").val();
	
	var value24=$("#subtotalGeneralId").val();var value25=$("#freightGeneralId").val();var value26=$("#taxGeneralId").val();
	var value27=$("#generalID").val();var value28=$("#totalGeneralId").val();var value29=$("#vendorAddress").text();
	var value30=$("#vendorAddress1").text();var value31=$("#vendorsearch").val();var value32=$("#manfactureName").val();
	var value17="";
	var value18="";
	var value19="";
	var value20="";
	var value21="";
	var value22="";
	var value23=$("#PO_Shiptooutside").contents().find("#shiptomoderhiddenid").val();
	var value33=$("#PO_Shiptooutside").contents().find("#shiptoindexhiddenid").val();
	var value34=$("#PO_Shiptooutside").contents().find("#shiptocusindexhiddenid").val();
	if(value23==3){
		value17=$("#PO_Shiptooutside").contents().find("#shipToName").val();	
		value18=$("#PO_Shiptooutside").contents().find("#shipToAddress1").val();
		value19=$("#PO_Shiptooutside").contents().find("#shipToAddress2").val();
		value20=$("#PO_Shiptooutside").contents().find("#shipToCity").val();
		value21=$("#PO_Shiptooutside").contents().find("#shipToState").val();
		value22=$("#PO_Shiptooutside").contents().find("#shipToZip").val();
	}
	if(value24.contains("$")||value24.contains(",")){
		value24=value24.replace(/[^0-9\.-]+/g,"");
		value24=Number(floorFigureoverall(value24, 2));
	}
	if(value25.contains("$")||value25.contains(",")){
		value25=value25.replace(/[^0-9\.-]+/g,"");
		value25=Number(floorFigureoverall(value25, 2));
	}
	if(value26.contains("$")||value26.contains(",")){
		value26=value26.replace(/[^0-9\.-]+/g,"");
		value26=Number(floorFigureoverall(value26, 2));
	}
	if(value27.contains("$")||value27.contains(",")){
		value27=value27.replace(/[^0-9\.-]+/g,"");
		value27=Number(floorFigureoverall(value27, 2));
	}
	if(value28.contains("$")||value28.contains(",")){
		value28=value28.replace(/[^0-9\.-]+/g,"");
		value28=Number(floorFigureoverall(value28, 2));
	}
	value24=formatCurrency(value24);
	value25=formatCurrency(value25);
	value26=formatCurrency(value26);
	value27=formatCurrency(value27);
	value28=formatCurrency(value28);
	
	var value=value1+value2+value3+value4+value5+value6+value7+value8+value9+value10+value11+value12+value13+value14+
	value15+value16+value17+value18+value19+value20+value21+value22+value23+value24+value25+value26+value27+
	value28+value29+value30+value31+value32+value33+value34;
	return value;
}
function closePOGeneralItemTab(){
	var new_po_generalform_values=poGeneralTabFormValidation();
    var new_po_general_form =  JSON.stringify(new_po_generalform_values);
    var gridRows = $('#EditPoSplitCommissionGrid').getRowData();
    var newPOcommissiongridform=JSON.stringify(gridRows);
    console.log("po_General_tab_form==>"+po_General_tab_form);
    console.log("new_po_general_form==>"+new_po_general_form);
    console.log("commission_PO_grid_form==>"+commission_PO_grid_form);
    console.log("newPOcommissiongridform==>"+newPOcommissiongridform);
    var gridreturnvalue=(commission_PO_grid_form!=newPOcommissiongridform)?true:false;
    if(commission_PO_grid_form==undefined){
    	gridreturnvalue=false;
    }
    console.log("gridreturnvalue=="+gridreturnvalue);
    var generaltabform=(po_General_tab_form !=new_po_general_form )?true:false;
    console.log("generaltabform=="+generaltabform);
    if(po_General_tab_form !=new_po_general_form  || gridreturnvalue){
  	  var newDialogDiv = jQuery(document.createElement('div'));
			jQuery(newDialogDiv).html('<span><b style="color:Green;">You have made changes,would you like to save?</b></span>');
			jQuery(newDialogDiv).dialog({modal: true, width:300, height:150, title:"Information.", 
			//closeOnEscape: false,
			open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			buttons:{
				"Yes": function(){
					jQuery(this).dialog("close");
					addPurchaseOrder();
				    return false;
				},
				"No": function ()	{
					jQuery(this).dialog("close");
					document.location.href = "./po_list";
				return false;	
				}}}).dialog("open");
    }else{
    	document.location.href = "./po_list";
    }
	
}
function closePurchaseOrderLineItemTab(){
    var gridRows = $('#lineItemGrid').getRowData();
    var new_PO_lines_form =  JSON.stringify(gridRows);
    var freightLineId=$("#freightLineId").val();
    if((freightLineId+"").contains("$")){
    	freightLineId=freightLineId.replace(/[^0-9\.-]+/g,"");
    }
   // new_PO_lines_form=new_PO_lines_form+formatCurrency(freightLineId);
    if(new_PO_lines_form != Purchase_lines_form){
  	  var newDialogDiv = jQuery(document.createElement('div'));
			jQuery(newDialogDiv).html('<span><b style="color:Green;">You have made changes,would you like to save?</b></span>');
			jQuery(newDialogDiv).dialog({modal: true, width:300, height:150, title:"Information.", 
			//closeOnEscape: false,
			open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			buttons:{
				"Yes": function(){
					jQuery(this).dialog("close");
					SaveLinesPurchaseOrder("close");
				    return false;
				},
				"No": function ()	{
					jQuery(this).dialog("close");
					document.location.href = "./po_list";
				return false;	
				}}}).dialog("open");
    }else{
    	document.location.href = "./po_list";
    }
	
}

function POGeneralTabformChanges(formvalue){
	if($( "#PurchaseOrderDiv ul li:nth-child(1)" ).hasClass("ui-state-active")){
	var new_po_generalform_values=poGeneralTabFormValidation();
    var new_po_general_form =  JSON.stringify(new_po_generalform_values);
    var gridRows = $('#EditPoSplitCommissionGrid').getRowData();
    var newPOcommissiongridform=JSON.stringify(gridRows);
    console.log("po_General_tab_form==>"+po_General_tab_form);
    console.log("new_po_general_form==>"+new_po_general_form);
    console.log("commission_PO_grid_form==>"+commission_PO_grid_form);
    console.log("newPOcommissiongridform==>"+newPOcommissiongridform);
    var gridreturnvalue=(commission_PO_grid_form!=newPOcommissiongridform)?true:false;
    if(commission_PO_grid_form==undefined){
    	gridreturnvalue=false;
    }
    
    console.log(po_General_tab_form +"\n===========\n"+new_po_general_form+"\n=============\n"+gridreturnvalue)
    
	 if(typeof(po_General_tab_form) != "undefined" ){
		 
		if(po_General_tab_form !=new_po_general_form  || gridreturnvalue){ 
    	if(formvalue=="TabChange"){
    		$( "#PurchaseOrderDiv ul li:nth-child(2)" ).addClass("ui-state-disabled");
    		$('#generalTabPDF').attr('disabled',true);
    		$('#generalTabMail').attr('disabled',true);
    		$('#lineTabPDF').attr('disabled',true);
    		$('#lineTabMail').attr('disabled',true);
  	  var newDialogDiv = jQuery(document.createElement('div'));
			jQuery(newDialogDiv).html('<span><b style="color:Green;">You have made changes,Before move to other tab have to save?</b></span>');
			jQuery(newDialogDiv).dialog({modal: true, width:300, height:150, title:"Information.", 
			closeOnEscape: false,
			open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			buttons:{
				"OK": function(){
					jQuery(this).dialog("close");
					$( "#PurchaseOrderDiv ul li:nth-child(2)" ).addClass("ui-state-disabled");
					$('#generalTabPDF').attr('disabled',false);
		    		$('#generalTabMail').attr('disabled',false);
				    return false;
				}}}).dialog("open");
    	}else{
    		$( "#PurchaseOrderDiv ul li:nth-child(2)" ).addClass("ui-state-disabled");
    		$('#generalTabPDF').attr('disabled',true);
    		$('#generalTabMail').attr('disabled',true);
    		$('#lineTabPDF').attr('disabled',true);
    		$('#lineTabMail').attr('disabled',true);
    	}
		}
		else{
	    	
	    	$( "#PurchaseOrderDiv ul li:nth-child(2)" ).removeClass("ui-state-disabled");
	    	$('#generalTabPDF').attr('disabled',false);
			$('#generalTabMail').attr('disabled',false);
			$('#lineTabPDF').attr('disabled',false);
			$('#lineTabMail').attr('disabled',false);
	    	
	    }
    }else{
    	
    	$( "#PurchaseOrderDiv ul li:nth-child(2)" ).removeClass("ui-state-disabled");
    	$('#generalTabPDF').attr('disabled',false);
		$('#generalTabMail').attr('disabled',false);
		$('#lineTabPDF').attr('disabled',false);
		$('#lineTabMail').attr('disabled',false);
    	
    }
	}
	return false;
}
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
function POLineItemTabformChanges(formvalue){
	if($( "#PurchaseOrderDiv ul li:nth-child(2)" ).hasClass("ui-state-active")){
	 var gridRows = $('#lineItemGrid').getRowData();
	    var new_PO_lines_form =  JSON.stringify(gridRows);
	    var freightLineId=$("#freightLineId").val();
	    if((freightLineId+"").contains("$")){
	    	freightLineId=freightLineId.replace(/[^0-9\.-]+/g,"");
	    }
	   // new_PO_lines_form=new_PO_lines_form+formatCurrency(freightLineId);
	    
	    console.log("Purchase_lines_form"+Purchase_lines_form);
	    console.log("new_PO_lines_form"+new_PO_lines_form);
      if($('#lineItemGrid').val()!=undefined){
    	 if(new_PO_lines_form != Purchase_lines_form){
    	if(formvalue=="TabChange"){
    		$( "#PurchaseOrderDiv ul li:nth-child(1)" ).addClass("ui-state-disabled");
    		$('#generalTabPDF').attr('disabled',true);
    		$('#generalTabMail').attr('disabled',true);
    		$('#lineTabPDF').attr('disabled',true);
    		$('#lineTabMail').attr('disabled',true);
  	  var newDialogDiv = jQuery(document.createElement('div'));
			jQuery(newDialogDiv).html('<span><b style="color:Green;">You have made changes,Before move to other tab have to save?</b></span>');
			jQuery(newDialogDiv).dialog({modal: true, width:300, height:150, title:"Information.", 
			closeOnEscape: false,
			open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
			buttons:{
				"OK": function(){
					jQuery(this).dialog("close");
					$( "#PurchaseOrderDiv ul li:nth-child(1)" ).addClass("ui-state-disabled");
				    return false;
				}}}).dialog("open");
    	}else{
    		$( "#PurchaseOrderDiv ul li:nth-child(1)" ).addClass("ui-state-disabled");
    		$('#generalTabPDF').attr('disabled',true);
    		$('#generalTabMail').attr('disabled',true);
    		$('#lineTabPDF').attr('disabled',true);
    		$('#lineTabMail').attr('disabled',true);
    	}
    }else{
    	$( "#PurchaseOrderDiv ul li:nth-child(1)" ).removeClass("ui-state-disabled");
    	$('#generalTabPDF').attr('disabled',false);
		$('#generalTabMail').attr('disabled',false);
		$('#lineTabPDF').attr('disabled',false);
		$('#lineTabMail').attr('disabled',false);
    }
     }
	}
	return false;
}

function setTaxTotal_POOutside(){
	var vePOID = $("#vePOID").val();
	var totalamount=$("#subtotalGeneralId").val();
	if(totalamount==undefined ||totalamount=="" ||totalamount==null){
		totalamount=0.00;
	}
	totalamount=totalamount.replace(/[^0-9\.-]+/g,"").replace(".00", "");
	 var freight=$("#freightGeneralId").val();
	 if(freight==undefined ||freight=="" ||freight==null){
		 freight=0.00;
		}
	 freight=freight.replace(/[^0-9\.-]+/g,"").replace(".00", "");
	 var taxRate=$("#taxGeneralId").val();
	 var totalWithTax=getsubtotalwithtax_POOutside(vePOID);
     var taxamount=(Number(totalWithTax)*Number(taxRate))/100;
	 if(taxamount<0)
		 taxamount=-taxamount;
	 
	 $("#generalID").val(formatCurrency(taxamount));
	 var overalltotal=Number(totalamount)+Number(floorFigureoverall(freight,2))+Number(floorFigureoverall(taxamount,2));
	 $("#totalGeneralId").val(formatCurrency(overalltotal));
}

function getsubtotalwithtax_POOutside(vepoid){
var totalamt=0.00;
if(vepoid!=undefined && vepoid!=null && vepoid!="" && vepoid!=0){
$.ajax({
	url: "./jobtabs5/vePODetailLst",
	type: "POST",
	async:false,
	data : {"vePoId":vepoid},
	success: function(data) {
		for(var i=0;i<data.length;i++){
			var unitcost=data[i].unitCost;
			var quantity=data[i].quantityOrdered;
			var pmult=data[i].priceMultiplier;
			if(pmult==null||pmult==""||pmult==0){
				pmult=1;
			}
			var taxable=data[i].taxable;
			if(taxable==1||taxable==true){
				unitcost=Number(floorFigureoverall(unitcost,2));
				quantity=Number(floorFigureoverall(quantity,2));
				pmult=Number(pmult);
				totalamt=Number(totalamt)+Number(floorFigureoverall((unitcost*quantity*pmult),2));
			}
		}
		
	}
});
}
return Number(totalamt);
}
function canDeletePOCheckboxFormatter(cellValue, options, rowObject){
	var id="canDeletePOID_"+options.rowId;
	//deleteSOCheckboxChanges(this.id);
	var element = "<img src='./../resources/images/delete_jqGrid.png' style='vertical-align: middle;' id='"+id+"' onclick='deleteRowFromJqGrid_PO("+options.rowId+");SetoverAllPOTotal();POLineItemTabformChanges();'>";
	return element;
}
function deleteRowFromJqGrid_PO(jqGridRowId)
{
	 var vePodetailId = jQuery("#lineItemGrid").jqGrid ('getCell', jqGridRowId, 'vePodetailId');
	 if(vePodetailId != null && vePodetailId != 0 && vePodetailId != undefined ){
		 deletePOLineDetailID.push(vePodetailId);
		 $('#lineItemGrid').jqGrid('delRowData',jqGridRowId);
		 $( "#lineItemGrid_iladd" ).trigger( "click" );		 
	 }else{
		 $('#lineItemGrid').jqGrid('delRowData',jqGridRowId);
		 $( "#lineItemGrid_iladd" ).trigger( "click" );
	 }
	 $('#lineItemGrid').jqGrid('setSelection', "new_row");
	 $("#new_row_itemCode").focus();
}

function POinlineNoteImage(cellValue, options, rowObject){
	var element = '';
	var id="PONoteImageIcon_"+options.rowId;
	var test=""+options.rowId;
   if(cellValue !== '' && cellValue !== null && cellValue != undefined){
	   element = "<div><div align='center'><img src='./../resources/images/inline_jqGrid1.png' style='vertical-align: middle;' id='"+id+"' onclick=\"ShowPOLineNote('"+test+"')\"/></div></div>";	   
   }else{
	   element = "<div><div align='center'><img src='./../resources/images/inline_jqGrid.png' style='vertical-align: middle;' id='"+id+"' onclick=\"ShowPOLineNote('"+test+"')\"/></div></div>";
   }
   return element;
} 

function ShowPOLineNote(row){
	/*try{
		*/
		var jobStatus=$('#jobStatusList').val();
		console.log("JobStatus"+jobStatus);
		/*if(typeof(jobStatus) != "undefined")
		{*/
		if(CKEDITOR.instances["lineItemNoteID_POIn"]!=undefined)			
		{CKEDITOR.instances["lineItemNoteID_POIn"].destroy(true);}
		CKEDITOR.replace('lineItemNoteID_POIn', ckEditorconfig);
		/*}
		else
		{
		CKEDITOR.replace('lineItemNoteID', ckEditorconfig);
		}*/
		
		//var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
		//var id = jQuery("#customerInvoice_lineitems").jqGrid('getGridParam',row);
		$("#SaveInlineNoteID_POIn").attr("onclick","SavePOLineItemNote_In('"+row+"');");
		var notes = jQuery("#lineItemGrid").jqGrid ('getCell', row, 'inLineNote');	  
			CKEDITOR.instances['lineItemNoteID_POIn'].setData(notes);
			
			if($('#jobStatusList').val()== 4){
				$("#SaveInlineNoteID_POIn").css("display", "none");
			}else{
				$("#SaveInlineNoteID_POIn").css("display", "inline-block");
			}
			
			jQuery("#POLineItemNote_In").dialog("open");
		//	$(".nicEdit-main").focus();
			return true;
		/*}catch(err){
			console.log(err.message);
			alert(err.message);
		}*/
	}

	function SavePOLineItemNote_In(row){
		var inlineText=  CKEDITOR.instances["lineItemNoteID_POIn"].getData(); 
		
		//var rows = jQuery("#customerInvoice_lineitems").getDataIDs();
		//var id = jQuery("#customerInvoice_lineitems").jqGrid('getGridParam','selrow');
//		row=jQuery("#customerInvoice_lineitems").getRowData(rows[id-1]);
		  /*var notes = row['note'];
		  var cuSodetailId = row['cuSodetailId'];*/
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
		  	$("#lineItemGrid").jqGrid('setCell',row,'inLineNote', inlineText);  
			  $("#lineItemGrid").jqGrid('setCell',row,'inLineNoteImage', image);
			  
//		  }
		  
		  
		  jQuery("#POLineItemNote_In").dialog("close");
		  CKEDITOR.instances['lineItemNoteID_POIn'].destroy();
		 
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

	function POCancelInLineNote_In(){
		jQuery("#POLineItemNote_In").dialog("close");
		 CKEDITOR.instances['lineItemNoteID_POIn'].destroy();
		return false;
	}

	jQuery(function(){
		jQuery("#POLineItemNote_In").dialog({
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
	});
