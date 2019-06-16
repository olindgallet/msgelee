game.Elevator = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("elevator"),
            96, 64
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 96;
		settings.spriteheight = 64;
        this.parent(x, y, settings);
	
        this.aliveOnScreen  = this.inViewPort;
		this.alwaysUpdate   = true;
		this.resetState();
    },
 

    update: function() {
        if (!game.data.isPaused){
			var collision = this.collide();
			if (this.activeFrames == this.max){
				this.isGoingUp = !this.isGoingUp;
				this.activeFrames = 0;
			} else if (this.isGoingUp){
				if (collision && collision.obj.type == game.data.PLAYER_TYPE && game.data.player.vel.y == 0){
					game.data.player.pos.y   = game.data.player.pos.y - this.rate;
				}
				this.pos.y        = this.pos.y - this.rate;
				this.activeFrames = this.activeFrames + 1;
			} else {
				if (game.data.PLAYER_TYPE && !game.data.player.jumping && game.data.player.pos.x >= this.pos.x - 40 && game.data.player.pos.x <= this.pos.x + 96 && game.data.player.pos.y <= this.pos.y &&
				    this.pos.y - 40 - 5 <= game.data.player.pos.y){
					game.data.player.pos.y   = game.data.player.pos.y + this.rate;
				}
				this.pos.y        = this.pos.y + this.rate;
				this.activeFrames = this.activeFrames + 1;
			}
		}
		return true;
	}, 
	
	resetState: function(){
		this.activeFrames  = 0;
		this.max           = 100;
		this.rate          = 2;
		this.isGoingUp     = true;
        this.collidable    = true;
		this.aliveOnScreen = true;
		this.type          = game.data.SOLID_TYPE;
	}
});