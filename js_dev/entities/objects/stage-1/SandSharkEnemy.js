/**
 * Desert Knights are simple enemies.
 * They travel back and forth.
 */
game.SandSharkEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.startingPos = {x: x, y: y};
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("sand-shark-spritesheet"),
            50, 50
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 50;
		settings.spriteheight = 50;
        this.parent(x, y, settings);
	
		this.updateColRect(5, 40, 20, 30);
        this.renderable.addAnimation("walk", [ 0, 1, 2, 3, 4], 50);
		this.renderable.addAnimation("freeze", [5, 6, 7, 8], 50);
		this.renderable.addAnimation("frozen", [8], 50);
		this.renderable.setCurrentAnimation("walk");	
		this.resetState();
    },
 

    update: function() {
        if (!game.data.isPaused){
			//if (!this.inViewport && !this.startingCopy.inViewport){
			//	this.resetState();
			//} else {
			var collision = this.collide();
			
			if (collision && collision.obj.type == game.data.SUGARSHOT_TYPE){
				game.data.sugarShotOnScreen = false;
				me.game.remove(collision.obj);	
				if (this.alive){
					game.data.playerScore = game.data.playerScore + 100;
					this.gravity = 1;
					this.alive = false;
					this.vel.x = 0;
					this.renderable.setCurrentAnimation("freeze", "frozen");
					me.audio.play("freeze-sfx");
					this.type = game.data.PLATFORM_TYPE;
					this.updateColRect(0, 50, 0, 50);
				}
			}
			
			if (this.inViewport && this.alive) {
				player_x = game.data.player.pos.x;
				if (this.goingLeft && me.game.collisionMap.getTile(this.pos.x, this.pos.y + this.height) != null){
					if (player_x < this.pos.x){
						this.vel.x -= this.accel.x * me.timer.tick;
						this.flipX(false);
					} else {
						//play turn animation.
						//start going right
						this.goingLeft = false;
						this.vel.x += this.accel.x * me.timer.tick;		
						this.flipX(true);
					}
				} else if (!this.goingLeft && me.game.collisionMap.getTile(this.pos.x + this.width, this.pos.y + this.height) != null){
					if (player_x > this.pos.x){
						//keep going right.
						this.vel.x += this.accel.x * me.timer.tick;
						this.flipX(true);
					} else {
						this.goingLeft = true;
						this.vel.x -= this.accel.x * me.timer.tick;
						this.flipX(false);
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
		this.pos.x         = this.startingPos.x;
		this.pos.y         = this.startingPos.y;
		this.collidable    = true;
		this.type          = me.game.ENEMY_OBJECT;
		this.goingLeft     = true;
		this.alive         = true;
		this.alwaysUpdate  = false;
		this.setVelocity(1, 15);
		this.renderable.setCurrentAnimation("walk");
	}
});
