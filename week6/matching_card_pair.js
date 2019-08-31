card_count = 12;
color_list = [
  "red",
  "red",
  "orange",
  "orange",
  "white",
  "white",
  "black",
  "black",
  "green",
  "green",
  "skyblue",
  "skyblue"
];
card_list = [];
open_queue = [];
wrapper = document.querySelector(".wrapper");

function main() {
  shuffle();
  wrapper.innerHTML='';
  for (var i = 0; i < card_count; i++) {
    card = document.createElement("div");
    card.className = "card";
    card_inner = document.createElement("div");
    card_inner.className = "card-inner";

    // front back
    card_front = document.createElement("div");
    card_front.className = "card-front";
    card_back = document.createElement("div");
    card_back.className = "card-back";
    card_back.style.backgroundColor = color_list[i];

    card_inner.appendChild(card_front);
    card_inner.appendChild(card_back);
    card.appendChild(card_inner);
    wrapper.appendChild(card);
    card_list.push(card);
  }
  open_all();
  setTimeout(function() {
    close_all();
    event();
  }, 3000);
}
main();

function event() {
  card_list.forEach(function(card) {
    (function(c) {
      card.addEventListener("click", function() {
        if (open_queue.length >= 2) {
          return;
        }

        if (open_queue.length == 1 && is_same_card([open_queue[0], c])) {
          return;
        }
        open_queue.push(c);

        c.classList.toggle("flipped");

        if (open_queue.length <= 1) {
          return;
        }

        if (is_pair_card(open_queue)) {
          open_cards(open_queue);
          open_queue = [];

          if (!card_list.length) {
            setTimeout(function() {
              alert("카드를 모두 맞추셨습니다");
              main();
            }, 100);
          }
          return;
        }
        setTimeout(function() {
          open_queue.forEach(function(open_card) {
            open_card.className = "card";
          });
          open_queue = [];
        }, 1000);
      });
    })(card);
  });
}

function open_all() {
  card_list.forEach(function(card, index) {
    (function(i) {
      setTimeout(function() {
        card.classList.toggle("flipped");
      }, i * 100);
    })(index);
  });
}

function close_all() {
  card_list.forEach(function(card) {
    card.className = "card";
  });
}

function shuffle() {
  var result = [];
  while (color_list.length > 0) {
    var num = Math.floor(Math.random() * color_list.length);
    result.push(color_list.splice(num, 1)[0]);
  }
  color_list = result;
}

function is_pair_card(cards) {
  var first_card_color = cards[0].querySelector(".card-back").style
    .backgroundColor;
  var last_card_color = cards[1].querySelector(".card-back").style
    .backgroundColor;
  if (first_card_color == last_card_color) {
    return true;
  }
  return false;
}

function is_same_card(cards) {
  var first_card_index = card_list.indexOf(cards[0]);
  var last_card_index = card_list.indexOf(cards[1]);
  if (
    first_card_index >= 0 &&
    last_card_index >= 0 &&
    first_card_index == last_card_index
  ) {
    return true;
  }
  return false;
}

function open_cards(cards) {
  cards.forEach(function(card) {
    index = card_list.indexOf(card);
    card_list.pop(index);
  });
}
