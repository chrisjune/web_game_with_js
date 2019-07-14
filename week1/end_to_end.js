var quiz = document.createElement('div');
quiz.textContent='Please enter start word';
document.body.append(quiz);

var form = document.createElement('form');
document.body.append(form);

var input = document.createElement('input');
form.append(input);

var button = document.createElement('button');
button.textContent='Input';
form.append(button);

var result = document.createElement('div');
document.body.append(result);

document.addEventListener('submit', function(event){
    event.preventDefault();
    result.textContent = '';
    if (quiz.textContent=='Please enter start word'){
        quiz.textContent=input.value;
    }
    else if (quiz.textContent[quiz.textContent.length-1] === input.value[0]){
        quiz.textContent=input.value;
    }
    else{
        result.textContent='WRONG';
    }
    input.value='';
    input.focus();
});
