
/**
 * a dialog container
 */

game.dialog = game.dialog || {};


game.dialog.Container = me.ObjectContainer.extend({

	init: function(image,text) {
		// call the constructor
		this.parent();
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;
		this.floating = true;

		// give a name
		this.name = "pause";
		
		this.addChild(new game.dialog.Message(0, 0, image, text));
	}
});

game.dialog.Message = me.Renderable.extend({
	init: function(x, y, image, text){
		this.parent(new me.Vector2d(x, y), 10, 10);
        this.font     = new me.Font("Varela Round", "20px", "#ffffff");
		this.floating = true;
		this.image    = me.loader.getImage(image);
		this.text     = text;
	},
	
	draw: function(context){
		context.drawImage(me.loader.getImage("dialog"),this.pos.x, this.pos.y);
		context.drawImage(this.image, 20, 10);
		this.font.draw (context, this.text, this.pos.x + 100, this.pos.y + 30);
	}
});

