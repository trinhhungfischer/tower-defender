
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
        background.setPosition(winSize.width / 2, winSize.height/2);
        this.addChild(background, BG.ZODER.BACKGROUND);

        var background2 = cc.Sprite(res.imageBackgroundGame2);
        background2.setPosition(winSize.width / 2, 0);
        this.addChild(background2, BG.ZODER.MAP_BACKGROUND);

    }
});