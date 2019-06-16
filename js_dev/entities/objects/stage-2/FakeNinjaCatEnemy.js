game.FakeNinjaCatEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings, direction, type) {
	
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
		this.renderable.addAnimation("teleport", [27, 26, 25], 150);
		this.renderable.addAnimation("idle", [37]);
		this.renderable.addAnimation("teleport-left", [33, 32, 31], 150);
		this.renderable.addAnimation("idle-left", [39]);
		this.renderable.addAnimation("teleport-right", [30, 29, 28], 150);
		this.renderable.addAnimation("idle-right", [40]);
		this.renderable.addAnimation("teleport-up", [36, 35, 34], 150);
		this.renderable.addAnimation("idle-up", [38], 150);
		this.renderable.addAnimation("wave", [41, 42, 43, 44, 45], 150);
		this.renderable.addAnimation("wave-left", [46, 47, 48, 49, 50], 150);
		this.renderable.addAnimation("wave-right", [51, 52, 53, 54, 55], 150);
		this.renderable.addAnimation("wave-up", [56, 57, 57, 58, 59], 150);
		this.renderable.addAnimation("flame", [60, 61, 62, 63, 64], 150);
		this.renderable.addAnimation("flame-left", [65, 66, 67, 68, 69], 150);
		this.renderable.addAnimation("flame-right", [70, 71, 72, 73, 74], 150);
		this.renderable.addAnimation("flame-up", [75, 76, 77, 78, 79], 150);
		this.resetState(direction, type);
    },

    update: function() {
		var requiresUpdate = false;
        if (!game.data.isPaused){
			if (this.framesPassed <= 145){
				this.framesPassed = this.framesPassed + 1;
			} else if  (this.framesPassed >= 146){
				if (this.type === 0){
					if (this.renderable.isCurrentAnimation("idle")){
						this.renderable.setCurrentAnimation("wave");
						me.game.add(new game.Wave( this.pos.x, this.pos.y, "west", 3), this.z); 
						me.game.add(new game.Wave( this.pos.x, this.pos.y, "east", 3), this.z); 
					} else if (this.renderable.isCurrentAnimation("idle-up")){
						this.renderable.setCurrentAnimation("wave-up");
						me.game.add(new game.Wave( this.pos.x, this.pos.y, "west", 3), this.z); 
						me.game.add(new game.Wave( this.pos.x, this.pos.y, "east", 3), this.z); 
					} else if (this.renderable.isCurrentAnimation("idle-left")){ 
						this.renderable.setCurrentAnimation("wave-left");
						me.game.add(new game.Wave( this.pos.x, this.pos.y, "north", 3), this.z); 
						me.game.add(new game.Wave( this.pos.x, this.pos.y, "south", 3), this.z); 
					} else if (this.renderable.isCurrentAnimation("idle-right")){
						this.renderable.setCurrentAnimation("wave-right");
						me.game.add(new game.Wave( this.pos.x, this.pos.y, "north", 3), this.z); 
						me.game.add(new game.Wave( this.pos.x, this.pos.y, "south", 3), this.z); 
					}
				} else {
					if (this.renderable.isCurrentAnimation("idle")){
						this.renderable.setCurrentAnimation("flame");
						me.game.add(new game.CatFireball( this.pos.x, this.pos.y, "northeast", 1.5), this.z); 
						me.game.add(new game.CatFireball( this.pos.x, this.pos.y, "northwest", 1.5), this.z); 
					} else if (this.renderable.isCurrentAnimation("idle-up")){
						this.renderable.setCurrentAnimation("flame-up");
						me.game.add(new game.CatFireball( this.pos.x, this.pos.y, "southwest", 1.5), this.z); 
						me.game.add(new game.CatFireball( this.pos.x, this.pos.y, "southeast", 1.5), this.z); 
					} else if (this.renderable.isCurrentAnimation("idle-left")){ 
						this.renderable.setCurrentAnimation("flame-left");
						me.game.add(new game.CatFireball( this.pos.x, this.pos.y, "southeast", 1.5), this.z); 
						me.game.add(new game.CatFireball( this.pos.x, this.pos.y, "northeast", 1.5), this.z); 
					} else if (this.renderable.isCurrentAnimation("idle-right")){
						this.renderable.setCurrentAnimation("flame-right");
						me.game.add(new game.CatFireball( this.pos.x, this.pos.y, "northwest", 1.5), this.z); 
						me.game.add(new game.CatFireball( this.pos.x, this.pos.y, "southwest", 1.5), this.z); 
					}
				}
			} 
			
			if (this.renderable.getCurrentAnimationFrame() === 2){
				if (this.renderable.isCurrentAnimation("teleport")){
					this.renderable.setCurrentAnimation("idle");
				} else if (this.renderable.isCurrentAnimation("teleport-up")){
					this.renderable.setCurrentAnimation("idle-up");
				} else if (this.renderable.isCurrentAnimation("teleport-left")){ 
					this.renderable.setCurrentAnimation("idle-left");
				} else if (this.renderable.isCurrentAnimation("teleport-right")){
					this.renderable.setCurrentAnimation("idle-right");
				}
			}
			
			if (this.renderable.getCurrentAnimationFrame() === 4){
				me.game.remove(this);
			}
			
			this.parent();
			this.updateMovement();
			requiresUpdate = true;
		}
		return requiresUpdate;
	}, 
	
	resetState: function(direction, type){
		this.aliveOnScreen  = true;
		this.alwaysUpdate   = true;
		this.gravity        = 0;
		this.type           = type;
		this.framesPassed  = 0;
		if (direction === "down"){
			this.renderable.setCurrentAnimation("teleport");
		} else if (direction === "up"){
			this.renderable.setCurrentAnimation("teleport-up");
		} else if (direction === "left"){
			this.renderable.setCurrentAnimation("teleport-left");
		} else if (direction === "right"){
			this.renderable.setCurrentAnimation("teleport-right");
		}
	}
});
