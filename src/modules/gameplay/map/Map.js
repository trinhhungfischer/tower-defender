
var Map = cc.Sprite.extend({

    cellWidth: null,
    cellHeight: null,
    startPoint: null,
    endPoint: null,

    _checkCell: [],
    _isVisitedCell: [],
    _path: [],
    _listPath:[],


    ctor:function() {
        this._super();
        this._init();

        return true;
    },

    _init:function () {
        this._randomMapCell();
        this.startPoint = this._getCellIdFromPos(0, MW.MAP_SIZE_HEIGHT - 1);
        this.endPoint = this._getCellIdFromPos(MW.MAP_SIZE_WIDTH - 1, 0);


        for (var i = 0; i < MW.MAP_SIZE_WIDTH; i++) {
            for (var j = 0; j < MW.MAP_SIZE_HEIGHT; j++) {
                this._isVisitedCell[i + j * MW.MAP_SIZE_WIDTH] = false;
            }
        }

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

        this._path.push(this.startPoint);


    },

    _randomMapCell: function () {
        for (var i = 0; i < MW.MAP_SIZE_WIDTH; i++) {
            for (var j = 0; j < MW.MAP_SIZE_HEIGHT; j++) {
                this._checkCell[i + j * MW.MAP_SIZE_WIDTH] = Math.random() < 0.5;
            }
        }
    },

    /*
        Hàm sẽ di chuyển từ vị trí góc trên bên trái tới góc dưới bên phải màn hình
        hay nghĩa là đi từ vị trí (0, 6) tới vị trí (6, 0)
     */
    _pathFinder: function (startCellId, targetCellId){

    },

    _getNextCell: function (cellId) {
        var __nextCell = [];

        var [__xPos, __yPos] = this._getPosFromCellId(cellId);

        var listCell = [[__xPos + 1, __yPos], [__xPos - 1, __yPos], [__xPos, __yPos + 1], [__xPos, __yPos - 1]];

        for (var i = 0; i < listCell.length; i ++) {
            var [__nextCellXPos, __nextCellYPos] = listCell[i];

            if (this._isLegalCell(__nextCellXPos, __nextCellYPos))
                __nextCell.push(this._getCellIdFromPos(__nextCellXPos, __nextCellYPos));
        };

        return __nextCell;
    },

    _isLegalCell: function (xPos, yPos) {
        return ((xPos >= 0) && (xPos < MW.MAP_SIZE_WIDTH) &&
            (yPos >= 0) && (yPos < MW.MAP_SIZE_WIDTH))
    },

    _getPosFromCellId: function (cellId) {
        return [cellId % MW.MAP_SIZE_WIDTH, Math.floor(cellId / MW.MAP_SIZE_WIDTH)];
    },

    _getCellIdFromPos:function (xPos, yPos) {
        return xPos + yPos * MW.MAP_SIZE_WIDTH;
    }


});
