
var Map = cc.Sprite.extend({

    cellWidth: null,
    cellHeight: null,

    _checkCell: [],

    ctor:function() {
        this._super();

        this._init();

        return true;
    },

    _init:function () {
        this._randomMapCell();

        for (var i = 0; i < MW.MAP_SIZE_WIDTH; i++) {
            for (var j = 0; j < MW.MAP_SIZE_HEIGHT; j++) {
                if (this._checkCell[i + j * MW.MAP_SIZE_WIDTH]) {
                    var cell = new Cell(MW.CELL_TYPE.GRASS, i, j);
                    cell.setPosition(i * cell.width, j * cell.height);
                    this.addChild(cell, MW.ZORDER.MAP);
                    MW.CONTAINER.MAP_CELL.push(cell);
                }
            }
        }

        this.cellWidth = cell.width;
        this.cellHeight = cell.height;
    },

    _randomMapCell: function () {
        for (var i = 0; i < MW.MAP_SIZE_WIDTH; i++) {
            for (var j = 0; j < MW.MAP_SIZE_HEIGHT; j++) {
                this._checkCell[i + j * MW.MAP_SIZE_WIDTH] = Math.random() < 0.5;
            }
        }
    }

});
