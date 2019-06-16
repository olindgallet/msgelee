game.RotaryCannonEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("rotary-cannon-spritesheet"),
            32, 32
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 32;
		settings.spriteheight = 32;
        this.parent(x, y, settings);
	
        this.renderable.addAnimation("active", [0, 1, 2], 375);
		this.renderable.setCurrentAnimation("active");	
		this.alwaysUpdate   = false;
		this.resetState();
    },
 

    update: function() {
        if (!game.data.isPaused){
			if (!this.inViewport){
				this.resetState();
			} else {
			    if (this.renderable.getCurrentAnimationFrame() == 1 && !this.hasFired){
					if (this.toggle){
						me.game.add(new game.LinearShot( this.pos.x+8, this.pos.y-16, { image: "rotary-cannon-bullet", spritewidth: 18, spriteheight:18 }, "north", 5), this.z); 
						me.game.add(new game.LinearShot( this.pos.x+8, this.pos.y+16, { image: "rotary-cannon-bullet", spritewidth: 18, spriteheight:18 }, "south", 5), this.z); 
					} else {
						me.game.add(new game.LinearShot( this.pos.x+32, this.pos.y+8, { image: "rotary-cannon-bullet", spritewidth: 18, spriteheight:18 }, "east", 5), this.z); 
						me.game.add(new game.LinearShot( this.pos.x, this.pos.y+8, { image: "rotary-cannon-bullet", spritewidth: 18, spriteheight:18 }, "west", 5), this.z);
					}
					this.toggle = !this.toggle;
					this.hasFired = true;
				} else if (this.renderable.getCurrentAnimationFrame() != 1){
					this.hasFired = false;
				}
				this.parent();
				this.updateMovement();
				return true;
			}
		}
		return false;
	}, 
	
	resetState: function(){
        this.collidable    = true;
		this.aliveOnScreen = true;
		this.hasFired      = false;
		this.gravity       = 0;
		this.type          = me.game.ENEMY_OBJECT;
		this.toggle        = false;
	}
});