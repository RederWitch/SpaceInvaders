class Bullet {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.widht = 7;
        this.height = 15;
    }

    updateBullet(ship) {
        this.y = this.y - 7;
        if (this.y <= 0) {
           this.deleteBullet(ship);
        }
    }

    drawBullet(){
        this.context.fillStyle = "#eaeb1d";
        this.context.fillRect(this.x, this.y, this.widht, this.height);
    }


    deleteBullet(ship) {
        ship.bullet = null;
    }
}