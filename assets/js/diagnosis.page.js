

function buildOPDdiagnosisPage() {
  var frame = document.getElementById('inputFrame' + tstCurrentPage);
  frame.style = 'width: 96%; height: 90%;';

  var container = document.createElement('div');
  container.setAttribute('id','main-container');
  frame.appendChild(container);

  var container_row = document.createElement('div');
  container_row.setAttribute('id','main-container-row');
  container.appendChild(container_row);

  var cells = [['Primary','left'],['Secondary','right']];
  for(var i = 0 ; i < cells.length; i++) {
    var container_cell = document.createElement('div');
    container_cell.setAttribute('class','main-container-header-cell');
    container_cell.setAttribute('id','main-container-header-' + cells[i][1]);
    container_cell.innerHTML = cells[i][0];
    container_cell.setAttribute('onmousedown','showDiagnosisKeyboard(this);');
    container_row.appendChild(container_cell);
  }

  var container_row = document.createElement('div');
  container_row.setAttribute('id','main-container-row');
  container.appendChild(container_row);

  var cells = ['left', 'right'];
  for(var i = 0 ; i < cells.length; i++) {
    var container_cell = document.createElement('div');
    container_cell.setAttribute('class','main-container-data-cell');
    container_cell.setAttribute('id','main-container-data-' + cells[i]);
    container_cell.innerHTML = '&nbsp;';
    container_row.appendChild(container_cell);
  }


}

function showDiagnosisKeyboard(e) {
  var diagnosisBox = document.createElement('div');
  diagnosisBox.setAttribute('id', 'diagnosis-box');

  var diagnosisCover = document.createElement('div');
  diagnosisCover.setAttribute('id', 'diagnosis-cover');

  var container = document.createElement('div');
  container.setAttribute('id', 'diagnosis-container');
  diagnosisBox.appendChild(container);

  var diagnosisNavBar = document.createElement('div');
  diagnosisNavBar.setAttribute('id', 'diagnosis-nav-bar');
  diagnosisBox.appendChild(diagnosisNavBar);

  var windowBody = document.getElementsByTagName('body')[0];
  try {
      var div1 = document.getElementById('diagnosis-box');
      var div2 = document.getElementById('diagnosis-cover');
      windowBody.removeChild(div1);
      windowBody.removeChild(div2);
  } catch (e) {
  }

  windowBody.appendChild(diagnosisBox);
  windowBody.appendChild(diagnosisCover);
  diagnosisCover.style = 'display: inline;';
  diagnosisBox.style = 'display: inline;';

  addNavButtons(diagnosisNavBar);
}

function addNavButtons(e) {
  var nextB = document.createElement('button');
  nextB.innerHTML = '<span>Done</span>';
  nextB.setAttribute('class', 'button green navButton nav-diagnosis-btns');
  nextB.setAttribute('onmousedown', 'createOrders(this);');
  nextB.setAttribute('id', 'next-button');
  e.appendChild(nextB);

  var cancelB = document.createElement('button');
  cancelB.innerHTML = '<span>Back</span>';
  cancelB.style = 'float: left; left: 5px;';
  cancelB.setAttribute('class', 'button red navButton nav-diagnosis-btns');
  cancelB.setAttribute('onmousedown', 'cancelDiagnosis();');
  e.appendChild(cancelB);
}

function cancelDiagnosis() {
  var windowBody = document.getElementsByTagName('body')[0];
  try {
      var div1 = document.getElementById('diagnosis-box');
      var div2 = document.getElementById('diagnosis-cover');
      windowBody.removeChild(div1);
      windowBody.removeChild(div2);
  } catch (e) {
  }
}
