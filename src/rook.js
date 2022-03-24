const Piece = require('./piece.js');

/**
 * Rook constructor. A rook can move horizontally or diagonally.
 * @param {!Object} options - a non-null list of options.
 * @constructor
 */
const Rook = function (options) {
  Piece.call(this, options);
};

// Inheritance definition
Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

/**
 * Whether a rook can move at a given rank and file.
 *
 * @override
 * @param {number} rank - the rank on the chessboard.
 * @param {number} file - the file on the chessboard.
 * @return {boolean} <code>true</code> if the piece can move, <code>false</code> otherwise.
 */
Rook.prototype.canMove = function (rank, file) {
  const delta = {
    rank: Math.abs(this.rank - rank),
    file: Math.abs(this.file - file)
  };

  // Moving horizontally or vertically
  if (
    (delta.rank === 0 && delta.file !== 0) || // Vertical
    (delta.rank !== 0 && delta.file === 0) // Horizontal
  ) {
    return Piece.prototype.canMove.call(this, rank, file);
  }

  return false;
};

module.exports = Rook;
