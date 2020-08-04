const Player = (name, symbol) => {
    return {name, symbol};
};

const Game = (() => {
    let position = ["", "", "", "", "", "", "", "", ""];
    let player1 = Player("chris", "X")
    let player2 = Player("mike", "O")
    let currentplayer = player1

    const start = () => {
        makeplayers();
        add_display();
        document.getElementById("status").textContent = `${currentplayer.name}'s turn`
    }
    const makeplayers = () => {
        player1.name = document.getElementById("player1").value;
        player2.name = document.getElementById("player2").value;
    }

    const add_display = () => {
        document.getElementById("form-pop").style.display = "none";
        for (let i = 0; i < position.length; i++) {
            let section = document.createElement("div");
            section.classList.add("square");
            section.value = i
            section.addEventListener("click", select);
            document.getElementById("board").appendChild(section);
        }
        
    }

    const replay = () => {
        position = ["", "", "", "", "", "", "", "", ""];
        document.getElementById("form-pop").style.display = "block";
        document.getElementById("button-holder").style.display = "none"
        clear();
    }

    const clear = () => {
        let board = document.getElementById("board")
        while (board.firstChild) {
            board.removeChild(board.lastChild);
        }
        document.getElementById("status").textContent = ``
    }

    const switchplayer = () => {
        if (currentplayer === player1){
            currentplayer = player2
        } else {
            currentplayer = player1
        }
        document.getElementById("status").textContent = `${currentplayer.name}'s turn`
    }

    const gamewon = () => {
        document.querySelectorAll("div.square").forEach((square) => {
            square.removeEventListener("click", select);
            document.getElementById("button-holder").style.display = "block"
        });
        document.getElementById("status").textContent = `${currentplayer.name} won!`
    }
    const game_tie = () => {
        document.getElementById("status").textContent = `Tied game`
        document.getElementById("button-holder").style.display = "block"
    }

    const select = (e) => {
        e.target.textContent = currentplayer.symbol
        position[e.target.value] = currentplayer.symbol
        e.target.removeEventListener("click", select);
        let status = gameover();
        let tie_status = tie();
        if (status) {
            gamewon();
        } else if (tie_status) {
            game_tie();
        } else {
        switchplayer();
        }
    }


    const _tie_checker = (check) => {
        return check !== ""
    }

    const gameover = () => {
        let x = 0;
        while (x <= 6) {
            if (position[0 + x] === position[1 + x] && position[1 + x] === position[2 + x] && position[0 + x] !== ""){
            return true;
            }
            x += 3;
        }
        let y = 0;
        while (y <= 2) {
            if (position[0 + y] === position[3 + y] && position[3 + y] === position[6 + y] && position[0 + y] !== ""){
                return true;
            }
            y += 1;
        }
        if (position[0] === position[4] && position[4] === position[8] && position[0] !== "") {
            return true;
        } else if (position[2] === position[4] && position[4] === position[6] && position[2] !== "") {
            return true;
        }
    }

    const tie = () => {
        return position.every(_tie_checker);
    }

    return {start, replay}

})();
