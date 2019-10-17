
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

class star {
    constructor() {
        this.x = genRand(-c.width / 2, c.width / 2, 1);
        this.y = genRand(-c.height / 2, c.height / 2, 1);
        this.z = genRand(0, 800, 1);
        this.size = genRand(1, 7, 1);
    }
}

var stars = [];
var starsAmount = 200;
var dt = 0;
var lastTime = 0;

for (i = 0; i < starsAmount; i++) {
    stars.push(new star())
}

function update(time = 0) {
    dt = time - lastTime;
    lastTime = time;

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,c.width, c.height);

    ctx.save()
    ctx.translate(c.width / 2, c.height /2 );

    for (i = 0; i < stars.length; i++) {
        var s = stars[i];
        var sx = map(s.x / s.z, 0, 1, 1, c.width / 2);
        var sy = map(s.y / s.z, 0, 1, 1, c.height / 2);
        var r = Math.abs(map(s.z, 0, c.width, s.size, 0));

        s.z -= 0.2 * dt;

        if (s.z < 1) {
            s.x = genRand(-c.width / 2, c.width / 2, 1);
            s.y = genRand(-c.height / 2, c.height / 2, 1);
            s.z = 800;
        }

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.ellipse(sx, sy, r, r, Math.PI, Math.PI * 2, 0, 0);
        ctx.fill();

    }

    ctx.restore();


    requestAnimationFrame(update);
}

function genRand(min, max, decimalPlaces) {  
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}

function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

update();