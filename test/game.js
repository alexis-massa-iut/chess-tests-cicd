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
        // Définition de constantes pour simplifier l'écriture de l'intitulé du cas de tests
        // La fonction convertFileToString est définie dans test/game.js
        const posInit =
            convertFileToString(action.from.file) + action.from.rank,
          posFinal = convertFileToString(action.to.file) + action.to.rank;
        it(`Vérifier le déplacement de la pièce de (${posInit}) à (${posFinal})`, function () {
          const piece = chessboard.getPiece(action.from.rank, action.from.file);
          assert.equal(piece.color, action.color);
          assert.equal(piece.canMove(action.to.rank, action.to.file), true);
          // La ligne suivante est primordiale pour le bon fonctionnement de ces cas de test.
          piece.move(action.to.rank, action.to.file);
          assert.equal(piece.rank, action.to.rank);
          assert.equal(piece.file, action.to.file);
        });
      } else {
        // Définition d'une constante pour simplifier l'écriture de l'intitulé du cas de tests
        const pos = convertFileToString(action.at.file) + action.at.rank;
        it(`Vérifier la capture de la pièce ${action.color} à (${pos})`, function () {
          const piece = chessboard.getPiece(action.at.rank, action.at.file);
          assert.notEqual(piece.color, action.color);
        });
      }
    });
  });
});
