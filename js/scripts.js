// Source of truth
var players = [
  {
    name: "Walid",
    score: 0,
    id: 1,
  },
  {
    name: "Rania",
    score: 0,
    id: 2,
  },
  {
    name: "Malek",
    score: 0,
    id: 3,
  },
  {
    name: "Soheib",
    score: 0,
    id: 4,
  },
  {
    name: "Narimene",
    score: 0,
    id: 5,
  },
];

// Selectors
var playersContainer = document.getElementById("players");
var playersNumber = document.querySelector("[data-players]");
var playersTotalScore = document.querySelector("[data-total]");
var newPlayerInput = document.querySelector("[name='newplayer']");

// Handlers
function removePlayer(id) {
  players = players.filter(function (player) {
    return player.id != id;
  });
  printPlayers();
}

function handleScoreChange(index, delta) {
  var newScore = players[index].score + delta;
  if (players[index].score >= 0 && newScore >= 0) players[index].score += delta;
  printPlayers();
}

function handleAddPlayer(event) {
  event.preventDefault();
  if (newPlayerInput.value) {
    players.push({
      name: newPlayerInput.value,
      score: 0,
      id: players.length + 1,
    });
    newPlayerInput.value = "";
  }

  printPlayers();
}

function printPlayersNumber() {
  playersNumber.innerText = players.length;
}

function printTotalScore() {
  var total = 0;

  players.forEach(function (player) {
    total += player.score;
  });

  playersTotalScore.innerText = total;
}

function topScore() {
  var topScore = 0;

  players.forEach(function (player) {
    if (player.score >= topScore) topScore = player.score;
  });

  return topScore;
}

function printPlayers() {
  // Reset players
  playersContainer.innerHTML = "";

  var highScore = topScore();

  players.forEach(function (player, index) {
    playersContainer.innerHTML += `<div class="player"><span class="player-name"><button class="remove-player" onclick="removePlayer(${
      player.id
    })">✖</button><svg viewBox="0 0 44 35" class="${
      player.score === highScore && player.score !== 0 ? "is-high-score" : ""
    }">
    <path d="M26.7616 10.6207L21.8192 0L16.9973 10.5603C15.3699 14.1207 10.9096 15.2672 7.77534 12.9741L0 7.24138L6.56986 28.8448H37.0685L43.5781 7.72414L35.7425 13.0948C32.6685 15.2672 28.3288 14.0603 26.7616 10.6207Z" transform="translate(0 0.301727)"/>
    <rect width="30.4986" height="3.07759" transform="translate(6.56987 31.5603)"/>
    </svg>${player.name}</span>
    <div class="counter"><button class="counter-action decrement" onclick="handleScoreChange(${index}, -1)"> - </button><span
            class="counter-score">${
              player.score
            }</span><button class="counter-action increment" onclick="handleScoreChange(${index}, 1)"> + </button></div>
</div>`;
  });

  printPlayersNumber();
  printTotalScore();
}

// Initialization
function init() {
  printPlayers();
}

init();
