//MAPS

const MAP = document.createElement('div');
MAP.classList.add("tile-container_e");
tilebase = levels.easy;

let Players = []; // list of player objects 
// the new player is initialized when the start game button is clicked in the HideMainMenu function.

function Game(n) {
    if(n == 7){
    GAMECONTAINER = document.querySelector('#hard');
    GAMECONTAINER.style.display = 'block';
    GAMECONTAINER.classList.add('gamecontainer');

    MAP.classList.add("tile-container_h");
    tilebase = levels.hard;
    }
    
    const mapIndex = Math.floor(Math.random() * 5); // five maps for each
    console.log(mapIndex+1);

    //timer and name
    const SIDEPANEL = document.createElement('div');
    const PLAYERS_NAME = document.createElement('h1');
    SIDEPANEL.classList.add("side_panel");
    PLAYERS_NAME.innerHTML = PLAYER_INPUT.value;
    const TIMELASPE = document.createElement('div');
    TIMELASPE.innerText = "ELAPSED TIMER";
    // timer in sources.js
    let timer;
    TIMER.innerHTML = "00:00";
    TIMER.classList.add('timer');

    
    TIMELASPE.appendChild(TIMER);
    SIDEPANEL.appendChild(PLAYERS_NAME);
    SIDEPANEL.appendChild(TIMELASPE);

    // methods that are called on each click :


    // on click
    let rotationAngle = 0;
    function Rotation(tileimg, index){
        // only if it has been changed before and is empty
        if(MAP_ARRAY[index].getRail() && MAP_ARRAY[index].getType() == "empty"){
            if(rotationAngle >= 360){rotationAngle = 0;} // so that it can stay in range (90->360) easyier :)
            rotationAngle +=90;
            MAP_ARRAY[index].setRot(rotationAngle); // assign new angle based on the rotation.
            tileimg.style.transform = `rotate(${rotationAngle}deg)`;
        }
        
        
    }

    //helpers of emptying the tiles 
    let change = 0;
    let change2 =1;
    let change3 = 1;
    // on right click
    function ChangeTile(tileimg, index){
        let newTile = MAP_ARRAY[index];
        switch(newTile.getType()){
            case "bridge":
                if (change3 % 2 != 0){
                    tileimg.src = "pics/tiles/bridge_rail.png";
                    change3 +=1;
                    MAP_ARRAY[index].setRail();}
                else{tileimg.src = "pics/tiles/bridge.png";
                     change3 +=1;
                     MAP_ARRAY[index].remRail();}
                if(newTile.getRot() == 90) tileimg.style.transform = 'rotate(90deg)';
                break;

            case "mountain":
                if (change2 % 2 != 0){
                    tileimg.src = "pics/tiles/mountain_rail.png";
                    change2 +=1;
                    MAP_ARRAY[index].setRail();}

                else{tileimg.src = "pics/tiles/mountain.png";
                    change2 +=1;
                    MAP_ARRAY[index].remRail();}
                
                if(newTile.getRot() == 90) tileimg.style.transform = 'rotate(90deg)';
                else if(newTile.getRot() == 180) tileimg.style.transform = 'rotate(180deg)';
                else if(newTile.getRot() == 270) tileimg.style.transform = 'rotate(270deg)';
                break;

            case "empty":
                let path;
                switch (change % 3) { 
                    case 0:
                        path = "pics/tiles/curve_rail.png";
                        MAP_ARRAY[index].setRailType("curved_rail");
                        MAP_ARRAY[index].setRail();
                        break;
                    case 1:
                        path = "pics/tiles/straight_rail.png";
                        MAP_ARRAY[index].setRailType("straight_rail");
                        MAP_ARRAY[index].setRail();
                        break;
                    case 2:
                        path = "pics/tiles/empty.png"; 
                        MAP_ARRAY[index].setRailType("cross_rail");
                        MAP_ARRAY[index].remRail();
                        break;
                    }
                
                tileimg.src = path;
                change += 1;
                break;
            }
        
        //console.log(MAP_ARRAY[index].getRail());
    }

    
    // this is my attempt in making the railway validating the function, unfortunatly I dont
    // know what am i doing wrong in the logic. The logic is: depending on the clicked tile i want to check 
    //the surrondings, and i case the clicked one is a bridge for example i check if the one (above or below) or
    // (left or right) of it based on the rotation property of that tile using resursion :) same is applied for other
    // types of tiles. In case you want to look at this function at the end jump to line 260

    /*
    let isValidationInProgress = false;
    let firstClickIndex = null;
    let visited = [];

    function Valid(index, n) {
    if (!isValidationInProgress) {
        isValidationInProgress = true;
        firstClickIndex = index;
        visited = [];
    }
        startIndex = index
        if (!MAP_ARRAY[index].getRail()) {
            return false;
        }
        if (visited.includes(index)) {
            return (index + 1 === firstClickIndex || index - 5 === firstClickIndex)// Return true only if we're back at start
        }
        visited.push(index);

        if(MAP_ARRAY[index].getType() == "mountain" && MAP_ARRAY[index].getRail()){
            switch(MAP_ARRAY[index].getRot()){ // based on the rotation i know which sides im checking
                case 90:
                    //top and right
                    if(index - n >= 0 && MAP_ARRAY[index - n].getRail()){
                        return(Valid(index-n,n));
                    }else if(index + 1 < n*n && MAP_ARRAY[index + 1].getRail()){
                        return(Valid(index+1,n));
                    }break;
                case 180:
                    // top and left
                    if(index - n >= 0 && MAP_ARRAY[index - n].getRail()){
                        return(Valid(index-n,n));
                    }else if(index - 1 >= 0 && MAP_ARRAY[index - 1].getRail()){
                        return(Valid(index-1,n));
                    }break;
                case 270:
                    // bottom and left
                    if(index + n <n*n && MAP_ARRAY[index + n].getRail()){
                        return(Valid(index+n,n));
                    }else if(index - 1 >= 0 && MAP_ARRAY[index - 1].getRail()){
                        return (Valid(index-1,n));
                    }break;
                default : // 0 or 360 : we check the right and the bottom
                    if(index + n < n*n && MAP_ARRAY[index + n].getRail()){
                        return(Valid(index+n,n));
                    }else if(index + 1 < n*n && MAP_ARRAY[index + 1].getRail()){
                        return(Valid(index+1,n));
                    }
                    break;
            }
        }
        else if(MAP_ARRAY[index].getType() == "bridge" && MAP_ARRAY[index].getRail()){
            switch(MAP_ARRAY[index].getRot()){
                case 90: 
                // left and right
                    if(index - 1 >= 0 && MAP_ARRAY[index - 1].getRail()){
                        return Valid(index-1,n);
                    }else if(index + 1 < n*n && MAP_ARRAY[index + 1].getRail()){
                        return Valid(index+1, n);
                    }
                    break;
                case 0:
                    // top and bottom
                    if(index - n >= 0 && MAP_ARRAY[index - n].getRail()){
                        return Valid(index-n,n);
                    }else if(index + n < n*n && MAP_ARRAY[index + n].getRail()){
                        return Valid(index+n, n);
                    }
                    break;
                default :
                    console.log("something is wrong with the bridge's rotation");
                    return false;
                    break;

            }
        }
        else{
            if(MAP_ARRAY[index].getRailType() == "curved_rail" && MAP_ARRAY[index].getRail()){
                switch(MAP_ARRAY[index].getRot()){
                    case 90:
                    //top and right
                    if(index - n >= 0 && MAP_ARRAY[index - n].getRail()){
                        return(Valid(index-n,n));
                    }else if(index + 1 < n*n && MAP_ARRAY[index + 1].getRail()){
                        return(Valid(index+1,n));
                    }break;
                    case 180:
                    // top and left
                    if(index - n >= 0 && MAP_ARRAY[index - n].getRail()){
                        return(Valid(index-n,n));
                    }else if(index - 1 >= 0 && MAP_ARRAY[index - 1].getRail()){
                        return(Valid(index-1,n));
                    }break;
                    case 270:
                    // bottom and left
                    if(index + n <n*n && MAP_ARRAY[index + n].getRail()){
                        return(Valid(index+n,n));
                    }else if(index - 1 >= 0 && MAP_ARRAY[index - 1].getRail()){
                        return (Valid(index-1,n));
                    }break;
                    default : // 0 or 360 : we check the right and the bottom
                    if(index + n < n*n && MAP_ARRAY[index + n].getRail()){
                        return(Valid(index+n,n));
                    }else if(index + 1 < n*n && MAP_ARRAY[index + 1].getRail()){
                        return(Valid(index+1,n));
                    }
                    break;

                }
            }else if(MAP_ARRAY[index].getRailType() == "straight_rail" && MAP_ARRAY[index].getRail()){
                switch(MAP_ARRAY[index].getRot()){
                    case 270:
                    case 90: 
                    // left and right
                        if(index - 1 >= 0 && MAP_ARRAY[index - 1].getRail()){
                            return Valid(index-1,n);
                        }else if(index + 1 < n*n && MAP_ARRAY[index + 1].getRail()){
                            return Valid(index+1, n);
                        }
                        break;
                    case 360:
                    case 180:
                    case 0:
                        // top and bottom
                        if(index - n >= 0 && MAP_ARRAY[index - n].getRail()){
                            return Valid(index-n,n);
                        }else if(index + n < n*n && MAP_ARRAY[index + n].getRail()){
                            return Valid(index+n, n);
                        }
                        break;
                    
    
                }
            }

        }
        return ;
    }
    */
    // this a helper array for keeping up with the tiles properties/rotations
    let MAP_ARRAY = []; 
    function MakeMap() {
    for (let y = 0; y < tilebase[mapIndex].length; y++) {
        for (let x = 0; x < tilebase[mapIndex][y].length; x++) {

            const tileimg = document.createElement('img');
            tileimg.classList.add('tileimg');
            let addedTile;
            const tile = tilebase[mapIndex][y][x]; // string or array

                if (Array.isArray(tile)) {
                    const [tileType, rotation] = tile;
                    //["bridge", rotation] or ["mountain", rotation]
                    switch (tileType) {
                        case "bridge":
                            addedTile = new Tile(tile[0],tile[1]);
                            tileimg.src = "pics/tiles/bridge.png";
                            if (rotation === 90) {
                                tileimg.style.transform = 'rotate(90deg)';
                            }
                            break;
    
                        case "mountain":
                            addedTile = new Tile(tile[0],tile[1]);
                            tileimg.src = "pics/tiles/mountain.png";
                            switch (rotation) {
                                case 90:
                                    tileimg.style.transform = 'rotate(90deg)';
                                    break;
                                case 180:
                                    tileimg.style.transform = 'rotate(180deg)';
                                    break;
                                case 270:
                                    tileimg.style.transform = 'rotate(270deg)';
                                    break;
                                default:
                                    //(no rotation)
                                    break;
                            }
                            break;
    
                        default:
                            console.log(`Unknown array tile type: ${tileType}`);
                    }
                } else {
                    switch (tile) {
                        case "empty":
                            addedTile = new Tile(tile,0);
                            tileimg.src = "pics/tiles/empty.png";
                            break;
                        case "oasis":
                            addedTile = new Tile(tile,0);
                            tileimg.src = "pics/tiles/oasis.png";
                            tileimg.style.pointerEvents = "none";
                            break;
                        default:
                            console.log(`Unknown tile type: ${tile}`);
                            break;
                    }
                }
    
            
            tileimg.addEventListener('click', (e) =>{
                const index = images.indexOf(e.target);
                Rotation(tileimg, index);
                //if(Valid(index,n)) FinishGame();
                
            });
            tileimg.addEventListener('contextmenu', (e) => {
                e.preventDefault(); 
                const index = images.indexOf(e.target);
                ChangeTile(tileimg,index);
                //if(Valid(index,n))FinishGame();
                
            });
            MAP_ARRAY.push(addedTile);
            MAP.appendChild(tileimg);
        }        
    }
        const images = Array.from(MAP.getElementsByClassName('tileimg'));

        GAMECONTAINER.appendChild(SIDEPANEL);
        GAMECONTAINER.appendChild(MAP);
        startTimer();
        return GAMECONTAINER.style.display = "block";
    }
    MakeMap();  
}
    // this is never executed considering that my Valid function is not working 
    function FinishGame(){
    LEADERBOARD.style.display = 'block';
    GAMECONTAINER.style.display = "none";
    stopTimer();// stops the timer and stores the timer and the name of the player :)
    const NEWGAMEBTN = document.createElement('button');
    NEWGAMEBTN.innerText = "NEW GAME";
    NEWGAMEBTN.addEventListener("click", () =>{
        LEADERBOARD.style.display = "none";
    });
   
    
    
    Players = Players.sort((a, b) => timeToSeconds(a.getFinishingTime()) - timeToSeconds(b.getFinishingTime()));
    LEADERBOARD.innerHTML ="<h3>Top 3 Players</h3>";
    Players.slice(0, 3).forEach((player, index) => {
        const playerEntry = document.createElement('h2');
        const medals = ['🥇', '🥈', '🥉'];
        playerEntry.textContent = `${medals[index]} ${player.getName()} - ${player.getFinishingTime()}`;
        LEADERBOARD.appendChild(playerEntry);
    });
    LEADERBOARD.appendChild(NEWGAMEBTN);
}

//so the idea is to change the MAP_ARRAY every time somehting is change on the map and then search through it to check the validility.


