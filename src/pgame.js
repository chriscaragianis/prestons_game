var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('back', 'assets/sky.png');
  game.load.spritesheet('badguy', 'assets/pguy.png',32,50);
  game.load.image('ground', 'assets/ground.png');
  game.load.image('grass1', 'assets/grass1.png');
  game.load.image('grass2', 'assets/grass2.png');
  game.load.image('grass3', 'assets/grass3.png');
  game.load.image('grass4', 'assets/grass4.png');
  game.load.image('house', 'assets/house.png');
}

function create() {
  game.world.setBounds(0,0,5600,600);

  sky = game.add.tileSprite( 0, 0, 5600, 800, 'back');
  g4 = game.add.tileSprite(0, 360, 5600, 100, 'grass4');
  g3 = game.add.tileSprite(0, 380, 5600, 100, 'grass3');
  g2 = game.add.tileSprite(0, 410, 5600, 100, 'grass2');
  g1 = game.add.tileSprite(0, 450, 5600, 100, 'grass1');
  dirt = game.add.tileSprite(0, 500, 5600, 100, 'ground');
  baddie = game.add.sprite(400, 400, 'badguy');

  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.physics.arcade.enable(baddie);
  baddie.body.collideWorldBounds = true;
  baddie.body.gravity.y = 800;
  baddie.animations.add('right', [1, 2], 10, true);
  baddie.animations.add('left', [3, 4], 10, true);

  game.physics.arcade.enable(dirt);
  dirt.body.immovable= true;

  game.camera.follow(baddie);
}

function update() {
  game.physics.arcade.collide(baddie, dirt); 

  cursors = game.input.keyboard.createCursorKeys();
  baddie.body.velocity.x = 0;
  if (cursors.right.isDown){
    baddie.body.velocity.x = 150;
    baddie.animations.play('right');
  } else 
  if (cursors.left.isDown){
    baddie.body.velocity.x = -150;
    baddie.animations.play('left');
  } 
   else {
    baddie.animations.stop();
    baddie.frame = 0;
  }
  if (cursors.up.isDown && baddie.body.touching.down){
    baddie.body.velocity.y = -450;
  }

  sky.tilePosition.x = -(game.camera.x * 0.22);
  dirt.tilePosition.x = -(game.camera.x * 1);
  g1.tilePosition.x = -(game.camera.x * 0.8);
  g2.tilePosition.x = -(game.camera.x * 0.6);
  g3.tilePosition.x = -(game.camera.x * 0.4);
  g4.tilePosition.x = -(game.camera.x * 0.2);
}
