
/**
 * a pause container and child items
 */

game.pause = game.pause || {};


game.pause.Container = me.ObjectContainer.extend({

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
		this.name = "pause";
		
		this.addChild(new game.pause.Message(220, 150));
	}
});

game.pause.Message = me.Renderable.extend({
	init: function(x, y){
		this.parent(new me.Vector2d(x, y), 10, 10);
			 // create a font
        this.font = new me.Font("Varela Round", "20px", "#ffffff");
		this.floating = true;
		this.image = me.loader.getImage("pause");
	},
	
	draw: function(context){
		context.drawImage(this.image,this.pos.x, this.pos.y);
		this.font.draw (context, "PAUSED", this.pos.x + 60, this.pos.y + 30);
	}
});

