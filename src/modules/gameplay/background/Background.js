
var numBackGround = 5;

var Background = cc.Sprite.extend({
    active:true,

    ctor:function () {
        this._super();

        this.intiBackGround();

    },

    intiBackGround:function (){
        var winSize = cc.director.getWinSize();

        var background = cc.Sprite(res.imageBackgroundGame);
        background.setAnchorPoint(0, 0);
        background.setPosition(0, 0);
        this.addChild(background, BG.ZODER.BACKGROUND);

        var background2 = cc.Sprite(res.imageBackgroundGame2);
        background2.setAnchorPoint(0, 0)
        background2.setPosition(0, 0);
        this.addChild(background2, BG.ZODER.MAP_BACKGROUND);

    }
});