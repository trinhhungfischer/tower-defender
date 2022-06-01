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
        var background = new Background();
        this.addChild(background);

        var map = new Map();
        map.setPosition(60, 60);
        map.scale = 1.1;
        this.addChild(map);

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