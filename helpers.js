class Tile{
    constructor(type,rotation){
        this.type = type;
        this.rotation = rotation;
        this.railway = false;
        this.railType;
    }
    
    getType(){return this.type;}

    setRailType(type){this.railType = type;} // for the empty 
    getRailType(){return this.railType;}

    getRot() {return this.rotation;}


    getRail(){return this.railway;}
    setRail(){this.railway = true;}
    remRail(){this.railway = false;}

    setRot(angle){this.rotation = angle;} // for when the tile is rotated :)
}
class Player{
    constructor(name){
        this.name = name;
        this.finishing_time = "";
    }
    getName(){return this.name;}
    setFinishingTime(time){this.finishing_time = time;}
    getFinishingTime(){return this.finishing_time;}
}


const RulesText = "In Seeknotland, King No-Name wants to build a circular railway that visits every corner of his realm. The task is entrusted to Trickles, the royal advisor, whose work is made difficult by the kingdom's varied terrain. Let's help Trickles design the map for the kingdom's railway network!" + " Right click to add the Rail and normal click to rotate";



// for the pop up window for the rules and input checking 
function CreateModal(Title, Content) {
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const closeButton = document.createElement('span');
    const title = document.createElement('h2');
    const rules = document.createElement('p');

    closeButton.textContent = '×';
    title.textContent = Title;
    rules.textContent = Content;

    modal.classList.add('modal');
    modalContent.classList.add('modal-content');
    closeButton.classList.add('close-button');
    title.classList.add('modal-title');
    rules.classList.add('rules-text');

    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(rules);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);


    function showModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeButton.addEventListener('click', hideModal);
    
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });
    return showModal;
}

function getTheRules(){
    const showModal = CreateModal("Game Rules", RulesText);
    showModal();
}

function HideMainMenu(n){

    if(PLAYER_INPUT.value !== "" ){
        player = new Player(PLAYER_INPUT.value);
        console.log(Players);
        CONTAINER.style.display = 'none';
        Game(n);
        
    }else{
        const showModal = CreateModal("WARNING", "Enter the players name first !"); 
        showModal();  
    }
}



function timeToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
}
function secondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}


// the timer 
const TIMER = document.createElement('div');
function startTimer() {
    let sec = 0;
    timer = setInterval(() => {
    const minutes = String(Math.floor(sec / 60)).padStart(2, '0');
    const seconds = String(sec % 60).padStart(2, '0');
    TIMER.innerHTML = `${minutes}:${seconds}`;
    sec++;
    }, 1000);
}
function stopTimer() {
    clearInterval(timer); // Stop the timer
    player.setFinishingTime(TIMER.innerHTML); // Store the current time in the variable
    Players.push(player);
    //console.log("Timer stopped at:", player.getFinishingTime());
}