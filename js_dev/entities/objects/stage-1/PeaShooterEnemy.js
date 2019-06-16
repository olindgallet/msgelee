game.PeaShooterEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("peashooter-spritesheet"),
            65, 64
        );
		this.renderable.offset.set(0, 0);
		
		
		settings.image = this.renderable.image;
		settings.spritewidth  = 65;
		settings.spriteheight = 64;
        this.parent(x, y, settings);
	
		this.updateColRect(4, 40, 0, 54);
        this.renderable.addAnimation("float", [ 0, 1 ]);
		this.renderable.addAnimation("cockback", [2, 3]);
		this.renderable.addAnimation("freeze", [4, 5, 6, 7], 50);
		this.renderable.addAnimation("frozen", [7]);
		
        this.movementLength = 20;
		this.initialX       = x;
		this.initialY       = y;
		this.aliveOnScreen  = this.inViewPort;
		
		this.resetState();
		this.alwaysUpdate   = false;
    },
	
    update: function() {
        if (!game.data.isPaused){
			this.activeFrames = this.activeFrames + 1;
			
			var collision = this.collide();
			
			if (collision && collision.obj.type == game.data.SUGARSHOT_TYPE){
				game.data.sugarShotOnScreen = false;
				me.game.remove(collision.obj);	
				if (this.aliveOnScreen){
					me.audio.play("freeze-sfx");
					game.data.playerScore = game.data.playerScore + 100;
					this.gravity = 1;
					this.aliveOnScreen = false;
					this.type = game.data.PLATFORM_TYPE;
					this.renderable.setCurrentAnimation("freeze", "frozen");
					this.updateColRect(0, 65, 0, 64);
				}
			}
			
			if (this.inViewport && this.activeFrames % 5 == 0 && this.aliveOnScreen){
				if (this.isDescending){
					this.yDelta = this.yDelta + 2;
					this.pos.y  = this.pos.y + this.yDelta;
				} else {
					this.yDelta = this.yDelta - 2;
					this.pos.y  = this.pos.y + this.yDelta;
				}
			
				if (Math.abs(this.yDelta) >= this.movementLength){
					this.isDescending = !this.isDescending;
				}
			
			}
			
			if (this.inViewport && this.aliveOnScreen && this.activeFrames % 120 == 0){
				me.audio.play("pea-shot-sfx");
				if (this.isFacingRight === false){
					me.game.add(new game.PeaShot( this.pos.x, this.pos.y, { image: "pea-shot", spritewidth: 20, spriteheight:20 }, "west", 6), this.z); 
				} else {
					me.game.add(new game.PeaShot( this.pos.x, this.pos.y, { image: "pea-shot", spritewidth: 20, spriteheight:20 }, "east", 6), this.z); 
				}
				this.renderable.setCurrentAnimation("cockback", "float");
			}
			
			this.parent();
			this.updateMovement();
			return true;
		}
	
		return false;
	}, 
	
	resetState: function(){
		this.gravity       = 0;
        this.collidable    = true;
        this.isDescending  = false;
		this.yDelta        = 0;
		this.activeFrames  = 0;
		this.pos.x         = this.initialX;
		this.pos.y         = this.initialY;
		this.aliveOnScreen = true;
		this.type          = me.game.ENEMY_OBJECT;
		this.isFacingRight = false;
		this.renderable.setCurrentAnimation("float");	
	}
});
