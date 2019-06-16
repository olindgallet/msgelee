game.PeaShot = me.ObjectEntity.extend({

        init: function(x, y, settings, direction, velocity) {
			this.parent(x, y, settings);
			this.collidable     = true;
			this.type           = me.game.ENEMY_OBJECT;
			this.gravity        = 0;
			this.velocity       = velocity;
			this.direction      = direction;
			this.alwaysUpdate   = false;
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
				if (!me.game.viewport.contains(this)){
					me.game.remove(this);
				}		
				
				this.parent();
				return true;
				
			} else {
				return false;
			}
		}
});