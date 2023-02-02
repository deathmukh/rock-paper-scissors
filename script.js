// Prevent animation on load
// setTimeout(() => {
//   document.body.classList.remove("preload");
// }, 500);

//for rules

const rulesButton = document.getElementById("display-rules");
const rulesContainer = document.querySelector(".rules1");
const closeButton = document.getElementById("terminate-rules");
rulesContainer.style.display = "none";


rulesButton.addEventListener("click", function () {
    rulesContainer.style.display = "block";
});

closeButton.addEventListener("click", function () {
    rulesContainer.style.display = "none";
});

// game code
const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".home-page");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".actual-result");

const resultWinner = document.querySelector(".winner-result");
const resultText = document.querySelector(".text-result");

const playAgainBtn = document.querySelector("#play-again");

const scoreNumber = document.querySelector(".score-count");
let score = 0;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const pcchoice = pcChoose();
  displayResults([choice, pcchoice]);
  displayWinner([choice, pcchoice]);
}

function pcChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/${results[idx].name}.png" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 500);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "YOU WON\n:)";
      resultDivs[0].classList.toggle("winner");
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = "YOU LOST \n:(";
      resultDivs[1].classList.toggle("winner");
      // tryAgain.style.display = 'block'
    } else {
      resultText.innerText = "IT'S A TIE!";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
    // tryAgain.style.display = 'block'
  }, 500);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// //Try Again
// const tryAgain = document.getElementById('tryAgain')

