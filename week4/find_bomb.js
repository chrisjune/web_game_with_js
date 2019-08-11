var exec = document.querySelector('#exec')
var table = document.querySelector('#table tbody')
var row = document.querySelector('#row')
var col = document.querySelector('#col')
var bomb = document.querySelector('#bomb')
var rows = null
var cols = null
var bombs = null

// 판 만들기
var par_td;
var par_tr;
var board = [];

// 게임종료체크
var closed_count = null
exec.addEventListener('click', function (event) {
    var i, j;
    table.innerHTML = '';
    board = [];
    rows = row.value;
    cols = col.value;
    closed_count = rows * cols;
    bombs = Number(bomb.value)

    for (i = 0; i < rows; i++) {
        var board_row = [];
        board.push(board_row);
        tr = document.createElement('tr');
        for (j = 0; j < cols; j++) {
            board_row.push(1);
            td = document.createElement('td');
            td.addEventListener('contextmenu', right_click_event);
            td.addEventListener('click', click_event);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    make_bomb();
})

function right_click_event(event) {
    event.preventDefault();
    par_td = event.currentTarget;
    par_tr = event.currentTarget.parentNode; // tr
    console.log(par_tr.rowIndex, par_td.cellIndex);
    change_cell(par_tr.rowIndex, par_td.cellIndex);
}


function make_bomb() {
    var array = Array(rows * cols)
        .fill()
        .map(function (ele, index) {
            return index + 1;
        });
    array = shuffle(array);
    array = point_bomb(array);
}

function point_bomb(array) {
    target = array.slice(0, bombs);
    target.forEach(element => {
        var row_idx = Math.ceil(element / cols);
        var col_idx = element % cols;
        if (col_idx == 0) {
            col_idx = 10;
        }
        console.log(element, row_idx, col_idx);
        get_cell(row_idx - 1, col_idx - 1).textContent = 'X';
        board[row_idx - 1][col_idx - 1] = 'X';
    });
}

function shuffle(arr) {
    var x, i, j;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = arr[i]
        arr[i] = arr[j]
        arr[j] = x
    }
    return arr
}

function change_cell(row, col) {
    var cell = get_cell(row, col);
    if (cell.className === 'opened'){
        return;
    }
    var origin = cell.textContent;

    function which_cell() {
        cell.removeEventListener('click', click_event);
        if (origin === '' || origin === 'X') {
            cell.className = 'flag';
            return '!';
        }
        if (origin === '!') {
            cell.className = 'question';
            return '?';
        }
        if (board[row][col] == 'X') {
            cell.className = 'blank';
            return 'X';
        }
        cell.addEventListener('click', click_event);
        cell.className = 'blank';
        return '';
    }

    result = which_cell();
    cell.textContent = result;
    if (closed_count === bombs){
        alert('모두 찾으셨습니다.')
    } 
}

function click_event(event) {
    event.preventDefault();
    par_td = event.currentTarget;
    par_tr = event.currentTarget.parentNode; // tr
    var row = par_tr.rowIndex;
    var col = par_td.cellIndex;
    console.log(row, col);

    if (par_td.className !== ''){
        return;
    }
    // par_td.classList.add('opened');
    var bomb = calculate_bomb(row, col);
    if (bomb==='펑'){
        mark_fail();
        return;
    }
    par_td.classList.add(set_number_cell(bomb));
 

    if (bomb == 0){
        var cordinate = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ]
        cordinate.forEach(function (ele, index) {
            var r = row + ele[0];
            var c = col + ele[1];
            if ( r < 0 || rows<= r || c < 0 || cols <= c){
                return;
            }
            if (board[r][c] === 'X'){
                return;
            }
            var cell = get_cell(r, c);
            if (cell && cell.className == ''){
                cell.click();
            }
            
        });
    }
    closed_count--;
    if (closed_count === bombs){
        alert('모두 찾으셨습니다.')
    }
}

function mark_fail(){
    for (var i=0;i<rows;i++){
        for (var j=0;j<cols;j++){
            var cell = get_cell(i, j)
            cell.removeEventListener('click', click_event);
            cell.removeEventListener('contextmenu', right_click_event);
            if (board[i][j] === 'X'){
                cell.textContent='X';
                cell.classList.add('bomb')
            }
        }
    }
}
function calculate_bomb(row, col) {
    if (board[row][col] === 'X') {
        return '펑';
    }

    var total_count = 0;
    var cordinate = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ]
    cordinate.forEach(function (ele, index) {
        var r = row + ele[0];
        var c = col + ele[1];
        if (0 <= r && r < rows && 0 <= c && c < cols && board[r][c] === 'X') {
            total_count++;
        }
    });
    return total_count;

}

function set_number_cell(number){
    switch(number){
        case 0:
            return 'zero';
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'three';
        case 4:
            return 'four';
        case 5:
            return 'five';
        case 6:
            return 'six';
        case 7:
            return 'seven';
        case 8:
            return 'eight';
    }
}


function get_cell(row, col){
    if(0 <= row && row < rows && 0 <= col && col < cols){
        return table.children[row].children[col];
    }
    return;
}
