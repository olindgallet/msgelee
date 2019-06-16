game.PopoutFishEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("popout-fish-spritesheet"),
            32, 32
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 32;
		settings.spriteheight = 32;
        this.parent(x, y, settings);
		this.renderable.addAnimation("idle", [0, 1], 150);
		this.renderable.addAnimation("watching", [2, 3, 4, 5], 150);
		this.renderable.addAnimation("waiting", [4, 5], 150);
		this.renderable.addAnimation("eating", [6, 7, 8], 100);
		this.renderable.addAnimation("hiding", [6, 5, 4, 3, 2], 100);
		this.updateColRect(6, 20, 6, 20);
		this.resetState();
    },
 

    update: function() {
		var requiresUpdate = false;
        if (!game.data.isPaused){
			 if (this.aliveOnScreen){
				if (game.data.player.distanceTo(this) <= this._watchingTriggerRadius && this.renderable.isCurrentAnimation("idle")){
					me.audio.play("popout-fish-splash-sfx");
					this.renderable.setCurrentAnimation("watching", "waiting");
				} else if (game.data.player.distanceTo(this) <= this._eatingTriggerRadius && this.renderable.isCurrentAnimation("waiting")){
					this.renderable.setCurrentAnimation("eating");
					me.audio.play("popout-fish-eat-sfx");
				} else if (!this.renderable.isCurrentAnimation("idle") && !this.renderable.isCurrentAnimation('hiding') && game.data.player.distanceTo(this) > this._watchingTriggerRadius){
					this.renderable.setCurrentAnimation("hiding", "idle");
				}
				
				var collision = this.collide();
				
				if (collision && collision.obj.type === game.data.PLAYER_TYPE && this.renderable.isCurrentAnimation("eating")){
					game.data.player.hit();
				}
			} 
			
			this.parent();
			this.updateMovement();
			requiresUpdate = true;
		}
		return requiresUpdate;
	}, 
	
	resetState: function(){
		this.aliveOnScreen = true;
		this.alwaysUpdate = true;
		this.gravity              = 0;
		this.renderable.setCurrentAnimation("idle");
		this.collidable = false;
		
		this._watchingTriggerRadius = 250;
		this._eatingTriggerRadius      = 125;
	}
});
