var formattedDate = sessionStorage.sessionDate;
formattedDate = (new Date(formattedDate));
var sessionDate = new Date(moment(formattedDate).format('YYYY-MM-DD'));

var givenRegimens = {};
var givenNoneRegimens = {};
var passedRegimens = {};

var selectedRegimens
var setSelectedInterval;

// var show_custom_regimens = false;
var prescribe_arv = false;
var prescribe_cpt = false;
var prescribe_ipt = false;
var medication_orders = {};

var starterPackSelected = false;
var customRegimenIngredients = {};
var noneDrugPrescripins = {};
var patient_is_fast_track = false;

var customListCSS = document.createElement('span');
customListCSS.innerHTML = "<style>\
.scrollableList li {\
  color: black;\
  list-style: none;\
  padding-left: 5px;\
  padding-right: 5px;\
  margin-top: 5px;\
  margin-bottom: 5px;\
  font-family: 'Nimbus Sans L','Arial Narrow',sans-serif;\
  font-size: 1.2em;\
}\
.scrollableList img {\
width: 45px;\
height: 45px;\
}\
.custom-regimen-th {\
  background-color: lightgray;\
}\
.custom-regimen-td {\
  border-style: solid;\
  border-width: 1px 0px 0px 0px;\
  text-align: center;\
}\
.dosage-inputs {\
  border: solid 1px;\
  height: 60px;\
  width: 60px;\
  background-color: lightgoldenrodyellow;\
}\
.none-drug-inputs {\
  border: solid 1px;\
  height: 60px;\
  width: 60px;\
  background-color: lightgoldenrodyellow;\
  text-align: center;\
font-size: 1.3em;\
font-weight: bold;\
margin: 10px;\
}\
.custom-regimen-th img {\
  height: 40px;\
  width: 40px;\
}\
.keypad-buttons {\
  padding: 20% 0px 0px 0px;\
  float: left;\
  text-align: center;\
  margin-right: auto;\
  margin-left: auto;\
  display: block;\
  margin: 5px;\
  border: 1px solid #5ca6c4;\
  cursor: pointer;\
  /*box-shadow: inset 2px -4px 2px 0px;*/\
  background-color: white;\
  border-radius: 7px;\
  border: solid black 3px;\
  -webkit-box-sizing: border-box;\
  -moz-box-sizing: border-box;\
  box-sizing: border-box;\
  border: 1px solid #7eb9d0;\
  -webkit-border-radius: 3px;\
  -moz-border-radius: 3px;\
  border-radius: 3px;\
  font-size: 23px;\
  font-family: arial, helvetica, sans-serif;\
  padding: 10px 10px 10px 10px;\
  text-decoration: none;\
  display: inline-block;\
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.3);\
  font-weight: bold;\
  color: #FFFFFF;\
  background-color: #a7cfdf;\
  background-image: -webkit-gradient(linear, left top, left bottom, from(#a7cfdf), to(#23538a));\
  background-image: -webkit-linear-gradient(top, #a7cfdf, #23538a);\
  background-image: -moz-linear-gradient(top, #a7cfdf, #23538a);\
  background-image: -ms-linear-gradient(top, #a7cfdf, #23538a);\
  background-image: -o-linear-gradient(top, #a7cfdf, #23538a);\
  background-image: linear-gradient(to bottom, #a7cfdf, #23538a);\
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#a7cfdf, endColorstr=#23538a);\
  text-align: center;\
  width: 75px;\
  height: 65px;\
}\
#custom-keypad-container {\
  background-color: #F4F4F4;\
  border: 2px solid #E0E0E0;\
  border-radius: 15px;\
  padding: 5px;\
  position: absolute;\
  top: 60px;\
  width: 280px;\
  /*margin-left: 430px;*/\
  left: 39%;\
  z-index: 1001;\
  }\
</style>";

function selectRegimen(e) {
    var cells = document.getElementsByClassName("regimen-names");
    for (var i = 0; i < cells.length; i++) {
        cells[i].setAttribute("style", "background-color: '';");
    }

    e.setAttribute("style", "background-color: lightblue;");
    selectedRegimens = e.getAttribute('selected-regimen');

    //checkForPossibleSideEffects(e);
}

function showSelectedMeds() {
    var htn_drugs = []
    try {
        htn_drugs = JSON.parse(sessionStorage.htn_drugs)
    } catch (e) {

    }
    changeNextButtonToFinish();
    /* .............................................Will clean up later */
    if (isHashEmpty(customRegimenIngredients) == false || isHashEmpty(noneDrugPrescripins) == false) {
        setCustomRegimen();
    }
    /* .............................................Will clean up later */
    if (givenRegimens[selectedRegimens].length > 0) {
    var frame = document.getElementById("inputFrame" + tstCurrentPage);
    frame.style = "height: 89%; width: 96%; overflow: scroll; ";
    document.getElementById("clearButton").style = "display: none;";

    var table = document.createElement("table");
    table.setAttribute("id", "selected-medication");
    frame.appendChild(table);

    var thead = document.createElement("thead");
    table.appendChild(thead);

    var tr = document.createElement("tr");
    tr.style = "background-color: lightgray;";
    thead.appendChild(tr);

    var theads = ["Drug name", "Units", "AM", "Noon", "PM","Duration","Frequency"];
    for (var i = 0; i < theads.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = theads[i];
        if (i == 0)
            th.style = "text-align: left;"

        tr.appendChild(th);
    }


    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "selected-medication-tbody");
    table.appendChild(tbody);
    var med_frequency = "Daily (QOD)";

    
        var rows = givenRegimens[selectedRegimens];
        for (var i = 0; i < rows.length; i++) {
            var tr = document.createElement("tr");
            tbody.appendChild(tr);

            try {
              var category = rows[i].category;
              if (category.match(/A/i)) {
                  tr.setAttribute("class", "adult-category");
              } else if (category.match(/P/i)) {
                  tr.setAttribute("class", "peads-category");
              }
            }catch(q) {}

            var td = document.createElement("td");
            td.innerHTML = rows[i].drug_name;
            td.setAttribute("class", "numbers");
            td.setAttribute("class", "med-names");
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = rows[i].units;
            td.setAttribute("class", "numbers");
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = rows[i].am;
            td.setAttribute("class", "numbers");
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = rows[i].noon;
            td.setAttribute("class", "numbers");
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = rows[i].pm;
            td.setAttribute("class", "numbers");
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = rows[i].duration;
            td.setAttribute("class", "numbers");
            tr.appendChild(td);

            var frequency = rows[i].frequency;
       

            var td = document.createElement("td");
            td.innerHTML = (frequency == undefined ? med_frequency : frequency);
            td.setAttribute("class", "med-frequency");
            tr.appendChild(td);


        }

    }

    if(givenNoneRegimens[selectedRegimens].length > 0)
    {
        var frame = document.getElementById("inputFrame" + tstCurrentPage);
        frame.style = "height: 89%; width: 96%; margin-bottom:50px; overflow: scroll;";
        document.getElementById("clearButton").style = "display: none;";
    
        var table = document.createElement("table");
        table.setAttribute("id", "selected-none-medication");
        frame.appendChild(table);
    
        var thead = document.createElement("thead");
        table.appendChild(thead);
    
        var tr = document.createElement("tr");
        tr.style = "background-color: lightgray;";
        thead.appendChild(tr);
    
        var theads = ["None drug name", "Amount"];
        for (var i = 0; i < theads.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = theads[i];
            if (i == 0)
                th.style = "text-align: left;"
    
            tr.appendChild(th);
        }
   
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id", "selected-tbody");
        table.appendChild(tbody);

        var rows = givenNoneRegimens[selectedRegimens];
        for (var i = 0; i < rows.length; i++) {
            var tr = document.createElement("tr");
            tbody.appendChild(tr);

            var td = document.createElement("td");
            td.innerHTML = rows[i].drug_name;
            td.setAttribute("class", "numbers");
            td.setAttribute("class", "med-names");
            tr.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = rows[i].amount;
            td.setAttribute("class", "numbers");
            tr.appendChild(td);

        }
    }
        


}

/* ###################################################### */
var setDataTable = null;

function initDataTable() {
    setDataTable = jQuery('#selected-medication').DataTable({
        fixedHeader: true,
        searching: false,
        paging: false,
        scroller: {
            loadingIndicator: true
        }
    });
    document.getElementById("selected-medication_info").style = "display: none;";

    setDataTable = jQuery('#selected-none-medication').DataTable({
        fixedHeader: true,
        searching: false,
        paging: false,
        scroller: {
            loadingIndicator: true
        }
    });

    document.getElementById("selected-none-medication_info").style = "display: none;";
}

function isEven(n) {
    return n % 2 == 0;
}

function isOdd(n) {
    return Math.abs(n % 2) == 1;
}

function validateEntries() {
    /*var inputBox = document.getElementById('touchscreenInput4');
    if(inputBox.value < 1){
        showMessage('Please select No/Yes from the list');
    }*/

    submitRegimen();
}

function preSelectRegimenSelection() {
    if (selectedRegimens) {
        var e = document.getElementById(selectedRegimens);
        selectRegimen(e);
    }
}

function buildCustomPrescriptionPage() {
    var frame = document.getElementById("inputFrame" + tstCurrentPage);
    frame.style = "height: 89%; width: 96%;";

    var table = document.createElement('table');
    table.style = 'width: 100%;';
    frame.appendChild(table);

    var tr = document.createElement('tr');
    table.appendChild(tr);

    var cells = ['adults', 'peads'];
    for (var i = 0; i < cells.length; i++) {
        var td = document.createElement('td');
        td.setAttribute('id', cells[i] + '-meds');
        tr.appendChild(td);
    }

    addMedColumns();
    autoSelect();

    var nextButton = document.getElementById('nextButton');
    nextButton.setAttribute('onmousedown', 'validateCustomPrescription()');
}

function addMedColumns() {
    var adultDiv = document.createElement('div');
    adultDivCSS = 'overflow-x: hidden; height: 580px;';
    adultDivCSS += 'border: solid 1px;';
    adultDiv.setAttribute('style', adultDivCSS);
    adultDiv.setAttribute('class', 'scrollable');

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(customListCSS);

    var leftTD = document.getElementById('adults-meds');
    leftTD.appendChild(adultDiv);

    var ul = document.createElement('ul');
    ul.setAttribute('class', 'scrollableList');
    adultDiv.appendChild(ul);

    try {
        custom_regimen_ingredients = custom_regimen_ingredients.sort(function (a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
        });
    } catch (x) {
    }

    var counter = parseInt(custom_regimen_ingredients.length/2);
    for (var i = 0; i < custom_regimen_ingredients.length; i++) {

        var drug_id = custom_regimen_ingredients[i].drug_id;
        var ConceptID = 'ConceptID_'+drug_id;
        var innerHTML = '<div style="display: table; border-spacing: 0px;"><div style="display: table-row"><div style="display: table-cell;"><img id="img';
        innerHTML += ConceptID + '" src="/public/touchscreentoolkit/lib/images/unticked.jpg" alt="[ ]"></div><div style="display: table-cell; vertical-align:      middle; text-align: left; padding-left: 15px;"';
        innerHTML += ' id="optionValue' + i + '">';
        innerHTML += custom_regimen_ingredients[i].name + "</div></div></div>";

        
        var li = document.createElement("li");
        li.setAttribute("id",ConceptID );
        li.setAttribute("tstvalue", drug_id);
        li.setAttribute("onmousedown", "null; updateCustomList(__$('optionValue' + this.id), this); ");
        li.setAttribute("style", "");
        var class_name = (i % 2 === 0 ? 'even' : 'odd');
        li.setAttribute("class", class_name + " custom-ingredients-list");
        li.setAttribute("drug_name", custom_regimen_ingredients[i].name);
        li.setAttribute("units", custom_regimen_ingredients[i].units);
        li.innerHTML = innerHTML;
        ul.appendChild(li);

        if (i == counter)
            break;

    }

    /* ............ */
    var peadsDiv = document.createElement('div');
    peadsDivCSS = 'overflow-x: hidden; height: 580px;';
    peadsDivCSS += 'border: solid 1px;';
    peadsDiv.setAttribute('style', adultDivCSS);
    peadsDiv.setAttribute('class', 'scrollable');

    var righTD = document.getElementById('peads-meds');
    righTD.appendChild(peadsDiv);

    var ul = document.createElement('ul');
    ul.setAttribute('class', 'scrollableList');
    peadsDiv.appendChild(ul);

    for (var i = counter+1; i < custom_regimen_ingredients.length; i++) {
        var class_name = (i % 2 === 0 ? 'even' : 'odd');

        var drug_id = custom_regimen_ingredients[i].drug_id;
        var ConceptID = 'ConceptID_'+drug_id;
        var innerHTML = '<div style="display: table; border-spacing: 0px;"><div style="display: table-row"><div style="display: table-cell;"><img id="img';
        innerHTML += ConceptID + '" src="/public/touchscreentoolkit/lib/images/unticked.jpg" alt="[ ]"></div><div style="display: table-cell; vertical-align:      middle; text-align: left; padding-left: 15px;"';
        innerHTML += ' id="optionValue' + i + '">';
        innerHTML += custom_regimen_ingredients[i].name + "</div></div></div>";

        var li = document.createElement("li");
        li.setAttribute("id", ConceptID);
        li.setAttribute("tstvalue", drug_id);
        li.setAttribute("onmousedown", "null; updateCustomList(__$('optionValue' + this.id), this); ");
        li.setAttribute("style", "");
        li.setAttribute("units", custom_regimen_ingredients[i].units);
        li.setAttribute("drug_name", custom_regimen_ingredients[i].name);
        li.setAttribute("class", class_name + " custom-ingredients-list ");
        li.innerHTML = innerHTML;
        ul.appendChild(li);

    }

    /* ............ */
}

function updateCustomList(e, element) {
    var selected = element.getAttribute('style');
    var img = document.getElementById('img' + element.id);
    if (selected.match(/lightblue/i)) {
        element.setAttribute("style", '');
        img.setAttribute('src', "/public/touchscreentoolkit/lib/images/unticked.jpg");

        var tempContainer = customRegimenIngredients;
        customRegimenIngredients = {}

        for (drug_id in tempContainer) {
            if (element.getAttribute('drug_name') != tempContainer[drug_id].name) {
                customRegimenIngredients[parseInt(drug_id)] = {
                    name: tempContainer[drug_id].name,
                    am: tempContainer[drug_id].am,
                    noon: tempContainer[drug_id].noon,
                    pm: tempContainer[drug_id].pm,
                    units: tempContainer[drug_id].units,
                    duration: tempContainer[drug_id].duration,
                    frequency: 'Daily (QOD)',
                    drug_id: drug_id
                }
            }
        }
    } else {
        element.setAttribute("style", 'background-color: lightblue');
        img.setAttribute('src', "/public/touchscreentoolkit/lib/images/ticked.jpg");

        if (customRegimenIngredients[parseInt(element.getAttribute('tstvalue'))] == undefined) {
            customRegimenIngredients[parseInt(element.getAttribute('tstvalue'))] = {
                name: element.getAttribute('drug_name'), drug_id: null,duration: null, frequency: 'Daily (QOD)',
                am: null, noon: null, pm: null, units: element.getAttribute('units')
            }
        }
    }
  
}

function isHashEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

var custom_regimen_ingredients = [];
var none_drug_prescripins = [];

function getMedication() {


    var drugslist_url = apiProtocol + "://" + apiURL + ":" + apiPort;
        drugslist_url += "/api/v1/OPD_drugslist";
        var xhttp_drugslist = new XMLHttpRequest();
        xhttp_drugslist.onreadystatechange = function () 
        {
            if (this.readyState == 4 &&  this.status == 200)
            {
            var objs = JSON.parse(this.responseText);
            for (var i = 0; i < objs.length; i++) {
                            if (objs[i].alternative_names.length == 0) {
                                var drug_name = objs[i].name;
                            } else {
                                var drug_name = objs[i].alternative_names[0].short_name;
                            }
            
                            try {
                              var units = objs[i].units;
                            }catch(a){
                              var units = 0;
                            }
            
                            if(objs[i].concept_id != 10530)
                            {
                                custom_regimen_ingredients.push({
                                    name: drug_name, drug_id: objs[i].drug_id, units: units
                                });  
                            }
                            else
                            {
                                none_drug_prescripins.push({
                                    name: drug_name, drug_id: objs[i].drug_id, units: units
                                });
                            } 
                        }
                       
                    }
        };
        xhttp_drugslist.open("GET", drugslist_url, false);
        xhttp_drugslist.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
        xhttp_drugslist.setRequestHeader('Content-type', "application/json");
        xhttp_drugslist.send();
}

getMedication();

var selected_meds = {};

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isEmpty(str) {
    try {
        return (str.replace(/\s+/g, '').length < 1);
    } catch (e) {
        return true;
    }
}

var patient_id = sessionStorage.patientID;

function submitTreatmentEncounter() {
    var currentTime = moment().format(' HH:mm:ss');
    var encounter_datetime = moment(sessionStorage.sessionDate).format('YYYY-MM-DD');
    encounter_datetime += currentTime;

    var encounter = {
        encounter_type_id: 25,
        patient_id: sessionStorage.patientID,
        encounter_datetime: encounter_datetime
    };

    submitParameters(encounter, "/encounters", "postRegimenOrders");
}

function postRegimenOrders(encounter) {

    if (!encounter.encounter_id) {
        encounter_id = encounter[0].encounter_id;
    } else {
        encounter_id = encounter.encounter_id;
    }

    var drug_orders_params = {encounter_id: encounter_id, drug_orders: []}
    var start_date = new Date(sessionStorage.sessionDate);
    var start_date_formated = getFormattedDate(start_date);
    var drug_orders = givenRegimens[selectedRegimens];
    var none_drug_orders = givenNoneRegimens[selectedRegimens];


    var get_start_date = start_date.getDate();
    
    if(givenNoneRegimens[selectedRegimens].length > 0)
    {
        for (var i = 0; i < none_drug_orders.length; i++) 
        {
            var frequency2 = null;
            var amount = parseInt(none_drug_orders[i]["amount"]);
            var equivalent_daily_dose2 = 1;

            var auto_expire_date2 = start_date.setDate(get_start_date + amount);
            var auto_expire_date_formated2 = getFormattedDate(new Date(auto_expire_date2));
            var dose = amount;
      
            var instructions = none_drug_orders[i]["drug_name"] + ": " + dose + " in  total";

            none_drug_order = {
                drug_inventory_id: none_drug_orders[i].drug_id,
                dose: dose,
                equivalent_daily_dose: equivalent_daily_dose2,
                frequency: frequency2,
                start_date: start_date_formated,
                auto_expire_date: auto_expire_date_formated2,
                instructions: instructions,
                units: none_drug_orders[i].units
            };

            drug_orders_params.drug_orders.push(none_drug_order);
        }
    }
    if(givenRegimens[selectedRegimens].length > 0)
    {
        for (var i = 0; i < drug_orders.length; i++) 
        {
            var frequency = drug_orders[i]["frequency"];
            var duration = parseInt(drug_orders[i]["duration"]);
            var equivalent_daily_dose = parseFloat(drug_orders[i]["am"])+parseFloat(drug_orders[i]["pm"])+parseFloat(drug_orders[i]["noon"]);

            if(frequency.match(/weekly/i)) 
                duration = duration*7;
            else
            if(frequency.match(/monthly/i))
            {
                duration = duration*28;
                equivalent_daily_dose = equivalent_daily_dose/28;
            } 
            
            var auto_expire_date = start_date.setDate(get_start_date + duration);
            var auto_expire_date_formated = getFormattedDate(new Date(auto_expire_date));

            if(parseFloat(drug_orders[i]["am"]) > 0)
                var dose = parseFloat(drug_orders[i]["am"]);
            else
            if(parseFloat(drug_orders[i]["pm"]) > 0)
                var dose = parseFloat(drug_orders[i]["pm"]);
            else
            if(parseFloat(drug_orders[i]["noon"]) > 0)
                var dose = parseFloat(drug_orders[i]["noon"]);
            
            var instructions = drug_orders[i]["drug_name"] + ": " + dose + " " + frequency + " for " + duration + " days";

            drug_order = {
                drug_inventory_id: drug_orders[i].drug_id,
                dose: dose,
                equivalent_daily_dose: equivalent_daily_dose,
                frequency: frequency,
                start_date: start_date_formated,
                auto_expire_date: auto_expire_date_formated,
                instructions: instructions,
                units: drug_orders[i].units
            };

            drug_orders_params.drug_orders.push(drug_order);
        }
    }
  

    submitParameters(drug_orders_params, "/drug_orders", "gotoNextEncounter");
}
function gotoNextEncounter() {
    // window.location = tt_cancel_destination;
     nextEncounter(sessionStorage.patientID, sessionStorage.programID);
}

function getFormattedDate(set_date) {
    var month = (set_date.getMonth() + 1);
    if (month < 10)
        month = "0" + month;

    var day = (set_date.getDate());
    if (day < 10)
        day = "0" + day;

    var year = (set_date.getFullYear());
    return year + "-" + month + "-" + day;
}

function nextPage() {
    // htn_drugs = JSON.parse(sessionStorage.htn_drugs)
    sessionStorage.removeItem("htn_drugs");
    nextEncounter(sessionStorage.patientID, 1);

}

var appointment_type = '';

function buildCustomDosagePage() {
    try {
        document.getElementById("nonedrugButton").remove();
    } catch (error) {
        
    }
    var f = document.getElementById('inputFrame' + tstCurrentPage);
    f.style = 'width: 96%; height: 88%;'

    var nextBtn = document.getElementById("nextButton");
    nextButton.setAttribute("onmousedown", "validateCustomPrescriptionDosageInputs();");

    var table = document.createElement('table');
    var tableCSS = 'width: 100%; font-size: 16px;';
    tableCSS += 'border-collapse: collapse';
    table.style = tableCSS;
    f.appendChild(table);
    var tr = document.createElement('tr');
    table.appendChild(tr);

    var ths = [
        ['Medication', null],
        ['Morning', '/assets/images/prescription/morning.png'],
        ['Noon', '/assets/images/prescription/noon.png'],
        ['Evening', '/assets/images/prescription/evening.png'],
        ['Duration', '/assets/images/prescription/period.png'],
        ['Frequency', '/assets/images/prescription/frequency.png']
    ];

    for (var i = 0; i < ths.length; i++) {
        var th = document.createElement('th');
        th.setAttribute('class', 'custom-regimen-th');

        if (ths[i][1] != null) {
            var img = document.createElement('img');
            img.setAttribute('src', ths[i][1]);
            th.appendChild(img);
        }

        var span = document.createElement('span');
        span.innerHTML = '<br />' + ths[i][0];
        th.appendChild(span);

        if (i == 0)
            th.style = 'text-align: left; marging-left: 5px;'

        tr.appendChild(th)
    }

    for (var drug_id in customRegimenIngredients) {
        var tr = document.createElement('tr');

        var td = document.createElement('td');
        td.setAttribute('class', 'custom-regimen-td');
        td.innerHTML = customRegimenIngredients[drug_id].name;
        td.style = 'text-align: left; marging-left: 5px;'
        tr.appendChild(td);

        var td = document.createElement('td');
        td.setAttribute('class', 'custom-regimen-td');
        var input = document.createElement('input');
        input.setAttribute('id', 'am-' + drug_id);
        input.setAttribute('type', 'text');
        input.setAttribute('onmousedown', 'enterCustomDosage(this)');
        input.setAttribute('class', 'dosage-inputs');
        //input.disabled = true;
        td.appendChild(input);
        tr.appendChild(td);

        var td = document.createElement('td');
        td.setAttribute('class', 'custom-regimen-td');
        var input = document.createElement('input');
        input.setAttribute('id', 'noon-' + drug_id);
        input.setAttribute('type', 'text');
        input.setAttribute('onmousedown', 'enterCustomDosage(this)');
        input.setAttribute('class', 'dosage-inputs');
        //input.disabled = true;
        td.appendChild(input);
        tr.appendChild(td);

        var td = document.createElement('td');
        td.setAttribute('class', 'custom-regimen-td');
        var input = document.createElement('input');
        input.setAttribute('id', 'pm-' + drug_id);
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'dosage-inputs');
        input.setAttribute('onmousedown', 'enterCustomDosage(this)');
        td.appendChild(input);
        //input.disabled = true;
        tr.appendChild(td);

        var td = document.createElement('td');
        td.setAttribute('class', 'custom-regimen-td');
        var input = document.createElement('input');
        input.setAttribute('id', 'duration-' + drug_id);
        input.setAttribute('type', 'text');
        input.setAttribute('onmousedown', 'enterCustomDosage(this)');
        input.setAttribute('class', 'dosage-inputs');
        //input.disabled = true;
        td.appendChild(input);
        tr.appendChild(td);

        var td = document.createElement('td');
        td.setAttribute('class', 'custom-regimen-td');
        var input = document.createElement('select');
        input.innerHTML = "<option value='Daily (QOD)'>Daily</option>";
        input.innerHTML += "<option value='Weekly (QW)'>Weekly</option>";
        input.innerHTML += "<option value='Monthly '>Monthly</option>";
        input.setAttribute('class', 'custom-med-frequency');
        input.setAttribute('id', 'frequency-' + drug_id);
        td.style = "width: 105px !important;"
        td.appendChild(input);
        tr.appendChild(td);

        table.appendChild(tr);
    }

    autoInput();
}

function enterCustomDosage(e) {
    document.getElementById('confirmatory-test-cover').style = 'display: inline;';
    var keypadDIV = document.createElement('div');
    keypadDIV.setAttribute('id', 'custom-keypad-container');
    createKeyPad(keypadDIV, e);

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(keypadDIV);

}

function createKeyPad(e, cell) {
    var table = document.createElement('table');
    table.setAttribute("class", "prescription-keypad");

    var tr = document.createElement('tr');
    table.appendChild(tr);
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'custom-input-box');
    input.setAttribute('style', 'width: 100%;height: 70px;text-align: center;font-size: 50px;');
    var td = document.createElement('td');
    td.setAttribute('colspan', 3);
    td.appendChild(input);
    tr.appendChild(td);
    /* ........................................ */
    /* ........................................ */
    var keypad_attributes = [];
    keypad_attributes.push([1, 2, 3]);
    keypad_attributes.push([4, 5, 6]);
    keypad_attributes.push([7, 8, 9]);
    keypad_attributes.push([".", 0, "Del."]);
    keypad_attributes.push(["Done"]);
    //keypad_attributes.push(["Clear","%","/"]);

    for (var i = 0; i < keypad_attributes.length; i++) {
        var tr = document.createElement("tr");
        table.appendChild(tr);

        for (var j = 0; j < keypad_attributes[i].length; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);

            var span = document.createElement('span');
            span.setAttribute("class", "keypad-buttons");
            span.setAttribute("onmousedown", "enterKeypadValue(this,'" + cell.id + "');");
            span.innerHTML = keypad_attributes[i][j];
            td.appendChild(span);

            if (keypad_attributes[i][j] == 'Done') {
                td.setAttribute('colspan', 3);
                span.setAttribute('id', 'add-custom-dose');
                span.setAttribute('style', 'width: 95%;');
            }
        }
    }

    e.appendChild(table);

}

function enterKeypadValue(e, cell_id) {
    var inputBox = document.getElementById('custom-input-box');
    var inputCELL = document.getElementById(cell_id);

    try {

        if (e.innerHTML.match(/Del/i)) {
            inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);
        } else if (e.innerHTML.match(/Clear/i)) {
            inputBox.value = null;
            removeFromHash();
        } else if (e.innerHTML.match(/Done/i)) {
            closeCustomBox();
        } else {
            inputBox.value += e.innerHTML;
        }

    } catch (x) {
    }

    inputCELL.value = inputBox.value;
}

function closeCustomBox() {
    document.getElementById('confirmatory-test-cover').style = 'display: none;';
    var body = document.getElementsByTagName('body')[0];
    var div = document.getElementById('custom-keypad-container');
    body.removeChild(div);
}

function autoSelect() {
    var list = document.getElementsByClassName('custom-ingredients-list');
    for (var drug_id in customRegimenIngredients) {
        for (var i = 0; i < list.length; i++) {
            var liID = parseInt(list[i].getAttribute('tstvalue'));
            if (liID == parseInt(drug_id)) {
                updateCustomList(__$('optionValue' + list[i].id), list[i]);
            }
        }
    }
}

function validateCustomPrescription() {
    if (isHashEmpty(customRegimenIngredients) && isHashEmpty(noneDrugPrescripins)) {
        showMessage('Select one or more medications or none medications to continue.');
        return;
    }

    gotoNextPage();
}

function validateCustomPrescriptionDosageInputs() {
    var inputBoxes = document.getElementsByClassName('dosage-inputs');
    var sum_input_value = 0;
    for (var i = 0; i < inputBoxes.length; i++) {
        var period = inputBoxes[i].id.split('-')[0];
        
        if( period == "duration" && isNumeric(inputBoxes[i].value) == false)
        {
            showMessage('Duration can not be empty') 
            return;
        }
           
        if(!isNumeric(inputBoxes[i].value))
            inputBoxes[i].value = 0;

        sum_input_value += inputBoxes[i].value;
        if(period == "pm" && sum_input_value < 1)
        {
            sum_input_value = 0;
            showMessage('Dosege can not be empty') 
            return;
        }

      
        var drug_id = parseInt(inputBoxes[i].id.split('-')[1]);
        var period = inputBoxes[i].id.split('-')[0];
        customRegimenIngredients[drug_id][period] = parseFloat(inputBoxes[i].value);

        var medFrequency = document.getElementById("frequency-" + drug_id);
        customRegimenIngredients[drug_id].frequency = medFrequency.value;
    }

    selectedRegimens = null;
    gotoNextPage();
}

function autoInput() {
    var list = document.getElementsByClassName('dosage-inputs');

    for (var drug_id in customRegimenIngredients) {
        for (var i = 0; i < list.length; i++) {
            var inID = parseInt(list[i].id.split('-')[1]);
            var period = list[i].id.split('-')[0];
            if (customRegimenIngredients[drug_id][period] != null && drug_id == inID) {
                list[i].value = customRegimenIngredients[drug_id][period];
            }
        }
    }
}

function autoInputNonDrug() {
    var list = document.getElementsByClassName('none-drug-inputs');

    for (var drug_id in noneDrugPrescripins) {
        for (var i = 0; i < list.length; i++) {
            var inID = parseInt(list[i].id.split('-')[1]);
            var period = list[i].id.split('-')[0];
            if (noneDrugPrescripins[drug_id][period] != null && drug_id == inID) {
                list[i].value = noneDrugPrescripins[drug_id][period];
            }
        }
    }
}

function setCustomRegimen() {
    selectedRegimens = 'Unknown';
    givenRegimens[selectedRegimens] = [];

    for (var drug_id in customRegimenIngredients) {
        givenRegimens['Unknown'].push({
            drug_name: customRegimenIngredients[drug_id].name,
            units: customRegimenIngredients[drug_id].units,
            am: customRegimenIngredients[drug_id].am,
            noon: customRegimenIngredients[drug_id].noon,
            pm: customRegimenIngredients[drug_id].pm,
            duration: customRegimenIngredients[drug_id].duration,
            frequency: customRegimenIngredients[drug_id].frequency,
            drug_id: drug_id
        });

    }

    givenNoneRegimens[selectedRegimens] = [];

    for (var drug_id in noneDrugPrescripins) {
        givenNoneRegimens['Unknown'].push({
            drug_name: noneDrugPrescripins[drug_id].name,
            units: noneDrugPrescripins[drug_id].units,
            amount: noneDrugPrescripins[drug_id].amount,
            drug_id: drug_id
        });

    }
}

