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
    _moveDirection: null,
    _moveDestination: null,
    _goal: null,
    _state: null,

    ctor: function (type) {
        this._type = type;
        this._super(res.imageBat);

        this._movePath = g_sharedGameLayer._map.pathFinder(MW.MAP_START_CELL_ID, MW.MAP_END_CELL_ID);

        this._state = MW.MAP_STATE.START_PUT_TOWER;

        MW.CONTAINER.MAP_CELL[MW.MAP_START_CELL_ID].addChild(this, MW.ZORDER.INGAME_MONSTER);

        this.x += g_sharedGameLayer._map.cellWidth / 2;
        this.y += g_sharedGameLayer._map.cellHeight / 2;

    },

    _init: function () {
        this._moveSpeed = this._type.MoveSpeed;
        this._hp = this._type.BaseHP;
        this._damage = this._type.BaseDamage;

        // Set move destination and final goal position
        this._movePath = g_sharedGameLayer._map.pathFinder(MW.MAP_START_CELL_ID, MW.MAP_END_CELL_ID);
        this._state = MW.GAME_STATE.END_PUT_TOWER;
    },

    _updatePath:function () {
        if (this._state === MW.GAME_STATE.START_PUT_TOWER) {
            this._movePath = g_sharedGameLayer._map.pathFinder(MW.MAP_START_CELL_ID, MW.MAP_END_CELL_ID);
            this._state = MW.GAME_STATE.END_PUT_TOWER;
        }
    },

    changeDirection: function (direction) {

    },

    moveByCellId: function (startCellId, targetCellId, dt) {
        var startPos = MW.CONTAINER.MAP_CELL[startCellId].position;
        var endPos = MW.CONTAINER.MAP_CELL[targetCellId].position;

        // this.x +=

    },

    update: function (dt) {
        this.updateDestination();
        this.updateMoveDirection();
        this.makeEnemyMove(dt);
        this.checkReachedGoal();
    },

    checkReachedGoal: function () {

    },

    updateDestination: function () {
    },

    updateMoveDirection: function () {

    },

    makeEnemyMove: function (dt) {

    },
    destroy: function () {
        this.unscheduleUpdate();
        this.stopAllActions();
        this.active = false;
        this.visible = false;
        this.removeFromParent();
    },
});