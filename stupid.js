
const players = []
const scores = [];
const die = [0, 0];
var targetScore = 0;
var streak = 0;
var turn = 1;
var gameHasBeenWon = false;
var doubles = 0;

function game() {
    if (document.getElementById("score").value < 10) {
        document.getElementById("optAlert").innerHTML = "Pistemäärä voittamiseen on liian pieni. Pitää olla Vähintään 10";
    } else {
        if (players.length >= 2) {
            var a = document.getElementById("options");
            var b  = document.getElementById("peli");
            a.style.display = "none";
            b.style.display = "block";
        
            targetScore = document.getElementById("score").value;
            document.getElementById("vuoro").innerHTML = players[turn - 1] + " Heittää noppaa"
        } else {
            document.getElementById("optAlert").innerHTML = "Pelaajia pitää olla vähintään 2";
        }
    }
}

function roll() {
    var i = 100;
    while (i != 102) {
        var d = Math.random();
        if (d <= 0.166) {
            document.getElementById(i).src="img/one.png"
            die[i-100] = 1;
        } else if (d <= 0.332) {
            document.getElementById(i).src="img/two.png"
            die[i-100] = 2;
        } else if (d <= 0.498) {
            document.getElementById(i).src="img/three.png"
            die[i-100] = 3;
        } else if (d <= 0.664) {
            document.getElementById(i).src="img/four.png"
            die[i-100] = 4;
        }else  if (d <= 0.832) {
            document.getElementById(i).src="img/five.png"
            die[i-100] = 5;
        } else {
            document.getElementById(i).src="img/six.png"
            die[i-100] = 6;
        }
        i++;
    }


    if (die[0] == 1 && die[1] != 1) {
        document.getElementById("gameAlert").innerHTML = players[turn - 1] + " Heitit ykkösen. Heitto vuorosi loppui";
        endTurn(2);
    } else if (die[1] == 1 && die[0] != 1) {
        document.getElementById("gameAlert").innerHTML = players[turn - 1] + " Heitit ykkösen. Heitto vuorosi loppui";
        endTurn(2);
    } else if (2 == die[0] + die[1]) {
        streak += 25;
        doubles++;
    } else {
        streak += die[0] + die[1];
        if (die[0] == die[1]) {
            doubles++;
            streak += streak;
        }
    }
    if (doubles >= 3) {
        document.getElementById("gameAlert").innerHTML = players[turn - 1] + " Sait tuplat 3 kertaa. Heitto vuorosi loppui";
        endTurn(2);
    }


    document.getElementById(turn).innerHTML = players[turn - 1] + ": " + scores[turn - 1] + " (+" + streak + ")"
    ones = 0;
}


function endTurn(i) {
    if (i != 2) {
        scores[turn - 1] = scores[turn - 1] + streak;
        if (scores[turn - 1] >= targetScore && gameHasBeenWon == false) {
            document.getElementById("gameAlert").innerHTML = players[turn - 1] + " Voitti pelin!! Voitte jatkaa peliä jos haluatte";
            gameHasBeenWon = true;
        }
    }
    document.getElementById(turn).innerHTML = players[turn - 1] + ": " + scores[turn - 1];
    if (turn < players.length) {
        turn += 1;
    } else {
        turn = 1;
    }
    doubles = 0;
    streak = 0;
    document.getElementById("vuoro").innerHTML = players[turn - 1] + " Heittää noppaa"
}

function addPlayer() {
    var yesnt = 1;
    players.push(document.getElementById("add").value);
    scores.push(0);
    let text = "<ul>";
    let text2 = "<ul>";
    players.forEach(spare);
    text += "</ul>";
    text2 += "</ul>";
    document.getElementById("b").innerHTML = text;
    document.getElementById("ff").innerHTML = text2;

    function spare(value) {
        text += "<li id=" + yesnt + ">" + value + "</li>";
        text2 += "<li>" + value + "</li>";
        yesnt += 1;
    }
}