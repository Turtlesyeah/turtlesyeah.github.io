window.addEventListener("error", function (event) {
    window.alert(`<p style="color: red;">Error: ${event.message} at ${event.lineno}:${event.colno} of ${event.filename}</p>`);
});

var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;
var text;
function generateplane() {}

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
var oldTileX;

function preload() {
    this.load.image('playerleft', 'https://turtlesyeah.github.io/turtextular/assets/turtleleft.png'); // Replace with actual path
    this.load.image('playerright', 'https://turtlesyeah.github.io/turtextular/assets/turtleright.png'); // Replace with actual path
    this.load.image('ground', 'https://turtlesyeah.github.io/turtextular/assets/canvas.png'); // Replace with actual path
}

function create() {
    try {
        // Existing code
        this.cameras.main.setBackgroundColor('#fffbe0');
        var ground = this.physics.add.staticGroup();
        // Initial ground tile creation
        createGroundTile(this, ground, 400, 650);
        createGroundTile(this, ground, 2448, 650);
        createGroundTile(this, ground, 4496, 650);

        oldTileX = 4496; // Set oldTileX to the last created tile's position

        // Create the player
        player = this.physics.add.sprite(400, 450, 'playerright');
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        // Add collision between the player and the ground
        this.physics.add.collider(player, ground);

        // Set up cursor keys for input
        cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(player, true, 1, 1, 0, 150);

        // Store ground group for use in update function
        this.ground = ground;

        // Initialize the global text object
        text = this.add.text(10, 10, 'Unset', { fontSize: '16px', fill: '#000' });
        text.setScrollFactor(0);
    } catch (error) {
        console.error("Error in create function:", error);
    }
}

function createGroundTile(scene, groundGroup, x, y) {
    groundGroup.create(x, y, 'ground').setScale(1, 0.2).refreshBody();
}

function checkElementAtPosition(group, x, y) {
    const children = group.getChildren();
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const childLeft = child.x - child.displayWidth / 2;
        const childRight = child.x + child.displayWidth / 2;
        const childTop = child.y - child.displayHeight / 2;
        const childBottom = child.y + child.displayHeight / 2;

        if (x >= childLeft && x <= childRight && y >= childTop && y <= childBottom) {
            text.setText('element found');
            return true; // Element found at the position
        }
    }
    text.setText('no element found');
    return false; // No element found at the position
}

var useEdge;
var doingdir;
function update() {
    const cameraRightEdge = this.cameras.main.scrollX + this.cameras.main.width;
    var leftEdge = this.cameras.main.scrollX;
    // Handle player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-1600);
        player.setTexture('playerleft');
        useEdge = leftEdge;
        doingdir = "left";
    } else if (cursors.right.isDown) {
        player.setVelocityX(1600);
        player.setTexture('playerright');
        useEdge = cameraRightEdge;
        doingdir = "right";
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
    var element;
    if(doingdir === "right") {
        // Check if a new ground tile should be created
         element = checkElementAtPosition(this.ground, (useEdge) + 100, 650);
    } else {// Check if a new ground tile should be created
         element = checkElementAtPosition(this.ground, (useEdge) - 100, 650);}

    var newTileX;// Assuming ground tiles are spaced 2048 units apart
    if (!element) {
        var newTileX;
        if(doingdir === "right") {
           newTileX = oldTileX + 2048;
        } else {
            newTileX = oldTileX - 2048;
        }

        createGroundTile(this, this.ground, newTileX, 650);
        oldTileX = newTileX;
    }
}
