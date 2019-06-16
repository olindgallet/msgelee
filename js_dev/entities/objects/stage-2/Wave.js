game.Wave = me.ObjectEntity.extend({

        init: function(x, y, direction, velocity) {
			if (direction === "west" || direction === "east"){
				this.renderable = new me.SpriteObject(
					0, 0,
					me.loader.getImage("wave-spritesheet-lr"),
					32,70
				);
				settings = { image: this.renderable.image,
							  spritewidth: 32,
							  spriteheight: 70
							};
				this.renderable.offset.set(0, 0);
				this.parent(x, y, settings);
				this.renderable.addAnimation("flow-right", [0, 1], 150);
				this.renderable.addAnimation("flow-left", [2, 3], 150);
			} else {
				this.renderable = new me.SpriteObject(
					0, 0,
					me.loader.getImage("wave-spritesheet-ud"),
					70, 32
				);
				settings = { image: this.renderable.image,
							  spritewidth: 70,
							  spriteheight: 32
							};
				this.renderable.offset.set(0, 0);
				this.parent(x, y, settings);
				this.renderable.addAnimation("flow-up", [0, 1], 150);
				this.renderable.addAnimation("flow-down", [2, 3], 150);
			}
			this.collidable     = true;
			this.type           = me.game.ENEMY_OBJECT;
			this.gravity        = 0;
			this.velocity       = velocity;
			this.direction      = direction;
			this.alwaysUpdate   = false;
			this.settings = settings;
			
			
			if (this.direction === "west"){
				this.renderable.setCurrentAnimation("flow-left");
			} else if (this.direction === "east"){
				this.renderable.setCurrentAnimation("flow-right");
			} else if (this.direction === "north"){
				this.renderable.setCurrentAnimation("flow-up");
			} else if (this.direction === "south"){
				this.renderable.setCurrentAnimation("flow-down");
			}
		},
		
		update: function(){
			if (!game.data.isPaused){
				if (this.direction === "west") {
					this.pos.x = this.pos.x - this.velocity;
				} else if (this.direction === "east"){
					this.pos.x = this.pos.x + this.velocity;
				} else if (this.direction === "south") {
					this.pos.y = this.pos.y + this.velocity;
				} else if (this.direction === "north"){
					this.pos.y = this.pos.y - this.velocity;
				}
				
				var move = this.updateMovement();
				if (!me.game.viewport.contains(this) || this.pos.x - this.velocity  < 0 || this.pos.x + this.velocity + this.settings.spritewidth > game.data.stageWidth || this.pos.y - this.velocity < 20 || this.pos.y  + this.settings.spriteheight > game.data.stageHeight ){
					me.game.remove(this);
				}		
				
				this.parent();
				return true;
				
			} else {
				return false;
			}
		}
});