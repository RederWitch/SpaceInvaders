class Ship {
    constructor(x, y, canvas) {
        this.x = x;
        this. y = y;

        this.canvas = canvas;
        this.context= canvas.getContext('2d');

        this.KeyboardState = {"ArrowRight": false, "ArrowLeft": false, "Space": false};

        this.bullet = null;

    }

    isFiring(){
        return this.bullet!=null;
    }

    draw(){
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(this.x, this.y,30, 20);
        this.context.fillStyle = "#fcca03";
        this.context.fillRect(this.x, this.y,30, 5);
        this.context.fillStyle = "#888995";
        this.context.fillRect(this.x-10, this.y-10,10, 40);
        this.context.fillRect(this.x+30, this.y-10,10, 40);

        this.context.fillRect(this.x+7, this.y-15,5, 15);
        this.context.fillRect(this.x+18, this.y-15,5, 15);

    }

    updateShip(game){
        if (this.KeyboardState["ArrowLeft"]){//left
            this.x -= 4;
            if(this.x <=10) this.x = 10;
        }
        if (this.KeyboardState["ArrowRight"]) {//right
            this.x += 4;
            if(this.x >= game.width-40) this.x = game.width-40;
        }
        if (this.KeyboardState["Space"]){//bullet
            if(this.bullet == null){
                this.bullet = new Bullet(this.x+11, this.y, this.canvas);
            }
        }
    };

    IsAnyKeyPressed(){
        if (this.KeyboardState["ArrowLeft"] ||
            this.KeyboardState["ArrowRight"] ||
            this.KeyboardState["Space"])
            return true;
        else
            return false;
    };



}
