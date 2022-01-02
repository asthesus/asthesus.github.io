htmlCanvas = document.getElementById(`c`),
ctx = htmlCanvas.getContext(`2d`);

ctx.translate(0.5, 0.5);

var ww;
var wh;

ww = window.innerWidth;
wh = window.innerHeight;

sww = 0;
swh = 0;

const randomNumber = (min, max) => {return Math.random() * (max - min + 1) + min};
const randomInteger = (min, max) => {return Math.round(Math.random() * (max - min + 1)) + min};
const randomColour = (min, max) => {return `#`.concat(randomInteger(min, max).toString(16), randomInteger(min, max).toString(16), randomInteger(min, max).toString(16))};
function isEven(n) {if(Number.isInteger(n / 2)) {return true} else return false};

x_shift = 0;
x_shift_interval = 1;
y_shift = 0;
y_shift_interval = 1;

tilesize1 = randomInteger(Math.round(wh / 40), Math.round(wh / 2));
tilesize2 = randomInteger(3, tilesize1 - 10);
tilecolour1 = randomColour(0, 4);
tilecolour2 = randomColour(7, 9);

expanded = false;

function drawCanvas() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    if(sww < ww || swh < wh) {
        expanded = true;
        sww = ww;
        swh = wh;
    } else expanded = false;
    htmlCanvas.width = ww;
    htmlCanvas.height = wh;
    ctx.fillStyle = tilecolour1;
    ctx.fillRect(0, 0, ww, wh);
}

function drawTiles() {
    if(expanded) {
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
        tiles_img = new Image();
        tiles_img.src = htmlCanvas.toDataURL();
    } else {
        ctx.drawImage(tiles_img, 0, 0);
    }
}

// Tile S

if(ww > wh) {
    S_width = wh / 5;
    S_height = wh / 5;
} else {
    S_width = ww / 5;
    S_height = ww / 5;
}
S_x = randomInteger(0, ww - S_width);
S_y = randomInteger(0, wh - S_height);
s_S_x = S_x;
s_S_y = S_y;
x_difference = 0;
y_difference = 0;
movingS = false;
Sunlocked = false;

function drawS() {ctx.drawImage(S_img, s_S_x, s_S_y, S_width, S_height, S_x, S_y, S_width, S_height)};

function checkS(cSx, cSy) {
    if(cSx >= S_x && cSx <= S_x + S_width && cSy >= S_y && cSy <= S_y + S_height) {
        movingS = true;
        if(!Sunlocked) {
            Sunlocked = true;
            S_img = new Image();
            S_img.src = htmlCanvas.toDataURL();
        }
    }
    x_difference = cSx - S_x;
    y_difference = cSy - S_y;

    if(cSx >= s_S_x && cSx <= s_S_x + S_width && cSy >= s_S_y && cSy <= s_S_y + S_height
    && (cSx < S_x || cSx > S_x + S_width || cSy < S_y || cSy > S_y + S_height)) {
        window.location.href = "https://asthesus.github.io/puzzlebox/";
    }
}

function moveS(mSx, mSy) {
    if(movingS) {
        S_x = mSx - x_difference;
        S_y = mSy - y_difference;
        drawCanvas();
        drawTiles();
        ctx.fillStyle = `#000`;
        ctx.fillRect(s_S_x, s_S_y, S_width, S_height);
        drawS();
    }
    if(mSx >= s_S_x && mSx <= s_S_x + S_width && mSy >= s_S_y && mSy <= s_S_y + S_height
    && (mSx < S_x || mSx > S_x + S_width || mSy < S_y || mSy > S_y + S_height)) {
        htmlCanvas.style.cursor = `pointer`;
    } else {
        htmlCanvas.style.cursor = `initial`;
    }
}

function drawAll() {
    drawCanvas();
    drawTiles();
    if(Sunlocked) {
        ctx.fillStyle = `#000`;
        ctx.fillRect(s_S_x, s_S_y, S_width, S_height);
        drawS();
    }
}

window.addEventListener(`resize`, drawAll, false);
htmlCanvas.addEventListener(`mousemove`, e => {mx = e.clientX, my = e.clientY, moveS(mx, my)});
htmlCanvas.addEventListener(`mouseup`, e => {mx = e.clientX, my = e.clientY, movingS = false});
htmlCanvas.addEventListener(`mousedown`, e => {mx = e.clientX, my = e.clientY, checkS(mx, my)});

// document.getElementById(`c`).style.transform = `scale(${randomNumber(0.5, 1) * (1 + (-2 * randomInteger(0, 1)))}, ${randomNumber(0.5, 1) * (1 + (-2 * randomInteger(0, 1)))})`;

drawCanvas();
drawTiles();