

var Cell = cc.Sprite.extend({

    xPos: null,
    yPos: null,

    ctor:function(type, xPos, yPos) {
        this._super(type);
        this.xPos = xPos;
        this.yPos = yPos;
        return true;
    },




});
