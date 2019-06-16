game.WaterfallBaseEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("waterfall-base-spritesheet"),
            32, 32
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 32;
		settings.spriteheight = 32;
        this.parent(x, y, settings);
		this.renderable.addAnimation("active", [0, 1], 150);
		this.resetState();
    },
 

    update: function() {
		var requiresUpdate = false;
        if (!game.data.isPaused){
			this.parent();
			this.updateMovement();
		}			
		return requiresUpdate;
	}, 
	
	resetState: function(){
		this.aliveOnScreen = true;
		this.alwaysUpdate = true;
		this.gravity              = 0;
		this.renderable.setCurrentAnimation("active");
		this.collidable = false;
	}
});
