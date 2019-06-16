/**
 * Event Alert Entity
 */
 game.EventAlertEntity = me.ObjectEntity.extend({
    init: function() {
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("event-alert"),
            32, 32
        );
		this.z = 999;
        this.parent(game.data.player.pos.x, game.data.player.pos.y - 32, {image:'event-alert',spritewidth:32 , spriteheight:32});
		this.gravity = 0;
		this.alwaysUpdate = false;
		this.frameCount   = 0;
    },
	
	update: function(){
		if (this.frameCount == 0 && me.audio.isAudioEnable()){
			me.audio.play("event-sfx");
		}
		
		if (this.frameCount >= 120){
			me.game.remove(this);
		} else {
			this.pos.x = game.data.player.pos.x + 5;
			if (game.data.player.pos.y - 37 > 0){
				this.pos.y  = game.data.player.pos.y - 37;
			}
		}
		
		this.frameCount = this.frameCount + 1;
		this.parent();
		return true;
	}
 });