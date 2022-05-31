/**
 * Created by GSN on 7/6/2015.
 */

var ScreenMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();


        return true;
    },

});

ScreenMenu.scene = function () {
    var scene = new cc.Scene();
    var layer = new ScreenMenu();
    scene.addChild(layer, 300);
    return scene;
};