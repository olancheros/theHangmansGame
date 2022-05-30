// General function to work with

;(function(){
    'use strict'

    var animalList = [
        'ABEJA',
        'AGUILA',
        'ALMEJA',
        'ARAÑA',
        'AVESTRUZ',
        'AVISP',
        'BABOSA',
        'BALLENA AZUL',
        'BISONTE',
        'BUFALO',
        'BUHO',
        'BUITRE',
        'BURRO',
        'CABALLITO DE MAR',
        'CABALLO',
        'CABRA',
        'CALAMAR',
        'CAMALEON',
        'CAMARON',
        'CAMELLO',
        'CANARIO',
        'CANGREJO',
        'CARACOL',
        'CASTOR',
        'CEBRA',
        'CERDO',
        'CHINCHE',
        'CIEMPIES',
        'CIERVO',
        'CIGARRA',
        'COBRA',
        'COCHINILLA',
        'COLIBRI',
        'COMADREJA',
        'CONDOR',
        'CONEJO',
        'CORALES',
        'CUCARACHA',
        'DELFIN',
        'ELEFANTE',
        'ERIZO',
        'ESCARABAJO',
        'ESCORPION',
        'FAISAN',
        'FLAMENCO',
        'FOCA',
        'GALLINA',
        'GALLO',
        'GARRAPATA',
        'GATO',
        'GORGOJO',
        'GORILA',
        'GRILLO',
        'GUEPARDO',
        'GUSANO',
        'HAMSTER',
        'HIENA',
        'HIPOPOTAMO',
        'HORMIGA',
        'JABALI',
        'JAGUAR',
        'JIRAFA',
        'KOALA',
        'LAGARTO',
        'LANGOSTA',
        'LANGOSTINO',
        'LAPA',
        'LARVA',
        'LEON',
        'LEON MARINO',
        'LIBELULA',
        'LLAMA',
        'LOBO',
        'LOMBRIZ',
        'LORO',
        'LUCIERNAGA',
        'MANATI',
        'MANTIS RELIGIOSA',
        'MAPACHE',
        'MARIPOSA',
        'MARIQUITA',
        'MEDUSAS',
        'MEJILLON',
        'MONO',
        'MOSCA',
        'MOSQUITO',
        'MURCIELAGO',
        'ÑANDU',
        'NUTRIA',
        'ORCA',
        'OSTRA',
        'PALOMA',
        'PANDA',
        'PATO',
        'PAVO REAL',
        'PELICANO',
        'PERRO',
        'PINGUINO',
        'PIOJO',
        'POLILLA',
        'POLIPO',
        'PUERCOESPIN',
        'PULGA',
        'PULPO',
        'PUMA',
        'RANA',
        'RATON',
        'RENO',
        'RINOCERONTE',
        'SALAMANDRA',
        'SALTAMONTES',
        'SANGUIJUELA',
        'SAPO',
        'SERPIENTE',
        'TAPIR',
        'TEJON',
        'TIBURON',
        'TIGRE',
        'TOPO',
        'TORO',
        'TUCAN',
        'VACA',
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