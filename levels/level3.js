var buttonActivated;
var doorMade;
var exitDoor;
var randX;
var randY;
gameStates.level3 = function(){};

gameStates.level3.prototype = {



    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/backgrounds/Orange.jpg');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.spritesheet('exit', 'assets/exit.png', 45, 45);
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player2.png');
        game.load.image('pushblock', 'assets/pushblock.png');
        game.load.image('block', 'assets/block.png');
        game.load.image('button', 'assets/switch.png');
        game.load.image('clear', 'assets/clear.png');
        
        game.load.audio('collect', 'assets/sounds/collect.mp3');
        game.load.audio('death', 'assets/sounds/death.mp3');
        game.load.audio('interact', 'assets/sounds/interact.mp3');
        game.load.audio('levelComplete', 'assets/sounds/levelComplete.mp3');
        game.load.audio('song', 'assets/sounds/song.mp3');
        game.load.audio('shoot', 'assets/sounds/shoot.mp3');
        game.load.audio('moving', 'assets/sounds/moving.mp3');

        //  Load the Google WebFont Loader script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },

    create : function() {
        
        
        buttonActivated = false;
        doorMade = false;
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');

        //Adjust screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        //  Finally some stars to collect
        stars = game.add.group();
        p1bullets = game.add.group();
        p2bullets = game.add.group();
        exits = game.add.group();
        buttons = game.add.group();
        blocks = game.add.group();
        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;
        p1bullets.enableBody = true;
        p2bullets.enableBody = true;
        exits.enableBody = true;
        buttons.enableBody = true;
        blocks.enableBody = true;

        
        exitDoor = exits.create(-100, -100, 'exit');
        exitDoor.animations.add('active', [0, 1, 2, 3, 4], 10, true);
        
        
        // The player and its settings
        player1 = game.add.sprite(0, game.world.height - 150, 'player1');
        player2 = game.add.sprite(500, game.world.height - 150, 'player2');
        pushblock = game.add.sprite(game.world.width/2, game.world.height/2, 'pushblock');
        var button = buttons.create(650, 100, 'button');
        block1 = blocks.create(590, 50, 'block');
        block2 = blocks.create(650, 50, 'block');
        block3 = blocks.create(710, 50, 'block');
        block4 = blocks.create(590, 100, 'block');
        block5 = blocks.create(710, 100, 'block');
        block6 = blocks.create(game.world.width / 2, 380, 'block');
        block7 = blocks.create(game.world.width / 2, 230, 'block');

        game.physics.arcade.collide(player1, blocks);
        game.physics.arcade.collide(player2, blocks);

        game.physics.arcade.collide(pushblock, blocks);

        block1.body.collideWorldBounds = true;
        block2.body.collideWorldBounds = true;
        block3.body.collideWorldBounds = true;
        block4.body.collideWorldBounds = true;
        block5.body.collideWorldBounds = true;
        block6.body.collideWorldBounds = true;
        block7.body.collideWorldBounds = true;

        block1.body.immovable = true;
        block2.body.immovable = true;
        block3.body.immovable = true;
        block4.body.immovable = true;
        block5.body.immovable = true;
        block6.body.immovable = true;
        block7.body.immovable = true;

        // Place the exit door in the world
        //exit = game.add.sprite(150, 5, 'exit');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);
        game.physics.arcade.enable(pushblock);
        game.physics.arcade.enable(blocks);

        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;
        pushblock.body.collideWorldBounds = true;

        //var exit = exits.create(400, 400, 'exit');

        //  The score
        scoreText = game.add.text(100, 16, 'P1: ' + player1Score, { fontSize: '32px', fill: '#FFF'});
        scoreText.font = 'Lato';
        scoreText = game.add.text(game.world.width - 160, 16, 'P2: ' + player2Score, { fontSize: '32px', fill: '#FFF'});
        scoreText.font = 'Lato';

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

        clear = game.add.sprite(game.width/2-100, -200, 'clear');       
        game.physics.enable(clear, Phaser.Physics.ARCADE);
        
    },

    update : function() {
        exitDoor.animations.play('active');
         //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player1, platforms);
        game.physics.arcade.collide(player2, platforms);
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.collide(p1bullets, player2, destroyBullet);
        game.physics.arcade.collide(p2bullets, player1, destroyBullet);
        game.physics.arcade.collide(player1, pushblock);
        game.physics.arcade.collide(player2, pushblock);
        game.physics.arcade.collide(pushblock, blocks);
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(pushblock, buttons, blockExit, null, this);
        game.physics.arcade.overlap(player1, exits, hitExit, touchedExit, this);
        game.physics.arcade.overlap(player2, exits, hitExit, touchedExit, this);
        game.physics.arcade.collide(player1, blocks);
        game.physics.arcade.collide(player2, blocks);
        
        if(buttonActivated == true){
        randX = Math.random() * 700;
        randY = Math.random() * 500;

            if(doorMade == false){
            
                exitDoor.x = randX;
                exitDoor.y = randY;
                doorMade = true;
            }
            buttonActivated = false;
        }
        else{
            if(doorMade == true){
                exitDoor.x = -100;
                exitDoor.y = -100;
                doorMade = false;
            }
        }
        //console.log(buttonActivated);

        
         if(p1Touched == true){
            game.physics.arcade.moveToXY(player1, exitDoor.x -20, exitDoor.y + 3, 300, 300) ;
            this.game.world.addAt(player1, 10);
            this.game.world.addAt(exitDoor, 1);
        }
        if(p2Touched == true){
            game.physics.arcade.moveToXY(player2, exitDoor.x + 20, exitDoor.y + 3, 300, 300) ;
            this.game.world.addAt(player2, 9);
            this.game.world.addAt(exitDoor, 2);
        }


        if(p1Touched == true || p2Touched == true){

            if (clear.y >= game.height/2 - 50){
                clear.body.velocity.y = 0;
                clear.body.acceleration.y = 0;
            }
            else {
                clear.body.acceleration.y = 1000;
            }

            
            levelTimer++;
            if ( levelTimer == 60 ) {
                var levelComplete = game.add.audio('levelComplete', .1, false);
                levelComplete.loop = false;
                levelComplete.play();
                levelComplete.totalDuration = .3;
                
            }
            
            if( levelTimer >= levelDelay){
              
                p1Touched = false;
                p2Touched = false;
                levelTimer = 0;
                

                game.state.start('level4');
            if(p1Touched == true) {
                player2Score += 50;
            } else {
                player1Score += 50;
            }
            p1Touched = false;
            p2Touched = false;
            levelTimer = 0;
            var levelComplete = game.add.audio('levelComplete', .1, false);
            levelComplete.loop = false;
            levelComplete.play();
            levelComplete.totalDuration = .3;
            game.state.start('level4');
            
            }
        }

        //p1shootTimer++;
        //p2shootTimer++;
        moveChar();
        //shootBullet();
        pushblock.body.velocity.x = 0;
        pushblock.body.velocity.y = 0;
    }
}