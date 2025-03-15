const CONTAINER = document.querySelector("#container");
CONTAINER.style.backgroundImage = "url('pics/background.jpg')"; 
CONTAINER.classList.add("container");

const INPUTSECTION = document.querySelector("#inputSection");
INPUTSECTION.classList.add("inputSection");

const DIFFICULTYSECTION = document.querySelector("#difficultySection");
DIFFICULTYSECTION.classList.add("difficultySection");

const RULES_GAME = document.querySelector("#rules_game_Button");
RULES_GAME.classList.add("rules-start-buttons-container");


const TITLE = document.createElement("h1");
TITLE.innerText = "Railways";
CONTAINER.appendChild(TITLE);

//default is easy
let GAMECONTAINER = document.querySelector('#easy');
GAMECONTAINER.classList.add('gamecontainer');
GAMECONTAINER.style.display = "none";

const LEADERBOARD = document.querySelector("#leaderboard");
LEADERBOARD.classList.add('container');
LEADERBOARD.style.display = "none";

const PLAYER_INPUT = document.createElement("input");
PLAYER_INPUT.setAttribute("type", "text");
PLAYER_INPUT.setAttribute("placeholder", "Enter your name");
PLAYER_INPUT.classList.add("title");  
INPUTSECTION.appendChild(PLAYER_INPUT);

const DIFFICULTY_LABEL = document.createElement("p");
DIFFICULTY_LABEL.innerText = "SET THE DIFFICULTY!";
DIFFICULTY_LABEL.classList.add("difficultyLabel");
DIFFICULTYSECTION.appendChild(DIFFICULTY_LABEL);

const DIFFICULTIES = [
    { level: "5 x 5", label: "EASY" },
    { level: "7 x 7", label: "HARD" }
];

let selectedDifficulty = "5 x 5"; // Default selected difficulty is easy

DIFFICULTIES.forEach(difficulty => {
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("button_container");

    const btnlabel = document.createElement("label");
    btnlabel.classList.add("button_label");
    btnlabel.innerText = difficulty.label;

    const difficultyButton = document.createElement("button");
    difficultyButton.classList.add("difficulty-button");
    difficultyButton.setAttribute("data-level", difficulty.level);
    difficultyButton.setAttribute("data-label", difficulty.label);
    difficultyButton.innerText = difficulty.level;

    if (difficulty.level === selectedDifficulty) {
        difficultyButton.classList.add("selected");
    }

    difficultyButton.addEventListener("click", () => {
        selectedDifficulty = difficulty.level;
        document.querySelectorAll(".difficulty-button").forEach(btn => {
            btn.classList.remove("selected");
        });
        difficultyButton.classList.add("selected");
    });

    
    btnDiv.appendChild(difficultyButton);
    btnDiv.appendChild(btnlabel);

    
    DIFFICULTYSECTION.appendChild(btnDiv);
});

const RULES_BUTTON = document.createElement("button");
RULES_BUTTON.innerText = "RULES";
RULES_BUTTON.classList.add("rules-start-button");  
RULES_BUTTON.addEventListener("click",getTheRules);

const START_GAME_BUTTON = document.createElement("button");
START_GAME_BUTTON.innerText = "START GAME";
START_GAME_BUTTON.classList.add("rules-start-button");

START_GAME_BUTTON.addEventListener("click",() => {
    if(selectedDifficulty == "7 x 7") HideMainMenu(7);
    else HideMainMenu(5);
})

RULES_GAME.appendChild(RULES_BUTTON);
RULES_GAME.appendChild(START_GAME_BUTTON);

CONTAINER.appendChild(INPUTSECTION);
CONTAINER.appendChild(DIFFICULTYSECTION);
CONTAINER.appendChild(RULES_GAME);










