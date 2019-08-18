var screen = document.querySelector('#screen');
var state = {};
var start_date, end_date;
var action_time;
var ready;
screen.addEventListener('click', function(){
    if (screen.classList.contains('waiting') || screen.classList.contains('not_ready')){
        ready = false;
        screen.classList.remove(screen.className);
        screen.classList.add('ready');
        screen.textContent = '초록색이 되면 클릭하세요';
        action_time = Math.floor(Math.random()* 1000)+2000;
        setTimeout(function(){
            ready = true;
            screen.click();
        }, action_time);
    }
    else if (screen.classList.contains('ready')){
        start_date = new Date();
        screen.classList.remove('ready');
        if (!ready){
            screen.classList.add('not_ready');
            screen.textContent='미리 클릭하셨습니다';
            return;
        }
        screen.classList.add('now');
        screen.textContent = '클릭하세요!';
    }
    else if (screen.classList.contains('now')){
        if (start_date){
            end_date = new Date();
            console.log((end_date - start_date)/1000);
        }
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요!'
    }
})
// 보라색 = 예약어
