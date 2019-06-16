/**
 * Desert Knights are simple enemies.
 * They travel back and forth.
 */
game.DesertKnightEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("desert-knight-spritesheet"),
            50, 50
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 50;
		settings.spriteheight = 50;
        this.parent(x, y, settings);
		this.updateColRect(4, 46, -1, 50);
        this.renderable.addAnimation("walk", [ 0, 1 ], 250);
		this.renderable.addAnimation("freeze", [2, 3, 4, 5], 50);
		this.renderable.addAnimation("frozen", [5]);
		this.resetState();
    },
 

    update: function() {
        if (!game.data.isPaused){
			this.activeFrames = this.activeFrames + 1;
			
			var collision = this.collide();
			
			if (collision && collision.obj.type == game.data.SUGARSHOT_TYPE){
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
			}
			
			if (this.aliveOnScreen) {
				if (this.goingLeft){
					if (me.game.collisionMap.getTile(this.pos.x, this.pos.y + this.height) !== null){
						this.vel.x -= this.accel.x * me.timer.tick;
						this.flipX(false);
					} else {
						this.goingLeft = false;
						this.vel.x += this.accel.x * me.timer.tick;		
						this.flipX(true);
					}
				} else {
					if (me.game.collisionMap.getTile(this.pos.x + this.width, this.pos.y + this.height) !== null){
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
        this.collidable    = true;
		this.aliveOnScreen = true;
		this.type          = me.game.ENEMY_OBJECT;
		this.goingLeft     = true;
		this.setVelocity(.5, 15);
		this.renderable.setCurrentAnimation("walk");
	}
});
