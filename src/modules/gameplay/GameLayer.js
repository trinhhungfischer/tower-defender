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
        // Schedule

        var background = new Background();
        this.addChild(background);

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