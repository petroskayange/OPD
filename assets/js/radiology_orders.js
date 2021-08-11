var presentingComplaintsHash = {};
var presentingComplaintsNameHash = {};
// sessionStorage.setItem('radiology_order_done','false');
// sessionStorage.setItem('lab_order_done','false');
// sessionStorage.setItem('radiology_is_set', 'false');

function clearSelection(type_of_complaint) {
  presentingComplaintsHash[type_of_complaint] = [];
  presentingComplaintsNameHash = [];
  buildPresentaingComplaints(type_of_complaint);
  messageBar.style.display = "none";
}

/* function build_search_field()
{

  var helpText0 = document.getElementById('helpText0');
  
  var search_content = document.createElement('div');
  search_content.setAttribute('id','search_content');
  helpText0.appendChild(search_content);

  var search_text = document.createElement('span');
  search_text.setAttribute('id','search_text');
  search_text.innerHTML='Search:';
  search_content.appendChild(search_text);

  var search_input = document.createElement('input');
  search_input.setAttribute('id','search_filed');
  search_input.setAttribute('style','height:40px;width:400px;');
  search_input.setAttribute('onkeyup','getPresentingComplaints("Presenting complaint")');
  search_content.appendChild(search_input);
  lookForTag();
} */
function buildPresentaingComplaints(type_of_complaint) {
  document.getElementById('buttons').setAttribute('style','width: 100% !important');
  var frame = document.getElementById('inputFrame' + tstCurrentPage);
  frame.style = 'height: 90%; overflow: auto; display: flex';
  frame.innerHTML = null;

  getPresentingComplaints();
  var clearButton = document.getElementById('clearButton');
  clearButton.setAttribute('onmousedown',"clearSelection('" + type_of_complaint + "');");
  
  
if (sessionStorage.radiology_is_set == 'true') {
  var cancelButton = document.getElementById('cancelButton');
  cancelButton.setAttribute('onmousedown','closeOrdersPopupModal()');
}
}



function redirectToLabOrders(){
  sessionStorage.setItem('lab_is_set', 'true');
  sessionStorage.orderFlowStatus = true;
  window.location.href= "./malaria/intermediately_blank_page.html";
}


function presentingComplaints(concept_sets, type_of_complaint) {

  var frame = document.getElementById('inputFrame' + tstCurrentPage);
  frame.innerHTML = null;

  var side_bar_container = document.createElement('div');
  side_bar_container.setAttribute('id','side-bar-pre-grouped');

  

  // for (var i=0; i<5; i++) {
  //   var column = document.createElement('div');
  //   column.setAttribute('class','complaints-container-column');
  //   side_bar_container.appendChild(column);

  //   var box;
  //   box = document.createElement('div');
  //   box.setAttribute('class','complaints-container-box');
  //   box.innerHTML = "dog fight";
  //   //cell.setAttribute('selected', 'false');
  //   //cell.setAttribute('concept_id', concept_sets[i].concept_id);
  //   //cell.setAttribute('complaint-type', type_of_complaint);
  //   //cell.setAttribute('onmousedown','complaintClicked(this);');
  //   column.appendChild(box);
  // }

  

  frame.appendChild(side_bar_container);

  var main_container = document.createElement('div');
  main_container.setAttribute('id','complaints-container');


  

  frame.appendChild(main_container);
  //var search_value = document.getElementById('search_filed').value;
 
  var row;
  var list;

  concept_names = []
  for(var t = 0 ; t < concept_sets.length; t++) {
  var row_count = 1;
    
      var column = document.createElement('div');
      column.setAttribute('class','complaints-container-column');
      side_bar_container.appendChild(column);
  
      var box;
      box = document.createElement('div');
      box.setAttribute('class','complaints-container-box');
      box.setAttribute('id',concept_sets[t].group);
      box.innerHTML = concept_sets[t].group;
      box.setAttribute('selected', 'false');
      box.setAttribute('onmousedown','groupClicked(this);');
      if (t == 0)
      box.setAttribute('style','background-color: #aaaaf4 !important');
      column.appendChild(box);
    
      list = document.createElement('div');
      list.setAttribute('id','list-'+concept_sets[t].group);
      if(t == 0)
      list.setAttribute('class','complaints-list-show');
      else
      list.setAttribute('class','complaints-list-hide');
      main_container.appendChild(list);
    

    for(var i = 0 ; i < concept_sets[t].complaints.length; i++) {
      if(row_count == 1){
                row = document.createElement('div');
                row.setAttribute('class','complaints-container-row');
                list.appendChild(row);
              }
      
              cell = document.createElement('div');
              cell.setAttribute('class','complaints-container-cell');
              cell.innerHTML = concept_sets[t].complaints[i].name;
              cell.setAttribute('selected', 'false');
              cell.setAttribute('concept_id', concept_sets[t].complaints[i].concept_id);
              cell.setAttribute('group_concept_id', concept_sets[t].concept_id);
              cell.setAttribute('group_name', concept_sets[t].group);
              cell.setAttribute('complaint-type', type_of_complaint);
              cell.setAttribute('name', concept_sets[t].complaints[i].name);
              cell.setAttribute('onmousedown','complaintClicked(this);');
              row.appendChild(cell);

              row_count++;
              if(row_count == 4)
                row_count = 1;
  }  
  }
  var sideBarPreGrouped = document.getElementById('side-bar-pre-grouped');
    var other = document.getElementById('Other');
    sideBarPreGrouped.appendChild(other);
}

function autoHighLight(type_of_complaint) {
  var list = document.getElementsByClassName('complaints-container-cell');
  var temp = presentingComplaintsHash[type_of_complaint];

  if(temp == undefined)
    return;

  for(var i = 0 ; i < list.length ; i++){
    for(var x = 0 ; x < temp.length ; x++){
      if(list[i].getAttribute('concept_id') == temp[x]){
        list[i].setAttribute('selected', 'true');
        list[i].style = 'background-color: lightblue;';
      }
    }
  }
}

function complaintClicked(e) {
  var type_of_complaint = e.getAttribute('complaint-type');
  
  var groupID = e.parentElement.parentElement.getAttribute('id').split('list-');
  var groupSelected = document.getElementById(groupID[1]);
  var childNodes = e.parentElement.parentElement.childNodes;
  
  if(e.getAttribute('selected') == 'false'){
    if(e.innerHTML.toUpperCase() == 'NONE'){
      deSelectAll(type_of_complaint);
    }else{
      deSelectNone(type_of_complaint)
    }
    e.setAttribute('selected', 'true');
    e.style = 'background-color: lightblue;';
    addToHash(type_of_complaint, e.getAttribute('concept_id'));
    addToNameHash(e.getAttribute('group_concept_id')+';'+e.getAttribute('name')+';'+e.getAttribute('group_name'));
    for (var i =0; i < childNodes.length; i++ ) {
      for (var j=0; j < childNodes[i].childNodes.length; j++) {
        if ( childNodes[i].childNodes[j].getAttribute('selected') == 'true') {
          groupSelected.setAttribute('selected', 'true');
          groupSelected.style = 'background-color: #aaaaf4 !important;';
        }
      }
    }   
  }else{
    e.setAttribute('selected', 'false');
    e.style = 'background-color: "";';
    removeFromHash(type_of_complaint, e.getAttribute('concept_id'));
    removeFromNameHash(e.getAttribute('name'));
    var find_selected = 0;
    for (var i =0; i < childNodes.length; i++ ) {
      for (var j=0; j < childNodes[i].childNodes.length; j++) {
          if (childNodes[i].childNodes[j].getAttribute('selected') == 'true') 
          find_selected +=1;   
      }
    }
    if (find_selected == '0') {
        groupSelected.setAttribute('selected', 'false');
        groupSelected.style = 'background-color: #aaaaf4 !important;';
    }
  }
}

function groupClicked(e){
  var group_name = e.getAttribute('id');
  var container_list = document.getElementById('list-'+group_name);
  var currentVisabList = document.getElementsByClassName('complaints-list-show');
  var groupList = document.getElementsByClassName('complaints-container-box');

  for(var i=0; i<groupList.length; i++) {
    if(groupList[i].getAttribute('selected') == 'false')
    groupList[i].setAttribute('style','background-color: none !important');
  }
  e.setAttribute('style','background-color: #aaaaf4 !important');

  currentVisabList[0].setAttribute('class','complaints-list-hide');
  container_list.setAttribute('class','complaints-list-show');
}

function deSelectAll(key) {
  var list = document.getElementsByClassName('complaints-container-cell');
  for(var i = 0 ; i < list.length ; i++){
    list[i].style = 'background-color: "";';
  }
  presentingComplaintsHash[key] = [];
}

function deSelectNone(key) {
  var list = document.getElementsByClassName('complaints-container-cell');
  for(var i = 0 ; i < list.length ; i++){
    if(list[i].innerHTML.toUpperCase() == 'NONE' && list[i].getAttribute('selected') == 'true') {
      list[i].style = 'background-color: "";';
      removeFromHash(key, list[i].getAttribute('concept_id'));
    }
  }
}

function addToNameHash(e) {
  if(isHashEmpty(presentingComplaintsNameHash))
  presentingComplaintsNameHash = [];

  try {
    presentingComplaintsNameHash.push(e);
  }catch(e) {
    //presentingComplaintsNameHash = [];
    presentingComplaintsNameHash.push(e);
  }
}

function removeFromNameHash(e) {
  var temp = presentingComplaintsNameHash;
  presentingComplaintsNameHash= [];

  for(var i = 0 ; i < temp.length ; i++){
    if(temp[i] != e){
      presentingComplaintsNameHash.push(temp[i])
    }
  } 
}

function addToHash(key, concept_id) {
  if(isHashEmpty(presentingComplaintsHash))
    presentingComplaintsHash[key] = [];

  try {
    if(presentingComplaintsHash[key].indexOf(concept_id) < 0)
      presentingComplaintsHash[key].push(concept_id);

  }catch(e) {
    presentingComplaintsHash[key] = [];
    if(presentingComplaintsHash[key].indexOf(concept_id) < 0)
      presentingComplaintsHash[key].push(concept_id);
  }
}

function removeFromHash(key, concept_id) {
  var temp = presentingComplaintsHash[key];
  presentingComplaintsHash[key] = [];

  for(var i = 0 ; i < temp.length ; i++){
    if(temp[i] != concept_id)
      presentingComplaintsHash[key].push(temp[i]) 
  }
}

function getPresentingComplaints() {
  
  var concept_set = 10541;
  var url = apiProtocol+'://'+apiURL+':'+apiPort+'/api/v1/list_radiology_orders';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var objs = JSON.parse(this.responseText);
     presentingComplaints(objs, 'Radiology orders');
    }
  };
  xhttp.open("GET", (url + "?id=" + concept_set + "&name="), true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function save_encounter() {
  if(isHashEmpty(presentingComplaintsHash)) {
    showMessage('No selection made. Please selection one or more complaints');
    return;
  }

  var observations = [];
  var keys = []
  
  for(key in presentingComplaintsHash) {
    var concept_id = key == 'Presenting complaint' ? 8578 : 8677;
    var temp = presentingComplaintsHash[key];
    for(var i = 0 ; i < temp.length ; i++){
      observations.push({concept_id: concept_id, value_coded: temp[i]})
    }
  }
  
  if(observations.length < 1) {
    showMessage('No selection made. Please selection one or more complaints');
    return;
  }

  var currentTime = moment().format(' HH:mm:ss');
  var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD'); 
  encounter_datetime += currentTime;
                        	
  var encounter = {
    encounter_type_id:  121,
    patient_id: sessionStorage.patientID,
    encounter_datetime: encounter_datetime
  }

  submitParameters(encounter, "/encounters", "postRadiologyOrders");
}

//modified function for when orders/Lab oders button is selected
function prepareToSaveForOrders() {
  
  if(isHashEmpty(presentingComplaintsHash)) {
    showMessage('No selection made. Please selection one or more complaints');
    return;
  }

  var observations = [];
  var keys = []
  
  for(key in presentingComplaintsHash) {
    var concept_id = key == 'Presenting complaint' ? 8578 : 8677;
    var temp = presentingComplaintsHash[key];
    for(var i = 0 ; i < temp.length ; i++){
      observations.push({concept_id: concept_id, value_coded: temp[i]})
    }
  }
  
  if(observations.length < 1) {
    showMessage('No selection made. Please selection one or more complaints');
    return;
  }

  showValidate();
}

function showValidate() {
  var message = "Complaints Selected";
  var msg = "Are you sure you want to proced?";
  var td_string = "";
  var trial = "<td class=\"td-st\" >Trial</td>";
  for (var i = 0; i < presentingComplaintsNameHash.length; i++) {
    td_string+="<div class=\"td-st\">"+presentingComplaintsNameHash[i]+"</div>";
  }

  //document.getElementById('messageBar').style.width = "700px";
  messageBar.innerHTML = "";
  messageBar.innerHTML += "<p>" + message +
     
      "<div class='table-st'>"+td_string+"</div>"+
      "</p><div style='display: block;'>" +
      "<p style=\" \">" + msg +
      "</p>"+
      "<button class='button' style='float: none;' onclick='this.offsetParent.style.display=\"none\";  save_encounter();' onmousedown='this.offsetParent.style.display=\"none\"; save_encounter();'" +
      "><span>Yes</span></button><button class='button' " +
      "style='float: none; right: 3px;' onmousedown='this.offsetParent.style.display=\"none\"; '>" +
      "<span>No</span></button>";
  messageBar.style.display = "block";
}

var last_accession_number;
function get_accession_number()
{
    var accession_number_url = apiProtocol + "://" + apiURL + ":" + apiPort;
    accession_number_url += "/api/v1/sequences/next_accession_number";

    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
            var new_accn_number = JSON.parse(this.responseText)["accession_number"];
            last_accession_number = new_accn_number;
            
        }
    };
    xhttp1.open("GET", accession_number_url, false);
    xhttp1.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp1.setRequestHeader('Content-type', "application/json");
    xhttp1.send();
}
function postRadiologyOrders(encounter) { 
  
    get_accession_number();
    var tests_ordered_concept_id = 8426;

  var observations = [];
  var keys = [];

    for(var i = 0 ; i < presentingComplaintsNameHash.length ; i++){
        var data = presentingComplaintsNameHash[i].split(";");
        
      observations.push({
          concept_id: tests_ordered_concept_id, 
          value_text:data[2],
          child: {
            concept_id: data[0],
            accession_number: last_accession_number,
            value_text: data[1]
        }
        })
    }

  var obs = {
    encounter_id: encounter["encounter_id"],
    observations: observations
  }; 
  
  submitParameters(obs, "/observations", "submitRadiologyParameters")
                   
}
function submitRadiologyParameters(array_obj) 
{
     var patient_name = sessionStorage.getItem("family_name")+" "+sessionStorage.getItem("given_name");
     var accession_number = array_obj[0].children[0].accession_number;
     var date_created = array_obj[0].date_created;

     var patient_data = {  
        patient_details:
         {
             "patient_name": patient_name ,
             "patientAge": sessionStorage.getItem("patientAge"),
             "patientDOB": sessionStorage.getItem("patientDOB"),
             "patientGender": sessionStorage.getItem("patientGender"),
             "national_id": sessionStorage.getItem("national_id"),
             "person_id": array_obj[0].person_id,
             "encounter_id": array_obj[0].encounter_id,
             "date_created": date_created,
             "accession_number": accession_number,
         },
         physician_details:
         {
             "username": sessionStorage.getItem("username"),
             "userID": sessionStorage.getItem("userID"),
             "userRoles": sessionStorage.getItem("userRoles"),
         },
        radiology_orders: []
     };
 
     var radiology_orders_string = "";
     for(var key in array_obj)
     {
         var obj = array_obj[key];
         patient_data.radiology_orders.push(
         { 
             "main_value_text": obj.value_text,
             "obs_id": obj.obs_id,
             "sub_value_text": obj.children[0].value_text,
         });

         if(radiology_orders_string == "")
             radiology_orders_string = obj.children[0].value_text;
         else
             radiology_orders_string = radiology_orders_string +","+ obj.children[0].value_text;

     }

     sessionStorage.setItem("radiology_orders", radiology_orders_string); 
     sessionStorage.setItem("radiology_accession_number", accession_number); 
     sessionStorage.setItem("date_created", date_created); 
     print_barcode();

     jQuery(".loader").show();
     submitParameters(patient_data, "/radiology/radiology_orders", "print_barcode")
}


function print_barcode()
{
     var radiology_barcode_url = "/views/print/radiology_barcode.html";
     window.location =radiology_barcode_url;
}
function ordersPopupModal() {
  let submit_cover = document.getElementById("page-cover");
  submit_cover.style = "display: block;";

  var parent = document.getElementById('mateme');
  var main_container = document.createElement('div');
  parent.setAttribute('class','modal-open');
  main_container.setAttribute('class','modal fade in');
  main_container.setAttribute('id','ordersModal');
  main_container.setAttribute('data-backdrop','static');
  main_container.setAttribute('data-keyboard','false');
  main_container.setAttribute('role','dialog');
  main_container.setAttribute('style','display: block');

  var modal_dialog = document.createElement('div');
  modal_dialog.setAttribute('style','width: 75%');
  modal_dialog.setAttribute('class','modal-dialog');
  modal_dialog.setAttribute('name','div2');
  main_container.appendChild(modal_dialog);

  var modal_content = document.createElement('div');
  modal_content.setAttribute('class','modal-content');
  modal_content.setAttribute('style','margin-left:0px; height: 85vh !important; background-color: white');
  modal_dialog.appendChild(modal_content);

  var modal_header = document.createElement('div');
  modal_header.setAttribute('class','modal-header');
  var h4 = document.createElement('h4');
  h4.setAttribute('class','modal-title');
  h4.innerHTML = "Select Order";
  modal_header.appendChild(h4);
  //modal_header.innerHTML = "<h4 class="/modal-title/">Select Task</h4>";
  modal_content.appendChild(modal_header);

  var task_body = document.createElement('div');
  task_body.setAttribute('class','modal-body');
  task_body.setAttribute('id','task-body');
  modal_content.appendChild(task_body);

  var container = document.createElement('div');
  container.setAttribute('class','container');
  container.setAttribute('id','tasks-container');
  container.setAttribute('style','width: 100% !important');

  task_body.append(container);

  var table = document.createElement('div');
  var table_row = document.createElement('div');

  table.setAttribute('style','display: table; width: 100%; border-spacing: 5px');
  table_row.setAttribute('style','display: table-row; font-size: 32px');
  table_row.setAttribute('id','radiology');
  table_row.setAttribute('ticked','false');
  table_row.setAttribute('onmousedown','tick(this)');

  var table_row1 = document.createElement('div');
  table_row1.setAttribute('style','display: table-row; font-size: 32px');
  table_row1.setAttribute('ticked','false');
  table_row1.setAttribute('id','lab');
  table_row1.setAttribute('onmousedown','tick(this)');
  

  var table_cell1 = document.createElement('div');
  table_cell1.setAttribute('style','display: table-cell; vertical-align: middle; padding: 5px; width: 52px');
  var img = document.createElement('img');
  img.setAttribute('src','/public/touchscreentoolkit/lib/images/unticked.jpg');
  table_cell1.appendChild(img);
  table_row.appendChild(table_cell1);

  var table_cell2 = document.createElement('div')
  table_cell2.setAttribute('style','display: table-cell; vertical-align: middle; padding: 5px; width: 100%; border-bottom: 1px solid rgb(204, 204, 204)');
  table_cell2.innerHTML = "Radiology Orders";
  table_row.appendChild(table_cell2);

  var table_cell3 = document.createElement('div');
  table_cell3.setAttribute('style','display: table-cell; vertical-align: middle; padding: 5px; width: 52px');
  var img1 = document.createElement('img');
  img1.setAttribute('src','/public/touchscreentoolkit/lib/images/unticked.jpg');
  table_cell3.appendChild(img1);
  table_row1.appendChild(table_cell3);

  var table_cell4 = document.createElement('div')
  table_cell4.setAttribute('style','display: table-cell; vertical-align: middle; padding: 5px; width: 100%; border-bottom: 1px solid rgb(204, 204, 204)');
  table_cell4.innerHTML = "Lab Orders";
  table_row1.appendChild(table_cell4);

  table.appendChild(table_row);
  table.appendChild(table_row1);
  task_body.appendChild(table);

  var bottom = document.createElement('div');
  bottom.setAttribute('class','buttonsDiv');
  bottom.setAttribute('style','width: 100%; top: 100%; border-radius: 0px 0px 4px 4px; position: sticky');
  modal_content.appendChild(bottom);

  var button = document.createElement('button');
  button.setAttribute('class','red button navButton');
  button.innerHTML = "<span>Close</span>";
  button.setAttribute('data-dismiss','modal');
  button.setAttribute('style','position: absolute; bottom: 2%; margin-left: 1.4%');
  button.setAttribute('onmousedown','closeOrdersPopupModal()');

  var nextButton = document.createElement('button');
  nextButton.setAttribute('class','green button navButton');
  nextButton.innerHTML = "<span>Next</span>";
  nextButton.setAttribute('style','position: absolute; bottom: 2%; right: 2%');
  nextButton.setAttribute('onmousedown','nextActivity()');

  bottom.appendChild(nextButton);
  bottom.appendChild(button);

  parent.appendChild(main_container);
}

function tick(e) {
  var selected = e.getAttribute('ticked');
  if(selected != 'true') {
    e.childNodes[0].childNodes[0].setAttribute('src','/public/touchscreentoolkit/lib/images/ticked.jpg');
    e.childNodes[1].setAttribute('style','display: table-cell; vertical-align: middle; padding: 5px; width: 100%; border-bottom: 1px solid rgb(204, 204, 204); background-color: lightblue');
    e.setAttribute('ticked','true');
    return;
  }
  else{
    e.childNodes[0].childNodes[0].setAttribute('src','/public/touchscreentoolkit/lib/images/unticked.jpg');
    e.childNodes[1].setAttribute('style','display: table-cell; vertical-align: middle; padding: 5px; width: 100%; border-bottom: 1px solid rgb(204, 204, 204); background-color: inherit');
    e.setAttribute('ticked','false');
    return;
  }
}

function closeOrdersPopupModal() {
  let page_cover = window.parent.document.getElementById("page-cover");
  page_cover.style = "display: none;";

  let submit_cover = window.parent.document.getElementById("page-cover");
  submit_cover.style = "display: none;";

  var parent = window.parent.document.getElementById('mateme');
  parent.setAttribute('class','');
  
  //var main_container = window.parent.document.getElementsByTagName('body')[0].lastElementChild;
  var main_container = window.parent.document.getElementById('ordersModal');
  main_container.setAttribute('class','modal fade');
  main_container.setAttribute('style','display: none');
  window.parent.document.getElementsByTagName('body')[0].removeChild(main_container);

  var someIframe = window.parent.document.getElementById('labIframe');
  someIframe.parentNode.removeChild(someIframe);
}

function nextActivity() {
  var radiology = document.getElementById('radiology');
  var lab = document.getElementById('lab');
  var option_one_selected = radiology.getAttribute('ticked');
  var option_two_selected = lab.getAttribute('ticked');

  if (option_one_selected == 'true' && option_two_selected == 'true') {
    sessionStorage.orderFlowStatus = true;
    sessionStorage.setItem('radiology_is_set', 'true');
    sessionStorage.setItem('lab_is_set', 'true');
    window.location.href = './radiology/radiology_orders.html';
  }

  if(option_one_selected == 'true' && option_two_selected == 'false') {
    sessionStorage.orderFlowStatus = true;
    sessionStorage.setItem('radiology_is_set', 'true');
    window.location.href = './radiology/radiology_orders.html';
  }

  if(option_two_selected == 'true' && option_one_selected == 'false') {
    redirectToLabOrders();
  }
}

var timer = setInterval("autoReomvePopup();", 500);
window.timer;

function autoReomvePopup(){
  if(sessionStorage.getItem('radiology_order_done') == 'true' || sessionStorage.getItem('lab_order_done') == 'true'){
    sessionStorage.setItem('radiology_order_done','false');
    sessionStorage.setItem('lab_order_done','false');
    closeOrdersPopupModal();
    //window.clearTimeout(window.timer);
  }
}

