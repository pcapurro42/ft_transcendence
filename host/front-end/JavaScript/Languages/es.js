let es = [
    ["English", "inglés"],
    ["French", "francés"],
    ["Spanish", "Español"],

    ["LOG IN WITH 42", "CONECTAR CON 42"],
    ["LOG OUT", "Desconectarse"],
    ["Loading", "Cargando"],
    ["42 Security Disconnection", "Error: no se pudo verificar la identidad del usuario. ¿Estás conectado en otro dispositivo?"],
    ["Logged User Data Delete", "Los datos del usuario se eliminaron correctamente."],
    ["Statistic Storage Error", "Error: no se pudieron almacenar los datos del juego"],

    ["Anonymous", "Anon"],
    ["User Anonymization Success", "Los datos del usuario se anonimizaron con éxito."],
    ["Unanonymize Data Msg", "Vuelva a iniciar sesión para volver a habilitar los datos públicos."],

    ["Enable/Disable menu music", "Activar o desactivar la música del menú"],
    ["Enable/Disable menu sounds", "Activar o desactivar los sonidos del menú"],

    ["Enable/Disable game music", "Activar o desactivar la música del juego"],
    ["Enable/Disable game sounds", "Activar o desactivar los sonidos del juego"],

    ["Enabled", "Activado"],
    ["Disabled", "Desactivado"],

    ["Center logo title: 'Tactical Tennis Action, Metal Gear: Pong'", "Título del logotipo central: 'Tactical Tennis Action, Metal Gear: Pong'... Clic para volver al menú principal."],

    ["Play", "Jugar"],
    ["Customize", "Personalizar"],
    ["Statistics", "Estadísticas"],
    ["Settings", "Opciones"],
    ["Credits", "Créditos"],

    ["Website Settings", "Parámetros del sitio web"],
    ["Privacy Settings", "Configuración de privacidad"],

    ["Local", "Local"],
    ["Online", "Online"],
    ["History", "Histórico"],

    ["Visual", "Visual"],

    ["Games played", "Partidos jugados"],
    ["Games won", "Partidos ganados"],
    ["Games lost", "Partidos perdidos"],
    ["Ball exits", "Salidas de balón"],
    ["Ball bounces", "Rebotas de balón"],
    ["Distance covered", "Distancia recorrida"],
    ["Ball returns", "Devoluciones de balón"],
    ["Bonus taken", "Bonus recuperados"],

    ["[No available data to display]", "[No datos disponibles para visualización]"],

    ["victory", "victoria"],
    ["crushing victory", "victoria aplastante"],
    ["defeat", "derrota"],
    ["total defeat", "derrota total"],

    ["Game timelapse", "Timelapse del partido"],
    ["Game domination", "Dominio del partido"],
    ["Purple: you", "Violeta: usted"],
    ["Yellow: opponent", "Amarillo: oponente"],

    ["Purple: Games won", "Violeta: Partidos ganados"],
    ["Yellow: Games lost", "Amarillo: Partidos perdidos"],

    ["Taken", "Recuperados"],
    ["Returned", "Devueltos"],
    ["Received", "Recibidos"],
    ["Missed", "Perdidos"],

    ["Normal Mode", "Modo normal"],
    ["Bonus Mode", "Modo bonus"],
    ["Mode Switch", "Comutador de modo de juego"],
    ['Selected', 'Seleccionado'],

    ["1 vs 1 (online)", "1 vs 1 (online)"],
    ["1 vs 1 (local)", "1 vs 1 (local)"],
    ["1 vs 2 (local)", "1 vs 2 (local)"],
    ["Go!", "¡Ya!"],

    ["speed", "velocidad"],
    ["size", "tamaño"],

    ["Create a game", "Crear un partido"],
    ["Join a game", "Unirse a un partido"],
    ["Copy", "Copiar"],

    ["Launch a game", "Iniciar una partida"],
    ["Waiting for the host to launch the game...", "Esperando a que el anfitrión lance el juego..."],

    ["Left player won the game.", "El jugador de la izquierda ganó la partida."],
    ["Right player won the game.", "El jugador de la derecho ganó la partida."],
    ["Online Win", " ganó el partido!"],

    ["Left players won the game.", "Los jugadores de izquierda ganaron el partido."],
    ["Right players won the game.", "Los jugadores de derecho ganaron el partido."],

    ["Create Lobby", "Crear un Lobby"],
    ["Join Lobby", "Unirse a un lobby"],
    ["Submit", "Enviar"],
    ["Invalid alias", "Longitud del pseudónimo 4-15.(ABCabc123_-)"],
    ["Checkbox error", "Autenticarse con 42 primero."],

    ["Classic", "Clásico"],
    ["Tournament", "Torneo"],

    ["MGS 1 - Duel", "MGS 1 - Duel"],

    ["Language", "Lengua"],
    ["Sound volume", "Volumen del sonido"],
    ["Music volume", "Volumen de la música"],
    ["Text size", "Tamaño del texto"],
    ["Image description", "Descripción de la imagen"],
    ["Dark mode", "Modo oscuro"],
    ["ARIA Dark mode", "Modo oscuro"],

    ["Privacy policy", "Política de privacidad"],
    ["Website RGPD", "Este sitio web cumple el Reglamento General de Protección de Datos (RGPD) de la Unión Europea."],

    ["Privacy Policy Page", "Le invitamos a leer más en la página de política de privacidad."],

    ["Local data", "Datos locales"],
    ["Data visibility", "Visibilidad de los datos"],
    ["Online data", "Datos online"],
    ["Authorized", "Autorizado"],
    ["Not authorized", "No autorizado"],
    ["Public", "Público"],
    ["Anonymized", "Anonimizado"],
    ["Read", "Leer"],
    ["Delete", "Borrar"],

    ["Here is a list of the data currently stored on your computer:", "Aquí una lista de los datos almacenados actualmente en tu ordenador:"],

    ["– User interface informations", "– Información sobre la interfaz de usuario"],
    ["– 42 informations", "– Informaciones 42"],
    ["– Game parameters and informations", "– Informaciones y parámetros del juego"],
    ["– Local statistics", "– Estadísticas locales"],
    ["– Online statistics", "– Estadísticas online"],
    ["– History data", "– histórico de datos"],
    ["– Achievements", "– Logros"],

    ["RGPD-Intro", "Este sitio web cumple con el Reglamento General de Protección de Datos (RGPD) de la Unión Europea.\n Le invitamos a leer lo siguiente para obtener más información sobre cómo se ha creado el sitio web\n para respetar este reglamento."],

    ["RGPD-Note", "Nota: si no utiliza ninguna función en línea del sitio web (inicio de sesión con 42 y juegos en línea),\n ningún dato se almacena fuera de su ordenador ni se comparte con nadie.\n\n\n"],

    ["RGPD-Data sharing title", "¿Qué datos se comparten y por qué?"],
    ["RGPD-Data sharing", "Sólo se comparten cuatro tipos diferentes de información:\n– Direcciones IP\n– 42 inicios de sesión\n– Historico del juego y estadísticas\n– Informaciones del juego\nLos cuatros primeros se almacenan en la base de datos de nuestro sitio web para conectar a los jugadores entre sí.\nPor último, los dos primeros también se comparten entre dos personas que juegan en línea, así como\ninformaciones del juego para permitir la sincronización del juego."],

    ["RGPD-Data time title", "¿Durante cuánto tiempo se almacenan los datos?"],
    ["RGPD-Data time", "Por muy poco tiempo.\n\nTodos los datos se borran cuando se reinicia el sitio web\n, lo que ocurre regularmente (al menos varias veces al día)."],

    ["RGPD-User action title", "¿Cómo puedo interactuar con mis datos?"],
    ["RGPD-User action", "De conformidad con el GDPR, tiene a su disposición tres opciones:\n– Anonimizar sus datos\n– Eliminar sus datos en línea\n– Eliminar sus datos locales\n\nEn cuanto lo solicite, estas directivas entrarán en vigor.\n Todo se puede hacer en el menú de configuración."],

    ["Game theme", "Tema del juego"],
    ["Game map", "Mapa del juego"],
    ["Red", "Rojo"],
    ["Orange", "Naranja"],
    ["Purple", "Violeta"],

    ["Default", "- Predeterminado -"],

    ["Enabled", "Activado"],
    ["Disabled", "Desactivado"],

    ['Main Menu', "Menú principal"],
    ['Continue', "Seguir"],
    ["Back", "Atrás"],
    ["Yes", "Sí"],
    ["No", "No"],

    ["Normal", "Normal"],
    ["Large", "Grande"],

    ["Create a tournament", "Crear un torneo"],
    ["Join a tournament", "Unirse a un torneo"],
    ["Tournament nickname", "Pseudónimo"],
    ["Select Tournament Type", "– Tipo de torneo –"],
    ["Tournament Type", "Tipo de torneo"],
    ["Sixteen", "Octavos de final (16 jugadores)."],
    ["Eight", "Cuartos de final (8 jugadores)."],
    ["Four", "Semifinal (4 jugadores)."],
    ["Duplicate Nickname", "Atención: varios pseudónimos están duplicados. \n Por favor, elige pseudónimos únicos."],
    ["Round of 16","Octavos de final"],
    ["Final 8","Cuartos de final"],
    ["Final 4","Semifinal"],
    ["Final","Final"],
    ["1st Game", "Primero partido"],
    ["2nd Game", "Segundo partido"],
    ["3rd Game", "Tercero partido"],
    ["4th Game", "Cuarto partido"],
    ["5th Game", "Quinto partido"],
    ["6th Game", "Sexto partido"],
    ["7th Game", "Séptimo partido"],
    ["8th Game", "Octavo partido"],
    ["Next Game", "Próximo partido"],
    ["Tournament Win Msg","Mision cumplida"],
    ["Congratulations"," Felicitaciones"],
    ["Restart Tournament", "Reiniciar el torneo"],

    ["Leaderboard", "Clasificacion"],
    ["Qualified", " ¡está clasificado!\n"],
    ["Eliminated", "fue derrotado."],

    ['Peer offer send msg', "Envía este código a un amigo \n para empezar un partido."],

    ['Init Connection Msg', 'Una vez que tu amigo haya enviado el\ncódigo, clic en el botón de arriba.'],
    ['Connect', 'Conectarse'],

    ['Paste Code Msg', 'Por favor, pega el código de invitación proporcionado \n por tu amigo para empezar una partida online.'],

    ["Peer Connection Success", "Conectado con éxito a "],
    ["Peer Connection Warning", "Intentando conectar con peer remoto."],
    ["Peer Connection Alert", "Error en la conexión con peer remoto."],
    ["Peer Connection Timeout", "Tiempo de conexión agotado... Por favor, reinicie el proceso."],
    ["Peer 404", "Error: fallo de conexión. Asegúrese de que todos los pares están listos y de que el código de invitación es válido."],
    ["Peer fetch answer", "Error: No se han podido enviar sus datos al servidor."],
    ["Peer fetch offer", "Error: No se ha podido recuperar la información de otro peer."],
    ["Same Player Error", "Snake, sé que estás acostumbrado a los clones, pero eso no es motivo para jugar contra ti mismo..."],

    ["Connection Init Failed", "Error en la generación del código de invitación... Por favor, reinicie el proceso."],
    ["Answer Timeout", ` segundos antes de que expire el código.`],
    ["Code Expired", `El código ha expirado. Por favor, reinicie el proceso.`],

    ["Wrong Code Format", "Error: peer envió datos no aprobados. Ventana de conexión cerrada."],
    ["Wrong Code Guest", "Error: el código de la invitación está mal formateado."],

    ['Disconnected', "⚠︎ Perdí la conexión con el peer..."],
    ['Disconnection Msg', "¡Perdón!. Parece que hay un problema de conexión. Comprueba las redes de ambos peers e inténtalo de nuevo."],
    ['Waiting Lobby Creation', "Esperando la creación del lobby de "],
    ['Please Create Lobby', 'Clic en el botón de crear lobby para iniciar una partida con '],

    ["42 Auth Success", "¡Se ha conectado correctamente ! Bienvenido "],
    ["42 Auth Failure", "Conexión fallida."],
    ["Copy Success", "Copiado correctamente en el portapapeles."],
    ["Switch to Visual", "¡Cambia primero a visual !"],

    ['/home', '/inicio'],
    ['Home', 'Metal Gear Pong'],
    ['/play', '/jugar'],
    ['/classic', '/clasico'],
    ['/online', '/online'],
    ['/create-lobby', '/crear-lobby'],
    ['/join-lobby', '/unirse-lobby'],
    ['/online-game', '/online-partido'],
    ['/1vs1', '/1-vs-1'],
    ['/1vs2', '/1-vs-2'],
    ['/tournament', '/torneo'],
    ['/tournament-nicknames', '/torneo-pseudonimo'],
    ['/tournament-game', '/torneo-partido'],
    ['Tournament Game', 'Partido del torneo'],
    ['/tournament-leaderboard', '/torneo-clasificacion'],
    ['Online Game', 'Online - Partido'],
    ["Tournament - Nicknames", "Torneo - Pseudónimos"],
    ['/customize', '/personalizar'],
    ['/statistics', '/estadísticas'],
    ['/game-history', '/partido-historico'],
    ['Game History', 'Historico del partido'],
    ['/local-stats', '/local-estadisticas'],
    ['/online-stats', '/online-estadisticas'],
    ['/settings', '/opciones'],
    ['/credits', '/creditos'],
    ['/privacy', '/privacidad'],
    ['/privacy-settings', '/privacidad-opciones'],

    ['Local Stats', 'Estadísticas - local'],
    ['Online Stats', 'Estadísticas - online'],

    ['Refresh Alert Tournament', 'Atención: Después de un reshrefing, no es posible volver al torneo.'],
    ['Refresh Alert Online', 'Atención : Al actualizar la página se interrumpe la conexión.'],
    ['Refresh Warning', 'Atención: Al actualizar esta página se perderán todos sus datos.'],
    ['Leaving Popup', '¿Seguro que quieres irte?'],
    ['Leaving msg', 'Si abandona esta página, perderá todos sus datos.'],
    ['Confirm', 'Confirmar'],
    ['Resume', 'Reanudar'],

    ["Light Switch Off", "Modo oscuro"],
    ["Light Switch On", "Modo luminoso"],
    ["Small text", "Tamaño del texto: Normal"],
    ["Large text", "Tamaño del texto: Grande"],

    ["ARIA 42", "Conéctese con 42. Este botón le redirigirá a la página de inicio de conexión con 42."],
    ["ARIA stats", "Cuadro de estadísticas del juego."],
    ["Next stat page", "Página siguiente de estadísticas."],
    ["Prev stat page", "Página anterior de estadísticas."],
    ["ARIA 1 vs 1 (online)", "Cuadro del juego: 1 vs 1 (online)"],
    ["ARIA 1 vs 1 (local)", "Cuadro del juego: 1 vs 1 (local)"],
    ["ARIA 1 vs 2 (local)", "Cuadro del juego: 1 vs 2 (local)"],
    ["ARIA Tournament Match", "Cuadro del juego : 1 vs 1... Partido de torneo (local)."],
    ["ARIA Tournament Type", "Seleccionar el tipo de torneo que desea jugar."],
    ["ARIA Theme Selector", "Seleccionar el tema musical que se escuchará en el juego."],
    ["ARIA Map Selector", "Seleccionar el mapa que se utilizará en el juego."],
    ["ARIA Language Selector", "Seleccionar una lengua para el sitio web."],
    ["ARIA Tournament Nick Form", "Formulario para el pseudónimo del jugador del torneo."],
    ["ARIA Tournament Form Label", "Jugador"],
    ["ARIA Login Dropdown", "Menú de cuenta"],
    ["ARIA Textsize Selector", "Seleccionar el tamaño del texto de la página web."],
    ["ARIA Settings Slide Right", "Pestaña de la configuración de privacidad"],
    ["ARIA Settings Slide Left", "Pestaña de las estadísticas generales."],
    ["ARIA Credits Close", "Cerrar los créditos, volver al menú principal.."],
    ["ARIA Credits Video", "Vídeo de los créditos, donde podemos escuchar la voz de Cynthia Harrell cantando Snake Eater, la BSO homónima de Metal Gear Solid 3. Gracias de nuevo a pcapurro y Bgales por su magnífico trabajo."],
    ["ARIA Online Stats Diagram", "Gráficos de estadísticas online. Desactiva la visualización para obtener las estadísticas."],
    ["ARIA History Data", "Histórico online..."],
    ["ARIA History Time Data", "Timelapse de los goles marcados. Desafortunadamente, esta estadística no está disponible para lectores de pantalla."],
    ["ARIA History Diagram", "Diagrama de dominación del partido..."],
    ["ARIA Close Leaderboard", "Cerrar la clasificación"],
    ["ARIA Close sidebar", "Cerrar el menú de navegación"],
    ["ARIA Invalid Alias", "Pseudónimo mal formateado.\nPor favor, introduzca un pseudónimo usando de 4 a 15 caracteres.\nLos caracteres aceptados son letras mayúsculas y minúsculas,\n números, guión y guión bajo."],
    ["ARIA Sidebar Menu", "Menú de navegación"],
    ["ARIA Github_p", "Visitar el github page de Patrick"],
    ["ARIA Github_b", "Visitar el github page de Benjamin"],
    ["ARIA disco modal", "Desconexión inesperada"],
    ["ARIA leaving modal", "Saliendo de la página de confirmación."],
    ["ARIA localstorage modal", "Datos guardados"],
    ["ARIA Close CQC", "Ocultar video inferior"],
    ["ARIA Open CQC", "Mostrar video inferior"],

    ["You Won", "Usted ha ganado"],
    ["You Lose", "Usted ha perdido"],
    ["Top Logo Alt", "Logotipo del sitio web: Tactical Tennis Action Metal Gear Pong. Volver al menú principal."],

    ["Keyboard Y Tuto", "Tecla Y de teclado, informa al jugador de arriba a la derecha de que esta entrada se utiliza para subir en el juego."],
    ["Keyboard H Tuto", "Tecla H de teclado, informa al jugador de arriba a la derecha de que esta entrada se utiliza para bajar en el juego."],
    ["Keyboard E Tuto", "Tecla E del teclado, informa al jugador de la izquierda que, esta entrada se utiliza para subir en el juego."],
    ["Keyboard D Tuto", "Tecla D del teclado, informa al jugador de la izquierda de que esta entrada se utiliza para bajar en el juego."],
    ["Keyboard O Tuto", "Tecla O del teclado, informa al jugador de la derecha de que esta entrada se utiliza para subir en el juego."],
    ["Keyboard L Tuto", "Tecla L del teclado, informa al jugador de la derecha de que esta entrada se utiliza para bajar en el juego."],
    ["Keyboard O Tuto 2v1", "Tecla O del teclado, informa al jugador de abajo a la derecha de que esta entrada se utiliza para subir en el juego."],
    ["Keyboard L Tuto 2v1", "Tecla L del teclado, informa al jugador de abajo a la derecha de que esta entrada se utiliza para bajar en el juego."],

    ["Music Icon", "Icono de música. Clic para activar o desactivar la música."],
    ["Sound Icon", "Icono de sonido. Clic para activar o desactivar el sonido."],

    ["Map Tooltip", "Previsualización de la mapa actualmente seleccionada."],

    ["Copy Inv Code", "Copiar el código de invitación."],
    ["Submit Inv Code", "Enviar el código de invitación."],

    ["Your Domination", "Usted dominó el juego hasta"],
    ["Opponent Domination", "El oponente dominó el partido hasta"],
    ["Seconds", "Segundos"],
    ["Game Duration", "El partido el partido de tenis duró aproximadamente "],
    ["Enable Sounds Error", "Snake, ¡tienes que interactuar con el sitio web para escuchar los sonidos!"],
    ["Unauthorized Data Channel", "Error: la conexión se cerró por razones de seguridad. Se detectó un mensaje inesperado dentro del data_channel."],
    ["Forbidden Page", "¡Snake, tienes que iniciar sesión para utilizar esta sección del sitio web!"],

    ["Konami Code detected!", "Konami Code detectado!"],
    ["« Engravings, gives you no tactical advantage whatsoever... »", "« Engravings, gives you no tactical advantage whatsoever... »"],
    ["— Jack, in 'Snake Eater' (1974)", "— Jack, 'Snake Eater' (1974)"],
    ["'PowerUp', « a weapon to surpass Metal Gear... »", "'PowerUp', « a weapon to surpass Metal Gear... »"],

    ["Achievement unlocked!", "  – ¡Logro desbloqueado!"],
    ["You've played your first local game.", "Has jugado su primer partido local."],
    ["You've watched the credits.", "Has visto los créditos."],
    ["You typed the Konami Code.", "Has tecleado el Konami Code."]
];
