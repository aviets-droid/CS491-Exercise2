// Aisling Viets
// 6/14/25
// CS 491 Exercise 2
// Tic Tac Toe

/**
 * @param {} 
 */

var gamestate = "Idle";
const rows = 3;
const cols = 3;
const whitespace = "\u00A0";
const computerchar = "X";
const playerchar = "O";

// Computational functions

/** Checks if innerText across an array of cells are equal. 
 * @param {Object[]} cellarr
 * @returns {boolean}
 */

function com_arrayeq(cellarr) {
  const fe = cellarr[0].innerText.trim();
  if (fe == whitespace || fe == "") {
    return false;
  }
  return Array.from(cellarr).every(cell => cell.innerText.trim() == fe);
}

/** Checks for TTT win conditions. */
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
    tbl.removeEventListener('click', com_cellclick);
  }
}

/** Calculates the next move that the computer makes. */
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

/** Gets a random empty table cell and sets its text content to given string (s).
 * @param {string} s 
 */
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
  empty[rand].textContent = s;
}

/** Sets the text content of the cell specified by row (r) and column (c) to the given string parameter (s).
 * @param {number} r
 * @param {number} c
 * @param {string} s 
 */
function com_setcell(r, c, s) {
  var tbl = document.getElementById("table");
  var ro = tbl.rows[r];
  var ce = ro.cells[c];
  ce.textContent = s;
}

/** Updates Clear/Start button based on game state. */
function com_buttonclick() {
  var btn = document.getElementById("btn");
  var tbl = document.getElementById("table");
  if (btn.textContent == "Start") {
    btn.textContent = "Clear";
    gamestate = "FirstMove";
    tbl.addEventListener('click', com_cellclick);
    com_nextMove();
  }
  else {
    btn.textContent = "Start";
    gamestate = "Idle";
    document.getElementById("title").innerHTML = "Tic Tac Toe";
    com_cleartable();
  }
}

/** Clears the tic tac toe board. */
function com_cleartable() {
  var tbl = document.getElementById("table");
  for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++) {
      com_setcell(i, j, whitespace);
      tbl.rows[i].cells[j].style.color = "black";
    }
  }
}

/** Responds to the user clicking on cells in the table.
 * @param {Object} event 
 */
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

/** Creates the table/playing board visually. */
function vis_table() {
  var table = document.createElement("table");
  table.id = "table";
  // table.addEventListener('click', com_cellclick);
  for (let i=1; i<=rows; i++) {
    var row = table.insertRow();
    for (let j=1; j<=cols; j++) {
      var cell = row.insertCell();
      cell.appendChild(document.createTextNode(whitespace));
    }
  }
  document.body.appendChild(table);
}

/** Creates the clickable Clear/Start button. */
function vis_button() {
  var button = document.createElement("button");
  button.id = "btn";
  button.textContent = "Start";
  button.addEventListener("click", com_buttonclick);
  document.body.appendChild(button);
}

/** Loads the table/playing board and Clear/Start button. */
function vis_loadpage() {
  vis_table();
  vis_button();
}