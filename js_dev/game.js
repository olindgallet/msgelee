
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		showDialogs: true,
		showIntros:  true,
		inputObserver: new InputObserver(),
		playerLives:  99,
		playerScore : 0,
		playerHealth: 4,
		isPaused: false,
		sugarShotOnScreen: false,
		isPlayerDead: false,
		isBossDead:   false,
		frameCount: 0,
		stageWidth: 0,
		stageHeight: 0,	
		checkpoint: 1,
		
		MAX_DIALOG_FRAMES: 30,
		dialogFrames: 0,
		
		PLAYER_INVINCIBLE_FRAMES: 120, 
		PLAYER_TYPE: 100,
		SUGARSHOT_TYPE: 101,
		PLATFROM_TYPE: 102,
		SOLID_TYPE: 103,
		DEATH_TYPE: 104,
		WARP_TYPE: 105,
		MORE_ENERGY_TYPE: 106,
		
		//Stage 1 exclusives
		STARTSNIPE_TYPE: 200,
		STOPSNIPE_TYPE: 201,
		
		//Stage 2 exclusives
		WATER_TYPE: 301,
		ROTATELEFT_TYPE: 302,
		ROTATERIGHT_TYPE: 303
	},
	
	screen_data : {
		INTRO: 100,
		TITLE: 101,
		CONFIG: 102,
		GAME_COMPLETE: 103
	},
	
	level_data : {
		STAGE1_MOVIE: 1,
		STAGE1: 2,
		STAGE1_PT2: 3,
		STAGE1_PT3: 4,
		
		STAGE2_MOVIE: 5,
		STAGE2_PT1: 6,
		STAGE2_PT2: 7,
		STAGE2_PT3: 8,
		
		STAGE3_MOVIE: 9,
		STAGE3_PT1: 10
	},
	
	stage1_data: {
		snipingStarted: false,
		snipingComplete: false,
		dialogShown: false
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	//if (!me.video.init("screen", 640, 480, true)) {
	if (!me.video.init("screen", 640, 480, true, 'auto')){
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		me.state.set(game.screen_data.INTRO, new game.IntroScreen());
		me.state.set(game.screen_data.TITLE, new game.TitleScreen());
		me.state.set(game.screen_data.CONFIG, new game.ConfigScreen());
		
		me.state.set(game.level_data.STAGE1_MOVIE, new game.Stage1Movie());
		me.state.set(game.level_data.STAGE1, new game.Stage1());
		me.state.set(game.level_data.STAGE1_PT2, new game.Stage1pt2());
		me.state.set(game.level_data.STAGE1_PT3, new game.Stage1pt3());
		
		me.state.set(game.level_data.STAGE2_MOVIE, new game.Stage2Movie());
		me.state.set(game.level_data.STAGE2_PT1, new game.Stage2pt1());
		me.state.set(game.level_data.STAGE2_PT2, new game.Stage2pt2());
		me.state.set(game.level_data.STAGE2_PT3, new game.Stage2pt3());
		me.state.set(game.screen_data.GAME_COMPLETE, new game.GameCompleteScreen());
		
		me.state.set(game.level_data.STAGE3_MOVIE, new game.Stage3Movie());
		me.state.set(game.level_data.STAGE3_PT1, new game.Stage3pt1());
		
		 // add our player entity in the entity pool
		me.entityPool.add("player", game.PlayerEntity);
		me.entityPool.add("more-energy-item", game.MoreEnergyEntity);
		me.entityPool.add("royal-jelly-item", game.RoyalJellyEntity);
		
		//stage 1 elements
		me.entityPool.add("desert-knight-enemy", game.DesertKnightEnemy);
		me.entityPool.add("peashooter-enemy", game.PeaShooterEnemy);
		me.entityPool.add("desert-spike-trap", game.DesertSpikeTrap);
		me.entityPool.add("flame-shooter-enemy", game.FlameShooterEnemy);
		me.entityPool.add("warp-tile", game.WarpTile);
		me.entityPool.add("start-snipe", game.StartSnipeEvent);
		me.entityPool.add("stop-snipe", game.StopSnipeEvent);
		me.entityPool.add("rotary-cannon-enemy", game.RotaryCannonEnemy);
		me.entityPool.add("sand-shark-enemy", game.SandSharkEnemy);
		me.entityPool.add("sniper-scope-enemy", game.SniperScopeEnemy);
		me.entityPool.add("elevator", game.Elevator);
		me.entityPool.add("lantern-entity", game.LanternEntity);
		me.entityPool.add("ceiling-lamp-entity", game.CeilingLampEntity);
		me.entityPool.add("vesperado-shadow-entity", game.VesperadoShadowEntity);
		me.entityPool.add("vesperado-enemy", game.VesperadoEnemy);
		
		//stage 2 elements
		me.entityPool.add("rotate-left", game.RotateLeftEvent);
		me.entityPool.add("rotate-right", game.RotateRightEvent);
		me.entityPool.add("water-event", game.WaterEvent);
		me.entityPool.add("raft", game.RaftEntity);
		me.entityPool.add("waterfall", game.WaterfallEntity);
		me.entityPool.add("waterfall-base", game.WaterfallBaseEntity);
		
		//stage 2 enemies
		me.entityPool.add("parrot", game.ParrotEnemy);
		me.entityPool.add("popout-fish", game.PopoutFishEnemy);
		me.entityPool.add("pixie", game.PixieEnemy);
		me.entityPool.add("ninja-cat", game.NinjaCatEnemy);
		
		// enable the keyboard
		me.input.bindKey(me.input.KEY.DOWN,  "down");
		me.input.bindKey(me.input.KEY.UP,    "up");
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.Z,     "pause");
		me.input.bindKey(me.input.KEY.C,     "shoot");
		
		// start the game
		me.state.change(game.screen_data.INTRO);
	}
};