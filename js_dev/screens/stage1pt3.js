game.Stage1pt3 = me.ScreenObject.extend({
	 // override the default constructor
	init : function()
	{
      //call the parent constructor giving true
      //as parameter, so that we use the update & draw functions
      this.parent(true);
      // ...
	  this.isPaused        = false;
	  
    },
	
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		if (me.audio.isAudioEnable()){
			me.audio.stopTrack();
			me.audio.playTrack("boss");
		}
		me.levelDirector.loadLevel("desert3");
		
		// add our HUD to the game world
		this.HUD               = new game.HUD.Container();
		this.pause             = new game.pause.Container();
		this.pause.visible     = false;
		
		game.data.player                         = me.game.getEntityByName('player')[0];
		game.data.isPlayerDead             = false;
		game.data.sugarShotOnScreen = false;
		game.data.inputObserver.resetState();
		game.data.stageWidth        = me.game.currentLevel.cols * me.game.currentLevel.tilewidth;
		game.data.stageHeight       = me.game.currentLevel.rows * me.game.currentLevel.tileheight;
		
		this.isPauseDown = false;
		
		me.game.world.addChild(this.HUD);
		me.game.world.addChild(this.pause);		
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
		me.game.world.removeChild(this.pause);
	},
	
	update: function() {
		if (game.data.inputObserver.isPausePressed() && !this.isPauseDown && !game.data.isPaused){
			me.audio.pauseTrack();
			me.audio.play("pause-sfx");
			this.isPauseDown   = true;
			game.data.isPaused = true;
			this.pause.visible = true;
		} else if (game.data.inputObserver.isPausePressed() && !this.isPauseDown && game.data.isPaused){
			me.audio.resumeTrack();
			this.isPauseDown   = true;
			game.data.isPaused = false;
			this.pause.visible = false;
		} else if (!game.data.inputObserver.isPausePressed()){
			this.isPauseDown = false;
		}
		
		if (game.data.isBossDead){
			me.audio.stopTrack();
			me.state.change(game.level_data.STAGE2_MOVIE);
		}
	
		return true;
	}
});
