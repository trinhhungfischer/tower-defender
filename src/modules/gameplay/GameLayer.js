/**
 * Created by GSN on 7/9/2015.
 */

var g_sharedGameLayer;

var GameLayer = cc.Layer.extend({
    _itemMenu:null,

    ctor:function() {
        this._super();
        this.init();
    },

    init:function() {
        var winSize = cc.director.getWinSize();

        var background = new Background();
        background.setPositionY(winSize.height / 8);
        this.addChild(background, MW.ZORDER.BACKGROUND);

        var map = new Map();
        map.setPosition(winSize.width / 2 - map.cellWidth * Math.floor(MW.MAP_SIZE_WIDTH / 2),
            winSize.height / 5);
1
        this.addChild(map, MW.ZORDER.MAP);

        g_sharedGameLayer = this
        // preset

    },


    initBackground:function () {

    },

});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer, 400);
    return scene;
};