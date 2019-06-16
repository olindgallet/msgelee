game.GameCompleteScreen = me.ScreenObject.extend({
	init : function()
	{
      this.parent(true);
      this.image = me.loader.getImage("thankyou");
	  game.data.checkpoint                          = game.level_data.STAGE1;
	  game.data.isBossDead = false;
	  
	  this.isPressed = false;
	  this.idleFrames = 0;
	  this.MAX_IDLE_FRAMES = 180;
    },
	
	onResetEvent: function(){
		this.isPressed = false;
	},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	},
	
	draw: function(context){
		context.drawImage(this.image, 0, 0);
	},
	
	update: function(){
		if (this.idleFrames >= this.MAX_IDLE_FRAMES && me.input.isKeyPressed('shoot') && !this.isPressed){
			this.isPressed = true;
			me.state.change(game.screen_data.TITLE);
		}
		this.idleFrames = this.idleFrames + 1;
		return true;
	}
});
