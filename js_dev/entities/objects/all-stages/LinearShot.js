game.LinearShot = me.ObjectEntity.extend({

        init: function(x, y, settings, direction, velocity) {
			this.parent(x, y, settings);
			this.collidable     = true;
			this.type           = me.game.ENEMY_OBJECT;
			this.gravity        = 0;
			this.velocity       = velocity;
			this.direction      = direction;
			this.width          = settings.spritewidth;
			this.height         = settings.spriteheight;
			this.alwaysUpdate   = false;
		},
		
		update: function(){
			if (!game.data.isPaused){
				if (this.direction === "west" && this.pos.x - this.velocity > 0) {
					this.pos.x = this.pos.x - this.velocity;
					this.flipX(true);
				} else if (this.direction === "east" && this.pos.x + this.velocity + this.width + 1 < game.data.stageWidth){
					this.pos.x = this.pos.x + this.velocity;
				} else if (this.direction === "south" && this.pos.y +  this.velocity + this.height + 1 < game.data.stageHeight) {
					this.pos.y = this.pos.y + this.velocity;
				} else if (this.direction === "north" && this.pos.y - this.velocity > 0){
					this.pos.y = this.pos.y - this.velocity;
				} else {
					me.game.remove(this);
				}
				
				if (!this.inViewport){
					me.game.remove(this);
				} 
				
				return true;
			} else {
				return false;
			}
		}
});