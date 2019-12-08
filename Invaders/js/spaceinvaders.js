class Game{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.fps = 100;
        this.intervalId = null;
        this.canvas = null;
        this.aliens = [];
        this.ship = null;
    }

    getAliens(){
        for(let i = 0; i<3; i++){
            this.aliens.push(new Alien(200+i*170, 10, this.canvas));
        }
    }

    drawAliens(){
        for(let i = 0; i<this.aliens.length; i++){
            this.aliens[i].draw()
        }

    }

    updateAliens(){
        var dt = 1/this.fps;
        for(let i = 0; i<this.aliens.length; i++){
            var alien = this.aliens[i];
            alien.y += 2;
            if(alien.y > this.height){
                this.gameOver();
                break;
            }
        }

    }

    deleteAlien(index){
        var tem = this.aliens;
        this.aliens = [];
        if(tem.length - 1 ===0){
            this.win();
        }
        for (let i = 0; i<tem.length; i++){
            if( i!= index) {
                this.aliens.push(tem[i]);
            }
        }

    }

    updateBOOM(){
        for (let i = 0; i<this.aliens.length; i++){
            if(this.ship.bullet != null){
                if(this.ship.bullet.x + this.ship.bullet.widht > this.aliens[i].x &&
                    this.ship.bullet.x < this.aliens[i].x + this.aliens[i].widht) {
                     if (this.ship.bullet.y <= this.aliens[i].y + this.aliens[i].height) {
                        this.ship.bullet.deleteBullet(this.ship);
                        this.deleteAlien(i);
                        break;
                    }
                }
            }
        }
    }

    setUp() {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute('width', '800');
        this.canvas.setAttribute('height', '600');
      //  this.canvas.setAttribute('style', 'background-color: black');
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.ship = new Ship(this.width/2, this.height-50, this.canvas);
        this.getAliens();

        document.addEventListener("keydown", this.KeyDown.bind(this), false);
        document.addEventListener("keyup", this.KeyUp.bind(this), false);


    }
    KeyUp(event){
        this.ship.KeyboardState[event.code] = false;
        if (this.ship.IsAnyKeyPressed())
            event.preventDefault();
    };
    KeyDown(event){
        this.ship.KeyboardState[event.code] = true;
        if (this.ship.IsAnyKeyPressed())
            event.preventDefault();
    };

    update(){
        this.context.clearRect(0, 0, this.width, this.height);
        this.ship.draw();
        this.drawAliens();
        if(this.ship.isFiring()) {
            this.ship.bullet.drawBullet();
            this.ship.bullet.updateBullet(this.ship);

        }
        this.ship.updateShip(this);
        this.updateBOOM();
        this.updateAliens();


    }

    start(){
        var self = this;
        this.intervalId = setInterval(() => this.update(), 30);
    }

    gameOver(){
        clearInterval(this.intervalId);
        this.context.clearRect(0, 0, this.width+100, this.height+100);
        this.context.font="30px Arial";
        this.context.fillStyle = '#ffffff';
        this.context.textBaseline="center";
        this.context.fillText("GAME OVER", this.width / 2, this.height/2 - 40);
    }

    win(){
        clearInterval(this.intervalId);
        this.context.clearRect(0, 0, this.width+100, this.height+100);
        this.context.font="30px Arial";
        this.context.fillStyle = '#ffffff';
        this.context.textBaseline="center";
        this.context.fillText("YOU WON", this.width / 2, this.height/2 - 40);
    }

}
