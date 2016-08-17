function DeadBody(x, y, angle1, angle2) {

    this.widthBody = 30;
    this.heightBody = 50;
    this.heightTower = 40;
    this.widthTower = 3;

    this.color = "black";

    this.angleBody = angle1;
    this.angleTower = angle2;

    this.x = x;
    this.y = y;
    this.update = function() {
        // drawing the body
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angleBody);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.widthBody / -2, this.heightBody / -2, this.widthBody, this.heightBody);
        ctx.restore();

        // drawing the barrel
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angleTower);
        ctx.translate(0, -20);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.widthTower / -2, this.heightTower / -2, this.widthTower, this.heightTower);
        ctx.restore();
        // drawing the tower
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}


function Body(color, x, y) {


    this.numMines = 10;
    this.numBullet = 20;
    this.numMgBullets = 200;

    this.hp = 100;

    this.width = 30;
    this.height = 50;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        // back part
        ctx.fillStyle = "black";
        ctx.fillRect(this.width / -2, this.height / 2, 10, -4);
        ctx.fillRect(this.width / -2 +20, this.height / 2, 10, -4);
        //machinegun
        ctx.fillStyle = "black";
        ctx.fillRect(this.width / -2+21, this.height / -2 , 2, 12);
        ctx.restore();
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}



function Tower(radius, width, height, color, x, y) {

    this.radius = radius;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.update = function() {

        // drawing the tower
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.rotate(this.angle);
        ctx.translate(0, -20);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();

    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
    }
}



function Bullet(x, y, angle) {

    this.radius = 2;
    this.speed = 30;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.px, this.py);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.translate(0, 0);
        ctx.fillStyle = "red";
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    this.newPos = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}


function MgBullet(x, y, angle) {

    this.radius = 1;
    this.speed = 15;
    this.angle = angle;
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.translate(0, 0);
        ctx.fillStyle = "black";
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    this.newPos = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}

function Mine(x, y) {

    this.radius = 6;
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.translate(0, 0);
        ctx.fillStyle = "black";
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

}
