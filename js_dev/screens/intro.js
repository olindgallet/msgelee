game.IntroScreen = me.ScreenObject.extend({
	init : function()
	{
      this.parent(true);
	  this.image   = me.loader.getImage("logo");
	  this.x = 0;
	  this.y = 0;
    },
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
	},
	
	onResetEvent: function(){
		me.audio.play("intro");
		game.data.frameCount = 0;
	},
	
	draw: function(context){
		context.fillStyle = '#000';
		context.fillRect(0, 0, 640, 480);
		context.drawImage(this.image, this.x, this.y);
	},
	
	update: function(){
		if (this.y <= 180){
			this.y = this.y + 1;
		}
		
		game.data.frameCount = game.data.frameCount + 1;
		if (game.data.frameCount >= 360){
			me.state.change(game.screen_data.TITLE);
		}
		return true;
	}
});
