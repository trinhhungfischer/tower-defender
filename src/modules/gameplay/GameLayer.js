/**
 * Created by GSN on 7/9/2015.
 */

var g_sharedGameLayer;

var GameLayer = cc.Layer.extend({

    _itemMenu:null,
    _map : null,
    _deltaTime: 0,



    ctor:function() {
        this._super();
        this._init();
    },

    _init:function() {


        this._initBackground();
        this._initMap();

        this.scheduleUpdate();

        g_sharedGameLayer = this

        // preset
        Enemy.preSet();

    },


    _initBackground:function () {
        var winSize = cc.director.getWinSize();

        var background = new Background();
        background.setPositionY(winSize.height / 8);
        this.addChild(background, MW.ZORDER.BACKGROUND);
    },

    _initMap: function () {
        var winSize = cc.director.getWinSize();

        this._map = new Map();
        this._map.setPosition(winSize.width / 2 - this._map.cellWidth * Math.floor(MW.MAP_SIZE_WIDTH / 2),
            winSize.height / 5);

        this.addChild(this._map, MW.ZORDER.INGAME_MAP);
    },

    update:function (dt) {

        this._spawnEnemy(dt);
    },

    _spawnEnemy: function (dt) {

        this._deltaTime += dt;
        if (this._deltaTime > 5) {
            Enemy.getOrCreate();
            this._deltaTime = 0;

        }
    }



});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer, 400);
    return scene;
};