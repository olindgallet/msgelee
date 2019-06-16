game.TitleScreen = me.ScreenObject.extend({
	init : function()
	{
      this.parent(true);
      this.Title = {
		frame_1: me.loader.getImage("title-1"),
		frame_2: me.loader.getImage("title-2")
	  };
	  
	  this.Action      = {
						   text:  "Press Start!",
						   x:     50,
						   y:     250,
						   font:  new me.Font("Varela Round", "30px", "#fff"),
						   bFont: new me.Font("Varela Round", "30px", "#000")
						 };
	  this.Credits     = {
						   text: "April Release - Olin Gallet, 2016",
						   x:    50,
						   y:    450,
						   font: new me.Font("Varela Round", "20px", "#fff")
						 };
	 
	  this.Menu         = {
		 StartOption: {
		 	text:  "Start Game",
			x:     70,
			y:     250,
			font:  new me.Font("Varela Round", "30px", "#fff")
		},
		ConfigOption: {
			text:  "Configuration",
			x:     70,
			y:     320,
			font:  new me.Font("Varela Round", "30px", "#fff")
		}
	  };
	  
	  this.State = {
		MenuStateList: {
			PRESS_START_STATE: 0,
			SELECT_OPTION_STATE: 1
		},
		OptionStateList: {
			START_OPTION_STATE: 0,
			CONFIG_OPTION_STATE: 1
		},
		
		menuState: 0,
		optionState: 0
	  };
	  
	  this.Cursor     = {
		image: me.loader.getImage('title-cursor'),
		x:     40,
		y:     260,
		Positions: {
			StartOption: {
				x: 40,
				y: 260
			},
			ConfigOption: {
				x: 40,
				y: 330
			}
		}
	  };
	  
	  this.Name     = {
		image: me.loader.getImage('title-name'),
		x:     50,
		y:     100,	
	  }
    },
	
	onResetEvent: function(){
		me.audio.playTrack("title-screen");
		game.data.frameCount   = 0;
		
		game.data.playerLives  = 99;
		game.data.playerScore  = 0;
		game.data.playerHealth = 4;
		
		this.isLocked = false;
		this.State.menuState = this.State.MenuStateList.PRESS_START_STATE;
		game.data.inputObserver.resetState();
		game.data.inputObserver.isAcceptingInput = true;
	},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	},
	
	draw: function(context){
		if (game.data.frameCount <= 15 || (game.data.frameCount >= 30 && game.data.frameCount <= 45)){
			context.drawImage(this.Title.frame_1, 0, 0);
		} else {
			context.drawImage(this.Title.frame_2, 0, 0);
		}
		
		this.Credits.font.draw(context, this.Credits.text, this.Credits.x, this.Credits.y);
		context.drawImage(this.Name.image, this.Name.x, this.Name.y);
		
		if (this.State.menuState === this.State.MenuStateList.PRESS_START_STATE){
			if (game.data.frameCount <= 30){
				this.Action.font.draw(context, this.Action.text, this.Action.x, this.Action.y);
			} else if (game.data.frameCount < 60){
				this.Action.bFont.draw(context, this.Action.text, this.Action.x, this.Action.y);
			} else if (game.data.frameCount >= 60){
				game.data.frameCount = 0;
			}
			
			game.data.frameCount = game.data.frameCount + 1;
		} else if (this.State.menuState === this.State.MenuStateList.SELECT_OPTION_STATE){
			this.Menu.StartOption.font.draw(context, this.Menu.StartOption.text, this.Menu.StartOption.x, this.Menu.StartOption.y);
			this.Menu.ConfigOption.font.draw(context, this.Menu.ConfigOption.text, this.Menu.ConfigOption.x, this.Menu.ConfigOption.y);
			context.drawImage(this.Cursor.image, this.Cursor.x, this.Cursor.y);
		}
	},
	
	update: function(){
		if (this.State.menuState === this.State.MenuStateList.PRESS_START_STATE && game.data.inputObserver.isPausePressed() && game.data.inputObserver.isAcceptingInput){
			me.audio.stop("title-screen");
			this.State.menuState = this.State.MenuStateList.SELECT_OPTION_STATE;
			me.audio.play("game-start");
			game.data.inputObserver.isAcceptingInput = false;
			game.data.frameCount = 0;
		} else if (this.State.menuState === this.State.MenuStateList.SELECT_OPTION_STATE && !this.isLocked){
			if (game.data.inputObserver.isAcceptingInput){
				if (game.data.inputObserver.isUpPressed() && this.State.optionState === this.State.OptionStateList.CONFIG_OPTION_STATE){
					game.data.inputObserver.isAcceptingInput = false;
					this.Cursor.x          = this.Cursor.Positions.StartOption.x;
					this.Cursor.y          = this.Cursor.Positions.StartOption.y;
					this.State.optionState = this.State.OptionStateList.START_OPTION_STATE;
					me.audio.play("select-sfx");
				} else if (game.data.inputObserver.isDownPressed() && this.State.optionState === this.State.OptionStateList.START_OPTION_STATE){
					game.data.inputObserver.isAcceptingInput = false;
					this.Cursor.x = this.Cursor.Positions.ConfigOption.x;
					this.Cursor.y = this.Cursor.Positions.ConfigOption.y;
					this.State.optionState = this.State.OptionStateList.CONFIG_OPTION_STATE;
					me.audio.play("select-sfx");
				} else if (this.State.optionState === this.State.OptionStateList.START_OPTION_STATE && (game.data.inputObserver.isPausePressed() || game.data.inputObserver.isShootPressed())){
					game.data.inputObserver.isAcceptingInput = false;
					this.isLocked = true;
					me.audio.play("game-start", false, function(){
						if (game.data.showIntros){
							me.state.change(game.level_data.STAGE1_MOVIE);
						} else {
							me.state.change(game.level_data.STAGE1);
						}
					});
				} else if (this.State.optionState === this.State.OptionStateList.CONFIG_OPTION_STATE && (game.data.inputObserver.isPausePressed() || game.data.inputObserver.isShootPressed())){
					game.data.inputObserver.isAcceptingInput = false;
					me.state.change(game.screen_data.CONFIG);
				}
			} else {
				game.data.frameCount = game.data.frameCount + 1;
				if (game.data.frameCount > 30){
					game.data.inputObserver.isAcceptingInput = true;
				}
			}
		}		
		return true;
	}
});
