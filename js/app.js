'use strict';
const debug = false;
let game = true;

// Enemies our player must avoid
let Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
    this.collision = false;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x > ctx.canvas.width + this.width) {
        this.x = -200 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += 250 * dt;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(collision(player.x, player.y, player.width, player.height, this.x, this.y,
        this.width, this.height)) {
        this.collision = true;

        if(player) {
           player.x = 202;
           player.y = 400;
        }
    }else{
        this.collision = false;
    }
};

function collision(px, py, pw, ph, ex, ey, ew, eh) {
  return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
}

function won() {
    console.log('Won!');
}

function reset() {
    allEnemies = [];
}
//Create function for a popup modal
function modalToggle() {
   let showMadal = document.querySelector(".modal-bg");
   showMadal.classList.toggle("hide");
 }
modalToggle();
modalToggle();
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let Player = function(x,y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
    if(game && player.y < 40) {
       game = false;
       won();
       reset();
       modalToggle();
    }
};
// This function is for moving the player
Player.prototype.handleInput = function(direction) {
    const   horizontal = 101,
            vertical = 83;

    if (direction === 'left' && this.x - horizontal >= 0) {
        this.x -= horizontal;
    } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width) {
        this.x += horizontal;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 200) {
        this.y += vertical;
    } else if (direction === 'up' && this.y - vertical > 0 - player.height) {
        this.y -= vertical;
    }
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.querySelector('.modal-button').addEventListener('click', replayGame);
//Create function to replay the game
function replayGame() {
    modalToggle();
    game = true;
    player.x = 202;
    player.y = 400;
    allEnemies = enemyPosition.map((y, index) => {
        return new Enemy( (-200 * (index + 1)), y);
    });
}

const enemyPosition = [55, 140, 230, 60, 140, 220, 55];
const player = new Player(202, 400, 'images/char-boy.png');
let allEnemies = enemyPosition.map((y, index) => {
    return new Enemy( (-200 * (index + 1)), y);
});
