
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

        var ratio = winSize.height / background.height;

        background.setAnchorPoint(0, 0);
        background.setPosition(0, 0);
        background.scale = ratio;
        this.addChild(background, BG.ZODER.BACKGROUND);

        var background2 = cc.Sprite(res.imageBackgroundGameBase);
        var ratio = winSize.width / background2.width;
        background2.setPosition(winSize.width / 2, winSize.height / 8 + background2.height / 2);
        background2.scale = ratio;
        this.addChild(background2, BG.ZODER.MAP_BACKGROUND);

        var border_background = cc.Sprite(res.imageBackgroundGameUpperBorder);
        border_background.setPosition(winSize.width / 2, winSize.height/8 + border_background.height / 2);
        border_background.scale = ratio;
        this.addChild(border_background, BG.ZODER.MAP_BACKGROUND);

    }
});