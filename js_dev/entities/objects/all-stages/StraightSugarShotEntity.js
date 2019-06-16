game.StraightSugarShotEntity = me.ObjectEntity.extend({
        init: function(x, y, settings, isFacingRight) {
			// call the constructor
			this.parent(x, y, settings);
			this.setVelocity(8, 2);
			this.collidable     = true;
			this.isFacingRight  = isFacingRight;
			this.gravity        = 0;
			this.type           = game.data.SUGARSHOT_TYPE;
		},
		
		update: function(){
			if (!game.data.isPaused){
				if (!this.isFacingRight) {
					this.flipX(true);
					this.vel.x -= this.accel.x * me.timer.tick;
				} else {
					this.flipX(false);
					this.vel.x += this.accel.x * me.timer.tick;
				}
				
				this.updateMovement();
				if (!me.game.viewport.contains(this) || this.vel.x == 0 ){
					game.data.sugarShotOnScreen = false;
					me.game.remove(this);
				}		
				
				this.parent();
				return true;
				
			} else {
				return false;
			}
		}
});