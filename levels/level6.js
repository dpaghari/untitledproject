var p1Plat;
var p2Plat;
var numPlayers;

gameStates.level6 = function(){};

gameStates.level6.prototype = {

    // Preload all assets
    preload : function() {

        game.load.image('background', 'assets/darkness.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('player1', 'assets/player1_tank.png');
        game.load.image('player2', 'assets/player2_tank.png');
        game.load.image('lvl6platforms', 'assets/lvl6platforms.png');
        game.load.image('clear', 'assets/clear.png');

        game.load.audio('collect', 'assets/sounds/collect.mp3');
        game.load.audio('death', 'assets/sounds/death.mp3');
        game.load.audio('interact', 'assets/sounds/interact.mp3');
        game.load.audio('levelComplete', 'assets/sounds/levelComplete.mp3');
        game.load.audio('song', 'assets/sounds/song.mp3');
        game.load.audio('moving', 'assets/sounds/moving.mp3');


        //  Load the Google WebFont Loader script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },

    create : function() {
        numPlayers = 2;

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'background');
        p1Plat = game.add.sprite((game.world.width/2)-300, (game.world.height/2) -90, 'lvl6platforms');
        p2Plat = game.add.sprite((game.world.width/2)+100, (game.world.height/2) -90, 'lvl6platforms');
        /*
        p1Plat.scale.x = 1.3;
        p1Plat.scale.y = 1.3;
        p2Plat.scale.x = 1.3;
        p2Plat.scale.y = 1.3;
        */
        //Adjust screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);

        // The player and its settings
        player1 = game.add.sprite(p1Plat.x + (p1Plat.width/2)-20, p1Plat.y + (p1Plat.height/2)-20, 'player1');
        player2 = game.add.sprite(p2Plat.x + (p2Plat.width/2)-20, p2Plat.y + (p2Plat.height/2)-20, 'player2');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player1);
        game.physics.arcade.enable(player2);
        

        player1.body.collideWorldBounds = true;
        player2.body.collideWorldBounds = true;
        

        //  Finally some stars to collect
        
        p1bullets = game.add.group();
        p2bullets = game.add.group();
        
        //  We will enable physics for any star that is created in this group
       
        p1bullets.enableBody = true;
        p2bullets.enableBody = true;
        
        //  The score
        player1ScoreText = game.add.text(100, 16, 'P1: ' + player1Score, { fontSize: '32px', fill: '#FFF'});
        player1ScoreText.font = 'Lato';
        player2ScoreText = game.add.text(game.world.width - 160, 16, 'P2: ' + player2Score, { fontSize: '32px', fill: '#FFF'});
        player2ScoreText.font = 'Lato';

        clear = game.add.sprite(game.width/2-100, -200, 'clear');       
        game.physics.enable(clear, Phaser.Physics.ARCADE);

    },

    update : function() {

        checkPlayerPositions();
  
        game.physics.arcade.collide(player1, player2);
        game.physics.arcade.collide(p1bullets, player2, destroyBullet);
        game.physics.arcade.collide(p2bullets, player1, destroyBullet);
    
        p1shootTimer++;
        p2shootTimer++;
        moveChar();
        shootBullet();

        if(numPlayers < 2){
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
                player1Score += 50;
                player2Score += 50;
                p1Touched = false;
                p2Touched = false;
                levelTimer = 0;
                

                game.state.start('level7');
            }
            var levelComplete = game.add.audio('levelComplete', .1, false);
            levelComplete.loop = false;
            levelComplete.play();
            levelComplete.totalDuration = .2;
            game.state.start('level7');
        }
        
    }

}

function checkPlayerPositions(){


    if(player1.x > p1Plat.x + p1Plat.width + 30){
        player1.kill();
        numPlayers--;
    }

    else if(player1.x < p1Plat.x - 30){
        player1.kill();
        numPlayers--;
    }

    else if(player1.y > p1Plat.y + p1Plat.height + 30){
        player1.kill();
        numPlayers--;
    }
    else if(player1.y < p1Plat.y - 30){
        player1.kill();
        numPlayers--;
    }

    if(player2.x > p2Plat.x + p2Plat.width + 30){
        player2.kill();
        numPlayers--;
    }

    else if(player2.x < p2Plat.x - 30){
        player2.kill();
        numPlayers--;
    }

    else if(player2.y > p2Plat.y + p2Plat.height + 30){
        player2.kill();
        numPlayers--;
    }
    else if(player2.y < p2Plat.y - 30){
        player2.kill();
        numPlayers--;
    }


}
