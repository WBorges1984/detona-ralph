const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        livesNumber: 3
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),

    }
};

function countDown(){
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        state.values.livesNumber--
        state.view.lives.textContent =`x${state.values.livesNumber}` ;
        state.values.currentTime = 60;

        if (state.values.livesNumber === 1) {
            alert(`Vamos para a última vida!`)
        }else if(state.values.livesNumber > 1){
            alert(`Vamos para a vida n°: ${state.values.livesNumber}`)
        }
        
        if(state.values.livesNumber <= 0) {
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            state.view.lives.textContent = 'x0';
            alert("Game Over! O seu resultado foi: " + state.values.result);
        }
    }
}

function playSound(audioName){
    let audio = new Audio(`../audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy")
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", ()=>{
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
}

function initialize(){
    
    addListenerHitBox();
}

initialize();