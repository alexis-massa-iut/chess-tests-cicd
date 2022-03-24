const Piece = require('./piece.js');

/**
 * King constructor. A king can move in any direction but only one case.
 * @param {!Object} options - a non-null list of options.
 * @constructor
 */
const King = function (options) {
  Piece.call(this, options);
};

// Inheritance definition
King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

/**
 * Whether a king can move at a given rank and file.
 *
 * @override
 * @param {number} rank - the rank on the chessboard.
 * @param {number} file - the file on the chessboard.
 * @return {boolean} <code>true</code> if the piece can move, <code>false</code> otherwise.
 */
King.prototype.canMove = function (rank, file) {
  const delta = {
    rank: Math.abs(this.rank - rank),
    file: Math.abs(this.file - file)
  };

  if (delta.rank > 1 || delta.file > 1) return false;

  return Piece.prototype.canMove.call(this, rank, file);
};

module.exports = King;
