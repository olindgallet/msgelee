game.CatFireball = me.ObjectEntity.extend({

        init: function(x, y, direction, velocity) {
			this.renderable = new me.SpriteObject(
				0, 0,
				me.loader.getImage("cat-fireball-spritesheet"),
				70, 32
			);
			settings = { image: this.renderable.image,
						  spritewidth: 32,
						  spriteheight: 32
						};
			this.renderable.offset.set(0, 0);
			this.parent(x, y, settings);
			this.renderable.addAnimation("move", [0, 1], 150);
			
			this.collidable     = true;
			this.type           = me.game.ENEMY_OBJECT;
			this.gravity        = 0;
			this.velocity       = velocity;
			this.direction      = direction;
			this.alwaysUpdate   = false;
			this.settings = settings;
			this.renderable.setCurrentAnimation("move");
		},
		
		update: function(){
			if (!game.data.isPaused){
				if (this.direction === "northwest") {
					this.pos.x = this.pos.x - this.velocity;
					this.pos.y = this.pos.y - this.velocity;
				} else if (this.direction === "northeast"){
					this.pos.x = this.pos.x + this.velocity;
					this.pos.y = this.pos.y - this.velocity;
				} else if (this.direction === "southwest") {
					this.pos.x = this.pos.x - this.velocity;
					this.pos.y = this.pos.y + this.velocity;
				} else if (this.direction === "southeast"){
					this.pos.x = this.pos.x + this.velocity;
					this.pos.y = this.pos.y + this.velocity;
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