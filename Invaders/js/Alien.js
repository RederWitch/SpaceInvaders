class Alien {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;

        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.widht = 80;
        this.height = 80;
    }

    draw(){
        this.context.fillStyle = '#e33f36';
        this.context.fillRect(this.x, this.y, this.widht, this.height);
    }


}