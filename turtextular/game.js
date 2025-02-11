width = window.innerWidth * window.devicePixelRatio;
height = window.innerHeight * window.devicePixelRatio;


var config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false // Enable debug to see collision boxes
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var player;
var cursors;


function preload() {
    this.load.image('playerleft', 'https://turtlesyeah.github.io/turtextular/assets/turtleleft.png'); // Replace with actual path// Load assets here - make sure these paths are correct
    this.load.image('playerright', 'https://turtlesyeah.github.io/turtextular/assets/turtleright.png'); // Replace with actual path
    this.load.image('ground', 'https://turtlesyeah.github.io/turtextular/assets/canvas.png'); // Replace with actual path
}

function create() {
    // Create the ground
    this.cameras.main.setBackgroundColor('#fffbe0');
    var ground = this.physics.add.staticGroup();
    ground.create(400, 638, 'ground').setScale(1, 0.1).refreshBody(); // Adjust as needed
    
    // Create the player
    player = this.physics.add.sprite(400, 450, 'playerright');
    
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Add collision between the player and the ground
    this.physics.add.collider(player, ground);

    // Set up cursor keys for input
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Handle player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.setTexture('playerleft');
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.setTexture('playerright');
    } else {
        player.setVelocityX(0);
    }

    // Jump if the up arrow is pressed and the player is touching the ground
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-240);
    }
}
