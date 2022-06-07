
var ENEMY = ENEMY || {};

ENEMY.DIRECTION = {
    UP: 1,
    DOWN: 2,
    RIGHT: 3,
    LEFT: 4,
    UP_RIGHT: 5,
    DOWN_RIGHT: 6,
    UP_LEFT: 7,
    DOWN_LEFT: 8,
}

ENEMY.TYPE = {
    LESSER : {
        Image: res.imageLesser,
        MoveSpeed: 1,
        BaseHP: 100,
        BaseDamage: 5,
        MoveType: 1,

    },

    BAT: {
        Image: res.imageBat,
        MoveSpeed: 1,
        BaseHP: 100,
        BaseDamage: 5,
        MoveType: 1,

    },

    CAPTAIN: {
        Image: res.imageCaptain,
        MoveSpeed: 0.5,
        BaseHP: 1000,
        BaseDamage: 20,
        MoveType: 1,

    }
}

ENEMY.ENEMY_INDEX = [
    ENEMY.TYPE.LESSER,
    ENEMY.TYPE.BAT,
    ENEMY.TYPE.CAPTAIN,
]


ENEMY.MOVE_TYPE = {
    DEFAULT: 1,
    PASS: 2,
}

