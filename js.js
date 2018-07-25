const poz = document.getElementById("poz");
const mare = document.getElementById("mare");
const mic = document.getElementById("mic");

let xx;
mare.addEventListener("mousemove", (e) => {
    poz.innerHTML = "X: " + e.offsetX;
    poz.innerHTML += ", Y: " + e.offsetY;
    xx = e.offsetX;
    mic.style.left = e.offsetX + "px";
});

mare.addEventListener("click", () => {
    fire();
});

function fire() {
    let cartus = document.createElement("div");
    cartus.style.background = "yellow";
    cartus.style.width = 20 + "px";
    cartus.style.position = "absolute";
    cartus.style.height = 20 + "px";
    cartus.style.left = 15 + "px";
    cartus.style.left = -999 + "px";
    cartus.className = "fire";
    mare.appendChild(cartus);

    let poz = 445;
    function shoot() {
        poz -= 10;
        cartus.style.top = poz + "px";
        if (poz > 420) {
            cartus.style.left = 15 + xx + "px";
        }

        if (poz < -50) {
            if (cartus.parentNode === mare) {
                mare.removeChild(cartus);
            }
        }
        requestAnimationFrame(shoot);
    }

    shoot();

}
function randomEnemy() {
    let enemy = document.createElement("div");
    enemy.style.height = 60 + "px";
    enemy.style.width = 80 + "px";
    enemy.style.position = "absolute";
    enemy.style.background = "orange";
    enemy.style.left = randomEnemypoz() + "px";
    enemy.className = "enemy";
    mare.appendChild(enemy);
    setTimeout(removeEnemy, 2000);
}
function removeEnemy() {
    let enemyR = document.getElementsByClassName("enemy")[0];
    mare.removeChild(enemyR);
}

function randomEnemypoz() {
    let random = Math.floor(Math.random() * 500);
    return random;
}
setInterval(randomEnemy, 5000);

const pozFire = document.getElementById("pozFire");
const pozEnemy = document.getElementById("pozEnemy");
const scor=document.getElementById("scor");
const neww=document.getElementById("neww");

let score=0;
neww.addEventListener("click",()=>{
    score=0;
    scor.textContent=0;
});
function getPoz() {
    if (mare.children[2] !== undefined && mare.children[1] !== undefined && mare.children[1].className === "enemy") {
        let fire = document.getElementsByClassName("fire")[0];
        let enemy = document.getElementsByClassName("enemy")[0];
        let EnT = 50;
        let EnL = retnum(enemy.style.left);
        let FiT = retnum(fire.style.top);
        let FiL = retnum(fire.style.left);


        if (Math.abs(FiL - EnL) <= 20 && Math.abs(EnT - FiT) <= 5 || FiL - EnL >= 0 && FiL - EnL <= 65 && Math.abs(EnT - FiT) <= 5) {

            enemy.style.background = "red";
            fire.style.background = "red";
            score+=50;
            scor.textContent=score;
        }
    }

    if (mare.children[2] !== undefined) {
        let fire = document.getElementsByClassName("fire")[0];
        pozFire.innerHTML = "TOP: " + fire.style.top + " LEFT: " + fire.style.left;
    } else {
        pozFire.innerHTML = 0;
    }

    if (mare.children[1] !== undefined && mare.children[1].className === "enemy") {
        let enemy = document.getElementsByClassName("enemy")[0];
        pozEnemy.innerHTML = "TOP: " + enemy.style.top + " LEFT: " + enemy.style.left;
    } else {
        pozEnemy.innerHTML = 0;
    }


    requestAnimationFrame(getPoz);
}

getPoz()


function retnum(str) {
    var num = str.replace(/[^0-9]/g, '');
    return parseInt(num, 10);
}



