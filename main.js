htmlCanvas = document.getElementById(`c`),
ctx = htmlCanvas.getContext(`2d`);

var ww;
var wh;

ww = window.innerWidth;
wh = window.innerHeight;

const randomNumber = (min, max) => {
    return Math.random() * (max - min + 1) + min;
}

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomColour = (min, max) => {
    return `#`.concat(randomInteger(min, max).toString(16).concat(randomInteger(min, max).toString(16).concat(randomInteger(min, max).toString(16))));
}

x_shift = 0;
x_shift_interval = 1;
y_shift = 0;
y_shift_interval = 1;

tilesize1 = randomInteger(Math.round(wh / 40), Math.round(wh / 2));
tilesize2 = randomInteger(3, tilesize1 - 10);
tilecolour1 = randomColour(0, 4);
tilecolour2 = randomColour(7, 9);

function randomPattern() {
    patterns = [`waves`];
    return patterns[randomInteger(0, patterns.length - 1)];
}

function isEven(n) {
    if(Number.isInteger(n / 2)) {return true} else return false;
}

function drawCanvas() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    htmlCanvas.width = ww;
    htmlCanvas.height = wh;
    ctx.fillStyle = tilecolour1;
    ctx.fillRect(0, 0, ww, wh);
}

function drawTiles(pattern) {
    if(pattern === `waves`) {
        for(x = -tilesize1 * 3; x < ww + (tilesize1 * 3); x += tilesize1) {
            for(y = -tilesize1 * 3; y < wh + (tilesize1 * 3); y += tilesize1) {
                ctx.strokeStyle = tilecolour2;
                ctx.lineWidth = tilesize2;
                ctx.beginPath();
                if(isEven(x / tilesize1)) {
                    if(isEven(y / tilesize1)) {ctx.arc(x + x_shift, y + y_shift, tilesize1 / 2, 1.5 * Math.PI, 0)} else ctx.arc(x + x_shift + tilesize1, y + y_shift + tilesize1, tilesize1 / 2, 0.5 * Math.PI, Math.PI);
                } else {
                    if(!isEven(y / tilesize1)) {ctx.arc(x + x_shift, y + y_shift, tilesize1 / 2, 1.5 * Math.PI, 0)} else ctx.arc(x + x_shift + tilesize1, y + y_shift + tilesize1, tilesize1 / 2, 0.5 * Math.PI, Math.PI);
                }
                ctx.stroke();
            }
        }
    }
}

function drawAll() {
    drawCanvas();
    drawTiles(randomPattern());
}

window.addEventListener(`resize`, drawAll, false);

// document.getElementById(`c`).style.transform = `scale(${randomNumber(-1, 1)}, ${randomNumber(-1, 1)})`;

drawAll();
