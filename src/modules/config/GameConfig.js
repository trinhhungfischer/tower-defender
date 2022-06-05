

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
    INGAME_MAP:0,
    INGAME_OBJECT: 100,
}

// Map config
MW.MAP_SIZE_WIDTH = 7;
MW.MAP_SIZE_HEIGHT = 7;
MW.MAP_OBSTACLE = 10;
MW.MAP_CELL_TYPE = {
    PATH: 0,
    OBSTACLE: 1,
}

MW.CONTAINER = {
    MAP_CELL: [],
    MAP_OBSTACLE: [],


}

