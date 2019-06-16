game.VesperadoShadowEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("vesperado-shadow-spritesheet"),
            45, 120
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 45;
		settings.spriteheight = 120;
        this.parent(x, y, settings);
		this.renderable.addAnimation("active", [ 0, 1], 150);
		this.renderable.addAnimation("eye", [2, 3], 200);
		this.resetState();
    },
 

    update: function() {
        if (!game.data.isPaused){
			if (game.stage1_data.snipingStarted && !this.renderable.isCurrentAnimation("eye")){
				this.renderable.setCurrentAnimation("eye");
			} else if (game.stage1_data.snipingComplete){
				this.aliveOnScreen = false;
				this.alwaysUpdate = false;
				me.game.remove(this);
			}
			
			this.parent();
			this.updateMovement();
		}			
		return true;
	}, 
	
	resetState: function(){
		this.aliveOnScreen = true;
		this.alwaysUpdate  = true;
		this.gravity              = 0;
		this.renderable.setCurrentAnimation("active");
		this.collidable         = false;
	}
});
