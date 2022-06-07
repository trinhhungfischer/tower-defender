
var Map = cc.Node.extend({

    cellWidth: null,
    cellHeight: null,
    startCellId: null,
    endCellId: null,
    startPos: null,
    endPos: null,
    numOfObstacle: MW.MAP_OBSTACLE,

    obstacleCellId:[],
    cellObjectId:[],

    ctor:function() {
        this._super();
        this._init();

        return true;
    },

    _init:function () {

        this.cellObjectId = new Array(MW.MAP_SIZE_HEIGHT * MW.MAP_SIZE_WIDTH).fill(MW.MAP_CELL_TYPE.PATH);

        this.startCellId = this.getCellIdFromPos(0, MW.MAP_SIZE_HEIGHT - 1);
        this.endCellId = this.getCellIdFromPos(MW.MAP_SIZE_WIDTH - 1, 0);


        this._randomAllObstacles();

        this._initCell();

        this._initStableObject();

    },

    _initStableObject: function () {
        let startCell = cc.Sprite(resMap.imageMonsterGatePlayer);
        startCell.setAnchorPoint(0, 0);
        MW.CONTAINER.MAP_CELL[this.startCellId].addChild(startCell, MW.ZORDER.INGAME_GATE);
        startCell.y += this.cellHeight;

        let endCell = cc.Sprite(resMap.imageMapHouse);
        endCell.setAnchorPoint(0, 0);
        MW.CONTAINER.MAP_CELL[this.endCellId].addChild(endCell, MW.ZORDER.INGAME_GATE);
    },

    _initCell: function () {
        for (let i = 0; i < MW.MAP_SIZE_HEIGHT; i++) {
            for (let j = 0; j < MW.MAP_SIZE_WIDTH; j ++) {

                var cellId = this.getCellIdFromPos(j, i);

                var cell = new Cell(CELL.TYPE.GRASS, j, i);

                this.addChild(cell, MW.ZORDER.INGAME_CELL);

                cell.setPosition(j * cell.width, i * cell.height);

                if (cellId === this.startCellId)
                    this.startPos = cell.getPosition();

                if (cellId === this.endCellId)
                    this.endPos = cell.getPosition();

                MW.CONTAINER.MAP_CELL.push(cell);

                if (this.cellObjectId[cellId] === MW.MAP_CELL_TYPE.OBSTACLE)
                {
                    let randomIndex = Math.floor(Math.random() * CELL.OBSTACLE_INDEX.length);

                    var obstacle = new Cell(CELL.OBSTACLE_INDEX[randomIndex], j, i);
                    obstacle.setAnchorPoint(0, 0);
                    cell.addChild(obstacle, MW.ZORDER.INGAME_CELL);
                    MW.CONTAINER.MAP_OBSTACLE.push(cell);
                }

            }
        }

        this.cellWidth = cell.width;
        this.cellHeight = cell.height;
    },

    _randomOneObstacle: function () {
        var xPos, yPos = null;
        while (true) {
            xPos = Math.floor(Math.random() * MW.MAP_SIZE_WIDTH);
            yPos = Math.floor(Math.random() * MW.MAP_SIZE_HEIGHT);

            let curCellId = this.getCellIdFromPos(xPos, yPos);

            if (curCellId === this.startCellId || curCellId === this.endCellId)
                continue;

            let nexCellId = this.getNextCell(curCellId);

            let isLegalRandomCell = true;

            for (var i = 0; i < nexCellId.length; i ++ ) {
                if (this.cellObjectId[nexCellId[i]] === MW.MAP_CELL_TYPE.OBSTACLE) {
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
        var countOfObstacle = 0;

        while (countOfObstacle < this.numOfObstacle) {
            var pastCellMapId = this.cellObjectId;

            this._randomOneObstacle();
            if (this.pathFinder(this.startCellId, this.endCellId) == null) {
                this.cellObjectId = pastCellMapId;
            }
            else countOfObstacle ++;
        }

        return countOfObstacle;

    },

    /*
        Hàm sẽ di chuyển từ vị trí góc trên bên trái tới góc dưới bên phải màn hình
        hay nghĩa là đi từ vị trí (0, 6) tới vị trí (6, 0)
     */


    pathFinder: function (startCellId, targetCellId){
        var queue = [];

        var prev = new Array(MW.MAP_SIZE_WIDTH * MW.MAP_SIZE_HEIGHT);

        prev[startCellId] = null;

        queue.push(startCellId);

        var _isVisitedCell = new Array(MW.MAP_SIZE_WIDTH * MW.MAP_SIZE_HEIGHT).fill(false);

        _isVisitedCell[startCellId] = true;

        while (queue) {
            var curCellId = queue.shift();

            if (curCellId == null) break;

            if (curCellId === targetCellId)
            {
                var shortestPath = []
                while (true) {
                    shortestPath.push(curCellId);
                    curCellId = prev[curCellId];
                    if (curCellId === startCellId) break;
                }
                shortestPath.push(startCellId);
                return shortestPath.reverse();
            }

            var nextCellId = this.getNextCell(curCellId);

            for (var j = 0; j < nextCellId.length; j ++) {
                var curNextCellId = nextCellId[j];

                if ((this.cellObjectId[curNextCellId] === MW.MAP_CELL_TYPE.PATH) && (!_isVisitedCell[curNextCellId])) {
                    queue.push(curNextCellId);
                    prev[curNextCellId] = curCellId;
                    _isVisitedCell[curNextCellId] = true;
                }
            }

        }

        return null;
    },

    getNextCell: function (cellId) {
        var __nextCell = [];

        var [__xPos, __yPos] = this.getPosFromCellId(cellId);

        var listCell = [[__xPos + 1, __yPos], [__xPos - 1, __yPos], [__xPos, __yPos + 1], [__xPos, __yPos - 1]];

        for (var i = 0; i < listCell.length; i ++) {
            var [__nextCellXPos, __nextCellYPos] = listCell[i];

            if (this._isLegalCell(__nextCellXPos, __nextCellYPos))
                __nextCell.push(this.getCellIdFromPos(__nextCellXPos, __nextCellYPos));
        }

        return __nextCell;
    },

    _isMaxThreeCell:function (cellId) {
        [xPos, yPos] = this.getPosFromCellId(cellId);

        if ((xPos > 0) && (xPos < MW.MAP_SIZE_WIDTH - 1) && (yPos > 0) && (yPos < MW.MAP_SIZE_WIDTH - 1)) {
            return (this.getNextCell(cellId).length >= 2);
        }
        else {
            return (this.getNextCell(cellId).length >= 1);
        }

    },

    _isLegalCell: function (xPos, yPos) {
        return ((xPos >= 0) && (xPos < MW.MAP_SIZE_WIDTH) &&
            (yPos >= 0) && (yPos < MW.MAP_SIZE_WIDTH))
    },

    getPosFromCellId: function (cellId) {
        return [cellId % MW.MAP_SIZE_WIDTH, Math.floor(cellId / MW.MAP_SIZE_WIDTH)];
    },

    getCellIdFromPos:function (xPos, yPos) {
        return xPos + yPos * MW.MAP_SIZE_WIDTH;
    }
});