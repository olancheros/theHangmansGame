// General function to work with

;(function(){
    'use strict'

    var game = {
        word: "ALURA",
        state:1,
        guessed: ['A', 'L'],
        failed: ['B', 'J', 'K', 'C']
    }

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
        if (/[^A-ZÑ]/.test(letter)) {
            return
        }
        guess(game, letter);
        draw(game);
    }

    draw(game);

}())