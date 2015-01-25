gameStates.level4 = function(){};

gameStates.level4.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/background.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('exit', 'assets/exit.png');
        game.load.image('player1', 'assets/player1.png');
        game.load.image('player2', 'assets/player2.png');
        game.load.image('pushblock', 'assets/firstaid.png');
        game.load.image('block', 'assets/block.png');

        game.load.audio('collect', 'assets/sounds/collect.mp3');
        game.load.audio('death', 'assets/sounds/death.mp3');
        game.load.audio('interact', 'assets/sounds/interact.mp3');
        game.load.audio('levelComplete', 'assets/sounds/levelComplete.mp3');
        game.load.audio('song', 'assets/sounds/song.mp3');
        game.load.audio('shoot', 'assets/sounds/shoot.mp3');
        game.load.audio('moving', 'assets/sounds/moving.mp3');

    },

    create : function() {

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');

        //Adjust screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
        //  The platforms group contains the ground and the 2 blocks we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;


        // The player and its settings
        player1 = game.add.sprite(20, game.world.height - 325, 'player1');
        player2 = game.add.sprite(750, game.world.height - 325, 'player2');

        block1 = game.add.sprite(200, 50, 'block');
        block2 = game.add.sprite(200, 250, 'block');
        block3 = game.add.sprite(200, 350, 'block');
        block4 = game.add.sprite(200, 550, 'block');

        block5 = game.add.sprite(500, 50, 'block');
        block6 = game.add.sprite(500, 250, 'block');
        block7 = game.add.sprite(500, 350, 'block');
        block8 = game.add.sprite(500, 550, 'block');

        // Place the exit door in the world
        //exit = game.add.sprite(150, 5, 'exit');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);

        game.physics.arcade.enable(block1);
        game.physics.arcade.enable(block2);
        game.physics.arcade.enable(block3);
        game.physics.arcade.enable(block4);
        game.physics.arcade.enable(block5);
        game.physics.arcade.enable(block6);
        game.physics.arcade.enable(block7);
        game.physics.arcade.enable(block8);

        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;

        block1.body.immovable = true;
        block2.body.immovable = true;
        block3.body.immovable = true;
        block4.body.immovable = true;
        block5.body.immovable = true;
        block6.body.immovable = true;
        block7.body.immovable = true;
        block8.body.immovable = true;

        //  Finally some stars to collect
        stars = game.add.group();
        p1bullets = game.add.group();
        p2bullets = game.add.group();
        exits = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;
        p1bullets.enableBody = true;
        p2bullets.enableBody = true;
        exits.enableBody = true;

        //  The score
        scoreText = game.add.text(16, 16, 'Player 1 Score: ' + player1Score, { fontSize: '32px', fill: '#000' });
		scoreText = game.add.text(game.world.width - 260, 16, 'Player 2 Score: ' + player2Score, { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
    },

    update : function() {

         //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player1, platforms);
        game.physics.arcade.collide(player2, platforms);
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.collide(p1bullets, player2, destroyBullet);
        game.physics.arcade.collide(p2bullets, player1, destroyBullet);

        game.physics.arcade.collide(player1, block1);
        game.physics.arcade.collide(player2, block1);
        game.physics.arcade.collide(player1, block2);
        game.physics.arcade.collide(player2, block2);
        game.physics.arcade.collide(player1, block3);
        game.physics.arcade.collide(player2, block3);
        game.physics.arcade.collide(player1, block4);
        game.physics.arcade.collide(player2, block4);
        game.physics.arcade.collide(player1, block5);
        game.physics.arcade.collide(player2, block5);
        game.physics.arcade.collide(player1, block6);
        game.physics.arcade.collide(player2, block6);
        game.physics.arcade.collide(player1, block7);
        game.physics.arcade.collide(player2, block7);
        game.physics.arcade.collide(player1, block8);
        game.physics.arcade.collide(player2, block8);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        

        //game.physics.arcade.overlap(pushblock, exits, hitExit, null, this);
        /*
        game.physics.arcade.overlap(player1, exits, hitExit, null, this);
        game.physics.arcade.overlap(player2, exits, hitExit, null, this);
        */

        p1shootTimer++;
        p2shootTimer++;
        moveChar();
        shootBullet();    

        if (score >=5000) {
            game.state.start('level1');
        }    
    }
}

