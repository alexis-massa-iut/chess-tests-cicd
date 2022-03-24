const Piece = require('./piece.js');

/**
 * Knight constructor. A knight can leap other pieces.
 * @param {!Object} options - a non-null list of options.
 * @constructor
 */
const Knight = function (options) {
  options.canLeap = true;
  Piece.call(this, options);
};

// Inheritance definition
Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

/**
 * Whether a knight can move at a given rank and file.
 *
 * @override
 * @param {number} rank - the rank on the chessboard.
 * @param {number} file - the file on the chessboard.
 * @return {boolean} <code>true</code> if the piece can move, <code>false</code> otherwise.
 */
Knight.prototype.canMove = function (rank, file) {
  const delta = {
    rank: Math.abs(this.rank - rank),
    file: Math.abs(this.file - file)
  };

  // Only L-shape movements are possible
  if (
    (delta.rank === 1 && delta.file === 2) ||
    (delta.rank === 2 && delta.file === 1)
  ) {
    return Piece.prototype.canMove.call(this, rank, file);
  }

  return false;
};

module.exports = Knight;
