//Initialize the score variable
let score = 0;

//Ball object
let ball = {
    //Initialize variables for the ball object
    x: 400,
    y: 300,
    d: 20,
    velX: -5,
    velY: 5,

    //Causes the ball to reverse its x velocity when it hits the left wall
    collideWallX: function(){
        if(this.x<this.d){
            this.velX *= -1;
        }
    },

    //Causes the ball to reverse its y velocity when it hits the top and bottom walls
    collideWallY: function(height){
        if(this.y<this.d || this.y>height-this.d){
            this.velY *= -1;
        }
    },

    outOfBounds: function(width){
        //Happens when the ball reaches the right wall past the paddle
        if(this.x+this.d>width){
            //Places the ball back in the middle of the screen
            this.x = width/2;
            this.y = height/2;

            //Resets the ball's x velocity to be -5
            this.velX = -5;

            //Resets score
            score = 0;
        }
    },

    
    collideRect: function(rectX, rectY, rectW, rectH){
        //Happens when the ball hits the paddle
        if(this.x + this.d > rectX && this.x - this.d < rectX + rectW && this.y + this.d > rectY && this.y - this.d < rectY + rectH) {
            //If the ball is too far to the right to be hitting the front of the paddle, it reverses the y velocity instead of the x
            if(this.x + this.d - 5 > rectX){
                this.velY *= -1;
                score ++;
            }else{
                //Reverses ball's x velocity and adds 1 to the score
                this.velX *= -1;
                score ++;
            }
        }
    },

    update: function(){
        //Draws in the circle
        fill("#99ffb6");
        circle(this.x,this.y,this.d);

        //Updates circle's x and y based on velocity
        this.x += this.velX;
        this.y += this.velY;
    }
}

//Paddle object
let rectangle = {
    //Initialize paddle object variables
    x: 750,
    y: 0,
    w: 25,
    h: 150,

    update: function(){
        //Generates the rectangle coords based on the mouse position
        this.y = mouseY - this.h/2;
        fill("#99c9ff")
        rect(this.x,this.y,this.w,this.h);
    }
}

//Sets up canvas size
function setup(){
    createCanvas(800,600);
}

function draw(){
    //Refreshes the background to white
    background("#ffc6c2");

    //Runs all ball related functions
    ball.collideRect(rectangle.x,rectangle.y,rectangle.w,rectangle.h);
    ball.outOfBounds(width,height);
    ball.collideWallX();
    ball.collideWallY(height);
    ball.update();

    //Runs the rectangle update function
    rectangle.update();

    //Score text
    textSize(32);
    fill("black")
    text('Score: ' + score, 10, 30);
    
}