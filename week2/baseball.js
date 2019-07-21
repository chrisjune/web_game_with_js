//Initialize
var body = document.body;

var div = document.createElement('div');
div.textContent = '숫자야구';
body.appendChild(div);

var counts = document.createElement('div');
body.appendChild(counts);

var form = document.createElement('form');
body.appendChild(form);

var input = document.createElement('input');
input.maxLength=4;
form.appendChild(input);

var button = document.createElement('button');
button.textContent = '입력';
form.appendChild(button);

var result = document.createElement('div');
body.appendChild(result);

var natural_number = [1,2,3,4,5,6,7,8,9]
var answer = []

// Make Answer
for(i=0;i<4;i++){
    var index = Math.floor(Math.random()*(9-i))
    answer.push(natural_number.splice(index, 1)[0])
}
console.log(answer)

// Validation
function validate_input_value(input_value){
    // String included
    if (input_value != parseInt(input_value, 10)){
        throw('It\'s not a number!');
    }
    // 0 included
    if (input_value.indexOf('0') >= 0){
        throw('0 is not acceptable value, please type natural number');
    }
    // Duplicated numbers
    number_set = new Set(input_value.split(''));
    if(number_set.size !== 4){
       throw('Please type unduplicable 4 numbers') 
    }
}
var total_count = 0;
counts.textContent = '남은 게임횟수는 '+(10-total_count)+'번 입니다';
// Submit Event
input.focus();
document.addEventListener('submit', function(event){
    event.preventDefault();
    if (total_count >= 10){
        alert('Game End');
        return;
    }
    try{
        validate_input_value(input.value);
    }
    catch(ex){
        alert(ex);
        return;
    }
    results = [];
    if (answer.join('') === input.value){
        counts.textContent = 'HOMERUN!';
        result.textContent = 'HOMERUN!';
        return;
    }
    for(i=0;i<4;i++){
        // Homerun
        input_value = Number(input.value[i]);
        if(input_value === answer[i]){
            results.push('H');
        }
        // Strike
        else if (answer.includes(input_value)){
            results.push('B');
        }
        // Ball
        else{
            results.push('S');
        }
    }
    console.log(results);
    total_count += 1;
    counts.textContent = '남은 게임횟수는 '+(10-total_count)+'번 입니다';

    result.textContent = results;
    input.focus();
});