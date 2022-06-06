/**
 * Created by GSN on 7/9/2015.
 */

var g_sharedGameLayer;

var GameLayer = cc.Layer.extend({

    _itemMenu:null,
    _map : null,



    ctor:function() {
        this._super();
        this.init();
    },

    init:function() {
        var winSize = cc.director.getWinSize();

        var background = new Background();
        background.setPositionY(winSize.height / 8);
        this.addChild(background, MW.ZORDER.BACKGROUND);

        this._map = new Map();
        this._map.setPosition(winSize.width / 2 - this._map.cellWidth * Math.floor(MW.MAP_SIZE_WIDTH / 2),
            winSize.height / 5);

        this.addChild(this._map, MW.ZORDER.INGAME_MAP);

        g_sharedGameLayer = this

        var enemy = new Enemy(ENEMY.TYPE.LESSER);
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