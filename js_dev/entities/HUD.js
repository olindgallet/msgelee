

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";
		
		this.addChild(new game.HUD.EnergyBar1(400, 435));
		this.addChild(new game.HUD.EnergyBar2(440, 435));
		this.addChild(new game.HUD.EnergyBar3(480, 435));
		this.addChild(new game.HUD.EnergyBar4(520, 435));
		this.addChild(new game.HUD.HUDLabels(100, 410));
		this.addChild(new game.HUD.Background(0, 400));
	}
});

game.HUD.Background = me.Renderable.extend({
	init: function(x, y){
		this.parent(new me.Vector2d(x, y), 10, 10);
		this.floating = true;
		this.image = me.loader.getImage("hud");
	},
	
	draw: function(context){
		context.drawImage(this.image,this.pos.x, this.pos.y);
	}
});

game.HUD.HUDLabels = me.Renderable.extend({
	init: function(x, y){
		this.parent(new me.Vector2d(x, y), 10, 10);
		this.floating = true;
		this.font  = new me.Font("Varela Round", "20px", "#ffffff");
		this.playerlives = 0;
		this.playerScore = -1;
	},
	
	/**
     * update function
     */
    update : function () {
        // we don't draw anything fancy here, so just
        // return true if the score has been updated
		var needsUpdate = false;
        if (this.playerLives !== game.data.playerLives) {
            this.playerLives = game.data.playerLives;
            needsUpdate = true;
        }
		
		if (this.score !== game.data.playerScore) {
            this.score = game.data.playerScore;
            needsUpdate = true;
        }
		
        return needsUpdate;
    },
	
    draw : function (context) {
		this.font.draw(context, "LIVES:", this.pos.x, this.pos.y);
		this.font.draw(context, "x" + game.data.playerLives, this.pos.x , this.pos.y + 20);
		
		this.font.draw (context, "SCORE:", this.pos.x + 150, this.pos.y);
		this.font.draw (context, game.data.playerScore, this.pos.x + 150, this.pos.y + 20);
		
		this.font.draw (context, "ENERGY:", this.pos.x + 300, this.pos.y);
	}
});

game.HUD.EnergyBar1 = me.Renderable.extend({
	init: function(x, y){
		this.parent(new me.Vector2d(x, y), 10, 10);
		this.floating = true;
		this.image = me.loader.getImage("health-meter-1");
	},
	
	draw: function(context){
		if (game.data.playerHealth >= 1){
			context.drawImage(this.image, this.pos.x, this.pos.y);
		}
	}
});

game.HUD.EnergyBar2 = me.Renderable.extend({
	init: function(x, y){
		this.parent(new me.Vector2d(x, y), 10, 10);
		this.floating = true;
		this.image = me.loader.getImage("health-meter-2");
	},
	
	draw: function(context){
		if (game.data.playerHealth >= 2){
			context.drawImage(this.image, this.pos.x, this.pos.y);
		}
	}
});

game.HUD.EnergyBar3 = me.Renderable.extend({
	init: function(x, y){
		this.parent(new me.Vector2d(x, y), 10, 10);
		this.floating = true;
		this.image = me.loader.getImage("health-meter-3");
	},
	
	draw: function(context){
		if (game.data.playerHealth >= 3){
			context.drawImage(this.image, this.pos.x, this.pos.y);
		}
	}
});

game.HUD.EnergyBar4 = me.Renderable.extend({
	init: function(x, y){
		this.parent(new me.Vector2d(x, y), 10, 10);
		this.floating = true;
		this.image = me.loader.getImage("health-meter-4");
	},
	
	draw: function(context){
		if (game.data.playerHealth == 4){
			context.drawImage(this.image, this.pos.x, this.pos.y);
		}
	}
});