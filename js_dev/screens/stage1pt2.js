game.Stage1pt2 = me.ScreenObject.extend({
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
			if (me.audio.getCurrentTrack() !== "stage-1-bg"){
				me.audio.playTrack("stage-1-bg");
			} else {
				me.audio.resumeTrack();
			}
		}
		me.levelDirector.loadLevel("desert2");
		game.data.inputObserver.resetState();
		
		// add our HUD to the game world
		this.HUD                    = new game.HUD.Container();
		this.pause                  = new game.pause.Container();
		this.pause.visible       = false;
		this.isPauseDown     = false;
		game.data.player            = me.game.getEntityByName('player')[0];
		game.data.isPlayerDead      = false;
		game.data.sugarShotOnScreen = false;
		game.data.stageWidth        = me.game.currentLevel.cols * me.game.currentLevel.tilewidth;
		game.data.stageHeight       = me.game.currentLevel.rows * me.game.currentLevel.tileheight;
		
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
		
		var collision = game.data.player.collide();
		if (collision && collision.obj.type == game.data.WARP_TYPE){
			me.audio.pauseTrack();
			game.data.isBossDead   = false;
			game.data.checkpoint   = game.level_data.STAGE1_PT3;
			me.state.change(game.level_data.STAGE1_PT3);
		}
		
		return true;
	}
});
