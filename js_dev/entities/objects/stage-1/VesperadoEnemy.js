game.VesperadoEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("vesperado-spritesheet"),
            60, 80
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 60;
		settings.spriteheight = 80;
        this.parent(x, y, settings);
	
		this.collidable     = true;
		
		this.type = me.game.ENEMY_OBJECT;
		this.renderable.addAnimation("idle",         [ 0, 1 ], 100);
		this.renderable.addAnimation("turnshoot",    [2, 3, 4, 5], 100);
		this.renderable.addAnimation("teleport-out", [6, 7, 8, 9, 10], 100);
		this.renderable.addAnimation("teleport-in",  [10, 9, 8, 7, 6], 100);
		this.renderable.addAnimation("die", [11, 12, 13, 14], 150);
		this.renderable.addAnimation("dead", [14]);
		
		this.renderable.setCurrentAnimation("idle");
		
		this.invincibleFrames      = 0;
		this.health                = 10;
		this.isInvincible          = false;
		this.MAX_INVINCIBLE_FRAMES = 60;
		this.facingLeft            = true;
		this.delayingFrames        = 0;
		this.MAX_DELAY_FRAMES      = 40;
		this.isDelaying            = false;
    },
	
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
	    if (!game.data.isPaused){	
				var collision = this.collide();		
				
				if (collision && collision.obj.type == game.data.SUGARSHOT_TYPE &&  !this.renderable.isCurrentAnimation("die") && !this.renderable.isCurrentAnimation("dead")){
					game.data.sugarShotOnScreen = false;
					me.game.remove(collision.obj);
					if (!this.isInvincible){
						me.audio.play("boss-hurt-sfx");
						this.health = this.health - 1;
						this.isInvincible = true;
						if (this.health <= 0){
							this.renderable.setCurrentAnimation("die");
							me.audio.stopTrack("boss");
						}
					}
				}
					
				if (this.isInvincible){
					this.renderable.flicker(1);
					this.invincibleFrames = this.invincibleFrames + 1;
					if (this.invincibleFrames >= this.MAX_INVINCIBLE_FRAMES){
						this.invincibleFrames = 0;
						this.isInvincible     = false;
					}
				}
			
				if (this.renderable.isCurrentAnimation("die") && this.renderable.getCurrentAnimationFrame() === 3){
					this.renderable.setCurrentAnimation("dead");
					game.data.frameCount = 0;
				} else if (this.renderable.isCurrentAnimation("dead")){
					game.data.frameCount = game.data.frameCount + 1;
					if (game.data.frameCount === 90){
						game.data.isBossDead = true;
					}
				} else if (!this.isDelaying){
						if ((this.renderable.isCurrentAnimation("idle") && this.renderable.getCurrentAnimationFrame() === 1) ||
							(this.renderable.isCurrentAnimation("turnshoot") && this.renderable.getCurrentAnimationFrame() === 3) ||
							(this.renderable.isCurrentAnimation("teleport-in") && this.renderable.getCurrentAnimationFrame() === 4)
						){
							
							if (this.renderable.isCurrentAnimation("turnshoot")){
								me.audio.play("sniper-shot-sfx");
								if (this.facingLeft){
									me.game.add(new game.LinearShot( this.pos.x+8, this.pos.y+40, { image: "vesperado-bullet", spritewidth: 20, spriteheight:20 }, "west", 6), this.z); 
								} else {
									me.game.add(new game.LinearShot( this.pos.x+68, this.pos.y+40, { image: "vesperado-bullet", spritewidth: 20, spriteheight:20 }, "east", 6), this.z); 
								}
							}
							
							this.isDelaying     = true;
							this.renderable.setCurrentAnimation("idle");
							this.renderable.setAnimationFrame(0);
						
						} else if (this.renderable.isCurrentAnimation("teleport-out") && this.renderable.getCurrentAnimationFrame() == 4){
						seed = Math.random();
						if (seed <= .33){
							this.pos.x = 570;
						} else if (seed <= .66){
							this.pos.x = 290
						} else {
							this.pos.x = 10
						}
						this.renderable.setCurrentAnimation("teleport-in");
						this.renderable.setAnimationFrame(0);
					}
				} else if (!this.renderable.isCurrentAnimation("die") && !this.renderable.isCurrentAnimation("dead")){
					if (this.delayingFrames >= this.MAX_DELAY_FRAMES){
						this.delayingFrames = 0;
						this.isDelaying     = false;
						
						if (game.data.player.pos.x > this.pos.x && this.facingLeft){
							this.flipX(true);
							this.facingLeft = false;
						} else if (game.data.player.pos.x < this.pos.x && !this.facingLeft){
							this.flipX(false);
							this.facingLeft = true;
						}
													
						var seed = Math.random(); 
						if (seed <= .40){
							this.renderable.setCurrentAnimation("turnshoot");
							this.renderable.setAnimationFrame(0);
						} else if (.40 < seed && seed <= .80){
							this.renderable.setCurrentAnimation("teleport-out");
							this.renderable.setAnimationFrame(0);
						} else {
							this.renderable.setCurrentAnimation("idle");
							this.renderable.setAnimationFrame(0);
						}
					} else {
						this.delayingFrames = this.delayingFrames + 1;
					}						
				}
			this.parent();
			this.updateMovement();
			return true;
		}
		return false;
	}
});// TODO
