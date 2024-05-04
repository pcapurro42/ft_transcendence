// <<<<<<< 2V2 >>>>>>> //

    // < INFO STRUCT > //

    infos_2v2 = {
        canvas: null,
        /** @type {HTMLCanvasElement} */ display: null,

        game_width: 1100,
        game_height: 720,

        bar_speed: 10,

        bar_height: 100,
        bar_width: 15,

        text_size: 100,
        text_font: 'Arial',

        separator_height: 20,
        separator_width: 3,
        separator_space: 17,

        menu_color: null,
        background_color: null,
        bar_color: null
    }

    // < GAME STRUCT > //

    game_2v2 = {
        enabled: false,

        left_player_1: null,
        right_player_1: null,

        left_player_2: null,
        right_player_2: null,

        ball: null,

        scores: [0, 0],

        infos: infos_2v2
    }
