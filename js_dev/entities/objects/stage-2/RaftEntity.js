game.RaftEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("raft"),
            200, 50
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 200;
		settings.spriteheight = 50;
        this.parent(x, y, settings);
	
        this.aliveOnScreen  = this.inViewPort;
		this.alwaysUpdate   = true;
		this.resetState();
    },
 

    update: function() {
        if (!game.data.isPaused){
			var collision = this.collide();
			if (collision && collision.obj.type === game.data.PLAYER_TYPE){
				this.isMoving = true;
			}
			
			if (this.isMoving){
				this.pos.x = this.pos.x + this.rate;
				if (game.data.player.vel.x === 0 && game.data.player.vel.y === 0 &&
					game.data.player.pos.x + 40 > this.pos.x && game.data.player.pos.x < this.pos.x +  200 &&
					this.pos.y - game.data.player.pos.y <= 40){
					game.data.player.pos.x = game.data.player.pos.x + this.rate;
				}
			}
		}
		return true;
	}, 
	
	resetState: function(){
		this.activeFrames  = 0;
		this.rate                   = 2;
		this.isMoving           = false;
        this.collidable          = true;
		this.aliveOnScreen = true;
		this.gravity               = 0;
		this.type                  = game.data.SOLID_TYPE;
	}
});