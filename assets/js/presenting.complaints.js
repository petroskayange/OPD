var complaintsObs = [

  { group: 'repiratory',
    complaints: [
    {
      concept_id: 16,
      concept_name_id: 17,
      concept_name_type: "FULLY_SPECIFIED",
      creator: 1,
      date_created: "2004-01-01T00:00:00.000+02:00",
      date_voided: null,
      locale: "en",
      locale_preferred: 0,
      name: "Diarrhea",
      uuid: "b9960eaa-8d80-11d8-abbb-0024217bb78e",
      void_reason: null,
      voided: 0,
      voided_by: null,
    },

    {
      concept_id: 107,
      concept_name_id: 110,
      concept_name_type: "FULLY_SPECIFIED",
      creator: 1,
      date_created: "2004-01-01T00:00:00.000+02:00",
      date_voided: null,
      locale: "en",
      locale_preferred: 0,
      name: "Cough",
      uuid: "b996767e-8d80-11d8-abbb-0024217bb78e",
      void_reason: null,
      voided: 0,
      voided_by: null,
    }
    ],
  },

  { group: 'fever',
    complaints: [
    {
      concept_id: 16,
      concept_name_id: 17,
      concept_name_type: "FULLY_SPECIFIED",
      creator: 1,
      date_created: "2004-01-01T00:00:00.000+02:00",
      date_voided: null,
      locale: "en",
      locale_preferred: 0,
      name: "111111",
      uuid: "b9960eaa-8d80-11d8-abbb-0024217bb78e",
      void_reason: null,
      voided: 0,
      voided_by: null,
    },

    {
      concept_id: 107,
      concept_name_id: 110,
      concept_name_type: "FULLY_SPECIFIED",
      creator: 1,
      date_created: "2004-01-01T00:00:00.000+02:00",
      date_voided: null,
      locale: "en",
      locale_preferred: 0,
      name: "2222222",
      uuid: "b996767e-8d80-11d8-abbb-0024217bb78e",
      void_reason: null,
      voided: 0,
      voided_by: null,
    }
  ],
  },

  { group: 'Haema',
    complaints: [
    {
      concept_id: 16,
      concept_name_id: 17,
      concept_name_type: "FULLY_SPECIFIED",
      creator: 1,
      date_created: "2004-01-01T00:00:00.000+02:00",
      date_voided: null,
      locale: "en",
      locale_preferred: 0,
      name: "3333333",
      uuid: "b9960eaa-8d80-11d8-abbb-0024217bb78e",
      void_reason: null,
      voided: 0,
      voided_by: null,
    },

    {
      concept_id: 107,
      concept_name_id: 110,
      concept_name_type: "FULLY_SPECIFIED",
      creator: 1,
      date_created: "2004-01-01T00:00:00.000+02:00",
      date_voided: null,
      locale: "en",
      locale_preferred: 0,
      name: "444444",
      uuid: "b996767e-8d80-11d8-abbb-0024217bb78e",
      void_reason: null,
      voided: 0,
      voided_by: null,
    }
],
}

];

var colorCode = [
   {color: 'blue'},
   {color: 'green'},
   {color: 'red'}
];


console.log(complaintsObs);

var presentingComplaintsHash = {};

function clearSelection(type_of_complaint) {
  presentingComplaintsHash[type_of_complaint] = [];
  buildPresentaingComplaints(type_of_complaint);
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

  getPresentingComplaints(type_of_complaint);
  var clearButton = document.getElementById('clearButton');
  clearButton.setAttribute('onmousedown',"clearSelection('" + type_of_complaint + "');"); 
}

function buildOrderButton() {
  var navButton = document.getElementById('buttons');
  var orderButton = document.createElement('button');

  orderButton.setAttribute('id','orderButton');
  orderButton.setAttribute('class','blue button navButton');
  orderButton.innerHTML = '<span>Order</span>';
  orderButton.setAttribute('onmousedown','ordersPopupModal()');
  navButton.appendChild(orderButton);
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
  var row_count = 1;
  var row;
  var list;

  concept_names = []
  for(var t = 0 ; t < concept_sets.length; t++) {

    console.log("print >> name: "+ concept_sets[t].group);

    
      var column = document.createElement('div');
      column.setAttribute('class','complaints-container-column');
      side_bar_container.appendChild(column);
  
      var box;
      box = document.createElement('div');
      box.setAttribute('class','complaints-container-box');
      //box.setAttribute('style', 'background-color: y'+colorCode[t].color);
      //console.log(colorCode);
      box.setAttribute('id',concept_sets[t].group);
      box.innerHTML = concept_sets[t].group;
      box.setAttribute('selected', 'false');
      //cell.setAttribute('concept_id', concept_sets[i].concept_id);
      //cell.setAttribute('complaint-type', type_of_complaint);
      box.setAttribute('onmousedown','groupClicked(this);');
      column.appendChild(box);
    
      list = document.createElement('div');
      list.setAttribute('id','list-'+concept_sets[t].group);
      if(t == 0)
      list.setAttribute('class','complaints-list-show');
      else
      list.setAttribute('class','complaints-list-hide');
      main_container.appendChild(list);
    

    for(var i = 0 ; i < concept_sets[t].complaints.length; i++) {

      console.log(concept_sets[t].complaints[i].name);

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
              cell.setAttribute('complaint-type', type_of_complaint);
              cell.setAttribute('onmousedown','complaintClicked(this);');
              row.appendChild(cell);

              
            
              row_count++;
              if(row_count == 3)
                row_count = 1;

                //autoHighLight(type_of_complaint);

    // if(concept_sets[i].name.toLowerCase() == 'other')
    //   continue;

    // if(concept_sets[i].name.toLowerCase() == 'none')
    //   continue;

    // if(sessionStorage.patientGender == 'M') {
    //   if(concept_sets[i].name.toLowerCase().match(/pregna/i)) 
    //     continue;
    
    //   if(concept_sets[i].name.toLowerCase().match(/pv bleeding/i)) 
    //     continue;
    
    // }

    // concept_names.push(concept_sets[i].name);
  }  
  }
  
  // concept_names = concept_names.sort();
  // concept_names.push('Other');
  // concept_names.push('None');
  
  // for(var x = 0 ; x < concept_names.length; x++){
  //   for(var i = 0 ; i < concept_sets.length; i++) {
  //     if(concept_names[x].toLowerCase() != concept_sets[i].name.toLowerCase())
  //       continue;

  //     if(concept_names[x].toLowerCase().match(search_value.toLowerCase())) 
  //     {
  //       if(row_count == 1){
  //         row = document.createElement('div');
  //         row.setAttribute('class','complaints-container-row');
  //         main_container.appendChild(row);
  //       }

  //       cell = document.createElement('div');
  //       cell.setAttribute('class','complaints-container-cell');
  //       cell.innerHTML = concept_sets[i].name;
  //       cell.setAttribute('selected', 'false');
  //       cell.setAttribute('concept_id', concept_sets[i].concept_id);
  //       cell.setAttribute('complaint-type', type_of_complaint);
  //       cell.setAttribute('onmousedown','complaintClicked(this);');
  //       row.appendChild(cell);
      
  //       row_count++;
  //       if(row_count == 2)
  //         row_count = 1;
  //     }
  //   }
  // }

  // autoHighLight(type_of_complaint);
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

  if(e.getAttribute('selected') == 'false'){
    if(e.innerHTML.toUpperCase() == 'NONE'){
      deSelectAll(type_of_complaint);
    }else{
      deSelectNone(type_of_complaint)
    }
    e.setAttribute('selected', 'true');
    e.style = 'background-color: lightblue;';
    addToHash(type_of_complaint, e.getAttribute('concept_id'));    
  }else{
    e.setAttribute('selected', 'false');
    e.style = 'background-color: "";';
    removeFromHash(type_of_complaint, e.getAttribute('concept_id'));
  }

}

function groupClicked(e){
  var group_name = e.getAttribute('id');
  var container_list = document.getElementById('list-'+group_name);
  var currentVisabList = document.getElementsByClassName('complaints-list-show');
  var groupList = document.getElementsByClassName('complaints-container-box');

  for(var i=0; i<groupList.length; i++)
  groupList[i].setAttribute('style','background-color: none !important');
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

function getPresentingComplaints(type_of_complaint) {
  var complaint_concept_set = {};
  complaint_concept_set['Specific presenting complaint'] = 8677;
  complaint_concept_set['Presenting complaint'] = 10540;

  var concept_set = complaint_concept_set[type_of_complaint];
  var url = apiProtocol+'://'+apiURL+':'+apiPort+'/api/v1/concept_set';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var objs = JSON.parse(this.responseText);
      presentingComplaints(complaintsObs, type_of_complaint);
      console.log("print >> ");
      console.log(objs);
    }
  };
  xhttp.open("GET", (url + "?id=" + concept_set + "&name="), true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function prepareToSave() {
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
    encounter_type_name: 'PRESENTING COMPLAINTS',
    encounter_type_id:  122,
    patient_id: sessionStorage.patientID,
    encounter_datetime: encounter_datetime
  }

  submitParameters(encounter, "/encounters", "saveObs");
}

function saveObs(encounter) { 
  
  var observations = [];
  var keys = []
  
  for(key in presentingComplaintsHash) {
    var concept_id = key == 'Presenting complaint' ? 8578 : 8677;
    var temp = presentingComplaintsHash[key];
    for(var i = 0 ; i < temp.length ; i++){
      observations.push({concept_id: concept_id, value_coded: temp[i]})
    }
  }
  
  var obs = {
    encounter_id: encounter["encounter_id"],
    observations: observations
  }; 

  submitParameters(obs, "/observations", "nextPage")  
}

function nextPage(obs){
  nextEncounter(sessionStorage.patientID, sessionStorage.programID);
}

function ordersPopupModal() {
  let page_cover = document.getElementById("page-cover");
  page_cover.style = "display: inline;";
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
  let page_cover = document.getElementById("page-cover");
  page_cover.style = "display: none;";
  var parent = document.getElementById('mateme');
  parent.setAttribute('class','');

  var main_container = document.getElementsByTagName('body')[0].lastElementChild;
  main_container.setAttribute('class','modal fade');
  main_container.setAttribute('style','display: none');
  document.getElementsByTagName('body')[0].removeChild(main_container);
}

function nextActivity() {
  var radiology = document.getElementById('radiology');
  var lab = document.getElementById('lab');
  var option_one_selected = radiology.getAttribute('ticked');
  var option_two_selected = lab.getAttribute('ticked');

  sessionStorage.setItem('radiology_is_set', 'true');
  sessionStorage.setItem('lab_is_set', 'false');
  window.location.href = './radiology/radiology_orders.html';

  console.log("..."+option_one_selected+'  >>'+option_two_selected);
  return;
}

window.onhashchange = function() {
  closeOrdersPopupModal();
}

function hashHandler() {
  console.log('The hash has changed!');
}

window.addEventListener('hashchange', hashHandler, true);