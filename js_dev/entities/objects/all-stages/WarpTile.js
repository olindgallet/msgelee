/**
 * Warp Tile
 */
 game.WarpTile = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.collidable  = true;
		this.type        = game.data.WARP_TYPE;
		this.destination = 0;
    }
 });