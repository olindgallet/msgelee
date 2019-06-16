/**
 * Desert Knights are simple enemies.
 * They travel back and forth.
 */
game.ParrotEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("parrot-spritesheet"),
            50, 50
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 50;
		settings.spriteheight = 50;
        this.parent(x, y, settings);
		this.updateColRect(4, 46, -1, 50);
        this.renderable.addAnimation("fly", [ 0, 1, 2, 3], 150);
		this.renderable.addAnimation("freeze", [ 4,5,6,7], 150);
		this.renderable.addAnimation("frozen", [ 7], 150);
		this.resetState();
    },
 

    update: function() {
		var requiresUpdate = false;
        if (this.inViewport && !game.data.isPaused){
			this.parent();
			this.updateMovement();
				
			var collision = this.collide();
			
			if (collision && collision.obj.type === game.data.PLAYER_TYPE && !this.isRetreating){
				
				this.isRetreating = true;
				this.isRetreatingLeft = collision.obj.pos.x < this.pos.x;
				
			} else if (collision && collision.obj.type === game.data.SUGARSHOT_TYPE){
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
			}else if (this.isRetreating && this.aliveOnScreen){
				if (this.retreatingDistance < this._maxRetreatingDistance){
					if (this.isRetreatingLeft){
						if (this.pos.x + (this._xSpeed * 2) < game.data.stageWidth){
							this.pos.x = this.pos.x + (this._xSpeed * 2);
						}
						if (this.pos.y - (this._ySpeed * 2) > 0){
							this.pos.y = this.pos.y - (this._ySpeed * 2);
						}
					} else{
						if (this.pos.x  - (this._xSpeed * 2) > 0){
							this.pos.x = this.pos.x - (this._xSpeed * 2);
						}
						if (this.pos.y - (this._ySpeed * 2) > 0 ){
							this.pos.y = this.pos.y - (this._ySpeed * 2);
						}
					}
					this.retreatingDistance = this.retreatingDistance + (this._xSpeed * 2) + (this._ySpeed * 2);
				} else {
					if (this.pauseFrames < this._maxPauseFrames){
						this.pauseFrames = this.pauseFrames + 1;
					} else {
						this.pauseFrames        = 0;
						this.retreatingDistance = 0;
						this.isRetreating           = false;
						this.isChasing              = false;
					}
				}
			}else if (this.aliveOnScreen && game.data.player.distanceTo(this) <= this._triggerRadius){
				if (!this.isChasing){
					me.audio.play("parrot-sfx");
					this.isChasing = true;
				}
				if (game.data.player.pos.x <= this.pos.x){
					this.pos.x = this.pos.x - this._xSpeed;
				} else {
					this.pos.x = this.pos.x + this._xSpeed;
				}
				
				if (game.data.player.pos.y <= this.pos.y){
					this.pos.y = this.pos.y - this._ySpeed;
				} else {
					this.pos.y = this.pos.y + this._ySpeed;
				}
			} else {
				this.isChasing = false;
			}
			requiresUpdate = true;
		}
		
		return requiresUpdate;
	}, 
	
	resetState: function(){
		this._triggerRadius   = 250;
		this._xSpeed            = 2;
		this._ySpeed            = 2;
		
        this.collidable          = true;
		this.aliveOnScreen = true;

		this.isChasing              = false;
		this.isRetreating           = false;
		this.isRetreatingLeft     = false;
		this.retreatingDistance = 0;
		this._maxRetreatingDistance = 200;
		this.pauseFrames        = 0;
		this._maxPauseFrames = 150;
	
		this.type                  = me.game.ENEMY_OBJECT;
		this.gravity              = 0;
		this.renderable.setCurrentAnimation("fly");
	}
});
