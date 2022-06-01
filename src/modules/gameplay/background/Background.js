
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

        var background2 = cc.Sprite(res.imageBackgroundGameBase);
        background2.setPosition(winSize.width / 2, winSize.height / 8 + background2.height / 2);
        this.addChild(background2, BG.ZODER.MAP_BACKGROUND);

        var border_background = cc.Sprite(res.imageBackgroundGameUpperBorder);
        border_background.setAnchorPoint(0.5, 0.2);
        border_background.setPosition(winSize.width / 2, winSize.height/8);

        this.addChild(border_background, BG.ZODER.BORDER_BACKGROUND);

    }
});