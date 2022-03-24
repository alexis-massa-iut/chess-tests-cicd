const assert = require('assert');
const Chessboard = require('../src/chessboard');
const game = require('../games/2022-03-07-game.json');

/**
 * From a file number, get the corresponding letter.
 * Rank are 1-indexed.
 * Letters are 97-indexed to get lower-alpha characters.
 * @param {number} file - the file in its number representation.
 * @return {string} returns the file in its string representation.
 */
const convertFileToString = function (file) {
  return String.fromCharCode(97 - 1 + file);
};

describe('Game', function () {
  let chessboard;

  before(function () {
    chessboard = new Chessboard();
    chessboard.init();
  });

  describe('#move and #capture', function () {
    game.forEach((action) => {
      if (action.type === 'move') {
        // À compléter
      } else {
        // À compléter
      }
    });
  });
});
