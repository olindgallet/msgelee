game.Stage2pt2 = me.ScreenObject.extend({
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
		if (me.audio.isAudioEnable()){
			me.audio.stopTrack();
			me.audio.playTrack("stage-2-bg");
		}
		me.levelDirector.loadLevel("jungle2");
		
		// add our HUD to the game world
		this.HUD               = new game.HUD.Container();
		this.pause             = new game.pause.Container();
		this.pause.visible   = false;
		this.isRotating       = false;
		this.delayFrames  = 0;
		this.mapOffset      = 0;
		this.MAX_DELAY_FRAMES  = 20;
		
		game.data.player                         = me.game.getEntityByName('player')[0];
		game.data.isPlayerDead             = false;
		game.data.sugarShotOnScreen = false;
		game.data.isPaused        = false;
		game.data.inputObserver.resetState();
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
		
		if (collision){
			/** Block off player at a certain point **/
			if (collision.obj.type === game.data.ROTATELEFT_TYPE && game.data.inputObserver.isLeftPressed()){
				game.data.player.pos.x = game.data.player.pos.x + 3;
			} else if (collision.obj.type === game.data.ROTATERIGHT_TYPE && game.data.inputObserver.isRightPressed()){
				game.data.player.pos.x = game.data.player.pos.x - 3;
			}
			/** End blocking **/
			
			/** Do the actual rotation **/
			if (this.delayFrames === 0){
				if (collision.obj.type === game.data.ROTATELEFT_TYPE && game.data.inputObserver.isLeftPressed()){
					this.isRotating = true;
					var x =  me.game.viewport.width / me.game.currentLevel.tilewidth - 1;
					var y = 0;
					while (y < me.game.viewport.height / me.game.currentLevel.tileheight){
						var viewportY = Math.floor(me.game.viewport.localToWorld(0, y * me.game.currentLevel.tileheight).y / me.game.currentLevel.tileheight);
						while (x - 1 > 0 ){
							var nextVisualTile     = me.game.currentLevel.getLayerByName('front').getTileId((x - 1) * me.game.currentLevel.tilewidth, viewportY * me.game.currentLevel.tileheight);
							var nextCollisionTile = me.game.currentLevel.getLayerByName('collision').getTileId((x - 1) * me.game.currentLevel.tilewidth, viewportY * me.game.currentLevel.tileheight);
							if (nextVisualTile !== null && nextCollisionTile !== null){
								me.game.currentLevel.getLayerByName('front').setTile(x, viewportY, nextVisualTile);
								me.game.currentLevel.getLayerByName('collision').setTile(x, viewportY, nextCollisionTile)
							} else {
								/** change this to rotate out into second layer **/
								me.game.currentLevel.getLayerByName('front').clearTile(x, viewportY);
								me.game.currentLevel.getLayerByName('collision').clearTile(x, viewportY);
							}				
		
							x = x - 1;
						}
						x = me.game.viewport.width / me.game.currentLevel.tilewidth - 1;
						y =  y + 1;
					}
					
					//me.game.currentLevel.getLayerByName('frontground').clearTile((me.game.viewport.getWidth() / me.game.currentLevel.tilewidth) - 1, 137);
				} else if (collision.obj.type === game.data.ROTATERIGHT_TYPE && game.data.inputObserver.isRightPressed()){
					this.isRotating = true;
					var x = 0;
					var y = 0;
					while (y < me.game.viewport.height / me.game.currentLevel.tileheight){
						var viewportY = Math.floor(me.game.viewport.localToWorld(0, y * me.game.currentLevel.tileheight).y / me.game.currentLevel.tileheight);
						while (x + 1 < me.game.viewport.width / me.game.currentLevel.tilewidth ){
							var nextVisualTile     = me.game.currentLevel.getLayerByName('back').getTileId((x + 1) * me.game.currentLevel.tilewidth, viewportY * me.game.currentLevel.tileheight);
							var nextCollisionTile = me.game.currentLevel.getLayerByName('collision').getTileId((x + 1) * me.game.currentLevel.tilewidth, viewportY * me.game.currentLevel.tileheight);
							if (nextVisualTile !== null && nextCollisionTile !== null){	
								me.game.currentLevel.getLayerByName('front').setTile(x, viewportY, nextVisualTile);
								me.game.currentLevel.getLayerByName('collision').setTile(x, viewportY, nextCollisionTile);
							} else {
								/** change this to rotate out into second layer **/
								me.game.currentLevel.getLayerByName('front').clearTile(x, viewportY); 
								me.game.currentLevel.getLayerByName('collision').clearTile(x, viewportY); 
							}
							x = x + 1;	
						}
						x = 0;
						y = y + 1;
					}	

					//me.game.currentLevel.getLayerByName('frontground').clearTile(0, 137);				
				} 
			}
		}
		/**End Rotation**/
		
		if (this.isRotating){
			this.delayFrames = this.delayFrames + 1;
			if (this.delayFrames >= this.MAX_DELAY_FRAMES){
				this.delayFrames = 0;
				this.isRotating      = false;
			}
		}
	}
});
