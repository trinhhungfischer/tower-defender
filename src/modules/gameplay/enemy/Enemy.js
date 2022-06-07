/*
*
* */

var Enemy = cc.Sprite.extend({
    _moveSpeed: null,
    _hp: null,
    _damage: null,
    _type: null,
    _movePath: null,
    _curCellId:null,
    _curCellIdIndex: 0,
    _moveDirection: null,
    _moveDestination: null,
    _goal: null,
    _state: null,
    _isMove: false,

    ctor: function (type) {
        this._type = type;
        this._super(type.Image);
        this._init();

        g_sharedGameLayer._map.addChild(this, MW.ZORDER.INGAME_MONSTER);
    },

    _init: function () {
        this._moveSpeed = this._type.MoveSpeed;
        this._hp = this._type.BaseHP;
        this._damage = this._type.BaseDamage;


        // Set move destination and final goal position
        this._goal = g_sharedGameLayer._map.endCellId;
        this._movePath = g_sharedGameLayer._map.pathFinder(MW.MAP_START_CELL_ID, MW.MAP_END_CELL_ID);
        this._state = MW.GAME_STATE.END_PUT_TOWER;

        // Appear position
        this.x = g_sharedGameLayer._map.startPos.x;
        this.y = g_sharedGameLayer._map.startPos.y;
        this._curCellId = g_sharedGameLayer._map.startCellId;

        this.scheduleUpdate();
    },

    _updatePath:function () {
        if (this._state === MW.GAME_STATE.START_PUT_TOWER) {
            this._movePath = g_sharedGameLayer._map.pathFinder(MW.MAP_START_CELL_ID, MW.MAP_END_CELL_ID);
            this._state = MW.GAME_STATE.END_PUT_TOWER;
        }
    },

    changeDirection: function (startCellId, targetCellId) {
        if (targetCellId === startCellId + 1)
            return ENEMY.DIRECTION.RIGHT;

        if (targetCellId === startCellId + 1)
            return ENEMY.DIRECTION.RIGHT;

        if (targetCellId === startCellId + MW.MAP_SIZE_WIDTH)
            return ENEMY.DIRECTION.UP;

        if (targetCellId === startCellId - MW.MAP_SIZE_WIDTH)
            return ENEMY.DIRECTION.DOWN;

        if (targetCellId === startCellId + 1)
            return ENEMY.DIRECTION.RIGHT;

    },

    moveToCellId: function (startCellId, targetCellId, dt) {
        var startPos = MW.CONTAINER.MAP_CELL[startCellId].getPosition();
        var endPos = MW.CONTAINER.MAP_CELL[targetCellId].getPosition();

        if (!this.checkEnterCell(targetCellId)) {
            this.x += dt * (endPos.x - startPos.x) * this._moveSpeed;
            this.y += dt * (endPos.y - startPos.y) * this._moveSpeed;
        }
        else {
            this.x = endPos.x;
            this.y = endPos.y;
            this._curCellId = targetCellId;
            this._curCellIdIndex += 1;
        }
    },

    checkEnterCell: function (cellId) {
        let cell = MW.CONTAINER.MAP_CELL[cellId];
        let ax = this.x, ay = this.y, bx = cell.x, by = cell.y;

        // TODO: fix magic number here
        if (Math.abs(ax - bx) > 3 || Math.abs(ay - by) > 3)
            return false;
        return true;
    },

    collide:function (a, b) {

    },

    update: function (dt) {
        // this.updateDestination();
        // this.updateMoveDirection();
        this._updateMove(dt);
        this.checkReachedGoal();
    },

    checkReachedGoal: function () {
        if (this._curCellId == this._goal)
            this.destroy();

    },

    _updateMove: function (dt) {
        if (this._type.MoveType === ENEMY.MOVE_TYPE.DEFAULT)
            this.moveToCellId(this._movePath[this._curCellIdIndex], this._movePath[this._curCellIdIndex + 1], dt);

        },

    updateDestination: function () {
    },

    updateMoveDirection: function () {

    },

    destroy: function () {
        this.unscheduleUpdate();
        this.stopAllActions();
        this.active = false;
        this.visible = false;
        this.removeFromParent();
    },

    collideRect:function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h);
    },
});