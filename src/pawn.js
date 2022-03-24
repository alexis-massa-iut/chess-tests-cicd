const Piece = require('./piece.js');
const Color = require('./color.js');

/**
 * Pawn constructor. A pawn ahs specific movement.
 * @param {!Object} options - a non-null list of options.
 * @constructor
 */
const Pawn = function (options) {
  Piece.call(this, options);
};

// Inheritance definition
Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

/**
 * Check if the pawn is located at its initial position.
 * @return {boolean} <code>true</code> if the pawn is in its initial position, <code>false</code> otherwise.
 * @constructor
 */
Pawn.prototype.isInInitialPosition = function () {
  return (
    (this.color === Color.WHITE && this.rank === 2) ||
    (this.color === Color.BLACK && this.rank === 7)
  );
};

/**
 * Whether a pawn can move at a given rank and file.
 *
 * @override
 * @param {number} rank - the rank on the chessboard.
 * @param {number} file - the file on the chessboard.
 * @return {boolean} <code>true</code> if the piece can move, <code>false</code> otherwise.
 */
Pawn.prototype.canMove = function (rank, file) {
  if (!Piece.prototype.canMove.call(this, rank, file)) {
    return false;
  }

  const delta = {
    rank: Math.abs(this.rank - rank),
    file: Math.abs(this.file - file)
  };

  const isGoingUp = rank - this.rank > 0;

  // In any case a pawn cannot move more than 2 cases vertically
  // and one case horizontally
  if (delta.rank > 2 || delta.file > 1) {
    return false;
  }

  // A pawn can move forward two cells
  // if it lies in its initial position
  if (delta.rank === 2 && !this.isInInitialPosition()) {
    return false;
  }

  // A white pawn "goes up" the chessboard
  if (this.color === Color.WHITE && !isGoingUp) {
    return false;
  }

  // A black pawn "goes down" the chessboard
  if (this.color === Color.BLACK && isGoingUp) {
    return false;
  }

  // A pawn only goes diagonally when it captures an opponnent piece
  if (
    (delta.rank === delta.file && !this.canCapture(rank, file)) ||
    (delta.file === 0 && this.canCapture(rank, file))
  ) {
    return false;
  }

  return true;
};

module.exports = Pawn;
