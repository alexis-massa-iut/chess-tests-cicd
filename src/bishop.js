const Piece = require('./piece.js');

/**
 * Bishop constructor.
 * @param {!Object} options - a non-null list of options.
 * @constructor
 */
const Bishop = function (options) {
  Piece.call(this, options);
};

// Inheritance definition
Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

/**
 * Whether a bishop can move at a given rank and file.
 *
 * @override
 * @param {number} rank - the rank on the chessboard.
 * @param {number} file - the file on the chessboard.
 * @return {boolean} <code>true</code> if the piece can move, <code>false</code> otherwise.
 */
Bishop.prototype.canMove = function (rank, file) {
  const delta = {
    rank: Math.abs(this.rank - rank),
    file: Math.abs(this.file - file)
  };

  // Diagonal movement
  if (delta.rank !== delta.file) return false;

  return Piece.prototype.canMove.call(this, rank, file);
};

module.exports = Bishop;
