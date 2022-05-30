// General function to work with

;(function(){
    'use strict'

    var animalList = [
    'ABEJA',
    'ABEJORRO',
    'AGUILA',
    'AJOLOTE',
    'ALBATROS',
    'ALCE',
    'ALMEJA',
    'ANGUILA ELECTRICA',
    'ANTILOPE',
    'ARAÑA',
    'ARDILLA',
    'ARMADILLO',
    'ARMIÑO',
    'ASCIDIAS',
    'AVESTRUZ',
    'AVISPA',
    'AVOCETA',
    'BABOSA',
    'BABUINO',
    'BALLENA AZUL',
    'BARBO',
    'BARRACUDA',
    'BISONTE',
    'BUFALO',
    'BUHO ',
    'BUITRE',
    'BURRO',
    'CABALLITO DE MAR',
    'CABALLO',
    'CABRA',
    'CACHALOTE',
    'CAIMAN',
    'CALAMAR',
    'CAMALEON',
    'CAMARON',
    'CAMELLO',
    'CANARIO',
    'CANGREJO',
    'CANGURO',
    'CAPIBARA',
    'CARACOL',
    'CASTOR',
    'CASUARIO',
    'CEBRA',
    'CERDO',
    'CHACAL',
    'CHIMPANCE',
    'CHINCHE',
    'CHINCHILLA',
    'CIEMPIES',
    'CIERVO',
    'CIGARRA',
    'CIGÜEÑA',
    'CISNE',
    'CIVETA',
    'COATI',
    'COBAYA',
    'COBRA',
    'COCHINILLA',
    'COCODRILO',
    'CODORNIZ',
    'COLIBRI',
    'COMADREJA',
    'CONDOR',
    'CONEJO',
    'CORAL',
    'COYOTE',
    'CUCARACHA',
    'DELFIN',
    'DEMONIO DE TASMANIA',
    'DINGO',
    'DODO',
    'DRAGON DE KOMODO',
    'DUGONGO',
    'ELEFANTE',
    'EMU',
    'ERIZO',
    'ESCARABAJO',
    'ESCORPION',
    'ESPONJAS DE MAR',
    'ESTRELLA DE MAR',
    'FAETON',
    'FAISAN',
    'FLAMENCO',
    'FOCA',
    'FREGATA',
    'GALLINA',
    'GALLO',
    'GAMBA',
    'GANSO',
    'GARRAPATA',
    'GARZA',
    'GATO',
    'GAVIAL',
    'GECKO',
    'GLOTON',
    'GORGOJO',
    'GORILA',
    'GORRION',
    'GRILLO',
    'GRULLA',
    'GUACAMAYA',
    'GUEPARDO',
    'GUSANO',
    'HALCON',
    'HAMSTER',
    'HIENA',
    'HIPOPOTAMO',
    'HORMIGA',
    'HURON',
    'IBIS',
    'IGUANA',
    'IMPALA',
    'INDRI',
    'JABALI',
    'JAGUAR',
    'JIRAFA',
    'KAKAPO',
    'KIWI',
    'KOALA',
    'LABRIDAE',
    'LAGARTO',
    'LANGOSTA',
    'LANGOSTINO',
    'LAPA',
    'LARVA',
    'LECHUZA',
    'LEMUR',
    'LEON',
    'LEON MARINO',
    'LEOPARDO',
    'LIBELULA',
    'LIEBRE',
    'LINCE',
    'LLAMA',
    'LOBO',
    'LOMBRIZ',
    'LORO',
    'LUCIERNAGA',
    'LUCIO',
    'MANATI',
    'MANDRIL',
    'MANGOSTA',
    'MANTARRAYA',
    'MANTIS RELIGIOSA',
    'MAPACHE',
    'MARIPOSA',
    'MARIQUITA',
    'MEDUSA',
    'MEJILLON',
    'MILPIES',
    'MIRLO COMUN',
    'MOFETA',
    'MOLLY',
    'MONO',
    'MORENA',
    'MORSA',
    'MOSCA',
    'MOSQUITO',
    'MULA',
    'MURCIELAGO',
    'MUSARAÑA',
    'ÑANDU',
    'ÑU',
    'NUMBAT',
    'NUTRIA',
    'OCELOTE',
    'ORANGUTAN',
    'ORCA',
    'ORNITORRINCO',
    'OROPENDOLA',
    'ORUGA',
    'OSO',
    'OSTRA',
    'OVEJA',
    'PAJARO CARPINTERO',
    'PALOMA',
    'PANDA',
    'PANTERA NEGRA',
    'PATO',
    'PAVO',
    'PAVO REAL',
    'PELICANO',
    'PERAMELIDO',
    'PERCEBE',
    'PEREZOSO',
    'PERRO',
    'PEZ',
    'PINGUINO',
    'PIOJO',
    'PIRAÑA',
    'POLILLA',
    'POLIPO',
    'POLLO',
    'PROTEO',
    'PUERCOESPIN',
    'PULGA',
    'PULPO',
    'PUMA',
    'QUETZAL',
    'RANA',
    'RATA',
    'RATON',
    'RAYA',
    'RENO',
    'RINOCERONTE',
    'RORCUAL',
    'RUISEÑOR',
    'SALAMANDRA',
    'SALTAMONTES',
    'SANGUIJUELA',
    'SAPO',
    'SEPIA',
    'SERPIENTE',
    'SURICATO',
    'TAPIR',
    'TECKLE',
    'TEJON',
    'TERMITA',
    'TIBURON',
    'TIGRE',
    'TOPO',
    'TORO',
    'TORTUGA',
    'TUCAN',
    'URRACA',
    'VACA',
    'WOMBAT',
    'ZAPATERO',
    'ZARIGÜEYA',
    'ZORRILLO',
    'ZORRO'
]

    var game = null;
    var finalized = false;

    var $html = {
        man: document.getElementById('man'),
        guessed: document.querySelector('.guessed'),
        failed: document.querySelector('.failed')
    }

    function draw(game) {
        // This function will update the hangman's game accordingly

        var $elem;
        $elem = $html.man;

        var state = game.state;
        if (state == 8) {
            state = game.prev;
        }
        $elem.src = './imgs/states/hm0' + state + '.png';

        // Getting the guessed letters

        var word = game.word;
        var guessed = game.guessed;
        $elem = $html.guessed;
        $elem.innerHTML = '';  // Clean the screen

        for (let letter of word) {
            let $span = document.createElement('span');
            let $txt = document.createTextNode('');
            if (guessed.indexOf(letter) >= 0) {
                $txt.nodeValue = letter;
            }
            $span.setAttribute('class', 'type guess');
            $span.appendChild($txt);
            $elem.appendChild($span);
        }

        // Getting the failed letters

        var failed = game.failed;
        $elem = $html.failed;
        $elem.innerHTML = '';  // Clean the screen

        for (let letter of failed) {
            let $span = document.createElement('span');
            let $txt = document.createTextNode(letter);
            $span.setAttribute('class', 'type fail')
            $span.appendChild($txt);
            $elem.appendChild($span);
        }
    }

    // Function to get the different game options while playing the game

    function guess(game, letter) {
        var state = game.state;
        if (state == 1 || state == 8) {
            return;
        }

        var guessed = game.guessed;
        var failed = game.failed;
        if (guessed.indexOf(letter) >= 0 || failed.indexOf(letter) >= 0) {
            return;
        }

        var word = game.word;
        if (word.indexOf(letter) >= 0) {
            let won = true;
            for (let lttr of word) {
                if (guessed.indexOf(lttr) < 0 && lttr != letter) {
                    won = false;
                    game.prev = game.state;
                    break;
                }
            }
            // If already won, it's ratified
            if (won) {
                game.state = 8;
            }
            // Push the letter into the list of guessed letters
            guessed.push(letter);
        }   else {
            // If the letter doesn't belongs to the word, the man gets closer to the gallows
            game.state--;
            // Push the letter into the list of wrong letters
            failed.push(letter);
        }
    }

    window.onkeypress = function guessLetter(e) {
        var letter = e.key;
        letter = letter.toUpperCase();
        if (/[^A-ZÑ ]/.test(letter)) {
            return
        }

        guess(game, letter);
        var state = game.state;
        if (state == 8 && !finalized) {
            setTimeout(winMsgAlert, 500)
            finalized = true;
        } else if (state == 1 && !finalized) {
            let word = game.word;
            let fn = failMsgAlert.bind(undefined, word);
            setTimeout(fn, 500);
            finalized = true;
        }
        draw(game);
    }

    window.newGame = function newGame() {
        var word = randomWord();
        game = {};
        game.word = word;
        game.state = 7;
        game.guessed = [];
        game.failed = [];
        finalized = false;
        draw(game);
        console.log(game);
    }

    window.quitGame = function quitGame() {
        var state = game.state
        if (state !=  7  && state != 1 && !finalized) {
            let word = game.word;
            let fn = quitMsgAlert.bind(undefined, word);
            setTimeout(fn, 500);
            finalized = true;
        }
    }

    function randomWord() {
        var index = Math.trunc(Math.random() * animalList.length);
        return animalList[index];
    }

    function winMsgAlert() {
        alert("Congratulations, you have won!")
    }

    function failMsgAlert(word) {
        alert("Sorry, you have lost... The right word was: " + word)
    }

    function quitMsgAlert(word) {
        alert("Loser, you have quit... The right  word was: "  + word)
    }

    newGame();

}())