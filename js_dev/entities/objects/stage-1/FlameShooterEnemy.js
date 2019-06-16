game.FlameShooterEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("flame-shooter-spritesheet"),
            50, 43
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 50;
		settings.spriteheight = 43;
        this.parent(x, y, settings);
	
        this.renderable.addAnimation("active", [0, 1, 2, 3], 500);
		this.renderable.addAnimation("shooting", [0], 0);
		this.renderable.setCurrentAnimation("active");	
		this.aliveOnScreen  = this.inViewPort;
		this.alwaysUpdate   = false;
		this.resetState();
    },
 

    update: function() {
		var requiresUpdate = false;
        if (!game.data.isPaused){
			if (!this.inViewport){
				this.resetState();
			} else if (this.pos.x - 10 > 0 && this.vel.x === 0){
				if (this.renderable.getCurrentAnimationFrame() == 3 && !this.hasFired){
					this.hasFired                  = true;
					this.renderable.animationpause = true;
					this.shootingFrames            = 0;
					me.game.add(new game.TemporaryEnemy(this.pos.x-22, this.pos.y+3, {image: "flame-shot-1", spritewidth: 20, spriteheight:36}, 15), this.z);
					if (me.audio.isAudioEnable()){
						me.audio.play("flame-shot-sfx");
					}
				} else if (this.hasFired){
					this.shootingFrames = this.shootingFrames + 1;
					if (this.shootingFrames == 15){
						me.game.add(new game.TemporaryEnemy(this.pos.x-62, this.pos.y+3, {image: "flame-shot-2", spritewidth: 60, spriteheight:36}, 30), this.z);
					} else if (this.shootingFrames == 45){
						me.game.add(new game.TemporaryEnemy(this.pos.x-22, this.pos.y+3, {image: "flame-shot-1", spritewidth: 20, spriteheight:36}, 15), this.z);
					} else if (this.shootingFrames == 60){
						this.renderable.animationpause = false;
						this.hasFired = false;
					}
				}
				this.parent();
				this.updateMovement();
				requiresUpdate = true;
			}
		}
		return requiresUpdate;
	}, 
	
	resetState: function(){
		this.shootingFrames = 0;
        this.collidable    = true;
		this.aliveOnScreen = true;
		this.hasFired      = false;
		this.type          = game.data.PLATFORM_TYPE;
		this.renderable.setCurrentAnimation("active");
	}
});