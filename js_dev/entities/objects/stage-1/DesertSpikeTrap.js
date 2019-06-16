/**
 * Desert Spikes
 */
game.DesertSpikeTrap = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("desert-spike-trap"),
            64, 64
        );
		this.renderable.offset.set(0, 0);
		settings.image = this.renderable.image;
		settings.spritewidth  = 64;
		settings.spriteheight = 64;
        this.parent(x, y, settings);
		this.collidable = true;
		this.type = game.data.DEATH_TYPE;
    }
});