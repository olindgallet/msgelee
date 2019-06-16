game.MoreEnergyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("more-energy-spritesheet"),
            32, 32
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 32;
		settings.spriteheight = 32;
        this.parent(x, y, settings);
	
        this.renderable.addAnimation("active", [0, 1], 250);
		this.renderable.setCurrentAnimation("active");	
		this.resetState();
    },
 

    update: function() {
		var requiresUpdate = false;
		if (this.inViewport){
			requiresUpdate = true;	
			var collision  = this.collide();
			if (collision && collision.obj.type == game.data.PLAYER_TYPE){
				game.data.playerHealth = game.data.playerHealth + 1;
				if (game.data.playerHealth > 4){
					game.data.playerHealth = 4;
				}
				me.audio.play("more-health-sfx");
				me.game.remove(this);
			}
		} 
		this.parent();
		return requiresUpdate;
	}, 
	
	resetState: function(){
        this.collidable    = true;
		this.gravity       = 0;
		this.type          = game.data.MORE_ENERGY_TYPE;
		this.alwaysUpdate  = false;
		this.renderable.setCurrentAnimation("active");
	}
});