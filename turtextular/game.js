width = window.innerWidth * window.devicePixelRatio;
height = window.innerHeight * window.devicePixelRatio;
function generateplane() {
    
}

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
    // Existing code
    this.cameras.main.setBackgroundColor('#fffbe0');
    var ground = this.physics.add.staticGroup();
    // Initial ground tile creation
    var initialX = 4000;
    var spacing = 2048;
    

    // Create the player
    player = this.physics.add.sprite(400, 450, 'playerright');
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);

    // Add collision between the player and the ground
    this.physics.add.collider(player, ground);
    createGroundTile(this, ground, 400, 600);

    // Set up cursor keys for input
    cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(player, true, 1, 1, 0, 150);

    // Store ground group for use in update function
    this.ground = ground;
}

function createGroundTile(scene, groundGroup, x, y) {
     tile = groundGroup.create(x, y, 'ground').setScale(1, 0.2).refreshBody();
     
    
    
}

function checkElementAtPosition(group, x, y) {
    const children = group.getChildren();
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.x === x && child.y === y) {
            return true; // Element found at the position
        } else{return false;}
    }
    
}
function update() {
    // Handle player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-1600);
        player.setTexture('playerleft');
    } else if (cursors.right.isDown) {
        player.setVelocityX(1600);
        player.setTexture('playerright');
    } else {
        player.setVelocityX(0);
    }
    if (player.y > 900) {
        player.setPosition(400, 450);
    }

    // Jump if the up arrow is pressed and the player is touching the ground
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-240);
    }

    let oldTileX;// Check if a new ground tile should be created
    const cameraRightEdge = this.cameras.main.scrollX + this.cameras.main.width;
    const element = checkElementAtPosition(this.ground, cameraRightEdge, 638);
    // Assuming ground tiles are spaced 2048 units apart
    if (!element) {
        const newTileX = oldTileX + 2048;
        createGroundTile(this, this.ground, newTileX, 638);
        oldTileX = newTileX;
        
    }

    // Reset the flag when the player moves away from the tile creation condition
    
}
