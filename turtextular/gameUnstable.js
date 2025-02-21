window.addEventListener("error", function (event) {
    window.alert(`<p style="color: red;">Error: ${event.message} at ${event.lineno}:${event.colno} of ${event.filename}</p>`);
});
var enterKey;
var turtleObjects;
var text;
function generateplane() {}

var config = {
    type: Phaser.AUTO,
    width: 1366,
    height: 647,
    scale: {
        // Fit to window
        mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
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
var enterKeyHeld = false;
var summonFrame1 = true;
var mouseX = mouseY = 0;

function preload() {
    this.load.image('playerleft', 'https://turtlesyeah.github.io/turtextular/assets/turtleleft.png'); // Replace with actual path
    this.load.image('playerright', 'https://turtlesyeah.github.io/turtextular/assets/turtleright.png'); // Replace with actual path
    this.load.image('ground', 'https://turtlesyeah.github.io/turtextular/assets/canvas.png'); // Replace with actual path
    this.load.image('ore1', 'https://turtlesyeah.github.io/turtextular/assets/bauxenite.png'); // Replace with actual path
    this.load.image('ore2', 'https://turtlesyeah.github.io/turtextular/assets/idovite.png');
    this.load.image('drill_T1', 'https://turtlesyeah.github.io/turtextular/assets/drillt1.png');
    this.load.image('drill_T1_build', 'https://turtlesyeah.github.io/turtextular/assets/drillt1_buildable.png'); // Replace with actual path
    this.load.image('drill_T1_dont_build', 'https://turtlesyeah.github.io/turtextular/assets/drillt1_unbuildable.png');
}

function create() {
    try {
        
        // Existing code
        this.cameras.main.setBackgroundColor('#fffbe0');
        var turtleObjects = this.physics.add.staticGroup();
        turtleObjects.setDepth(0); // Set turtleObjects group to appear behind
        
        // Create ground group and set depth
        var ground = this.physics.add.staticGroup();
        ground.setDepth(1); // Set ground group to appear in front
        this.turtleObjects = turtleObjects;
        // Initial ground tile creation
        createTextureTile(this, ground, 400, 650, "norm");
        createTextureTile(this, ground, 2448, 650, "norm");
        createTextureTile(this, ground, 4496, 650, "norm");
        this.input.on('pointermove', function (pointer) {
            mouseX = pointer.worldX;
            mouseY = pointer.worldY;
        });
        oldTileX = 4496; // Set oldTileX to the last created tile's position

        // Create the player
        player = this.physics.add.sprite(400, 450, 'playerright');
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        // Add collision between the player and the ground
        this.physics.add.collider(player, ground);

        // Set up cursor keys for input
        cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });
        this.cameras.main.startFollow(player, true, 1, 1, 0, 150);

        // Store ground group for use in update function
        this.ground = ground;

        // Initialize the global text object
        text = this.add.text(10, 10, 'made ground element x 0', { fontSize: '16px', fill: '#000' });
        text.setScrollFactor(0);
    } catch (error) {
        console.error("Error in create function:", error);
    }
}

function createTextureTile(scene, groundGroup, x, y, texture) {
    let rand = randomNum(0, 20);
    let textureName;
    if(rand === 3) {
        textureName = "ore1";
    } 
    else if (rand === 4 || rand === 5 || rand === 7) {
        textureName = "ore2";
    }
    else {
        textureName = "ground";
    }
    if(texture !== "norm") {
        textureName = texture;
    } else {}
    let outputItem = groundGroup.create(x, y, textureName).setScale(1, 1).refreshBody();
    if(texture === "norm") {
        outputItem.setDepth(1);
    }
    else {
        outputItem.setDepth(0);
    }
    return outputItem;
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
            
            return true; // Element found at the position
        }
    }
    
    return false; // No element found at the position
}
var mormon = 1;
var useEdge = 0;
var doingdir = "right";
var inBuildMode = false;
document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyE') {
        if(inBuildMode) {
            inBuildMode = false;
        } 
        else if(!inBuildMode) {
            inBuildMode = true;
        } else {}
    }
});
let currentBuildingTile;
function update() {
    
    const cameraRightEdge = this.cameras.main.scrollX + this.cameras.main.width;
    var leftEdge = this.cameras.main.scrollX;

    if (inBuildMode) {
        text.setText('in build mode');

        if(summonFrame1) {
            currentBuildingTile = createTextureTile(this, this.turtleObjects, mouseX, mouseY, "drill_T1_build");
            
            summonFrame1 = false;
        } else{
            currentBuildingTile.setPosition(mouseX, mouseY);
        }
    } else {
        text.setText('not in build mode');
        summonFrame1 = true;
    }

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
        
        mormon += 1;
        if(doingdir === "right") {
           newTileX = oldTileX + 2048;
        } else {
            newTileX = oldTileX - 2048;
        }
        
        
        createTextureTile(this, this.ground, newTileX, 650, "norm");
        oldTileX = newTileX;
        
        
    }
}
function randomNum(startVal, endVal) {
    endVal = endVal - startVal;
    var returnVal = Math.floor(Math.random() * (endVal + 1) + startVal);
    return returnVal;
}


