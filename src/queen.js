const Piece = require('./piece.js');

/**
 * Queen constructor. A queen can move in any direction.
 * @param {!Object} options - a non-null list of options.
 * @constructor
 */
const Queen = function (options) {
  Piece.call(this, options);
};

// Inheritance definition
Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

/**
 * Whether a queen can move at a given rank and file.
 *
 * @override
 * @param {number} rank - the rank on the chessboard.
 * @param {number} file - the file on the chessboard.
 * @return {boolean} <code>true</code> if the piece can move, <code>false</code> otherwise.
 */
Queen.prototype.canMove = function (rank, file) {
  const delta = {
    rank: Math.abs(this.rank - rank),
    file: Math.abs(this.file - file)
  };

  // Moving horizontally, vertically, or diagonally
  if (
    (delta.rank === 0 && delta.file !== 0) || // Vertical
    (delta.rank !== 0 && delta.file === 0) || // Horizontal
    delta.rank === delta.file // Diagonal
  ) {
    return Piece.prototype.canMove.call(this, rank, file);
  }

  return false;
};

module.exports = Queen;
