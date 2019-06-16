/**
 * 
 */
 game.WaterEvent = me.ObjectEntity.extend({
    init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.collidable = true;
		this.type = game.data.WATER_TYPE;
    }
 });