game.TemporaryEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings, durationInFrames) {
        this.parent(x, y, settings);
		this.updateColRect(0, settings.spritewidth, 4, settings.spriteheight-8);
		this.collidable = true;
		this.type = me.game.ENEMY_OBJECT;
		this.durationInFrames = durationInFrames;
		this.currentDuration  = 0;
		this.gravity = 0;
    },
	
	update: function() {
        if (!game.data.isPaused){
			if (this.currentDuration < this.durationInFrames){
				this.parent();
				this.updateMovement();
				this.currentDuration = this.currentDuration + 1;
				return true;
			} else {
				me.game.remove(this);
				return false;
			}
		}
	}
});