game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("player-spritesheet"),
            40, 40
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 40;
		settings.spriteheight = 40;
        this.parent(x, y, settings);
	
		this.setVelocity(3, 15);
		this.isFacingRight  = true;
		this.collidable     = true;
		this.flipX(false);
		
		this.type = game.data.PLAYER_TYPE;
		this.renderable.addAnimation("walk-r", [ 0, 1 ]);
		this.renderable.addAnimation("walk-l", [ 2, 3 ]);
		this.renderable.addAnimation("spit-r", [ 4, 5 ]);
		this.renderable.addAnimation("spit-l", [ 6, 7 ]);
		this.renderable.addAnimation("jump-r", [ 8, 9 ]);
		this.renderable.addAnimation("jump-l", [ 10, 11 ]);
		this.renderable.addAnimation("die", [ 12, 13, 14, 15, 16 ]);
		this.renderable.setCurrentAnimation("walk-r");
  
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		this.invincibleFrames = 0;
		this.isInvincible     = false;
		this.alwaysUpdate = true;
    },
	
	hit: function(){
		if (!this.isInvincible){
			game.data.playerHealth = game.data.playerHealth - 1;
			if (game.data.playerHealth <= 0){
				this.die();
			} else {
				if (this.isFacingRight){
					this.pos.x = this.pos.x - 20;
				} else {
					this.pos.x = this.pos.x + 20;
				}
				this.isInvincible = true;
				me.audio.play("hit-sfx");
			}
		}
	},
		
	die: function(){
		if (!game.data.isPlayerDead){
			game.data.isPlayerDead = true;
			this.vel.x             = 0;
			game.data.playerLives  = game.data.playerLives - 1;
			game.data.playerHealth = 4;
			game.data.sugarShotOnScreen = false;
			me.audio.play("death-sfx");
			me.audio.stopTrack();
			if (!this.isFacingRight){
				this.flipX(true);
			}
			this.renderable.setCurrentAnimation("die");
		}
	},
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
	    if (!game.data.isPaused){	
			if (!game.data.isPlayerDead){
				if (this.isInvincible){
					if (this.invincibleFrames <= game.data.PLAYER_INVINCIBLE_FRAMES - 3){
						this.renderable.flicker(1);
					}
					this.invincibleFrames = this.invincibleFrames + 1;
					if (this.invincibleFrames >= game.data.PLAYER_INVINCIBLE_FRAMES){
						this.invincibleFrames = 0;
						this.isInvincible = false;
					}
				}
				
				var collision = this.collide();		
				if (collision){
					if (collision.obj.type === me.game.ENEMY_OBJECT){		
						this.hit();
					}
					
					if (collision.obj.type === game.data.PLATFORM_TYPE){
						if (this.pos.y <= collision.obj.pos.y && collision.y > 0){
							this.pos.y = collision.obj.pos.y - 40;
						} else if (this.pos.y < collision.obj.pos.y + collision.obj.height && this.vel.y === 0){
							if (this.pos.x <= collision.obj.pos.x){
								this.pos.x = collision.obj.pos.x - 44;
								if (game.data.inputObserver.isRightPressed() 
									&& me.game.currentLevel.getLayerByName('Collision').getTile(collision.obj.pos.x + collision.obj.width + 3, collision.obj.pos.y + collision.obj.height - 1) === null
									&& collision.obj.pos.x + collision.obj.width + 10 < game.data.stageWidth){ 
								    collision.obj.pos.x = collision.obj.pos.x + 3;
								}
							} else {
								this.pos.x = collision.obj.pos.x + collision.obj.width + 1;
								if (game.data.inputObserver.isLeftPressed()
									&& me.game.currentLevel.getLayerByName('Collision').getTile(collision.obj.pos.x - 3, collision.obj.pos.y + collision.obj.height - 1) === null
									&& collision.obj.pos.x - 10 > 0){
									collision.obj.pos.x = collision.obj.pos.x - 3;
								}
							}
						} 
						if (collision.x){
							this.vel.x = 0;
							if (this.vel.y != 0){
								if (collision.x > 0){
									this.pos.x = this.pos.x - 5;
								}
								else{ 
									this.pos.x = this.pos.x + 5;
								}	
							}
						}
						if (collision.y && this.pos.y <= collision.obj.pos.y){
							this.vel.y = 0;
							this.falling = false;
						} else {
							this.vel.y = this.vel.y * -1;
							this.falling = true;
						}
					}
					
					if (collision.obj.type === game.data.SOLID_TYPE){
						if (this.pos.y <= collision.obj.pos.y){
							this.pos.y = collision.obj.pos.y - 40;
						} else if (this.pos.y < collision.obj.pos.y + collision.obj.height && this.vel.y === 0){
							if (this.pos.x <= collision.obj.pos.x){
								this.pos.x = collision.obj.pos.x - 44;
							} else {
								this.pos.x = collision.obj.pos.x + collision.obj.width + 1;
							}
						}
						
						if (collision.x){
							this.vel.x = 0;
							if (this.vel.y != 0){
								if (collision.x > 0){
									this.pos.x = this.pos.x - 5;
								}
								else{ 
									this.pos.x = this.pos.x + 5;
								}	
							}
						}
						if (collision.y && this.pos.y <= collision.obj.pos.y){
							this.vel.y = 0;
							this.falling = false;
						} else {
							this.vel.y = this.vel.y * -1;
							this.falling = true;
						}
					}
					
					if (collision.obj.type === game.data.DEATH_TYPE || collision.obj.type === game.data.WATER_TYPE){
						this.die();
					}
					
				}
			
				if (!game.data.isPlayerDead){
					if (game.data.inputObserver.isLeftPressed()) { 
						this.isFacingRight = false;
						this.vel.x -= this.accel.x * me.timer.tick;
						if (!this.renderable.isCurrentAnimation('walk-l') && this.vel.y == 0){
							this.renderable.setCurrentAnimation('walk-l');
						}
					} else if (game.data.inputObserver.isRightPressed()) {
						this.isFacingRight = true;
						this.vel.x += this.accel.x * me.timer.tick;
						if (!this.renderable.isCurrentAnimation('walk-r') && this.vel.y == 0){
							this.renderable.setCurrentAnimation('walk-r');
						}
					} else {
						this.vel.x = 0;
					}
					
					if (game.data.inputObserver.isShootPressed() && !game.data.sugarShotOnScreen && this.pos.y > 0){
						if(this.isFacingRight){
							this.renderable.setCurrentAnimation('spit-r', 'walk-r');
						} else{
							this.renderable.setCurrentAnimation('spit-l', 'walk-l');
						}
						
						if (me.audio.isAudioEnable()){
							me.audio.play("sugar-shot-sfx");
						}
						
						game.data.sugarShotOnScreen = true;
						
						if (this.vel.y != 0){
							var shot = new game.FallingSugarShotEntity( this.pos.x, this.pos.y, { image: "sugar-shot", spritewidth: 20, spriteheight:20 }, this.isFacingRight); 
							me.game.add(shot, this.z); 
						} else {
							var shot = new game.StraightSugarShotEntity( this.pos.x, this.pos.y, { image: "sugar-shot", spritewidth: 20, spriteheight:20 }, this.isFacingRight);
							me.game.add(shot, this.z);
						}
					}
					
					if (game.data.inputObserver.isJumpPressed()) {
						if (!this.jumping && !this.falling) {
							if (this.isFacingRight){
								this.renderable.setCurrentAnimation('jump-r', 'walk-r');
							} else {
								this.renderable.setCurrentAnimation('jump-l', 'walk-l');
							}
							
							if (me.audio.isAudioEnable()){
								me.audio.play("jump-sfx");
							}
							
							this.vel.y = -this.maxVel.y * me.timer.tick;
							this.jumping = true;
						}
			 
					}
				}
			} else {
				if (this.renderable.getCurrentAnimationFrame() === 4){
					me.state.change(game.data.checkpoint);
				}
			}
			if (this.vel.x != 0 || this.vel.y!=0 || this.renderable.isCurrentAnimation("die") || this.isInvincible) {
				this.parent();
				this.updateMovement();	
				return true;
			} else {
				return false;
			}
		}
    }
 
});// TODO
