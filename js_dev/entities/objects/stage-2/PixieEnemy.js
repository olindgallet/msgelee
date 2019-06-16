/**
 */
game.PixieEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("pixie-spritesheet"),
            64, 88
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 64;
		settings.spriteheight = 88;
        this.parent(x, y, settings);
        this.renderable.addAnimation("walk", [ 2, 3, 4, 3, 2, 1, 0, 1], 75);
		this.renderable.addAnimation("freeze", [5, 6, 7, 8], 75);
		this.renderable.addAnimation("frozen", [8], 150);
		
		this.resetState();
    },
 

    update: function() {
        if (!game.data.isPaused){
			this.activeFrames = this.activeFrames + 1;
			
			var collision = this.collide();
			
			if (this.aliveOnScreen) {
				if (collision && collision.obj.type === game.data.SUGARSHOT_TYPE){
					game.data.sugarShotOnScreen = false;
					me.game.remove(collision.obj);	
					if (this.aliveOnScreen){
						me.audio.play("freeze-sfx");
						game.data.playerScore = game.data.playerScore + 100;
						this.gravity = 1;
						this.aliveOnScreen = false;
						this.vel.x = 0;
						this.type = game.data.PLATFORM_TYPE;
						this.renderable.setCurrentAnimation('freeze', 'frozen');
					}
				} else {
					if (this.goingLeft){
						if (me.game.collisionMap.getTile(this.pos.x, this.pos.y + this.height) !== null && me.game.collisionMap.getTile(this.pos.x, this.pos.y) === null){
							this.vel.x -= this.accel.x * me.timer.tick;
							this.flipX(false);
						} else {
							this.goingLeft = false;
							this.vel.x += this.accel.x * me.timer.tick;		
							this.flipX(true);
						}
					} else {
						if (me.game.collisionMap.getTile(this.pos.x + this.width, this.pos.y + this.height) !== null && me.game.collisionMap.getTile(this.pos.x + this.width + 1, this.pos.y) === null){
							this.vel.x += this.accel.x * me.timer.tick;
							this.flipX(true);
						} else {
							this.goingLeft = true;
							this.vel.x -= this.accel.x * me.timer.tick;
							this.flipX(false);
						}
					}
					
					if (this.inViewport && this.framesShot === -1){
						if (this.goingLeft === false && game.data.player.pos.x > this.pos.x && game.data.player.pos.y >= this.pos.y && game.data.player.pos.y <= this.pos.y + 88){
							me.audio.play("pixie-shot-sfx");
							me.game.add(new game.PixieShot( this.pos.x, this.pos.y + 40, { image: "pixie-shot-spritesheet", spritewidth: 50, spriteheight:50 }, "east", 1), this.z); 
							this.framesShot = 0;
						} else if (this.goingLeft && game.data.player.pos.x < this.pos.x && game.data.player.pos.y >= this.pos.y && game.data.player.pos.y <= this.pos.y + 88){
							me.audio.play("pixie-shot-sfx");
							me.game.add(new game.PixieShot( this.pos.x, this.pos.y + 40, { image: "pixie-shot-spritesheet", spritewidth: 50, spriteheight:50 }, "west", 1), this.z); 
							this.framesShot = 0;
						}
					}
					
					if (this.framesShot > -1){
						this.framesShot = this.framesShot + 1;
						if (this.framesShot >= 300){
							this.framesShot = -1;
						}
					}
				}
			}
			
			this.parent();
			this.updateMovement();
			
			return true;
		}
		return false;
	}, 
	
	resetState: function(){
        this.collidable    = true;
		this.aliveOnScreen = true;
		this.type          = me.game.ENEMY_OBJECT;
		this.goingLeft     = true;
		this.setVelocity(.5, 15);
		this.renderable.setCurrentAnimation("walk");
		this.framesShot = -1;
	}
});