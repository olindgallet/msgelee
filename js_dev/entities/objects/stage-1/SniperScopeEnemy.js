
game.SniperScopeEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.startingPos = {x: x, y: y};
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("sniper-scope-spritesheet"),
            64, 64
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 64;
		settings.spriteheight = 64;
        this.parent(x, y, settings);
	
        this.renderable.addAnimation("hunt", [ 0, 1 ], 250);
		this.renderable.addAnimation("aim", [2,3,4], 250);
		this.renderable.addAnimation("fire", [5,6,7], 250);
		this.renderable.setCurrentAnimation("hunt");	
		this.resetState();
    },
 

    update: function() {
		var requiresUpdate = false;
        if (!game.data.isPaused){
			if (this.visible && !game.stage1_data.snipingComplete){
				player_x = game.data.player.pos.x;	
				player_y = game.data.player.pos.y;
				
				if (this.renderable.isCurrentAnimation("hunt")){	
					if (player_x < this.pos.x){
						this.pos.x = this.pos.x - 3; 
					} else if (player_x > this.pos.x){
						this.pos.x = this.pos.x + 3;
					}
					
					if (player_y < this.pos.y){
						this.pos.y = this.pos.y - 3;
					} else if (player_y > this.pos.y){
						this.pos.y = player_y + 3;
					}
				}
				
				if (this.renderable.isCurrentAnimation("fire")){
					if (!this.soundPlayed && me.audio.isAudioEnable()){
						me.audio.play("sniper-shot-sfx");
						this.soundPlayed = true;
						this.renderable.setAnimationFrame(0);
						
						var collision = this.collide();
						if (collision && collision.obj.type == game.data.PLAYER_TYPE){
							game.data.player.hit();
						}
					}
					if (this.renderable.getCurrentAnimationFrame() == 2){
						this.pos.x = game.data.player.pos.x;	
						this.pos.y = game.data.player.pos.y;
						this.activeFrames = 0;
						this.soundPlayed = false;
						this.renderable.setCurrentAnimation("hunt");
					}
				}
					
				if (this.activeFrames == 240){
					this.renderable.setCurrentAnimation("aim", "fire");
				}
				
				this.activeFrames = this.activeFrames + 1;
			}
			this.parent();
			this.updateMovement();		
		}
			
		return requiresUpdate;
	}, 
	
	resetState: function(){
		this.alive = true;
		this.setVelocity(0, 15);
		this.gravity      = 0;
		this.visible      = false;
		this.alwaysUpdate = false;
		this.soundPlayed  = false;
		this.collidable   = true;
		this.activeFrames = 0;
	}
});
