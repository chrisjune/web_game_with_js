var left=0;
var choice = {
    rock:'0',
    scissors:'-261px',
    paper:'-520px'
}
var winning_case = [
    ['rock','scissors'],
    ['scissors', 'paper'],
    ['paper','rock']
]
var entries = Object.entries(choice);
var get_computer_choice = function(cord){
    return entries.find(function(v){
        return v[1] == cord
    });
}

var interval;
var interval_maker = function(){
        interval = setInterval(function(){
        if(left==choice['rock']){
            left=choice['scissors'];
        }
        else if(left==choice['scissors']){
            left=choice['paper']
        }
        else{
            left=choice['rock'];
        }
        document.querySelector('#computer').style.background = 
            'url(rock_paper_scissors.png) ' + left + ' 0';
    }, 100);
};
interval_maker();

var print_result = function(my, com){
    var result;
    var is_find = winning_case.findIndex(function(c){
        return c[0] == my && c[1] == com;
    });
    console.log('I:',my,'Com:',com);
    if (my == com){
        console.log('비겼습니다');
        result = 'Draw';
    }
    else if (is_find>-1){
        console.log('이겼습니다');
        result = 'Win';
    }
    else{
        console.log('졌습니다');
        result = 'Lose';
    }
    document.querySelector('#result').textContent=result;
}

buttons = document.querySelectorAll('.btn');
buttons.forEach(function(button){
    button.addEventListener('click', function(){
        clearInterval(interval);
        setTimeout(interval_maker, 1000);
        var mychoice = button.textContent;
        var computerchoice = get_computer_choice(left)[0];
        print_result(mychoice, computerchoice);
    });
});