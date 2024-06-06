// 1
let number = 5;
let url = "http://numbersapi.com";

$.getJSON(`${url}/${number}/?json`)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error("Error getting number facts", err);
  });

// 2
let numbers = [1, 2, 3];

$.getJSON(`${url}/${numbers}/?json`).then((data) => {
  console.log(data);
});

// 3

$(document).ready(function () {
  $("#numberForm").on("submit", function (event) {
    event.preventDefault();
    const num = $("#inputNum").val();
    fetchNumberFacts(num);
  });
});

function fetchNumberFacts(num) {
  const baseUrl = `http://numbersapi.com/${num}`;

  Promise.all(Array.from({ length: 4 }, () => $.getJSON(`${baseUrl}/?json`)))
    .then((facts) => {
      const factTexts = facts.map((fact) => fact.text);
      displayFacts(factTexts);
    })
    .catch((err) => {
      console.error("Error", err);
      $("#factsList").html("<li>Failed to fetch facts.</li>");
    });
}

function displayFacts(facts) {
  const $factsList = $("#factsList");
  $factsList.empty();
  facts.forEach((fact) => {
    $factsList.append(`<li>${fact}</li>`);
  });
}
