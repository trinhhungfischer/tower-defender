
var Map = cc.Sprite.extend({

    cellWidth: null,
    cellHeight: null,
    startPoint: null,
    endPoint: null,
    numOfObstacle: 5,

    obstacleCellId:[],
    cellObjectId:[],



    ctor:function() {
        this._super();
        this._init();

        return true;
    },

    _init:function () {

        this.cellObjectId = new Array(MW.MAP_SIZE_HEIGHT * MW.MAP_SIZE_WIDTH).fill(MW.MAP_CELL_TYPE.PATH);

        this.startPoint = this._getCellIdFromPos(0, MW.MAP_SIZE_HEIGHT - 1);
        this.endPoint = this._getCellIdFromPos(MW.MAP_SIZE_WIDTH - 1, 0);


        for (var j = 2; j <= 44; j += 7) {
            this.cellObjectId[j] = MW.MAP_CELL_TYPE.OBSTACLE;
        }
        this.cellObjectId[16] = MW.MAP_CELL_TYPE.PATH;

        cc.log("Hello" + this._pathFinder(this.startPoint, this.endPoint));

        // this._randomAllObstacles();
    },

    _randomOneObstacle: function () {
        var xPos, yPos = null;
        while (true) {
            xPos = Math.floor(Math.random() * MW.MAP_SIZE_WIDTH);
            yPos = Math.floor(Math.random() * MW.MAP_SIZE_HEIGHT);

            let curCellId = this._getCellIdFromPos(xPos, yPos);

            let nexCellId = this._getNextCell(curCellId);

            let isLegalRandomCell = true;

            for (var i = 0; i < nexCellId.length; i ++ ) {
                if (this.cellObjectId[nexCellId[i]] == MW.MAP_CELL_TYPE.OBSTACLE) {
                    isLegalRandomCell = false;
                    break;
                }
            }

            if (isLegalRandomCell) {
                this.cellObjectId[curCellId] = MW.MAP_CELL_TYPE.OBSTACLE;
                break;
            }
        }
    },

    _randomAllObstacles: function (){
        var isLegalMap = false;
        var countOfObstacle = 0;

        while (!isLegalMap && countOfObstacle < this.numOfObstacle) {
            var pastCellMapId = this.cellObjectId;

            this._randomOneObstacle();
            if (this._pathFinder(this.startPoint, this.endPoint) == null) {
                this.cellObjectId = pastCellMapId;
                continue;
            }
            else countOfObstacle ++;
        }

    },

    /*
        Hàm sẽ di chuyển từ vị trí góc trên bên trái tới góc dưới bên phải màn hình
        hay nghĩa là đi từ vị trí (0, 6) tới vị trí (6, 0)
     */


    _pathFinder: function (startCellId, targetCellId){
        var queue = [];

        var prev = new Array(MW.MAP_SIZE_WIDTH * MW.MAP_SIZE_HEIGHT);

        prev[startCellId] = null;

        queue.push({cellId : startCellId});

        var _isVisitedCell = new Array(MW.MAP_SIZE_WIDTH * MW.MAP_SIZE_HEIGHT).fill(false);

        _isVisitedCell[startCellId] = true;

        while (queue) {
            var curObject = queue.shift();

            var curCellId = curObject["cellId"];

            if (curCellId == targetCellId)
            {
                var shortestPath = []
                while (true) {
                    shortestPath.push(curCellId);
                    curCellId = prev[curCellId];
                    if (curCellId == startCellId) break;
                }
                shortestPath.push(startCellId);
                return shortestPath.reverse();
            }

            var nextCellId = this._getNextCell(curCellId);

            for (var j = 0; j < nextCellId.length; j ++) {
                var curNextCellId = nextCellId[j];

                if ((this.cellObjectId[curNextCellId] == MW.MAP_CELL_TYPE.PATH) && (!_isVisitedCell[curNextCellId])) {
                    queue.push({cellId: curNextCellId});
                    prev[curNextCellId] = curCellId;

                    _isVisitedCell[curNextCellId] = true;
                }
            }
        }

        return null;


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

    _isMaxThreeCell:function (cellId) {
        [xPos, yPos] = this._getPosFromCellId(cellId);

        if ((xPos > 0) && (xPos < MW.MAP_SIZE_WIDTH - 1) && (yPos > 0) && (yPos < MW.MAP_SIZE_WIDTH - 1)) {
            return (this._getNextCell(cellId).length >= 2);
        }
        else {
            return (this._getNextCell(cellId).length >= 1);
        }

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
