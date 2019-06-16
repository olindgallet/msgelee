game.resources = [
	/**
	 * Player resources
	 */
	{name: "player-spritesheet", type: "image", src: "data/img/player/player-spritesheet.png"},
	{name: "sugar-shot", type: "image", src: "data/img/player/sugar-shot-spritesheet.png"}, 
	{name: "event-alert", type: "image", src: "data/img/player/event-alert.png"},
	{name: "sugar-shot-sfx", type: "audio", src: "data/sfx/all/", channel : 2},
	{name: "jump-sfx", type: "audio", src: "data/sfx/all/", channel: 2},
	{name: "freeze-sfx", type: "audio", src: "data/sfx/all/", channel: 2},
	{name: "hit-sfx", type: "audio", src: "data/sfx/all/", channel: 2},
	{name: "event-sfx", type: "audio", src: "data/sfx/all/", channel: 2},
	
	/**
	 * Universal resources
	 */
	{name: "hud", type:"image", src: "data/img/hud/hud.png"},
	{name: "health-meter-1", type:"image", src: "data/img/hud/health-meter-1.png"},
	{name: "health-meter-2", type:"image", src: "data/img/hud/health-meter-2.png"},
	{name: "health-meter-3", type:"image", src: "data/img/hud/health-meter-3.png"},
	{name: "health-meter-4", type:"image", src: "data/img/hud/health-meter-4.png"},
	{name: "metatiles32x32",  type:"image", src: "data/img/stage/stage-metatiles/metatiles32x32.png"},
	{name: "more-energy-spritesheet", type: "image", src: "data/img/collectibles/more-energy-spritesheet.png"}, 
	{name: "royal-jelly-spritesheet", type: "image", src: "data/img/collectibles/royal-jelly-spritesheet.png"}, 
	{name: "pause",  type:"image", src: "data/img/hud/pause.png"},
	{name: "title-1", type: "image", src: "data/img/screens/title-1.png"},
	{name: "title-2", type: "image", src: "data/img/screens/title-2.png"},
	{name: "title-screen", type: "audio", src: "data/music/all/", channel: 1},
	{name: "title-cursor", type: "image", src: "data/img/screens/title-cursor.png"},
	{name: "title-name", type: "image", src: "data/img/screens/title-name.png"},
	{name: "game-complete-screen", type:"image", src:"data/img/screens/game-complete.png"},
	{name: "intro", type: "audio", src: "data/music/all/", channel: 1},
	{name: "logo", type: "image", src: "data/img/screens/logo.png"},
	{name: "game-start", type: "audio", src: "data/sfx/all/", channel: 2},
	{name: "select-sfx", type: "audio", src: "data/sfx/all/", channel: 2},
	{name: "more-health-sfx", type: "audio", src: "data/sfx/all/", channel: 2},
	{name: "royal-jelly-sfx", type: "audio", src: "data/sfx/all/", channel: 2},
	{name: "death-sfx", type: "audio", src: "data/sfx/all/", channel: 2},
	{name: "pause-sfx", type: "audio", src: "data/sfx/all/", channel: 2},
	{name: "boss", type: "audio", src: "data/music/all/", channel: 1},
	{name: "boss-hurt-sfx", type: "audio", src: "data/sfx/all/", channel: 2},
	{name: "movie", type: "audio", src: "data/music/all/", channel: 1},
	
	/**
	 * Stage 1 Resources
	 */
	{name: "stage-1-cutscene-1", type: "image", src: "data/img/stage/stage-1/intro/scene-1.png"},
	{name: "stage-1-cutscene-2", type: "image", src: "data/img/stage/stage-1/intro/scene-2.png"},
	{name: "stage-1-cutscene-3", type: "image", src: "data/img/stage/stage-1/intro/scene-3.png"},
	{name: "stage-1-cutscene-4", type: "image", src: "data/img/stage/stage-1/intro/scene-4.png"},
	 
	{name: "stage-1-bg", type: "audio", src: "data/music/stage-1/", channel: 1},
	{name: "stage-2-bg", type: "audio", src: "data/music/stage-2/", channel: 1},
	{name: "stage-3-bg", type: "audio", src: "data/music/stage-3/", channel: 1},
	 
    {name: "desert-tilesheet",  type:"image", src: "data/img/stage/stage-1/tiles/desert-tilesheet.png"},
	{name: "sunset-1", type:"image", src: "data/img/stage/stage-1/tiles/sunset-1.png"},
	{name: "rooftop-scene", type:"image", src: "data/img/stage/stage-1/tiles/rooftop-scene.png"},
	{name: "oilbg-1", type:"image", src: "data/img/stage/stage-1/tiles/oilbg-1.png"},
	{name: "oilbg-2", type:"image", src: "data/img/stage/stage-1/tiles/oilbg-2.png"},
	{name: "oilbg-3", type:"image", src: "data/img/stage/stage-1/tiles/oilbg-3.png"},
	{name: "desert", type: "tmx", src: "data/img/stage/stage-1.tmx"},
	{name: "desert2", type: "tmx", src: "data/img/stage/stage-1-2.tmx"},
	{name: "desert3", type: "tmx", src: "data/img/stage/stage-1-3.tmx"},
	{name: "thankyou", type: "image", src: "data/img/screens/game-complete.png"},
	
    {name: "peashooter-spritesheet", type: "image", src: "data/img/stage/stage-1/enemies/peashooter-spritesheet.png"}, 
	{name: "pea-shot", type: "image", src: "data/img/stage/stage-1/enemies/pea-shot.png"},
	{name: "pea-shot-sfx", type: "audio", src: "data/sfx/stage-1/", channel : 2},
	
	{name: "desert-knight-spritesheet", type: "image", src: "data/img/stage/stage-1/enemies/desert-knight-spritesheet.png"},
	
	{name: "desert-spike-trap", type: "image", src: "data/img/stage/stage-1/enemies/desert-spike-trap.png"},
	
	{name: "flame-shooter-spritesheet", type: "image", src: "data/img/stage/stage-1/enemies/flame-shooter-spritesheet.png"},
	{name: "flame-shot-1", type: "image", src: "data/img/stage/stage-1/enemies/flame-shot-1.png"},
	{name: "flame-shot-2", type: "image", src: "data/img/stage/stage-1/enemies/flame-shot-2.png"},
	{name: "flame-shot-sfx", type: "audio", src: "data/sfx/stage-1/", channel: 2},
	
	{name: "rotary-cannon-spritesheet", type: "image", src: "data/img/stage/stage-1/enemies/rotary-cannon-spritesheet.png"},
	{name: "rotary-cannon-bullet", type: "image", src: "data/img/stage/stage-1/enemies/rotary-cannon-bullet.png"},
	
	{name: "sand-shark-spritesheet", type: "image", src: "data/img/stage/stage-1/enemies/sand-shark-spritesheet.png"}, 
	
	{name: "sniper-scope-spritesheet", type: "image", src: "data/img/stage/stage-1/enemies/sniper-scope-spritesheet.png"},
	{name: "sniper-shot-sfx", type: "audio", src: "data/sfx/stage-1/", channel : 2},
	
	{name: "elevator", type:"image", src: "data/img/stage/stage-1/tiles/elevator.png"},
	
	{name: "vesperado-shadow-spritesheet", type: "image", src: "data/img/stage/stage-1/entities/vesperado-shadow-spritesheet.png"},
	{name: "lantern-spritesheet", type: "image", src: "data/img/stage/stage-1/entities/lantern-spritesheet.png"},
	{name: "ceiling-lamp-spritesheet", type: "image", src: "data/img/stage/stage-1/entities/ceiling-lamp-spritesheet.png"},
	
	{name: "vesperado-spritesheet", type: "image", src: "data/img/stage/stage-1/enemies/vesperado-spritesheet.png"},
	{name: "vesperado-bullet", type: "image", src: "data/img/stage/stage-1/enemies/vesperado-bullet.png"},
	
	/** Stage 2 Resources **/
	{name: "stage-2-cutscene-1", type: "image", src: "data/img/stage/stage-2/intro/scene-1.png"},
	{name: "stage-2-cutscene-2", type: "image", src: "data/img/stage/stage-2/intro/scene-2.png"},
	{name: "stage-2-cutscene-3", type: "image", src: "data/img/stage/stage-2/intro/scene-3.png"},
	{name: "stage-2-cutscene-4", type: "image", src: "data/img/stage/stage-2/intro/scene-4.png"},
	
	{name: "raft", type:"image", src: "data/img/stage/stage-2/elements/raft.png"},
	
	{name: "jungle-tilesheet", type: "image", src: "data/img/stage/stage-2/tiles/jungle-tilesheet.png"},
	{name: "junglebg-1", type: "image", src: "data/img/stage/stage-2/tiles/junglebg-1.png"},
	{name: "junglebg-2", type: "image", src: "data/img/stage/stage-2/tiles/junglebg-2.png"},
	{name: "jungleboss-bg", type:"image", src: "data/img/stage/stage-2/tiles/jungleboss-bg.png"},
	
	{name: "jungle1", type: "tmx", src: "data/img/stage/stage-2-1.tmx"},
	{name: "jungle2", type: "tmx", src: "data/img/stage/stage-2-2.tmx"},
	{name: "jungle3", type: "tmx", src: "data/img/stage/stage-2-3.tmx"},
	
	{name: "parrot-spritesheet", type: "image", src: "data/img/stage/stage-2/enemies/parrot-spritesheet.png"},
	{name: "parrot-sfx", type: "audio", src: "data/sfx/stage-2/", channel: 2},
	
	{name: "popout-fish-spritesheet", type: "image", src: "data/img/stage/stage-2/enemies/popout-fish-spritesheet.png"},
	{name: "popout-fish-splash-sfx", type: "audio", src: "data/sfx/stage-2/", channel: 2},
	{name: "popout-fish-eat-sfx", type: "audio", src: "data/sfx/stage-2/", channel: 2},
	
	{name: "pixie-spritesheet", type: "image", src: "data/img/stage/stage-2/enemies/pixie-spritesheet.png", channel: 2},
	{name: "pixie-shot-spritesheet", type: "image", src: "data/img/stage/stage-2/enemies/pixie-shot-spritesheet.png", channel: 2},
	{name: "pixie-shot-sfx", type: "audio", src: "data/sfx/stage-2/", channel: 2},
	
	{name: "ninja-cat-spritesheet", type: "image", src: "data/img/stage/stage-2/enemies/ninja-cat-spritesheet.png", channel: 2},
	
	{name: "waterfall-spritesheet", type: "image", src: "data/img/stage/stage-2/elements/waterfall-spritesheet.png"},
	{name: "waterfall-base-spritesheet", type: "image", src: "data/img/stage/stage-2/elements/waterfall-base-spritesheet.png"},
	{name: "wave-spritesheet-lr", type: "image", src: "data/img/stage/stage-2/enemies/wave-spritesheet-lr.png"},
	{name: "wave-spritesheet-ud", type: "image", src: "data/img/stage/stage-2/enemies/wave-spritesheet-ud.png"},
	{name: "cat-fireball-spritesheet", type: "image", src: "data/img/stage/stage-2/enemies/cat-fireball-spritesheet.png"},
	{name: "cat-wave-sfx", type: "audio", src: "data/sfx/stage-2/", channel: 2},
	{name: "cat-flame-sfx", type: "audio", src: "data/sfx/stage-2/", channel: 2},
	
	
	/** Stage 3 Resources **/
	{name: "stage-3-cutscene-1", type: "image", src: "data/img/stage/stage-3/intro/scene-1.png"},
	{name: "stage-3-cutscene-2", type: "image", src: "data/img/stage/stage-3/intro/scene-2.png"},
	{name: "stage-3-cutscene-3", type: "image", src: "data/img/stage/stage-3/intro/scene-3.png"},
	{name: "stage-3-cutscene-4", type: "image", src: "data/img/stage/stage-3/intro/scene-4.png"},
	
	{name: "jungle1", type: "tmx", src: "data/img/stage/stage-3-1.tmx"},
];
