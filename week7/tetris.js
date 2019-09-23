var ROWS = 20;
var COLS = 10;

blockData = [];
table = document.querySelector('#tetris')
for (var i=0;i<ROWS;i++){
    var tr = document.createElement('tr');
    var arr = [];
    for(var j=0;j<COLS;j++){
        var td = document.createElement('td');
        tr.appendChild(td);
        arr.push(0);
    }
    table.appendChild(tr);
    blockData.push(arr);
}

var blocks = []
blocks.push({'block': [[1,1,1,1]], 'color':'red'})
blocks.push({'block': [[1,1],[1,1]], 'color':'orange'})
blocks.push({'block': [[1,1,1],[1,0,0]], 'color':'yellow'})
blocks.push({'block': [[1,1,1],[0,0,1]], 'color':'green'})
blocks.push({'block': [[0,1,1],[1,1,0]], 'color':'skyblue'})
blocks.push({'block': [[1,1,0],[0,1,1]], 'color':'blue'})
blocks.push({'block': [[1,1,1],[0,1,0]], 'color':'purple'})

function generateBlock(){
    var random = Math.floor(Math.random()*blocks.length);
    return blocks[random]
}

function darwBlock(blockObj){
    var block = blockObj['block'];
    var color = blockObj['color'];
    block.forEach((row, idx)=>{
        row.forEach((col, idx2)=>{
            if (col){
                blockData[idx][idx2] = col;
                table.children[idx].children[idx2+3].textContent = col
                table.children[idx].children[idx2+3].style.backgroundColor = color;
            }
        })
    })
}

darwBlock(generateBlock());
