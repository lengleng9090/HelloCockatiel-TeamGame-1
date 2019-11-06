let player;
let goose;
let turtle;
let can;
let bag;
let bottle;
let cardBoard;
let keyA;
let keyD;
let keyW;
let keyS;
var healthBar;
let bg;
let event2;
let event3;
var score = 0;
var scoreText;
class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        })
    }
    preload() {
        this.load.image('bg','images/Background.png')
        this.load.spritesheet('player', 'images/Player.png', { frameWidth: 510, frameHeight: 590 })
        this.load.spritesheet('goose', 'images/Goose.png', { frameWidth: 300, frameHeight: 680 })
        this.load.spritesheet('turtle', 'images/Turtle.png', { frameWidth: 280, frameHeight: 320 })
        this.load.spritesheet('can', 'images/Can.png', { frameWidth: 510, frameHeight: 480 })
        this.load.spritesheet('bag', 'images/Bag.png', { frameWidth: 580, frameHeight: 350 })
        this.load.spritesheet('bottle', 'images/Bottle.png', { frameWidth: 530, frameHeight: 580 })
        this.load.spritesheet('cardBoard', 'images/Cardboard.png', { frameWidth: 600, frameHeight: 450 })
        this.load.image('black-bar', 'images/health-black.png');
        this.load.image('red-bar', 'images/health-red.png');

    }

    create() {
        bg = this.add.tileSprite(0,0,600,900,'bg').setOrigin(0,0)

        //สร้างอนิเมชั่นห่าน
        this.anims.create({
            key: 'gooseAni',
            frames: this.anims.generateFrameNumbers('goose', {
                start: 0,
                end: 7
            }),
            framerate: 1,
            repeat: -1
        })
        //สร้างอนิเมชั่นเต่า
        this.anims.create({
            key: 'turtleAni',
            frames: this.anims.generateFrameNumbers('turtle', {
                start: 0,
                end: 8
            }),
            framerate: 0.5,
            repeat: -1
        })
        //สร้างอนิเมชั่น player(ช่วงตอนเก็บขยะ)
        this.anims.create({
            key: 'catchAni',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 9

            }),
            framerate: 1,
            repeat: 0
        })
        //สร้างอนิเมชั่นกระป๋อง
        this.anims.create({
            key: 'canAni',
            frames: this.anims.generateFrameNumbers('can', {
                start: 0,
                end: 7

            }),
            framerate: 1,
            repeat: -1
        })
        //สร้างอนิเมชั่นกระเป๋า
        this.anims.create({
            key: 'bagAni',
            frames: this.anims.generateFrameNumbers('bag', {
                start: 0,
                end: 4

            }),
            framerate: 1,
            repeat: -1
        })
        //สร้างอนิเมชั่นขวด
        this.anims.create({
            key: 'bottleAni',
            frames: this.anims.generateFrameNumbers('bottle', {
                start: 0,
                end: 7

            }),
            framerate: 1,
            repeat: -1
        })
        //สร้างอนิเมชั่นลังกระดาษ
        this.anims.create({
            key: 'cardBoardAni',
            frames: this.anims.generateFrameNumbers('cardBoard', {
                start: 0,
                end: 7

            }),
            framerate: 1,
            repeat: -1
        })

        player = this.physics.add.sprite(300, 500, 'player').setScale(0.25).setDepth(5).setSize(350,80).setOffset(127.5,0)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        player.health = 100;
        player.maxHealth = 100;
        var backgroundBar = this.add.image(80, 18, 'black-bar').setOrigin(0,0);
        backgroundBar.fixedToCamera = true;
        healthBar = this.add.image(80, 18, 'red-bar').setOrigin(0,0);
        healthBar.fixedToCamera = true;
        var healthLabel = this.add.text(20, 20, 'Health', {fontSize:'15px', fill:'#ffffff'});
        healthLabel.fixedToCamera = true;
        
        scoreText = this.add.text(500, 20, 'score: 0', { fontSize: '15px', fill: '#ffffff' });

        event = this.time.addEvent({
            delay: Phaser.Math.Between(500, 1000),
            callback: function () {
                let i = Phaser.Math.Between(0, 5);
                if (i == 0) {
                    can = this.physics.add.sprite(Phaser.Math.Between(0, 600), 0, 'can').setScale(0.08)
                    can.setVelocityY(200)
                    can.anims.play('canAni', true)
                    this.physics.add.overlap(player, can, collectCan, null, this);
                }
                if (i == 1) {
                    bag = this.physics.add.sprite(Phaser.Math.Between(0, 600), 0, 'bag').setScale(0.08)
                    bag.setVelocityY(Phaser.Math.Between(200, 400))
                    bag.anims.play('bagAni', true)
                    this.physics.add.overlap(player, bag, collectBag, null, this);
                }
                if (i == 2) {
                    bottle = this.physics.add.sprite(Phaser.Math.Between(0, 600), 0, 'bottle').setScale(0.08)
                    bottle.setVelocityY(Phaser.Math.Between(200, 400))
                    bottle.anims.play('bottleAni', true)
                    this.physics.add.overlap(player, bottle, collectBottle, null, this);
                }
                if (i == 3) {
                    cardBoard = this.physics.add.sprite(Phaser.Math.Between(0, 600), 0, 'cardBoard').setScale(0.08)
                    cardBoard.setVelocityY(Phaser.Math.Between(200, 400))
                    cardBoard.anims.play('cardBoardAni', true)
                    this.physics.add.overlap(player, cardBoard, collectCardBoard, null, this);
                }

            },
            loop: true,
            paused: false,
            //repeat: 10,
            callbackScope: this
        })
        event2 = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: function () {
                let i = Phaser.Math.Between(0, 1);
                if( i == 0){
                    goose = this.physics.add.sprite(Phaser.Math.Between(0, 600), 0, 'goose').setScale(0.08)
                    goose.setVelocityY(Phaser.Math.Between(300, 500))
                    goose.anims.play('gooseAni', true)
                    this.physics.add.overlap(player, goose, collectGoose, null, this);
                }
                if(i == 1){
                    turtle = this.physics.add.sprite(Phaser.Math.Between(0, 600), 0, 'turtle').setScale(1)
                    turtle.setVelocityY(Phaser.Math.Between(300, 500))
                    turtle.anims.play('turtleAni', true)
                    this.physics.add.overlap(player, turtle, collectTurtle, null, this);
                }

            },
            loop: true,
            paused: false,
            callbackScope: this
        })
        event3 = this.time.addEvent({
            delay: 3000,
            callback: function () {
                for(let i = 0; i < 9; i++){
                    goose = this.physics.add.sprite(Phaser.Math.Between(0, 600), 0, 'goose').setScale(0.08)
                    goose.setVelocityY(Phaser.Math.Between(300, 500))
                    goose.anims.play('gooseAni', true)
                    this.physics.add.overlap(player, goose, collectGoose, null, this);
                }

            },
            loop: true,
            paused: false,
            callbackScope: this
        })


        function collectCan(player, can) {
            score += 10;
            can.disableBody(true, true);
            player.anims.play('catchAni', true)
            can.destroy();
        }
        this.physics.add.overlap(player, can, collectCan, null, this);

        function collectBag(player, bag) {
            score += 10;
            player.health = player.health +5
            bag.disableBody(true, true);
            player.anims.play('catchAni', true)
            bag.destroy();
            
        }
        this.physics.add.overlap(player, bag, collectBag, null, this);

        function collectBottle(player, bottle) {
            score += 10;
            bottle.disableBody(true, true);
            player.anims.play('catchAni', true)
            bottle.destroy();
        }
        this.physics.add.overlap(player, bottle, collectBottle, null, this);

        function collectCardBoard(player, cardBoard) {
            score += 10;
            cardBoard.disableBody(true, true);
            player.anims.play('catchAni', true)
            cardBoard.destroy();
        }
        this.physics.add.overlap(player, cardBoard, collectCardBoard, null, this);

        function collectGoose(player, goose) {
            player.health = player.health -0.5 ;
            goose.disableBody(true, true);
            player.anims.play('catchAni', true)
            goose.destroy();
        }
        this.physics.add.overlap(player, goose, collectGoose, null, this);

        function collectTurtle(player, turtle) {
            player.health = player.health -20 ;
            turtle.disableBody(true, true);
            player.anims.play('catchAni', true)
            turtle.destroy();
        }
        this.physics.add.overlap(player, turtle, collectTurtle, null, this);


        player.setCollideWorldBounds(true);

    }


    update(delta, time) {
        scoreText.setText('Score: ' + score);
        bg.tilePositionY -= 3
        healthBar.setScale(player.health / player.maxHealth, 1);
        if(player.health <= 0){
            score = 0;
            this.scene.restart();
        }
        if (keyW.isDown){
            player.setVelocityY(-250);
            
        }
        else if(keyS.isDown){
            player.setVelocityY(100);
        }
        else{
            player.setVelocityY(0);
        }
        
        if(keyA.isDown){
            player.setVelocityX(-250);
        }
        else if (keyD.isDown){
            player.setVelocityX(250);
        }
        else{
            player.setVelocityX(0);
        }
    }

}
export default GameScene