
var Map = cc.Sprite.extend({

    ctor:function() {
        this._super();
        this._init();

        return true;
    },

    _init:function () {
        for (var i = 0; i < MW.MAP_SIZE_WIDTH; i++) {
            for (var j = 0; j < MW.MAP_SIZE_HEIGHT; j++) {
                var cell = cc.Sprite(MW.CELL_TYPE.GRASS);

                cell.setAnchorPoint(0, 0);
                cell.setPosition(i * cell.width, j * cell.height);

                this.addChild(cell, MW.ZORDER.MAP);
            }
        }

    }


});
