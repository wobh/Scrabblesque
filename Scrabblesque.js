// Scrabblesque
// Scabble-like game in javascript

var Scrabblesque = (function() {

    var letter_scores = {
	'a':  1, 'e':  1, 'i': 1, 'o': 1, 'u': 1,
	'l':  1, 'n':  1, 'r': 1, 's': 1, 't': 1,
	'd':  2, 'g':  2,
	'b':  3, 'c':  3, 'm': 3, 'p': 3,
	'f':  4, 'h':  4, 'v': 4, 'w': 4, 'y': 4,
	'k':  5,
	'j':  8, 'x':  8,
	'q': 10, 'z': 10
    };

    var get_letter_score = function (letter) {
	// letter should be a single character string
	return letter_scores[letter.toLowerCase()];
    };
    
    var get_word_score = function (word) {
	// word should be a string
	var score = 0;
	for (var i=0, len=word.length; i < len; i++) {
	    score += get_letter_score(word[i]);
	};
	return score;
    };


    // The following four functions return correct bonus scores but
    // are really defined for the sake of the switch statement in
    // get_total_score.

    var double_letter_score = function (letter) {
	return get_letter_score(letter);
    };

    var triple_letter_score = function (letter) {
	return get_letter_score(letter) * 2;
    };

    var double_word_score = function (word) {
	return get_word_score(word);
    }; // FIXME: We probably won't even use this.

    var triple_word_score = function (word) {
	return get_word_score(word) * 2;
    }; // FIXME: We probably won't even use this.

    
    // Calculate the total score of a word.
    
    var get_total_score = function (word, bonuses) {
	// Bonuses should be a hash of { letter_position: bonus_function }
	var base_score = get_word_score(word);
	var bonus_score = 0;
	for (letter_position in bonuses) {
	    if bonuses.hasOwnProperty(letter_position) {
		switch (bonuses[letter_position]) {
		case double_letter_score:
		    bonus_score += double_letter_score(word[letter_position]);
		    break;
		case double_word_score:
		    bonus_score += base_score; // double_word_score(word);
		    break;
		case triple_letter_score:
		    bonus_score += triple_letter_score(word[letter_position]);
		    break;
		case triple_word_score:
		    bonus_score += base_score * 2; // triple_word_score(word);
		    break;
		};
	    };
	};
	return base_score + bonus_score;
    };

// get_total_score("cabbage", { 1: double_letter_score, 4: triple_word_score })
// 
    return { get_total_score: get_total_score };
})();
