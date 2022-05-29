// General function to work with

;(function(){
    'use strict'

    var game = {
        word: "MARCOS",
        state:1,
        guessed: ['A', 'C'],
        failed: ['B', 'J', 'K']
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
        $elem.src = './imgs/states/hm0' + game.state + '.png';

        // Getting the guessed letters

        var word = game.word;
        var guessed = game.guessed;
        $elem = $html.guessed;
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
        for (let letter of failed) {
            let $span = document.createElement('span');
            let $txt = document.createTextNode(letter);
            $span.setAttribute('class', 'type fail')
            $span.appendChild($txt);
            $elem.appendChild($span);
        }
    }
    console.log(game);
    draw(game);

}())