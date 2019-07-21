var body = document.body;
var table = document.createElement('table');
var rows = [];
var cols = [];
var blank_count = 9;
var turn = 'X';

var number = function (event) {
    var col = event.target;
    var row = event.target.parentNode;
    row_num = rows.indexOf(row);
    col_num = cols[row_num].indexOf(col);

    var selected = cols[row_num][col_num]

    if (blank_count <= 0){
        return;
    }
    if (selected.textContent === '') {
        selected.textContent = turn;
        is_win(row_num, col_num);
        turn = change_turn(turn);
    }
}

function is_win(row, col) {
    // row check
    if (cols[row][0].textContent === turn &&
        cols[row][1].textContent === turn &&
        cols[row][2].textContent === turn) {
        print_win()
    }
    // col check
    if (cols[0][col].textContent === turn &&
        cols[1][col].textContent === turn &&
        cols[2][col].textContent === turn) {
        print_win()
    }
    // 대각선 check
    if (Math.abs(col - row) === 0) {
        if (cols[0][0].textContent === turn &&
            cols[1][1].textContent === turn &&
            cols[2][2].textContent === turn) {
            print_win()
        }
    }
    if (col + row === 2) {
        if (cols[0][2].textContent === turn &&
            cols[1][1].textContent === turn &&
            cols[2][0].textContent === turn) {
            print_win()
        }
    }
}
function print_win(){
    result.textContent = turn + ' is WIN!!!!';
    blank_count = 0;
}

function change_turn(turn) {
    blank_count--;
    if (turn === 'O') {
        return 'X';
    } else {
        return 'O';
    }
}
for (var i = 0; i < 3; i++) {
    console.log(i);
    var tr = document.createElement('tr');
    rows.push(tr);
    cols.push([]);
    for (var j = 0; j < 3; j++) {
        var td = document.createElement('td');
        cols[i].push(td)
        td.height = 100;
        tr.appendChild(td);
        td.addEventListener('click', number);
    }
    table.appendChild(tr);
}
var result = document.createElement('div');
body.appendChild(table);
body.appendChild(result);