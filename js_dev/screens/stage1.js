game.Stage1 = me.ScreenObject.extend({
	 // override the default constructor
	init : function()
	{
      //call the parent constructor giving true
      //as parameter, so that we use the update & draw functions
      this.parent(true);
      // ...
    },
	
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		me.levelDirector.loadLevel("desert");
		game.data.checkpoint                          = game.level_data.STAGE1;
		game.data.frameCount                        = 0;
		game.data.player                                  = me.game.getEntityByName('player')[0];
		game.data.playerHeatlh                        = 4;
		game.data.isAcceptingInput                  = true;
		game.data.sniperScope                        = me.game.getEntityByName('sniper-scope-enemy')[0];
		game.data.stageWidth                           = me.game.currentLevel.cols * me.game.currentLevel.tilewidth;
		game.data.stageHeight                          = me.game.currentLevel.rows * me.game.currentLevel.tileheight;
		game.data.isPlayerDead                       = false;
		game.stage1_data.snipingStarted         = false;
		game.stage1_data.snipingComplete     = false;
		game.data.sniperScope.alwaysUpdate = true;
		game.data.sugarShotOnScreen            = false;
		game.stage1_data.dialogShown            = false;
		this.isPauseDown                                  = false;
		game.data.inputObserver.resetState();
		
		// add our HUD to the game world
		this.HUD            = new game.HUD.Container();
		this.pause          = new game.pause.Container();
		this.pause.visible  = false;
		
		me.game.world.addChild(this.HUD);
		me.game.world.addChild(this.pause);
		
		if (me.audio.isAudioEnable()){
			me.audio.playTrack("stage-1-bg");
		}
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
		game.data.frameCount = game.data.frameCount + 1;
		
		if (game.data.frameCount == 60){
			me.game.currentLevel.getLayerByName('bg2').image = me.loader.getImage('oilbg-3');
			game.data.frameCount = 0;
		} else if (game.data.frameCount == 40){
			me.game.currentLevel.getLayerByName('bg2').image = me.loader.getImage('oilbg-2');
		} else if (game.data.frameCount == 20){
			me.game.currentLevel.getLayerByName('bg2').image = me.loader.getImage('oilbg-1');
		}
		
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
			game.data.checkpoint = game.level_data.STAGE1_PT2;
			me.state.change(game.level_data.STAGE1_PT2);
		} else if (collision && !game.stage1_data.snipingStarted && !game.stage1_data.snipingComplete && collision.obj.type == game.data.STARTSNIPE_TYPE){
			game.stage1_data.snipingStarted    = true;
			game.data.sniperScope.visible      = true;
			
			var alert     = new game.EventAlertEntity();
			me.game.add(alert);
		} else if (collision && game.stage1_data.snipingStarted && !game.stage1_data.snipingComplete && collision.obj.type == game.data.STOPSNIPE_TYPE){
			game.data.sniperScope.visible      = false;
			game.data.sniperScope.alwaysUpdate = false;
			game.stage1_data.snipingComplete   = true;
		}
		
		return true;
	}
});
