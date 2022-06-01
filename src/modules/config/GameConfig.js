

var MW = MW || {};

//game state
MW.GAME_STATE = {
    HOME:0,
    PLAY:1,
    READY:2,
    OVER:3,
    RETRY: 4
};

MW.ZORDER = {
    BACKGROUND: -999,
    MAP:0,
    OBJECT: 100,
}

MW.CELL_TYPE = {
    GRASS: res.imageCellGrass,
}

MW.MAP_SIZE_WIDTH = 7;
MW.MAP_SIZE_HEIGHT = 7;

MW.CONTAINER = {
    MAP_CELL: [],

}