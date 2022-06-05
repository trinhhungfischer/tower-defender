

var Cell = cc.Sprite.extend({

    xPos: null,
    yPos: null,

    ctor:function(type, xPos, yPos) {
        this._super(type);
        this.xPos = xPos;
        this.yPos = yPos;
        this.anchorX = 0;
        this.anchorY = 0;
        return true;
    },

    collideRect:function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h / 2);
    },

});
