var ROWS = 4;
var COLS = 4;
var tableData = [];
var table = document.getElementById("table");

// 데이터만 따로 생성
for (var i = 0; i < ROWS; i++) {
  var row = [];
  for (var j = 0; j < COLS; j++) {
    row.push(0);
  }
  tableData.push(row);
}


// 테이블 생성
for (var i = 0; i < ROWS; i++) {
  var tr = document.createElement("tr");
  for (var j = 0; j < COLS; j++) {
    var td = document.createElement("td");
    // td.textContent=0;
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

// 움직일 때 마다 새로운 셀 추가
function choiceRandomCell() {
  while (true) {
    var randomRow = Math.floor(Math.random() * ROWS);
    var randomCol = Math.floor(Math.random() * COLS);
    console.log(randomRow, randomCol);
    if (tableData.flat().indexOf(0)<0) {
      alert("게임오버");
      break;
    }
    if (tableData[randomRow][randomCol] == 0) {
      tableData[randomRow][randomCol] = 2;
      paint(table.children[randomRow].children[randomCol], 2);
      break;
    }
  }
}
choiceRandomCell();


// 마우스 Drag 이벤트 계산
var startEvent;
var mouseClicked = false;
document.addEventListener("mousedown", (event) => {
  mouseClicked = true;
  startEvent = event;
});
document.addEventListener("mouseup", (event) => {
  if (mouseClicked) {
    calculateDirection(startEvent, event);
    mouseClicked = false;
  }
});

// 마우스 드래그 방향계산
function calculateDirection(startEvent, endEvent) {
  diffX = endEvent.clientX - startEvent.clientX;
  diffY = startEvent.clientY - endEvent.clientY;

  console.log(diffX, diffY);
  if (Math.abs(diffX)<=5 && Math.abs(diffY)<=5){
      return;
  }

  if (Math.abs(diffX) >= Math.abs(diffY)) {
    if (diffX > 0) {
      console.log("right");
      right();
      fill('right');
    } else if (diffX<0) {
      console.log("left");
      left();
      fill('left');
    }
  }
  if (Math.abs(diffY) >= Math.abs(diffX)) {
    if (diffY > 0) {
      console.log("up");
      up();
      fill("up");
    } else if (diffY<0){
      console.log("down");
      down();
      fill("down");
    }
  }
  fillTable();
  choiceRandomCell();
}


// 키보드 방향키 이벤트 추가
document.addEventListener('keydown', (event) => {
    key = event.code;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(key)>=0){
        if (key == 'ArrowUp'){
            up();
            fill('up');
        }else if (key == 'ArrowDown'){
            down();
            fill('down');
        }else if (key == 'ArrowRight'){
            right();
            fill('right');
        }else if (key == 'ArrowLeft'){
            left();
            fill('left');
        }
        fillTable();
        choiceRandomCell();
    }
});


document.addEventListener('keydown', (event)=>{console.log(event)})



// down
var cellValueStoarage = [];
function down() {
  cellValueStoarage = [];
  for (var i = 0; i < COLS; i++) {
    var col = [];
    for (var j = 0; j < ROWS; j++) {
      data = tableData[ROWS-j-1][i];
      if (data != 0) {
        col.push(data);
      }
    }
    cellValueStoarage.push(col);
  }
}

// up
var cellValueStoarage = [];
function up() {
  cellValueStoarage = [];
  for (var i = 0; i < COLS; i++) {
    var col = [];
    for (var j = 0; j < ROWS; j++) {
      data = tableData[j][i];
      if (data != 0) {
        col.push(data);
      }
    }
    cellValueStoarage.push(col);
  }
}

//right
var cellValueStoarage = [];
function right() {
  cellValueStoarage = [];
  for (var i = 0; i < ROWS; i++) {
    var col = [];
    for (var j = 0; j < COLS; j++) {
      data = tableData[i][COLS-j-1];
      if (data != 0) {
        col.push(data);
      }
    }
    cellValueStoarage.push(col);
  }
}

//left
var cellValueStoarage = [];
function left() {
  cellValueStoarage = [];
  for (var i = 0; i < ROWS; i++) {
    var col = [];
    for (var j = 0; j < COLS; j++) {
      data = tableData[i][j];
      if (data != 0) {
        col.push(data);
      }
    }
    cellValueStoarage.push(col);
  }
}

//Row, Col 방향으로 모은 데이터를 합산
function summaryStorage(){
    cellValueStoarage.forEach(function(ele, idx){
        for (var i=0;i<ele.length;i++){
            if(i+1<ele.length && ele[i]===ele[i+1]){
                ele[i] = ele[i]*2;
                ele.splice(i+1,1);
            }
        }
    });
}

// 움직일 때 데이터 리셋후 재 계산된 데이터로 갱신
function fill(direction) {
  tableData = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  summaryStorage();
  for (var j = 0; j < COLS; j++) {
    cellValueStoarage[j].forEach(function(ele, idx) {
      var rowIndex = 0;
      if (direction == "down") {
        rowIndex = ROWS - idx - 1;
        tableData[rowIndex][j] = ele;
      } else if (direction == 'up'){
        rowIndex = idx;
        tableData[rowIndex][j] = ele;
      } else if (direction == 'right'){ 
          colIndex = COLS-idx -1;
          tableData[j][colIndex] = ele;
      } else if (direction == 'left'){
        colIndex = idx;
        tableData[j][colIndex] = ele;
      }
    });
  }
}


// 데이터를 가지고 테이블에 새로 갱신
function fillTable() {
  for (var i = 0; i < ROWS; i++) {
    for (var j = 0; j < COLS; j++) {
     var data = tableData[i][j];
      if (data == 0) {
        paint(table.children[i].children[j], "");
      } else {
        paint(table.children[i].children[j],tableData[i][j]);
      }
    }
  }
}

// 셀 숫자에 맞는 셀 이미지 변경
function paint(source, value){
    source.className = '';
    switch(value){
        // case "":
            // source.className = '';
            // break;
        case 2:
            source.classList.add('num2');
            break;
        case 4:
            source.classList.add('num4');
            break;
        case 8:
            source.classList.add('num8');
            break;
        case 16:
            source.classList.add('num16');
            break;
        case 32:
            source.classList.add('num32');
            break;
        case 64:
            source.classList.add('num64');
            break;
        case 128:
            source.classList.add('num128');
            break;
        case 1024:
            source.classList.add('num1024');
            break;
        case 2048:
            source.classList.add('num2048');
            break;
        case 4096:
            source.classList.add('num4096');
            break;
    }
}
