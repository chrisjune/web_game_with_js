var ROWS = 20;
var COLS = 10;

blockData = [];
table = document.querySelector("#tetris");
for (var i = 0; i < ROWS; i++) {
  var tr = document.createElement("tr");
  var arr = [];
  for (var j = 0; j < COLS; j++) {
    var td = document.createElement("td");
    tr.appendChild(td);
    arr.push(0);
  }
  table.appendChild(tr);
  blockData.push(arr);
}

var blocks = [];
blocks.push({ block: [[1, 1, 1, 1]], color: "red" });
blocks.push({ block: [[1, 1], [1, 1]], color: "orange" });
blocks.push({ block: [[1, 1, 1], [1, 0, 0]], color: "yellow" });
blocks.push({ block: [[1, 1, 1], [0, 0, 1]], color: "green" });
blocks.push({ block: [[0, 1, 1], [1, 1, 0]], color: "skyblue" });
blocks.push({ block: [[1, 1, 0], [0, 1, 1]], color: "blue" });
blocks.push({ block: [[1, 1, 1], [0, 1, 0]], color: "purple" });

function generateBlock() {
  var random = Math.floor(Math.random() * blocks.length);
  return blocks[random];
}

function darwBlock(blockObj) {
  var block = blockObj["block"];
  var color = blockObj["color"];
  block.forEach((row, idx) => {
    row.forEach((col, idx2) => {
      if (col) {
        paintBlock(idx, idx2 + 3, color);
      }
    });
  });
}

var isLastLine = false;
function dropBlock(block) {
  var color = block['color'];
  if(isLastLine){
    return;
  }
  for(var i=ROWS-1;i>=0;i--){
      for(var j=0;j<COLS;j++){
        if(blockData[i][j]==1){
            paintBlock(i, j, 'white', 0);
            paintBlock(i+1, j, color);
            if(i+1 == ROWS-1){
                isLastLine=true;
            }
        }
      }
  }
}

function drawDropBlock(block) {
    darwBlock(block);
    for(var i=1;i<ROWS;i++){
        (function(i){
            setTimeout(()=>dropBlock(block), 100*i);
        })(i);
    }
}
var block = generateBlock();
drawDropBlock(block);

function paintBlock(rowIdx, colIdx, color, value=1) {
  blockData[rowIdx][colIdx] = value;

  if(value==0){
      value='';
  }
//   table.children[rowIdx].children[colIdx].textContent = value;
  table.children[rowIdx].children[colIdx].style.backgroundColor = color;
}
