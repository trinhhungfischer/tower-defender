

let Cell = cc.Sprite.extend({

    xPos: null,
    yPos: null,

    ctor:function(type, xPos, yPos) {
        this._super(type);
        this.xPos = xPos;
        this.yPos = yPos;
        this.anchorX = 0.5;
        this.anchorY = 0.5;

        return true;
    },

    collideRect:function (x, y) {
        let w = this.width, h = this.height;
        return cc.rect(x, y, 0, 0);
    },

});
