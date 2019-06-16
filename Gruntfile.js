module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
		stripBanners: true
      },
      dist: {
        src: ['js_dev/lib/melonJS-0.9.11.js', 'js_dev/lib/plugins/debugPanel.js', 'js_dev/game.js', 'js_dev/resources.js', 
			  'js_dev/input/*.js',
			  'js_dev/entities/objects/all-stages/*.js', 'js_dev/entities/objects/stage-1/*.js', 'js_dev/entities/objects/stage-2/*.js',
			  'js_dev/entities/HUD.js', 'js_dev/entities/Dialog.js', 'js_dev/entities/pause.js', 'js_dev/screens/intro.js', 'js_dev/screens/title.js', 'js_dev/screens/config.js',
			  'js_dev/screens/stage1movie.js', 'js_dev/screens/stage2movie.js',
			  'js_dev/screens/stage1.js', 'js_dev/screens/stage1pt2.js', 'js_dev/screens/stage1pt3.js',
			  'js_dev/screens/stage2pt1.js', 'js_dev/screens/stage2pt2.js', 'js_dev/screens/stage2pt3.js',
			  'js_dev/screens/stage3movie.js', 'js_dev/screens/stage3pt1.js',
			  'js_dev/screens/game-complete.js'],
		dest: 'js/main.js'        
      }
    },
	uglify: {
		build: {
			src: 'js/main.js',
			dest: 'js/main.min.js'
		}
	},
	
	imagemin: {
    dynamic: {
        files: [{
            expand: true,
            src: ['data_dev/img/**/*.{png,jpg,gif}'],
            dest: '/'
        }]
		}
	},
	
	watch: {
		scripts: {
			files: ['js_dev/**/*.js'],
			tasks: ['concat', 'uglify', 'clean:fatjs'],
			options: {
				spawn: false,
			},
		},
		images: {
			files: ['data_dev/img/**/*.{png,jpg,gif}'],
			tasks: ['imagemin', 'sprite', 'clean:spritecss'],
			options: {
				spawn: false,
			},
		}
	},
	
	jshint: {
		myFiles: ['js_dev/**/*.js']
	},
	
	yuidoc: {
        all: {
            name: '<%= pkg.name %>',
            description: '<%= pkg.description %>',
            version: '<%= pkg.version %>',
            url: '<%= pkg.homepage %>',
            options: {
                paths: ['js_dev/'],
                outdir: './docs/'
            }
        }
    },
	
	sprite:{
      player: {
        src:      ['data_dev/img/player/PlayerWalk1.png', 'data_dev/img/player/PlayerWalk2.png', 'data_dev/img/player/PlayerWalk3.png', 'data_dev/img/player/PlayerWalk4.png',
				   'data_dev/img/player/PlayerSpit1.png', 'data_dev/img/player/PlayerSpit2.png', 'data_dev/img/player/PlayerSpit3.png', 'data_dev/img/player/PlayerSpit4.png',
				   'data_dev/img/player/PlayerJump1.png', 'data_dev/img/player/PlayerJump2.png', 'data_dev/img/player/PlayerJump3.png', 'data_dev/img/player/PlayerJump4.png',
				   'data_dev/img/player/PlayerDie1.png',  'data_dev/img/player/PlayerDie2.png',  'data_dev/img/player/PlayerDie3.png',  'data_dev/img/player/PlayerDie4.png', 'data_dev/img/player/PlayerDie5.png'],
        dest:      'data/img/player/player-spritesheet.png',
		destCss:   'data/img/player/spritesheet.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
      },
	  
	player_shot: {
		src:      ['data_dev/img/player/sugar-shot/sugar-shot-1.png', 'data_dev/img/player/sugar-shot/sugar-shot-2.png'],
		dest:      'data/img/player/sugar-shot-spritesheet.png',
		destCss:   'data/img/player/sugar-shot.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
		},
		
		royal_jelly:{
			src:      ['data_dev/img/collectibles/royal-jelly/royal-jelly-1.png',
						  'data_dev/img/collectibles/royal-jelly/royal-jelly-2.png'],
			dest:      'data/img/collectibles/royal-jelly-spritesheet.png',
			destCss:   'data/img/collectibles/royal-jelly.css',
			algorithm: 'left-right',
			algorithmOpts: {sort: false},
			padding: 0
		},
		
	event_alert: {
		src:      ['data_dev/img/player/event-alert/event-alert.png'],
		dest:      'data/img/player/event-alert.png',
		destCss:   'data/img/player/event-alert.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  more_health: {
		src:      ['data_dev/img/collectibles/more-energy/more-energy-1.png', 'data_dev/img/collectibles/more-energy/more-energy-2.png'],
		dest:      'data/img/collectibles/more-energy-spritesheet.png',
		destCss:   'data/img/player/more-energy.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  rotary_cannon: {
		src:      ['data_dev/img/stage/stage-1/enemies/rotary-cannon/rotary-cannon-1.png',
				   'data_dev/img/stage/stage-1/enemies/rotary-cannon/rotary-cannon-2.png',
				   'data_dev/img/stage/stage-1/enemies/rotary-cannon/rotary-cannon-3.png'],
		dest:      'data/img/stage/stage-1/enemies/rotary-cannon-spritesheet.png',
		destCss:   'data/img/stage/stage-1/enemies/rotary-cannon.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
		},
		
	  rotary_cannon_bullet: {
		src:          ['data_dev/img/stage/stage-1/enemies/rotary-cannon/bullet/rotary-cannon-bullet.png'],
		dest:         'data/img/stage/stage-1/enemies/rotary-cannon-bullet.png',
		destCss:      'data/img/stage/stage-1/enemies/rotary-cannon-bullet.css',
		algorithm:    'left-right',
		algorithmOpts: {sort: false},
		padding:      0
		},
		
	  vesperado_bullet: {
		src:          ['data_dev/img/stage/stage-1/enemies/vesperado/bullet/vesperado-bullet.png'],
		dest:         'data/img/stage/stage-1/enemies/vesperado-bullet.png',
		destCss:      'data/img/stage/stage-1/enemies/vesperado-bullet.css',
		algorithm:    'left-right',
		algorithmOpts: {sort: false},
		padding:      0
		},
		
	  pea_shooter: {
		src:          ['data_dev/img/stage/stage-1/enemies/pea-shooter/pea-shooter-1.png',
				       'data_dev/img/stage/stage-1/enemies/pea-shooter/pea-shooter-2.png',
				       'data_dev/img/stage/stage-1/enemies/pea-shooter/pea-shooter-cock-1.png',
				       'data_dev/img/stage/stage-1/enemies/pea-shooter/pea-shooter-cock-2.png',
				       'data_dev/img/stage/stage-1/enemies/pea-shooter/pea-shooter-freeze-1.png',
				       'data_dev/img/stage/stage-1/enemies/pea-shooter/pea-shooter-freeze-2.png',
					   'data_dev/img/stage/stage-1/enemies/pea-shooter/pea-shooter-freeze-3.png',
					   'data_dev/img/stage/stage-1/enemies/pea-shooter/pea-shooter-freeze-4.png'],
		dest:          'data/img/stage/stage-1/enemies/peashooter-spritesheet.png',
		destCss:       'data/img/stage/stage-1/enemies/peashooter-spritesheet.css',
		algorithm:     'left-right',
		algorithmOpts: {sort: false},
		padding:       0
		},
		
	  pea_shot: {
		src:          ['data_dev/img/stage/stage-1/enemies/pea-shooter/bullet/pea-shot.png'],
		dest:          'data/img/stage/stage-1/enemies/pea-shot.png',
		destCss:       'data/img/stage/stage-1/enemies/pea-shot.css',
		algorithm:     'left-right',
		algorithmOpts: {sort: false},
		padding:       0
		},
		
	  flame_shooter: {
		src:      ['data_dev/img/stage/stage-1/enemies/flame-shooter/flame-shooter-1.png',
			       'data_dev/img/stage/stage-1/enemies/flame-shooter/flame-shooter-2.png',
			       'data_dev/img/stage/stage-1/enemies/flame-shooter/flame-shooter-3.png',
			       'data_dev/img/stage/stage-1/enemies/flame-shooter/flame-shooter-4.png'],
		dest:      'data/img/stage/stage-1/enemies/flame-shooter-spritesheet.png',
		destCss:   'data/img/stage/stage-1/enemies/flame-shooter-spritesheet.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
		},
		
	  desert_knight: {
		src:      ['data_dev/img/stage/stage-1/enemies/desert-knight/desert-knight-1.png',
				   'data_dev/img/stage/stage-1/enemies/desert-knight/desert-knight-2.png',
				   'data_dev/img/stage/stage-1/enemies/desert-knight/desert-knight-freeze-1.png',
				   'data_dev/img/stage/stage-1/enemies/desert-knight/desert-knight-freeze-2.png',
				   'data_dev/img/stage/stage-1/enemies/desert-knight/desert-knight-freeze-3.png',
				   'data_dev/img/stage/stage-1/enemies/desert-knight/desert-knight-freeze-4.png'],
		dest:      'data/img/stage/stage-1/enemies/desert-knight-spritesheet.png',
		destCss:   'data/img/stage/stage-1/enemies/desert-knight-spritesheet.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
		},
		
	    lantern: {
			src:      ['data_dev/img/stage/stage-1/entities/lantern/lantern-1.png',
						'data_dev/img/stage/stage-1/entities/lantern/lantern-2.png'],
			dest:      'data/img/stage/stage-1/entities/lantern-spritesheet.png',
			destCss:   'data/img/stage/stage-1/entities/lantern.css',
			algorithm: 'left-right',
			algorithmOpts: {sort: false},
			padding: 0
		},
		
		ceiling_lamp:{
			src:      ['data_dev/img/stage/stage-1/entities/ceiling-lamp/ceiling-lamp-1.png',
						  'data_dev/img/stage/stage-1/entities/ceiling-lamp/ceiling-lamp-2.png'],
			dest:      'data/img/stage/stage-1/entities/ceiling-lamp-spritesheet.png',
			destCss:   'data/img/stage/stage-1/entities/ceiling-lamp.css',
			algorithm: 'left-right',
			algorithmOpts: {sort: false},
			padding: 0
		},
		
	   sand_shark: {
		src:      ['data_dev/img/stage/stage-1/enemies/sand-shark/sand-shark-1.png',
				   'data_dev/img/stage/stage-1/enemies/sand-shark/sand-shark-2.png',
				   'data_dev/img/stage/stage-1/enemies/sand-shark/sand-shark-3.png',
				   'data_dev/img/stage/stage-1/enemies/sand-shark/sand-shark-4.png',
				   'data_dev/img/stage/stage-1/enemies/sand-shark/sand-shark-5.png',
				   'data_dev/img/stage/stage-1/enemies/sand-shark/sand-shark-freeze-1.png',
				   'data_dev/img/stage/stage-1/enemies/sand-shark/sand-shark-freeze-2.png',
				   'data_dev/img/stage/stage-1/enemies/sand-shark/sand-shark-freeze-3.png',
				   'data_dev/img/stage/stage-1/enemies/sand-shark/sand-shark-freeze-4.png'],
		dest:      'data/img/stage/stage-1/enemies/sand-shark-spritesheet.png',
		destCss:   'data/img/stage/stage-1/enemies/sand-shark-spritesheet.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
		},
				
	  spike_trap: {
		src:       ['data_dev/img/stage/stage-1/enemies/desert-spike-trap/desert-spike-trap.png'],
		dest:      'data/img/stage/stage-1/enemies/desert-spike-trap.png',
		destCss:   'data/img/stage/stage-1/enemies/desert-spikes.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  sniper_scope:{
		src:       ['data_dev/img/stage/stage-1/enemies/sniper-scope/sniper-scope-1.png',
					'data_dev/img/stage/stage-1/enemies/sniper-scope/sniper-scope-2.png',
					'data_dev/img/stage/stage-1/enemies/sniper-scope/sniper-aim-1.png',
					'data_dev/img/stage/stage-1/enemies/sniper-scope/sniper-aim-2.png',
					'data_dev/img/stage/stage-1/enemies/sniper-scope/sniper-aim-3.png',
					'data_dev/img/stage/stage-1/enemies/sniper-scope/sniper-fire-1.png',
					'data_dev/img/stage/stage-1/enemies/sniper-scope/sniper-fire-2.png',
					'data_dev/img/stage/stage-1/enemies/sniper-scope/sniper-fire-3.png'],
		dest:      'data/img/stage/stage-1/enemies/sniper-scope-spritesheet.png',
		destCss:   'data/img/stage/stage-1/enemies/sniper-scope.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  vesperado_shadow:{
		  src:       ['data_dev/img/stage/stage-1/entities/vesperado-shadow/vesperado-shadow-1.png',
					     'data_dev/img/stage/stage-1/entities/vesperado-shadow/vesperado-shadow-2.png',
						 'data_dev/img/stage/stage-1/entities/vesperado-shadow/vesperado-shadow-eye-1.png',
						 'data_dev/img/stage/stage-1/entities/vesperado-shadow/vesperado-shadow-eye-2.png'],
		dest:      'data/img/stage/stage-1/entities/vesperado-shadow-spritesheet.png',
		destCss:   'data/img/stage/stage-1/entities/vesperado-shadow.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  vesperado:{
		src:       ['data_dev/img/stage/stage-1/enemies/vesperado/vesperado-idle-1.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-idle-2.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-turn-shoot-1.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-turn-shoot-2.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-turn-shoot-3.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-turn-shoot-4.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-teleport-1.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-teleport-2.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-teleport-3.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-teleport-4.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-teleport-5.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-death-1.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-death-2.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-death-3.png',
					'data_dev/img/stage/stage-1/enemies/vesperado/vesperado-death-4.png'],
		dest:      'data/img/stage/stage-1/enemies/vesperado-spritesheet.png',
		destCss:   'data/img/stage/stage-1/enemies/vesperado.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  s2_parrot:{
		src:       ['data_dev/img/stage/stage-2/enemies/parrot/parrot-1.png',
					'data_dev/img/stage/stage-2/enemies/parrot/parrot-2.png',
					'data_dev/img/stage/stage-2/enemies/parrot/parrot-3.png',
					'data_dev/img/stage/stage-2/enemies/parrot/parrot-4.png',
					'data_dev/img/stage/stage-2/enemies/parrot/parrot-freeze-1.png',
					'data_dev/img/stage/stage-2/enemies/parrot/parrot-freeze-2.png',
					'data_dev/img/stage/stage-2/enemies/parrot/parrot-freeze-3.png',
					'data_dev/img/stage/stage-2/enemies/parrot/parrot-freeze-4.png'],
		dest:      'data/img/stage/stage-2/enemies/parrot-spritesheet.png',
		destCss:   'data/img/stage/stage-2/enemies/parrot.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  s2_pixie:{
		src:       ['data_dev/img/stage/stage-2/enemies/pixie/pixie-1.png',
					'data_dev/img/stage/stage-2/enemies/pixie/pixie-2.png',
					'data_dev/img/stage/stage-2/enemies/pixie/pixie-3.png',
					'data_dev/img/stage/stage-2/enemies/pixie/pixie-4.png',
					'data_dev/img/stage/stage-2/enemies/pixie/pixie-5.png',
					'data_dev/img/stage/stage-2/enemies/pixie/pixie-freeze-1.png',
					'data_dev/img/stage/stage-2/enemies/pixie/pixie-freeze-2.png',
					'data_dev/img/stage/stage-2/enemies/pixie/pixie-freeze-3.png',
					'data_dev/img/stage/stage-2/enemies/pixie/pixie-freeze-4.png'],
		dest:      'data/img/stage/stage-2/enemies/pixie-spritesheet.png',
		destCss:   'data/img/stage/stage-2/enemies/pixie.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  s2_pixie_shot:{
		src:       ['data_dev/img/stage/stage-2/enemies/pixie/shot/pixie-shot-1.png',
					'data_dev/img/stage/stage-2/enemies/pixie/shot/pixie-shot-2.png'],
		dest:      'data/img/stage/stage-2/enemies/pixie-shot-spritesheet.png',
		destCss:   'data/img/stage/stage-2/enemies/pixie-shot.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  sunset_1: {
		src:    ['data_dev/img/stage/stage-1/tiles/sunset-1.png'],
		dest:    'data/img/stage/stage-1/tiles/sunset-1.png',
		destCss: 'data/img/stage/stage-1/tiles/sunset-1.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  oil_1: {
		src:    ['data_dev/img/stage/stage-1/tiles/oilbg-1.png'],
		dest:    'data/img/stage/stage-1/tiles/oilbg-1.png',
		destCss: 'data/img/stage/stage-1/tiles/oilbg-1.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  oil_2: {
		src:    ['data_dev/img/stage/stage-1/tiles/oilbg-2.png'],
		dest:    'data/img/stage/stage-1/tiles/oilbg-2.png',
		destCss: 'data/img/stage/stage-1/tiles/oilbg-2.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  oil_3: {
		src:    ['data_dev/img/stage/stage-1/tiles/oilbg-3.png'],
		dest:    'data/img/stage/stage-1/tiles/oilbg-3.png',
		destCss: 'data/img/stage/stage-1/tiles/oilbg-3.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	  elevator: {
		src:    ['data_dev/img/stage/stage-1/tiles/elevator.png'],
		dest:    'data/img/stage/stage-1/tiles/elevator.png',
		destCss: 'data/img/stage/stage-1/tiles/elevator.css',
		algorithm: 'left-right',
		algorithmOpts: {sort: false},
		padding: 0
	  },
	  
	 stage2_raft:{
		  src: ['data_dev/img/stage/stage-2/elements/raft.png'],
		  dest: 'data/img/stage/stage-2/elements/raft.png',
		  destCss: 'data/img/stage/stage-2/raft.css',
		  algorithm: 'left-right',
		  algorithmOpts: {sort: false},
		  padding: 0
	  },
	  
	  stage2_waterfall:{
			src: ['data_dev/img/stage/stage-2/elements/waterfall-1.png', 'data_dev/img/stage/stage-2/elements/waterfall-2.png'],
			dest: 'data/img/stage/stage-2/elements/waterfall-spritesheet.png',
			destCss: 'data/img/stage/stage-2/waterfall.css',
			algorithm: 'left-right',
			algorithmOpts: {sort: false},
			padding: 0
		},
		
		stage2_waterfall_base:{
			src: ['data_dev/img/stage/stage-2/elements/waterfall-base-1.png', 'data_dev/img/stage/stage-2/elements/waterfall-base-2.png'],
			dest: 'data/img/stage/stage-2/elements/waterfall-base-spritesheet.png',
			destCss: 'data/img/stage/stage-2/waterfall-base.css',
			algorithm: 'left-right',
			algorithmOpts: {sort: false},
			padding: 0
		},
		
		stage2_popout_fish:{
			src: ['data_dev/img/stage/stage-2/enemies/popout-fish/popout-fish-1.png', 'data_dev/img/stage/stage-2/enemies/popout-fish/popout-fish-2.png',
					 'data_dev/img/stage/stage-2/enemies/popout-fish/popout-fish-3.png', 'data_dev/img/stage/stage-2/enemies/popout-fish/popout-fish-4.png',
					 'data_dev/img/stage/stage-2/enemies/popout-fish/popout-fish-5.png', 'data_dev/img/stage/stage-2/enemies/popout-fish/popout-fish-6.png',
					 'data_dev/img/stage/stage-2/enemies/popout-fish/popout-fish-7.png', 'data_dev/img/stage/stage-2/enemies/popout-fish/popout-fish-8.png',
					 'data_dev/img/stage/stage-2/enemies/popout-fish/popout-fish-9.png'],
			dest: 'data/img/stage/stage-2/enemies/popout-fish-spritesheet.png',
			destCss: 'data/img/stage/stage-2/popout-fish.css',
			algorithm: 'left-right',
			algorithmOpts: {sort: false},
			padding: 0
		},
		
		stage2_ninja_cat:{
			src: ['data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-stand-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-stand-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-3.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-stand-left-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-stand-left-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-left-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-left-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-left-3.png',
					  'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-stand-right-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-stand-right-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-right-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-right-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-right-3.png',

					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-stand-up-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-stand-up-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-up-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-up-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-teleport-up-3.png',
					 
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-dying-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-dying-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-dying-3.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-dying-4.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-dying-5.png',
					 
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-1.png',  'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-3.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-left-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-left-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-left-3.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-right-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-right-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-right-3.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-up-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-up-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-teleport-up-3.png',
					 
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-stand.png',  'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-stand-up.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-stand-left.png',  'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-fake-cat-stand-right.png',
					 
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-2.png', 
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-3.png',  'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-4.png', 
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-5.png',
					 
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-3.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-4.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-5.png',
					'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-left-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-left-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-left-3.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-left-4.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-left-5.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-right-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-right-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-right-3.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-right-4.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-right-5.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-top-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-top-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-top-3.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-top-4.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-wave-top-5.png',
					 
					 
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-3.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-4.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-5.png',
					'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-left-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-left-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-left-3.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-left-4.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-left-5.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-right-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-right-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-right-3.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-right-4.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-right-5.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-top-1.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-top-2.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-top-3.png', 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-top-4.png',
					 'data_dev/img/stage/stage-2/enemies/ninja-cat/ninja-cat-flame-top-5.png'
					 
					 ],
			dest: 'data/img/stage/stage-2/enemies/ninja-cat-spritesheet.png',
			destCss: 'data/img/stage/stage-2/ninja-cat.css',
			algorithm: 'left-right',
			algorithmOpts: {sort: false},
			padding: 0
		},
		
		stage2_wavelr:{
			src: ['data_dev/img/stage/stage-2/enemies/wave/wave-right-1.png', 'data_dev/img/stage/stage-2/enemies/wave/wave-right-2.png',
				  'data_dev/img/stage/stage-2/enemies/wave/wave-left-1.png', 'data_dev/img/stage/stage-2/enemies/wave/wave-left-2.png',
				 ],
			dest: 'data/img/stage/stage-2/enemies/wave-spritesheet-lr.png',
			destCss: 'data/img/stage/stage-2/wavelr.css',
			algorithm: 'left-right',
			algorithmOpts: {sort: false},
			padding: 0
		},
		
		stage2_waveud:{
			src: ['data_dev/img/stage/stage-2/enemies/wave/wave-up-1.png', 'data_dev/img/stage/stage-2/enemies/wave/wave-up-2.png',
				  'data_dev/img/stage/stage-2/enemies/wave/wave-down-1.png', 'data_dev/img/stage/stage-2/enemies/wave/wave-down-2.png',
				  ],
			dest: 'data/img/stage/stage-2/enemies/wave-spritesheet-ud.png',
			destCss: 'data/img/stage/stage-2/waveud.css',
			algorithm: 'left-right',
			algorithmOpts: {sort: false},
			padding: 0
		},
		
		stage2_fireball:{
			src: ['data_dev/img/stage/stage-2/enemies/fireball/fireball-1.png', 
				  'data_dev/img/stage/stage-2/enemies/fireball/fireball-2.png',
				  ],
			dest: 'data/img/stage/stage-2/enemies/cat-fireball-spritesheet.png',
			destCss: 'data/img/stage/stage-2/cat-fireball.css',
			algorithm: 'left-right',
			algorithmOpts: {sort: false},
			padding: 0
		}
	},
	
	clean: {
		spritecss: ['data/**/*.css'],
		fatjs: ['js/*.js', '!js/*.min.js']
	},
	
	copy: {
	  main: {
		src: ['css/**', 'data/**', 'data_dev/**', 'js/**', 'js_dev/**', '*.*'],
		dest: 'z:/msgelee/'
	  },
	  
	  stage1_movie: {
		expand: true,
		flatten: true,
		filter:  'isFile',
		src:  ['data_dev/img/stage/stage-1/intro/*.png'],
		dest: 'data/img/stage/stage-1/intro/'
	  },
	  
	  stage2_movie:{
		expand: true,
		flatten: true,
		filter:  'isFile',
		src:  ['data_dev/img/stage/stage-2/intro/*.png'],
		dest: 'data/img/stage/stage-2/intro/'
	  },
	  
	  stage3_movie:{
		expand: true,
		flatten: true,
		filter:  'isFile',
		src:  ['data_dev/img/stage/stage-3/intro/*.png'],
		dest: 'data/img/stage/stage-3/intro/'
	  },
	  
	  title_screen_1: {
		expand:  true,
		flatten: true,
		filter:  'isFile',
		src:           ['data_dev/img/screens/title-1.png'],
		dest:          'data/img/screens/'
	  },
	  
	  title_screen_2: {
		expand:  true,
		flatten: true,
		filter:  'isFile',
		src:           ['data_dev/img/screens/title-2.png'],
		dest:          'data/img/screens/'
	  },
	  
	  
	  title_cursor: {
		expand:  true,
		flatten: true,
		src:	       ['data_dev/img/screens/title-cursor.png'],
		dest:          'data/img/screens/'
	  },
	  
	  title_name: {
		expand:  true,
		flatten: true,
		src:	       ['data_dev/img/screens/title-name.png'],
		dest:          'data/img/screens/'
	  },
	  
	  intro_screen: {
		expand:  true,
		flatten: true,
		src:           ['data_dev/img/screens/logo.png'],
		dest:          'data/img/screens/'
	  },

	  health_meter_1: {
		expand:  true,
		flatten: true,
		src:    ['data_dev/img/hud/health-meter-1.png'],
		dest:    'data/img/hud/'
	  },
	  
	  health_meter_2: {
		expand:  true,
		flatten: true,
		src:    ['data_dev/img/hud/health-meter-2.png'],
		dest:    'data/img/hud/'
	  },
	  
	  health_meter_3: {
		expand:  true,
		flatten: true,
		src:    ['data_dev/img/hud/health-meter-3.png'],
		dest:    'data/img/hud/'
	  },
	  
	  health_meter_4: {
		expand:  true,
		flatten: true,
		src:    ['data_dev/img/hud/health-meter-4.png'],
		dest:    'data/img/hud/'
	  }
	  	  
	}
  }); // The end of grunt.initConfig
  
  // We've set up each task's configuration.
  // Now actually load the tasks.
  // This will do a lookup similar to node's require() function.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  // Register our own custom task alias.
  grunt.registerTask('compile',      ['concat', 'uglify', 'clean:fatjs']);
  grunt.registerTask('compiletest',  'concat');
  grunt.registerTask('hint',         'jshint');
  grunt.registerTask('doc',          'yuidoc');
  grunt.registerTask('spritesheet',  ['imagemin', 'sprite', 'clean:spritecss']);
  grunt.registerTask('copyintros',   ['imagemin', 'copy:stage1_movie', 'copy:stage2_movie', 'copy:stage3_movie']);
  grunt.registerTask('copytitle',    ['imagemin', 'copy:title_screen_1', 'copy:title_screen_2', 'copy:title_name', 'copy:intro_screen']);
  grunt.registerTask('copyui',       ['imagemin', 'copy:health_meter_1', 'copy:health_meter_2', 'copy:health_meter_3', 'copy:health_meter_4']);
  grunt.registerTask('backup',       ['copy:main']);
};