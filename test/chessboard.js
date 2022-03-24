const assert = require('assert');
const Color = require('../src/color.js');
const Chessboard = require('../src/chessboard.js');
const Pawn = require('../src/pawn.js');
const Rook = require('../src/rook.js');
const Knight = require('../src/knight.js');
const Bishop = require('../src/bishop.js');
const Queen = require('../src/queen.js');
const King = require('../src/king.js');

describe('Chessboard', function () {
  let chessboard;

  describe('#init', function () {
    beforeEach(function () {
      chessboard = new Chessboard();
      chessboard.init();
    });

    for (let file = 1; file <= 8; file++) {
      // We convert the numerical form of the file into a alphabetical form
      const fileStr = String.fromCharCode(97 - 1 + file);

      // After init, the central part of the board should be empty
      for (let rank = 3; rank <= 6; rank++) {
        it(`No piece should be present at (${rank}, ${fileStr})`, function () {
          const piece = chessboard.getPiece(rank, file),
            oracle = null;

          assert.equal(piece, oracle);
        });
      }

      // After init, rank 2 should only contain white pawns
      it(`White pawns should be present at (2, ${fileStr})`, function () {
        const piece = chessboard.getPiece(2, file),
          oracle = {
            correctInstance: true,
            correctColor: Color.WHITE
          };

        assert.equal(piece.color, oracle.correctColor);
        assert.equal(piece instanceof Pawn, oracle.correctInstance);
      });

      // After init, rank 7 should only contain black pawns
      it(`Black pawns should be present at (7, ${fileStr})`, function () {
        const piece = chessboard.getPiece(7, file),
          oracle = {
            correctInstance: true,
            correctColor: Color.BLACK
          };

        assert.equal(piece.color, oracle.correctColor);
        assert.equal(piece instanceof Pawn, oracle.correctInstance);
      });
    }

    /**
     * Objectif : écrire des tests de manière automatisée pour vérifier la
     * présence des pièces principales aux rangs 1 et 8 et de la bonne couleur.
     *
     * Par exemple, pour vérifier la présence de la reine noire à la position
     * (1,d) (avec d = 4), on pourra écrire le code suivant :
     *
     * const piece = chessboard.getPiece(1, 4),
     *  isQueen = piece instanceof Queen;
     */

    // Pour automatiser les tests, on fournit le tableau de constructeurs suivants
    const Constructors = [
      Rook,
      Knight,
      Bishop,
      Queen,
      King,
      Bishop,
      Knight,
      Rook
    ];

    Constructors.forEach((Constructor, i) => {
      // Cette boucle itère sur l'ensemble des constructeurs représentant
      // chaque pièce dans leur ordre d'apparition sur un rang :
      // rang 1 pour le joueur blanc
      // rang 8 pour le joueur noir

      // i représente l'index du constructeur dans le tableau des constructeurs
      // On peut obtenir la colonne (file) dans l'échiquier de la façon suivante
      const file = i + 1,
        fileStr = String.fromCharCode(97 - 1 + file);

      // Pour vérifier la présence des pièces blanches sur le rang 1 :
      it.skip(`White piece ${Constructor.prototype.constructor.name} should be present at (1, ${fileStr})`, function () {
        const rank = 1,
          piece = chessboard.getPiece(rank, file),
          isCorrectInstance = piece instanceof Constructor;

        // À compléter
      });
    });
  });
});
