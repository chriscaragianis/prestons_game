var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('back', 'assets/backgroundTest.png');
  game.load.image('badguy', 'assets/badguyTest.png');
  game.load.image('ground', 'assets/ground.png');
}

function create() {
  game.world.setBounds(0,0,5600,600);

  sky = game.add.tileSprite( 0, 0, 5600, 800, 'back');
  dirt = game.add.tileSprite(0, 500, 5600, 100, 'ground');
  baddie = game.add.sprite(50, 400, 'badguy');

  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.physics.arcade.enable(baddie);
  baddie.body.collideWorldBounds = true;
  baddie.body.gravity.y = 300;

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
  } 
  if (cursors.left.isDown){
    baddie.body.velocity.x = -150;
  } 
  if (cursors.up.isDown && baddie.body.touching.down){
    baddie.body.velocity.y = -150;
  }

  sky.tilePosition.x = -(game.camera.x * 0.22);
  dirt.tilePosition.x = -(game.camera.x * 0.52);
}
