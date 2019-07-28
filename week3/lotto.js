var num_list = Array(45)
  .fill()
  .map(function(ele, index) {
    return index + 1;
  });
console.log(num_list);

// Math.random
var shuffle = [];
var i = 0;
while (num_list.length > 0) {
  splice_index = Math.floor(Math.random() * num_list.length);
  shuffle.push(num_list.splice(splice_index, 1)[0]);
  i++;
}
var lotto_number = shuffle.slice(0, 6).sort(
    function(p, c){
        return p-c;
    }
);
var bonus_number = shuffle.slice(shuffle.length - 1);
console.log(lotto_number);
console.log(bonus_number);

function create_and_append_div(object, text) {
  var div = document.createElement("div");
  div.textContent = text;
  object.appendChild(div);
}

var make_ball = function(text){
      var ball = document.createElement('div');
      ball.textContent = text;
      ball.style.display = 'inline-block';
      ball.style.border = '1px solid black';
      ball.style.borderRadius = '10px';
      ball.style.width='20px';
      ball.style.height='20px';
      ball.style.textAlign = 'center';
      ball.style.marginRight = '10px';
      ball.style.fontSize = '15px';
      ball.style.background = get_bg_color(text);
      return ball
}

var get_bg_color = function(text){
    number = Number(text);
    if (number<=10) return 'red';
    if (number<=20) return 'orange';
    if (number<=30) return 'yellow';
    if (number<=40) return 'blue';
    if (number<=50) return 'green';
}

var lotto_div = document.getElementById("result");
lotto_number.forEach(function(number, index) {
  function run(i) {
    setTimeout(function() {
      lotto_div.appendChild(make_ball(number));
    }, 100 * (i+1));
  }
  run(index);
});

var bonus_div = document.getElementById("bonus");
setTimeout(function() {
    bonus_div.appendChild(make_ball(bonus_number));
}, 700);

