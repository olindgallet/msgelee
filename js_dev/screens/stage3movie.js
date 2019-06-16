game.Stage3Movie = me.ScreenObject.extend({
	init : function()
	{
      this.parent(true);
    },
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	},
	
	onResetEvent: function(){
		game.data.frameCount = 0;
		this.images = [];
		this.images[0] = {image: me.loader.getImage("stage-3-cutscene-1"), x: 0, y: 0};
		this.images[1] = {image: me.loader.getImage("stage-3-cutscene-2"), x: 0, y: 480};
		this.images[2] = {image: me.loader.getImage("stage-3-cutscene-3"), x: 0, y: 480};
		this.images[3] = {image: me.loader.getImage("stage-3-cutscene-4"), x: 0, y: 480};
		
	  	this.imageCounter  = 0;
		this.isMovingFrame = false;
		game.data.inputObserver.isAcceptingInput = true;
		me.audio.playTrack("movie");
	},
	
	draw: function(context){
		context.fillStyle = '#000';
		context.fillRect(0, 0, 640, 480);
		
		context.drawImage(this.images[this.imageCounter].image, this.images[this.imageCounter].x, this.images[this.imageCounter].y);
		if (this.imageCounter + 1 < this.images.length){
			context.drawImage(this.images[this.imageCounter + 1].image, this.images[this.imageCounter + 1].x, this.images[this.imageCounter + 1].y);
		}
	},
	
	update: function(){
		if (game.data.inputObserver.isPausePressed() || (this.imageCounter + 1 === this.images.length && game.data.inputObserver.isAcceptingInput && game.data.inputObserver.isShootPressed())){
			game.data.inputObserver.isAcceptingInput = false;
			this.isMovingFrame = true;
			me.audio.stopTrack("movie");
			me.state.change(game.screen_data.GAME_COMPLETE);
		} else if (!this.isMovingFrame && game.data.inputObserver.isAcceptingInput && game.data.inputObserver.isShootPressed()){
			this.isMovingFrame = true;
		} else if (this.isMovingFrame){
			this.images[this.imageCounter + 1].y = this.images[this.imageCounter + 1].y - 20;
			if (this.images[this.imageCounter + 1].y === 0){
				this.imageCounter = this.imageCounter + 1;
				this.isMovingFrame = false;
				game.data.inputObserver.isAcceptingInput = true;
			}
		}
		return true;
	}
});