game.ConfigScreen = me.ScreenObject.extend({
	init : function()
	{
      this.parent(true);
      this.image = me.loader.getImage("title");
	  
	  this.IntrosLabel  = {
						   text:  "Intros",
						   x:     60,
						   y:     50,
						   font:  new me.Font("Varela Round", "30px", "#fff")
						 };
	  this.DialogsLabel  = {
							text: "Dialogs",
							x:     60,
							y:     150,
							font:  new me.Font("Varela Round", "30px", "#fff")
						 };
						 
	  this.ExitLabel    = {
						    text: "Exit",
							x:    60,
							y:    400,
							font: new me.Font("Varela Round", "30px", "#fff")
						};
						
	  this.YesIntrosLabel    = {
						    text: "Yes",
							x:    310,
							y:    50,
							font: new me.Font("Varela Round", "30px", "#fff")
						};
	  
	  this.NoIntrosLabel     = {
							text: "No",
							x:    410,
							y:    50,
							font: new me.Font("Varela Round", "30px", "#fff")
						};
						
	  this.YesDialogsLabel = {
						   text: "Yes",
						   x:    310,
						   y:    150,
						   font: new me.Font("Varela Round", "30px", "#fff")
	  };
	  
	  this.NoDialogsLabel  = {
						   text: "No",
						   x:    410,
						   y:    150,
						   font: new me.Font("Varela Round", "30px", "#fff")
	  };
	  
	  this.Font = {
		ON: new me.Font("Varela Round", "30px", "#77add9"),
		OFF: new me.Font("Varela Round", "30px", "#fff")
	  };
	  
	  if (game.data.showIntros){
			this.YesIntrosLabel.font = this.Font.ON;
			this.NoIntrosLabel.font  = this.Font.OFF;
	  } else {
			this.YesIntrosLabel.font = this.Font.OFF;
			this.NoIntrosLabel.font  = this.Font.ON;
	  }
	  
	  if (game.data.showDialogs){
		    this.YesDialogsLabel.font = this.Font.ON;
			this.NoDialogsLabel.font  = this.Font.OFF;
	  } else {
			this.YesDialogsLabel.font = this.Font.OFF;
			this.NoDialogsLabel.font  = this.Font.ON;
	  }
	  
	  this.State = {
		MenuStateList: {
			INTROS_OPTION_STATE: 0,
			DIALOGS_OPTION_STATE: 1,
			EXIT_OPTION_STATE: 2
		},
		
		menuState: 0
	  };
	  
	  this.Cursor     = {
		image: me.loader.getImage('title-cursor'),
		x:     10,
		y:     60,
		Positions: {
			IntrosOption: {
				x: 10,
				y: 60
			},
			DialogsOption: {
				x: 10,
				y: 160
			},
			ExitOption: {
				x: 10,
				y: 410
			}	
		}
	  };
	  

    },
	
	onResetEvent: function(){
		game.data.inputObserver.resetState();
		game.data.inputObserver.isAcceptingInput = true;
		game.data.frameCount = 0;
		
		this.isLocked        = false;
		this.State.menuState = 0;
		this.Cursor.x        = 10;
		this.Cursor.y        = 60;
	},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	},
	
	draw: function(context){
		context.fillStyle = '#000';
		context.fillRect(0, 0, 640, 480);
		
		context.drawImage(this.Cursor.image, this.Cursor.x, this.Cursor.y);
		this.IntrosLabel.font.draw(context, this.IntrosLabel.text, this.IntrosLabel.x, this.IntrosLabel.y);
		this.DialogsLabel.font.draw(context, this.DialogsLabel.text, this.DialogsLabel.x, this.DialogsLabel.y);
		this.ExitLabel.font.draw(context, this.ExitLabel.text, this.ExitLabel.x, this.ExitLabel.y);
		this.YesIntrosLabel.font.draw(context, this.YesIntrosLabel.text, this.YesIntrosLabel.x, this.YesIntrosLabel.y);
		this.NoIntrosLabel.font.draw(context, this.NoIntrosLabel.text, this.NoIntrosLabel.x, this.NoIntrosLabel.y);
		this.YesDialogsLabel.font.draw(context, this.YesDialogsLabel.text, this.YesDialogsLabel.x, this.YesDialogsLabel.y);
		this.NoDialogsLabel.font.draw(context, this.NoDialogsLabel.text, this.NoDialogsLabel.x, this.NoDialogsLabel.y);
	},
	
	update: function(){
		var requiresUpdate = false;
		if (!this.isLocked){
			if (game.data.inputObserver.isAcceptingInput){
				if (this.State.menuState === this.State.MenuStateList.INTROS_OPTION_STATE){
					if (game.data.inputObserver.isDownPressed()){
						this.State.menuState                     = this.State.MenuStateList.DIALOGS_OPTION_STATE;
						this.Cursor.y                            = this.Cursor.Positions.DialogsOption.y;
						game.data.inputObserver.isAcceptingInput = false;
						requiresUpdate                           = true;
						me.audio.play("select-sfx");
					} else if (game.data.inputObserver.isRightPressed() && game.data.showIntros){
						this.YesIntrosLabel.font = this.Font.OFF;
						this.NoIntrosLabel.font  = this.Font.ON;
						game.data.showIntros     = false;
						requiresUpdate           = true;
						me.audio.play("select-sfx");
					} else if (game.data.inputObserver.isLeftPressed() && !game.data.showIntros){
						this.YesIntrosLabel.font = this.Font.ON;
						this.NoIntrosLabel.font  = this.Font.OFF;
						game.data.showIntros     = true;
						requiresUpdate           = true;
						me.audio.play("select-sfx");
					}
				} else if (this.State.menuState === this.State.MenuStateList.DIALOGS_OPTION_STATE){
					if (game.data.inputObserver.isUpPressed()){
						this.State.menuState                     = this.State.MenuStateList.INTROS_OPTION_STATE;
						this.Cursor.y                            = this.Cursor.Positions.IntrosOption.y;
						game.data.inputObserver.isAcceptingInput = false;
						requiresUpdate                           = true;
						me.audio.play("select-sfx");
					} else if (game.data.inputObserver.isDownPressed()){
						this.State.menuState                     = this.State.MenuStateList.EXIT_OPTION_STATE;
						this.Cursor.y                            = this.Cursor.Positions.ExitOption.y;
						game.data.inputObserver.isAcceptingInput = false;
						requiresUpdate                           = true;
						me.audio.play("select-sfx");
					}else if (game.data.inputObserver.isRightPressed() && game.data.showDialogs){
						this.YesDialogsLabel.font = this.Font.OFF;
						this.NoDialogsLabel.font  = this.Font.ON;
						game.data.showDialogs     = false;
						requiresUpdate            = true;
						me.audio.play("select-sfx");
					} else if (game.data.inputObserver.isLeftPressed() && !game.data.showDialogs){
						this.YesDialogsLabel.font = this.Font.ON;
						this.NoDialogsLabel.font  = this.Font.OFF;
						game.data.showDialogs     = true;
						requiresUpdate            = true;
						me.audio.play("select-sfx");
					}
				} else if (this.State.menuState === this.State.MenuStateList.EXIT_OPTION_STATE){
					if (game.data.inputObserver.isUpPressed()){
						this.State.menuState                     = this.State.MenuStateList.DIALOGS_OPTION_STATE;
						this.Cursor.y                            = this.Cursor.Positions.DialogsOption.y;
						game.data.inputObserver.isAcceptingInput = false;
						requiresUpdate                           = true;
						me.audio.play("select-sfx");
					} else if (game.data.inputObserver.isPausePressed() || game.data.inputObserver.isShootPressed()){
						game.data.inputObserver.isAcceptingInput = false;
						this.isLocked                            = true;
						me.state.change(game.screen_data.TITLE);
					}
				}
			} else {
				game.data.frameCount = game.data.frameCount + 1;
				if (game.data.frameCount >= 30){
					game.data.inputObserver.isAcceptingInput = true;
					game.data.frameCount                     = 0;
				}
			}
		}
		return requiresUpdate;
	}
});
