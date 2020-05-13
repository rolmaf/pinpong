//user:
let user = document.querySelector(".user");
let y = parseInt(user.getAttribute("y"));
let x = parseInt(user.getAttribute("x"));
let heightuser = parseInt(user.getAttribute("height"));

//svg:
let svg = document.querySelector("svg");
let widthsvg = parseInt(svg.getAttribute("width"));
let heightsvg = parseInt(svg.getAttribute("height"));

//ii:
let ii = document.querySelector(".ii");
let iiheight = parseInt(ii.getAttribute("height"));
let yii = parseInt(ii.getAttribute("y"));
let xii = parseInt(ii.getAttribute("x"));

//circle:
let circle = document.querySelector("circle");
let cx = parseInt(circle.getAttribute("cx"));
let cy = parseInt(circle.getAttribute("cy"));
let r = parseInt(circle.getAttribute("r"));

//Остальное: 
let blockn = false;
let blockv = false;
let cystep = 1;
let cxstep = 1;
let step = 0;
let schet = 0;
let RacketY = 0;
let stepyii = 3;
let score = document.querySelector(".score")

//Начало игры:
let go = false;


//Функция для движения user ракетки: 

function MoveRacket() {
    if (go == true) {
        RacketY = user.getAttribute("y");
        RacketY -= step;
        user.setAttribute("y", RacketY)
    }
}

//Когда кнопка нажата:

document.addEventListener("keydown", function (event) {
    if (go == true) {
        if (event.keyCode == 38 && blockv != true) {
            blockn = false;
            step = 1;
        }
        if (event.keyCode == 40 && blockn != true) {
            blockv = false;
            step = -1;
        }
    }
});

//Функция для столкновения user со стенкой

function Stolknoveniye() {
    if (go == true) {
        x = parseInt(user.getAttribute("x"));
        y = parseInt(user.getAttribute("y"));
        if (heightuser + y >= 445) {
            blockn = true;
            step = 0;
        }
        if (y <= 10) {
            blockv = true;
            step = 0;
        }
    }
}

//Функция для мяча:

function Ball() {
    if (go == true) {
        x = parseInt(user.getAttribute("x"));
        y = parseInt(user.getAttribute("y"));
        cx = cx + cxstep;
        cy = cy + cystep;

        let collisionUser = cx + r >= x && cy < y + heightuser && cy > y - heightuser;

        if (cy + r >= heightsvg || cy - r <= 0) {
            cystep = -cystep;
        }
        if (collisionUser) {
            schet++;
            if (schet == 5) {
                cxstep = 1.5;
                cystep = 1.5;
            }
            if (schet == 10) {
                cxstep = 1.75;
                cystep = 1.75;
            }
            score.innerHTML = schet;
            cxstep = -cxstep;

        }
        if (cx + r >= widthsvg) {
            cxstep = -cxstep;
            go = false;
        }
        if (cx <= 40) {
            cxstep = -cxstep;
        }
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
    }
}

//Функция для ИИ:

function iiFunc() {
    if (go == true) {
        yii = parseInt(ii.getAttribute("y"));
        xii = parseInt(ii.getAttribute("x"));
        yii = cy - iiheight / 2;
        ii.setAttribute("y", yii);
    }


}

//Кнопка Новая игра

document.querySelector("button").onclick = function () {
    cxstep = 1;
    cystep = 1;
    schet = 0;
    score.innerHTML = schet;
    xii = 10;
    yii = 10;
    cx = 325;
    cy = 225;
    x = 630;
    y = 360;
    ii.setAttribute("x", xii);
    ii.setAttribute("y", yii);
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    user.setAttribute("x", x);
    user.setAttribute("y", y);
    go = true;
}

// Меняем цвета фону

document.querySelector(".red").onclick = function () {
    ii.setAttribute("fill", "blue")
    user.setAttribute("fill", "hotpink")
    circle.setAttribute("fill", "white")
    svg.style.backgroundColor = "red";
    svg.style.backgroundImage = "none";
}
document.querySelector(".yellow").onclick = function () {
    user.setAttribute("fill", "hotpink")
    ii.setAttribute("fill", "red")
    circle.setAttribute("fill", "black")
    svg.style.backgroundColor = "yellow";
    svg.style.backgroundImage = "none";
}
document.querySelector(".green").onclick = function () {
    ii.setAttribute("fill", "red")
    circle.setAttribute("fill", "white")
    svg.style.backgroundColor = "green";
    svg.style.backgroundImage = "none";
}
document.querySelector(".orange").onclick = function () {
    user.setAttribute("fill", "blue")
    user.setAttribute("fill", "hotpink")
    circle.setAttribute("fill", "white")
    svg.style.backgroundColor = "orange";
    svg.style.backgroundImage = "none";
}
document.querySelector(".white").onclick = function () {
    user.setAttribute("fill", "blue")
    user.setAttribute("fill", "hotpink")
    circle.setAttribute("fill", "black")
    svg.style.backgroundColor = "white";
    svg.style.backgroundImage = "none";
}
document.querySelector(".noch").onclick = function () {
    user.setAttribute("fill", "blue")
    user.setAttribute("fill", "hotpink")
    circle.setAttribute("fill", "black")
    svg.style.backgroundColor = "none";
    svg.style.backgroundImage = "url(https://t4.ftcdn.net/jpg/02/78/75/17/240_F_278751711_j9WAsorPM4eAjfF93VC0DT1bNLRkOx2x.jpg)";
}
document.querySelector(".img-fon2").onclick = function () {
    user.setAttribute("fill", "blue")
    user.setAttribute("fill", "hotpink")
    circle.setAttribute("fill", "black")
    svg.style.backgroundColor = "none";
    svg.style.backgroundImage = "url(https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500 )";
}



//Вызываем функции:

setInterval(MoveRacket, 1);
setInterval(iiFunc, 8);
setInterval(Stolknoveniye, 1);
setInterval(Ball, 1);