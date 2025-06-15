var gamestate = "Idle";
const rows = 3;
const cols = 3;
const whitespace = "\u00A0";
const computerchar = "X";
const playerchar = "O";

// Computational functions

function com_arrayeq(cellarr) {
  const fe = cellarr[0].innerText.trim();
  if (fe == whitespace || fe == "") {
    return false;
  }
  return Array.from(cellarr).every(cell => cell.innerText.trim() == fe);
}

function com_checkwin() {
  var tbl = document.getElementById("table");
  var tblrows = tbl.rows; // all rows
  var iswinner = false;

  for (let i=0; i<rows; i++) { // check rows
    var crow = tblrows[i].cells; // all cells in current row
    if (com_arrayeq(crow)) {
      for (let j=0; j<cols; j++) {
        crow[j].style.color = "red";
      }
      iswinner = true;
    }
  }

  for (let i=0; i<cols; i++) { // check columns
    let colarr = [];
    for (j=0; j<rows; j++) {
      colarr.push(tblrows[j].cells[i]);
    }
    if (com_arrayeq(colarr)) {
      for (let n=0; n<rows; n++) {
        colarr[n].style.color = "red";
      }
      iswinner = true;
    }
  }

  let diagarr1 = [];
  for (let i=0; i<rows; i++) { // check diagonals (x,x)
    diagarr1.push(tblrows[i].cells[i]);
  }
  if (com_arrayeq(diagarr1)) {
    for (let n=0; n<rows; n++) {
      diagarr1[n].style.color = "red";
    }
    iswinner = true;
  }

  let diagarr2 = [];
  let idx = rows - 1;
  for (let i=idx; i>=0; i--) {
    diagarr2.push(tblrows[i].cells[idx-i]);
  }
  if (com_arrayeq(diagarr2)) {
    for (let n=0; n<rows; n++) {
      diagarr2[n].style.color = "red";
    }
    iswinner = true;
  }

  if (iswinner) {
    document.getElementById("title").innerHTML = gamestate + " wins";
    gamestate = "GameWin";
  }
}

function com_nextMove() {
  if (gamestate == "FirstMove") {
    for (let i=1; i<=2; i++){
    com_setrandemptycell(computerchar);
    }
    gamestate = "Player";
  }
  else if (gamestate == "Computer") {
    com_setrandemptycell(computerchar);
    com_checkwin();
    gamestate = "Player";
  }
}

function com_setrandemptycell(s) {
  var tbl = document.getElementById("table");
  var ro = tbl.rows; // rows in tbl
  var empty = [] // empty cells
  for (let i=0; i<rows; i++) {
    var cro = ro[i]; // ith row
    for (let j=0; j<cols; j++) {
      var cce = cro.cells[j]; // jth cell in cro
      if (cce.textContent == whitespace) {
        empty.push(cce);
      }
    }
  }
  var rand = Math.floor(Math.random() * empty.length);
  empty[rand].textContent = computerchar;
}

function com_setcell(r, c, s) {
  var tbl = document.getElementById("table");
  var ro = tbl.rows[r];
  var ce = ro.cells[c];
  ce.textContent = s;
}

function com_buttonclick() {
  var btn = document.getElementById("btn");
  if (btn.textContent == "Start") {
    btn.textContent = "Clear";
    gamestate = "FirstMove";
    com_nextMove();
  }
  else {
    btn.textContent = "Start";
    gamestate = "Idle";
    document.getElementById("title").innerHTML = "Tic Tac Toe";
    com_cleartable();
  }
}

function com_cleartable() {
  var tbl = document.getElementById("table");
  for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++) {
      com_setcell(i, j, whitespace);
      tbl.rows[i].cells[j].style.color = "black";
    }
  }
}

function com_cellclick(event) {
  var clickedcell = event.target;
  if (clickedcell.textContent != computerchar && gamestate == "Player" && clickedcell.textContent != playerchar) {
    clickedcell.textContent = playerchar;
    com_checkwin();
    gamestate = "Computer";
    com_nextMove();
  }
}

// UI functions

function vis_table() {
  var table = document.createElement("table");
  table.id = "table";
  table.addEventListener('click', com_cellclick);
  for (let i=1; i<=rows; i++) {
    var row = table.insertRow();
    for (let j=1; j<=cols; j++) {
      var cell = row.insertCell();
      cell.appendChild(document.createTextNode(whitespace));
    }
  }
  document.body.appendChild(table);
}

function vis_button() {
  var button = document.createElement("button");
  button.id = "btn";
  button.textContent = "Start";
  button.addEventListener("click", com_buttonclick);
  document.body.appendChild(button);
}

function vis_loadpage() {
  vis_table();
  vis_button();
}