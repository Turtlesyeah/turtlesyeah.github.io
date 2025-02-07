var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    // Load assets here
    this.load.image('player', 'path/to/player.png'); // Replace with actual path
    this.load.image('ground', 'path/to/ground.png'); // Replace with actual path
}

function create() {
    // Create the ground
    var ground = this.physics.add.staticGroup();
    ground.create(400, 568, 'ground').setScale(2).refreshBody(); // Adjust as needed

    // Create the player
    var player = this.physics.add.sprite(100, 450, 'player');
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
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}
