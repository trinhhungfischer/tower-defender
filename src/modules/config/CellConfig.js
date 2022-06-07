
var CELL = CELL || {};

CELL.TYPE = {
    NONE: "",
    GRASS: resMap.imageCellGrass,
    TREE_OBSTACLE: resMap.imageMapForestObstacle1,
    TREE_OBSTACLE2: resMap.imageMapForestObstacle2,
    ROCK_OBSTACLE: resMap.imageMapForestObstacle3,
}

CELL.MAP_OBJECT_MAP = null;

CELL.OBSTACLE_INDEX = [
    CELL.TYPE.TREE_OBSTACLE,
    CELL.TYPE.TREE_OBSTACLE2,
    CELL.TYPE.ROCK_OBSTACLE,

]