game.NinjaCatEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("ninja-cat-spritesheet"),
            64,64
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 64;
		settings.spriteheight = 64;
        this.parent(x, y, settings);
		this.renderable.addAnimation("idle", [0, 1], 150);
		this.renderable.addAnimation("teleport", [2, 3, 4], 150);
		this.renderable.addAnimation("teleport-in", [4, 3, 2], 150);
		this.renderable.addAnimation("idle-left", [5, 6], 150);
		this.renderable.addAnimation("teleport-left", [7,8,9], 150);
		this.renderable.addAnimation("teleport-in-left", [9, 8, 7], 150);
		this.renderable.addAnimation("idle-right", [10, 11], 150);
		this.renderable.addAnimation("teleport-right", [12,13,14], 150);
		this.renderable.addAnimation("teleport-in-right", [14, 13, 12], 150);
		this.renderable.addAnimation("idle-up", [15, 16], 150);
		this.renderable.addAnimation("teleport-up", [17,18,19], 150);
		this.renderable.addAnimation("teleport-in-up", [19, 18, 17], 150);
		this.renderable.addAnimation("dying", [20, 21, 22, 23, 24], 150);
		this.renderable.addAnimation("dead", [24], 150);
		this.resetState();
    },
	
	playAttackSFX: function(){
		if (this.typeSeed === 0){
			me.audio.play("cat-wave-sfx");
		} else {
			me.audio.play("cat-flame-sfx");
		}
	},
 

    update: function() {
		var requiresUpdate = false;
        if (!game.data.isPaused){
			var collision = this.collide();
				
			if (collision && collision.obj.type === game.data.PLAYER_TYPE &&  !this.renderable.isCurrentAnimation("dying") && !this.renderable.isCurrentAnimation("dead")){
				game.data.player.hit();
			} else if (collision && collision.obj.type == game.data.SUGARSHOT_TYPE && 
							!(this.renderable.isCurrentAnimation("teleport") || this.renderable.isCurrentAnimation("teleport-left") ||
							  this.renderable.isCurrentAnimation("teleport-up") || this.renderable.isCurrentAnimation("teleport-right"))){
					game.data.sugarShotOnScreen = false;
					me.game.remove(collision.obj);
					if (!this.isInvincible){
						me.audio.play("boss-hurt-sfx");
						this.health = this.health - 1;
						this.isInvincible = true;
						if (this.health <= 0){
							this.pos.x = 288;
							this.pos.y = 288;
							this.renderable.setCurrentAnimation("dying");
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
			
			if (this.renderable.isCurrentAnimation("teleport-in") && this.renderable.getCurrentAnimationFrame() === 2){
				this.renderable.setCurrentAnimation("idle");
			} else if (this.renderable.isCurrentAnimation("teleport-in-left") && this.renderable.getCurrentAnimationFrame() === 2){
				this.renderable.setCurrentAnimation("idle-left");
			} else if (this.renderable.isCurrentAnimation("teleport-in-right") && this.renderable.getCurrentAnimationFrame() === 2){
				this.renderable.setCurrentAnimation("idle-right");
			} else if (this.renderable.isCurrentAnimation("teleport-in-up") && this.renderable.getCurrentAnimationFrame() === 2){
				this.renderable.setCurrentAnimation("idle-up");
			}
			
			if (this.framesPassed <= 150 && !this.renderable.isCurrentAnimation("dead")){
				this.framesPassed = this.framesPassed + 1;
			} else {
				if (this.renderable.isCurrentAnimation("idle")){
					if (!this.initialView){
						this.playAttackSFX();
					}
					this.renderable.setCurrentAnimation("teleport");
					this.renderable.setAnimationFrame(0);
					this.initialView = false;
				} else if (this.renderable.isCurrentAnimation("idle-left")){
					if (!this.initialView){
						this.playAttackSFX();
					}
					this.renderable.setCurrentAnimation("teleport-left");
					this.renderable.setAnimationFrame(0);
					this.initialView = false;
				} else if (this.renderable.isCurrentAnimation("idle-right")){
					this.renderable.setCurrentAnimation("teleport-right");
					this.renderable.setAnimationFrame(0);
					if (!this.initialView){
						this.playAttackSFX();
					}
					this.initialView = false;
				} else if (this.renderable.isCurrentAnimation("idle-up")){
					this.renderable.setCurrentAnimation("teleport-up");
					this.renderable.setAnimationFrame(0);
					if (!this.initialView){
						this.playAttackSFX();
					}
					this.initialView = false;
				} else if ((this.renderable.isCurrentAnimation("teleport") && this.renderable.getCurrentAnimationFrame() === 2) ||
								(this.renderable.isCurrentAnimation("teleport-left") && this.renderable.getCurrentAnimationFrame() === 2) ||
								(this.renderable.isCurrentAnimation("teleport-right") && this.renderable.getCurrentAnimationFrame() === 2) ||
								(this.renderable.isCurrentAnimation("teleport-up") && this.renderable.getCurrentAnimationFrame() === 2)){
					var locSeed = Math.floor(Math.random() * 4);
					this.typeSeed = Math.floor(Math.random() * 2);
					if (locSeed === 0){
						this.renderable.setCurrentAnimation("teleport-in");
						this.pos.x = 288;
						this.pos.y = 288;
						me.game.add(new game.FakeNinjaCatEnemy( 288, 32, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "up", this.typeSeed), this.z); 
						me.game.add(new game.FakeNinjaCatEnemy( 32, 160, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "left", this.typeSeed), this.z); 
						me.game.add(new game.FakeNinjaCatEnemy( 544, 160, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "right", this.typeSeed), this.z); 
					} else if (locSeed === 1){
						this.renderable.setCurrentAnimation("teleport-in-up");
						this.pos.x = 288;
						this.pos.y = 32;
						var typeSeed = Math.floor(Math.random() * 2);
						me.game.add(new game.FakeNinjaCatEnemy( 288, 288, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "down", this.typeSeed), this.z); 
						me.game.add(new game.FakeNinjaCatEnemy( 32, 160, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "left", this.typeSeed), this.z); 
						me.game.add(new game.FakeNinjaCatEnemy( 544, 160, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "right", this.typeSeed), this.z); 
					} else if (locSeed === 2){
						this.renderable.setCurrentAnimation("teleport-in-left");
						this.pos.x = 32;
						this.pos.y = 160;
						var typeSeed = Math.floor(Math.random() * 2);
						me.game.add(new game.FakeNinjaCatEnemy( 288, 32, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "up", this.typeSeed), this.z); 
						me.game.add(new game.FakeNinjaCatEnemy( 288, 288, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "down", this.typeSeed), this.z); 
						me.game.add(new game.FakeNinjaCatEnemy( 544, 160, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight: 64 }, "right", this.typeSeed), this.z); 
					} else if (locSeed === 3){
						this.renderable.setCurrentAnimation("teleport-in-right");
						this.pos.x = 544;
						this.pos.y = 160;
						var typeSeed = Math.floor(Math.random() * 2);
						me.game.add(new game.FakeNinjaCatEnemy( 288, 32, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "up", this.typeSeed), this.z); 
						me.game.add(new game.FakeNinjaCatEnemy( 288, 288, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "down", this.typeSeed), this.z); 
						me.game.add(new game.FakeNinjaCatEnemy( 32, 160, { image: "ninja-cat-spritesheet", spritewidth: 64, spriteheight:64 }, "left", this.typeSeed), this.z); 
					}
					this.renderable.setAnimationFrame(0);
					this.framesPassed = 0;
				}
			}
			
			if (this.renderable.isCurrentAnimation("dying") && this.renderable.getCurrentAnimationFrame() === 4){
				this.renderable.setCurrentAnimation("dead");
				this.framesPassed = 0;
			} else if (this.renderable.isCurrentAnimation("dead")){
				this.framesPassed = this.framesPassed + 1;
				if (this.framesPassed === 90){
					game.data.isBossDead = true;
				}
			}
			
			 this.parent();
			this.updateMovement();
			requiresUpdate = true;
		}
		return requiresUpdate;
	}, 
	
	resetState: function(){
		this.MAX_INVINCIBLE_FRAMES = 60;
		this.aliveOnScreen = true;
		this.alwaysUpdate = true;
		this.framesPassed = 0;
		this.gravity              = 0;
		this.invincibleFrames = 0;
		this.renderable.setCurrentAnimation("idle");
		this.collidable = true;
		this.health = 7;
		this.initialView = true;
		this.typeSeed = 0;
	}
});
