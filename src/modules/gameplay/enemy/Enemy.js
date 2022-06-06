/*
*
* */

var Enemy = cc.Sprite.extend({
    _moveSpeed: null,
    _hp: null,
    _damage: null,
    _type: null,
    _movePath: null,
    _currPathIndex: 0,
    _moveDirection: null,
    _moveDestination: null,
    _goal: null,

    ctor: function (type) {
        this._type = type;
        this._super();

        var path = g_sharedGameLayer._map.pathFinder(42, 6);

        cc.log(path);
    },

    _init: function () {
        this._moveSpeed = this._type.MoveSpeed;
        this._hp = this._type.BaseHP;
        this._damage = this._type.BaseDamage;

        // Set move destination and final goal position
        let goal = this._movePath[this._movePath.length - 1];

        this._currPathIndex = 0;
        let firstCell = this._movePath[this._currPathIndex];

        this.changeDirection(this._moveDirection);
        this.scheduleUpdate();
    },

    changeDirection: function (direction) {
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