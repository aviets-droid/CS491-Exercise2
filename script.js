var gamestate = "Idle";
const rows = 3;
const cols = 3;
const whitespace = "\u00A0";
const computerchar = "X";
const playerchar = "O";

// Computational functions

function arrayeq(arr) {
  const fe = arr[0];
  if (fe === whitespace) {
    return false;
  }
  else {
    return arr.every(elem => elem === fe);
  }
}

function colorcells(cellarr, color) {
  cellarr.forEach(cell => {
    cell.style.color = color;
  });
}

function com_checkwin() {
  var tbl = document.getElementById("table");
  var tblrows = tbl.rows;
  var row1 = tblrows[0].cells;
  row1.style.color = "red";

  // if (arrayeq(row1)) {
  //   colorcells(row1, "red");
  // }
}

function com_nextMove() {
  if (gamestate == "FirstMove") {
    for (let i=1; i<=2; i++){
    com_setrandemptycell(computerchar);
    }
    gamestate = "PlayerTurn";
  }
  else if (gamestate == "ComputerTurn") {
    com_setrandemptycell(computerchar);
    gamestate = "PlayerTurn";
  }
  com_checkwin();
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
    com_cleartable();
  }
}

function com_cleartable() {
  var tbl = document.getElementById("table");
  for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++) {
      com_setcell(i, j, whitespace);
    }
  }
}

function com_cellclick(event) {
  var clickedcell = event.target;
  if (clickedcell.textContent != computerchar && gamestate == "PlayerTurn") {
    clickedcell.textContent = playerchar;
    gamestate = "ComputerTurn";
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

document.addEventListener("load", vis_loadpage());