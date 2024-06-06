// 1
let baseURL = "https://deckofcardsapi.com/api/deck";

$.getJSON(`${baseURL}/new/draw`).then((data) => {
  let { suit, value } = data.cards[0];
  console.log(`${value} of ${suit}`);
});

// 2
let firstCard = null;
$.getJSON(`${baseURL}/new/draw`)
  .then((data) => {
    firstCard = data.cards[0];
    let deckId = data.deck_id;
    return $.getJSON(`${baseURL}/${deckId}/draw`);
  })
  .then((data) => {
    secondCard = data.cards[0];
    [firstCard, secondCard].forEach(function (card) {
      console.log(`${card.value} of ${card.suit}`);
    });
  });

// 3
let deckId = null;
let $button = $("button");
let $cardArea = $("#card-area");

$.getJSON(`${baseURL}/new/shuffle`).then((data) => {
  deckId = data.deck_id;
  $button.show();
});

$button.on("click", function () {
  $.getJSON(`${baseURL}/${deckId}/draw`).then((data) => {
    let cardSrc = data.cards[0].image;
    let img = $("<img>").attr("src", cardSrc).attr("alt", "Playing card");
    $cardArea.append(img);
    if (data.remaining === 0) $button.remove();
  });
});
